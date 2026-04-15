import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Setup clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake-key-for-build');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fake.supabase.co', 
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-service-key'
);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, theme, background, solution, financialImpact, targetCustomers, riskMitigation } = data;

    // 1. Tarik referensi data masa lalu dari Supabase (Approved Inovations)
    const { data: approvedInnovations } = await supabase
      .from('innovations')
      .select('title, solution')
      .eq('status', 'Approved')
      .limit(10);

    const contextContextString = approvedInnovations
      ?.map((inv) => `- ${inv.title}: ${inv.solution}`)
      .join('\\n') || 'Belum ada data inovasi sebelumnya.';

    // 2. Setup Gemini Model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 3. Buat Prompt untuk Gemini Action
    const prompt = `
      Anda adalah "Juri Filter Awal" untuk kompetisi Inovasi Bisnis di PT Pegadaian.
      Tugas anda:
      1. Cek apakah ide ini relevan dengan bisnis gadai, pembiayaan, investasi emas, atau digital banking Pegadaian.
      2. Cek apakah ide ini memiliki duplikasi (>80% mirip) dengan inovasi yang sudah ada berikut:\n[Konteks Inovasi Lama]\n${contextContextString}
      3. Analisis potensi kelayakan finansial dan risikonya.

      [Data Ide Baru]
      Judul: ${title}
      Tema: ${theme}
      Latar Belakang: ${background}
      Solusi: ${solution}
      Dampak Finansial: ${financialImpact}
      Target Pelanggan: ${targetCustomers}
      Risiko & Mitigasi: ${riskMitigation}

      Output harus berupa properti JSON persis seperti ini:
      {
        "status": "Rejected" | "Pending Review",
        "reason": "Penjelasan singkat",
        "analysis_financial_risk": "Analisis anda terkait kelayakan finansial dan risikonya"
      }
    `;

    // 4. Hit Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const jsonMatch = responseText.match(/\\{[\\s\\S]*\\}/);
    if (!jsonMatch) {
      throw new Error("Invalid output from AI");
    }
    const aiResult = JSON.parse(jsonMatch[0]);

    // 5. Simpan ke database
    const { data: newInnovation, error } = await supabase.from('innovations').insert([{
      title, theme, background, solution,
      financial_impact: financialImpact,
      target_customers: targetCustomers,
      risk_mitigation: riskMitigation,
      status: aiResult.status,
      ai_analysis: aiResult
    }]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, aiResult, data: newInnovation });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
