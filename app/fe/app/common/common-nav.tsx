import Link from "next/link";
import styles from "./common.module.css";

export const COMMON_LINKS = [
  { href: "/resume", label: "이력서", detail: "Maker · 회사별 프로젝트와 성과" },
  { href: "/career", label: "경력기술서", detail: "프로젝트별 역할 · 판단 · 구현 · 검증" },
  { href: "/portfolio", label: "포트폴리오", detail: "고객 문제 · 제품 구현 · 팀의 개발 기반" },
  { href: "/cv", label: "CV", detail: "영문 · Jake’s Resume · 전체 경력 및 활동" },
] as const;

export function CommonNav({ active }: { active?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return <nav className={styles.nav} aria-label="공용 지원 문서">
    <Link href="/_map" className={styles.navHome}>문서 지도</Link>
    {COMMON_LINKS.map((link) => <Link key={link.href} href={link.href} aria-current={active === link.href ? "page" : undefined}>{link.label}</Link>)}
  </nav>;
}
