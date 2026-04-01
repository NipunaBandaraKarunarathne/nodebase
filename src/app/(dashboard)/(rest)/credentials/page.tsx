import { credentialsParamsLoader } from "@/features/credentials/server/params-loader";
import { prefetchCredentials } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { CredentialsList } from "@/features/credentials/components/credentials";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();
  const params = await credentialsParamsLoader(searchParams);
  prefetchCredentials(params);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Failed to load credentials</div>}>
        <Suspense fallback={<div>Loading credentials...</div>}>
          <CredentialsList/>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Page;
