import { validateSurveyPayload } from "@/lib/waitlist/validate-survey";
import { contactFormQuestions, contactConfig } from "./survey";

export function validateContactPayload(body: unknown) {
  return validateSurveyPayload(contactFormQuestions, body, contactConfig.source);
}
