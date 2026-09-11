// App-owned documents: exact JSON contracts and shared reader regression checks.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import ts from "../app/fe/node_modules/typescript/lib/typescript.js";

const registryUrl = new URL("../app/fe/content/documents/companies/index.ts", import.meta.url);
const registrySource = readFileSync(registryUrl, "utf8").replace(/import (\w+) from "(\.\/[^\"]+\.json)";/g,
  (_, name, relative) => `const ${name} = ${readFileSync(new URL(relative, registryUrl), "utf8")};`);
const compiled = ts.transpileModule(registrySource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const registry = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
for (const environment of ["production", undefined, "staging", ""]) assert.equal(registry.canViewDraft(environment), false);
for (const environment of ["development", "test"]) assert.equal(registry.canViewDraft(environment), true);
assert.equal(registry.companyDocuments.length, 12);
assert.equal(registry.findCompanyDocument("unknown", "resume"), undefined);
for (const document of registry.companyDocuments) assert.equal(registry.documentHref(document), `/${document.document}/${document.slug}?revision=${document.revision}`);

const slugs = ["featuring", "miridih", "jyp", "toss-place"];
for (const slug of slugs) {
  let metadata;
  for (const kind of ["resume", "career", "portfolio"]) {
    const { content, document, ...current } = JSON.parse(readFileSync(`app/fe/content/documents/companies/${slug}/${kind}.json`, "utf8"));
    assert.equal(document, kind);
    assert.equal(current.slug, slug);
    assert.equal(current.status, "draft"); assert.equal(current.visibility, "local"); assert.equal(current.approved, false);
    assert(current.revision && current.applicationId && content.sections.length);
    assert(!("sourcePath" in current), "Private source paths belong in the local registry");
    if (metadata) assert.deepEqual(current, metadata); else metadata = current;
    function inspect(value) {
      if (Array.isArray(value)) { value.forEach(inspect); return; }
      if (!value || typeof value !== "object") return;
      if (value.kind) {
        assert(["paragraph", "bullet", "skill", "table"].includes(value.kind));
        assert(Array.isArray(value.claims));
        if (value.kind === "table") value.rows.forEach(row => assert.equal(row.length, value.columns.length));
        else assert.equal(typeof value.text, "string");
      }
      Object.values(value).forEach(inspect);
    }
    inspect(content);
    console.log(`PASS ${slug}/${kind}: document contract / local draft`);
  }
}
const result = spawnSync("node", ["--experimental-strip-types", "--test", "app/fe/content/documents/resume-copy.test.mjs", "app/fe/content/common/source.test.mjs"], { encoding: "utf8" });
process.stdout.write(result.stdout); process.stderr.write(result.stderr);
if (result.status !== 0) process.exit(result.status ?? 1);
