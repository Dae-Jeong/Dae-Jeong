import Link from "next/link";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Button } from "@/components/ui/button";
import { KeyValueCard } from "@/components/ui/key-value-list";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { CASES } from "@/lib/cases";
import { cn } from "@/lib/cn";

/* root = 15초 검증 관문 (v3 확정 — 다이어트형).
   콘텐츠는 root-v3-prototype.html 확정 표현 verbatim */

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const SUMMARY: { no: string; accent?: boolean; text: React.ReactNode }[] = [
  {
    no: "01",
    accent: true,
    text: (
      <>
        돌아가는 backend를 다시 세우자고 설득했고,{" "}
        <strong>재구축 이후 오히려 재발이 줄었다</strong> — QA 티켓 reopen 비율{" "}
        <strong>37% → 11%</strong> (cutover 전후 관측). 범위는 backend로 한정하고 FE는
        그대로 뒀다
      </>
    ),
  },
  {
    no: "02",
    text: (
      <>
        측정값으로 믿고 쓰던 품질 기준이{" "}
        <strong>자사 출력을 되먹이고 있었다</strong> — 순환을 끊는 과정에서 문제 정의
        자체의 오류가 함께 드러났다
      </>
    ),
  },
  {
    no: "03",
    text: (
      <>
        유형 분기 판정을 writer에 뒀더니{" "}
        <strong>18건 전부 발동하지 않았다</strong> — 판단을 어느 역할에 둘 것인가가
        agent 설계의 핵심이었다
      </>
    ),
  },
  {
    no: "04",
    text: (
      <>
        AI 제품 backend를 만들면서{" "}
        <strong>기업부설연구소장·Tech Lead·PO 역할을 병행</strong> — 만드는 일과 무엇을
        만들지 정하는 일을 같이 한다
      </>
    ),
  },
];

const ROUTES = [
  {
    name: "Resume",
    href: "/resume",
    badge: "LIVE",
    warn: false,
    desc: "A4 마스터 이력서 — 요약·역량·경력 전체를 한 페이지에.",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    badge: "LIVE",
    warn: false,
    desc: "case 5건 — 문제·결정·시스템·운영 근거. 현재 Thready 상세 활성.",
  },
  {
    name: "Chat",
    href: "/chat",
    badge: "PREVIEW",
    warn: true,
    desc: "프로필 agent와의 전체 대화 — 검증된 claim registry의 근거로만 답합니다. 근거 rail 포함, 우하단 Ask 런처의 full 페이지.",
  },
];

export default function Home() {
  return (
    <>
      <TopBar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="pb-16 pt-[72px]">
          <Container
            variant="hub"
            className="grid grid-cols-[minmax(0,1fr)_300px] items-end gap-12 max-lg:grid-cols-1 max-lg:gap-8"
          >
            <div>
              <span className="mb-6 inline-flex items-center gap-2 border border-border px-2.5 py-1 font-mono text-xs tracking-[0.06em] text-fg-2">
                MediSolve AI · Backend Engineer · 재직 중
              </span>
              <h1 className="font-mono text-4xl font-semibold tracking-[-0.025em] max-md:text-[34px]">
                김대정
              </h1>
              <p className="mt-4 font-mono text-base uppercase tracking-[0.06em] text-fg-2">
                <b className="font-semibold text-fg">Backend Engineer</b> · AI
                Product Systems
              </p>
              <p className="mt-6 max-w-[22ch] text-xl font-medium leading-[1.4] max-md:max-w-none max-md:text-lg">
                AI 제품을 만들고, 무엇을 만들지도 함께 정하는 백엔드 엔지니어
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {/* Resume PDF 준비 시 다운로드 chip 복귀 (7차 결정) */}
                <Button href="/resume" className="px-[13px] py-[9px]">
                  이력서 보기
                </Button>
                <a
                  href="https://github.com/Dae-Jeong"
                  target="_blank"
                  rel="noopener"
                  className="focus-ring inline-flex items-center gap-2 border border-border px-[13px] py-[9px] font-mono text-xs tracking-[0.03em] transition-colors duration-100 hover:border-fg hover:bg-surface"
                >
                  github.com/Dae-Jeong
                </a>
              </div>
            </div>

            <KeyValueCard
              className="self-end max-lg:max-w-[340px]"
              valueClassName="text-cred"
              groups={[
                [
                  { k: "Role", v: "Backend · PO" },
                  { k: "Domain", v: "AI Product" },
                  { k: "Career", v: "2020 —" },
                ],
                [
                  { k: "Now", v: "MediSolve AI" },
                  { k: "Since", v: "2025.04" },
                  {
                    k: "Stack",
                    v: (
                      <>
                        Python · FastAPI
                        <br />
                        TypeScript · Azure
                        <br />
                        Terraform
                      </>
                    ),
                  },
                ],
                [
                  {
                    k: "Award",
                    v: (
                      <>
                        CES 2024
                        <br />
                        Best of Innovation
                      </>
                    ),
                  },
                  { k: "Patent", v: "등록 1건" },
                ],
                [
                  { k: "Site", v: "marinkim.xyz" },
                  { k: "GitHub", v: "Dae-Jeong" },
                ],
              ]}
            />
          </Container>
        </section>

        {/* ── Summary 4행 ── */}
        <section className="border-y border-border-soft bg-surface py-20 max-md:py-12">
          <Container variant="hub">
            <Reveal>
              <SectionHead no="00" title="Summary" meta="요약 · 4" />
            </Reveal>
            <Reveal stagger>
              <ol className="m-0 grid list-none p-0">
                {SUMMARY.map((s) => (
                  <li
                    key={s.no}
                    className="grid grid-cols-[56px_1fr] items-baseline gap-4 border-t border-border py-5 first:border-t-0 max-md:grid-cols-[40px_1fr]"
                  >
                    <span
                      className={cn(
                        "font-mono text-sm tracking-[0.06em]",
                        s.accent ? "font-bold text-success" : "text-muted",
                      )}
                    >
                      {s.no}
                    </span>
                    <span className="text-lg font-[450] leading-normal max-md:text-base [&_strong]:font-semibold [&_strong]:text-fg">
                      {s.text}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </Container>
        </section>

        {/* ── Selected Proof — portfolio 넘버드 문법의 관문형 축약 ── */}
        <section className="py-20 max-md:py-12">
          <Container variant="hub">
            <Reveal>
              <SectionHead no="01" title="Selected Proof" meta="Cases · 5 — 상세는 Portfolio" />
            </Reveal>
            <Reveal stagger>
              <div>
                {CASES.map((c) => {
                  const href = c.available ? `/portfolio/${c.slug}` : "/portfolio";
                  return (
                    <Link
                      key={c.slug}
                      href={href}
                      className={cn(
                        "group focus-ring grid grid-cols-[56px_minmax(0,1fr)_220px_auto] items-center gap-5 border-b border-border px-1 py-5",
                        "transition-[background,padding-left] duration-[180ms] hover:bg-surface hover:pl-4",
                        "max-md:grid-cols-[40px_minmax(0,1fr)_auto] max-md:gap-3",
                        !c.available && "text-muted",
                      )}
                    >
                      <span className="font-mono text-lg tracking-[0.06em] text-muted">
                        {c.no}
                      </span>
                      <span className="grid gap-1">
                        <span
                          className={cn(
                            "font-mono text-xl font-semibold tracking-[-0.01em]",
                            !c.available && "text-fg-2",
                          )}
                        >
                          {c.name}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted">
                          {c.tag}
                        </span>
                      </span>
                      <span className="grid content-center gap-3 max-md:hidden">
                        {[
                          ["Role", c.role],
                          ["Scope", c.scope],
                        ].map(([k, v]) => (
                          <span key={k} className="grid gap-0.5">
                            <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
                              {k}
                            </span>
                            <span className="font-mono text-xs text-fg">{v}</span>
                          </span>
                        ))}
                      </span>
                      {c.available ? (
                        <span
                          aria-hidden
                          className="grid size-10 place-items-center justify-self-end border border-border transition-colors duration-100 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-on"
                        >
                          <Arrow />
                        </span>
                      ) : (
                        <span className="justify-self-end whitespace-nowrap border border-border px-[11px] py-1.5 font-mono text-xs tracking-[0.04em] text-muted">
                          → /portfolio
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </Reveal>
            <p className="m-0 mt-5 text-xs tracking-[0.03em] text-muted">
              상세 활성 <b className="font-semibold text-fg-2">Thready 1건</b> · 나머지는{" "}
              <Link
                href="/portfolio"
                className="focus-ring border-b border-border text-fg-2 transition-colors duration-100 hover:border-fg hover:text-fg"
              >
                /portfolio 목록
              </Link>
              에서.
            </p>
          </Container>
        </section>

        {/* ── Explore · route gateway ── */}
        <section className="pb-24 pt-4">
          <Container variant="hub">
            <Reveal>
              <SectionHead no="02" title="Explore" meta="Routes · 3" />
            </Reveal>
            <Reveal stagger className="grid grid-cols-3 gap-px border border-border-soft bg-border-soft max-md:grid-cols-1">
              {ROUTES.map((r) => (
                <Link
                  key={r.name}
                  href={r.href}
                  className="focus-ring grid min-h-[148px] content-start gap-3 bg-bg p-5 transition-colors duration-[180ms] hover:bg-surface"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.08em]">
                      {r.name}
                    </span>
                    <span
                      className={cn(
                        "ml-auto border px-[7px] py-0.5 font-mono text-xs uppercase tracking-[0.08em]",
                        r.warn ? "border-warn text-warn" : "border-border text-muted",
                      )}
                    >
                      {r.badge}
                    </span>
                  </span>
                  <span className="text-sm leading-[1.55] text-fg-2 [&_b]:font-semibold [&_b]:text-fg">
                    {r.desc}
                  </span>
                  <span className="mt-auto font-mono text-xs tracking-[0.04em] text-muted">
                    {r.href} →
                  </span>
                </Link>
              ))}
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
