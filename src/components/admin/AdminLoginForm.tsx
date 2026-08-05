"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const redirectTo = searchParams.get("from") || "/admin/waitlist";

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) router.replace(redirectTo);
      })
      .finally(() => setCheckingSession(false));
  }, [router, redirectTo]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Invalid password.");
      return;
    }

    router.replace(redirectTo);
  }

  if (checkingSession) {
    return <p className="text-subtext text-sm">Checking session…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-password" className="block text-sm text-text mb-2">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 rounded-soft border border-accent/30 bg-background text-text placeholder:text-subtext/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-300"
          placeholder="Enter admin password"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
