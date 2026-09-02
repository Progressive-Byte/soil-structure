import { getToken, clearToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export class AdminApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Fetch wrapper for every admin call: injects the bearer token (read from the
 * shared cookie — see lib/auth.ts) and centralizes 401 handling.
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
