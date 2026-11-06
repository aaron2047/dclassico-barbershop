# D'Clasicos Barber Shop — Concept Website v1

A premium, responsive **Next.js 15 App Router + React 19 + Tailwind CSS 3 + Lucide React** concept for the shop at 4947 N 5th Street, Philadelphia, PA 19120. Designed as a reviewable proposal for the Olney Community Collaborative digital-marketing initiative.

> **Concept preview only. Not an official D'Clasicos website.** The UI is functional, but real booking links, barber identities, owner-approved photographs, final pricing and verified hours are not available yet. The sample calendar explicitly cannot submit bookings.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
# http://localhost:3000
```

Production build: `npm run build && npm run start`.

## Sections

- Conversion-led desktop + mobile homepage and sticky mobile booking CTA
- 6 service categories sourced from the public Booksy service list
- 7 editable barber-profile slots with individual appointment entry points
- Interactive two-stage booking drawer with **first-available** and specific-barber paths
- Safe calendar preview until real event-type links are configured
- Gallery grid and keyboard-accessible lightbox
- Historical Google Maps rating snapshot, clearly labeled as not live, plus link to the source
- Location, directions, tap-to-call, FAQs, Instagram, local-search metadata and JSON-LD
- `robots` defaults to **NOINDEX** until owner approvals and production-domain setup

## Activate live booking (requires owner participation)

1. Create a Cal.com team for the shop. Set up seven real staff members, calendar connections, hours, breaks, time off, availability buffers and cancellation policies. **Verify pricing of Cal.com Teams and any paid features with the provider.**
2. Create personal event types for offered services per barber, with accurate durations, prices, booking notices and physical location. Optional: deposit/payment integration if shop wants to prevent no-shows.
3. Create a team **round-robin** event for each service, configured to maximize available time. Do not use a *collective event*, which requires all barbers to be free together.
4. In `src/lib/site-data.ts`, replace `BARBERS` placeholder names with approved staff identities. Add live, publicly bookable `https://cal.com/...` links to `CAL_LINKS` for every supported service/barber pair and each service's `any` team event.
5. On the site, choose a service + preferred barber and verify the embedded calendar actually presents the correct person's real appointment slots. Test bookings, cancel/reschedule links, confirmation, DST/time zone (America/New_York), no-double-booking and mobile.
6. Until active Cal.com links are supplied, **the booking drawer never claims or creates appointments**; a tap-to-call fallback is available.

> An embedded Cal.com iframe is shown when a verified HTTPS link is configured, with a separate direct-link fallback. For the most reliable supported experience, validate the embed settings with the owner's Cal.com event type. Consider using `@calcom/embed-react` or Cal.com Atoms/API v2 after onboarding and testing.

## Owner-approval checklist before deployment

- [ ] Confirm legal/brand spelling: public sources use **D'Clasicos**, while some materials use **D'Classico**.
- [ ] Confirm exact business name, address, ownership, phone, services, durations, prices and hours.
- [ ] Collect seven barbers' names, headshots, specialties, bios, schedules, and consent.
- [ ] Replace all `/public/images/*.webp` with *original authorized photography*. Current preview files were cropped from screenshots supplied for this project, including material visible in Google Maps; **do not assume republishing rights**. Do not scrape, hotlink or rehost Google Maps/Instagram photos without authorization and compliance with platform terms.
- [ ] Verify and update the historical **4.6 / 80 reviews** screenshot figure. This site currently links to Google Maps rather than inventing or reproducing review text. If displaying reviews with a Google Places API integration, comply with Google Maps attribution, author, link, notice, caching and terms requirements.
- [ ] Connect real Cal.com schedules, perform 3 end-to-end test bookings for different barbers, test time zones and reminders.
- [ ] Obtain owner approval of site copy, photography, domain and Cal.com account ownership.
- [ ] Add privacy policy if forms, analytics, advertising tags, automated SMS/email or other personal data processing are introduced.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://your-approved-domain.tld` and `NEXT_PUBLIC_ENABLE_INDEXING=true` **only after approval**.
- [ ] Verify Google Business Profile links, business directory listings, NAP consistency, and submit sitemap in Google Search Console and Bing Webmaster Tools.
- [ ] Configure analytics with conversion events for booking-open, calendar-start, booking-confirmed (after provider integration), calls and map directions.

## Useful research sources (reviewed November 5, 2026)

- [Olney Community Collaborative listing](https://olneycollab.com/listing/dclasico-barbershop/)
- [Existing Booksy service list](https://booksy.com/en-us/453163_dclasicos-barbershop_barber-shop_134598_philadelphia)
- [Cal.com embed overview](https://cal.com/features/embed)
- [Cal.com team round-robin setup](https://cal.supportpages.io/teams-organizations/how-to-set-up-round-robin-scheduling-for-your-team)
- [Google Places API policies](https://developers.google.com/maps/documentation/places/web-service/policies)
- [Schema.org LocalBusiness taxonomy](https://schema.org/LocalBusiness)

## Digital marketing maintenance offering (suggested)

**Launch:** Brand consultation, owner onboarding, photo and copy approval, responsive website, Cal.com calendar setup, Google Business Profile alignment, local schema, analytics and deployment.

**Ongoing:** Managed hosting and uptime, backups/security updates, photo/gallery refreshes, profile and staff updates, hours and service changes, local search/AI discoverability work, review monitoring (never fabricated reviews), and monthly booking-funnel performance reporting. Do not promise specific placement in ChatGPT, Gemini or other AI results; these systems cannot guarantee inclusion or rank.

**Growth options:** Bilingual English/Spanish experience, before-and-after showcase with client consent, policy-aware Google reviews integration, no-show deposit/payment, automated reminders, style gallery filtering, barber-specific landing pages, local content pages, and paid search conversion tracking.

## Git workflow

```bash
git init
git add .
git commit -m "feat: D'Clasicos barbershop concept website"
# Create an approved remote repository before connecting or pushing.
```

No git remote is configured and no live site has been deployed.
