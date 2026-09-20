import { api } from "@/lib/axios";
import type {
  ChangePasswordInput,
  DeleteAccountInput,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
  VerifyEmailInput,
} from "../schema";
import type { SessionResponse, User } from "../types";

export const authApi = {
  register: (input: SignupInput) =>
    api.post<SessionResponse>("/auth/register", input).then((r) => r.data),

  login: (input: LoginInput) =>
    api.post<SessionResponse>("/auth/login", input).then((r) => r.data),

  logout: () => api.post<{ message: string }>("/auth/logout").then((r) => r.data),

  me: () => api.get<{ user: User }>("/auth/me").then((r) => r.data.user),

  verifyEmail: (input: VerifyEmailInput) =>
    api.post<{ message: string; user: User }>("/auth/verify-email", input).then((r) => r.data),

  resendVerification: () =>
    api.post<{ message: string }>("/auth/resend-verification").then((r) => r.data),

  forgotPassword: (input: ForgotPasswordInput) =>
    api.post<{ message: string }>("/auth/forgot-password", input).then((r) => r.data),

  resetPassword: (token: string, input: ResetPasswordInput) =>
    api.post<{ message: string }>("/auth/reset-password", { token, ...input }).then((r) => r.data),

  changePassword: (input: ChangePasswordInput) =>
    api.put<{ message: string }>("/auth/password", input).then((r) => r.data),

  deleteAccount: (input: DeleteAccountInput) =>
    api.delete<{ message: string }>("/auth/me", { data: input }).then((r) => r.data),
};
