import type { Metadata } from "next";
import { BUSINESS } from "@/lib/site-data";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const allowIndexing = process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "D'Clasicos Barber Shop | Haircuts, Fades & Line-Ups in Olney, Philadelphia",
  description:
    "Meet the barbers at D'Clasicos in Olney, Philadelphia. Explore haircuts, fades, beard trims and kids' cuts at 4947 N 5th Street and find your appointment.",
  applicationName: BUSINESS.name,
  alternates: { canonical: "/" },
  keywords: [
    "D'Clasicos Barber Shop",
    "Olney barber",
    "barbershop Philadelphia",
    "haircuts Olney",
    "fade haircut Philadelphia",
    "barber shop 4947 N 5th St",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "D'Clasicos | The Cut Speaks",
    description: "Find your barber. Claim your chair. Olney, Philadelphia.",
    url: siteUrl,
    images: [{ url: "/images/cut-hero.webp", width: 386, height: 510 }],
  },
  robots: { index: allowIndexing, follow: allowIndexing },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: BUSINESS.name,
  url: siteUrl,
  description: "Barber services by appointment in Olney, Philadelphia.",
  telephone: BUSINESS.phoneHref,
  image: `${siteUrl}/images/cut-hero.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    postalCode: "19120",
    addressCountry: "US",
  },
  sameAs: [BUSINESS.instagram, BUSINESS.directory],
  hasMap: BUSINESS.googleDirections,
  // Ratings are displayed as clearly labeled preview information only.
  // Self-serving LocalBusiness stars are not added to structured data.
  // Public sources disagree on opening hours; do not mark up guessed hours.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
