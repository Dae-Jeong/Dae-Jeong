import { ROUTES } from "@/lib/routes";
import { STATUS_LABEL } from "@/features/applications/status";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/_components/site-footer";
import { loadApplications } from "@/features/applications/load-applications";
import { requireAdmin } from "@/features/admin-auth/guard";
import { companyDocumentHref } from "@/features/company-documents/urls";
import { listRepresentativeEntries } from "@/features/company-documents/policy";
import { type CompanyKind } from "@/features/company-documents/types";

// 관리자 문서 지도. 회사 한 줄에 대표 이력서 · 경력기술서 · CV. 대표 선정은 features/company-documents/policy.ts가 소유한다.
// 현재 환경에서 열 수 없는 초안은 링크 없이 표시하고, 폐기된 포트폴리오·역할·디자인 화면으로는 연결하지 않는다.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "_map",
  robots: { index: false, follow: false },
};

const COLUMNS: { kind: CompanyKind; label: string }[] = [
  { kind: "resume", label: "이력서" },
  { kind: "career", label: "경력기술서" },
  { kind: "cv", label: "CV" },
];
const STATUS_ORDER = ["in-progress", "pre-apply"];

type Cell = { href?: string; label: string; note: string };
type Row = {
  key: string;
  name: string;
  status?: string;
  cells: Partial<Record<CompanyKind, Cell>>;
};

async function buildRows(): Promise<{ rows: Row[]; statusSource: string }> {
  const rows = new Map<string, Row>();
  for (const { document, viewable } of listRepresentativeEntries()) {
    const row = rows.get(document.company) ?? {
      key: document.company,
      name: document.companyName,
      cells: {},
    };
    const href = companyDocumentHref(document.company, document.kind);
    row.cells[document.kind] = viewable
      ? {
          href,
          label: href,
          note: document.public ? "public" : "draft · local",
        }
      : { label: "초안", note: "배포 비공개 · 승인 전" };
    rows.set(document.company, row);
  }
  const applications = await loadApplications();
  if (applications.kind === "ready") {
    for (const row of rows.values()) {
      const attempt =
        applications.data.attempts.find((item) =>
          item.companies.includes(row.key),
        ) ??
        applications.data.attempts.find((item) =>
          item.id.startsWith(`${row.key}-`),
        );
      if (attempt) row.status = attempt.status;
    }
  }
  const rank = (row: Row) => {
    const index = STATUS_ORDER.indexOf(row.status ?? "");
    return index === -1 ? STATUS_ORDER.length : index;
  };
  return {
    rows: [...rows.values()].sort(
      (a, b) => rank(a) - rank(b) || a.key.localeCompare(b.key),
    ),
    statusSource:
      applications.kind === "ready"
        ? "지원 현황 연결됨"
        : applications.kind === "missing"
          ? "지원 현황 없음"
          : "지원 현황을 불러오지 못함",
  };
}

function CellView({ cell }: { cell?: Cell }) {
  if (!cell) return <span className="text-muted">—</span>;
  return (
    <>
      {cell.href ? (
        <Link
          href={cell.href}
          className="font-mono text-xs underline underline-offset-4"
        >
          {cell.label}
        </Link>
      ) : (
        <span className="text-xs">{cell.label}</span>
      )}
      <span className="ml-2 text-xs text-muted">{cell.note}</span>
    </>
  );
}

export default async function MapPage() {
  await requireAdmin();
  const { rows, statusSource } = await buildRows();
  const common: Row = {
    key: "common",
    name: "공통",
    cells: {
      resume: { href: "/resume", label: "/resume", note: "public" },
      career: { href: "/career", label: "/career", note: "public" },
      cv: { href: "/cv", label: "/cv", note: "public" },
    },
  };
  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <header className="mb-8 border-b border-border pb-4">
          <h1 className="m-0 text-xl font-semibold">_map</h1>
          <p className="m-0 mt-1 text-sm text-muted">
            관리자 전용 · 회사 {rows.length} · 상태 {statusSource}
            <span className="mx-2">·</span>
            <Link
              href={ROUTES.admin.dashboard}
              className="underline underline-offset-4"
            >
              지원 관리
            </Link>
          </p>
        </header>
        <section className="min-w-0">
          <h2 className="m-0 mb-2 font-mono text-xs uppercase tracking-wide text-muted">
            회사별 대표 문서
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th scope="col" className="py-2 pr-4 font-medium">
                    회사
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    상태
                  </th>
                  {COLUMNS.map((column) => (
                    <th
                      key={column.kind}
                      scope="col"
                      className="py-2 pr-4 font-medium"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[common, ...rows].map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-border/60 align-top"
                    data-map-row={row.key}
                  >
                    <td className="py-2 pr-4">
                      <div className="font-mono text-xs text-muted">
                        {row.key}
                      </div>
                      <div>{row.name}</div>
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap text-xs">
                      {row.status ? (
                        <span
                          className={
                            STATUS_ORDER.includes(row.status)
                              ? "font-medium"
                              : "text-muted"
                          }
                        >
                          {STATUS_LABEL[
                            row.status as keyof typeof STATUS_LABEL
                          ] ?? row.status}
                        </span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    {COLUMNS.map((column) => (
                      <td
                        key={column.kind}
                        className="py-2 pr-4 whitespace-nowrap"
                      >
                        <CellView cell={row.cells[column.kind]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
