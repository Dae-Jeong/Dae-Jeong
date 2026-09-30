import { APPLICATION_STATUSES, type ApplicationStatus } from "./status.ts";
import {
  isObject as isObj,
  optionalString as optStr,
  stringArray as strArray,
  nonemptyString as str,
} from "../admin-data/validation.ts";
export type ApplicationAttempt = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  postingId?: string;
  lastConfirmed?: string;
  companies: string[];
};
export type ApplicationsProjection = {
  schema: 1;
  sourceUpdatedAt?: string;
  attempts: ApplicationAttempt[];
};
const isStatus = (value: unknown): value is ApplicationStatus =>
  typeof value === "string" &&
  APPLICATION_STATUSES.some((status) => status === value);

/** Company slugs referenced by an attempt's document routes (old /{kind}/{slug} and new /{slug}/{kind} forms). */
function companySlugs(artifacts: unknown): string[] {
  const slugs = new Set<string>();
  for (const artifact of Object.values(isObj(artifacts) ? artifacts : {})) {
    const route = str(isObj(artifact) ? artifact.route : undefined)?.split(
      "?",
    )[0];
    if (!route) continue;
    const parts = route.split("/").filter(Boolean);
    if (parts.length !== 2) continue;
    if (["resume", "career", "cv", "portfolio"].includes(parts[0]))
      slugs.add(parts[1]);
    else if (["resume", "career", "cv"].includes(parts[1])) slugs.add(parts[0]);
  }
  return [...slugs].filter((slug) => slug !== "common").sort();
}

/**
 * @param {unknown} source parsed application-attempts.json
 * @param {string} [sourceUpdatedAt] ISO time of the local original
 * @returns {{ schema: 1, sourceUpdatedAt?: string, attempts: { id: string, company: string, role: string, postingId?: string, status: string, lastConfirmed?: string, companies: string[] }[] }}
 */
export function buildApplicationsProjection(
  source: unknown,
  sourceUpdatedAt?: string,
): ApplicationsProjection {
  const attempts =
    isObj(source) && Array.isArray(source.attempts) ? source.attempts : null;
  if (!attempts) throw new Error("application projection: attempts missing");
  return {
    schema: 1,
    ...(sourceUpdatedAt ? { sourceUpdatedAt } : {}),
    attempts: attempts.map((attempt, index) => {
      const id = str(isObj(attempt) ? attempt.id : undefined),
        company = str(isObj(attempt) ? attempt.company : undefined),
        role = str(isObj(attempt) ? attempt.role : undefined);
      if (!isObj(attempt) || !id || !company || !role)
        throw new Error(
          `application projection: attempt ${index} lacks id/company/role`,
        );
      const status = isStatus(attempt.status) ? attempt.status : "unknown";
      const postingId = str(attempt.postingId);
      const lastConfirmed = str(attempt.lastConfirmed);
      return {
        id,
        company,
        role,
        ...(postingId ? { postingId } : {}),
        status,
        ...(lastConfirmed ? { lastConfirmed } : {}),
        companies: companySlugs(attempt.artifacts),
      };
    }),
  };
}

/** Runtime shape check for a stored applications projection (every field the dashboard and map read). */
export function isApplicationsProjection(
  value: unknown,
): value is ApplicationsProjection {
  return (
    isObj(value) &&
    value.schema === 1 &&
    optStr(value.sourceUpdatedAt) &&
    Array.isArray(value.attempts) &&
    value.attempts.every(
      (attempt) =>
        isObj(attempt) &&
        [attempt.id, attempt.company, attempt.role].every(
          (item) => typeof item === "string" && item.length > 0,
        ) &&
        isStatus(attempt.status) &&
        optStr(attempt.postingId) &&
        optStr(attempt.lastConfirmed) &&
        strArray(attempt.companies),
    )
  );
}
