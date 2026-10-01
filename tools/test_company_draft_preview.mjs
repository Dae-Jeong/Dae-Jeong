import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { build, documentBodies, inputs, loadOwners, project, root } from "./build_company_draft_previews.mjs";

const owners = loadOwners();
const drafts = inputs.map(input => readFileSync(path.join(root, input.source), "utf8"));
const normalize = text => text.replace(/\*\*/g, "").replace(/\\\n/g, " ").replace(/\s+/g, " ").trim();
function renderedStrings(value) {
  if (Array.isArray(value)) return value.flatMap(renderedStrings);
  if (value && typeof value === "object") return Object.entries(value).filter(([key]) => key !== "claims").flatMap(([, item]) => renderedStrings(item));
  return typeof value === "string" ? [value] : [];
}

test("all 18 accepted projections regenerate exactly from unchanged Markdown and claim-map", () => {
  assert.equal(build(true).length, 18);
});
test("every source copy line survives projection, including inline bold, tables and unresolved periods", () => {
  for (const [index, input] of inputs.entries()) {
    const { records, bodies } = project(input, drafts[index], owners.owners[index], owners.claims);
    for (const kind of ["resume", "career"]) {
      const strings = normalize(renderedStrings(records[kind].content).join(" "));
      for (const line of bodies[kind].split(/\r?\n/).map(line => line.trim()).filter(Boolean)) {
        if (line.startsWith("<!--") || /^\|[\s:|\-]+\|$/.test(line) || line === "# 이력서") continue;
        // Header identity is projected as name and role; contact labels/hrefs remain separate.
        if (kind === "resume" && (line.startsWith("김대정 · ") || line.startsWith("[marin.backend@"))) continue;
        const parts = line.startsWith("|") ? line.split("|").slice(1, -1) : [line.replace(/^#{1,5} /, "").replace(/^- /, "").replace(/\\$/, "")];
        for (const part of parts) {
          // Table column headings are schema labels rather than resume copy.
          if (kind === "resume" && ["분야", "기술", "구분", "내용", "시기", "활동"].includes(part.trim())) continue;
          assert(strings.includes(normalize(part)), `${input.slug}/${kind}: lost source line ${line}`);
        }
      }
      assert.match(strings, /MediSolve AI.*\[확인 필요/);
      assert(!/확인 필요 \| 결정|면접 대비 메모|mode: deferred|사용자 검토 체크/.test(strings));
    }
  }
});
test("internal decisions and HYBE private interview memo stop at the document boundary", () => {
  const hybe = drafts[inputs.findIndex(input => input.slug === "hybe")];
  const bodies = documentBodies(hybe);
  assert(hybe.includes("career.daci-framework-bottleneck-practice"));
  assert(!JSON.stringify(bodies).includes("career.daci-framework-bottleneck-practice"));
  const markerless = "<!-- document: resume -->\n# 이력서\n## 소개\ncopy\n<!-- document: career-description -->\n# 경력기술서\n## 회사\ncopy\n## 확인 필요\nprivate decision\n";
  assert(!documentBodies(markerless).career.includes("private decision"));
  for (const heading of ["# 검토 메모 (문서 밖)", "# CV 선택", "# 포트폴리오 선택"]) {
    const source = markerless.replace("## 확인 필요", heading);
    assert(!documentBodies(source).career.includes(heading));
    assert.equal(project(inputs[1], drafts[1], owners.owners[1], owners.claims).records.career.content.title, "경력기술서");
  }
  assert.throws(() => documentBodies("# 이력서\nmissing markers"), /document markers/);
});
test("approval, revision, claim-map drift and missing document fail closed", () => {
  const input = inputs[0], owner = owners.owners[0];
  for (const approved of [true, null]) assert.throws(() => project(input, drafts[0], { ...owner, metadata: { ...owner.metadata, approved } }, owners.claims));
  assert.throws(() => project(input, drafts[0], { ...owner, metadata: { ...owner.metadata, revision: "20260921-R9" } }, owners.claims));
  assert.throws(() => project(input, drafts[0], { ...owner, map: { ...owner.map, sections: { ...owner.map.sections, resume: [] } } }, owners.claims), /source and claim-map differ/);
});
test("unknown, private and low-confidence claim references cannot become a projection", () => {
  const owner = owners.owners[0]; const used = owner.map.sections.resume[0];
  for (const replacement of [null, { id: used, public: false, confidence: "high" }, { id: used, public: true, confidence: "low" }]) {
    const claims = owners.claims.filter(claim => claim.id !== used);
    if (replacement) claims.push(replacement);
    assert.throws(() => project(inputs[0], drafts[0], owner, claims), /unknown\/non-public\/low claim/);
  }
});
