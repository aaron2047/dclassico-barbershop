"use client";

import { Calendar, Phone } from "lucide-react";
import { client } from "@/client.config";

// Mobile-only sticky bar: the two actions a prospect actually takes on their
// phone — call now, or book now. Stays out of the way on desktop.
export default function StickyBookBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[var(--brand-bg)]/95 backdrop-blur border-t border-stone-800 flex">
      <a
        href={`tel:${client.phone.replace(/[^\d+]/g, "")}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-stone-300 text-sm font-medium border-r border-stone-800"
      >
        <Phone className="w-4 h-4" />
        Call
      </a>
      <button
        data-cal-link={client.calLink}
        data-cal-namespace={client.calNamespace}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-stone-50 text-[var(--brand-bg)] text-sm font-medium"
      >
        <Calendar className="w-4 h-4" />
        Reserve
      </button>
    </div>
  );
}
