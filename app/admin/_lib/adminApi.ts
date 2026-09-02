"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const TOKEN_KEY = "ss_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export class AdminApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Fetch wrapper for every admin-panel call: injects the bearer token and
 * centralizes 401 handling (clear the token so the next guard check redirects
 * to /admin/login).
 */
export async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    ...(init.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...init.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers, cache: "no-store" });

  if (res.status === 401) {
    clearToken();
    throw new AdminApiError("Session expired — please log in again.", 401);
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new AdminApiError(body.message || `Request failed (${res.status})`, res.status);
  }
  return body as T;
}
