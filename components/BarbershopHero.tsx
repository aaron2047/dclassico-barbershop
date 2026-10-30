"use client";

import { useEffect } from "react";
import { Calendar, Scissors } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { client } from "@/client.config";

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
    <section className="relative min-h-screen bg-[var(--brand-bg)] text-stone-50 flex items-center overflow-hidden font-sans">
      {/* Single deliberate accent: one thin brass rule, not a decorative glow field */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--brand-accent)]/40 to-transparent hidden md:block" />

      <div className="max-w-6xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <p className="text-sm text-stone-400 mb-3">
              {client.address.street.split(" ").slice(1).join(" ")},{" "}
              {client.neighborhood} &middot; appointment-only
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
              {client.name}
            </h1>
          </div>

          <p className="text-stone-300 text-lg max-w-lg leading-relaxed">
            {client.tagline} Every chair is a reserved seat with a barber who
            knows your cut &mdash; no walk-in gamble, no rushed fifteen
            minutes.
          </p>

          {/* CTA: one primary action, one secondary, no competing motion styles */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              data-cal-link={client.calLink}
              data-cal-namespace={client.calNamespace}
              data-cal-config='{"layout":"month_view","theme":"dark"}'
              className="inline-flex items-center justify-center gap-3 bg-stone-50 text-[var(--brand-bg)] font-medium px-7 py-3.5 rounded-sm hover:bg-white transition-colors duration-200"
            >
              <Calendar className="w-4 h-4" />
              Reserve Your Chair
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-stone-700 text-stone-300 px-7 py-3.5 rounded-sm hover:border-stone-500 hover:text-white transition-colors duration-200"
            >
              <Scissors className="w-4 h-4" />
              Services &amp; Pricing
            </a>
          </div>

          {/* Trust info as plain fact, not a labeled badge grid */}
          <p className="text-sm text-stone-500 pt-6 border-t border-stone-800 max-w-md">
            {client.acceptsWalkIns ? "Walk-ins welcome, or reserve ahead." : "Appointment-only, seven days a week."}{" "}
            {client.barbers} master barbers, each with their own book &mdash;
            pick yours when you reserve.
          </p>
        </div>

        {/* Right: single photo, no overlay card, no pulse dot */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative w-full h-[520px] overflow-hidden rounded-sm border border-stone-800">
            <img
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80"
              alt="Barber at work in the shop"
              className="w-full h-full object-cover grayscale-[20%] contrast-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
