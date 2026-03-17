import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  await requireUnAuth();
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="flex items-center gap-2 self-center font-medium">
          <Image src="/logo.svg" alt="Logo" width={30} height={30} />
          Nodebase
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};
export default Page;
