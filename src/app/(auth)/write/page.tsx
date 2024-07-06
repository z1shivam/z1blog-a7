import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ImageStoreServerWrapper from "@/components/write/ISserverWrapper";
import WriteFormServerWrapper from "@/components/write/WFserverWrapper";
import { validateRequest } from "@/server/auth/validateSession";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WritePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className="bg-gray-50 ">
      <section className="mx-auto flex max-w-7xl space-x-6 p-4">
        <div className="w-3/5">
          <div className="flex justify-between items-end py-3">
            <h2 className="text-3xl font-bold">Create Post</h2>
            <Button asChild>
              <Link href={"/dashboard"}>Go back</Link>
            </Button>
          </div>
          <div className="pb-3">

          <Separator />
          </div>
          <WriteFormServerWrapper />
        </div>
        <aside className="h-fit w-2/5 rounded-md border-2 border-gray-300 bg-white pb-4">
          <ImageStoreServerWrapper />
        </aside>
      </section>
    </main>
  );
}
