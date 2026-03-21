"use client";
import { json } from "zod";
import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import React from "react";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <p>{JSON.stringify(workflows.data, null, 2)}</p>;
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <EntityHeader
        title="workflows"
        description="Create and Manage your Workflows"
        onNew={() => {}}
        newButtonLable="New workflow"
        disabled={disabled}
        isCreating={false}
      />
    </>
  );
};

export const WorkFlowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
