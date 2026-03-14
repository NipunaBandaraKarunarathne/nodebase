""
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { caller, trpc } from "@/trpc/server";
import ClientComponent from "./client";
import { getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Home = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
 

  return (
    <div className="text-red-500">
      Hello world
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <Button variant="outline">click me</Button>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientComponent  />
          </Suspense>
          
        </HydrationBoundary>
        
      </div>
    </div>
  );
};

export default Home;