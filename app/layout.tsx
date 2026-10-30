import type { Metadata } from "next";
import "./globals.css";
import { client } from "@/client.config";
import { buildLocalBusinessSchema } from "@/lib/schema";

// Not using next/font/google here: the build environment can't reach
// fonts.googleapis.com. This falls back to the system font stack in
// globals.css, which renders fine. Swap in next/font/local or a
// Google Fonts link tag once you're building in an environment with
// outbound access, if you want Geist specifically.

export const metadata: Metadata = {
  title: `${client.name} | ${client.neighborhood}, ${client.city}`,
  description: `${client.tagline} Book your chair at ${client.name} in ${client.neighborhood}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const schema = buildLocalBusinessSchema();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
