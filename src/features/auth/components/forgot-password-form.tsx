"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schema";
import { useForgotPassword } from "../api/use-auth";

export function ForgotPasswordForm() {
  const forgot = useForgotPassword();
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const { errors } = form.formState;

  if (forgot.isSuccess) {
    return (
      <Alert>
        <MailCheck />
        <AlertTitle>Check your inbox</AlertTitle>
        <AlertDescription>
          If an account exists for {form.getValues("email")}, a reset link is on its way. It expires in 15 minutes.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={form.handleSubmit((v) => forgot.mutate(v))} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...form.register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Button type="submit" className="w-full" disabled={forgot.isPending}>
          {forgot.isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
          Send reset link
        </Button>
      </FieldGroup>
    </form>
  );
}
