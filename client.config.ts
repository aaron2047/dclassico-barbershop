// The one file that changes per client demo. Everything else reads from this.
export const client = {
  slug: "dclassico-barbershop",
  businessType: "Barbershop" as const, // maps to schema.org type in lib/schema.ts

  name: "D'Classico Barbershop",
  tagline: "Traditional technique, modern precision.",
  neighborhood: "Olney",
  city: "Philadelphia",
  state: "PA",

  // Placeholder contact info — swap for the real shop's details once confirmed.
  phone: "(215) 555-0147",
  address: {
    street: "123 N 5th St",
    city: "Philadelphia",
    neighborhood: "Olney",
    state: "PA",
    zip: "19120",
  },

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

  services: [
    { name: "Signature Fade", price: "$35", duration: "45 min" },
    { name: "Classic Cut", price: "$28", duration: "30 min" },
    { name: "Beard Trim & Line-Up", price: "$18", duration: "20 min" },
    { name: "Cut + Beard Combo", price: "$45", duration: "60 min" },
    { name: "Hot Towel Shave", price: "$30", duration: "30 min" },
    { name: "Kids Cut (12 & under)", price: "$22", duration: "30 min" },
  ],

  barbers: 4,

  // DEMO Cal.com link — not a live booking account yet.
  // Swap for the real client's org/event-type once they sign.
  calLink: "woolph-demo/dclassico-cut",
  calNamespace: "cut",

  gbpUrl: "", // fill with the real Google Business Profile URL once claimed/verified
  reviewUrl: "", // direct "leave a review" link, same source

  // Gallery: swap these placeholder photos for the shop's real ones once
  // Aaron pulls them from the client. Each needs an { src, alt }.
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
      alt: "Barber giving a precision fade",
    },
    {
      src: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=800&q=80",
      alt: "Barbershop interior, chairs and mirrors",
    },
    {
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      alt: "Close detail of a clean beard line-up",
    },
    {
      src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      alt: "Barber tools laid out on a station",
    },
  ],

  // Reviews: leave empty until there are real Google reviews to pull in —
  // never fabricate testimonials. The Reviews component shows an honest
  // empty state (with a link to gbpUrl, once set) until this has entries.
  // Shape once populated: { author, rating, text, source: "Google" }.
  reviews: [] as { author: string; rating: number; text: string; source: string }[],

  // Lead capture: Web3Forms access key. Free, no account needed beyond
  // confirming an inbox — generate one at https://web3forms.com (enter an
  // email, get a key back instantly). Using Aaron's own email as the
  // placeholder destination until the client's real email is confirmed;
  // swap the key (not the component) when that's ready.
  leadFormAccessKey: "WOOLPH_DEMO_PLACEHOLDER_KEY",
  leadFormDestinationNote: "woolphllc@gmail.com (placeholder, pending client email)",

  brand: {
    background: "#1C1815", // espresso charcoal, not cool zinc
    accent: "#8A6A3D", // brass, not amber
    foreground: "#FAFAF9",
  },
};

export type ClientConfig = typeof client;
