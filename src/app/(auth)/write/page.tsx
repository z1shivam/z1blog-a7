import ImageStoreServerWrapper from "@/components/write/ISserverWrapper";
import WriteFormServerWrapper from "@/components/write/WFserverWrapper";

export default function WritePage() {
  return (
    <main className="bg-gray-50 ">
      <section className="mx-auto flex max-w-7xl space-x-6 p-4">
        <div className="w-3/5">
          <WriteFormServerWrapper />
        </div>
        <aside className="h-fit w-2/5 rounded-md border-2 border-gray-300 bg-white pb-4">
          <ImageStoreServerWrapper />
        </aside>
      </section>
    </main>
  );
}
