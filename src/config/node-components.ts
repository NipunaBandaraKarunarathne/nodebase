import { InitialNode } from "@/components/initial-node";
import { NodeType} from "@prisma/client";
import type { NodeTypes } from "@xyflow/react";

import { HttpRequestNode } from "@/features/executions/compopnents/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/mannual-trigger/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
