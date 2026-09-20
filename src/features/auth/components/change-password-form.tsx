"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/password-input";
import { changePasswordSchema, type ChangePasswordInput } from "../schema";
import { useChangePassword } from "../api/use-auth";

export function ChangePasswordForm() {
  const change = useChangePassword();
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { current_password: "", password: "", confirm_password: "" },
  });
  const { errors } = form.formState;

  return (
    <form
      onSubmit={form.handleSubmit((v) => change.mutate(v, { onSuccess: () => form.reset() }))}
      noValidate
    >
      <FieldGroup>
        <Field data-invalid={!!errors.current_password}>
          <FieldLabel htmlFor="current_password">Current password</FieldLabel>
          <PasswordInput id="current_password" autoComplete="current-password" aria-invalid={!!errors.current_password} {...form.register("current_password")} />
          <FieldError errors={[errors.current_password]} />
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="new_password">New password</FieldLabel>
          <PasswordInput id="new_password" autoComplete="new-password" aria-invalid={!!errors.password} {...form.register("password")} />
          <FieldError errors={[errors.password]} />
        </Field>
        <Field data-invalid={!!errors.confirm_password}>
          <FieldLabel htmlFor="confirm_new_password">Confirm new password</FieldLabel>
          <PasswordInput id="confirm_new_password" autoComplete="new-password" aria-invalid={!!errors.confirm_password} {...form.register("confirm_password")} />
          <FieldError errors={[errors.confirm_password]} />
        </Field>
        <div>
          <Button type="submit" disabled={change.isPending}>
            {change.isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
            Update password
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
