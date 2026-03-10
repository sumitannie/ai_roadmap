import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "You are a helpful AI assistant integrated into a flow/canvas diagramming tool. " +
      "You help users think through their ideas, plan workflows, and understand concepts " +
      "related to their diagrams. Be concise and clear in your responses." +
      "if the user asks for code,always provide the code in codeblock with language specified. eg: ```python ...```",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
