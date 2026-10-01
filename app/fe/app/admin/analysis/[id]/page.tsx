import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/features/admin-auth/guard";
import { getAnalysisData } from "@/features/applications/analysis";
import { STATUS_LABEL, type ApplicationStatus } from "@/features/applications/status";
import { Container } from "@/components/site/container";
import { SiteTopBar } from "@/app/_components/site-topbar";
import { SiteFooter } from "@/app/_components/site-footer";
import { MarkdownPanel } from "../_components/markdown-panel";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `공고 분석 — ${id}`,
    robots: { index: false, follow: false },
  };
}

export default async function AnalysisPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const data = await getAnalysisData(id);

  if (!data) {
    notFound();
  }

  const statusLabel = STATUS_LABEL[data.status as ApplicationStatus] ?? data.status;

  return (
    <div data-admin-analysis className="flex min-h-screen flex-col bg-bg">
      <SiteTopBar />
      <Container
        as="main"
        variant="hub"
        className="min-w-0 flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16"
      >
        {/* Navigation & Header */}
        <div className="mb-6 border-b border-border pb-5">
          <div className="mb-3">
            <Link
              href="/admin"
              className="inline-flex items-center text-[13px] font-medium text-muted hover:text-fg"
            >
              ← 지원 관리 목록으로 돌아가기
            </Link>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="rounded bg-fg/10 px-2 py-0.5 text-[12px] font-semibold text-fg">
                  {data.company}
                </span>
                <span className="rounded border border-border px-2 py-0.5 text-[12px] text-muted">
                  {statusLabel}
                </span>
                {data.postingId && (
                  <span className="font-mono text-[12px] text-muted">
                    #{data.postingId}
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-[20px] font-bold leading-snug sm:text-[22px]">
                {data.role}
              </h1>
            </div>
          </div>
        </div>

        {/* 2-Column Split View: Left = Original JD, Right = Analysis */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Original Job Description */}
          <section
            aria-label="공고 원문"
            className="flex flex-col rounded-lg border border-border bg-bg shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-border bg-fg/[0.02] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="text-[14px]">📄</span>
                <h2 className="text-[14px] font-semibold text-fg">공고 원문 (JD)</h2>
              </div>
              {data.sourceUrl && (
                <a
                  href={data.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-fg underline underline-offset-4 hover:text-muted"
                >
                  공식 채용 페이지 열기 ↗
                </a>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:max-h-[calc(100vh-250px)]">
              <MarkdownPanel markdown={data.jdMarkdown} />
            </div>
          </section>

          {/* Right: Match & Gap Analysis */}
          <section
            aria-label="공고 분석 보고서"
            className="flex flex-col rounded-lg border border-border bg-bg shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-border bg-fg/[0.02] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="text-[14px]">🔍</span>
                <h2 className="text-[14px] font-semibold text-fg">공고 분석 (매칭 보고서)</h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:max-h-[calc(100vh-250px)]">
              <MarkdownPanel markdown={data.reportMarkdown} />
            </div>
          </section>
        </div>
      </Container>
      <SiteFooter containerVariant="hub" className="py-6 sm:py-8" />
    </div>
  );
}
