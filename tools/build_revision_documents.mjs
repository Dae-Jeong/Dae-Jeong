// Markdown-only source → app projection for extra local review revisions.
// The revision's content-draft.md stays the only editable copy; JSON is regenerated and
// compared (--check) so the app never drifts from the wiki draft.
//   node --experimental-strip-types tools/build_revision_documents.mjs <content-draft.md> <out-dir> [--check]
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseReview } from "../app/fe/content/documents/parse-markdown.ts";

const args = process.argv.slice(2);
const [source, outDir] = args;
assert(source && outDir, "usage: build_revision_documents.mjs <content-draft.md> <out-dir> [--check] [--only=resume|career]");
const check = args.includes("--check");
// --only=<kind>: build/gate/write just that document (R3 adapter, 2026-09-13). The other document is left
// untouched on disk and is not parsed or claim-gated here — it is out of scope, not bypassed.
// --career-source=<file>: build the career document from a separate reviewed draft (career-draft-v1.md, 2026-09-13)
// instead of the career body inside content-draft.md. Internal review memo and mermaid fences are adapted below.
const careerSourceArg = args.find((arg) => arg.startsWith("--career-source="));
const careerSource = careerSourceArg ? careerSourceArg.slice("--career-source=".length) : null;
const onlyArg = args.find((arg) => arg.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length) : null;
assert(!only || only === "resume" || only === "career", "--only must be resume or career");
const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const markdown = readFileSync(source, "utf8");
const frontmatter = Object.fromEntries((markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/) ?? ["", ""])[1].split(/\r?\n/)
  .map((line) => line.match(/^([\w-]+):\s*(.*)$/)).filter(Boolean).map(([, key, value]) => [key, value.trim()]));
for (const key of ["revision", "status", "visibility", "approved", "content_owner", "projection"]) assert(frontmatter[key] !== undefined, `frontmatter.${key}`);
assert.equal(frontmatter.approved, "false"); assert.equal(frontmatter.status, "draft"); assert.equal(frontmatter.visibility, "local");
assert.equal(frontmatter.content_owner, "content-draft.md", "the Markdown draft is the only editable copy");
assert.equal(path.relative(root, path.resolve(outDir)), frontmatter.projection, "projection must equal the app output directory");

const parts = markdown.split(/^<!-- document: (\w+) -->\r?\n/m);
const bodies = {};
for (let index = 1; index < parts.length; index += 2) bodies[parts[index]] = parts[index + 1];
assert.deepEqual(Object.keys(bodies).sort(), ["career", "resume"], "expected exactly resume + career sections");

// Resume reader — same output shape the classic renderer consumes (see companies/*/resume.json).
function parseResume(text) {
  const lines = text.split(/\r?\n/);
  const header = [];
  let index = 0;
  for (; index < lines.length && !lines[index].startsWith("## "); index++) if (lines[index].trim()) header.push(lines[index].trim());
  assert.equal(header[0], "# 이력서"); assert.equal(header.length, 5, "resume header: title, identity, career line, specialty line, contacts");
  const [name, ...role] = header[1].split(" · ");
  const contacts = [...header[4].matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(([, label, href]) => {
    assert(/^(https:\/\/|mailto:)/.test(href), "unsafe contact"); return { label, href };
  });
  assert.equal(contacts.length, 3);
  const sections = []; let section, entry, claims = [], presentation;
  for (; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) continue;
    const claim = line.match(/^<!-- claims: ?(.*?) ?-->$/);
    if (claim) { claims = claim[1].split(/\s+/).filter(Boolean); continue; }
    const pres = line.match(/^<!-- presentation: ([\w-]+) -->$/);
    if (pres) { assert(["role", "metadata", "heading", "subheading", "project-meta", "service-heading"].includes(pres[1])); presentation = pres[1]; continue; } // project-meta: one grey stack line under a project heading (R3, 2026-09-13)
    if (line.startsWith("## ")) { section = { title: line.slice(3), entries: [] }; sections.push(section); entry = { blocks: [] }; section.entries.push(entry); claims = []; continue; }
    if (line.startsWith("### ")) { entry = { title: line.slice(4), blocks: [] }; section.entries.push(entry); claims = []; continue; }
    if (line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      if (cells.every((cell) => /^-+$/.test(cell))) continue;
      // Header row = the row directly followed by the separator row (분야|기술, 활동|내용, 구분|내용|시기 …); never emitted as copy.
      if (/^\|\s*-+/.test(lines[index + 1]?.trim() ?? "")) continue;
      if (cells.length === 2) {
        // Two-column table: label | text (skill table contract; also used for the activities table).
        entry.blocks.push({ kind: "skill", label: cells[0], text: cells[1], claims: [...claims] });
      } else if (cells.length === 3) {
        // Credential table (R3 adapter, 2026-09-13): 구분 | 내용 | 시기 → one row block per line; claims from the comment above the table.
        entry.blocks.push({ kind: "row", label: cells[0], text: cells[1], meta: cells[2], claims: [...claims] });
      } else {
        assert.fail(`resume table needs two (분야|기술) or three (구분|내용|시기) columns: ${line.slice(0, 60)}`);
      }
      continue;
    }
    // Plain copy only: no headings/blocks/bold; links are allowed only as [label](https://…) (renderer Inline draws them), never mailto/other schemes.
    assert(!/^(?:#|<|>|```|\d+\.)/.test(line) && !/\*\*/.test(line) && !/\]\((?!https:\/\/)/.test(line), `resume: unsupported syntax: ${line.slice(0, 60)}`);
    const bullet = line.startsWith("- ");
    entry.blocks.push({ kind: bullet ? "bullet" : "paragraph", text: bullet ? line.slice(2) : line, claims: [...claims], ...(presentation ? { presentation } : {}) });
    presentation = undefined;
  }
  // Section contract: the default 6-section layout, or the order the revision declares in frontmatter
  // `sections:` (" | "-separated, R3 career-first adapter exception) — only known titles, 소개 first, 경력 present.
  const known = ["소개", "대표 성과", "경력", "기술", "외부 활동", "프로젝트·외부 활동", "학력·수상·특허·자격"]; // 프로젝트·외부 활동: R3 제목 확정 (2026-09-13)
  const expected = frontmatter.sections ? frontmatter.sections.split(" | ").map((title) => title.trim()) : known;
  assert(expected[0] === "소개" && expected.includes("경력") && expected.every((title) => known.includes(title)) && new Set(expected).size === expected.length, "frontmatter.sections must list known resume sections (소개 first, 경력 included, no repeats)");
  assert.deepEqual(sections.map((item) => item.title), expected, "resume section contract");
  assert.equal(sections[0].entries.length, 1, "소개 must be a single entry (header renders entries[0] only)");
  return { name, role: role.join(" · "), careerLine: header[2], specialtyLine: header[3], contacts, sections: sections.map((item) => ({ ...item, entries: item.entries.filter((e) => e.title || e.blocks.length) })) };
}

// position/focus: the Markdown frontmatter owns them when present (R3 metadata adapter exception); otherwise keep the original values.
const meta = {
  slug: frontmatter.projection.split("/").at(-3), companyName: "미리디", position: frontmatter.position || "Product Engineer · Technical Product Manager",
  status: "draft", approved: false, visibility: "local", updatedAt: frontmatter.timestamp, revision: frontmatter.revision,
  applicationId: "miridih-2026-09-12-engineering-depth-review", focus: frontmatter.focus || "R2 구성은 유지하고 데이터 검수·검색·생성 품질·상태 경계·팀 개발 기반의 설계 선택·처리 방식·실패 경계·검증 범위를 엔지니어가 평가할 수 있는 밀도로 복원한 R3 검토본입니다",
};
assert.equal(meta.slug, "miridih");
const projections = {};
if (!only || only === "resume") projections.resume = { ...meta, document: "resume", content: parseResume(bodies.resume) };
// Separate career draft → submission body only: drop frontmatter, cut the internal memo (`---` + `## 내부 편집·검토 메모` to EOF,
// which also holds the source/private links), turn each ```mermaid flowchart``` into one `<!-- flow: {…} -->` annotation,
// then mark role/metadata/label presentations from position (first line under a company, dated line, stack line, bold-only sub-label).
function loadCareerDraft(file) {
  let text = readFileSync(file, "utf8").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const memo = text.search(/\r?\n---\r?\n+## 내부 편집·검토 메모/);
  assert(memo > 0, "career draft: internal memo separator (--- + ## 내부 편집·검토 메모) not found");
  text = text.slice(0, memo);
  assert(!/\]\((?!https:\/\/|mailto:)/.test(text), "career draft: relative/private link left in submission body");
  text = text.replace(/```mermaid\r?\n([\s\S]*?)```/g, (_, body) => {
    const lines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const direction = (lines.shift().match(/^flowchart\s+(LR|TD)$/) ?? assert.fail("career draft: only `flowchart LR|TD` is supported"))[1];
    const nodes = new Map(); const edges = [];
    const node = (token) => { const m = token.trim().match(/^([A-Za-z0-9_]+)(?:\[(.+)\])?$/); assert(m, `career draft: bad flow node ${token}`); if (m[2]) nodes.set(m[1], m[2]); else assert(nodes.has(m[1]), `career draft: undefined flow node ${m[1]}`); return m[1]; };
    for (const l of lines) { const parts = l.split("-->"); assert(parts.length === 2, `career draft: unsupported flow line ${l}`); edges.push({ from: node(parts[0]), to: node(parts[1]) }); }
    return `<!-- flow: ${JSON.stringify({ direction, nodes: [...nodes].map(([id, label]) => ({ id, label })), edges })} -->`;
  });
  assert(!/```/.test(text), "career draft: unsupported code fence");
  const content = parseReview(text);
  const dated = /\d{4}\.\d{2} — \d{4}\.\d{2}/; const stack = /^[^,。]{1,40}( · [^,。]{1,40})+$/; const label = /^\*\*[^*]{2,24}\*\*$/;
  const walk = (section) => {
    let firstParagraph = true;
    for (const block of section.blocks) {
      if (block.kind !== "paragraph") continue;
      if (section.level === 2 && firstParagraph) block.presentation = "role";
      else if (section.level === 2 && dated.test(block.text)) block.presentation = "metadata";
      else if (section.level === 3 && firstParagraph && stack.test(block.text)) block.presentation = "metadata";
      else if (section.level >= 3 && label.test(block.text)) block.presentation = "label";
      firstParagraph = false;
    }
    section.children.forEach(walk);
  };
  content.sections.forEach(walk);
  return content;
}
if (!only || only === "career") projections.career = { ...meta, document: "career", content: careerSource ? loadCareerDraft(careerSource) : parseReview(bodies.career) };

// Claim gate — same rule as tools/validate_documents.py for the 12 documents: every cited claim must
// exist in wiki/evidence/claims and be public with high/medium confidence.
const claimsDir = path.join(root, "wiki/evidence/claims");
const registry = new Map();
for (const file of readdirSync(claimsDir).filter((name) => name.endsWith(".yaml"))) {
  for (const block of readFileSync(path.join(claimsDir, file), "utf8").split(/\n(?=  - id: )/)) {
    const id = block.match(/^\s*- id: (\S+)/m)?.[1]; if (!id) continue;
    registry.set(id, { public: /^\s{4}public: true\s*$/m.test(block), confidence: block.match(/^\s{4}confidence: (\w+)/m)?.[1] });
  }
}
function citedClaims(value, out = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => citedClaims(item, out));
  else if (value && typeof value === "object") { (value.claims ?? []).forEach((id) => out.add(id)); Object.values(value).forEach((item) => citedClaims(item, out)); }
  return out;
}
for (const [kind, data] of Object.entries(projections)) {
  const bad = [...citedClaims(data.content)].filter((id) => { const claim = registry.get(id); return !claim || !claim.public || !["high", "medium"].includes(claim.confidence); });
  assert.deepEqual(bad, [], `${kind}: unknown/non-public/low-confidence claims`);
  assert(data.content.sections.length, `${kind}: empty document`);
}
mkdirSync(outDir, { recursive: true });
let drift = 0;
for (const [kind, data] of Object.entries(projections)) {
  const file = path.join(outDir, `${kind}.json`); const next = `${JSON.stringify(data, null, 2)}\n`;
  if (check) {
    if (!existsSync(file) || readFileSync(file, "utf8") !== next) { drift++; console.error(`DRIFT ${file}`); } else console.log(`OK ${file} matches ${path.basename(source)}`);
  } else { writeFileSync(file, next); console.log(`WROTE ${file}`); }
}
if (drift) process.exit(1);
