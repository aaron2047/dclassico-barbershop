// The one file that changes per client demo. Everything else reads from this.
export const client = {
  slug: "dclassico-barbershop",
  businessType: "Barbershop" as const, // maps to schema.org type in lib/schema.ts

  name: "D'Classico Barbershop",
  tagline: "Traditional technique, modern precision.",
  neighborhood: "Olney",
  city: "Philadelphia",
  state: "PA",

  // Real, found via their Instagram (a promo clip with a phone/address
  // overlay). Confirm against their GBP listing once claimed, but this
  // is verified against their own posted content, not a guess.
  phone: "(267) 342-3137",
  address: {
    street: "4947 N 5th St",
    city: "Philadelphia",
    neighborhood: "Olney",
    state: "PA",
    zip: "19120",
  },

  // Hours are still a placeholder — not visible in their Instagram content.
  // Confirm with the shop before this goes live anywhere public.
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "4:00 PM" },
  ],

  acceptsWalkIns: false,

  // Prices: two figures are sourced (public directory listings for this
  // shop, cross-checked against Yelp) — those carry a real `price`. The
  // rest are real service categories from their Booksy menu but with no
  // sourced number, so `price: null` on purpose — the UI links out to
  // Booksy for those rather than inventing a figure. Replace the sourced
  // ones with exact numbers too once you have them from the shop directly.
  services: [
    { name: "Men's Haircut", price: "From $20", duration: "30 min" },
    { name: "Line-Up / Trim", price: "From $12", duration: "15 min" },
    { name: "Beard Trim", price: null, duration: "20 min" },
    { name: "Full Shave", price: null, duration: "30 min" },
    { name: "Cut + Beard Combo", price: null, duration: "45 min" },
    { name: "Kids Haircut", price: null, duration: "30 min" },
  ] as { name: string; price: string | null; duration: string }[],

  // Set this to the shop's real Booksy service-list URL once you have the
  // link itself (not just a label) — ServicesMenu links out to it for
  // exact current pricing on the services with no sourced number above.
  pricingSourceUrl: "",

  barbers: 7, // real count — counted from their own team photo

  // REAL Cal.com event, created in Aaron's account: "Premium Haircut &
  // Style - 30 mins" at cal.com/premium-haircut-style-30-mins-c9gv.
  // IMPORTANT: this event is still a Draft in Cal.com as of when this was
  // set — the booking button will not work until it's published. Publish
  // it in the Cal.com dashboard before presenting this demo live.
  // Once D'Classico signs, this can move to their own Cal.com account
  // instead of Aaron's personal one — same pattern, just a new link.
  calLink: "premium-haircut-style-30-mins-c9gv",
  calNamespace: "cut",

  gbpUrl: "", // fill with the real Google Business Profile URL once claimed/verified
  reviewUrl: "", // direct "leave a review" link, same source

  // Hero background. heroVideo takes priority when set (a muted, looping
  // clip exported from one of their Instagram reels — mp4, ideally under
  // 5MB, 1920x1080 or similar, placed in /public/gallery). heroImage is
  // the fallback/poster, used alone until a video file is provided.
  heroImage: "/gallery/team-hero.jpg",
  heroVideo: undefined as string | undefined,

  // Real shop photos, pulled from their Instagram by Aaron. The one
  // promotional clip with a baked-in "Book Now" phone/address overlay
  // was left out on purpose — not a clean photo for a grid.
  gallery: [
    { src: "/gallery/fade-design-01.jpg", alt: "Precision fade with a custom line design" },
    { src: "/gallery/curly-fade.jpg", alt: "Curly fade finish, barber styling the top" },
    { src: "/gallery/service-detail-01.jpg", alt: "Barber working a cut under the shop's signature lighting" },
    { src: "/gallery/neck-fade-design.jpg", alt: "Fade with a detailed neckline design" },
    { src: "/gallery/geometric-fade.jpg", alt: "Geometric line design cut into a fade" },
    { src: "/gallery/kids-cut.jpg", alt: "Kids cut with a clean part" },
    { src: "/gallery/team-closing.jpg", alt: "The full D'Classico team" },
  ],

  // Reviews: leave empty until there are real Google reviews to pull in —
  // never fabricate testimonials. The Reviews component shows an honest
  // empty state (with a link to gbpUrl, once set) until this has entries.
  // Shape once populated: { author, rating, text, source: "Google" }.
  reviews: [] as { author: string; rating: number; text: string; source: string }[],

  // Lead capture: Formspree. Aaron has an account but the form endpoint
  // isn't confirmed yet — log into formspree.io, create/open a form, and
  // paste its endpoint here (format: "https://formspree.io/f/xxxxxxxx").
  // Until it's real, submissions will fail with the form's visible error
  // state rather than silently pretending to succeed.
  leadFormEndpoint: "https://formspree.io/f/WOOLPH_DEMO_PLACEHOLDER",
  leadFormDestinationNote: "pending real Formspree form ID from Aaron's account",

  brand: {
    // Pulled close to the shop's actual space: gold fixtures, hex-tile
    // lighting, black marble floor — richer gold than a muted SaaS-brass.
    background: "#1C1815", // espresso charcoal, not cool zinc
    accent: "#B8923E", // gold, matched to their real chairs/fixtures
    foreground: "#FAFAF9",
  },
};

export type ClientConfig = typeof client;
