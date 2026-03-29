import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import {  BaseExecutionNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { GoogleFormTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchManualTriggerRealtimeToken } from "./actions";
import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger";

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // const nodeStatus = useNodeStatus({
  //   nodeId: props.id,
  //    channel: MANUAL_TRIGGER_CHANNEL_NAME,
  //   topic: "status",
  //   refreshToken: fetchManualTriggerRealtimeToken,
  // })

  const nodeStatus = "initial"; // TODO: implement real-time status updates

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <GoogleFormTriggerDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <BaseExecutionNode
        {...props}
        icon="/googleform.svg"
        name="Google Form"
        description="When google form submitted"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
});