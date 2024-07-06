import Overview from "@/components/dashboard/Overview";
import { validateRequest } from "@/server/auth/validateSession";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="">
      <Overview />
    </div>
  );
}
