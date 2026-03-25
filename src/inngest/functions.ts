import { inngest } from "./client";

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    name: "Execute Workflow",
  },
  async ({ event, step }) => {
    await step.sleep("test", "5s");
  }
);