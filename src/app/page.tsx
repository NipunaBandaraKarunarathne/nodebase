
"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { use } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Home = () => {

  const trpc = useTRPC();
  const { data, error} = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const create = useMutation(trpc.createWorkflow.mutationOptions(
    {
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success("Workflow created successfully, job queued in Inngest!");
      }
    }
  ));

  console.log("error",error);

  return (
    <div>
      Hello world
      <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
        {JSON.stringify(data,null,2)}

        <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
   
          <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
