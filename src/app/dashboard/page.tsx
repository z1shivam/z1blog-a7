"use client";

import { Button } from "@/components/ui/button";
import logout from "@/server/auth/logout";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-4">
      Dashboard page!!
      <div className="flex gap-4">
        <Button
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </Button>
        <Button asChild>
          <Link href={"/write"}>Go to write</Link>
        </Button>
      </div>
    </div>
  );
}
