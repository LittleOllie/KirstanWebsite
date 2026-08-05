import { contactFormQuestions } from "@/lib/contact/survey";
import { waitlistFormQuestions } from "./survey";
import type { WaitlistSignup } from "./types";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatAnswer(value: string | string[] | undefined): string {
  if (value === undefined) return "";
  if (Array.isArray(value)) return value.join("; ");
  return value;
}

export function waitlistToCsv(signups: WaitlistSignup[]): string {
  const answerIds = [...waitlistFormQuestions, ...contactFormQuestions]
    .map((q) => q.id)
    .filter((id) => id !== "firstName" && id !== "email");

  const headers = [
    "id",
    "created_at",
    "notified_at",
    "first_name",
    "email",
    "source",
    ...answerIds,
  ];

  const rows = signups.map((signup) => [
    signup.id,
    signup.createdAt,
    signup.notifiedAt ?? "",
    signup.firstName,
    signup.email,
    signup.source,
    ...answerIds.map((id) => formatAnswer(signup.answers[id])),
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => escapeCsv(String(cell))).join(","))
    .join("\n");
}
