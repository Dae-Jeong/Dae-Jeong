import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Card, CardGrid } from "@/components/ui/card-grid";
import { EvidencePopover } from "@/components/ui/evidence-popover";
import { KeyValueCard } from "@/components/ui/key-value-list";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { SectionHead } from "@/components/ui/section-head";
import { CASES } from "@/lib/cases";
import { DETAILS } from "./case-details";
import { CaseRail } from "./case-rail";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.filter((c) => c.available).map((c) => ({ case: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ case: string }>;
}): Promise<Metadata> {
  const { case: slug } = await params;
  const meta = CASES.find((c) => c.slug === slug);
  return {
    title: `${meta?.name ?? "Case"} — Portfolio · 김대정`,
    description: meta?.blurb,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ case: string }>;
}) {
  const { case: slug } = await params;
  const meta = CASES.find((c) => c.slug === slug);
  const detail = DETAILS[slug];
  /* 12차: 검토(선택 섹션) 유무에 따라 섹션 번호를 동적 계산 */
  const secIds = ["problem", ...(detail.review ? ["review"] : []), "decision", "system", "ops"];
  const no = (id: string) => String(secIds.indexOf(id) + 1).padStart(2, "0");

  if (!meta || !detail) notFound();

  const idx = CASES.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? CASES[idx - 1] : null;
  const next = idx < CASES.length - 1 ? CASES[idx + 1] : null;

  return (
    <>
      <TopBar
        variant="subpage"
        crumb={
          <>
            <Link href="/portfolio" className="focus-ring hover:text-fg">
              Portfolio
            </Link>{" "}
            / {meta.name.split(" ")[0]}
          </>
        }
      />

      <Container variant="doc" className="flex-1">
        <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-12 max-lg:grid-cols-1">
          <main data-claim={meta.claimIds.join(" ")} className="pb-24 pt-12">
            <header className="border-b-2 border-fg pb-7">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {detail.eyebrow}
              </span>
              <h1 className="mt-3 font-mono text-3xl font-semibold leading-[1.06] tracking-[-0.025em]">
                {meta.name}
              </h1>
              <p className="mt-4 text-lg font-medium">{detail.positioning}</p>
              <KeyValueCard groups={[detail.kv]} className="mt-5" />
            </header>

            <section id="problem" className="pt-10">
              <SectionHead no={no("problem")} title="문제" meta="Problem" />
              <div className="grid gap-4 text-base leading-[1.6] text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                {detail.problem.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {detail.review && (
              <section id="review" className="pt-10">
                <SectionHead no={no("review")} title="검토" meta="Alternatives" />
                {detail.review.intro && (
                  <p className="m-0 mb-5 text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                    {detail.review.intro}
                  </p>
                )}
                <div className="grid gap-6">
                  {detail.review.groups.map((g) => (
                    <div key={g.title}>
                      <h3 className="m-0 mb-2.5 font-mono text-sm font-semibold">{g.title}</h3>
                      <div className="grid gap-px border border-border-soft bg-border-soft">
                        {g.options.map((o) => (
                          <div key={o.name} className="grid gap-1.5 bg-bg p-4">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={
                                  o.verdict === "채택"
                                    ? "border border-accent bg-accent px-[7px] py-0.5 font-mono text-xs tracking-[0.06em] text-accent-on"
                                    : "border border-border px-[7px] py-0.5 font-mono text-xs tracking-[0.06em] text-muted"
                                }
                              >
                                {o.verdict}
                              </span>
                              <span className="font-mono text-sm font-semibold">{o.name}</span>
                            </div>
                            <p className="m-0 text-sm leading-[1.6] text-fg-2">{o.reason}</p>
                          </div>
                        ))}
                      </div>
                      {g.note && (
                        <p className="m-0 mt-2.5 text-sm text-fg-2">{g.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="decision" className="pt-10">
              <SectionHead no={no("decision")} title="결정" meta="Decision" />
              <p className="m-0 mb-5 text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                {detail.decisionIntro}
              </p>
              <NumberedList className="border-t border-border-soft">
                {detail.decisions.map((d) => (
                  <NumberedRow
                    key={d.k}
                    label={d.k}
                    labelWidth="lg"
                    labelClassName="font-semibold text-fg"
                    className="border-border-soft py-4"
                  >
                    <span className="text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                      {d.t}
                    </span>
                  </NumberedRow>
                ))}
              </NumberedList>
            </section>

            <section id="system" className="pt-10">
              <SectionHead no={no("system")} title="시스템" meta="System" />
              <p className="m-0 mb-5 text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                {detail.systemIntro}
              </p>
              <CardGrid cols={2}>
                {detail.system.map((s) => (
                  <Card key={s.title} className="gap-1.5 p-4">
                    <h4 className="m-0 font-mono text-sm font-semibold">{s.title}</h4>
                    <p className="m-0 text-sm text-fg-2">{s.desc}</p>
                  </Card>
                ))}
              </CardGrid>
            </section>

            <section id="ops" className="pt-10">
              <SectionHead no={no("ops")} title="결과" meta="Result" />
              <p className="m-0 mb-5 text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                {detail.opsIntro}
              </p>
              <div className="grid justify-items-start gap-4">
                {detail.evidence.map((e) => (
                  <EvidencePopover
                    key={e.index}
                    index={e.index}
                    label={e.label}
                    claim={e.claim}
                    source={e.source}
                    claimIds={e.claimIds}
                  />
                ))}
              </div>
            </section>

            <nav
              aria-label="케이스 이동"
              className="mt-14 grid grid-cols-2 gap-px border border-border-soft bg-border-soft"
            >
              {[
                { dir: "← 이전", c: prev },
                { dir: "다음 →", c: next },
              ].map(({ dir, c }) => {
                const body = (
                  <>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                      {dir}
                    </span>
                    <span className="font-mono text-sm font-semibold">
                      {c ? c.name : dir.startsWith("←") ? "— 첫 케이스" : "— 마지막 케이스"}
                    </span>
                  </>
                );
                return c && c.available ? (
                  <Link
                    key={dir}
                    href={`/portfolio/${c.slug}`}
                    className="focus-ring grid gap-1 bg-bg p-4 transition-colors duration-100 hover:bg-surface"
                  >
                    {body}
                  </Link>
                ) : (
                  <span
                    key={dir}
                    aria-disabled
                    title={c ? "상세 준비 중" : undefined}
                    className="grid gap-1 bg-bg p-4 opacity-60"
                  >
                    {body}
                  </span>
                );
              })}
            </nav>
          </main>

          <CaseRail cases={CASES} currentSlug={slug} hasReview={!!detail.review} />
        </div>
      </Container>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
