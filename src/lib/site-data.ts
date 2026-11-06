/**
 * Business details from OCC, Booksy, and supplied screenshots (Nov 2026).
 * Verify spelling, services, rates, roster, hours, reviews and photo rights with owner.
 * DO NOT add fictional prices, review quotes, or live appointment slots.
 */

export const BUSINESS = {
  name: "D'Clasicos Barber Shop",
  shortName: "D'CLASICOS",
  phoneDisplay: "(267) 342-3137",
  phoneHref: "+12673423137",
  streetAddress: "4947 N 5th St",
  locality: "Philadelphia, PA 19120",
  neighborhood: "Olney · Philadelphia",
  instagram: "https://www.instagram.com/d_clasicos.barbershop/",
  directory: "https://olneycollab.com/listing/dclasico-barbershop/",
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=D%27Clasicos%20Barber%20Shop%204947%20N%205th%20St%20Philadelphia",
  googleDirections:
    "https://www.google.com/maps/dir/?api=1&destination=4947+N+5th+St+Philadelphia+PA+19120",
};

export type ServiceId =
  | "haircut"
  | "haircut-beard"
  | "line-up"
  | "beard-trim"
  | "kids-haircut"
  | "shave";

export type Service = {
  id: ServiceId;
  label: string;
  summary: string;
  category: string;
};

export const SERVICES: Service[] = [
  {
    id: "haircut",
    label: "Signature Haircut",
    summary: "A sharp, tailored cut finished with attention to the small details.",
    category: "THE ESSENTIAL",
  },
  {
    id: "haircut-beard",
    label: "Cut + Beard",
    summary: "A complete refresh for the hair, beard and overall shape.",
    category: "THE FULL SERVICE",
  },
  {
    id: "line-up",
    label: "Line Up",
    summary: "Clean edges and precise definition between full cuts.",
    category: "THE FINISH",
  },
  {
    id: "beard-trim",
    label: "Beard Trim",
    summary: "A considered shape-up for a well-groomed beard.",
    category: "THE DETAIL",
  },
  {
    id: "kids-haircut",
    label: "Kids' Haircut",
    summary: "Fresh cuts for younger clients, with care and patience.",
    category: "THE NEXT GENERATION",
  },
  {
    id: "shave",
    label: "Shave",
    summary: "A classic grooming service with a clean finish.",
    category: "THE CLASSIC",
  },
];

// Owner to supply names, individual photos, specialties and actual booking links.
export const BARBERS = Array.from({ length: 7 }, (_, index) => ({
  id: `barber-${index + 1}`,
  name: `Barber ${String(index + 1).padStart(2, "0")}`,
  number: String(index + 1).padStart(2, "0"),
  detail: "Individual schedule",
}));

/**
 * LIVE BOOKING CONFIGURATION:
 * Insert actual PUBLIC Cal.com event-type links for each service + barber.
 * `any` must be a Cal.com TEAM ROUND-ROBIN event for that service.
 * `barbers` maps the seven individual barber IDs to their event links.
 * Do not use the expired /premium-haircut-style-30-mins-c9gv event page.
 *
 * Example (only after owner has set up live schedules):
 * haircut: {
 *   any: "https://cal.com/your-team/haircut-any-barber",
 *   barbers: { "barber-1": "https://cal.com/your-first-barber/haircut" },
 * },
 */
export const CAL_LINKS: Record<
  ServiceId,
  { any: string; barbers: Record<string, string> }
> = {
  haircut: { any: "", barbers: {} },
  "haircut-beard": { any: "", barbers: {} },
  "line-up": { any: "", barbers: {} },
  "beard-trim": { any: "", barbers: {} },
  "kids-haircut": { any: "", barbers: {} },
  shave: { any: "", barbers: {} },
};

export const GALLERY = [
  { src: "/images/cut-hero.webp", alt: "Fresh fade and shaped beard", label: "PRECISION FADE" },
  { src: "/images/barber-working.webp", alt: "Barber working with clippers", label: "THE CRAFT" },
  { src: "/images/cut-design.webp", alt: "Detailed hair design at the back of a cut", label: "CUSTOM DETAIL" },
  { src: "/images/cut-close.webp", alt: "Close crop with shaped sides", label: "CLEAN FINISH" },
  { src: "/images/cut-back.webp", alt: "Back view of a fresh cut", label: "THE BACK VIEW" },
  { src: "/images/shop-interior.webp", alt: "Interior of the barbershop", label: "INSIDE THE SHOP" },
  { src: "/images/cut-fade.webp", alt: "Fade haircut at D'Clasicos", label: "SIGNATURE CUT" },
];
