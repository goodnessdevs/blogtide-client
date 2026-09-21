export interface User {
  id: string;
  username: string;
  email: string;
  last_login_at: string | null;
  created_at: string;
}

export interface SessionResponse {
  access_token: string;
  user: User;
}

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
