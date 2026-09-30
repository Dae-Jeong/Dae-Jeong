import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Visitor pages are indexable; admin surfaces answer 404 without a session and company documents opt out per page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
