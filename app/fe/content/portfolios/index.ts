import { ROLE_PORTFOLIOS } from "./role-variants";
import type { RolePortfolio } from "./types";

const ROLE_PORTFOLIOS_BY_SLUG: Readonly<Record<string, RolePortfolio>> =
  Object.fromEntries(
    ROLE_PORTFOLIOS.map((portfolio) => [portfolio.slug, portfolio]),
  );

export function getRolePortfolio(slug: string) {
  return ROLE_PORTFOLIOS_BY_SLUG[slug];
}

export function canViewRolePortfolio(portfolio: RolePortfolio) {
  return (
    process.env.NODE_ENV !== "production" && portfolio.visibility === "local"
  );
}

export function listRolePortfolios() {
  return ROLE_PORTFOLIOS.map((portfolio) => ({
    slug: portfolio.slug,
    label: portfolio.label,
    shortLabel: portfolio.shortLabel,
    description: portfolio.description,
  }));
}

export type { RolePortfolio } from "./types";
