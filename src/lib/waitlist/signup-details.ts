import { contactFormQuestions } from "@/lib/contact/survey";
import { waitlistFormQuestions } from "@/lib/waitlist/survey";
import type { WaitlistSignup } from "@/lib/waitlist/types";

const questionLabels = Object.fromEntries(
  [...waitlistFormQuestions, ...contactFormQuestions].map((q) => [q.id, q.label])
);

const summaryFieldIds = new Set(["firstName", "lastName", "email"]);

function formatAnswer(value: string | string[] | undefined): string {
  if (value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

export function getSignupDetailEntries(signup: WaitlistSignup) {
  const entries: { label: string; value: string }[] = [];

  for (const [id, value] of Object.entries(signup.answers)) {
    if (summaryFieldIds.has(id)) continue;
    const question = [...waitlistFormQuestions, ...contactFormQuestions].find((q) => q.id === id);
    const label = question
      ? question.group
        ? `${question.group} — ${question.label}`
        : question.label
      : questionLabels[id] ?? id;
    const formatted = formatAnswer(value);
    if (formatted === "—") continue;
    entries.push({ label, value: formatted });
  }

  return entries;
}

export function getSignupFullName(signup: WaitlistSignup): string {
  return [signup.firstName, signup.answers.lastName].filter(Boolean).join(" ");
}
