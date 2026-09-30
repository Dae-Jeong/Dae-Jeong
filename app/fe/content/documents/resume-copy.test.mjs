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
  assert.match(career, /<CareerDocument kind="career"/);
  assert.doesNotMatch(resume + career + presentation, /readFile|parseResumeCopy|wiki\/|companies\/miridih/);
});

test("each document kind has one render path without view modes or company template exceptions", () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
  const routes = ["../../app/resume/page.tsx", "../../app/resume/[company]/page.tsx", "../../app/career/[company]/page.tsx", "../../app/cv/[company]/page.tsx",
    "../../app/[company]/resume/page.tsx", "../../app/[company]/career/page.tsx", "../../app/[company]/cv/page.tsx", "../../app/_components/documents/company-document.tsx"].map(read).join("\n");
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
  const pages = ["../../app/[company]/resume/page.tsx", "../../app/[company]/career/page.tsx", "../../app/[company]/cv/page.tsx", "../../app/_components/documents/company-document.tsx"].map(read).join("\n");
  assert.doesNotMatch(pages, /revision=|searchParams\)?\.revision|LocalRevisionLinks|ApplicationVersionNav|gna-company/);
  for (const kind of ["resume", "career", "cv"]) {
    const former = read(`../../app/${kind}/[company]/page.tsx`);
    assert.match(former, /resolveCompanyRequest\(\s*company/);
    assert.match(former, /permanentRedirect\(resolved\.href/);
    assert(former.indexOf("notFound()") < former.lastIndexOf("permanentRedirect("));
  }
  for (const kind of ["resume", "career", "cv"]) {
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
  for (const href of ["ROUTES.resume", "ROUTES.career", "ROUTES.cv"]) assert(read("../../components/site/topbar.tsx").includes(`href: ${href}`), href);
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
  const links = ["../../app/_components/admin/admin-menu.tsx", "../../app/admin/page.tsx", "../../app/admin/map/page.tsx"].map(read).join("\n");
  assert.doesNotMatch(links, /platforms|플랫폼/);
  assert.match(links, /ROUTES\.admin\.dashboard/);
  assert.match(links, /ROUTES\.admin\.map/);
});
