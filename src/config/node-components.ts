import { InitialNode } from "@/components/initial-node";
import { NodeType} from "@prisma/client";
import type { NodeTypes } from "@xyflow/react";

import { HttpRequestNode } from "@/features/executions/compopnents/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/mannual-trigger/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/components/stripe-trigger/node";
import { GeminiNode } from "@/features/executions/compopnents/gemini/node";
import { OpenAINode } from "@/features/executions/compopnents/open-ai/node";
import { AnthropicNode } from "@/features/executions/compopnents/anthripic/node";
import { DiscordNode } from "@/features/executions/compopnents/discord/node";
import { SlackNode } from "@/features/executions/compopnents/slack/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.OPENAI]: OpenAINode,
  [NodeType.ANTHROPIC]: AnthropicNode,
  [NodeType.DISCORD]: DiscordNode,
  [NodeType.SLACK]: SlackNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
