import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(2, {
    message: "Username is invaled",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const RegisterSchema = z.object({
  username: z.string().min(2, {
    message: "username must be atleast 2 word",
  }),
  password: z.string().min(6, {
    message: "Minimum is 6 characters required!",
  }),
  name: z.string().min(1, {
    message: "name is required!",
  }),
});

export const UserTokenSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address!",
  }),
  name: z.string().min(1, {
    message: "name is required!",
  }),
});
