"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import type { CaseMeta } from "../cases";

const TOC = [
  { id: "problem", no: "01", label: "문제" },
  { id: "decision", no: "02", label: "결정" },
  { id: "system", no: "03", label: "시스템" },
  { id: "ops", no: "04", label: "운영 근거" },
];

/* 디자이너 결정: sticky rail — 목차 scroll-spy(임의 점프) + 케이스 이동.
   하단 이전/다음 내비는 순차 이동으로 역할 분리 */
export function CaseRail({
  cases,
  currentSlug,
}: {
  cases: CaseMeta[];
  currentSlug: string;
}) {
  const [active, setActive] = useState("problem");

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    TOC.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <aside
      aria-label="케이스 내비게이션"
      className="sticky top-0 grid content-start gap-5 self-start py-12 max-lg:hidden"
    >
      <Button href="/portfolio" className="justify-center">
        ← 목록으로
      </Button>

      <nav aria-label="목차">
        <h2 className="m-0 mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          이 케이스
        </h2>
        <ol className="m-0 grid list-none gap-[7px] p-0">
          {TOC.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className={cn(
                  "focus-ring font-mono text-xs text-fg-2 hover:text-fg",
                  active === t.id && "font-semibold text-fg",
                )}
              >
                <span className="mr-2 text-muted">{t.no}</span>
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <nav aria-label="다른 케이스" className="border-t border-border-soft pt-4">
        <h2 className="m-0 mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          케이스 이동
        </h2>
        <ol className="m-0 grid list-none gap-[7px] p-0">
          {cases.map((c) => {
            const inner = (
              <>
                <span className="mr-2 text-muted">{c.no}</span>
                {c.name}
              </>
            );
            if (c.slug === currentSlug)
              return (
                <li key={c.slug} className="font-mono text-xs font-semibold text-fg">
                  {inner}
                </li>
              );
            if (!c.available)
              return (
                <li
                  key={c.slug}
                  title="상세 준비 중"
                  className="font-mono text-xs text-muted"
                >
                  {inner}
                </li>
              );
            return (
              <li key={c.slug}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="focus-ring font-mono text-xs text-fg-2 hover:text-fg"
                >
                  {inner}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <p className="m-0 border-t border-border-soft pt-3 font-mono text-[10px] leading-relaxed text-muted">
        모든 성과 문장은 검증된 표현만 사용합니다. 수치는 운영 시점 기준이며 미확정
        값은 TBD로 표기합니다.
      </p>
    </aside>
  );
}
