"use server";

import { validateRequest } from "./validateSession";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logoutFromEverywhere() {
  const { user } = await validateRequest();
  if (user) {
    await lucia.invalidateUserSessions(user?.id);
  }
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}
