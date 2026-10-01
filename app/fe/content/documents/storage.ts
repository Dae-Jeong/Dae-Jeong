import "server-only";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

// Next runs from app/fe; repository checks run from the workspace root.
const root = existsSync(join(process.cwd(), "content/common"))
  ? process.cwd()
  : resolve(process.cwd(), "app/fe");

/** Paths are internal identifiers, never unchecked request strings. */
function documentPath(segments: string[]): string {
  if (segments.some(segment => !/^[a-zA-Z0-9_.-]+$/.test(segment) || segment === "." || segment === ".."))
    throw new Error("Invalid document storage path");
  return join(root, "content", ...segments);
}

export function readDocumentJson<T>(...segments: string[]): T {
  return JSON.parse(readFileSync(documentPath(segments), "utf8")) as T;
}

/** Missing optional presentation files are normal; malformed files still fail. */
export function readOptionalDocumentJson<T>(...segments: string[]): T | undefined {
  const path = documentPath(segments);
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

/** New company/revision folders need no TypeScript registration. */
export function loadCompanySources<T>(): { base: T[]; revisions: T[] } {
  const base: T[] = [];
  const revisions: T[] = [];
  const directory = join(root, "content/documents/companies");
  const folders = (path: string) => readdirSync(path, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  function collect(segments: string[], target: T[]) {
    const files = readdirSync(join(root, "content", ...segments), { withFileTypes: true });
    for (const kind of ["resume", "career"]) {
      if (files.some(file => file.isFile() && file.name === `${kind}.json`))
        target.push(readDocumentJson<T>(...segments, `${kind}.json`));
    }
  }
  for (const slug of folders(directory)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid company folder: ${slug}`);
    const segments = ["documents", "companies", slug];
    collect(segments, base);
    const revisionPath = join(directory, slug, "revisions");
    if (existsSync(revisionPath)) {
      for (const revision of folders(revisionPath)) collect([...segments, "revisions", revision], revisions);
    }
  }
  return { base, revisions };
}
