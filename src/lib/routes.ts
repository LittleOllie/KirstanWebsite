/**
 * Central route registry for current and future site sections.
 * Add new routes here as the site grows (blog, podcast, courses, etc.)
 */
export const routes = {
  home: "/",
  about: "/about",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  disclaimer: "/disclaimer",
  book: "/#book",
  waitlist: "/waitlist",
  contact: "/contact",
  admin: "/admin",
  adminWaitlist: "/admin/waitlist",

  // Future routes — uncomment and implement when ready
  // blog: "/blog",
  // podcast: "/podcast",
  // courses: "/courses",
  // membership: "/membership",
  // portal: "/portal",
  // meditations: "/meditations",
  // shop: "/shop",
  // retreats: "/retreats",
  // workshops: "/workshops",

  service: (slug: string) => `/services/${slug}`,
} as const;
