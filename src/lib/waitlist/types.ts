export type SurveyQuestionType = "text" | "email" | "textarea" | "select" | "radio" | "checkbox";

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  options?: readonly string[];
  /** Max selections for checkbox questions */
  maxSelections?: number;
  /** Visual group heading in the form (e.g. "Option 1") */
  group?: string;
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
