import { AdminNotice } from "@/app/_components/admin/admin-notice";
import { StatusSection } from "./_components/status-section";
import { groupByStatus } from "@/features/applications/status";
import { requireAdmin } from "@/features/admin-auth/guard";
import type { Metadata } from "next";
import { AdminShell } from "@/app/_components/admin/admin-shell";
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
    <AdminShell
      page="dashboard"
      description={
        <>
          회사 · 공고 · 진행 상태
          {state.kind === "ready" ? ` · ${attempts.length}건` : ""}
        </>
      }
    >
      <div data-admin-dashboard className="min-w-0">
        {state.kind === "missing" && (
          <AdminNotice>
            지원 현황 데이터가 아직 없습니다.
          </AdminNotice>
        )}
        {state.kind === "error" && (
          <AdminNotice tone="alert">
            지원 현황을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </AdminNotice>
        )}
        {state.kind === "ready" && !attempts.length && (
          <AdminNotice tone="muted">
            등록된 지원이 없습니다.
          </AdminNotice>
        )}
        {state.kind === "ready" && (
          <div className="grid gap-6 sm:gap-8">
            {groups.map((group) => (
              <StatusSection key={group.status} {...group} />
            ))}
            <p className="m-0 text-[12px] leading-4 text-muted">
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
      </div>
    </AdminShell>
  );
}
