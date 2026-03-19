"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { LogoutButton } from "./logout";

const Home = () => {
  const trpc = useTRPC();
  const { data, error } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const textAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success("AI executed successfully, check console for response!");
      },
      onError: () => {
        toast.error("Failed to execute AI, check console for error!");
      },
    }),
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success("Workflow created successfully, job queued in Inngest!");
      },
    }),
  );

  console.log("error", error);

  return (
    <div>
      Hello world
      <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
        {JSON.stringify(data, null, 2)}

        <Button disabled={textAI.isPending} onClick={() => textAI.mutate()}>
          Test AI
        </Button>

        <Button disabled={create.isPending} onClick={() => create.mutate()}>
          Create Workflow
        </Button>

        <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
