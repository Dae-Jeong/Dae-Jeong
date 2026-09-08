// Run after opening the local comparison in Orca: node .../browser-check.mjs <page-id>
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const page = process.argv[2];
assert(page, "Provide the Orca browserPageId for the local comparison tab.");
const output = fileURLToPath(new URL("../../../../../output/harness/resume-ui-comparison/", import.meta.url));
mkdirSync(output, { recursive: true });
function orca(command, ...args) {
  const response = JSON.parse(execFileSync("orca", [command, ...args, "--page", page, "--json"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }));
  assert(response.ok, JSON.stringify(response.error));
  return response.result;
}
function evaluate(expression) { return JSON.parse(orca("eval", "--expression", `JSON.stringify(${expression})`).result); }
function element(name, role) {
  const entries = Object.entries(orca("snapshot").refs);
  const match = entries.find(([, value]) => value.name === name && value.role === role);
  assert(match, `Missing ${role}: ${name}`);
  return match[0];
}
function click(name, role = "button") { orca("click", "--element", element(name, role)); }
function select(value) { orca("select", "--element", element("비교할 항목", "combobox"), "--value", value); }
function viewport(width, height) { orca("viewport", "--width", String(width), "--height", String(height), "--scale", "1"); }
function screenshot(name) {
  const shot = orca("screenshot");
  writeFileSync(path.join(output, `${name}.png`), Buffer.from(shot.data, "base64"));
}
const records = [];
const copy = JSON.parse(readFileSync(new URL("../../../content/common/resume.json", import.meta.url), "utf8"));
const sourceBlocks = copy.sections.flatMap(section => section.entries.flatMap(entry => entry.blocks));
const expectedClaims = [...new Set(sourceBlocks.flatMap(block => block.claims))].sort();
const expectedCopy = [copy.name, copy.role, copy.careerLine, ...copy.contacts.map(contact => contact.label),
  ...copy.sections[0].entries[0].blocks.map(block => block.text),
  ...copy.sections.slice(1).flatMap(section => [section.title, ...section.entries.flatMap(entry => [
    ...(entry.title ? [entry.title] : []), ...entry.blocks.map(block => block.label ? `${block.label} ${block.text}` : block.text),
  ])]),
];
function inspect(name, visibleCount) {
  const state = evaluate(`(() => {
    const documents = [...document.querySelectorAll('[data-resume-copy]')];
    const content = documents.map(doc => [...doc.querySelectorAll('[data-copy]')].map(e => e.textContent));
    const claims = documents.map(doc => [...new Set([...doc.querySelectorAll('[data-claim]')].flatMap(e => e.dataset.claim.split(' ').filter(Boolean)))].sort());
    const readers = [...document.querySelectorAll('[data-reader]')].filter(e => e.getClientRects().length);
    return { viewport: [innerWidth, innerHeight], bodyWidth: document.body.scrollWidth,
      sameCopy: JSON.stringify(content[0]) === JSON.stringify(content[1]), blocks: content[0].length, sourceCopy: content[0],
      sameClaims: JSON.stringify(claims[0]) === JSON.stringify(claims[1]), claims: claims[0].length, sourceClaims: claims[0],
      visibleCount: readers.length, overflow: readers.some(e => e.scrollWidth > e.clientWidth + 1),
      visibleSections: readers.map(e => [...e.querySelectorAll('[data-section]')].filter(s => {
        const a=s.getBoundingClientRect(), b=e.getBoundingClientRect(); return a.bottom>b.top && a.top<b.bottom;
      }).map(s => s.dataset.section)),
      duplicateIds: new Set([...document.querySelectorAll('[id]')].map(e => e.id)).size !== document.querySelectorAll('[id]').length
    };
  })()`);
  assert(state.sameCopy && state.sameClaims && !state.duplicateIds && !state.overflow, JSON.stringify(state));
  assert.equal(state.bodyWidth, state.viewport[0]);
  assert.equal(state.visibleCount, visibleCount);
  assert.deepEqual(state.sourceCopy, expectedCopy);
  assert.deepEqual(state.sourceClaims, expectedClaims);
  records.push({ name, ...state });
  screenshot(name);
  return state;
}

assert.equal(evaluate("location.pathname"), "/resume/compare");
viewport(1920, 1080);
click("고전 템플릿");
click("나란히 보기", "checkbox");
select("0");
inspect("1920-side-by-side", 2);
viewport(1440, 900);
inspect("1440-side-by-side", 2);
select("2");
assert(inspect("1440-career", 2).visibleSections.every(sections => sections.includes("2")));
select("3");
assert(inspect("1440-skills-credentials", 2).visibleSections.every(sections => sections.includes("3")));
select("0");
click("고전 템플릿");
inspect("1440-classic", 1);
click("기존안");
inspect("1440-existing", 1);
viewport(390, 844);
inspect("390-existing", 1);
click("고전 템플릿");
inspect("390-classic", 1);
select("5");
assert(inspect("390-credentials", 1).visibleSections[0].includes("5"));
// Hand back a desktop comparison at the beginning, not the last test state.
viewport(1440, 900);
click("나란히 보기", "checkbox");
select("0");
writeFileSync(path.join(output, "checks.json"), JSON.stringify({ checkedAt: new Date().toISOString(), result: "PASS", records }, null, 2));
console.log(`PASS: ${records.length} states; source-copy/claim parity, overflow, toggles, section navigation. Screenshots: ${output}`);
