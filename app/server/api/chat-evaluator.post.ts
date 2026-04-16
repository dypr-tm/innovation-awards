import { PEGADAIAN_KNOWLEDGE } from '../utils/ai-knowledge';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiKey = process.env.DEEPSEEK_API_KEY_1 || 'sk-f96a47e3832647d9868ab59cd6a03de9';
  
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { 
          role: 'system', 
          content: `${PEGADAIAN_KNOWLEDGE}\n\nIMPORTANT: Berikan respon dalam bentuk teks biasa (plain text) saja. JANGAN gunakan tanda baca markdown seperti ###, **, list dash, atau bold. Pastikan respon sangat bersih dan profesional.`
        },
        ...body.messages
      ],
      stream: false
    })
  });

  const data = await response.json();
  return { content: data.choices[0].message.content };
});
