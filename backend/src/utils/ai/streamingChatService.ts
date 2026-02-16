import { streamGroqAI, callGroqAI } from "./groqClient.js";
import {
  getConversationHistory,
  addMessageToConversation
} from "./conversationStore.js";

import { detectLanguage } from "./detectLanguage.js";
import { retrieveRelevantContext } from "./ragRetriever.js";
import { compareRegimes } from "../regimeComparision.js";
import { getSubsidyRecommendations } from "../subsidy.js";

export async function handleStreamingChat(
  conversationId: string,
  userMessage: string,
  res: any
) {

  try {

    const history = getConversationHistory(conversationId);

    addMessageToConversation(conversationId, {
      role: "user",
      content: userMessage
    });

    const language = await detectLanguage(userMessage);

    const context = retrieveRelevantContext(userMessage);

    const extractionPrompt = `
      Extract JSON with:
      intent: TAX_COMPARISON | SUBSIDY | GENERAL
      income, occupation, age, landSize, gender, residenceType.

      Return JSON only.

      User Message: ${userMessage}
    `;

    const extraction = await callGroqAI([
      { role: "system", content: "Extract structured JSON only." },
      { role: "user", content: extractionPrompt }
    ]);

    let parsed: any = {};

    try {
      parsed = JSON.parse(extraction || "{}");
    } catch {
      parsed = {};
    }

    const { intent, ...profile } = parsed;

    let deterministicData: any = null;

    if (intent === "TAX_COMPARISON") {
      deterministicData = compareRegimes(profile);
    }

    if (intent === "SUBSIDY") {
      deterministicData = getSubsidyRecommendations(profile);
    }

    const finalPrompt = `
      Conversation History:
      ${history.map(m => `${m.role}: ${m.content}`).join("\n")}

      User Question:
      ${userMessage}

      Retrieved Context:
      ${JSON.stringify(context, null, 2)}

      Deterministic Engine Result:
      ${JSON.stringify(deterministicData, null, 2)}

      Respond in ${language}.
    `;

    const messages = [
      {
        role: "system",
        content: `
          You are a government tax and subsidy advisor.

          Rules:
          - Use provided context only.
          - Do NOT hallucinate policies.
          - Use deterministic engine results when available.
          - Keep answer clear and helpful.
          - Respond in user's language.
        `
      },
      { role: "user", content: finalPrompt }
    ];

    const stream = await streamGroqAI(messages as any);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    let fullResponse = "";

    for await (const chunk of stream) {

      const content = chunk.choices[0]?.delta?.content || "";

      if (content) {
        fullResponse += content;
        res.write(content);
      }
    }

    res.end();

    addMessageToConversation(conversationId, {
      role: "assistant",
      content: fullResponse
    });

  } catch (error) {

    res.status(500).end("Something went wrong.");
  }
}
