"use client";

import Link from "next/link";
import { format } from "date-fns";
import { BadgeCheck, LogOut, MailWarning } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RequireAuth } from "@/features/auth/components/auth-guards";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { DeleteAccountDialog } from "@/features/auth/components/delete-account-dialog";
import { useLogout } from "@/features/auth/api/use-auth";
import { useSession } from "@/features/auth/hooks/use-session";

function AccountContent() {
  const { user } = useSession();
  const logout = useLogout();
  if (!user) return null;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>How you appear on your posts.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-5">
          <Avatar size="lg">
            <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{user.username}</span>
              {user.is_verified ? (
                <Badge variant="secondary">
                  <BadgeCheck className="text-emerald-500" /> Verified
                </Badge>
              ) : (
                <Link href="/verify-email">
                  <Badge variant="destructive">
                    <MailWarning /> Verify email
                  </Badge>
                </Link>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div className="text-xs text-muted-foreground">
              Member since {format(new Date(user.created_at), "MMMM yyyy")}
              {user.last_login_at && ` · last sign-in ${format(new Date(user.last_login_at), "MMM d, yyyy")}`}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Link href={`/posts?author_id=${user.id}`} className={buttonVariants({ variant: "outline" })}>
              My posts
            </Link>
            <Button variant="ghost" onClick={() => logout.mutate()}>
              <LogOut data-icon="inline-start" /> Sign out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Use a strong password you don&apos;t use anywhere else.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Deleting your account removes every post you have written.</CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountDialog />
        </CardContent>
      </Card>
    </div>
  );
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <PageShell title="Account" narrow>
        <AccountContent />
      </PageShell>
    </RequireAuth>
  );
}
