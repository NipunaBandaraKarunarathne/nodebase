""
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Home = async () => {
  const users = await prisma.user.findMany();

  return (
    <div className="text-red-500">
      Hello world
      <pre>{JSON.stringify(users, null, 2)}</pre>

      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <Button variant="outline">click me</Button>
      </div>
    </div>
  );
};

export default Home;