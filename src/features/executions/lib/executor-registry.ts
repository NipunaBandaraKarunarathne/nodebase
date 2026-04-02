import { NodeType } from "@prisma/client";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/mannual-trigger/executor";
import { httpRequestExecutor } from "@/features/executions/compopnents/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { geminiExecutor } from "../compopnents/gemini/executor";
import { openAiExecutor } from "../compopnents/open-ai/executor";
import { anthropicExecutor } from "../compopnents/anthripic/executor";
import { discord } from "better-auth";
import { discordExecutor } from "../compopnents/discord/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]:anthropicExecutor,
  [NodeType.OPENAI]: openAiExecutor, 
  [NodeType.DISCORD]: discordExecutor,
  [NodeType.SLACK]:discordExecutor
}; 

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};