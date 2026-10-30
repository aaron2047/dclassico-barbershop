import { Star } from "lucide-react";
import { client } from "@/client.config";

// Deliberately never fabricates testimonials. Renders real reviews once
// client.config.ts `reviews` has entries (pulled from the shop's actual
// Google Business Profile); shows an honest empty state until then.
export default function Reviews() {
  if (client.reviews.length === 0) {
    return (
      <section className="bg-[var(--brand-bg)] text-stone-50 py-24 border-t border-stone-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">
            Reviews
          </h2>
          <p className="text-stone-400 max-w-md mx-auto">
            Google reviews will appear here once the shop's profile is
            connected.
          </p>
          {client.gbpUrl && (
            <a
              href={client.gbpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm text-stone-300 border-b border-stone-700 hover:text-white hover:border-stone-400 transition-colors duration-200"
            >
              See reviews on Google
            </a>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--brand-bg)] text-stone-50 py-24 border-t border-stone-800">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-12">
          Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {client.reviews.map((review) => (
            <div key={review.author} className="space-y-3">
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-stone-500 text-xs">
                {review.author} &middot; {review.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
