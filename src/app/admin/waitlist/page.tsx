"use client";

import { Button } from "@/components/ui/Button";
import { getSignupDetailEntries, getSignupFullName } from "@/lib/waitlist/signup-details";
import type { WaitlistSignup } from "@/lib/waitlist/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function SignupRow({
  signup,
  expanded,
  onToggle,
}: {
  signup: WaitlistSignup;
  expanded: boolean;
  onToggle: () => void;
}) {
  const details = getSignupDetailEntries(signup);

  return (
    <>
      <tr className="border-b border-accent/10 last:border-0">
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center justify-center w-8 h-8 rounded-full text-subtext hover:text-text hover:bg-accent/15 transition-colors"
            aria-expanded={expanded}
            aria-label={expanded ? "Hide details" : "Show details"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-subtext">
          {new Date(signup.createdAt).toLocaleString()}
        </td>
        <td className="px-4 py-3 text-text">{getSignupFullName(signup)}</td>
        <td className="px-4 py-3 text-text">{signup.email}</td>
        <td className="px-4 py-3 text-subtext capitalize">{signup.source}</td>
        <td className="px-4 py-3 text-subtext">
          {signup.notifiedAt ? new Date(signup.notifiedAt).toLocaleDateString() : "—"}
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-accent/10 bg-background/60">
          <td colSpan={6} className="px-4 py-4">
            {details.length > 0 ? (
              <dl className="grid gap-4 sm:grid-cols-2">
                {details.map((entry) => (
                  <div key={entry.label}>
                    <dt className="text-xs uppercase tracking-wide text-subtext">{entry.label}</dt>
                    <dd className="mt-1 text-sm text-text leading-relaxed whitespace-pre-wrap">
                      {entry.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-subtext">No additional details submitted.</p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminWaitlistPage() {
  const router = useRouter();
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadSignups = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/waitlist");
      const data = await response.json();

      if (response.status === 401) {
        router.replace("/admin?from=/admin/waitlist");
        return;
      }

      if (!response.ok) throw new Error(data.error || "Failed to load waitlist");

      setSignups(data.signups ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load waitlist");
    } finally {
      setLoading(false);
    }
  }, [router]);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
  }

  useEffect(() => {
    loadSignups();
  }, [loadSignups]);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-subtext">Admin</p>
            <h1 className="mt-2 font-serif text-3xl text-text">Submissions</h1>
            <p className="mt-2 text-subtext">
              {loading ? "Loading…" : `${signups.length} entries — click ▼ to view details`}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/api/admin/waitlist/export" size="sm">
              Download CSV
            </Button>
            <Button onClick={loadSignups} variant="outline" size="sm" disabled={loading}>
              {loading ? "Refreshing…" : "Refresh"}
            </Button>
            <Button onClick={logout} variant="ghost" size="sm" className="!px-0">
              Log out
            </Button>
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

        <div className="mt-8 overflow-x-auto rounded-soft-lg border border-accent/20 bg-background-secondary">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-accent/20 text-subtext uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 w-12" aria-label="Expand" />
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Notified</th>
              </tr>
            </thead>
            <tbody>
              {signups.map((signup) => (
                <SignupRow
                  key={signup.id}
                  signup={signup}
                  expanded={expandedId === signup.id}
                  onToggle={() =>
                    setExpandedId((current) => (current === signup.id ? null : signup.id))
                  }
                />
              ))}
              {!loading && signups.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-subtext">
                    No signups yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
