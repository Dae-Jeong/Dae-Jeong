import { StatusSection } from "./_components/status-section";
import { ROUTES } from "@/lib/routes";
import { groupByStatus } from "@/features/applications/status";
import { requireAdmin } from "@/features/admin-auth/guard";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/_components/site-footer";
import { TopBar } from "@/components/site/topbar";
import { loadApplications } from "@/features/applications/load-applications";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "지원 관리",
  robots: { index: false, follow: false },
};

/** Admin application dashboard: company, posting and progress status only (site-admin-surfaces). */
export default async function DashboardPage() {
  await requireAdmin();
  const state = await loadApplications();
  const attempts = state.kind === "ready" ? state.data.attempts : [];
  const groups = groupByStatus(attempts);

  return (
    <div className="min-h-screen bg-bg">
      <TopBar variant="subpage" crumb="지원 관리" tag="ADMIN" />
      <main
        className="mx-auto w-full max-w-5xl px-6 py-10"
        data-admin-dashboard
      >
        <header className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
          <div>
            <h1 className="m-0 text-xl font-semibold">지원 관리</h1>
            <p className="m-0 mt-1 text-sm text-muted">
              회사 · 공고 · 진행 상태
              {state.kind === "ready" ? ` · ${attempts.length}건` : ""}
            </p>
          </div>
          <nav
            aria-label="관리자 도구"
            className="flex gap-4 font-mono text-xs"
          >
            <Link
              href={ROUTES.admin.map}
              className="underline underline-offset-4"
            >
              문서 지도
            </Link>
          </nav>
        </header>
        {state.kind === "missing" && (
          <p role="status" className="border border-border p-4 text-sm">
            지원 현황 데이터가 아직 없습니다.
          </p>
        )}
        {state.kind === "error" && (
          <p
            role="alert"
            className="border border-danger p-4 text-sm text-danger"
          >
            지원 현황을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}
        {state.kind === "ready" && !attempts.length && (
          <p role="status" className="text-sm text-muted">
            등록된 지원이 없습니다.
          </p>
        )}
        {state.kind === "ready" && (
          <div className="grid gap-10">
            {groups.map((group) => (
              <StatusSection key={group.status} {...group} />
            ))}
            <p className="m-0 font-mono text-xs text-muted">
              최종 갱신{" "}
              {state.data.sourceUpdatedAt
                ? new Date(state.data.sourceUpdatedAt).toLocaleString("ko-KR", {
                    timeZone: "Asia/Seoul",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "미상"}
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
