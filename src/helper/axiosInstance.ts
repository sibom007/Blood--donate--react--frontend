import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "@/zustand/auth-zustand";
import { config } from "@/lib/config";

import { getNewAccessToken } from "@/feature/auth/lib";
import type { ApiError } from "@/types";

export const api = axios.create({
  baseURL: config.backendUrl,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ---------- REFRESH STATE ---------- */
let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (error: any) => void;
};

let failedQueue: QueueItem[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

/* ---------- REQUEST INTERCEPTOR ---------- */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ---------- RESPONSE INTERCEPTOR ---------- */
api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status =
      error.response?.data?.err?.statusCode || error.response?.status || 500;

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.err?.message ||
      error.response?.data?.errorSources?.[0]?.message ||
      "Something Went Wrong!";

    const requestUrl = originalRequest?.url || "";

    /* 1. Ignore auth APIs */
    const isAuthRequest =
      requestUrl.includes("/login") ||
      requestUrl.includes("/sign-in") ||
      requestUrl.includes("/register") ||
      requestUrl.includes("/auth");

    /* 3. Detect no session */
    const isNoSession =
      errorMessage === "REFRESH_TOKEN_MISSING" ||
      errorMessage === "NO_REFRESH_TOKEN_FOUND";

    if (isNoSession && !isAuthRequest) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }

      return Promise.reject(error);
    }

    /* ACCESS TOKEN EXPIRED → REFRESH FLOW */
    const isAccessTokenExpired = errorMessage === "ACCESS_TOKEN_EXPIRED";

    if (isAccessTokenExpired && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await getNewAccessToken();
        const newAccessToken = response.accessToken;

        if (!newAccessToken) throw new Error("No token received");

        useAuthStore.setState({
          accessToken: newAccessToken,
          user: response.user,
        });

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    /* NORMALIZED ERROR */
    const formattedError = {
      message: errorMessage,
      code: status,
      data: null,
      originalError: error,
    };

    return Promise.reject(formattedError);
  },
);
