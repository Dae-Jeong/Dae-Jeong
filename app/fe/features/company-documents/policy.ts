import { canViewDraft } from "@/content/documents/companies";
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
    // Public-first: a public candidate beats any draft; otherwise the latest wins.
    if (candidate.public !== current.public) {
      if (candidate.public) chosen.set(key, candidate);
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

/** The viewable representative, or undefined: unknown company/kind, reserved segment, or a draft in production. */
export function getRepresentative(
  company: string,
  kind: string,
): Representative | undefined {
  if (
    RESERVED_SEGMENTS.has(company) ||
    !companyKinds.some((item) => item.slug === kind)
  )
    return undefined;
  const document = representatives().get(`${company}/${kind}`);
  if (!document) return undefined;
  return document.public || canViewDraft(process.env.NODE_ENV)
    ? document
    : undefined;
}

/** Every representative with whether it can be opened in this environment (admin map: drafts outside dev/test are
 *  listed as unavailable text, never as links). */
export function listRepresentativeEntries(): {
  document: Representative;
  viewable: boolean;
}[] {
  return [...representatives().values()]
    .map((document) => ({
      document,
      viewable: getRepresentative(document.company, document.kind) === document,
    }))
    .sort(
      (a, b) =>
        a.document.company.localeCompare(b.document.company) ||
        a.document.kind.localeCompare(b.document.kind),
    );
}
