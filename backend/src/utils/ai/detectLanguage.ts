import { callGroqAI } from "./groqClient.js";

export async function detectLanguage(text: string) {

  const response = await callGroqAI([
    {
      role: "system",
      content: "Detect the language of the user input. Return only the language name."
    },
    {
      role: "user",
      content: text
    }
  ]);

  return response?.trim() || "English";
}
