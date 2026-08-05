"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { useState } from "react";

export function ResourceDownload() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          source: "nervous-system-reset-guide",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage("Thank you! Your guide is on its way to your inbox.");
      setFirstName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="resources" className="py-24 md:py-32 bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <SectionHeading
              title="Free Nervous System Reset Guide"
              subtitle="Download a free guide designed to help you calm overwhelm, reconnect with yourself and create moments of peace throughout your day."
            />
          </FadeIn>

          <FadeIn delay={200}>
            <form
              onSubmit={handleSubmit}
              className="mt-12 bg-background rounded-soft-lg p-8 md:p-10 shadow-card"
              noValidate
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-text mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="w-full px-4 py-3 rounded-soft border border-accent/30 bg-background text-text placeholder:text-subtext/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-soft border border-accent/30 bg-background text-text placeholder:text-subtext/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Download Guide"}
                </Button>
              </div>

              {message && (
                <p
                  role="status"
                  className={`mt-4 text-sm ${status === "success" ? "text-accent-dark" : "text-red-600"}`}
                >
                  {message}
                </p>
              )}

              <p className="mt-4 text-xs text-subtext/70">
                Your information is kept private. Ready for future email marketing integration.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
