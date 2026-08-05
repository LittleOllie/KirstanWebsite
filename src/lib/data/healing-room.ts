export const healingRoomContent = {
  intro: [
    "A small intimate healing container for women ready to reconnect with themselves, explore beneath the surface and create lasting change.",
    "The Healing Room is a space for 6 women to come together fortnightly on Zoom for reflection, personal guidance, witnessing and healing. A bridge between navigating your journey on your own and receiving personalised 1:1 support.",
    "The Healing Room is not about logically trying to understand or “fix” yourself. It is about creating the space for healing to happen.",
  ],
  opportunityHeading: "The Healing Room creates an opportunity for you to:",
  opportunities: [
    "Bring what is present for you in the moment",
    "Ask questions and receive personalised guidance and insight",
    "Feel supported in your journey",
    "Allow what is ready to be seen, felt and released",
    "Experience the power of being witnessed in your healing",
  ],
  middle: [
    "One of the beautiful things about healing in a group is that it reminds you you're not alone. As each woman shares what she's navigating, you'll often recognise parts of yourself in her story. The guidance offered to one woman frequently becomes exactly what another woman needed to hear, creating moments of insight, validation and healing. Sometimes the deepest healing comes from simply witnessing someone else.",
    "Each woman has dedicated time to explore what is most present for her while receiving personalised guidance, reflection and support.",
    "In these sessions, you begin to strengthen the relationship you have with yourself, learning to listen inward, meet your emotions with compassion and trust your own inner wisdom.",
    "The practices and reflections explored within The Healing Room aren't just for the session itself. They become simple ways of meeting yourself in everyday life, creating more awareness, presence and self trust, so the healing continues long after the session ends.",
  ],
  beginHeading: "In The Healing Room you'll begin to:",
  beginItems: [
    "Move beyond surface level healing and actively participate in your healing journey",
    "Deepen your relationship with yourself",
    "Learn to meet your emotions with compassion instead of judgement",
    "Strengthen self trust and listen to your inner wisdom",
    "Feel supported and witnessed by women who truly understand",
    "Integrate your healing into everyday life",
  ],
  closing:
    "You don't have to arrive with the right words, know exactly what's wrong or have everything figured out. You simply arrive exactly as you are. Together we'll meet whatever is present with curiosity, compassion and care.",
  foundingMembership: {
    title: "Founding Membership",
    price: "$57 per session",
    items: [
      "Fortnightly 90-minute Healing Room group call",
      "Maximum 6 women",
      "Dedicated time for each woman to receive personalised guidance",
      "Month-to-month commitment",
    ],
  },
  oneOff: {
    title: "One-Off Session",
    price: "$67 per session",
    description: "Join an individual Healing Room circle when a space is available.",
  },
  notes: [
    "Sessions are held fortnightly via Zoom and recorded if you wish to re-watch the session.",
    "Due to the intimate nature of The Healing Room, spaces are limited.",
  ],
} as const;

/** Short copy for the homepage services card */
export const healingRoomCardParagraphs = [
  healingRoomContent.intro[0],
  healingRoomContent.intro[1],
  healingRoomContent.intro[2],
] as const;
