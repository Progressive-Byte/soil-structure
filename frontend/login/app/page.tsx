"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { InputField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { getToken, setToken } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3001";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already logged in — go straight to the dashboard.
  useEffect(() => {
    if (getToken()) window.location.href = ADMIN_URL;
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || "Login failed");
      setToken(body.token);
      window.location.href = ADMIN_URL;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone">
      <Container className="max-w-md">
        <div className="rounded-card border border-line bg-bone-50 p-8">
          <h1 className="text-2xl font-bold tracking-tight text-ink">Admin login</h1>
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
