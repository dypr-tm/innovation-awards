import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const chatEvaluator_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(body.messages[body.messages.length - 1].content);
  return { content: result.response.text() };
});

export { chatEvaluator_post as default };
//# sourceMappingURL=chat-evaluator.post.mjs.map
