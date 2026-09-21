"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { authApi } from "./auth.api";
import { useAuthStore } from "../store/auth.store";
import type { ResetPasswordInput } from "../schema";
import type { SessionResponse } from "../types";

function applySession(data: SessionResponse) {
  useAuthStore.getState().setSession(data.access_token, data.user);
}

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      applySession(data);
      toast.success(`Welcome back, ${data.user.username}`);
      router.replace("/");
    },
    onError: (err) => toast.error(getErrorMessage(err, "Login failed")),
  });
}

export function useSignup() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      applySession(data);
      toast.success(`Welcome to BlogTide, ${data.user.username}`);
      router.replace("/write");
    },
    onError: (err) => toast.error(getErrorMessage(err, "Sign up failed")),
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    // Clear locally even if the server call failed: the user asked to leave.
    onSettled: () => {
      useAuthStore.getState().clear();
      queryClient.clear();
      router.replace("/");
      toast.success("Signed out");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: ({ message }) => toast.success(message),
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useResetPassword(token: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => authApi.resetPassword(token, input),
    onSuccess: ({ message }) => {
      toast.success(message);
      router.replace("/login");
    },
    onError: (err) => toast.error(getErrorMessage(err, "Reset failed")),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: ({ message }) => toast.success(message),
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useDeleteAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.deleteAccount,
    onSuccess: () => {
      useAuthStore.getState().clear();
      queryClient.clear();
      toast.success("Your account has been deleted");
      router.replace("/");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
