import type { SurveyQuestion } from "./types";

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const timesOfDay = ["Morning", "Noon", "Afternoon", "Evening"] as const;

const preferenceSlotQuestions: SurveyQuestion[] = [1, 2].flatMap((slot) => [
  {
    id: `option${slot}Day`,
    type: "select",
    label: "Day of the week",
    hint: "Select day",
    required: false,
    group: `Option ${slot}`,
    options: [...weekDays],
  },
  {
    id: `option${slot}Time`,
    type: "select",
    label: "Time of day",
    hint: "Select time",
    required: false,
    group: `Option ${slot}`,
    options: [...timesOfDay],
  },
]);

/** Shown on the waitlist page. */
export const waitlistFormQuestions: SurveyQuestion[] = [
  {
    id: "firstName",
    type: "text",
    label: "First name",
    placeholder: "Your first name",
    required: true,
  },
  {
    id: "lastName",
    type: "text",
    label: "Last name",
    placeholder: "Your last name",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email address",
    placeholder: "you@example.com",
    required: true,
  },
  ...preferenceSlotQuestions,
  {
    id: "whatBringsYou",
    type: "textarea",
    label: "What brings you to the waitlist right now?",
    placeholder: "Share as much or as little as feels right…",
    required: false,
  },
  {
    id: "heardAbout",
    type: "text",
    label: "How did you hear about Kirstan?",
    placeholder: "Instagram, friend, Google, etc.",
    required: false,
  },
];

/** Reserved for contact page — see src/lib/contact/survey.ts */
export const contactSurveyQuestions = [] as const;

export const allSurveyQuestions = [...waitlistFormQuestions];

export const waitlistConfig = {
  title: "The Healing Room",
  subtitle: "Join the Waitlist",
  description:
    "A small intimate healing container for women ready to reconnect with themselves, explore beneath the surface and create lasting change.",
  successMessage:
    "You're on the list. We'll email you as soon as spots open — thank you for raising your hand.",
  source: "waitlist",
} as const;
