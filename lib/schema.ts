import { client } from "@/client.config";

// Builds LocalBusiness JSON-LD from client.config.ts so every demo
// ships with correct structured data for Google without hand-editing.
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": client.businessType,
    name: client.name,
    telephone: client.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: client.address.street,
      addressLocality: client.address.city,
      addressRegion: client.address.state,
      postalCode: client.address.zip,
    },
    openingHoursSpecification: client.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: to24h(h.open),
      closes: to24h(h.close),
    })),
    ...(client.gbpUrl ? { sameAs: [client.gbpUrl] } : {}),
  };
}

function to24h(time: string): string {
  const [raw, meridiem] = time.split(" ");
  const [hoursRaw, minutes] = raw.split(":");
  let hours = parseInt(hoursRaw, 10);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}
