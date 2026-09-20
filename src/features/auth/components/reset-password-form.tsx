"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/password-input";
import { resetPasswordSchema, type ResetPasswordInput } from "../schema";
import { useResetPassword } from "../api/use-auth";

export function ResetPasswordForm({ token }: { token: string }) {
  const reset = useResetPassword(token);
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirm_password: "" },
  });
  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit((v) => reset.mutate(v))} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">New password</FieldLabel>
          <PasswordInput id="password" autoComplete="new-password" aria-invalid={!!errors.password} {...form.register("password")} />
          <FieldDescription>8+ characters with upper and lower case, a number and a symbol.</FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>
        <Field data-invalid={!!errors.confirm_password}>
          <FieldLabel htmlFor="confirm_password">Confirm new password</FieldLabel>
          <PasswordInput id="confirm_password" autoComplete="new-password" aria-invalid={!!errors.confirm_password} {...form.register("confirm_password")} />
          <FieldError errors={[errors.confirm_password]} />
        </Field>
        <Button type="submit" className="w-full" disabled={reset.isPending}>
          {reset.isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
          Reset password
        </Button>
      </FieldGroup>
    </form>
  );
}
