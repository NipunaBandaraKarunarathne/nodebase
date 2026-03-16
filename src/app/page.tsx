"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";

const Home =async () => {

  await requireAuth();
  const { data } = authClient.useSession();

  return (
    <div>
      Hello world
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        {JSON.stringify(data)}
        {data && (
          <div>
            <Button onClick={() => authClient.signOut()}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
