import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { SessionResponse } from "@/features/auth/types";

// The only header the API needs for CSRF protection on /auth/refresh: a
// custom header forces a CORS preflight, which our origin allow-list rejects
// for anyone but the real frontend.
export const CSRF_HEADER = { "X-Requested-With": "XMLHttpRequest" } as const;

export const api = axios.create({
  baseURL: `${env.apiUrl}/api`,
  withCredentials: true,
  timeout: 30_000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Single-flight refresh: many requests can 401 at once when the access token
// expires; they all await one refresh call instead of racing.
let refreshing: Promise<string | null> | null = null;

export async function refreshSession(): Promise<string | null> {
  if (!refreshing) {
    refreshing = axios
      .post<SessionResponse>(`${env.apiUrl}/api/auth/refresh`, null, {
        withCredentials: true,
        headers: CSRF_HEADER,
      })
      .then(({ data }) => {
        useAuthStore.getState().setSession(data.access_token, data.user);
        return data.access_token;
      })
      .catch(() => {
        useAuthStore.getState().clear();
        return null;
      })
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

type RetryConfig = InternalAxiosRequestConfig & { _retried?: boolean };

const NO_RETRY = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    const url = config?.url ?? "";

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retried ||
      NO_RETRY.some((p) => url.startsWith(p))
    ) {
      throw error;
    }

    config._retried = true;
    const token = await refreshSession();
    if (!token) throw error;

    config.headers.Authorization = `Bearer ${token}`;
    return api(config);
  },
);
