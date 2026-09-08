import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseReview } from "./parse-review.ts";

test("the import adapter preserves hierarchy, claims, bullets, and complete table cells", () => {
  const data = parseReview("# CV\n\nName\n\n## Career\n\n### Employer\n\n<!-- claims: a.b c.d -->\n- **Role**: work\n\n| State | Rule |\n| --- | --- |\n| A | B |\n\n#### Detail\n\nDone");
  assert.equal(data.header[0].text, "Name");
  assert.deepEqual(data.sections[0].children[0].blocks, [
    { kind: "bullet", text: "**Role**: work", claims: ["a.b", "c.d"] },
    { kind: "table", columns: ["State", "Rule"], rows: [["A", "B"]], claims: ["a.b", "c.d"] },
  ]);
  assert.deepEqual(data.sections[0].children[0].children[0].blocks[0].claims, []);
});

test("unsupported HTML and malformed tables fail instead of disappearing", () => {
  assert.throws(() => parseReview("# CV\n## Test\n<script>alert(1)</script>"));
  assert.throws(() => parseReview("# CV\n## Test\n| A | B |\n| --- | --- |\n| one |"));
});

test("all four app-owned copies have the expected shape and no private import metadata", () => {
  for (const name of ["resume", "career-description", "portfolio", "cv"]) {
    const data = JSON.parse(readFileSync(new URL(`./${name}.json`, import.meta.url), "utf8"));
    assert(data.sections.length >= 3, name);
    const source = JSON.stringify(data);
    assert(!source.includes("/Users/") && !source.includes("<!--") && !source.includes("canonical_claims"), name);
    function inspect(value) {
      if (Array.isArray(value)) { value.forEach(inspect); return; }
      if (!value || typeof value !== "object") return;
      if (value.kind) {
        assert(["paragraph", "bullet", "skill", "table"].includes(value.kind), name);
        assert(Array.isArray(value.claims), name);
        if (value.kind === "table") value.rows.forEach((row) => assert.equal(row.length, value.columns.length));
        else assert.equal(typeof value.text, "string");
      }
      Object.values(value).forEach(inspect);
    }
    inspect(data);
  }
});

test("the common CV is English, Jake-based, and keeps dated employment separate from projects", () => {
  const data = JSON.parse(readFileSync(new URL("./cv.json", import.meta.url), "utf8"));
  assert.equal(data.language, "en");
  assert.equal(data.template, "jake");
  assert(!/[\uac00-\ud7a3]/u.test(JSON.stringify(data)));
  assert.equal(data.sections[0].title, "Experience");
  assert.equal(data.sections[0].children.length, 5);
  const projects = data.sections.find((section) => section.title === "Projects");
  assert(projects.children.some((entry) => entry.title === "TellingMe"));
  const military = data.sections.filter((section) => section.title === "Military Service");
  assert.equal(military.length, 1);
  assert.equal(military[0].children.length, 1);
  const service = military[0].children[0];
  assert.equal(service.title, "Republic of Korea Army · III Corps");
  assert.equal(service.period, "Aug 2017 - May 2019");
  assert.deepEqual(service.blocks.map((block) => block.text), ["Signals | Sergeant (rank at discharge)", "Completed full-term military service."]);
  assert(service.blocks.every((block) => block.claims.includes("career.military-service")));
  const employment = data.sections[0];
  assert(!JSON.stringify(employment).includes("career.military-service"));
  for (const section of data.sections) for (const entry of section.children) {
    assert(entry.period, `${entry.title}: missing chronology`);
    assert.equal(entry.blocks[0].kind, "paragraph");
  }
  function inspect(value) {
    if (Array.isArray(value)) { value.forEach(inspect); return; }
    if (!value || typeof value !== "object") return;
    if (value.kind) assert.notEqual(value.kind, "table", "Jake expects paragraph and bullet records");
    Object.values(value).forEach(inspect);
  }
  inspect(data);
});
