"use client";

import { SurveyField } from "@/components/forms/SurveyField";
import { Button } from "@/components/ui/Button";
import { contactConfig, contactFormQuestions } from "@/lib/contact/survey";
import { useState } from "react";

type FormValues = Record<string, string | string[]>;

function initialValues(): FormValues {
  const values: FormValues = {};
  for (const q of contactFormQuestions) {
    values[q.id] = q.type === "checkbox" ? [] : "";
  }
  return values;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [website, setWebsite] = useState(""); // honeypot — leave empty
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: values,
          source: contactConfig.source,
          website,
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      if (!data) {
        throw new Error("Server error. Please refresh the page and try again.");
      }

      setStatus("success");
      setMessage(contactConfig.successMessage);
      setValues(initialValues());
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-background rounded-soft-lg p-8 md:p-10 shadow-card text-center">
        <p className="font-serif text-2xl text-text">{contactConfig.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-background rounded-soft-lg p-8 md:p-10 shadow-card"
      noValidate
    >
      <div className="space-y-5">
        {contactFormQuestions.map((question) => (
          <div key={question.id}>
            <label htmlFor={question.id} className="block text-sm text-text mb-2">
              {question.label}
              {question.required && <span className="text-subtext"> *</span>}
            </label>
            <SurveyField
              question={question}
              value={values[question.id]}
              onChange={(value) => setValues((prev) => ({ ...prev, [question.id]: value }))}
            />
          </div>
        ))}
      </div>

      {/* Honeypot for bots — hidden from people */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-10">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send Message"}
        </Button>
      </div>

      {message && (
        <p role="status" className={`mt-4 text-sm ${status === "error" ? "text-red-600" : "text-accent-dark"}`}>
          {message}
        </p>
      )}

      <p className="mt-4 text-xs text-subtext/70">
        Your information is kept private and used only to respond to your enquiry.
      </p>
    </form>
  );
}
