"use client"

import { useTRPC } from "@/trpc/client";
import { use } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

const ClientComponent = () => {
    const trpc = useTRPC();
    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());
  return (
    <div>
      This is a client component {JSON.stringify(users)}
    </div>
  );
}

export default ClientComponent;