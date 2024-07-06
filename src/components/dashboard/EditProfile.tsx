"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useRef, useState, useTransition } from "react";
import { ErrorToast } from "@/components/global/ErrorToast";
import { SuccessToast } from "@/components/global/SuccessToast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function EditProfileDialog() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isUpdating, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    startTransition(() => {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      console.log(data);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            If you do not want to change password, leave the password field
            empty.
          </DialogDescription>
        </DialogHeader>
        <ErrorToast message={error} />
        <SuccessToast message={success} />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                disabled={isUpdating}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                className="col-span-3"
                disabled={isUpdating}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                className="col-span-3"
                disabled={isUpdating}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                ref={confirmPasswordRef}
                className="col-span-3"
                disabled={isUpdating}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating && (
                <AiOutlineLoading3Quarters className="mx-3 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
