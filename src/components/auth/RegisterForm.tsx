"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RegisterSchema } from "@/schemas/authSchema";
import { AuthCardWrapper } from "./AuthCardWrapper";
import { useState, useTransition } from "react";
import signup from "@/server/auth/register";
import { ErrorToast } from "../global/ErrorToast";
import { SuccessToast } from "../global/SuccessToast";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      signup(null, values).then((data) => {
        data?.error && setError(data.error);
      });
    });
    
  }
  return (
    <AuthCardWrapper
      headerLabel="Create a new account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ErrorToast message={error} />
          <SuccessToast message={success} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormMessage className="pl-2" />
                <FormControl>
                  <Input
                    placeholder="Your Name"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormMessage className="pl-2" />
                <FormControl>
                  <Input
                    placeholder="your username"
                    type="text"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormMessage className="pl-2" />
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            variant={"default"}
            disabled={isPending}
          >
            {isPending && (
              <AiOutlineLoading3Quarters className="h-4 w-4 mx-3 animate-spin" />
            )}
            Register
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};