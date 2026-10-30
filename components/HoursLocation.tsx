"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { client } from "@/client.config";

export default function HoursLocation() {
  // Computed client-side, after mount: which day to highlight is a
  // per-viewer, per-moment value, not something to bake into a static
  // prerendered page.
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-US", { weekday: "long" }));
  }, []);

  return (
    <section className="bg-[var(--brand-bg)] text-stone-50 py-24">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Hours */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-6">
            <Clock className="w-5 h-5 text-[var(--brand-accent)]" />
            Hours
          </h2>
          <ul className="space-y-2.5 text-sm">
            {client.hours.map((h) => (
              <li
                key={h.day}
                className={`flex justify-between ${
                  h.day === today ? "text-white" : "text-stone-400"
                }`}
              >
                <span>{h.day}</span>
                <span className="tabular-nums">
                  {h.open} &ndash; {h.close}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Location + contact */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-6">
            <MapPin className="w-5 h-5 text-[var(--brand-accent)]" />
            Location
          </h2>
          <address className="not-italic text-stone-300 text-sm leading-relaxed mb-6">
            {client.address.street}
            <br />
            {client.address.city}, {client.address.state}{" "}
            {client.address.zip}
          </address>
          <a
            href={`tel:${client.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            {client.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
