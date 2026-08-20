export const ROLE_CATALOG = {
  "tech-lead-product": {
    slug: "tech-lead-product",
    label: "Backend-first Tech Lead · Product Engineer",
    shortLabel: "Tech Lead",
  },
  backend: {
    slug: "backend",
    label: "Backend Engineer",
    shortLabel: "Backend",
  },
  "ai-product-backend": {
    slug: "ai-product-backend",
    label: "AI Product Backend",
    shortLabel: "AI Backend",
  },
  "ax-fde": {
    slug: "ax-fde",
    label: "AX / Forward Deployed Engineer",
    shortLabel: "AX / FDE",
  },
  "backend-platform": {
    slug: "backend-platform",
    label: "Backend Platform · Cloud Operations",
    shortLabel: "Platform",
  },
} as const;

export type RoleVariantSlug = keyof typeof ROLE_CATALOG;

export const ROLE_VARIANT_SLUGS = Object.keys(
  ROLE_CATALOG,
) as RoleVariantSlug[];
