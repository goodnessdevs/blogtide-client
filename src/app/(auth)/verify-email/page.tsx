"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RequireAuth } from "@/features/auth/components/auth-guards";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";
import { useSession } from "@/features/auth/hooks/use-session";
import { buttonVariants } from "@/components/ui/button";

function Content() {
  const { user } = useSession();

  if (user?.is_verified) {
    return (
      <AuthCard title="You're verified" description="Your email address is confirmed.">
        <div className="flex flex-col items-center gap-4 py-2">
          <CheckCircle2 className="size-10 text-emerald-500" />
          <Link href="/write" className={buttonVariants()}>
            Write your first post
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Check your email" description={`We sent a 6-digit code to ${user?.email ?? "your inbox"}. It expires in 10 minutes.`}>
      <VerifyEmailForm />
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <RequireAuth>
      <Content />
    </RequireAuth>
  );
}
