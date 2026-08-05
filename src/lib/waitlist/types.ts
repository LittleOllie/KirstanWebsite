export type SurveyQuestionType = "text" | "email" | "textarea" | "select" | "radio" | "checkbox";

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: readonly string[];
}

export interface WaitlistSignup {
  id: string;
  email: string;
  firstName: string;
  answers: Record<string, string | string[]>;
  source: string;
  notifiedAt: string | null;
  createdAt: string;
}

export interface WaitlistSignupInput {
  email: string;
  firstName: string;
  answers: Record<string, string | string[]>;
  source?: string;
}
