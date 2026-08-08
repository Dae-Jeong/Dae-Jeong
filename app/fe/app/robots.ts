import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* /design은 토큰·컴포넌트 living specimen이다 — 내부 계약 문서라 색인하지 않는다 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/design",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
