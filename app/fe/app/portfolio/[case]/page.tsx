import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { KeyValueCard } from "@/components/ui/key-value-list";
import { CASES, NAVIGABLE_CASES } from "@/lib/cases";
import { DETAILS } from "./case-details";
import { CaseRail } from "./case-rail";
import { SYSTEM_DETAILS } from "./system-details";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.filter((item) => item.available).map((item) => ({ case: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ case: string }> }): Promise<Metadata> {
  const { case: slug } = await params;
  const meta = CASES.find((item) => item.slug === slug);
  return { title: `${meta?.name ?? "Case"} — Portfolio · 김대정`, description: meta?.blurb };
}

function SectionTitle({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-8 border-b border-border pb-4">
      <p className="m-0 font-mono text-xs text-muted">{label}</p>
      <h2 className="m-0 mt-2 text-2xl font-semibold tracking-[-0.025em]">{title}</h2>
    </div>
  );
}

export default async function CasePage({ params }: { params: Promise<{ case: string }> }) {
  const { case: slug } = await params;
  const meta = CASES.find((item) => item.slug === slug);
  const system = SYSTEM_DETAILS[slug];
  const legacy = DETAILS[slug];
  if (!meta || (!system && !legacy)) notFound();

  const navIndex = NAVIGABLE_CASES.findIndex((item) => item.slug === slug);
  const prev = navIndex > 0 ? NAVIGABLE_CASES[navIndex - 1] : null;
  const next = navIndex >= 0 && navIndex < NAVIGABLE_CASES.length - 1 ? NAVIGABLE_CASES[navIndex + 1] : null;

  const eyebrow = system?.eyebrow ?? legacy.eyebrow;
  const summary = system?.summary ?? legacy.positioning;
  const kv = system?.kv ?? legacy.kv;
  const problem = system?.problem ?? legacy.problem;
  const decisions = system?.decisions ?? legacy.decisions;

  return (
    <>
      <TopBar variant="subpage" crumb={<><Link href="/portfolio" className="focus-ring hover:text-fg">Portfolio</Link> / {meta.no}</>} />
      <Container variant="doc" className="flex-1">
        <div className="grid grid-cols-[minmax(0,1fr)_220px] gap-12 max-lg:grid-cols-1">
          <main className="min-w-0 pb-24 pt-12">
            <header className="border-b-2 border-fg pb-9">
              <p className="m-0 font-mono text-xs text-muted">{eyebrow}</p>
              <h1 className="m-0 mt-4 max-w-[820px] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]">{meta.name}</h1>
              <p className="m-0 mt-6 max-w-[780px] text-lg leading-[1.7] text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">{summary}</p>
              <KeyValueCard groups={[kv]} className="mt-7" />
            </header>

            {system?.invariant && (
              <div className="mt-8 border border-fg bg-fg px-6 py-5 text-bg">
                <span className="font-mono text-xs opacity-70">설계 원칙</span>
                <p className="m-0 mt-2 text-base font-semibold leading-[1.6]">{system.invariant}</p>
              </div>
            )}

            <section className="pt-12">
              <SectionTitle id="problem" label="Problem & constraints" title="왜 이 문제를 풀어야 했는가" />
              <div className="mt-6 grid max-w-[780px] gap-5 text-base leading-[1.75] text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                {problem.map((paragraph, index) => <p key={index} className="m-0">{paragraph}</p>)}
              </div>
            </section>

            {system ? (
              <section className="pt-12">
                <SectionTitle id="failure" label="Failure boundary" title="실패하면 어디에서 멈추고, 어떻게 복구하는가" />
                <div className="mt-6 overflow-hidden border-y border-border">
                  <div className="grid grid-cols-[0.8fr_1fr_1.5fr] gap-5 border-b border-border bg-surface px-4 py-3 font-mono text-xs text-muted max-sm:hidden">
                    <span>Trigger</span><span>Risk</span><span>Boundary</span>
                  </div>
                  {system.failures.map((row) => (
                    <div key={row.trigger} className="grid grid-cols-[0.8fr_1fr_1.5fr] gap-5 border-b border-border-soft px-4 py-4 text-sm leading-[1.55] last:border-b-0 max-sm:grid-cols-1 max-sm:gap-2">
                      <strong>{row.trigger}</strong><span className="text-fg-2">{row.risk}</span><span>{row.boundary}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : legacy.review ? (
              <section className="pt-12">
                <SectionTitle id="failure" label="Alternatives" title="어떤 선택지를 검토했는가" />
                <div className="mt-6 grid gap-7">
                  {legacy.review.groups.map((group) => (
                    <div key={group.title} className="border-b border-border pb-6">
                      <h3 className="m-0 text-base font-semibold">{group.title}</h3>
                      <div className="mt-3 grid gap-3">
                        {group.options.map((option) => <p key={option.name} className="m-0 text-sm leading-[1.65] text-fg-2"><strong className="mr-2 text-fg">{option.verdict} · {option.name}</strong>{option.reason}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="pt-12">
              <SectionTitle id="decision" label="Decisions" title="핵심 기술 판단" />
              <div className="mt-6 border-t border-border">
                {decisions.map((decision) => (
                  <div key={decision.k} className="grid grid-cols-[180px_minmax(0,1fr)] gap-6 border-b border-border py-5 max-sm:grid-cols-1 max-sm:gap-2">
                    <h3 className="m-0 font-mono text-sm font-semibold">{decision.k}</h3>
                    <p className="m-0 text-base leading-[1.65] text-fg-2 [&_strong]:text-fg">{decision.t}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-12">
              <SectionTitle id="system" label="System flow" title="판단을 실제 시스템으로 옮긴 구조" />
              {system ? (
                <div className="mt-7 grid grid-cols-4 border border-border max-md:grid-cols-2 max-sm:grid-cols-1">
                  {system.flow.map((node, index) => (
                    <div key={node.label} className={`relative min-w-0 p-5 ${index > 0 ? "border-l border-border max-sm:border-l-0 max-sm:border-t" : ""} ${index === 2 ? "max-md:border-l-0 max-md:border-t max-sm:border-l-0" : ""}`}>
                      <span className="font-mono text-xs text-accent">{node.label}</span>
                      <h3 className="m-0 mt-4 text-base font-semibold">{node.title}</h3>
                      <p className="m-0 mt-2 text-sm leading-[1.6] text-fg-2">{node.desc}</p>
                      {index < system.flow.length - 1 && <span aria-hidden className="absolute -right-3 top-1/2 z-10 grid size-6 -translate-y-1/2 place-items-center bg-bg font-mono text-muted max-sm:hidden">→</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 border-t border-border">
                  {legacy.system.map((item) => <div key={item.title} className="grid grid-cols-[220px_minmax(0,1fr)] gap-6 border-b border-border py-5 max-sm:grid-cols-1 max-sm:gap-2"><h3 className="m-0 text-base font-semibold">{item.title}</h3><p className="m-0 text-sm leading-[1.65] text-fg-2">{item.desc}</p></div>)}
                </div>
              )}
            </section>

            <section className="pt-12">
              <SectionTitle id="proof" label="Evidence" title="운영에서 확인한 결과" />
              {system ? (
                <>
                  <div className="mt-7 grid grid-cols-2 gap-x-8 max-sm:grid-cols-1">
                    {system.evidence.map((item) => <div key={item.label} className="border-b border-border py-5"><span className="font-mono text-xs text-muted">{item.label}</span><strong className="mt-2 block text-xl font-semibold tracking-[-0.02em]">{item.value}</strong><p className="m-0 mt-2 text-sm leading-[1.55] text-fg-2">{item.note}</p></div>)}
                  </div>
                </>
              ) : (
                <div className="mt-6 border-t border-border">
                  {legacy.evidence.map((item) => <div key={item.index} className="grid grid-cols-[160px_minmax(0,1fr)] gap-6 border-b border-border py-5 max-sm:grid-cols-1 max-sm:gap-2"><span className="font-mono text-xs text-muted">{item.label}</span><div><strong className="block text-sm">{item.claim}</strong><span className="mt-2 block text-xs text-muted">{item.source}</span></div></div>)}
                </div>
              )}
            </section>

            <nav aria-label="케이스 이동" className="mt-14 grid grid-cols-2 border-y border-border">
              {[{ label: "← 이전", item: prev }, { label: "다음 →", item: next }].map(({ label, item }) => item ? (
                <Link key={label} href={`/portfolio/${item.slug}`} className="focus-ring grid gap-1 py-5 first:pr-5 last:border-l last:border-border last:pl-5 hover:bg-surface"><span className="font-mono text-xs text-muted">{label}</span><span className="text-sm font-semibold">{item.shortName}</span></Link>
              ) : <span key={label} className="py-5 text-sm text-muted first:pr-5 last:border-l last:border-border last:pl-5">{label}</span>)}
            </nav>
          </main>
          <CaseRail cases={NAVIGABLE_CASES} currentSlug={slug} hasReview={!!system || !!legacy.review} />
        </div>
      </Container>
      <SiteFooter />
      <ReviewLauncher />
    </>
  );
}
