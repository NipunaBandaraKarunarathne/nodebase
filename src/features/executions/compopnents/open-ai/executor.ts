import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { openai,createOpenAI } from '@ai-sdk/openai';
import Handlebars from "handlebars";
import { generateText } from "ai";
import { openAiChannel } from "@/inngest/channels/open-ai";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type OpenAiData = {
  variableName?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  const updateStatus = (status: "loading" | "success" | "error") =>
    publish(openAiChannel().status({ nodeId, status }));

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

  const openai = createOpenAI({
    apiKey: credentialValue,
  });

  const modelName = ""; 

  try {
    const { steps } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai('gpt-3.5-turbo'),
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