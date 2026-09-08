import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResumePageShell } from "../resume/resume-page-shell";
import { COMMON_LINKS } from "./common-nav";
import styles from "./common.module.css";

export const metadata: Metadata = { title: "공용 지원 문서 — 김대정", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function CommonPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ResumePageShell crumb="Common" tag="LOCAL REVIEW">
    <main className={styles.hub}>
      <p className={styles.eyebrow}>COMMON DOCUMENTS · 2026.09.08</p>
      <h1>공용 지원 문서</h1>
      <p className={styles.hubIntro}>고객의 새로운 채널 운영을 제품으로 연결한 경험, 업무 정책을 구현한 백엔드, 팀의 개발 기반을 중심으로 정리했습니다.</p>
      <div className={styles.documentList}>
        {COMMON_LINKS.map((link, index) => <Link key={link.href} href={link.href}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <strong>{link.label}</strong><span>{link.detail}</span><span aria-hidden="true">↗</span>
        </Link>)}
      </div>
      <aside className={styles.reviewNote}>
        <p>이력서는 고전 템플릿을 우선 적용했습니다. 같은 내용의 기존 UI도 비교할 수 있습니다.</p>
        <Link href="/resume/compare">기존안 / 고전 템플릿 비교 →</Link>
        <p>이번 변경은 공용 문서에만 반영했습니다. 회사별 지원본과 제출 스냅샷은 유지했습니다.</p>
      </aside>
    </main>
  </ResumePageShell>;
}
