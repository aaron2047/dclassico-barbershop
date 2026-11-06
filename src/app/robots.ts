import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isLive = process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: isLive ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: isLive ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
