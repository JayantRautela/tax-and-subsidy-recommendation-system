import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const groq = new OpenAI({ 
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function callGroqAI(
  messages: { role: "system" | "user"; content: string }[]
) {
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages,
    temperature: 0.2,
    max_tokens: 500
  });

  return response?.choices[0]?.message.content;
}

export async function streamGroqAI(
  messages: { role: "system" | "user"; content: string }[]
) {

  const stream = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages,
    temperature: 0.2,
    stream: true
  });

  return stream;
}
