import { collectCandidates } from "./mapping";
import {
  RESERVED_SEGMENTS,
  companySlug,
  companyKinds,
  type Representative,
} from "./types";
export function selectRepresentative(candidates: readonly Representative[]) {
  const chosen = new Map<string, Representative>();
  const latest = (a: Representative, b: Representative) =>
    a.order >= b.order ? a : b;
  for (const candidate of candidates) {
    if (RESERVED_SEGMENTS.has(candidate.company)) {
      throw new Error(
        `company slug collides with a reserved route: ${candidate.company}`,
      );
    }
    const key = `${candidate.company}/${candidate.kind}`;
    const current = chosen.get(key);
    if (!current) {
      chosen.set(key, candidate);
      continue;
    }
    chosen.set(key, latest(current, candidate));
  }
  return chosen;
}

let cache: Map<string, Representative> | undefined;
function representatives() {
  if (cache) return cache;
  const chosen = selectRepresentative(collectCandidates(companySlug));
  cache = chosen;
  return chosen;
}

/** The latest representative, or undefined for an unknown company/kind or reserved segment. */
export function getRepresentative(
  company: string,
  kind: string,
): Representative | undefined {
  if (
    RESERVED_SEGMENTS.has(company) ||
    !companyKinds.some((item) => item.slug === kind)
  )
    return undefined;
  return representatives().get(`${company}/${kind}`);
}

/** Every latest representative is available in every environment. */
export function listRepresentativeEntries(): {
  document: Representative;
  viewable: boolean;
}[] {
  return [...representatives().values()]
    .map((document) => ({
      document,
      viewable: true,
    }))
    .sort(
      (a, b) =>
        a.document.company.localeCompare(b.document.company) ||
        a.document.kind.localeCompare(b.document.kind),
    );
}
