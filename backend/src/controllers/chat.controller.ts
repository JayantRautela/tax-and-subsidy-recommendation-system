import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { handleStreamingChat } from "../utils/ai/streamingChatService.js";

export const chatController = async (req: Request, res: Response) => {
  try {
    let { message, conversationId } = req.body;

    if (!message) return;

    if (!conversationId) {
      conversationId = uuidv4();
    }

    await handleStreamingChat(
      conversationId,
      message,
      res
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Chatbot error",
    });
  }
};
