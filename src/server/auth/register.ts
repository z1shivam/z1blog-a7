"use server";

import User from "@/models/userModel";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import mongoConnect from "@/lib/dbConnect";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { RegisterSchema } from "@/schemas/authSchema";
import { z } from "zod";

export default async function signup(_: any, values: z.infer<typeof RegisterSchema>) {
  const username = values.username;
  const password = values.password;
  const name = values.name;

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  try {
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    await mongoConnect();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        error: "Username already exists",
      };
    }

    const userId = generateIdFromEntropySize(10);

    await User.create({
      _id: userId,
      name: name,
      username: username,
      passwordHash: passwordHash,
      profileImage: ""
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error signing up:", error);
    return {
      error: "Failed to create user",
    };
  }
}

interface ActionResult {
  error?: string;
}
