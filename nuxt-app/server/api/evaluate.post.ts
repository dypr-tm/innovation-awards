import { GoogleGenerativeAI } from '@google/generative-ai';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, description } = body;

  const config = useRuntimeConfig();
  const genAI = new GoogleGenerativeAI(config.googleAiKey || process.env.GOOGLE_AI_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Analisa ide inovasi berikut:
  Judul: ${title}
  Deskripsi: ${description}

  Berikan evaluasi dalam format JSON:
  {
    "score": 0-100,
    "feedback": "...",
    "status": "Diterima/Ditolak"
  }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Simple parser to extract JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const evaluation = jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 0, feedback: "Error parsing AI response", status: "Ditolak" };

  return evaluation;
});
