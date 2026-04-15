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
async function callGemini(contents: object[]): Promise<string> {
  let lastError: Error | null = null;

  for (const key of GEMINI_KEYS) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent({ contents: contents as any });
      return result.response.text();
    } catch (err: any) {
      lastError = err;
      const isRateLimit = err.message?.includes('429') || err.message?.includes('503') || err.message?.includes('quota');
      if (isRateLimit) {
        console.warn(`[Gemini key rotation] Key failed with rate limit, trying next...`);
        continue; // coba key berikutnya
      }
      throw err; // error lain, langsung lempar
    }
  }

  throw lastError ?? new Error('All Gemini keys exhausted');
}

// =====================================================
// Fungsi: Call DeepSeek dengan rotasi key (fallback)
// =====================================================
async function callDeepSeek(systemInstruction: string, history: Array<{role: string; content: string}>): Promise<string> {
  let lastError: Error | null = null;

  // Convert conversation history to OpenAI message format
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
          max_tokens: 1200,
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

    // Tahap 13: Penutup
    if (stage >= 13) {
      return NextResponse.json({
        constructiveResponse: "",
        question: "Terima kasih telah men-submit ide inovasi Anda. Sesi evaluasi telah selesai.",
        isFinished: true
      });
    }

    // System instruction
    let systemInstruction = `
# PERAN DAN TUJUAN
Anda adalah AI "Evaluator Inovasi" untuk menguji, membedah, dan memandu penyempurnaan proposal inovasi pada kompetisi internal di perusahaan Gadai, Fidusia, dan Bullion.
Secara internal, Anda memproses informasi menggunakan pemikiran dari 7 pakar anonim: Digital Transformation & Innovation, Global Politics & Economy, Innovation Management & Strategies, Change Management, General Manager Gadai & Fidusia, Professor Ahli Bisnis Bullion, dan Pakar Keuangan Nasional.

# SUMBER PENGETAHUAN (KNOWLEDGE BASE) UTAMA
Setiap persona WAJIB membaca, menganalisis, dan menyelaraskan seluruh argumennya dengan dokumen-dokumen rujukan yang relevan dengan ekosistem PT Pegadaian (Gadai, Fidusia, Bullion). Jangan menggunakan asumsi luar jika informasi tersebut sudah lazim diatur di industri tersebut.

# STRUKTUR FORMAT OUTPUT (SANGAT KETAT)
Mulai dari Tahap 2 hingga Tahap 12, respons Anda WAJIB selalu dibagi menjadi dua blok teks dengan format persis seperti di bawah ini. Jangan tambahkan basa-basi, salam, atau teks lain di luar format ini agar sistem dapat mem-parsing data:

[RESPON KONSTRUKTIF]
(Berikan sintesis masukan singkat, padat, dan analitis berdasarkan jawaban user sebelumnya. Gunakan sudut pandang pakar untuk memberikan insight yang bisa langsung dipakai user untuk menyusun kerangka makalah inovasinya. Dilarang memuji secara berlebihan.)

[PERTANYAAN]
(Satu pertanyaan tajam menggunakan metode Socrates untuk men-challenge atau menggali ide ke tahap selanjutnya. Jangan berikan solusi di bagian ini.)

# KERANGKA PENILAIAN (DFV TERSEMBUNYI) & WILDCARD
- Bedah proposal berdasarkan Desirability, Feasibility, dan Viability secara tersembunyi (tanpa menyebutkan label DFV secara eksplisit). Persona Digital Transformation memegang kendali skor akhir.
- WILDCARD: Jika simulasi persona internal menemukan jalan buntu/deadlock pada ide user, ubah bagian [PERTANYAAN] menjadi skenario krisis (Black Swan event) untuk menguji ketahanan model bisnis inovasi tersebut.

ATURAN KERAHASIAAN: Anda DILARANG KERAS menampilkan skor atau nilai akhir di layar chat pada tahap mana pun.
`;

    if (stage === 2) {
      systemInstruction += `\n\nATURAN KHUSUS TAHAP 2: Analisis ide dasar user pada [RESPON KONSTRUKTIF], lalu pada [PERTANYAAN] tanyakan dengan bahasa santai dan natural, intinya: "inovasi ini siapa yang akan kamu bantu?". Boleh sedikit divariasikan kalimatnya agar terasa alami, bukan seperti robot.`;
    } else {
      systemInstruction += `\n\nATURAN KHUSUS TAHAP ${stage}: Gunakan format ganda [RESPON KONSTRUKTIF] dan [PERTANYAAN]. Eksplorasi elemen 5W1H yang tersisa (Why, Where, When, How) serta pendalaman DFV. Setiap giliran harus mewakili sudut pandang kritis dari persona yang berbeda.`;
    }

    // ---------------------------------------------------
    // Build conversation history for Gemini (inline format)
    // ---------------------------------------------------
    const geminiContents = [
      { role: 'user', parts: [{ text: `[INSTRUKSI SISTEM]\n${systemInstruction}\n\n[MULAI SESI]\nHalo, saya ingin mensubmit ide inovasi.` }] },
      { role: 'model', parts: [{ text: 'Kamu punya ide/inovasi apa untuk PT Pegadaian?' }] },
      ...history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    ];

    // ---------------------------------------------------
    // Build conversation history for DeepSeek (OpenAI format)
    // ---------------------------------------------------
    const deepseekMessages = [
      { role: 'user', content: 'Halo, saya ingin mensubmit ide inovasi.' },
      { role: 'assistant', content: 'Kamu punya ide/inovasi apa untuk PT Pegadaian?' },
      ...history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content,
      }))
    ];

    // ---------------------------------------------------
    // Try Gemini first (all keys), then fallback to DeepSeek
    // ---------------------------------------------------
    let responseText: string;
    try {
      responseText = await callGemini(geminiContents);
      console.log('[AI Provider] Gemini success');
    } catch (geminiErr: any) {
      console.warn('[AI Provider] All Gemini keys failed, falling back to DeepSeek...', geminiErr.message);
      responseText = await callDeepSeek(systemInstruction, deepseekMessages);
      console.log('[AI Provider] DeepSeek fallback success');
    }

    // ---------------------------------------------------
    // Parse response
    // ---------------------------------------------------
    let constructiveResponse = "";
    let question = "";

    const responseClean = responseText.trim();
    const pertanyaanMatch = responseClean.match(/\*{0,2}\[PERTANYAAN\]\*{0,2}\s*/i);
    const responMatch = responseClean.match(/\*{0,2}\[RESPON KONSTRUKTIF\]\*{0,2}\s*/i);

    if (pertanyaanMatch && pertanyaanMatch.index !== undefined) {
      const pertanyaanIndex = pertanyaanMatch.index + pertanyaanMatch[0].length;
      question = responseClean.slice(pertanyaanIndex).trim();

      let rawConstructive = responseClean.slice(0, pertanyaanMatch.index).trim();
      if (responMatch) {
        rawConstructive = rawConstructive.slice((responMatch.index ?? 0) + responMatch[0].length).trim();
      }
      constructiveResponse = rawConstructive;
    } else {
      question = responseClean;
    }

    // Strip label artifacts
    question = question.replace(/\*{0,2}\[PERTANYAAN\]\*{0,2}\s*/gi, "").trim();
    question = question.replace(/\*{0,2}\[RESPON KONSTRUKTIF\]\*{0,2}\s*/gi, "").trim();

    return NextResponse.json({
      success: true,
      constructiveResponse,
      question,
      raw: responseText
    });
  } catch (error: any) {
    console.error("AI Evaluation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
