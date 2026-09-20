import { create } from "zustand";
import type { AuthStatus, User } from "../types";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: AuthStatus;

  setSession: (accessToken: string, user: User) => void;
  setUser: (user: User) => void;
  setStatus: (status: AuthStatus) => void;
  clear: () => void;
}

// Deliberately not persisted: the access token lives in memory only and is
// re-minted from the httpOnly refresh cookie on every page load.
export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  status: "idle",

  setSession: (accessToken, user) => set({ accessToken, user, status: "authenticated" }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  clear: () => set({ accessToken: null, user: null, status: "unauthenticated" }),
}));
