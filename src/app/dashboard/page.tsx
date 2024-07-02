"use client"

import { Button } from "@/components/ui/button";
import logout from "@/server/auth/logout";

export default function DashboardPage() {
  return (
    <div>
      Dashboard page!!
      <div>
        <Button onClick={async()=>{ await logout()}}>
          Logout
        </Button>
      </div>
    </div>
  );
}
