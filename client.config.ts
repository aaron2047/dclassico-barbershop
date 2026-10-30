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

  brand: {
    background: "#1C1815", // espresso charcoal, not cool zinc
    accent: "#8A6A3D", // brass, not amber
    foreground: "#FAFAF9",
  },
};

export type ClientConfig = typeof client;
