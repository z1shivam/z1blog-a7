import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div>Hello from homepage</div>
      <Button asChild>
        <Link href={"/login"}>Click to go to login</Link>
      </Button>
    </main>
  );
}
