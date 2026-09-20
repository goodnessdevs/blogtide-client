"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyEmailSchema, type VerifyEmailInput } from "../schema";
import { useResendVerification, useVerifyEmail } from "../api/use-auth";

export function VerifyEmailForm() {
  const verify = useVerifyEmail();
  const resend = useResendVerification();
  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });
  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit((v) => verify.mutate(v))} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.code} className="items-center">
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <InputOTP maxLength={6} value={field.value} onChange={field.onChange} autoFocus>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} className="size-11 text-lg" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          <FieldError errors={[errors.code]} />
        </Field>

        <Button type="submit" className="w-full" disabled={verify.isPending}>
          {verify.isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
          Verify email
        </Button>

        <Button type="button" variant="ghost" className="w-full" disabled={resend.isPending} onClick={() => resend.mutate()}>
          {resend.isPending ? "Sending…" : "Resend code"}
        </Button>
      </FieldGroup>
    </form>
  );
}
