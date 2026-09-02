"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { InputField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { adminFetch, setToken, getToken } from "../_lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already logged in — skip the form.
  useEffect(() => {
    if (getToken()) router.replace("/admin/projects");
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { token } = await adminFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setToken(token);
      router.replace("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  // Already logged in — skip the form.
  if (typeof window !== "undefined" && getToken()) {
    router.replace("/admin/projects");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone">
      <Container className="max-w-md">
        <div className="rounded-card border border-line bg-bone-50 p-8">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-ink">
            Admin login
          </h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage Projects.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </p>
            )}
            <InputField
              label="Username"
              name="username"
              required
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            <Button type="submit" variant="lime" size="lg" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
