import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { workflowsRouter } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  
  // testAI: protectedProcedure.mutation(async () => {
  //   // const { text } = await generateText({
  //   //   model: google("gemini-2.5-flash"),
  //   //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
  //   // });

  //   await inngest.send({ name: "execute/ai" });
  //   return {
  //     success: true,
  //     message: "Workflow created successfully, job queued in Inngest!",
  //   };
  // }),

  // getWorkflows: protectedProcedure.query(({ ctx }) => {
  //   console.log(Object.keys(prisma));
  //   return prisma.workflow.findMany();
  // }),

  // createWorkflow: protectedProcedure.mutation(async () => {
  //   await inngest.send({
  //     name: "test/hello.world",
  //     data: {
  //       email: "nipuna@gmail.com",
  //     },
  //   });

  //   return {
  //     success: true,
  //     message: "Workflow created successfully, job queued in Inngest!",
  //   };
  // }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
