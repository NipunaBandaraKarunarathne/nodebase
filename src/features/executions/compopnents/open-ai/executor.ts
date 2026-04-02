import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { openai, createOpenAI } from "@ai-sdk/openai";
import Handlebars from "handlebars";
import { generateText } from "ai";
import { openAiChannel } from "@/inngest/channels/open-ai";
import prisma from "@/lib/db";
import { decrypt } from "@/lib/encription";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type OpenAiData = {
  variableName?: string;
  credentialId?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async ({
  data,
  nodeId,
  context,
  userId,
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

    if (!data.credentialId) {
      await publish(
        openAiChannel().status({
          nodeId,
          status: "error",
        }),
      );
      throw new NonRetriableError("OpenAI  node: Credential is required");
    }

  if (!data.userPrompt) {
    await updateStatus("error");
    throw new NonRetriableError("User prompt is missing");
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

  const credential = await step.run("get-credential", () => {
    return prisma.credential.findUnique({
      where: {
        id: data.credentialId,
        userId, 
      },
    });
  });

 
  if (!credential) {
    await publish(
      openAiChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw new NonRetriableError("OpenAI node: Credential not found");
  }


  const openai = createOpenAI({
    apiKey: decrypt(credential.value),
  });



  try {
    const { steps } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const text =
      steps?.[0]?.content?.[0]?.type === "text" ? steps[0].content[0].text : "";

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
