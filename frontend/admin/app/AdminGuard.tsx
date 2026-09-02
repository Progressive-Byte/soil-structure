"use client";

import { useEffect, useState } from "react";
import { getToken, clearToken } from "@/lib/auth";

const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL ?? "http://localhost:3002";

/**
 * The whole admin app is protected — login lives in a separate app (see
 * frontend/login/), so this just checks for the shared cookie on mount and
 * bounces to it if missing. Real enforcement is server-side (server/middleware/auth.js).
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = LOGIN_URL;
      return;
    }
    setReady(true);
  }, []);

  function handleLogout() {
    clearToken();
    window.location.href = LOGIN_URL;
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-bone">
      <header className="border-b border-line bg-ink text-bone">
        <div className="container-page flex h-16 items-center justify-between">
          <span className="text-lg font-bold tracking-tight">Soil & Structure — Admin</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-muted-dark transition-colors hover:text-bone"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
