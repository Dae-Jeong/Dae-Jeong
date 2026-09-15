import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("common routes consume independent app copy and the approved layouts", () => {
  const resume = readFileSync(new URL("../../app/resume/page.tsx", import.meta.url), "utf8");
  const career = readFileSync(new URL("../../app/career/page.tsx", import.meta.url), "utf8");
  const presentation = readFileSync(new URL("../common/presentation.ts", import.meta.url), "utf8");
  assert.match(resume, /import copy from "@\/content\/common\/resume.json"/);
  assert.match(resume, /presentation=\{commonResumePresentation\}/);
  assert.match(resume, /<PagedResume/);
  assert.match(career, /layout="a4-sheet"/);
  assert.doesNotMatch(resume + career + presentation, /readFile|parseResumeCopy|wiki\/|companies\/miridih/);
});

test("common copy excludes company review metadata and preserves the Maker identity", () => {
  for (const name of ["resume", "career-description"]) {
    const copy = JSON.parse(readFileSync(new URL(`../common/${name}.json`, import.meta.url), "utf8"));
    for (const key of ["applicationId", "companyName", "revision", "visibility", "approved"]) assert(!(key in copy));
    assert.equal(name === "resume" ? copy.role : copy.title, name === "resume" ? "Maker" : "김대정 · Maker");
  }
});
