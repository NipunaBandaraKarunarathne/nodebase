import { WorkflowsList,WorkFlowContainer } from "@/features/workflows/components/workflows";
import { workflowParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type{ SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props={
searchParams:Promise<SearchParams>
}

const Page = async ({searchParams}:Props) => {
  await requireAuth();
  const params =await workflowParamsLoader(searchParams);
  await prefetchWorkflows(params);
  return (
    <WorkFlowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkFlowContainer>
  );
};
export default Page;
