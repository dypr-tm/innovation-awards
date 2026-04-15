import { GoogleGenerativeAI } from '@google/generative-ai';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(body.messages[body.messages.length - 1].content);
  return { content: result.response.text() };
});
