import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("common routes consume independent app copy and the single document renderers", () => {
  const resume = readFileSync(new URL("../../app/resume/page.tsx", import.meta.url), "utf8");
  const career = readFileSync(new URL("../../app/career/page.tsx", import.meta.url), "utf8");
  const presentation = readFileSync(new URL("../common/presentation.ts", import.meta.url), "utf8");
  assert.match(resume, /import copy from "@\/content\/common\/resume.json"/);
  assert.match(resume, /presentation=\{commonResumePresentation\}/);
  assert.match(resume, /<ResumeDocument /);
  assert.match(career, /<CareerDocument \/>/);
  assert.doesNotMatch(resume + career + presentation, /readFile|parseResumeCopy|wiki\/|companies\/miridih/);
});

test("each document kind has one render path without view modes or company template exceptions", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const routes = ["../../app/resume/page.tsx", "../../app/resume/[company]/page.tsx", "../../app/career/[company]/page.tsx",
    "../../app/[company]/resume/page.tsx", "../../app/[company]/career/page.tsx", "../../app/_components/documents/company-document.tsx"].map(read).join("\n");
  assert.doesNotMatch(routes, /paged|TailoredResumeView|CareerDescriptionView|CvView|ComparisonDocument|template|layout=/);
  const renderers = ["../../app/_components/documents/resume/resume-document.tsx", "../../app/_components/documents/resume/resume-print-pages.tsx", "../../app/_components/documents/career/career-document.tsx", "../../app/_components/documents/cv/cv-document.tsx"].map(read).join("\n");
  assert.doesNotMatch(renderers, /gna-company|miridih|sagak|socar|ajungnetworks|featuring|data-template|"classic"|"editorial"/);
  const styles = ["../../app/_components/documents/resume/resume-document.module.css", "../../app/_components/documents/career/career.module.css"].map(read).join("\n");
  assert.doesNotMatch(styles, /data-template|data-paged\]|data-document-slug|data-company-slug/);
  // One print policy per kind: no per-company or per-revision print composition data (2026-09-29 main review).
  const presentation = read("../documents/companies/presentation.ts");
  assert.doesNotMatch(styles + renderers + presentation, /data-print-|DocumentPrint|keepProjectLead|breakBefore|keepEndTogether|avoidBreakInside|density/);
});

test("common copy excludes company review metadata and preserves the Maker identity", () => {
  for (const name of ["resume", "career-description"]) {
    const copy = JSON.parse(readFileSync(new URL(`../common/${name}.json`, import.meta.url), "utf8"));
    for (const key of ["applicationId", "companyName", "revision", "visibility", "approved"]) assert(!(key in copy));
    assert.equal(name === "resume" ? copy.role : copy.title, name === "resume" ? "Maker" : "김대정 · Maker");
  }
});

test("company documents have one representative URL per company and kind without version selection", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const representative = read("../../features/company-documents/policy.ts") + read("../../features/company-documents/types.ts");
  assert.match(representative, /Public-first/);
  assert.match(representative, /RESERVED_SEGMENTS/);
  const pages = ["../../app/[company]/resume/page.tsx", "../../app/[company]/career/page.tsx", "../../app/_components/documents/company-document.tsx"].map(read).join("\n");
  assert.doesNotMatch(pages, /revision=|searchParams\)?\.revision|LocalRevisionLinks|ApplicationVersionNav|gna-company/);
  for (const kind of ["resume", "career"]) {
    const former = read(`../../app/${kind}/[company]/page.tsx`);
    assert.match(former, /resolveCompanyRequest\(\s*company/);
    assert.match(former, /permanentRedirect\(resolved\.href/);
    assert(former.indexOf("notFound()") < former.lastIndexOf("permanentRedirect("));
  }
  for (const kind of ["resume", "career"]) {
    const page = read(`../../app/[company]/${kind}/page.tsx`);
    // Validate before any redirect; Location only from the validated representative.
    assert(page.indexOf("notFound()") < page.indexOf("permanentRedirect("));
    assert.match(page, /resolveCompanyRequest\(\s*company/);
    assert.match(page, /permanentRedirect\(resolved\.href/);
  }
  const companies = read("./companies/index.ts");
  assert.doesNotMatch(companies, /documentHref|listDocumentRevisions|hasExtraRevisions|publicRevisionFor/);
});

test("admin boundary: server-verified session, fail-closed settings, limit before password check, no client secrets", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const login = read("../../app/api/admin/login/route.ts");
  assert(login.indexOf("adminConfigured()") < login.indexOf("consumeLoginAttempt(") && login.indexOf("consumeLoginAttempt(") < login.indexOf("verifyPassword("));
  const limit = read("../../features/admin-auth/rate-limit.ts");
  assert.match(limit, /LOGIN_LIMIT = 5/);
  assert.match(limit, /LOGIN_WINDOW_SECONDS = 10 \* 60/);
  assert.match(limit, /reason: "unavailable"/);
  const proxy = read("../../proxy.ts");
  assert.match(proxy, /\/admin\/:path\*/);
  for (const page of ["../../app/admin/page.tsx", "../../app/admin/map/page.tsx"]) {
    const source = read(page);
    assert.match(source, /await requireAdmin\(\)/, page);
    assert.doesNotMatch(source, /NODE_ENV === "production"\) notFound/, page);
  }
  for (const loader of ["applications"]) {
    const source = read(`../../features/${loader}/load-${loader}.ts`);
    assert(source.indexOf("await requireAdmin()") < source.indexOf("return readPrivateData("));
    assert.match(source, /import "server-only"/);
  }
  const client = ["../../app/_components/site-footer.tsx", "../../features/admin-auth/apis.ts", "../../features/admin-auth/use-admin-session.ts", "../../features/admin-auth/use-admin-login.ts", "../../app/_components/admin/admin-trigger.tsx"].map(read).join("\n");
  assert.doesNotMatch(client, /ADMIN_PASSWORD_HASH|ADMIN_SESSION_SECRET|admin-auth\/session|process\.env/);
  assert.match(client, /WINDOW_MS = 1500/);
  assert.match(client, /ACTIVATIONS = 5/);
});

test("admin surfaces: dashboard shows company/posting/status only, data read privately behind the admin check", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const projections = read("../../features/applications/mapping.ts");
  assert.doesNotMatch(projections, /attempt\.(tracking|artifactState|snapshot|workSession|sourcePath|current)\b/);
  assert.match(projections, /return \{\s*id,\s*company,\s*role,\s*\.\.\.\(postingId/);
  const data = read("../../features/admin-data/source.ts");
  assert.match(data, /access: "private",\s*useCache: false/);
  assert.match(data, /import "server-only"/);
  const dashboard = read("../../app/admin/page.tsx");
  assert.doesNotMatch(dashboard, /tracking|artifact|revision|snapshot|workSession|href=\{`\/(resume|career|cv|portfolio)/);
  const redirects = read("../../lib/routes.ts");
  assert.match(redirects, /source: "\/applications",\s*destination: ROUTES.admin.dashboard/);
  const map = read("../../app/admin/map/page.tsx");
  assert.doesNotMatch(map, /\/portfolio|design-lab|href=[^\n]*\/applications|readFileSync|node:fs/);
  assert.match(map, /배포 비공개/);
});

test("admin projections: builders produce valid minimal data; malformed schema-1 copies are rejected; empty data is valid", async () => {
  const { buildApplicationsProjection, isApplicationsProjection } = await import("../../features/applications/mapping.ts");
  const built = buildApplicationsProjection({ attempts: [{ id: "a-1", company: "A", role: "Backend", status: "in-progress", tracking: "private note", artifactState: "frozen",
    snapshot: { id: "s" }, workSession: { state: "active" }, sourcePath: "wiki/x", postingId: "9", artifacts: { resume: { route: "/resume/a?revision=1" } } }] }, "2026-09-30T00:00:00.000Z");
  assert.deepEqual(built.attempts[0], { id: "a-1", company: "A", role: "Backend", postingId: "9", status: "in-progress", companies: ["a"] });
  assert(isApplicationsProjection(built));
  assert(isApplicationsProjection({ schema: 1, attempts: [] }), "valid empty");
  for (const bad of [{ schema: 1 }, { schema: 1, attempts: {} }, { schema: 1, attempts: [{ id: "x" }] }, { schema: 1, attempts: [{ id: "x", company: "A", role: "B", status: "weird", companies: [] }] }, { schema: 2, attempts: [] }, null, []]) {
    assert.equal(isApplicationsProjection(bad), false, JSON.stringify(bad));
  }
});

test("approved IA only: retired surfaces, launchers and menu entries are gone; compatibility routes stay", async () => {
  const { existsSync } = await import("node:fs");
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const at = (path) => existsSync(new URL(path, import.meta.url));
  for (const path of ["blog", "labs", "chat", "design", "view", "portfolio/role", "portfolio/design-lab", ...["featuring", "hypernova", "jyp", "jyp-v2", "mgrv", "miridih", "pinokiolab", "teamreboot", "toss-place", "whatssub"].map((slug) => `portfolio/${slug}`)]) {
    assert.equal(at(`../../app/${path}`), false, path);
  }
  assert.equal(at("../../components/site/ask-launcher.tsx"), false);
  assert.equal(at("../../components/site/review-launcher.tsx"), false);
  assert.match(read("../../app/portfolio/page.tsx"), /redirect\("\/career"\)/);
  assert.match(read("../../app/portfolio/[case]/page.tsx"), /CAREER_CASE_LINKS/);
  const nav = ["../../components/site/topbar.tsx", "../../components/site/mobile-nav.tsx", "../../components/site/footer-bar.tsx", "../../app/sitemap.ts", "../../app/robots.ts", "../../app/page.tsx"].map(read).join("\n");
  assert.doesNotMatch(nav, /\/blog|\/labs|\/chat|\/design|AskLauncher|ReviewLauncher/);
  const { PRIMARY_NAV } = await import("../../lib/routes.ts");
  assert.deepEqual(PRIMARY_NAV, [
    { label: "Home", href: "/" }, { label: "Resume", href: "/resume" },
    { label: "Career", href: "/career" }, { label: "CV", href: "/cv" },
  ]);
  assert(PRIMARY_NAV.every(({ href }) => !/blog|labs|chat|design|platforms/.test(href)));
});

test("platform comparison screen removed: no route, loader, menu link or redirect; applications admin stays", async () => {
  const { existsSync } = await import("node:fs");
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const at = (path) => existsSync(new URL(path, import.meta.url));
  for (const path of ["../../app/admin/platforms", "../../app/_platforms", "../../app/%5Fplatforms", "../../features/platforms"]) assert.equal(at(path), false, path);
  const { ROUTES, ADMIN_REDIRECTS } = await import("../../lib/routes.ts");
  assert.deepEqual(Object.keys(ROUTES.admin), ["dashboard", "map"]);
  assert(ADMIN_REDIRECTS.every((item) => !/platforms/i.test(`${item.source} ${item.destination}`)));
  const { ADMIN_DATA } = await import("../../features/admin-data/mapping.ts");
  assert.deepEqual(Object.keys(ADMIN_DATA), ["applications"]);
  const links = ["../../app/_components/site-topbar.tsx", "../../app/admin/page.tsx", "../../app/admin/map/page.tsx"].map(read).join("\n");
  assert.doesNotMatch(links, /platforms|플랫폼/);
  assert.match(links, /ROUTES\.admin\.dashboard/);
  assert.match(links, /ROUTES\.admin\.map/);
});


test("career output preserves section anchors, claims and section-only case grouping", async () => {
  const { default: Module, createRequire } = await import("node:module");
  const { fileURLToPath } = await import("node:url");
  const require = createRequire(import.meta.url);
  const ts = require("typescript"), React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const load = (url) => {
    const filename = fileURLToPath(url);
    const loaded = new Module(filename);
    loaded.filename = filename;
    loaded.paths = Module._nodeModulePaths(new URL(".", url).pathname);
    const normalRequire = loaded.require.bind(loaded);
    loaded.require = (name) => {
      if (name.endsWith(".module.css")) return { default: new Proxy({}, { get: (_, key) => key }) };
      if (name === "../document-shell") return { DocumentShell: ({ children }) => children };
      if (name === "../document-frame") return { DocumentFrame: (props) => React.createElement("main", props) };
      if (name === "./figures") return { CareerFigure: ({ id, claims }) => React.createElement("figure", { "data-figure": id, "data-claim": claims.join(" ") }) };
      if (name === "./flow-diagram") return { FlowDiagram: () => null };
      if (name === "../inline") return load(new URL("../inline.tsx", url));
      if (name.endsWith("career-links")) return load(new URL(name + ".ts", url));
      return normalRequire(name);
    };
    loaded._compile(ts.transpileModule(readFileSync(url, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }, fileName: filename,
    }).outputText, filename);
    return loaded.exports;
  };
  const { CareerDocument } = load(new URL("../../app/_components/documents/career/career-document.tsx", import.meta.url));
  const paragraph = (text, presentation) => ({ kind: "paragraph", text, claims: ["fixture.claim"], ...(presentation ? { presentation } : {}) });
  const document = { title: "Fixture", header: [paragraph("Intro label", "label"), paragraph("Intro body")], sections: [
    { title: "Company · 2020.01", level: 2, blocks: [], children: [
      { title: "Project", anchor: "project", level: 3, blocks: [paragraph("Case label", "label"), paragraph("Case body"),
        { kind: "figure", id: "fixture", claims: ["fixture.figure"] }, paragraph("Next label", "label"), paragraph("Next body")], children: [] },
    ] },
    { title: "Other", level: 2, blocks: [paragraph("Closing")], children: [] },
  ] };
  const html = renderToStaticMarkup(React.createElement(CareerDocument, { document }));
  assert.match(html, /data-common-document="career" data-document-layout="a4-sheet" data-document-slug="common" data-professional-document="career-description"/);
  assert.match(html, /href="#project"/); assert.match(html, /id="project"/);
  assert.match(html, /href="#career-2"/); assert.match(html, /id="career-2"/);
  assert.equal((html.match(/class="caseGroup"/g) ?? []).length, 2);
  assert.match(html, /class="introduction"><p data-copy="true" data-claim="fixture.claim" class="caseLabel">Intro label/);
  assert.match(html, /class="caseGroup"><p[^>]*>Case label<\/p><p[^>]*>Case body<\/p><\/div><figure data-figure="fixture" data-claim="fixture.figure"/);
  assert.match(html, /data-dated=""/);
});
