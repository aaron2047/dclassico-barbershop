import { client } from "@/client.config";

// Barbershops convert on a real price list, not a generic "services" card grid.
// This reads like a menu: name, duration, price, in one clean table.
export default function ServicesMenu() {
  return (
    <section id="services" className="bg-stone-50 py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
          Services
        </h2>
        <p className="text-stone-500 mb-12">
          Every cut includes a consultation. Prices start here &mdash; your
          barber will confirm before you're in the chair.
        </p>

        <ul className="divide-y divide-stone-200">
          {client.services.map((service) => (
            <li
              key={service.name}
              className="flex items-baseline justify-between py-5"
            >
              <div>
                <p className="text-stone-900 font-medium">{service.name}</p>
                <p className="text-stone-500 text-sm">{service.duration}</p>
              </div>
              {service.price ? (
                <p className="text-stone-900 font-medium tabular-nums">
                  {service.price}
                </p>
              ) : (
                <p className="text-stone-400 text-sm">See current pricing</p>
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-10">
          <a
            href="#book"
            data-cal-link={client.calLink}
            data-cal-namespace={client.calNamespace}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 border-b border-stone-900 pb-0.5 hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors duration-200"
          >
            Reserve your chair
          </a>
          {client.pricingSourceUrl && (
            <a
              href={client.pricingSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-stone-600 transition-colors duration-200"
            >
              Full current pricing &rarr;
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
