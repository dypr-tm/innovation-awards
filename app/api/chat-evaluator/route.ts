import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// =====================================================
// API KEY POOLS - Rotasi otomatis saat rate limit
// =====================================================
const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

const DEEPSEEK_KEYS = [
  process.env.DEEPSEEK_API_KEY_1,
  process.env.DEEPSEEK_API_KEY_2,
].filter(Boolean) as string[];

// =====================================================
// Fungsi: Call Gemini dengan rotasi key
// =====================================================
async function callGemini(systemInstruction: string, contents: object[]): Promise<string> {
  let lastError: Error | null = null;

  for (const key of GEMINI_KEYS) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash', 
        systemInstruction: systemInstruction 
      });
      const result = await model.generateContent({ contents: contents as any });
      return result.response.text();
    } catch (err: any) {
      lastError = err;
      const isRateLimit = err.message?.includes('429') || err.message?.includes('503') || err.message?.includes('quota');
      if (isRateLimit) {
        console.warn(`[Gemini key rotation] Key failed with rate limit, trying next...`);
        continue; 
      }
      throw err; 
    }
  }

  throw lastError ?? new Error('All Gemini keys exhausted');
}

// =====================================================
// Fungsi: Call DeepSeek dengan rotasi key (fallback)
// =====================================================
async function callDeepSeek(systemInstruction: string, history: Array<{role: string; content: string}>): Promise<string> {
  let lastError: Error | null = null;

  const messages = [
    { role: 'system', content: systemInstruction },
    ...history,
  ];

  for (const key of DEEPSEEK_KEYS) {
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        const isRateLimit = response.status === 429 || response.status === 503;
        lastError = new Error(`DeepSeek ${response.status}: ${errText}`);
        if (isRateLimit) {
          console.warn(`[DeepSeek key rotation] Key failed ${response.status}, trying next...`);
          continue;
        }
        throw lastError;
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err: any) {
      lastError = err;
      const isRateLimit = err.message?.includes('429') || err.message?.includes('503');
      if (isRateLimit) continue;
      throw err;
    }
  }

  throw lastError ?? new Error('All DeepSeek keys exhausted');
}

// =====================================================
// Main Handler
// =====================================================
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { history, stage } = data;

    if (stage >= 13) {
      return NextResponse.json({
        constructiveResponse: "",
        question: "Terima kasih telah men-submit ide inovasi Anda. Sesi evaluasi telah selesai.",
        isFinished: true
      });
    }

    let systemInstruction = `
# PERAN
Anda adalah AI "Evaluator Inovasi" untuk PT Pegadaian. Tugas Anda adalah membedah ide user menggunakan 7 perspektif pakar internal.

# ATURAN OUTPUT (WAJIB DIIKUTI)
Respons Anda harus SELALU terdiri dari dua bagian dengan label yang jelas agar dapat diproses sistem:

1. [RESPON KONSTRUKTIF]
Berikan analisis tajam, masukan, dan kritik membangun terhadap JAWABAN USER SEBELUMNYA. Gunakan bahasa yang profesional namun suportif. Fokus pada Desirability, Feasibility, dan Viability.

2. [PERTANYAAN]
Berikan SATU pertanyaan tajam untuk menggali ide user lebih dalam ke tahap berikutnya (Tahap ${stage}/12). Gunakan metode Socrates.

# ATURAN KHUSUS TAHAP 2
Jika stage ${stage} adalah 2, tanyakan dengan bahasa santai: "Inovasi ini siapa yang akan kamu bantu?" (siapa target penggunanya?).

# CATATAN
Jangan memberikan skor. Jangan memberikan salam pembuka atau penutup. Langsung ke format [RESPON KONSTRUKTIF] dan [PERTANYAAN].
`;

    // ---------------------------------------------------
    // Build conversation history
    // ---------------------------------------------------
    const geminiContents = history.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const deepseekMessages = history.map((msg: any) => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.content,
    }));

    // ---------------------------------------------------
    // Execution
    // ---------------------------------------------------
    let responseText: string;
    try {
      responseText = await callGemini(systemInstruction, geminiContents);
    } catch (geminiErr: any) {
      console.warn('[AI Provider] Gemini failed, fallback to DeepSeek');
      responseText = await callDeepSeek(systemInstruction, deepseekMessages);
    }

    // ---------------------------------------------------
    // Robust Parsing
    // ---------------------------------------------------
    let constructiveResponse = "";
    let question = "";

    const responseClean = responseText.trim();
    // Match markers with optional asterisks or hashes
    const pertRegex = /[#*]*\s*\[?PERTANYAAN\]?[:\s]*/i;
    const respRegex = /[#*]*\s*\[?RESPON KONSTRUKTIF\]?[:\s]*/i;

    const pertMatch = responseClean.match(pertRegex);
    const respMatch = responseClean.match(respRegex);

    if (pertMatch && pertMatch.index !== undefined) {
      // Everything before PERTANYAAN is constructive
      let rawResp = responseClean.slice(0, pertMatch.index).trim();
      // Remove the RESPON KONSTRUKTIF header if present
      rawResp = rawResp.replace(respRegex, "").trim();
      constructiveResponse = rawResp;

      // Everything after PERTANYAAN is the question
      question = responseClean.slice(pertMatch.index + pertMatch[0].length).trim();
    } else {
      question = responseClean;
    }

    return NextResponse.json({
      success: true,
      constructiveResponse,
      question
    });

  } catch (error: any) {
    console.error("AI Evaluation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
