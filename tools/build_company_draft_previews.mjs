// Local review projection only. The accepted Markdown and claim-map remain read-only owners.
// node --experimental-strip-types tools/build_company_draft_previews.mjs [--check]
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseReview } from "../app/fe/content/documents/parse-markdown.ts";

export const root = fileURLToPath(new URL("..", import.meta.url));
const tailored = "wiki/products/resume/tailored/";
export const inputs = [
  ["featuring", "featuring/2026-08-31_wanted_backend-engineer/revisions/2026-09-21-backend-engineer", "20260921-R2", "featuring-wanted-346800-documents"],
  ["miridih-pe", "miridih-pe/2026-09-30_greeting_product-engineer-210889", null, "miridih-pe-210889-documents"],
  ["ably", "ably/2026-09-30_wanted_backend-engineer-359638", null, "ably-wanted-359638-documents"],
  ["nrise", "nrise/2026-09-30_wanted_ai-product-builder-380399", null, "nrise-wanted-380399-documents"],
  ["soomgo", "soomgo/2026-09-30_wanted_backend-engineer-381751", null, "soomgo-wanted-381751-documents"],
  ["paytalab", "paytalab/2026-09-30_wanted_backend-developer-325718", null, "paytalab-wanted-325718-documents"],
  ["wrtn", "wrtn/2026-09-30_wanted_backend-engineer-299607", null, "wrtn-wanted-299607-documents"],
  ["toss-place", "toss-place/2026-09-10_toss-career_server-developer-7924405003", "20261001-R2", "toss-place-wanted-323996-documents"],
  ["hybe", "hybe/2026-09-30_wanted_it-system-planning-operations-pm-373348", null, "hybe-wanted-373348-documents"],
].map(([slug, folder, storedRevision, task]) => ({ slug, source: `${tailored}${folder}/content-draft.md`, storedRevision, task }));
export const digest = bytes => createHash("sha256").update(bytes).digest("hex");

// Use the project's existing YAML runtime rather than a second incomplete YAML parser.
export function loadOwners() {
  const script = `import json,sys,yaml
from pathlib import Path
root=Path(sys.argv[1]); paths=json.loads(sys.argv[2]); result=[]
for source in paths:
 p=root/source; text=p.read_text(); result.append({'metadata':yaml.safe_load(text.split('---',2)[1]),'map':yaml.safe_load(p.with_name('claim-map.yaml').read_text())})
claims=[claim for p in (root/'wiki/evidence/claims').glob('*.yaml') for claim in (yaml.safe_load(p.read_text()) or {}).get('claims',[])]
registry=yaml.safe_load((root/'wiki/products/resume/application-registry.yaml').read_text())
print(json.dumps({'owners':result,'claims':claims,'registry':registry},ensure_ascii=False,default=str))`;
  const result = spawnSync("uv", ["run", "--project", path.join(root, "tools"), "python", "-c", script, root, JSON.stringify(inputs.map(input => input.source))], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

export function documentBodies(markdown) {
  const markers = [...markdown.matchAll(/^<!-- document: ([\w-]+) -->\r?\n/gm)];
  const bodies = {};
  for (const [index, marker] of markers.entries()) {
    if (!["resume", "career", "career-description"].includes(marker[1])) continue;
    let body = markdown.slice(marker.index + marker[0].length, markers[index + 1]?.index ?? markdown.length);
    // Some MD-only inputs have no end marker. Internal decisions and interview notes are never document copy.
    const memo = body.search(/^#{1,2} (?:확인 필요|검토 메모 \(문서 밖\)|CV 선택|포트폴리오 선택|Portfolio|사용자 검토 체크|면접 대비 메모|제출 전 게이트|게이트 대조)(?:\s|$)/m);
    if (memo >= 0) body = body.slice(0, memo);
    body = body.replace(/\s+$/, "") + "\n";
    assert.equal([...body.matchAll(/^# /gm)].length, 1, "Document must have one title; unexpected trailing section outside document markers");
    const key = marker[1] === "resume" ? "resume" : "career";
    assert(!bodies[key], `Duplicate ${key} document`);
    bodies[key] = body;
  }
  assert(bodies.resume && bodies.career, "Accepted source needs resume + career document markers");
  assert(!/면접 대비 메모|검토 메모 \(문서 밖\)|사용자 검토 체크|^#{1,2} 확인 필요/m.test(bodies.resume + bodies.career), "Internal memo leaked");
  return bodies;
}

// Same ResumeCopy projection responsibilities as build_revision_documents.mjs.
// The MD-only drafts additionally allow row-scoped claims and bold inline copy.
export function parseResume(text, expectedSections) {
  const lines = text.replace(/\\\r?\n(?=\S)/g, "\u0000").split(/\r?\n/).map(line => line.replaceAll("\u0000", "\n"));
  const firstSection = lines.findIndex(line => line.startsWith("## "));
  const header = lines.slice(0, firstSection).map(line => line.trim()).filter(line => line && !line.startsWith("<!--"));
  assert.equal(header[0], "# 이력서");
  assert.equal(header.length, 5, "Resume header: title, identity, career, stack, contacts");
  const [name, ...role] = header[1].split(" · ");
  const contacts = [...header[4].matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(([, label, href]) => {
    assert(/^(https:\/\/|mailto:)/.test(href), "Unsafe contact"); return { label, href };
  });
  assert.equal(contacts.length, 3);
  const sections = []; let section, entry, claims = [], presentation;
  for (let index = firstSection; index < lines.length; index++) {
    const line = lines[index].trim(); if (!line) continue;
    const claim = line.match(/^<!-- claims: ?(.*?) ?-->$/);
    if (claim) { claims = claim[1].split(/\s+/).filter(Boolean); continue; }
    const annotation = line.match(/^<!-- presentation: ([\w-]+) -->$/);
    if (annotation) {
      assert(["role", "metadata", "heading", "subheading", "project-meta", "service-heading"].includes(annotation[1]), "Unknown resume presentation");
      presentation = annotation[1]; continue;
    }
    if (line.startsWith("## ")) { section = { title: line.slice(3), entries: [] }; sections.push(section); entry = { blocks: [] }; section.entries.push(entry); claims = []; continue; }
    if (line.startsWith("### ")) { entry = { title: line.slice(4), blocks: [] }; section.entries.push(entry); claims = []; continue; }
    assert(entry, "Resume copy outside a section");
    if (/^#{4,5} /.test(line)) {
      entry.blocks.push({ kind: "paragraph", text: line.replace(/^#{4,5} /, ""), claims: [...claims], presentation: line.startsWith("#####") ? "subheading" : "heading" }); claims = []; continue;
    }
    if (line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map(cell => cell.trim());
      if (cells.every(cell => /^:?-+:?$/.test(cell))) continue;
      if (/^\|\s*:?-+/.test(lines[index + 1]?.trim() ?? "")) continue;
      assert([2, 3].includes(cells.length), "Resume table needs 2 or 3 columns");
      entry.blocks.push({ kind: cells.length === 2 ? "skill" : "row", label: cells[0], text: cells[1], ...(cells.length === 3 ? { meta: cells[2] } : {}), claims: [...claims] }); continue;
    }
    assert(!/^(?:#|<|>|```|\d+\.)/.test(line) && !/\]\((?!https:\/\/)/.test(line), `Unsupported resume syntax: ${line}`);
    entry.blocks.push({ kind: line.startsWith("- ") ? "bullet" : "paragraph", text: line.replace(/^- /, ""), claims: [...claims], ...(presentation ? { presentation } : {}) }); presentation = undefined;
  }
  assert.deepEqual(sections.map(item => item.title), expectedSections.split(" | ").map(title => title.trim()), "Resume source section order drift");
  assert.equal(sections[0].title, "소개"); assert.equal(sections[0].entries.length, 1);
  return { name, role: role.join(" · "), careerLine: header[2], specialtyLine: header[3], contacts, sections: sections.map(item => ({ ...item, entries: item.entries.filter(value => value.title || value.blocks.length) })) };
}

export function citedClaims(value, ids = new Set()) {
  if (Array.isArray(value)) value.forEach(item => citedClaims(item, ids));
  else if (value && typeof value === "object") {
    (value.claims ?? []).forEach(id => ids.add(id)); Object.values(value).forEach(item => citedClaims(item, ids));
  }
  return [...ids].sort();
}
const annotationClaims = body => [...new Set([...body.matchAll(/<!-- claims: ?(.*?) ?-->/g)].flatMap(match => match[1].split(/\s+/).filter(Boolean)))].sort();
export function claimParts(body) {
  const boundary = body.search(/^## /m);
  assert(boundary >= 0, "Document needs body sections");
  return { header: annotationClaims(body.slice(0, boundary)), body: annotationClaims(body.slice(boundary)) };
}

export function project(input, markdown, owner, claims) {
  const meta = owner.metadata;
  assert.equal(meta.approved, false); assert.equal(owner.map.approved, false); assert.equal(meta.visibility, "local");
  assert(["draft", "content-review"].includes(meta.status), "Source must remain an unapproved review draft");
  assert.equal(meta.content_owner, "content-draft.md");
  for (const key of ["revision", "company_name", "position", "application_id", "timestamp", "focus", "sections"]) assert(meta[key], `Missing source metadata ${key}`);
  if (input.storedRevision) assert.equal(meta.revision, input.storedRevision);
  const bodies = documentBodies(markdown);
  const common = { slug: input.slug, companyName: meta.company_name, position: meta.position, status: "draft", approved: false, visibility: "local", updatedAt: String(meta.timestamp), revision: meta.revision, applicationId: meta.application_id, focus: meta.focus };
  const records = {
    resume: { ...common, document: "resume", content: parseResume(bodies.resume, meta.sections) },
    // MD-only Paytalab uses the resume's service-heading annotation for career sub-labels.
    // Adapt only its presentation name to the existing career label; keep copy/claims intact.
    career: { ...common, document: "career", content: parseReview(bodies.career.replaceAll("<!-- presentation: service-heading -->", "<!-- presentation: label -->")) },
  };
  const map = owner.map.draft?.revision === meta.revision ? owner.map.draft : owner.map;
  if (map.revision !== undefined) assert.equal(map.revision, meta.revision, "Claim-map revision differs from accepted draft");
  assert(owner.map.source_documents?.includes("content-draft.md") || owner.map.draft?.content_owner === "content-draft.md", "Claim-map must identify the Markdown owner");
  const publicClaims = new Map(claims.map(claim => [claim.id, claim]));
  for (const [kind, record] of Object.entries(records)) {
    const sourceIds = annotationClaims(bodies[kind]);
    const mapped = [...(map.sections?.[kind === "career" ? "career-description" : kind] ?? [])].sort();
    assert.deepEqual(sourceIds, mapped, `${input.slug}/${kind}: source and claim-map differ`);
    const parts = claimParts(bodies[kind]);
    assert.deepEqual(citedClaims(record.content.sections), parts.body, `${input.slug}/${kind}: body claim loss or invention`);
    if (kind === "career") assert.deepEqual(citedClaims(record.content.header), parts.header, `${input.slug}/${kind}: header claim loss or invention`);
    for (const id of sourceIds) {
      const claim = publicClaims.get(id);
      assert(claim?.public === true && ["high", "medium"].includes(claim.confidence), `${input.slug}/${kind}: unknown/non-public/low claim ${id}`);
    }
    assert(record.content.sections.length, "Empty document");
    assert(/MediSolve AI.*(2026\.09|\[확인 필요)/.test(bodies[kind]), "MediSolve end valid");
    assert(!/Laughtale|\/Users\/|면접 대비 메모/.test(JSON.stringify(record)), "Excluded or private text leaked");
  }
  return { records, bodies };
}

// Source lines → JSON blocks, including table cells, are durable review evidence, never app metadata.
export function correspondence(markdown, record, body) {
  const rows = []; const sourceLines = markdown.split(/\r?\n/);
  const start = markdown.indexOf(body.trimEnd()); assert(start >= 0, "Document source range missing");
  const startLine = markdown.slice(0, start).split(/\r?\n/).length;
  const endLine = startLine + body.trimEnd().split(/\r?\n/).length - 1;
  function walk(value, pointer) {
    if (Array.isArray(value)) { value.forEach((item, index) => walk(item, `${pointer}/${index}`)); return; }
    if (!value || typeof value !== "object") return;
    if (value.kind) {
      const texts = value.kind === "table" ? [...value.columns, ...value.rows.flat()] : [value.label, value.text, value.meta, value.id].filter(Boolean);
      const lineNumbers = texts.flatMap(text => {
        const needle = text.split("\n")[0].replace(/\\$/, "");
        return sourceLines.flatMap((line, index) => index + 1 >= startLine && index + 1 <= endLine && line.includes(needle) ? [index + 1] : []);
      });
      assert(lineNumbers.length || ["flow", "image", "figure"].includes(value.kind), `Unmapped source block ${pointer}`);
      rows.push({ pointer, kind: value.kind, lines: [...new Set(lineNumbers)], claims: value.claims, text: texts });
    }
    Object.entries(value).forEach(([key, item]) => walk(item, `${pointer}/${key}`));
  }
  walk(record.content, "/content"); return rows;
}

export function build(check = false) {
  const owners = loadOwners(); const evidence = [];
  for (const [index, input] of inputs.entries()) {
    const markdown = readFileSync(path.join(root, input.source), "utf8");
    const { records, bodies } = project(input, markdown, owners.owners[index], owners.claims);
    const folder = `app/fe/content/documents/companies/${input.slug}${input.storedRevision ? `/revisions/${input.storedRevision}` : ""}`;
    for (const [kind, record] of Object.entries(records)) {
      const relative = `${folder}/${kind}.json`; const file = path.join(root, relative); const bytes = `${JSON.stringify(record, null, 2)}\n`;
      if (check) assert(existsSync(file) && readFileSync(file, "utf8") === bytes, `DRIFT ${relative}`);
      else { mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, bytes); }
      evidence.push({ slug: input.slug, kind, task: `wiki/projects/dae-jeong/tasks/${input.task}.md`, source: input.source, sourceSha256: digest(markdown), claimMapSha256: digest(readFileSync(path.join(root, path.dirname(input.source), "claim-map.yaml"))), projection: relative, projectionSha256: digest(bytes), revision: record.revision, applicationId: record.applicationId, sourceClaims: annotationClaims(bodies[kind]), projectedClaims: citedClaims(record.content), sourceBodyClaims: claimParts(bodies[kind]).body, sourceHeaderClaims: claimParts(bodies[kind]).header, headerOnlyClaims: claimParts(bodies[kind]).header.filter(id => !claimParts(bodies[kind]).body.includes(id)), paragraphs: correspondence(markdown, record, bodies[kind]) });
      console.log(`${check ? "OK" : "WROTE"} ${relative}`);
    }
  }
  if (!check) {
    const out = path.join(root, "output/harness/company-draft-preview"); mkdirSync(out, { recursive: true });
    writeFileSync(path.join(out, "projection-evidence.json"), JSON.stringify(evidence, null, 2) + "\n");
  }
  return evidence;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) build(process.argv.includes("--check"));
