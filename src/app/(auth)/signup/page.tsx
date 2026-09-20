import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { GuestOnly } from "@/features/auth/components/auth-guards";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <Suspense>
      <GuestOnly>
        <AuthCard
          title="Create your account"
          description="Start publishing in under a minute."
          footer={
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </>
          }
        >
          <SignupForm />
        </AuthCard>
      </GuestOnly>
    </Suspense>
  );
}
