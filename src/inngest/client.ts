// import { Inngest } from "inngest";

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "nodebase", name: "NodeBase" });

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