# D'Classico Barbershop

Demo site for D'Classico Barbershop, Olney, Philadelphia. Built by Woolph Marketing.

## Stack
Next.js (App Router) · React · Tailwind CSS · Lucide icons · Cal.com booking (`@calcom/embed-react`)

## Editing this demo
Open `client.config.ts` — name, hours, services, phone, brand colors, and
Cal.com link all live there. Component files render from it; you shouldn't
need to touch component markup to update a client's content.

## Local dev
```
npm install
npm run dev
```

## Before presenting
`client.calLink` currently points at a placeholder Woolph demo Cal.com
account (see comment in `client.config.ts`). Swap it for the real client's
link once they've signed.

See `CLAUDE.md` for design rules and conventions this repo follows.
