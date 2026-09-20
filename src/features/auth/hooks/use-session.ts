"use client";

import { useEffect } from "react";
import { refreshSession } from "@/lib/axios";
import { useAuthStore } from "../store/auth.store";

// Restores the session from the refresh cookie once per page load. This is a
// genuine external sync (browser cookie -> in-memory token), which is what
// useEffect is for.
export function useSessionBootstrap() {
  useEffect(() => {
    const { status, setStatus } = useAuthStore.getState();
    if (status !== "idle") return;
    setStatus("loading");
    void refreshSession();
  }, []);
}

export function useSession() {
  const user = useAuthStore((s) => s.user);
  const status = useAuthStore((s) => s.status);
  return {
    user,
    status,
    isLoading: status === "idle" || status === "loading",
    isAuthenticated: status === "authenticated" && user !== null,
  };
}
