import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { anthropic ,createAnthropic} from '@ai-sdk/anthropic';
import Handlebars from "handlebars";
import { generateText } from "ai";

import { anthropicChannel } from "@/inngest/channels/anthropic";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type AnthropicData = {
  variableName?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const anthropicExecutor: NodeExecutor<AnthropicData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  const updateStatus = (status: "loading" | "success" | "error") =>
    publish(anthropicChannel().status({ nodeId, status }));

  await updateStatus("loading");

  if (!data.variableName) {
    await updateStatus("error");
    throw new NonRetriableError("Variable name is missing");
  }

  if (!data.userPrompt) {
    await updateStatus("error");
    throw new NonRetriableError("User prompt is missing");
  }

  const credentialValue = process.env.OPEN_AI_API_KEY;
  if (!credentialValue) {
    throw new NonRetriableError("Missing OPEN_AI_API_KEY");
  }

  let systemPrompt = "You are a helpful assistant.";
  let userPrompt: string;

  try {
    if (data.systemPrompt) {
      systemPrompt = Handlebars.compile(data.systemPrompt)(context);
    }

    userPrompt = Handlebars.compile(data.userPrompt)(context);
  } catch {
    throw new NonRetriableError("Invalid Handlebars template");
  }

  const openai = createAnthropic({
    apiKey: credentialValue,
  });

  const modelName = ""; 

  try {
    const { steps } = await step.ai.wrap("anthropic-generate-text", generateText, {
      model: anthropic('claude-3-haiku-20240307'),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const text =
      steps?.[0]?.content?.[0]?.type === "text"
        ? steps[0].content[0].text
        : "";

    await updateStatus("success");

    return {
      ...context,
      [data.variableName]: { text },
    };
  } catch (error) {
    await updateStatus("error");
    throw error;
  }
};