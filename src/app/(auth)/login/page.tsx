import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { GuestOnly } from "@/features/auth/components/auth-guards";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Suspense>
      <GuestOnly>
        <AuthCard
          title="Welcome back"
          description="Sign in to keep writing."
          footer={
            <>
              New here?{" "}
              <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
                Create an account
              </Link>
            </>
          }
        >
          <LoginForm />
        </AuthCard>
      </GuestOnly>
    </Suspense>
  );
}
