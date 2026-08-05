import type { SurveyQuestion } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(["waitlist", "contact"]);

const MAX_FIRST_NAME = 100;
const MAX_EMAIL = 254;
const MAX_TEXT = 500;
const MAX_TEXTAREA = 2000;
const MAX_CHECKBOX_ITEMS = 20;

/** Bot honeypot field name — must stay empty. */
export const HONEYPOT_FIELD = "website";

function assertMaxLength(label: string, value: string, max: number) {
  if (value.length > max) {
    throw new Error(`${label} is too long.`);
  }
}

export function validateSurveyPayload(
  questions: SurveyQuestion[],
  body: unknown,
  source: string
): {
  firstName: string;
  email: string;
  answers: Record<string, string | string[]>;
  source: string;
} {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body.");
  }

  const record = body as Record<string, unknown>;

  const honeypot = record[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    throw new Error("HONEYPOT");
  }

  const answers =
    record.answers && typeof record.answers === "object" && !Array.isArray(record.answers)
      ? (record.answers as Record<string, unknown>)
      : {};

  const firstName = String(answers.firstName ?? record.firstName ?? "").trim();
  const email = String(answers.email ?? record.email ?? "")
    .trim()
    .toLowerCase();

  if (!firstName) throw new Error("First name is required.");
  assertMaxLength("First name", firstName, MAX_FIRST_NAME);

  if (!email || !EMAIL_RE.test(email)) throw new Error("A valid email address is required.");
  assertMaxLength("Email", email, MAX_EMAIL);

  const normalized: Record<string, string | string[]> = {};

  for (const question of questions) {
    const value = answers[question.id];

    if (question.id === "firstName" || question.id === "email") {
      normalized[question.id] = question.id === "email" ? email : firstName;
      continue;
    }

    if (question.required && (value === undefined || value === "" || value === null)) {
      throw new Error(`${question.label} is required.`);
    }

    if (value === undefined || value === null || value === "") continue;

    if (question.type === "checkbox") {
      if (!Array.isArray(value) || value.length === 0) {
        if (question.required) throw new Error(`${question.label} is required.`);
        continue;
      }
      if (value.length > MAX_CHECKBOX_ITEMS) {
        throw new Error(`${question.label} has too many selections.`);
      }

      const allowed = question.options ? new Set(question.options) : null;
      const items = value.map(String);
      for (const item of items) {
        assertMaxLength(question.label, item, MAX_TEXT);
        if (allowed && !allowed.has(item)) {
          throw new Error(`${question.label} contains an invalid option.`);
        }
      }
      normalized[question.id] = items;
    } else if (question.type === "select" || question.type === "radio") {
      const text = String(value).trim();
      if (question.options && !question.options.includes(text)) {
        throw new Error(`${question.label} contains an invalid option.`);
      }
      assertMaxLength(question.label, text, MAX_TEXT);
      normalized[question.id] = text;
    } else {
      const text = String(value).trim();
      const max = question.type === "textarea" ? MAX_TEXTAREA : MAX_TEXT;
      assertMaxLength(question.label, text, max);
      normalized[question.id] = text;
    }
  }

  const requestedSource = typeof record.source === "string" ? record.source.trim() : source;
  const resolvedSource = ALLOWED_SOURCES.has(requestedSource) ? requestedSource : source;
  if (!ALLOWED_SOURCES.has(resolvedSource)) {
    throw new Error("Invalid request.");
  }

  return {
    firstName,
    email,
    answers: normalized,
    source: resolvedSource,
  };
}
