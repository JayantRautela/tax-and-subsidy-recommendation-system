import { callGroqAI } from "./groqClient.js";

export async function generateSchemeExplanation(scheme: any, user: any) {
  const messages = [
    {
      role: "system",
      content: `
        You are an Indian government financial advisory assistant.
        Explain eligibility in simple, clear language.
        Do not hallucinate policies.
        Keep explanation under 5 sentences.
      `,
    },
    {
      role: "user",
      content: `
        User Profile:
        ${JSON.stringify(user, null, 2)}

        Scheme:
        Name: ${scheme.name}
        Benefit: ${scheme.benefit}
        Matched Rules: ${scheme.matchedRules}/${scheme.totalRules}

        Explain why the user qualifies.
      `,
    },
  ] as { role: "system" | "user"; content: string }[];

  return await callGroqAI(messages);
}
