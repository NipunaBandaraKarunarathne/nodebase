import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute.workflow",
     triggers: { event: "workflows/execute.workflow" },
  },
  
  async ({ event, step }) => {
     const workflowId = event.data.workflowId;
    // console.log("workflow id",workflowId)
    if(!workflowId){
      throw new NonRetriableError("Workflow id is missing!");
    }

    const node= await step.run("Prepare workflow",async()=>{
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where:{id:workflowId},
        include:{nodes:true,connections:true}
      });

      return workflow.nodes;
    })
    return {node};
  }
);