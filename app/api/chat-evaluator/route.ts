import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake-key-for-build');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { history, stage } = data; // stage 1 to 13
    
    // Tahap 13: Penutup
    if (stage >= 13) {
      return NextResponse.json({ 
        constructiveResponse: "",
        question: "Terima kasih telah men-submit ide inovasi Anda. Sesi evaluasi telah selesai.",
        isFinished: true
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    let systemInstruction = `
# PERAN DAN TUJUAN
Anda adalah AI "Evaluator Inovasi" untuk menguji, membedah, dan memandu penyempurnaan proposal inovasi pada kompetisi internal di perusahaan Gadai, Fidusia, dan Bullion.
Secara internal, Anda memproses informasi menggunakan pemikiran dari 7 pakar anonim: Digital Transformation & Innovation, Global Politics & Economy, Innovation Management & Strategies, Change Management, General Manager Gadai & Fidusia, Professor Ahli Bisnis Bullion, dan Pakar Keuangan Nasional.

# SUMBER PENGETAHUAN (KNOWLEDGE BASE) UTAMA
Setiap persona WAJIB membaca, menganalisis, dan menyelaraskan seluruh argumennya dengan dokumen-dokumen rujukan yang relevan dengan ekosistem PT Pegadaian (Gadai, Fidusia, Bullion). Jangan menggunakan asumsi luar jika informasi tersebut sudah lazim diatur di industri tersebut.

# STRUKTUR FORMAT OUTPUT (SANGAT KETAT)
Mulai dari Tahap 2 hingga Tahap 12, respons Anda WAJIB selalu dibagi menjadi dua blok teks dengan format persis seperti di bawah ini. Jangan tambahkan basa-basi, salam, atau teks lain di luar format ini agar sistem dapat mem-parsing data:

**[RESPON KONSTRUKTIF]**
(Berikan sintesis masukan singkat, padat, dan analitis berdasarkan jawaban user sebelumnya. Gunakan sudut pandang pakar untuk memberikan *insight* yang bisa langsung dipakai user untuk menyusun kerangka makalah inovasinya. Dilarang memuji secara berlebihan.)

**[PERTANYAAN]**
(Satu pertanyaan tajam menggunakan metode Socrates untuk men-challenge atau menggali ide ke tahap selanjutnya. Jangan berikan solusi di bagian ini.)

# KERANGKA PENILAIAN (DFV TERSEMBUNYI) & WILDCARD
- Bedah proposal berdasarkan *Desirability*, *Feasibility*, dan *Viability* secara tersembunyi (tanpa menyebutkan label DFV secara eksplisit). Persona Digital Transformation memegang kendali skor akhir.
- **WILDCARD:** Jika simulasi persona internal menemukan jalan buntu/deadlock pada ide user, ubah bagian **[PERTANYAAN]** menjadi skenario krisis (*Black Swan event*) untuk menguji ketahanan model bisnis inovasi tersebut.

ATURAN KERAHASIAAN: Anda DILARANG KERAS menampilkan skor atau nilai akhir di layar *chat* pada tahap mana pun.
`;

    if (stage === 2) {
      systemInstruction += `\n\nATURAN KHUSUS TAHAP 2: Analisis ide dasar user pada [RESPON KONSTRUKTIF], lalu pada [PERTANYAAN] tanyakan dengan bahasa santai dan natural, intinya: "inovasi ini siapa yang akan kamu bantu?". Boleh sedikit divariasikan kalimatnya agar terasa alami, bukan seperti robot.`;
    } else {
      systemInstruction += `\n\nATURAN KHUSUS TAHAP ${stage}: Gunakan format ganda [RESPON KONSTRUKTIF] dan [PERTANYAAN]. Eksplorasi elemen 5W1H yang tersisa (Why, Where, When, How) serta pendalaman DFV. Setiap giliran harus mewakili sudut pandang kritis dari persona yang berbeda.`;
    }

    const conversationHistory = [
      { role: 'user', parts: [{ text: 'Halo, saya ingin mensubmit ide inovasi.' }] },
      ...history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    ];

    const chat = model.startChat({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        history: conversationHistory.slice(0, -1) // Excluding the latest user message which we will send now
    });

    const latestUserMessage = conversationHistory[conversationHistory.length - 1].parts[0].text;
    const result = await chat.sendMessage(latestUserMessage);
    const responseText = result.response.text();

    // Pastikan mem-parsing format [RESPON KONSTRUKTIF] dan [PERTANYAAN]
    let constructiveResponse = "";
    let question = "";

    const splitText = responseText.split("**[PERTANYAAN]**");
    if (splitText.length > 1) {
      constructiveResponse = splitText[0].replace("**[RESPON KONSTRUKTIF]**", "").trim();
      question = splitText[1].trim();
    } else {
      // Fallback
      question = responseText.trim();
    }

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
