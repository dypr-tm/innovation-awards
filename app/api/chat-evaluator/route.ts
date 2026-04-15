import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// =====================================================
// API KEY POOLS - Rotasi otomatis saat rate limit
// =====================================================
const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

// =====================================================
// Fungsi: Call Gemini dengan rotasi key
// =====================================================
async function callGemini(systemInstruction: string, contents: object[]): Promise<string> {
  let lastError: Error | null = null;

  // Gunakan gemini-2.0-flash untuk key utama (karena user menyebut ini 'Gemini 2.5')
  // Dan gemini-1.5-flash untuk key cadangan (2 dan 3)
  for (let i = 0; i < GEMINI_KEYS.length; i++) {
    const key = GEMINI_KEYS[i];
    const modelName = i === 0 ? 'gemini-2.0-flash' : 'gemini-1.5-flash';
    
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: systemInstruction 
      });
      const result = await model.generateContent({ contents: contents as any });
      return result.response.text();
    } catch (err: any) {
      lastError = err;
      const isRateLimit = err.message?.includes('429') || err.message?.includes('503') || err.message?.includes('quota');
      if (isRateLimit) {
        console.warn(`[Gemini key rotation] Key ${i+1} failed (${modelName}), trying next...`);
        continue; 
      }
      throw err; 
    }
  }

  throw lastError ?? new Error('All Gemini keys exhausted');
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

    // ---------------------------------------------------
    // Execution
    // ---------------------------------------------------
    let responseText: string;
    try {
      responseText = await callGemini(systemInstruction, geminiContents);
    } catch (geminiErr: any) {
      console.error('[AI Provider] Gemini failed:', geminiErr.message);
      throw geminiErr;
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
