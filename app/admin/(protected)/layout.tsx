"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "../_lib/adminApi";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  // Avoid flashing protected content before the guard above resolves.
  if (!ready) return null;

  return (
    <div className="min-h-screen bg-bone">
      <header className="border-b border-line bg-ink text-bone">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/admin/projects" className="font-heading text-lg font-bold tracking-tight">
            Soil & Structure — Admin
          </Link>
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
