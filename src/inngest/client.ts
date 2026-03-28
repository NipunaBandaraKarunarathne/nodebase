
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "nodebase",
  name: "NodeBase",
 
  schemas: {
    "workflows/execute.workflow": {
      data: {} as {
        workflowId?: string;
      },
    },
  },
});