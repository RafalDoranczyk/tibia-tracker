import Anthropic from "@anthropic-ai/sdk";
import type { Tool } from "@anthropic-ai/sdk/resources/index";
import type { MessageCreateParamsNonStreaming } from "@anthropic-ai/sdk/resources/messages";

import { env } from "@/env";

export const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

type ClaudeConfigType = Omit<MessageCreateParamsNonStreaming, "messages">;

export function createClaudeConfig(
  systemPrompt: string,
  tools: Tool[],
  options?: Partial<ClaudeConfigType>
): ClaudeConfigType {
  return {
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    temperature: 0.7,
    system: systemPrompt,
    tools,
    ...options,
  };
}
