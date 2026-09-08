// Browser verification uses the existing Orca preview tab; it never opens a second browser.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const page = process.argv[2];
assert(page, "Provide the Orca browserPageId");
const base = process.argv[3] || "http://localhost:4000";
const output = fileURLToPath(new URL("../../../../output/harness/common-refresh/", import.meta.url));
mkdirSync(output, { recursive: true });
function orca(command, ...args) {
  const response = JSON.parse(execFileSync("orca", [command, ...args, "--page", page, "--json"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }));
  assert(response.ok, JSON.stringify(response.error));
  return response.result;
}
function evaluate(expression) { return JSON.parse(orca("eval", "--expression", `JSON.stringify(${expression})`).result); }
const normalize = (text) => text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/^\d+\. /, "").replace(/\s+/g, " ").trim();
function expectedCopy(data) {
  const texts = [], claims = new Set();
  function walk(value, key) {
    if (key === "claims") { value.forEach((claim) => claims.add(claim)); return; }
    if (Array.isArray(value)) { value.forEach((item) => walk(item, key)); return; }
    if (value && typeof value === "object") {
      for (const [field, item] of Object.entries(value)) walk(item, field);
    } else if (["text", "title", "name", "role", "careerLine", "label", "rows", "period"].includes(key) && typeof value === "string") texts.push(normalize(value));
  }
  walk(data);
  return { texts, claims: [...claims].sort() };
}
const records = [];
for (const [route, file] of (process.argv.includes("--copy-only") ? [] : [["resume", "resume"], ["career", "career-description"], ["portfolio", "portfolio"], ["cv", "cv"]])) {
  const expected = expectedCopy(JSON.parse(readFileSync(new URL(`../../content/common/${file}.json`, import.meta.url), "utf8")));
  orca("goto", "--url", `${base}/${route}`);
  // Wait for fonts and two layout frames, not an arbitrary fixed sleep.
  orca("eval", "--expression", "document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))))");
  for (const [width, height] of [[1440, 900], [1920, 1080], [390, 844]]) {
    orca("viewport", "--width", String(width), "--height", String(height), "--scale", "1");
    const state = evaluate(`(() => {
      const doc = document.querySelector('[data-common-document]');
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
      return {
        text: doc.innerText.replace(/\\s+/g,' ').trim(),
        claims: [...new Set([...doc.querySelectorAll('[data-claim]')].flatMap(e => e.dataset.claim.split(' ').filter(Boolean)))].sort(),
        width: innerWidth, bodyWidth: document.body.scrollWidth, docWidth: doc.scrollWidth,
        duplicateIds: new Set(ids).size !== ids.length,
        headings: [...doc.querySelectorAll('h2')].map(e => e.textContent),
        brokenAnchors: [...doc.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
        language: doc.lang, template: doc.dataset.cvTemplate
      };
    })()`);
    assert.equal(state.bodyWidth, width, `${route}: body overflow ${JSON.stringify(state)}`);
    assert(!state.duplicateIds && !state.brokenAnchors.length, route);
    assert.deepEqual(state.claims, expected.claims, `${route}: rendered claims differ`);
    const missing = expected.texts.filter((text) => !state.text.includes(text));
    assert.deepEqual(missing, [], `${route}: missing reviewed copy`);
    if (route === "cv") {
      assert.equal(state.language, "en");
      assert.equal(state.template, "jake");
      assert(!/[\uac00-\ud7a3]/u.test(state.text), "English CV contains Korean text");
      assert.equal(state.headings[0], "Experience");
    }
    delete state.text;
    delete state.claims;
    records.push({ route, ...state, copyItems: expected.texts.length, claims: expected.claims.length });
    for (const position of ["top", "middle", "bottom"]) {
      evaluate(`window.scrollTo({top: ${position === "top" ? "0" : position === "middle" ? "document.body.scrollHeight / 2" : "document.body.scrollHeight"}, behavior:'instant'})`);
      const shot = orca("screenshot");
      writeFileSync(path.join(output, `${route}-${width}-${position}.png`), Buffer.from(shot.data, "base64"));
    }
    console.log(`PASS ${route} ${width}×${height}: ${expected.texts.length} copy items / ${expected.claims.length} claims`);
  }
}
orca("viewport", "--width", "1440", "--height", "900", "--scale", "1");
// Shared diagrams can retain submitted copy. Inspect rendered text, not only source files.
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const selection = JSON.parse(execFileSync("uv", ["run", "--project", "tools", "python", "-c",
  "import sys,json;sys.path.insert(0,'tools');import verify,validate_workspace as v;from pathlib import Path;print(json.dumps({'routes':verify.active_routes(),'rules':v._load_yaml_file(Path('.'),v.COPY_GATES_PATH)['copy_selection']}))",
], { cwd: root, encoding: "utf8" }));
const selectionRecords = [];
for (const route of [...new Set([...selection.routes, "/portfolio/thready"])]) {
  orca("goto", "--url", base + route);
  const text = evaluate("document.body.innerText");
  assert(text.includes(/^\/cv(?:\/common)?$/.test(route) ? "Daejeong Kim" : "김대정"), `${route}: document missing`);
  for (const rule of selection.rules) for (const pattern of rule.patterns) {
    const scopedText = (rule.excluded_text || []).reduce((result, excluded) => result.replaceAll(excluded, ""), text);
    const expression = new RegExp(pattern.replace(/^\(\?i\)/, ""), pattern.startsWith("(?i)") ? "i" : "");
    assert(!expression.test(scopedText), `${route}: copy gate ${rule.gate}: ${scopedText.match(expression)?.[0]}`);
  }
  selectionRecords.push(route);
  console.log(`PASS rendered copy selection ${route}`);
}
// Hypernova is frozen and consumes the preserved diagram/case branch.
orca("goto", "--url", base + "/portfolio/hypernova");
const frozen = evaluate("document.body.innerText");
assert(frozen.includes("37% → 11%") && frozen.includes("94%"), "Frozen Hypernova copy changed");
orca("goto", "--url", `${base}/common`);
const links = evaluate("[...document.querySelectorAll('main a')].map(a => a.getAttribute('href'))");
for (const route of ["/resume", "/career", "/portfolio", "/cv", "/resume/compare"]) assert(links.includes(route), route);
writeFileSync(path.join(output, process.argv.includes("--copy-only") ? "copy-selection.json" : "checks.json"), JSON.stringify({ checkedAt: new Date().toISOString(), result: "PASS", records, selectionRecords, frozenHypernova: "preserved" }, null, 2));
console.log(`PASS: common hub links, ${records.length} document viewports. Screenshots: ${output}`);
