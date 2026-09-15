import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseReview } from "../documents/parse-markdown.ts";

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
        assert(["paragraph", "bullet", "skill", "row", "table", "image"].includes(value.kind), name);
        assert(Array.isArray(value.claims), name);
        if (value.kind === "table") value.rows.forEach((row) => assert.equal(row.length, value.columns.length));
        else if (value.kind === "image") {
          assert.equal(name, "career-description");
          assert.match(value.src, /^\/portfolio\/[a-z0-9-]+\.png$/);
          assert(value.alt && value.title && value.caption && value.width > 0 && value.height > 0);
          assert(readFileSync(new URL(`../../public${value.src}`, import.meta.url)).length > 0);
        } else assert.equal(typeof value.text, "string");
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
  const headings = data.sections.map((section) => section.title);
  assert.equal(headings.indexOf("Military Service") + 1, headings.indexOf("Education"));
  assert.equal(military[0].children.length, 1);
  const service = military[0].children[0];
  assert.equal(service.title, "Republic of Korea Army · III Corps");
  assert.equal(service.period, "Aug 2017 - May 2019");
  assert.deepEqual(service.blocks.map((block) => block.text), [
    "Radio Communications Operator | Discharged as Sergeant",
    "Set up, operated, and maintained military radio communications infrastructure. Assigned wartime duties included antenna installation and communications-node operation to establish and sustain military communications networks.",
    "Completed full-term military service.",
  ]);
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

test("the common resume and CV retain concrete STUDIO LAB PM contributions", () => {
  for (const name of ["resume", "cv"]) {
    const data = JSON.parse(readFileSync(new URL(`./${name}.json`, import.meta.url), "utf8"));
    const entries = [];
    function findStudioLab(value) {
      if (Array.isArray(value)) { value.forEach(findStudioLab); return; }
      if (!value || typeof value !== "object") return;
      if (value.title?.startsWith("STUDIO LAB")) entries.push(value);
      else Object.values(value).forEach(findStudioLab);
    }
    findStudioLab(data);
    assert.equal(entries.length, 1, `${name}: one STUDIO LAB employment entry`);
    const blocks = entries[0].blocks;
    const claims = new Set(blocks.flatMap((block) => block.claims));
    for (const claim of ["career.sellercanvas-product-system", "career.sellercanvas-enterprise-poc", "credentials.page-output-patent"]) {
      assert(claims.has(claim), `${name}: missing STUDIO LAB contribution ${claim}`);
    }
    const product = blocks.find((block) => block.claims.includes("career.sellercanvas-product-system") && /v1\.0|정식 버전|제품 요구·우선순위/.test(block.text));
    const poc = blocks.find((block) => block.claims.includes("career.sellercanvas-enterprise-poc") && block.kind === "bullet");
    const patent = blocks.find((block) => block.claims.includes("credentials.page-output-patent"));
    assert(product && poc && patent);
    assert.notEqual(product, poc, `${name}: PoC work should not collapse into the productization summary`);
    assert.notEqual(poc, patent, `${name}: workflow and patent contribution stays distinct`);
    assert.match(poc.text, /기술 스펙|기술 명세|기능·기술 검증 항목|technical specifications/);
    assert.match(poc.text, /기술 검증|technical validation/);
    assert.match(patent.text, /제작 흐름|배치 알고리즘 설계|creation workflow/);
    assert(!claims.has("career.sellercanvas-nestjs-template"), "Do not fill space with an unapproved backend claim");
  }
});

test("Jake attribution stays in the source and license, outside the CV presentation", () => {
  const view = readFileSync(new URL("../../app/cv/jake-cv.tsx", import.meta.url), "utf8");
  const license = readFileSync(new URL("../../../../tools/templates/jake-cv/LICENSE", import.meta.url), "utf8");
  assert(!view.includes("Layout adapted from") && !view.includes("styles.templateNote"));
  assert(view.includes("tools/templates/jake-cv/"));
  assert(license.includes("Copyright (c) 2020 Jake Gutierrez"));
  assert(license.includes("Permission is hereby granted"));
});
