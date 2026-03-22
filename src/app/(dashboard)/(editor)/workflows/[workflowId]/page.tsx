import { EditorError, EditorLoading,Editor } from "@/features/editor/component/editor";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {EditorHeader}from "@/features/editor/component/editor-header"

interface PageProps {
  params: Promise<{ workflowId: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { workflowId } = await params;
  prefetchWorkflow(workflowId);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError/>}>
        <Suspense fallback={<EditorLoading/>}>
        <EditorHeader workflowId={workflowId}/>
        <main className="flex-1">
            
            <Editor workflowId={workflowId}/>
        </main>
        
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Page;
