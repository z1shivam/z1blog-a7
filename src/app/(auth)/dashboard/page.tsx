"use client";

import { Button } from "@/components/ui/button";
import logout from "@/server/auth/logout";
import { logoutFromEverywhere } from "@/server/auth/logoutFromEverywhere";
import Link from "next/link";

export default async function DashboardPage() {

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
        <Button
          onClick={async () => {
            await logoutFromEverywhere();
          }}
        >
          Logout from Everywhere
        </Button>
        <Button asChild>
          <Link href={"/write"}>Go to write</Link>
        </Button>
      </div>
    </div>
  );
}
