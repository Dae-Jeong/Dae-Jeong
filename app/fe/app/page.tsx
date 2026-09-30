import Link from "next/link";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/app/_components/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { PRIMARY_CASES, SUPPORTING_CASES } from "@/lib/cases";
import { CAREER_CASE_LINKS } from "@/lib/career-links";
import { cn } from "@/lib/cn";

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

const DOCUMENTS = [
  {
    no: "01",
    name: "Resume",
    localName: "이력서",
    href: "/resume",
  },
  {
    no: "02",
    name: "Career Description",
    localName: "경력기술서",
    href: "/career",
  },
  // CV is part of the approved visitor IA (menu, footer); its search noindex stays on the /cv page itself.
  { no: "03", name: "CV", localName: "", href: "/cv" },
] as const;

const HOME_CASES = [
  ...PRIMARY_CASES,
  ...SUPPORTING_CASES.filter((item) => item.slug === "memento-payment"),
];

export default function Home() {
  const visibleDocuments = DOCUMENTS;

  return (
    <>
      <TopBar />

      <main className="flex-1">
        <section className="border-b border-border-soft pb-20 pt-[88px] max-md:pb-14 max-md:pt-14">
          <Container variant="hub">
            <div className="max-w-[1040px]">
              <p className="m-0 font-mono text-xs font-medium tracking-[0.06em] text-muted">
                Maker Profile · Product / Backend / AI
              </p>
              <h1 className="mt-7 max-w-[22ch] text-pretty text-[clamp(2.5rem,4.4vw,4.25rem)] font-semibold leading-[1.16] tracking-[-0.045em] max-md:max-w-none">
                호기심을 현실로, 메이커 김대정입니다
              </h1>
              <p className="mt-6 font-mono text-sm tracking-[0.025em] text-fg-2">
                <strong className="font-semibold text-fg">
                  Tech Lead · Backend Engineer
                </strong>{" "}
                · AI Product Systems
              </p>
              <p className="mt-7 max-w-[780px] text-lg leading-[1.75] text-fg-2 max-md:text-base">
                사용자가 겪는 불편과 반복되는 비효율에서 더 나은 방법을 찾아
                구현하고, 사용자 반응을 살피며 제품의 쓰임과 사업적 가치를 키워갑니다.
              </p>
              <p className="mt-4 max-w-[780px] text-lg leading-[1.75] text-fg-2 max-md:text-base">
                개발 경험을 도구와 기준으로 남겨, 다양한 직군의 동료가 AI와 함께
                아이디어를 제품으로 완성하도록 돕습니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/career" className="px-[14px] py-[10px]">
                  경력기술서 보기
                </Button>
                <Link
                  href="/resume"
                  className="focus-ring inline-flex items-center border border-border px-[14px] py-[10px] font-mono text-xs font-medium tracking-[0.03em] text-fg transition-colors duration-100 hover:border-fg hover:bg-surface"
                >
                  Resume 보기
                </Link>
                <a
                  href="https://github.com/Dae-Jeong"
                  target="_blank"
                  rel="noopener"
                  className="focus-ring inline-flex items-center border border-border px-[14px] py-[10px] font-mono text-xs tracking-[0.03em] text-muted transition-colors duration-100 hover:border-fg hover:bg-surface hover:text-fg"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-border-soft py-20 max-md:py-12">
          <Container variant="hub">
            <Reveal>
              <SectionHead
                no="01"
                title="Documents"
                meta={`${visibleDocuments.length} documents`}
              />
            </Reveal>
            <Reveal stagger className="border-y border-border">
              {visibleDocuments.map((document) => (
                <Link
                  key={document.href}
                  href={document.href}
                  aria-label={`${document.name} 열기`}
                  className="group focus-ring grid min-h-24 grid-cols-[56px_minmax(0,1fr)_48px] items-center gap-5 border-b border-border px-1 transition-[background-color,padding] duration-[160ms] last:border-b-0 hover:bg-surface hover:px-4 max-md:min-h-20 max-md:grid-cols-[40px_minmax(0,1fr)_40px] max-md:gap-3"
                >
                  <span className="font-mono text-sm tracking-[0.06em] text-muted">
                    {document.no}
                  </span>
                  <span className="flex min-w-0 items-baseline gap-4 max-md:flex-wrap max-md:gap-x-3 max-md:gap-y-1">
                    <span className="text-[clamp(1.25rem,2vw,1.65rem)] font-semibold tracking-[-0.025em]">
                      {document.name}
                    </span>
                    {document.localName && (
                      <span className="text-sm text-muted">
                        {document.localName}
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center justify-self-end border border-border transition-[transform,background-color,border-color,color] duration-150 group-hover:translate-x-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-on max-md:size-10"
                  >
                    <Arrow />
                  </span>
                </Link>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* ── Selected Proof — portfolio 넘버드 문법의 관문형 축약 ── */}
        <section className="bg-surface py-20 max-md:py-12">
          <Container variant="hub">
            <Reveal>
              <SectionHead
                no="02"
                title="Selected Proof"
                meta={`Cases · ${HOME_CASES.length}`}
              />
            </Reveal>
            <Reveal stagger>
              <div className="border-y border-border">
                {HOME_CASES.map((c) => {
                  const href = CAREER_CASE_LINKS[c.slug] ?? "/career";
                  return (
                    <Link
                      key={c.slug}
                      href={href}
                      className={cn(
                        "group focus-ring grid grid-cols-[56px_minmax(0,1fr)_220px_auto] items-center gap-5 border-b border-border px-1 py-5 last:border-b-0",
                        "transition-[background,padding] duration-[180ms] hover:bg-bg hover:px-4",
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
                          → /career
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
