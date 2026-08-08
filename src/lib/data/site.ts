export const siteConfig = {
  name: "Kirstan Earl",
  tagline: "Multidimensional Healer & Intuition Mentor",
  location: "Margaret River, Western Australia",
  email: "kirstan@kirstanearl.com",
  instagram: "https://www.instagram.com/kirstanearl/",
  instagramHandle: "@kirstanearl",
  substack: "https://substack.com/@kirstanearl",
  substackHandle: "@kirstanearl",
  calendlyUrl: "https://calendly.com/kirstanearl",
  freeConnectionCallUrl: "https://calendly.com/kirstan-kirstanearl/freecc",
  description:
    "A grounded and compassionate space to uncover and heal the root causes beneath the patterns, beliefs and emotional wounds that keep you feeling stuck, so you can trust your inner wisdom, live authentically and experience true freedom.",
  images: {
    portrait: "/images/kirstan-portrait.webp",
  },
} as const;

export const heroStatement =
  "Healing isn't about becoming someone new...\nIt's about remembering who you are";

export type NavLink = {
  label: string;
  href: string;
  isButton?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Sessions", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Healing Room", href: "/waitlist" },
  { label: "Contact", href: "/contact" },
  { label: "Book Now", href: "/#book", isButton: true },
];

export const thisWorkIsForYou = [
  "You feel disconnected from yourself beneath the demands of everyday life and have spent so long caring for others that your own needs, desires and inner voice have faded into the background.",
  "You find it difficult to prioritise yourself, set boundaries or make space for your own needs without guilt, often feeling like you're carrying the weight of everything on your shoulders.",
  "You tend to overthink, anticipate the needs of others, feel highly attuned to their emotions and energy, and find it difficult to fully relax or switch off.",
  "Deep down you know what feels right for you, but you question, doubt or dismiss your own intuition, living according to the expectations of others instead of your own truth.",
  "You're navigating anxiety, grief, loss, a life transition or an identity shift, and you're longing for a deeper connection with yourself.",
  "You're ready to release what no longer serves you, trust yourself more deeply and remember who you truly are.",
] as const;

export const transformationContent = {
  heading: "AS YOU RETURN TO YOURSELF…",
  feelings: [
    "A deeper sense of peace and calm, as the need to constantly scan, anticipate and react begins to quieten.",
    "Less pressure to hold everything together all the time, allowing yourself more space to breathe, rest and simply be.",
    "Knowing what you need, what you want and what truly feels right for you, without constantly questioning yourself.",
    "Trusting your own intuition and inner wisdom, recognising that many of the answers you've been searching for have been within you all along.",
    "A quieter mind, with less overthinking and mental spiralling, and more awareness of what's happening beneath the surface.",
    "More ease in setting boundaries, expressing yourself honestly and making decisions that feel right for you, without the guilt or need to over explain yourself.",
    "No longer carrying the emotions, expectations and opinions of others as though they were your own.",
    "Freedom from the old patterns and survival strategies that once shaped your life, no longer feeling the need to shrink, prove, perform or please.",
    "Living in a way that feels authentic, grounded and true to who you are.",
  ],
  closing: [
    "Coming home to yourself.",
    "Because healing isn't about becoming someone new.",
    "It's about remembering who you are… When you're no longer carrying everything that was never yours to begin with.",
  ],
} as const;

export const signatureMethodology = {
  paragraphs: [
    "I believe healing is not about becoming someone new, but the process of returning to who you truly are beneath conditioning, survival patterns and limiting beliefs. Remembering the parts of yourself that have always existed beneath who you've had to become in order to cope, belong or be loved.",
    "I am not here to fix you, but to hold a clear space where you can begin to hear yourself more clearly, trust your inner knowing, and reconnect with your own truth.",
    "My approach is intuitive, flexible and deeply attuned to each person's unique experience. I work with what is present beneath the surface in each moment, guided by what is ready to be seen, explored and understood.",
    "The intention of my work is to support women to return to themselves, trust their inner wisdom and live from a place that feels deeply authentic.",
    "My work is not built on a single modality, certification or step-by-step process. It is shaped by my own healing journey, lived experience, professional training and years of supporting women through deep transformation.",
  ],
} as const;

export const aboutParagraphs: readonly string[] = [];

export const services = [
  {
    id: "multidimensional-healing",
    title: "1:1 Multidimensional Healing Sessions",
    paragraphs: [
      "Experience deep healing through a powerful blend of healing modalities, including subconscious reprogramming and belief work, memory retrieval and processing, somatic release, intuitive guidance, energetic attunement, emotional processing and reflective exploration.",
      "Together we uncover and heal the root causes of triggers, trauma, subconscious beliefs, patterns and experiences that may be shaping your life to create peace, safety within, self trust and lasting transformation.",
      "I hold a supportive space for guided self reflection, facilitating deeper awareness, insight and understanding, allowing healing to emerge naturally.",
      "No two sessions are the same. Each session is guided by what is most needed in the moment.",
    ],
    slug: "multidimensional-healing",
    showLearnMore: false,
    showBookSession: true,
    bookSessionHref: "https://calendly.com/kirstan-kirstanearl/healingsession",
  },
  {
    id: "healing-room",
    title: "The Healing Room",
    paragraphs: [
      "A small intimate healing container for 6 women to come together fortnightly on Zoom for reflection, personal guidance, witnessing and healing. A bridge between navigating your journey on your own and receiving personalised 1:1 support.",
    ],
    slug: "healing-room",
    showLearnMore: true,
    learnMoreHref: "/waitlist",
    showBookSession: false,
  },
  {
    id: "private-mentorship",
    title: "Private Mentorship",
    paragraphs: [
      "A deeply supportive 1:1 container for women ready to move beyond surface level healing and commit to lasting inner transformation.",
      "This is an ongoing space of healing and integration, where we work together over time to shift deeper patterns, emotional imprints, conditioning and beliefs that shape how you think, feel and show up in your life.",
      "Rather than single sessions, this work supports you through an unfolding process, helping you move through real time challenges, integrate insights as they arise, and deepen your connection to yourself, your intuition and inner wisdom.",
      "Between sessions, you'll receive personalised voice messages offering support, reflection and intuitive insight, so you feel held as you navigate change and return to your own inner clarity.",
      "Choose from 2, 4 or 6 month containers, tailored to the depth of support and transformation you are ready for.",
    ],
    slug: "private-mentorship",
    showLearnMore: false,
    showBookSession: false,
    ctaLabel: "Book a FREE Connection Call",
    ctaHref: siteConfig.freeConnectionCallUrl,
  },
] as const;

export const testimonials = [
  {
    id: "eugene-1",
    name: "Eugene",
    review:
      "Just wanted to say another big thank you for all you have shared and done for me within the last 8 weeks. I have felt so held in this container. A place of deep healing and self discovery. You are an amazing teacher-mentor-healer and I hold so much gratitude to have had you come into my life journey. I know our work together is not done. Till then take care and sending you a big hug.",
  },
  {
    id: "fh",
    name: "F.H.",
    review:
      "Kirstan has helped me to uncover so much within myself and move past limiting beliefs. It's allowed me to trust myself more and tune in to my intuition and feel empowered when making decisions. I'm so grateful. Thank you lovely Kirstan",
  },
  {
    id: "nicole",
    name: "Nicole",
    review:
      "Instantly Kirstan had insights for me that literally brought me to tears. Things that I had never spoken about to anyone. The relief was immediate and the shift within my physical body was incredible. Years of grief shifted within the session which also gave me the opportunity to be guided into long term solutions for processing other emotions that would come up as I processed my thoughts around everything that was discussed.",
  },
  {
    id: "eg",
    name: "E.G.",
    review:
      "My experience of a session with Kirstan allowed me to be within a space of compassion and healing. Kirstan helped me to hear through her what had been within me but that I wasn't able to access on my own. It opened up certain things I needed to put into place in order to progress in my own healing journey. It's so important to realise that you don't have to do this alone.",
  },
  {
    id: "kylie-1",
    name: "Kylie",
    review:
      "I had a healing session with Kirstan. She picked up on so many things that I was struggling with and brought attention to the disconnect I had with certain areas in my body. She gave me a completely new perspective and held me so beautifully while I realised a lot of stored emotions. Her support and care and inner knowing was just what I needed to work through these issues. I would highly recommend her.",
  },
  {
    id: "mh",
    name: "M.H.",
    review:
      "I felt safe to talk about things I've never shared with my therapist in the years working together",
  },
  {
    id: "eugene-2",
    name: "Eugene",
    review:
      "I'm slowly allowing it to integrate. Then all of a sudden a thought drops in or my mindset shifts and I know deeply that I have changed and I am changing. It's more of a knowing. A deep feeling of calm, acceptance and truth. I suppose I could say it's like I'm a puzzle and a little piece has just been slotted back into me. I feel more complete.",
  },
  {
    id: "cm",
    name: "C.M.",
    review:
      "I recently had a healing session with Kirstan via zoom and was very pleasantly surprised by what she was able to uncover in such a short amount of time. Kirstan tapped into some deep rooted urges and fears that I had clearly buried deep in my subconscious, which ended up surfacing a lot of surprising emotions. Going into this session I was a bit lost, unmotivated and sad. I felt like I was living Groundhog Day over and over with no light at the end of the tunnel. My kids, my relationship and my health were suffering. Since our session, I've been reassessing what isn't working in my life and am now exploring some new paths and even careers that are making me extremely happy. I feel as though I gained a lot more clarity and reassurance to start changing the course of my life for the better, and have found joy in the little things once again!",
  },
  {
    id: "jl",
    name: "J.L.",
    review:
      "My session with Kirstan was illuminating and clarifying! She has such a kind, calm & grounded demeanour that left me feeling super connected and understood. Her insights left me feeling empowered and guided. She picked up everything I am going through with this current unstable time and helped me refocus on my priorities again! Would absolutely recommend a session with Kirstan when seeking some clarity & guidance.",
  },
  {
    id: "mk",
    name: "M.K.",
    review:
      "For me the thing that has been the biggest breakthrough has been really trusting myself. In the past I'd really question it and doubt it and now I'm really backing myself that I'm doing it and trusting it more which is really exciting and knowing when something is an intuitive hit and taking action on them too",
  },
  {
    id: "sl",
    name: "S.L.",
    review:
      "With the guidance of Kirstan who is gentle supportive and so inspiring. I have learned to trust myself, to dedicate time for myself and not feel guilty but proud about it, and tap into my intuition and learn all things spiritual I didn't even know I was missing in my life",
  },
  {
    id: "kylie-2",
    name: "Kylie",
    review:
      "Nawww thanks lovely your course has ripped me open in so many ways to help me search for the parts of myself I had been looking for so long and then bang the channel opened and all of this has just flowed through and felt so unbelievable right and I am just in such a happiness and empowering bubble…",
  },
  {
    id: "se",
    name: "S.E.",
    review:
      "I haven't felt like this for so many years, I'm very connected to myself. I am attracting and manifesting so many things right now",
  },
  {
    id: "vw",
    name: "V.W.",
    review:
      "Kirstan has a very warm energy and conducted my session with a great deal of compassion. Her observations were insightful and she gave me some practical steps to take to move forward.",
  },
  {
    id: "ria",
    name: "Ria",
    review:
      "I had a wonderful session with Kirstan recently, who has the most beautiful and loving energy. She picked up on quite a few things that was going on at the time and gave me some practical things to do to help with those certain situations. Being a \"stressed out mum\", I felt that next layer of connection, understanding, support, healing and validation from Kirstan. Thank you for sharing your gift with me.",
  },
] as const;

export const bookingOptions = [
  {
    id: "discovery",
    label: "Free Connection Call",
    description: "Complimentary 20-minute call",
    calendlyPath: "/discovery-call",
  },
  {
    id: "returning",
    label: "1:1 Healing Therapy Session",
    description: "60–90 minutes",
    calendlyPath: "/returning-healing-session",
  },
] as const;

export const finalInvitation = {
  title: "Not Sure Where to Start?",
  heading: "Book a FREE Connection Call",
  paragraphs: [
    "A safe and supportive space where you can talk openly about where you are, what you're navigating, and the changes you'd like to create in your life.",
    "We'll explore what's coming up for you, where you'd like support, and whether working together feels aligned.",
  ],
  details: "Come as you are, no fuss, just a coffee catch up.",
  duration: "20 minute Zoom Call",
} as const;

export const instagramPosts = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    alt: "Peaceful wellness moment",
    link: siteConfig.instagram,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    alt: "Calm meditation practice",
    link: siteConfig.instagram,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=400&fit=crop",
    alt: "Nature and healing",
    link: siteConfig.instagram,
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=400&fit=crop",
    alt: "Self-care ritual",
    link: siteConfig.instagram,
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c086b417e?w=400&h=400&fit=crop",
    alt: "Margaret River landscape",
    link: siteConfig.instagram,
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=400&fit=crop",
    alt: "Mindful wellness",
    link: siteConfig.instagram,
  },
] as const;

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/#home" },
    { label: "Sessions", href: "/#services" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Healing Room", href: "/waitlist" },
    { label: "Contact", href: "/contact" },
    { label: "Book Now", href: "/#book" },
  ],
  services: services.map((s) => ({
    label: s.title,
    href: "/#services",
  })),
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
} as const;
