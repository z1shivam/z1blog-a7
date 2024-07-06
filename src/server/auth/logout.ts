"use server";

import { lucia } from "@/lib/auth";
import { validateRequest } from "./validateSession";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";

export interface ActionResult {
  error: string | null;
}

export default async function logout(): Promise<ActionResult> {
  console.log("logout function");
  await dbConnect();
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}
