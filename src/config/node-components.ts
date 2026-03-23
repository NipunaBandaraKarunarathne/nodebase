import { NodeType } from "@prisma/client";
import { NodeTypes } from "@xyflow/react";
import { InitialNode } from "@/components/initial-node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisterdNodeType = keyof typeof nodeComponents;
