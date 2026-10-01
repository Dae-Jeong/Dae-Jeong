// App-owned records and the current latest representative URL contract.
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
    if (specifier === "server-only") return `${prefix}${quote}data:text/javascript,export default undefined${quote}`;
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
const { getDocument, listDocuments, listDocumentEntries } = await load("lib/documents/repository.ts");
const { readDocumentJson } = await load("content/documents/storage.ts");

// Exercise the actual repository, including invalid requests and environment-independent access.
for (const kind of ["resume", "career", "cv"]) {
  const document = await getDocument({ scope: "common", kind });
  assert.equal(document.kind, kind);
  assert.deepEqual(document.content, JSON.parse(readFileSync(new URL(
    `content/common/${kind === "career" ? "career-description" : kind}.json`, fe), "utf8")));
}
for (const company of ["../common", "../../", "admin", "unknown", "JYP", "jyp/resume", "jyp%2fresume"])
  assert.equal(await getDocument({ scope: "company", company, kind: "resume" }), null);
assert.equal(await getDocument({ scope: "company", company: "jyp", kind: "cv" }), null);
assert.equal(await getDocument({ scope: "company", kind: "resume" }), null);
assert.equal(await getDocument({ scope: "common", company: "jyp", kind: "resume" }), null);
assert.equal(await getDocument({ scope: "common", kind: "portfolio" }), null);
assert.throws(() => readDocumentJson("..", "package.json"), /Invalid document storage path/);
const repositoryEnvironment = process.env.NODE_ENV;
try {
  for (const environment of ["development", "production"]) {
    process.env.NODE_ENV = environment;
    const all = await listDocuments();
    assert.equal(all.length, listRepresentativeEntries().length + 3);
    assert.equal((await listDocuments({ scope: "common" })).length, 3);
    assert.deepEqual(await listDocuments({ kind: "cv" }), [await getDocument({ scope: "common", kind: "cv" })]);
    for (const record of all) {
      assert.deepEqual(record, await getDocument({ scope: record.scope, kind: record.kind,
        ...(record.scope === "company" ? { company: record.slug } : {}) }));
    }
    for (const { document, viewable } of listRepresentativeEntries()) {
      const record = await getDocument({ scope: "company", company: document.company, kind: document.kind });
      assert.equal(viewable, true);
      assert(record, `${environment}: every representative is available`);
      assert.equal(record.revision, document.label);
      assert.deepEqual(record.content, document.kind === "resume" ? document.copy : document.content);
      if (document.kind === "resume") {
        assert.deepEqual(record.presentation, document.presentation);
        assert.equal(record.pdfHref, document.pdfHref);
      }
    }
    assert.deepEqual(await listDocuments({ company: "jyp-v2" }), await listDocuments({ company: "jyp" }));
    assert.deepEqual(await listDocuments({ company: "../common" }), []);
  }
} finally {
  if (repositoryEnvironment === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = repositoryEnvironment;
}

assert.deepEqual(companyKinds.map(item => item.slug), ["resume", "career"]);
assert.deepEqual(registry.companyDocuments.map(record => `${record.slug}/${record.document}`).sort(),
  [...["featuring", "miridih", "jyp", "toss-place", "miridih-pe", "ably", "nrise", "soomgo", "paytalab", "wrtn", "hybe", "hypernova", "gna-company"].flatMap(slug => ["resume", "career"].map(kind => `${slug}/${kind}`)),
    ...["mgrv", "pinokiolab", "teamreboot", "whatssub"].map(slug => `${slug}/resume`)].sort());
assert.equal(new Set(registry.revisionDocuments.map(record => `${record.slug}/${record.document}/${record.revision}`)).size, registry.revisionDocuments.length);

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
    assert.equal(record.status, "draft"); assert.equal(record.visibility, ["sagak", "ajungnetworks", "socar"].includes(record.slug) && record.revision === "20260921-R1" ? "public" : "local"); assert.equal(record.approved, false);
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

// Every formerly registered presentation keeps its emphasis and portrait; unrelated
// revisions must not inherit a base resume's presentation.
const { getResumePresentation } = await load("content/documents/companies/presentation.ts");
for (const [slug, revision] of [
  ["hypernova", "20260904-R1"], ["mgrv", "20260818-R1"], ["pinokiolab", "20260828-R1"],
  ["teamreboot", "20260901-R1"], ["whatssub", "20260826-R1"],
]) {
  const expected = JSON.parse(readFileSync(new URL(`content/documents/companies/${slug}/presentation.json`, fe), "utf8"));
  assert.deepEqual(getResumePresentation(slug, revision), expected);
  assert.equal(getResumePresentation(slug, "unregistered-revision"), undefined);
}
for (const [slug, revision] of [
  ["gna-company", "20260928-R2"], ["miridih", "20260912-R3"],
  ...["sagak", "ajungnetworks", "socar", "featuring"].map(slug => [slug, "20260921-R1"]),
]) {
  const folder = slug === "gna-company" ? slug : `${slug}/revisions/${revision}`;
  const source = JSON.parse(readFileSync(new URL(`content/documents/companies/${folder}/emphasis.json`, fe), "utf8"));
  assert.deepEqual(getResumePresentation(slug, revision), {
    emphasis: source.phrases,
    photo: { src: "/profile/daejeong-profile-v2.png", alt: slug === "gna-company" ? "김대정" : "", width: 1122, height: 1402 },
  });
}
assert.equal(getResumePresentation("unregistered-company", "unregistered-revision"), undefined);
assert.throws(() => getResumePresentation("..", "unregistered-revision"), /Invalid document storage path/);

const candidates = collectCandidates(companySlug);
const chosen = selectRepresentative(candidates);
assert.equal(candidates.length, registry.companyDocuments.length + registry.revisionDocuments.length);
for (const [slug, kind, revision] of migrated) {
  const representative = chosen.get(`${slug}/${kind}`);
  const record = registry.companyDocuments.find(record => record.slug === slug && record.document === kind);
  assert.equal(representative.label, revision);
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
// The latest accepted revision must beat older candidates and common fallbacks.
for (const [slug, revision] of [["featuring", "20260921-R2"], ["toss-place", "20261001-R2"],
  ...["miridih-pe", "ably", "nrise", "soomgo", "paytalab", "wrtn"].map(slug => [slug, "20261001-R1"]), ["hybe", "20261001-R2"]]) {
  for (const kind of ["resume", "career"]) {
    const representative = chosen.get(`${slug}/${kind}`);
    assert(representative, `${slug}/${kind}: missing latest draft`);
    assert.equal(representative.label, revision, `${slug}/${kind}: latest accepted draft must be representative`);
    assert.equal(representative.mode, undefined, `${slug}/${kind}: show tailored draft, not common fallback`);
  }
}
assert(chosen.size > 0);
for (const [key, representative] of chosen) {
  const group = candidates.filter(candidate => `${candidate.company}/${candidate.kind}` === key);
  assert.equal(representative.order, group.map(candidate => candidate.order).sort().at(-1));
  assert.equal(companyDocumentHref(representative.company, representative.kind), `/${key}`);
}
const sample = candidates[0];
assert(sample, "At least one existing representative is exercised");
assert.equal(selectRepresentative([{ ...sample, order: "99999999" }, { ...sample, order: "00000000" }]).values().next().value.order, "99999999");
assert.throws(() => selectRepresentative([{ ...sample, company: "admin" }]), /reserved route/);
const originalEnvironment = process.env.NODE_ENV;
try {
  for (const environment of ["development", "test", "production", "staging"]) {
    process.env.NODE_ENV = environment;
    for (const { document, viewable } of listRepresentativeEntries()) {
      assert.equal(viewable, true);
      const entry = (await listDocumentEntries()).find(entry => entry.slug === document.company && entry.kind === document.kind);
      assert.equal(entry.viewable, true);
      assert.equal(entry.status, document.status);
      assert.equal(entry.pdfHref, document.pdfHref);
      assert(!("content" in entry), "Admin inventory never includes draft bodies");
      const canonical = await resolveCompanyRequest(document.company, document.kind);
      assert.deepEqual(canonical.document, await getDocument({ scope: "company", company: document.company, kind: document.kind }));
      assert.equal(canonical.href, undefined);
      for (const [query, former] of [[true, false], [false, true], [true, true]]) {
        assert.equal((await resolveCompanyRequest(document.company, document.kind, query, former)).href, companyDocumentHref(document.company, document.kind));
      }
    }
    for (const reserved of RESERVED_SEGMENTS) for (const { slug: kind } of companyKinds) assert.equal((await resolveCompanyRequest(reserved, kind, true)), undefined);
    assert.equal(getRepresentative("unknown", "resume"), undefined);
    assert.equal(getRepresentative("featuring", "portfolio"), undefined);
    assert.equal((await resolveCompanyRequest("unknown", "resume", true, true)), undefined);
    for (const { slug: kind } of companyKinds) assert.equal((await resolveCompanyRequest("common", kind, false, true)).href, `/${kind}`);
    const alias = await resolveCompanyRequest("jyp-v2", "resume", true);
    assert.equal(alias?.href, "/jyp/resume");
  }
} finally {
  if (originalEnvironment === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalEnvironment;
}
console.log(`PASS ${registry.companyDocuments.length} base + ${registry.revisionDocuments.length} revision records; ${chosen.size} representatives; canonical/latest/all-environments/reserved/alias/query and violating fixtures`);
const result = spawnSync(process.execPath, ["--test", "app/fe/content/documents/resume-copy.test.mjs", "app/fe/content/common/source.test.mjs"], { encoding: "utf8" });
process.stdout.write(result.stdout); process.stderr.write(result.stderr);
if (result.status !== 0) process.exit(result.status ?? 1);
