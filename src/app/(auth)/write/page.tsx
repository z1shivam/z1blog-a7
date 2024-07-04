import WriteFormServerWrapper from "@/components/write/WFserverWrapper";

export default function WritePage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-5 bg-gray-100 max-w-7xl mx-auto">
      <section className="col-span-3 p-4">
        <WriteFormServerWrapper />
      </section>
      <section className="col-span-2 "></section>
    </main>
  );
}
