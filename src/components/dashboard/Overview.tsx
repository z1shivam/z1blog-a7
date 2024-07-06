import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { EditProfileDialog } from "./EditProfile";

export default function Overview() {

  return (
    <section className="mx-auto max-w-7xl px-3 py-3">
      <div className="h-full w-full rounded-md border-2 border-gray-300 bg-gray-50">
        <div className="flex justify-between p-3 ">
          <h2 className=" text-3xl font-bold">Hello, Shivam</h2>
          <div className="space-x-3">
            <Button asChild>
              <Link href={"/write"}>Create Post</Link>
            </Button>
            <Button asChild>
              <Link href={"/assets"}>Manage Assets</Link>
            </Button>
            <EditProfileDialog/>
          </div>
        </div>
        <Separator className="mx-auto w-[99%]" />
        <div></div>
      </div>
    </section>
  );
}
