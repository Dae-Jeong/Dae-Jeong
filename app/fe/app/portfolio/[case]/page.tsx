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
import { CASES } from "../cases";
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
          <main className="max-w-[800px] pb-24 pt-12">
            <header className="border-b-2 border-fg pb-7">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {detail.eyebrow}
              </span>
              <h1 className="mt-3 font-mono text-3xl font-semibold leading-[1.06] tracking-[-0.025em]">
                {meta.name}
              </h1>
              <p className="mt-4 max-w-[52ch] text-lg font-medium">{detail.positioning}</p>
              <KeyValueCard groups={[detail.kv]} className="mt-5 max-w-[420px]" />
            </header>

            <section id="problem" className="pt-10">
              <SectionHead no="01" title="문제" meta="Problem" />
              <div className="grid max-w-[62ch] gap-4 text-base leading-[1.6] text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
                {detail.problem.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section id="decision" className="pt-10">
              <SectionHead no="02" title="결정" meta="Decision" />
              <p className="m-0 mb-5 max-w-[62ch] text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
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
              <SectionHead no="03" title="시스템" meta="System" />
              <p className="m-0 mb-5 max-w-[62ch] text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
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
              <SectionHead no="04" title="운영 근거" meta="Operating Evidence" />
              <p className="m-0 mb-5 max-w-[62ch] text-base text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg">
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

          <CaseRail cases={CASES} currentSlug={slug} />
        </div>
      </Container>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
