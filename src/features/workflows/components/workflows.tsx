"use client";
import { json } from "zod";
import {
  useCreateWorkFlow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import {
  EntityContainer,
  EntityHeader,
  EntitySearch,
} from "@/components/entity-components";
import React from "react";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entity-search";

export const WorkflowsSearch = () => {
  const[params, setParams]=useWorkflowsParams();
  const {searchValue,onSearchChange}= useEntitySearch({params,setParams});
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Workfolws"
    />
  );
};

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
  const router = useRouter();
  const { handleError, model } = useUpgradeModel();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
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
      search={<WorkflowsSearch/>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
