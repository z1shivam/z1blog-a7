import WriteFormServerWrapper from "@/components/write/WFserverWrapper";

export default function WritePage() {
  return (
    <main className="bg-gray-50">
      <section className="mx-auto max-w-7xl p-4 space-x-4">
        <div className="w-3/5">
          <WriteFormServerWrapper />
        </div>
        <aside className="w-2/5"></aside>
      </section>
    </main>
  );
}
