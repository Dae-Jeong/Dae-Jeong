import { StatusSectionHeading } from "@/app/_components/admin/status-section-heading";
import { groupDocumentRows } from "./_components/group-document-rows";
import { AdminNotice } from "@/app/_components/admin/admin-notice";
import { ROUTES } from "@/lib/routes";
import { STATUS_LABEL, type ApplicationStatus } from "@/features/applications/status";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/app/_components/admin/admin-shell";
import { loadApplications } from "@/features/applications/load-applications";
import { requireAdmin } from "@/features/admin-auth/guard";
import { companyDocumentHref } from "@/features/company-documents/urls";
import { listDocumentEntries } from "@/lib/documents/repository";
import { companyKinds, type CompanyKind } from "@/features/company-documents/types";

// 관리자 문서 지도. 회사 한 줄에 대표 이력서 · 경력기술서 · CV. 대표 선정은 features/company-documents/policy.ts가 소유한다.
// 현재 환경에서 열 수 없는 초안은 링크 없이 표시하고, 폐기된 포트폴리오·역할·디자인 화면으로는 연결하지 않는다.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "문서 지도",
  robots: { index: false, follow: false },
};

const EMPHASIZED_STATUSES: readonly ApplicationStatus[] = ["in-progress", "pre-apply"];

type Cell = { href?: string; label: string; note: string };
type Row = {
  key: string;
  name: string;
  status?: ApplicationStatus;
  cells: Partial<Record<CompanyKind, Cell>>;
};

async function buildRows(): Promise<{
  rows: Row[];
  statusSource: string;
  statusKind: "ready" | "missing" | "error";
}> {
  const rows = new Map<string, Row>();
  for (const document of await listDocumentEntries()) {
    const row = rows.get(document.slug) ?? {
      key: document.slug,
      name: document.companyName ?? document.title,
      cells: {},
    };
    const href = companyDocumentHref(document.slug, document.kind);
    row.cells[document.kind] = document.viewable
      ? {
          href,
          label: href,
          note: document.visibility === "public" ? "public" : "draft · local",
        }
      : { label: "초안", note: "배포 비공개 · 승인 전" };
    rows.set(document.slug, row);
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
  return {
    rows: [...rows.values()].sort((a, b) => a.key.localeCompare(b.key)),
    statusKind: applications.kind,
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
          className="focus-ring font-mono text-[12px] leading-4 underline underline-offset-4 [overflow-wrap:anywhere]"
        >
          {cell.label}
        </Link>
      ) : (
        <span className="text-[12px] leading-4">{cell.label}</span>
      )}
      <span className="mt-1 block text-[12px] leading-4 text-muted">{cell.note}</span>
    </>
  );
}

function DocumentSection({ id, title, rows }: { id: string; title: string; rows: Row[] }) {
  return (
    <section aria-labelledby={id} className="min-w-0">
      <StatusSectionHeading id={id} title={title} count={rows.length} />
      <p id={`${id}-scroll-help`} className="m-0 mb-2 text-[12px] leading-4 text-muted sm:hidden">표를 좌우로 이동해 전체 열을 확인하세요.</p>
      <div data-map-scroll role="region" aria-label={`${title} 문서 표`} aria-describedby={`${id}-scroll-help`} tabIndex={0} className="focus-ring min-w-0 overflow-x-auto">
        <table aria-labelledby={id} className="w-full min-w-[880px] table-fixed border-collapse text-[14px] leading-5">
          <colgroup>
            <col className="w-[176px]" />
            <col className="w-[112px]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b border-border text-left text-[12px] leading-4 text-muted">
              <th scope="col" className="py-2 pr-4 font-medium last:pr-0">
                회사
              </th>
              <th scope="col" className="py-2 pr-4 font-medium last:pr-0">
                상태
              </th>
              {companyKinds.map((column) => (
                <th
                  key={column.slug}
                  scope="col"
                  className="py-2 pr-4 font-medium last:pr-0"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.key}
                className="border-b border-border/60 align-top"
                data-map-row={row.key}
              >
                <td className="py-3 pr-4 [overflow-wrap:anywhere]">
                  <div className="font-medium">{row.name}</div>
                  <div className="mt-1 font-mono text-[12px] leading-4 text-muted">{row.key}</div>
                </td>
                <td className="py-3 pr-4 [overflow-wrap:anywhere]">
                  {row.status ? (
                    <span
                      className={
                        EMPHASIZED_STATUSES.includes(row.status)
                          ? "font-medium"
                          : "text-muted"
                      }
                    >
                      {STATUS_LABEL[row.status]}
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                {companyKinds.map((column) => (
                  <td
                    key={column.slug}
                    className="py-3 pr-4 last:pr-0 [overflow-wrap:anywhere]"
                  >
                    <CellView cell={row.cells[column.slug]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function MapPage() {
  await requireAdmin();
  const { rows, statusSource, statusKind } = await buildRows();
  const common: Row = {
    key: "common",
    name: "공통",
    cells: {
      resume: { href: ROUTES.resume, label: ROUTES.resume, note: "public" },
      career: { href: ROUTES.career, label: ROUTES.career, note: "public" },
    },
  };
  return (
    <AdminShell
      page="map"
      description={
        <>
          회사별 대표 이력서 · 경력기술서 · 회사 {rows.length} · {statusSource}
        </>
      }
    >
      {statusKind !== "ready" && (
        <AdminNotice tone={statusKind === "error" ? "alert" : "muted"} className="mb-6">
          {statusSource}
        </AdminNotice>
      )}
      {!rows.length && (
        <AdminNotice tone="muted" className="mb-6">
          등록된 회사별 문서가 없습니다.
        </AdminNotice>
      )}
      <div className="grid min-w-0 gap-6 sm:gap-8">
        <DocumentSection id="map-common" title="공통 문서" rows={[common]} />
        {groupDocumentRows(rows, statusKind).map((group) => (
          <DocumentSection key={group.key} id={`map-${group.key}`} title={group.title} rows={group.rows} />
        ))}
      </div>
    </AdminShell>
  );
}
