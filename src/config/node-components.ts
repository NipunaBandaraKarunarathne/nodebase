import { InitialNode } from "@/components/initial-node";
import { NodeType} from "@prisma/client";
import type { NodeTypes } from "@xyflow/react";

import { HttpRequestNode } from "@/features/executions/compopnents/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/mannual-trigger/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
