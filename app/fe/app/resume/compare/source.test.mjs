import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseResumeCopy } from "./source.ts";

const markdown = readFileSync(new URL("../../../../../wiki/products/resume/revisions/2026-09-08-achievement-refresh/resume.md", import.meta.url), "utf8");

test("the comparison consumes current app copy, not the historical review snapshot", () => {
  const page = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
  assert.match(page, /import copy from "@\/content\/common\/resume.json"/);
  assert.doesNotMatch(page, /readFile|parseResumeCopy|wiki\//);
  assert.match(page, /copy as ResumeCopy/);
});

test("the preview preserves every source paragraph, list item, heading and skill, in order", () => {
  const copy = parseResumeCopy(markdown);
  const actual = copy.sections.flatMap((section) => [section.title, ...section.entries.flatMap((entry) => [
    ...(entry.title ? [entry.title] : []), ...entry.blocks.map((block) => block.label ? `${block.label} ${block.text}` : block.text),
  ])]);
  const expected = markdown.slice(markdown.indexOf("## 소개")).split("\n")
    .map((line) => line.trim()).filter((line) => line && !line.startsWith("<!--") && !/^\| (분야|---)/.test(line))
    .map((line) => line.startsWith("|") ? line.split("|").slice(1, -1).map((cell) => cell.trim()).join(" ") : line.replace(/^(?:#{2,3} |- )/, ""));
  assert.deepEqual(actual, expected);
  assert.equal(copy.name, "김대정");
  assert.equal(copy.role, "Tech Lead · Backend Engineer");
  assert.equal(copy.contacts.length, 3);
});

test("claim coverage is preserved and internal comments are not visible copy", () => {
  const copy = parseResumeCopy(markdown);
  const blocks = copy.sections.flatMap((section) => section.entries.flatMap((entry) => entry.blocks));
  const sourceClaims = new Set([...markdown.matchAll(/<!-- claims: (.*?) -->/g)].flatMap((match) => match[1].split(/\s+/)));
  assert.deepEqual(new Set(blocks.flatMap((block) => block.claims)), sourceClaims);
  assert.equal(JSON.stringify(copy.sections.map((section) => section.entries.map((entry) => entry.blocks.map((block) => block.text)))).includes("<!--"), false);
});

test("unsupported syntax and unsafe links fail closed", () => {
  assert.throws(() => parseResumeCopy(markdown.replace("https://github.com/Dae-Jeong", "javascript:alert")), /Unsafe/);
  assert.throws(() => parseResumeCopy(markdown.replace("## 기술", "## Changed")), /section contract/);
  assert.throws(() => parseResumeCopy(`${markdown}\n<script>bad</script>`), /unsupported/);
});
