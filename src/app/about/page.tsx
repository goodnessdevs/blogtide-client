import type { Metadata } from "next";
import Link from "next/link";
import { Feather, Lock, Zap } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "About" };

const values = [
  { icon: Feather, title: "Write without friction", body: "A clean editor, a title, a cover image. Nothing else between you and publishing." },
  { icon: Zap, title: "Fast by default", body: "A Go API and a Next.js frontend keep pages quick on any connection." },
  { icon: Lock, title: "Your account, protected", body: "Short-lived sessions, hashed credentials and rate-limited sign-in from day one." },
];

export default function AboutPage() {
  return (
    <PageShell title="About BlogTide" description="A small, focused blogging platform built to get out of the writer's way." narrow>
      <div className="grid gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <Card key={v.title} size="sm">
            <CardHeader>
              <v.icon className="mb-2 size-5 text-violet-500" />
              <CardTitle>{v.title}</CardTitle>
              <CardDescription>{v.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold">Ready to publish?</h2>
            <p className="text-sm text-muted-foreground">Create an account and your first post can be live in minutes.</p>
          </div>
          <Link href="/signup" className={buttonVariants()}>
            Get started
          </Link>
        </CardContent>
      </Card>
    </PageShell>
  );
}
