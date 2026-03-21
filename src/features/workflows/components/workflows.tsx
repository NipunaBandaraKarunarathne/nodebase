"use client";
import { json } from "zod";
import { useCreateWorkFlow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import React from "react";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();


  return (
    <div className="flex flex-1 justify-center items-center ">
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const createWorkflow = useCreateWorkFlow();
      const {handleError,model}= useUpgradeModel();
    const handleCreate =()=>{
        createWorkflow.mutate(undefined, {
            onError:(error)=>{
              handleError(error);
                console.error(error)
            }
        })
    }
  return (
    <>
    {model}
      <EntityHeader
        title="workflows"
        description="Create and Manage your Workflows"
        onNew={handleCreate}
        newButtonLable="New workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
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
