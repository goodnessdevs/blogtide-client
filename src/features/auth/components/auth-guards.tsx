"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "../hooks/use-session";

function FullPageSpinner() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}

// The access token lives in memory, so route protection has to happen on the
// client once the session bootstrap has settled. Redirecting inside an effect
// is the one legitimate place for it: navigation is a side effect.
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useSession();

  const needsLogin = !isLoading && !isAuthenticated;

  useEffect(() => {
    if (needsLogin) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [needsLogin, pathname, router]);

  if (isLoading || needsLogin) return <FullPageSpinner />;
  return <>{children}</>;
}

// Login/signup pages bounce signed-in users away (to ?next= if present).
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const { isLoading, isAuthenticated } = useSession();

  const next = params.get("next");
  const target = next && next.startsWith("/") ? next : "/";

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace(target);
  }, [isLoading, isAuthenticated, router, target]);

  if (isLoading || isAuthenticated) return <FullPageSpinner />;
  return <>{children}</>;
}
