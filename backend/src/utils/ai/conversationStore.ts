interface Message {
  role: "user" | "assistant";
  content: string;
}

const conversations = new Map<string, Message[]>();

export function getConversationHistory(
  conversationId: string
): Message[] {

  return conversations.get(conversationId) || [];
}

export function addMessageToConversation(
  conversationId: string,
  message: Message
) {

  const history = conversations.get(conversationId) || [];

  history.push(message);

  const trimmed = history.slice(-10);

  conversations.set(conversationId, trimmed);
}
