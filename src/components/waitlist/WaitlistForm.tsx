"use client";

import { SurveyField } from "@/components/forms/SurveyField";
import { Button } from "@/components/ui/Button";
import { waitlistConfig, waitlistFormQuestions } from "@/lib/waitlist/survey";
import type { SurveyQuestion } from "@/lib/waitlist/types";
import { useState } from "react";

type FormValues = Record<string, string | string[]>;

function initialValues(): FormValues {
  const values: FormValues = {};
  for (const q of waitlistFormQuestions) {
    values[q.id] = q.type === "checkbox" ? [] : "";
  }
  return values;
}

type FormBlock =
  | { kind: "field"; question: SurveyQuestion }
  | {
      kind: "preferenceSection";
      title: string;
      groups: { title: string; questions: SurveyQuestion[] }[];
    };

function buildFormBlocks(questions: SurveyQuestion[]): FormBlock[] {
  const blocks: FormBlock[] = [];
  let index = 0;

  while (index < questions.length) {
    const question = questions[index];
    if (!question.group) {
      blocks.push({ kind: "field", question });
      index += 1;
      continue;
    }

    const groups: { title: string; questions: SurveyQuestion[] }[] = [];
    while (index < questions.length && questions[index].group) {
      const title = questions[index].group!;
      const grouped: SurveyQuestion[] = [];
      while (index < questions.length && questions[index].group === title) {
        grouped.push(questions[index]);
        index += 1;
      }
      groups.push({ title, questions: grouped });
    }

    blocks.push({
      kind: "preferenceSection",
      title: "Preferred Group Time",
      groups,
    });
  }

  return blocks;
}

export function WaitlistForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [website, setWebsite] = useState(""); // honeypot — leave empty
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const blocks = buildFormBlocks(waitlistFormQuestions);

  function updateField(id: string, value: string | string[]) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: values,
          source: waitlistConfig.source,
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
      setMessage(waitlistConfig.successMessage);
      setValues(initialValues());
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-background rounded-soft-lg p-8 md:p-10 shadow-card text-center">
        <p className="font-serif text-2xl text-text">{waitlistConfig.successMessage}</p>
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
        {blocks.map((block) => {
          if (block.kind === "field") {
            const { question } = block;
            return (
              <div key={question.id}>
                <label htmlFor={question.id} className="block text-sm text-text mb-2">
                  {question.label}
                  {question.required && <span className="text-subtext"> *</span>}
                </label>
                <SurveyField
                  question={question}
                  value={values[question.id]}
                  onChange={(value) => updateField(question.id, value)}
                />
              </div>
            );
          }

          return (
            <div key={block.title} className="space-y-4">
              <p className="text-sm text-text font-medium">{block.title}</p>
              {block.groups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-soft border border-accent/20 bg-background-secondary/40 p-4 md:p-5 space-y-4"
                >
                  <p className="text-sm font-medium text-text tracking-wide">{group.title}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {group.questions.map((question) => (
                      <div key={question.id}>
                        <label htmlFor={question.id} className="block text-sm text-text mb-2">
                          {question.label}
                        </label>
                        <SurveyField
                          question={question}
                          value={values[question.id]}
                          onChange={(value) => updateField(question.id, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Honeypot for bots — hidden from people */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="waitlist-website">Website</label>
        <input
          id="waitlist-website"
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
          {status === "loading" ? "Joining…" : "Join the Waitlist"}
        </Button>
      </div>

      {message && (
        <p role="status" className={`mt-4 text-sm ${status === "error" ? "text-red-600" : "text-accent-dark"}`}>
          {message}
        </p>
      )}

      <p className="mt-4 text-xs text-subtext/70">
        Your answers are kept private and used only to understand how we can support you.
      </p>
    </form>
  );
}
