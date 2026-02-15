import { callGroqAI } from "./groqClient.js";

export async function generateTaxAdvice(
  taxResult: any,
  user: any
) {

  const messages = [
    {
      role: "system",
      content: `
        You are a tax advisor for Indian citizens.
        Provide actionable suggestions to reduce tax legally.
        Keep it simple and concise.
      `
    },
    {
      role: "user",
      content: `
        User Profile:
        ${JSON.stringify(user, null, 2)}

        Tax Comparison Result:
        ${JSON.stringify(taxResult, null, 2)}

        Suggest improvements or actions.
      `
    }
  ] as { role: "system" | "user", content: string}[];

  return await callGroqAI(messages);
}
