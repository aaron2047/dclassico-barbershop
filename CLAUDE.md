# D'Classico Barbershop — demo site

Woolph Marketing Olney assembly-line demo. Next.js App Router, Tailwind, Lucide icons, Cal.com booking.

## The one file to edit per iteration
`client.config.ts` holds every piece of client-specific content (name, hours,
services, phone, Cal.com link, brand colors). Components read from it —
don't hardcode client content into component files.

## Design rules for this repo
- Palette lives in `client.config.ts` → `brand` and is piped into CSS vars
  in `app/globals.css` (`--brand-bg`, `--brand-accent`, `--brand-foreground`).
  Don't reach for Tailwind's default `zinc`/`amber` — that reads as generic
  AI-dark-mode. Use the brand vars.
- One signature motion moment per section, not hover effects stacked on
  every element. No simultaneous lift + rotate + pulse + scale.
- No uppercase tracked-out eyebrow labels, no numbered badge grids unless
  the content is an actual sequence. Trust comes from specific facts
  (barber count, years, appointment policy), not decorative badges.
- Services render as a real price list (`ServicesMenu.tsx`), not generic
  icon cards — this is the barber-vertical pattern, keep it for every
  barber demo built from this repo.

## Booking
`client.calLink` / `client.calNamespace` drive both the hero CTA and the
services-menu CTA via `@calcom/embed-react`'s `data-cal-link` attributes
and `getCalApi()` in `BarbershopHero.tsx`. Until the real client signs,
this points at a Woolph demo Cal.com account — swap it, nothing else,
when the real booking link is ready.

## Hosting
Static-friendly Next.js site. No server-only API routes yet — lead capture
should go to an external form endpoint (not a Next.js API route) if the
host is a static one (Cloudflare Pages / GitHub Pages). Revisit this file
if that changes.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (run before every push)
