import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import Handlebars from "handlebars";
import { generateText } from "ai";
import { geminiChannel } from "@/inngest/channels/gemini";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type GeminiData = {
  variableName?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const geminiExecutor: NodeExecutor<GeminiData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  const updateStatus = (status: "loading" | "success" | "error") =>
    publish(geminiChannel().status({ nodeId, status }));

  await updateStatus("loading");

  if (!data.variableName) {
    await updateStatus("error");
    throw new NonRetriableError("Variable name is missing");
  }

  if (!data.userPrompt) {
    await updateStatus("error");
    throw new NonRetriableError("User prompt is missing");
  }

  const credentialValue = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!credentialValue) {
    throw new NonRetriableError("Missing GOOGLE_GENERATIVE_AI_API_KEY");
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

  const google = createGoogleGenerativeAI({
    apiKey: credentialValue,
  });

  const modelName = "gemini-3-flash-preview"; // Default model model: google("gemini-1.5-flash")

  try {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google(modelName),
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