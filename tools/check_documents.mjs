// App-owned records and the current representative URL/visibility contract.
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ts from "../app/fe/node_modules/typescript/lib/typescript.js";

// Execute the real pure TypeScript owners, including their JSON inputs, without
// Next runtime, generated copies, dependency installation or source mutation.
const fe = new URL("../app/fe/", import.meta.url);
const modules = new Map();
function moduleUrl(url) {
  if (modules.has(url.href)) return modules.get(url.href);
  let source = readFileSync(url, "utf8");
  if (url.pathname.endsWith(".json")) source = `export default ${source};`;
  else source = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022,
  } }).outputText;
  source = source.replace(/(from\s*|import\s*)(["'])([^"']+)\2/g, (statement, prefix, quote, specifier) => {
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return statement;
    const base = specifier.startsWith("@/") ? new URL(specifier.slice(2), fe) : new URL(specifier, url);
    const dependency = [base, new URL(base.href + ".ts"), new URL(base.href + "/index.ts")]
      .find(candidate => existsSync(candidate) && statSync(candidate).isFile());
    assert(dependency, `Unresolved document module: ${specifier} in ${fileURLToPath(url)}`);
    return `${prefix}${quote}${moduleUrl(dependency)}${quote}`;
  });
  const compiled = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  modules.set(url.href, compiled);
  return compiled;
}
const load = path => import(moduleUrl(new URL(path, fe)));
const registry = await load("content/documents/companies/index.ts");
const { companyKinds, companySlug, RESERVED_SEGMENTS } = await load("features/company-documents/types.ts");
const { collectCandidates } = await load("features/company-documents/mapping.ts");
const { selectRepresentative, getRepresentative, listRepresentativeEntries } = await load("features/company-documents/policy.ts");
const { companyDocumentHref, resolveCompanyRequest } = await load("features/company-documents/urls.ts");

assert.deepEqual(companyKinds.map(item => item.slug), ["resume", "career"]);
assert.deepEqual(registry.companyDocuments.map(record => `${record.slug}/${record.document}`).sort(),
  [...["featuring", "miridih", "jyp", "toss-place", "miridih-pe", "ably", "nrise", "soomgo", "paytalab", "wrtn", "hybe", "hypernova", "gna-company"].flatMap(slug => ["resume", "career"].map(kind => `${slug}/${kind}`)),
    ...["mgrv", "pinokiolab", "teamreboot", "whatssub"].map(slug => `${slug}/resume`)].sort());
assert.equal(new Set(registry.revisionDocuments.map(record => `${record.slug}/${record.document}/${record.revision}`)).size, registry.revisionDocuments.length);
for (const environment of ["production", undefined, "staging", ""]) assert.equal(registry.canViewDraft(environment), false);
for (const environment of ["development", "test"]) assert.equal(registry.canViewDraft(environment), true);

function inspect(value) {
  if (Array.isArray(value)) { value.forEach(inspect); return; }
  if (!value || typeof value !== "object") return;
  assert(!("sourcePath" in value), "Private source paths belong in the local registry");
  if (value.kind && !Array.isArray(value.entries)) {
    assert(["paragraph", "bullet", "skill", "row", "table", "flow", "figure", "image"].includes(value.kind), `Unknown block kind: ${value.kind}`);
    assert(Array.isArray(value.claims), "Every content block retains its claim references");
    if (value.kind === "table") value.rows.forEach(row => assert.equal(row.length, value.columns.length));
    else if (value.kind === "flow") {
      assert(["LR", "TD"].includes(value.direction)); assert(Array.isArray(value.nodes) && Array.isArray(value.edges));
    } else if (value.kind === "figure") assert.equal(typeof value.id, "string");
    else if (value.kind === "image") {
      assert.match(value.src, /^\/portfolio\/[a-z0-9-]+\.(png|svg)$/);
      assert(value.alt && value.title && value.caption && value.width > 0 && value.height > 0);
    } else assert.equal(typeof value.text, "string");
  }
  Object.values(value).forEach(inspect);
}
for (const record of [...registry.companyDocuments, ...registry.revisionDocuments]) {
  assert(companyKinds.some(kind => kind.slug === record.document));
  assert(["draft", "approved", "closed"].includes(record.status));
  assert(["local", "public"].includes(record.visibility));
  assert.equal(record.approved, record.status === "approved");
  if (!["hypernova", "mgrv", "pinokiolab", "teamreboot", "whatssub"].includes(record.slug)) {
    assert.equal(record.status, "draft"); assert.equal(record.visibility, "local"); assert.equal(record.approved, false);
  }
  for (const field of ["slug", "companyName", "position", "revision", "updatedAt", "applicationId"]) assert.equal(typeof record[field], "string", field);
  assert(record.revision && record.applicationId && record.content.sections.length);
  inspect(record);
}
// JSON migration preserves each document's metadata and its representative renderer inputs.
const migrated = [
  ["hypernova", "resume", "20260904-R1", "approved", "local"],
  ["hypernova", "career", "20260904-R1", "approved", "local"],
  ["mgrv", "resume", "20260818-R1", "closed", "local"],
  ["pinokiolab", "resume", "20260828-R1", "approved", "public"],
  ["teamreboot", "resume", "20260901-R1", "draft", "local"],
  ["whatssub", "resume", "20260826-R1", "approved", "public"],
  ["gna-company", "resume", "20260928-R2", "draft", "local"],
  ["gna-company", "career", "20260928-R2", "draft", "local"],
];
for (const [slug, kind, revision, status, visibility] of migrated) {
  const record = registry.companyDocuments.find(record => record.slug === slug && record.document === kind);
  assert(record, `${slug}/${kind}: missing JSON registration`);
  assert.deepEqual([record.revision, record.status, record.visibility], [revision, status, visibility]);
  assert.deepEqual(record, JSON.parse(readFileSync(new URL(`content/documents/companies/${slug}/${kind}.json`, fe), "utf8")));
}
for (const retired of ["content/resumes", "content/documents/hypernova.ts", "content/documents/career-content-adapter.ts", "content/documents/index.ts"])
  assert(!existsSync(new URL(retired, fe)), `${retired}: legacy source must be deleted`);
assert(!registry.revisionDocuments.some(record => record.slug === "gna-company"), "GNA has one current R2 record per kind");
// Retired portfolio records remain submission evidence, never active route kinds.
for (const slug of ["featuring", "miridih", "jyp", "toss-place"]) {
  const record = JSON.parse(readFileSync(new URL(`content/documents/companies/${slug}/portfolio.json`, fe), "utf8"));
  assert.equal(record.slug, slug); assert.equal(record.document, "portfolio"); inspect(record);
}
// Violating fixtures prove the validator still rejects disclosure and malformed
// claim/table/block contracts; only in-memory clones are changed.
assert.throws(() => inspect({ sourcePath: "fixture-private" }), /Private source paths/);
assert.throws(() => inspect({ kind: "paragraph", text: "fixture" }), /claim references/);
assert.throws(() => inspect({ kind: "unknown", claims: [], text: "fixture" }), /Unknown block kind/);
assert.throws(() => inspect({ kind: "table", claims: [], columns: ["a"], rows: [["a", "b"]] }));

const candidates = collectCandidates(companySlug);
const chosen = selectRepresentative(candidates);
assert.equal(candidates.length, registry.companyDocuments.length + registry.revisionDocuments.length);
for (const [slug, kind, revision, , visibility] of migrated) {
  const representative = chosen.get(`${slug}/${kind}`);
  const record = registry.companyDocuments.find(record => record.slug === slug && record.document === kind);
  assert.equal(representative.label, revision);
  assert.equal(representative.public, visibility === "public");
  assert.deepEqual(kind === "resume" ? representative.copy : representative.content, record.content);
  if (kind === "resume") {
    assert.equal(representative.pdfHref, record.pdfHref);
    if (slug !== "gna-company") {
      const presentation = JSON.parse(readFileSync(new URL(`content/documents/companies/${slug}/presentation.json`, fe), "utf8"));
      assert.deepEqual(representative.presentation, presentation);
    } else assert(representative.presentation?.photo, "GNA: preserve R2 portrait");
  }
}
assert.equal(chosen.get("mgrv/resume").pdfHref, "/resumes/mgrv-resume.pdf");
assert.equal(chosen.get("whatssub/resume").copy.specialtyLine, undefined, "Submission salary must not enter public JSON");
// Accepted local drafts must beat the old local candidate/common fallback without changing public-first.
for (const [slug, revision] of [["featuring", "20260921-R2"], ["toss-place", "20261001-R2"],
  ...["miridih-pe", "ably", "nrise", "soomgo", "paytalab", "wrtn"].map(slug => [slug, "20261001-R1"]), ["hybe", "20261001-R2"]]) {
  for (const kind of ["resume", "career"]) {
    const representative = chosen.get(`${slug}/${kind}`);
    assert(representative, `${slug}/${kind}: missing latest draft`);
    assert.equal(representative.label, revision, `${slug}/${kind}: latest accepted draft must be representative`);
    assert.equal(representative.public, false, `${slug}/${kind}: review does not promote public access`);
    assert.equal(representative.mode, undefined, `${slug}/${kind}: show tailored draft, not common fallback`);
  }
}
assert(chosen.size > 0);
for (const [key, representative] of chosen) {
  const group = candidates.filter(candidate => `${candidate.company}/${candidate.kind}` === key);
  const eligible = group.some(candidate => candidate.public) ? group.filter(candidate => candidate.public) : group;
  assert.equal(representative.order, eligible.map(candidate => candidate.order).sort().at(-1));
  assert.equal(companyDocumentHref(representative.company, representative.kind), `/${key}`);
}
const sample = candidates.find(candidate => candidate.public);
assert(sample, "At least one existing public representative is exercised");
assert.equal(selectRepresentative([{ ...sample, public: false, order: "99999999" }, { ...sample, order: "00000000" }]).values().next().value.public, true);
assert.throws(() => selectRepresentative([{ ...sample, company: "admin" }]), /reserved route/);
const originalEnvironment = process.env.NODE_ENV;
try {
  for (const environment of ["development", "test", "production", "staging"]) {
    process.env.NODE_ENV = environment;
    for (const { document, viewable } of listRepresentativeEntries()) {
      const allowed = document.public || registry.canViewDraft(environment);
      assert.equal(viewable, allowed);
      const canonical = resolveCompanyRequest(document.company, document.kind);
      if (!allowed) {
        assert.equal(canonical, undefined);
        assert.equal(resolveCompanyRequest(document.company, document.kind, true, true), undefined, "Reject draft before redirect");
      } else {
        assert.equal(canonical.document, document); assert.equal(canonical.href, undefined);
        for (const [query, former] of [[true, false], [false, true], [true, true]]) {
          assert.equal(resolveCompanyRequest(document.company, document.kind, query, former).href, companyDocumentHref(document.company, document.kind));
        }
      }
    }
    for (const reserved of RESERVED_SEGMENTS) for (const { slug: kind } of companyKinds) assert.equal(resolveCompanyRequest(reserved, kind, true), undefined);
    assert.equal(getRepresentative("unknown", "resume"), undefined);
    assert.equal(getRepresentative("featuring", "portfolio"), undefined);
    assert.equal(resolveCompanyRequest("unknown", "resume", true, true), undefined);
    for (const { slug: kind } of companyKinds) assert.equal(resolveCompanyRequest("common", kind, false, true).href, `/${kind}`);
    const alias = resolveCompanyRequest("jyp-v2", "resume", true);
    assert.equal(alias?.href, registry.canViewDraft(environment) ? "/jyp/resume" : undefined);
  }
} finally {
  if (originalEnvironment === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalEnvironment;
}
console.log(`PASS ${registry.companyDocuments.length} base + ${registry.revisionDocuments.length} revision records; ${chosen.size} representatives; canonical/draft/public-first/reserved/alias/query and violating fixtures`);
const result = spawnSync(process.execPath, ["--test", "app/fe/content/documents/resume-copy.test.mjs", "app/fe/content/common/source.test.mjs"], { encoding: "utf8" });
process.stdout.write(result.stdout); process.stderr.write(result.stderr);
if (result.status !== 0) process.exit(result.status ?? 1);
