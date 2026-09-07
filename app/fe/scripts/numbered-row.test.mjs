// Application Copy Standard §4 gate 21: blank metadata must not reserve a column.
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
  loaded.require = (name) => name === "@/lib/cn" ? loadTs("lib/cn.ts") : normalRequire(name);
  loaded._compile(compiled, filename);
  return loaded.exports;
}

const { NumberedRow } = loadTs("components/ui/numbered-row.tsx");
const render = (props) => renderToStaticMarkup(React.createElement(NumberedRow, props, "credential"));

for (const label of ["", "   ", undefined, null, false]) {
  test(`empty label ${JSON.stringify(label)} renders one column and no placeholder`, () => {
    const html = render({ label, labelWidth: "lg" });
    assert.match(html, /grid-cols-1/);
    assert.doesNotMatch(html, /150px|font-mono/);
    assert.equal((html.match(/<span\b/g) ?? []).length, 1);
    assert.match(html, />credential<\/span>/);
  });
}

test("dated rows preserve label, metadata width, and body", () => {
  const html = render({ label: "2021.09", labelWidth: "lg" });
  assert.match(html, /grid-cols-\[150px_1fr\]/);
  assert.match(html, />2021.09<\/span>/);
  assert.equal((html.match(/<span\b/g) ?? []).length, 2);
});

test("a blank label with trailing content has two columns, not three", () => {
  const html = render({ label: "", labelWidth: "lg", trailing: "2021" });
  assert.match(html, /grid-cols-\[minmax\(0,1fr\)_auto\]/);
  assert.equal((html.match(/<span\b/g) ?? []).length, 2);
});

test("React element labels and numeric zero remain visible", () => {
  assert.match(render({ label: React.createElement("strong", null, "Label") }), /<strong>Label<\/strong>/);
  assert.match(render({ label: 0 }), />0<\/span>/);
});
