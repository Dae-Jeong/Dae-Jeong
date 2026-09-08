// One-time, explicit promotion adapter. Emits a patch; never writes or updates copy silently.
// Run from the repo root: node --experimental-strip-types tools/export_common_review.mjs
import { readFileSync } from "node:fs";
import { parseReview } from "../app/fe/content/common/parse-review.ts";
import { parseResumeCopy } from "../app/fe/app/resume/compare/source.ts";

const directory = "wiki/products/resume/revisions/2026-09-08-achievement-refresh";
const files = ["resume", "career-description", "portfolio", "cv"];
console.log("*** Begin Patch");
for (const name of files) {
  const source = readFileSync(`${directory}/${name}.md`, "utf8");
  const copy = name === "resume" ? parseResumeCopy(source) : parseReview(source);
  console.log(`*** Add File: app/fe/content/common/${name}.json`);
  console.log(JSON.stringify(copy, null, 2).split("\n").map((line) => `+${line}`).join("\n"));
}
console.log("*** End Patch");
