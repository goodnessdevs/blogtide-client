"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/password-input";
import { signupSchema, type SignupInput } from "../schema";
import { useSignup } from "../api/use-auth";

export function SignupForm() {
  const signup = useSignup();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "", confirm_password: "" },
  });
  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit((v) => signup.mutate(v))} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.username}>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" autoComplete="username" placeholder="janedoe" aria-invalid={!!errors.username} {...form.register("username")} />
          <FieldError errors={[errors.username]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...form.register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput id="password" autoComplete="new-password" aria-invalid={!!errors.password} {...form.register("password")} />
          <FieldDescription>8+ characters with upper and lower case, a number and a symbol.</FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>

        <Field data-invalid={!!errors.confirm_password}>
          <FieldLabel htmlFor="confirm_password">Confirm password</FieldLabel>
          <PasswordInput id="confirm_password" autoComplete="new-password" aria-invalid={!!errors.confirm_password} {...form.register("confirm_password")} />
          <FieldError errors={[errors.confirm_password]} />
        </Field>

        <Button type="submit" className="w-full" disabled={signup.isPending}>
          {signup.isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
          Create account
        </Button>
      </FieldGroup>
    </form>
  );
}
