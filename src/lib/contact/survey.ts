import type { SurveyQuestion } from "@/lib/waitlist/types";

export const contactFormQuestions: SurveyQuestion[] = [
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
  {
    id: "whatBringsYou",
    type: "textarea",
    label: "What brings you here right now?",
    placeholder: "Share as much or as little as feels right…",
    required: false,
  },
  {
    id: "biggestChallenge",
    type: "select",
    label: "What feels like your biggest challenge at the moment?",
    required: true,
    options: [
      "Anxiety or overwhelm",
      "Grief or loss",
      "Self-doubt or people-pleasing",
      "Burnout or exhaustion",
      "Life transition",
      "Something else",
    ],
  },
  {
    id: "supportType",
    type: "radio",
    label: "What kind of support are you most interested in?",
    required: true,
    options: [
      "1:1 healing sessions",
      "Private mentorship",
      "Not sure yet",
    ],
  },
  {
    id: "heardAbout",
    type: "text",
    label: "How did you hear about Kirstan?",
    placeholder: "Instagram, friend, Google, etc.",
    required: false,
  },
];

export const contactConfig = {
  title: "Get in Touch",
  subtitle: "Contact Kirstan",
  description:
    "Whether you have a question, want to explore working together, or simply need a compassionate space to be heard — you're welcome here.",
  successMessage:
    "Thank you for reaching out. Kirstan will be in touch soon.",
  source: "contact",
} as const;
