"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { client } from "@/client.config";

// Static-site lead capture: POSTs client-side to Web3Forms (free, no
// Next.js API route needed — works on a static export / Cloudflare Pages).
// Get an access key at https://web3forms.com and set it in
// client.config.ts as `leadFormAccessKey`. Until then this will fail
// silently to Web3Forms (invalid key) — swap the key before relying on it.
type Status = "idle" | "sending" | "sent" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", client.leadFormAccessKey);
    formData.append("subject", `New inquiry from ${client.name} site`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setStatus(result.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="bg-stone-50 py-24 border-t border-stone-200">
        <div className="max-w-md mx-auto px-6 text-center">
          <p className="text-stone-900 font-medium">
            Thanks — we&rsquo;ll get back to you shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-stone-50 py-24 border-t border-stone-200">
      <div className="max-w-md mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Questions First?
        </h2>
        <p className="text-stone-500 mb-10">
          Prefer to ask before you book? Send a note and we&rsquo;ll follow up.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Name"
              className="w-full border border-stone-300 rounded-sm px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Phone"
              className="w-full border border-stone-300 rounded-sm px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="What do you need?"
              className="w-full border border-stone-300 rounded-sm px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-stone-50 font-medium px-7 py-3.5 rounded-sm hover:bg-stone-800 transition-colors duration-200 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {status === "sending" ? "Sending..." : "Send"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-700">
              Couldn&rsquo;t send that — try calling instead at{" "}
              {client.phone}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
