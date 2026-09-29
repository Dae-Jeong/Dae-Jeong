import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* 상세가 열린 케이스만 색인한다 — available=false는 '준비 중' 화면이라 색인 가치가 없다 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/resume", priority: 0.9 },
    { path: "/career", priority: 0.8 },
    { path: "/blog", priority: 0.5 },
    { path: "/labs", priority: 0.5 },
    { path: "/chat", priority: 0.5 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
