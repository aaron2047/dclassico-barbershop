"use client";

import { useEffect } from "react";
import { Calendar, Scissors, Phone } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { client } from "@/client.config";

// Full-bleed background hero: a real shop photo now, a looping muted
// video later (set client.heroVideo — no other change needed here).
export default function BarbershopHero() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: client.calNamespace });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: client.brand.accent } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col text-stone-50 font-sans overflow-hidden">
      {/* Background: video when provided, photo otherwise — same markup either way */}
      <div className="absolute inset-0">
        {client.heroVideo ? (
          <video
            className="w-full h-full object-cover"
            src={client.heroVideo}
            poster={client.heroImage}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={client.heroImage}
            alt={`Inside ${client.name}`}
            className="w-full h-full object-cover"
          />
        )}
        {/* Single deliberate overlay: darkens bottom for text legibility, nothing decorative */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </div>

      {/* Minimal top bar — name + call, transparent over the image */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6">
        <span className="text-sm font-medium tracking-tight">
          {client.name}
        </span>
        <a
          href={`tel:${client.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors duration-200"
        >
          <Phone className="w-3.5 h-3.5" />
          {client.phone}
        </a>
      </div>

      {/* Content pinned lower-left, image carries the top */}
      <div className="relative z-10 mt-auto px-6 md:px-10 pb-16 md:pb-20 max-w-2xl">
        <p className="text-sm text-stone-300 mb-4">
          {client.address.street}, {client.neighborhood} &middot;
          appointment-only
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.08] mb-6">
          {client.name}
        </h1>
        <p className="text-stone-200 text-base md:text-lg max-w-lg leading-relaxed mb-10">
          {client.tagline} Every chair is a reserved seat with a barber who
          knows your cut &mdash; no walk-in gamble, no rushed fifteen
          minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            data-cal-link={client.calLink}
            data-cal-namespace={client.calNamespace}
            data-cal-config='{"layout":"month_view","theme":"dark"}'
            className="inline-flex items-center justify-center gap-3 bg-stone-50 text-black font-medium px-7 py-3.5 rounded-sm hover:bg-white transition-colors duration-200"
          >
            <Calendar className="w-4 h-4" />
            Reserve Your Chair
          </button>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-stone-100 px-7 py-3.5 rounded-sm hover:border-white/60 transition-colors duration-200"
          >
            <Scissors className="w-4 h-4" />
            Services &amp; Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
