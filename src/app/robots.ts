import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-config";

/**
 * Generates `/robots.txt`. The site is entirely public, so every crawler is
 * allowed everywhere. The sitemap URL is derived from `SITE_URL` rather than
 * hardcoded so the canonical origin stays defined in one place.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
