import EditorComponent from "@/components/global/EditorComponent";
import { WriteForm } from "@/components/write/WritingForm";

export default function WritePage() {
  return (
    <main className="grid grid-cols-5">
      <section className="col-span-3 h-64">
        <WriteForm />
      </section>
      <section className="col-span-2 h-64 "></section>
    </main>
  );
}
