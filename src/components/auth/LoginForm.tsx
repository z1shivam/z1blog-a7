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

import { LoginSchema } from "@/schemas/authSchema";
import { AuthCardWrapper } from "./AuthCardWrapper";
import { useState, useTransition } from "react";
import { ErrorToast } from "../global/ErrorToast";
import { SuccessToast } from "../global/SuccessToast";
import login from "@/server/auth/login";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("")
    startTransition(() => {
      login(null, values).then((data) => {
        data?.error && setError(data.error);
        // data?.success && setSuccess(data.success);
      });
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Login to your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ErrorToast message={error} />
          <SuccessToast message={success} />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormMessage className="pl-2" />
                <FormControl>
                  <Input
                    placeholder="your username here"
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
            Login
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};