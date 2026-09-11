// Use an explicitly owned Orca page; never switch the coordinator's tab.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const page = process.argv[2];
assert(page, "Provide your owned Orca page ID");
const slugs = process.argv.slice(3).length ? process.argv.slice(3) : ["miridih", "featuring", "jyp", "toss-place"];
const output = `output/harness/document-consolidation-20260911/browser${slugs.length === 1 ? `-${slugs[0]}` : ""}`;
mkdirSync(output, { recursive: true });
function orca(command, ...args) {
  const response = JSON.parse(execFileSync("orca", [command, ...args, "--page", page, "--json"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }));
  assert(response.ok, JSON.stringify(response.error));
  return response.result;
}
function evaluate(expression) { return JSON.parse(orca("eval", "--expression", `JSON.stringify(${expression})`).result); }
const normalize = (text) => text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/^\d+\. /, "").replace(/\s+/g, " ").trim();
function expected(data) {
  const texts = [], claims = new Set();
  function walk(value, key) {
    if (key === "claims") { value.forEach((id) => claims.add(id)); return; }
    if (Array.isArray(value)) { value.forEach((item) => walk(item, key)); return; }
    if (value && typeof value === "object") Object.entries(value).forEach(([field, item]) => walk(item, field));
    else if (["text", "title", "name", "role", "careerLine", "specialtyLine", "label", "rows", "columns", "detail", "incoming", "caption"].includes(key) && typeof value === "string") texts.push(normalize(value));
  }
  walk(data);
  return { texts, claims: [...claims].sort() };
}
const records = [];
orca("viewport", "--width", "1440", "--height", "900", "--scale", "1");
orca("goto", "--url", "http://localhost:4000/_map");
orca("snapshot");
const hub = evaluate(`[...document.querySelectorAll('main a')].filter(a=>a.search.includes('revision=20260910-R1')).map(a=>a.pathname+a.search)`);
assert.equal(new Set(hub).size, 12);
writeFileSync(path.join(output, "hub-1440.png"), Buffer.from(orca("screenshot").data, "base64"));
for (const slug of slugs) {

  for (const kind of ["resume", "career", "portfolio"]) {
    const data = JSON.parse(readFileSync(`app/fe/content/documents/companies/${slug}/${kind}.json`, "utf8"));
    const route = `/${kind}/${slug}?revision=${data.revision}`;
    const copy = expected(data.content);
    orca("goto", "--url", `http://localhost:4000${route}`);
    orca("snapshot");
    orca("eval", "--expression", "document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))))");
    for (const [width, height] of [[1440, 900], [1920, 1080], [390, 844]]) {
      orca("viewport", "--width", String(width), "--height", String(height), "--scale", "1");
      const state = evaluate(`(() => {
        const doc = document.querySelector('main');
        const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
        return { text: doc.innerText.replace(/\\s+/g,' ').trim(),
          claims: [...new Set([...doc.querySelectorAll('[data-claim]')].flatMap(e=>e.dataset.claim.split(' ').filter(Boolean)))].sort(),
          width:innerWidth, bodyWidth:document.body.scrollWidth,
          duplicateIds:new Set(ids).size!==ids.length,
          brokenAnchors:[...doc.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),
          figures:[...doc.querySelectorAll('figure')].map(e=>({label:e.getAttribute('aria-label'),width:e.clientWidth,scrollWidth:e.scrollWidth})),
          reviewInsideDocument:/DRAFT|승인 전|5년 요건/.test(doc.innerText),
          nav:[...document.querySelectorAll('nav[aria-label$="문서 전환"] a')].map(a=>a.pathname)
        };
      })()`);
      assert.equal(state.bodyWidth, width, `${route}: overflow`);
      assert(!state.duplicateIds && !state.brokenAnchors.length && !state.reviewInsideDocument, route);
      assert.deepEqual(state.claims, copy.claims, `${route}: rendered claims differ`);
      assert.deepEqual(copy.texts.filter(text=>!state.text.includes(text)), [], `${route}: missing copy`);
      assert.equal(state.nav.length, 4);
      assert(state.figures.every(figure=>figure.scrollWidth<=figure.width+1), `${route}: figure overflow`);
      const {text, claims, ...summary} = state;
      records.push({route, ...summary, copyItems:copy.texts.length, claims:claims.length});
      if (width === 1440) {
        for (const [position, offset] of [["top", "0"], ["middle", "document.body.scrollHeight/2"], ["bottom", "document.body.scrollHeight"]]) {
          evaluate(`window.scrollTo({top:${offset},behavior:'instant'})`);
          writeFileSync(path.join(output, `${slug}-${kind}-${position}.png`), Buffer.from(orca("screenshot").data, "base64"));
        }
      }
      console.log(`PASS ${route} ${width}: ${copy.texts.length} text items / ${claims.length} claims`);
    }
    // Exercise the actual document navigation, then read the new page state.
    const next = kind === "resume" ? "career" : "resume";
    orca("eval", "--expression", `document.querySelector('nav[aria-label$="문서 전환"] a[href^="/${next}/"]').click()`);
    orca("wait", "--url", `/${next}/${slug}`);
    orca("snapshot");
    assert(evaluate("location.pathname").endsWith(`/${next}/${slug}`));
  }
}
orca("viewport", "--width", "1440", "--height", "900", "--scale", "1");
orca("goto", "--url", "http://localhost:4000/_map");
orca("snapshot");
writeFileSync(path.join(output, "browser-check.json"), JSON.stringify({page, records, result:"PASS"}, null, 2));
