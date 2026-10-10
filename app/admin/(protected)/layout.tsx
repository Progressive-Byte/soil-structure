"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch, getToken, clearToken } from "../_lib/adminApi";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/Button";
import { RxHamburgerMenu } from "react-icons/rx";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Presence of a token isn't enough — verify it against the server so a
  // stale/expired token redirects back to /admin/login instead of rendering
  // protected content that then fails every data fetch with 401s.
  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    adminFetch("/auth/me")
      .then(() => setReady(true))
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  // Avoid flashing protected content before the guard above resolves.
  if (!ready) return null;

  return (
    <div className="min-h-screen bg-stone-50 lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden bg-stone-900 lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </aside>
      {/* <header className="border-b border-line bg-ink text-bone">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/admin/projects" className="font-heading text-lg font-bold tracking-tight">
            Soil & Structure — 
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-muted-dark transition-colors hover:text-bone"
          >
            Log out
          </button>
        </div>
      </header> */}
      {navOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={() => setNavOpen(false)} />
          <aside className="relative h-full w-64 bg-stone-900">
            <AdminSidebar onNavigate={() => setNavOpen(false)} />
          </aside>
        </div>
      )}
      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-8">
          <button type="button" className="rounded-lg p-2 lg:hidden" aria-label="Open menu" onClick={() => setNavOpen(true)}>
            <RxHamburgerMenu />
          </button>
          <div className="ml-auto flex min-w-0 items-center gap-3 text-sm sm:gap-4">
            <span className="truncate text-stone-600">
              Admin <span className="hidden text-stone-400 sm:inline">· adminEmail</span>
            </span>
            {/* <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-muted-dark transition-colors hover:text-bone"
          >
            Log out
          </button> */}
          <Button variant="dark" onClick={handleLogout}>Logout</Button>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-8">{children}</main>
      </div>
      {/* <main className="container-page py-10">{children}</main> */}
    </div>
  );
}
