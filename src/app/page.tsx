

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Home =async () => {

  await requireAuth();
 // const { data } = authClient.useSession();

  const user = await caller.getUsers();

  return (
    <div>
      Hello world
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        {JSON.stringify(user)}
        {/* {data && (
          <div>
            <Button onClick={() => authClient.signOut()}>
              Logout
            </Button>
          </div>
        )} */}
          <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
