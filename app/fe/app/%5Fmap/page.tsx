import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listCareerDescriptions, listCvs } from "@/content/documents";
import { listRolePortfolios } from "@/content/portfolios";
import { listTailoredResumes } from "@/content/resumes";
import { ROLE_VARIANT_SLUGS } from "@/content/role-catalog";
import { companyDocuments, documentHref } from "@/content/documents/companies";

// 로컬 전용 지도. 회사 한 줄에 포폴 · 이력서 · CV · 경력기술서.
// 회사 목록은 요청마다 app/ 폴더와 content 레지스트리에서 합쳐 만들므로 손으로 갱신하지 않는다.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "_map",
  robots: { index: false, follow: false },
};

const APP_DIR = path.join(process.cwd(), "app");
const COLUMNS = ["portfolio", "resume", "cv", "career"] as const;
type Column = (typeof COLUMNS)[number];
const COLUMN_LABEL: Record<Column, string> = {
  portfolio: "포폴",
  resume: "이력서",
  cv: "CV",
  career: "경력기술서",
};

type Cell = { href: string; note?: string };
type Row = { key: string; name: string; cells: Partial<Record<Column, Cell>>; status?: string };

// tools/build_application_projection.py 가 만드는 projection. 없으면 상태 열은 비운다.
const PROJECTION = path.join(process.cwd(), "..", "..", "output", "application-workspace", "application-attempts.json");
const STATUS_LABEL: Record<string, string> = {
  "in-progress": "진행 중",
  "pre-apply": "지원 예정",
  rejected: "탈락",
};
const STATUS_ORDER = ["in-progress", "pre-apply"];

// route → status, 그리고 route 가 없는 예전 항목을 위한 attempt id prefix → status
function loadStatus(): { byRoute: Map<string, string>; byIdPrefix: { id: string; status: string }[] } {
  const byRoute = new Map<string, string>();
  const byIdPrefix: { id: string; status: string }[] = [];
  if (!fs.existsSync(PROJECTION)) return { byRoute, byIdPrefix };
  try {
    const data = JSON.parse(fs.readFileSync(PROJECTION, "utf8")) as {
      attempts?: { id?: string; status?: string; artifacts?: Record<string, { route?: string }> }[];
    };
    for (const attempt of data.attempts ?? []) {
      if (!attempt.status) continue;
      if (attempt.id) byIdPrefix.push({ id: attempt.id, status: attempt.status });
      for (const artifact of Object.values(attempt.artifacts ?? {})) {
        if (artifact?.route) byRoute.set(artifact.route, attempt.status);
      }
    }
  } catch {
    // projection 이 깨져 있으면 상태 없이 렌더
  }
  return { byRoute, byIdPrefix };
}

function hasPage(...segments: string[]) {
  return fs.existsSync(path.join(APP_DIR, ...segments, "page.tsx"));
}

// app/<section>/<slug>/page.tsx 로 고정 페이지가 있는 slug 목록 (동적 세그먼트·특수 폴더 제외)
function staticSlugs(section: string) {
  const dir = path.join(APP_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !/^[\[(_@]/.test(d.name) && d.name !== "role" && d.name !== "design-lab")
    .filter((d) => hasPage(section, d.name))
    .map((d) => d.name);
}

function buildCompanyRows(): Row[] {
  const roleSet = new Set<string>(ROLE_VARIANT_SLUGS);
  const resumes = listTailoredResumes().filter((r) => !roleSet.has(r.slug));
  const careers = listCareerDescriptions().filter((d) => d.slug !== "common");
  const cvs = listCvs().filter((d) => d.slug !== "common");
  const portfolioPages = staticSlugs("portfolio");
  const resumePages = staticSlugs("resume");

  const rows = new Map<string, Row>();
  const row = (key: string, name?: string) => {
    if (!rows.has(key)) rows.set(key, { key, name: name ?? key, cells: {} });
    const r = rows.get(key)!;
    if (name && r.name === key) r.name = name;
    return r;
  };

  for (const r of resumes) row(r.slug, r.label).cells.resume = { href: `/resume/${r.slug}`, note: r.visibility };
  for (const s of resumePages) row(s).cells.resume ??= { href: `/resume/${s}`, note: "static" };
  for (const s of portfolioPages) row(s).cells.portfolio = { href: `/portfolio/${s}` };
  for (const d of careers) row(d.slug).cells.career = { href: `/career/${d.slug}`, note: d.visibility };
  for (const d of cvs) row(d.slug).cells.cv = { href: `/cv/${d.slug}`, note: d.visibility };

  const { byRoute, byIdPrefix } = loadStatus();
  for (const document of companyDocuments) {
    const draft = row(`${document.slug}-${document.revision}`, `${document.companyName} · ${document.revision}`);
    draft.cells[document.document] = { href: documentHref(document), note: "draft · local · 승인 전" };
    draft.status = "pre-apply";
  }
  for (const r of rows.values()) {
    r.status =
      Object.values(r.cells)
        .map((c) => byRoute.get(c.href))
        .find(Boolean) ?? byIdPrefix.find((a) => a.id.startsWith(`${r.key}-`))?.status ?? r.status;
  }
  const rank = (r: Row) => {
    const i = STATUS_ORDER.indexOf(r.status ?? "");
    return i === -1 ? STATUS_ORDER.length : i;
  };
  return [...rows.values()].sort((a, b) => rank(a) - rank(b) || a.key.localeCompare(b.key));
}

function buildRoleRows(): Row[] {
  const resumes = new Map(listTailoredResumes().map((r) => [r.slug, r]));
  const portfolios = new Map(listRolePortfolios().map((p) => [p.slug, p]));
  return ROLE_VARIANT_SLUGS.map((slug) => {
    const cells: Row["cells"] = {};
    if (portfolios.has(slug)) cells.portfolio = { href: `/portfolio/role/${slug}` };
    if (resumes.has(slug)) cells.resume = { href: `/resume/${slug}`, note: resumes.get(slug)!.visibility };
    return { key: slug, name: portfolios.get(slug)?.label ?? resumes.get(slug)?.label ?? slug, cells };
  });
}

function buildCommonRow(): Row {
  return {
    key: "common",
    name: "공통",
    cells: {
      portfolio: { href: "/portfolio" },
      resume: { href: "/resume" },
      cv: { href: "/cv" },
      career: { href: "/career" },
    },
  };
}

function designLabAnchors() {
  const file = path.join(APP_DIR, "portfolio", "design-lab", "page.tsx");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf8");
  return [...new Set([...src.matchAll(/id="([a-z0-9-]+)"/g)].map((m) => m[1]))];
}

function Table({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section className="min-w-0">
      <h2 className="m-0 mb-2 font-mono text-xs uppercase tracking-wide text-muted">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="py-2 pr-4 font-medium">회사</th>
              <th className="py-2 pr-4 font-medium">상태</th>
              {COLUMNS.map((c) => (
                <th key={c} className="py-2 pr-4 font-medium">
                  {COLUMN_LABEL[c]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-border/60 align-top">
                <td className="py-2 pr-4">
                  <div className="font-mono text-xs text-muted">{r.key}</div>
                  <div>{r.name}</div>
                </td>
                <td className="py-2 pr-4 whitespace-nowrap text-xs">
                  {r.status ? (
                    <span className={STATUS_ORDER.includes(r.status) ? "font-medium" : "text-muted"}>
                      {STATUS_LABEL[r.status] ?? r.status}
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                {COLUMNS.map((c) => {
                  const cell = r.cells[c];
                  return (
                    <td key={c} className="py-2 pr-4 whitespace-nowrap">
                      {cell ? (
                        <>
                          <Link href={cell.href} className="font-mono text-xs underline underline-offset-4">
                            {cell.href.split("?")[0]}
                          </Link>
                          {cell.note ? <span className="ml-2 text-xs text-muted">{cell.note}</span> : null}
                        </>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function MapPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const companies = buildCompanyRows();
  const roles = buildRoleRows();
  const anchors = designLabAnchors();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-8 border-b border-border pb-4">
        <h1 className="m-0 text-xl font-semibold">_map</h1>
        <p className="m-0 mt-1 text-sm text-muted">
          로컬 전용 · app/ 폴더와 content 레지스트리에서 요청마다 생성 · 회사 {companies.length} · role {roles.length}
        </p>
      </header>
      <div className="grid gap-10">
        <Table title="회사별" rows={[buildCommonRow(), ...companies]} />
        <Table title="Role variants" rows={roles} />
        <section>
          <h2 className="m-0 mb-2 font-mono text-xs uppercase tracking-wide text-muted">
            design-lab · 도식 {anchors.length}
          </h2>
          <p className="m-0 mb-2 text-sm">
            <Link href="/portfolio/design-lab" className="font-mono text-xs underline underline-offset-4">
              /portfolio/design-lab
            </Link>
            <span className="mx-3 text-muted">·</span>
            <Link href="/applications" className="font-mono text-xs underline underline-offset-4">
              /applications
            </Link>
            <span className="mx-3 text-muted">·</span>
            <Link href="/_platforms" className="font-mono text-xs underline underline-offset-4">
              /_platforms
            </Link>
          </p>
          <ul className="m-0 flex flex-wrap gap-x-4 gap-y-1 p-0">
            {anchors.map((id) => (
              <li key={id} className="list-none">
                <Link href={`/portfolio/design-lab#${id}`} className="font-mono text-xs underline underline-offset-4">
                  #{id}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
