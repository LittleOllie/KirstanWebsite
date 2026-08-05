import { waitlistFormQuestions } from "./survey";
import { validateSurveyPayload } from "./validate-survey";

export function validateWaitlistPayload(body: unknown) {
  return validateSurveyPayload(waitlistFormQuestions, body, "waitlist");
}
