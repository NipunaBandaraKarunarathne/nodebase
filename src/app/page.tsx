import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-red-500">
 Hello world
 <div className=" min-h-screen min-w-screen flex items-center justify-center">
      <Button variant="outline">click me</Button>
 </div>
    </div>
  );
}
