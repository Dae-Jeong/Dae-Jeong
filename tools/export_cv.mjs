// Generate the Jake-based LaTeX CV from the same app-owned copy as /cv.
// Run explicitly: node tools/export_cv.mjs [output-directory]
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = readFileSync(join(root, "app/fe/content/common/cv.json"), "utf8");
const cv = JSON.parse(source);
assert.equal(cv.language, "en");
assert.equal(cv.template, "jake");
assert(!/[\uac00-\ud7a3]/u.test(source), "English CV contains Korean text");
const output = resolve(process.argv[2] || join(root, "output/pdf/common-cv-jake"));
mkdirSync(output, { recursive: true });

const escapes = { "\\": "\\textbackslash{}", "&": "\\&", "%": "\\%", "$": "\\$", "#": "\\#", "_": "\\_", "{": "\\{", "}": "\\}", "~": "\\textasciitilde{}", "^": "\\textasciicircum{}" };
const escape = (text) => text.replace(/[\\&%$#_{}~^]/g, (char) => escapes[char]);
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https:\/\/|mailto:)[^)]+\))/g).map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) return `\\textbf{${escape(part.slice(2, -2))}}`;
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+|mailto:[^)]+)\)$/);
    return link ? `\\href{${escape(link[2])}}{\\underline{${escape(link[1])}}}` : escape(part);
  }).join("");
}
function blocks(items) {
  const lines = [];
  let inList = false;
  for (const block of items) {
    assert(["paragraph", "bullet"].includes(block.kind), "Jake CV accepts text records only");
    if (block.kind === "bullet" && !inList) { lines.push("\\resumeItemListStart"); inList = true; }
    if (block.kind !== "bullet" && inList) { lines.push("\\resumeItemListEnd"); inList = false; }
    lines.push(block.kind === "bullet" ? `\\resumeItem{${inline(block.text)}}` : `{\\small ${inline(block.text)}}\\par`);
  }
  if (inList) lines.push("\\resumeItemListEnd");
  return lines.join("\n");
}
function section(item) {
  if (item.level === 2) return `\\section{${escape(item.title)}}\n${blocks(item.blocks)}\n${item.children.map(section).join("\n")}`;
  assert.equal(item.level, 3);
  assert.equal(item.blocks[0]?.kind, "paragraph", `${item.title}: expected role or qualification first`);
  return `\\resumeSubheading{${escape(item.title)}}{${escape(item.period || "")}}{${inline(item.blocks[0].text)}}\n${blocks(item.blocks.slice(1))}\n${item.children.map(section).join("\n")}`;
}
const replacements = {
  TITLE: escape(cv.title), ROLE: inline(cv.header[0].text),
  CONTACTS: inline(cv.header[1].text), INTRO: inline(cv.header[2].text),
  BODY: cv.sections.map(section).join("\n"),
};
const template = readFileSync(join(root, "tools/templates/jake-cv/template.tex"), "utf8");
const tex = template.replace(/@@([A-Z]+)@@/g, (_, key) => { assert(key in replacements, key); return replacements[key]; });
const file = join(output, "Daejeong-Kim-CV.tex");
writeFileSync(file, tex);
writeFileSync(join(output, "LICENSE"), readFileSync(join(root, "tools/templates/jake-cv/LICENSE")));
execFileSync("tectonic", ["--untrusted", "--keep-logs", "--outdir", output, file], { stdio: "inherit" });
console.log(join(output, "Daejeong-Kim-CV.pdf"));
