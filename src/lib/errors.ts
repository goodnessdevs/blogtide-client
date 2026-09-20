import { isAxiosError } from "axios";

// Every API error body is `{ error: string }`; this pulls that out and falls
// back to something readable for network failures.
export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (isAxiosError<{ error?: string }>(error)) {
    if (error.code === "ERR_NETWORK") return "Cannot reach the server. Is the API running?";
    return error.response?.data?.error ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
