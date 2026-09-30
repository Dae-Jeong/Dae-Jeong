// Application Copy Standard §4 gate 21: blank metadata must not reserve a column (single resume renderer row).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

function loadTs(relativePath) {
  const filename = path.resolve(scriptDir, "..", relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    fileName: filename,
  }).outputText;
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const normalRequire = loaded.require.bind(loaded);
  loaded.require = (name) => name === "../inline" ? loadTs("app/_components/documents/inline.tsx") : normalRequire(name);
  loaded._compile(compiled, filename);
  return loaded.exports;
}

const { ResumeRow } = loadTs("app/_components/documents/resume/resume-row.tsx");
const classes = { row: "row", rowLabel: "rowLabel", rowText: "rowText", rowMeta: "rowMeta" };
const render = (props) => renderToStaticMarkup(React.createElement(ResumeRow, { text: "credential", classes, ...props }));
const spans = (html) => (html.match(/<span class="row(Label|Text|Meta)"/g) ?? []).map((item) => item.slice(13, -1));

for (const label of ["", "   ", undefined, null, false]) {
  test(`empty label ${JSON.stringify(label)} renders no label element or column`, () => {
    const html = render({ label });
    assert.match(html, /data-row-columns="text"/);
    assert.deepEqual(spans(html), ["rowText"]);
    assert.match(html, /credential/);
  });
}

test("dated rows preserve label, body and period", () => {
  const html = render({ label: "학력", meta: "2021.09" });
  assert.match(html, /data-row-columns="label-text-meta"/);
  assert.deepEqual(spans(html), ["rowLabel", "rowText", "rowMeta"]);
  assert.match(html, />2021.09<\/span>/);
});

test("a blank label with a period has two columns, not three", () => {
  const html = render({ label: "", meta: "2021" });
  assert.match(html, /data-row-columns="text-meta"/);
  assert.deepEqual(spans(html), ["rowText", "rowMeta"]);
});

test("React element labels and numeric zero remain visible", () => {
  assert.match(render({ label: React.createElement("strong", null, "Label") }), /<strong>Label<\/strong>/);
  assert.match(render({ label: 0 }), />0<\/span>/);
});
