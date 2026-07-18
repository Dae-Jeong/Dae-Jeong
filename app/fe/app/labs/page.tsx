import type { Metadata } from "next";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Banner } from "@/components/ui/banner";
import { SectionHead } from "@/components/ui/section-head";
import { ENTRIES, REGISTERED, type LabEntry } from "./entries";

export const metadata: Metadata = {
  title: "Labs — 김대정 · Backend Engineer",
  description: "사이트 내장 기능과 독립 서비스의 관문 — 등록형 registry",
};

const KIND_LABEL: Record<LabEntry["kind"], string> = {
  feature: "Feature",
  service: "Service",
  "feature+backend": "Feature + Backend",
};

function EntryCard({ entry, index }: { entry: LabEntry; index: number }) {
  return (
    <article className="grid min-h-[210px] content-start gap-4 bg-bg p-6">
      <div className="flex items-center gap-3">
        <span className="bg-accent px-2 py-0.5 font-mono text-sm tracking-[0.04em] text-accent-on">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="ml-auto border border-border px-[7px] py-0.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          {KIND_LABEL[entry.kind]}
        </span>
        <span className="border border-current px-[7px] py-0.5 font-mono text-xs uppercase tracking-[0.08em] text-warn">
          {entry.status === "building" ? "Building" : "Live"}
        </span>
      </div>
      <div className="grid gap-2">
        <span className="font-mono text-xl font-semibold tracking-[-0.01em]">
          {entry.title}
        </span>
        <span className="text-sm leading-[1.55] text-fg-2">{entry.desc}</span>
      </div>
      <div className="mt-auto flex items-center gap-3 font-mono text-xs tracking-[0.04em] text-muted">
        <span>→ {entry.dest}</span>
        {!entry.live && (
          <span className="ml-auto border border-border px-2 py-0.5">준비 중</span>
        )}
      </div>
    </article>
  );
}

export default function LabsPage() {
  return (
    <>
      <TopBar variant="subpage" crumb="Labs" />

      <Container variant="doc" className="flex-1 pb-24">
        <section className="border-b-2 border-fg pb-8 pt-14">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            Labs · 기능·서비스 관문
          </span>
          <h1 className="mt-3 font-mono text-3xl font-semibold leading-[1.06] tracking-[-0.025em]">
            Labs
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg font-medium">
            사이트에 내장한 경량 기능과 독립적으로 돌아가는 서비스를 모아 두는 곳.
            등록된 entry의 metadata만 읽어 목록으로 세웁니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs tracking-[0.04em] text-muted">
            <span>
              ENTRIES <b className="font-semibold text-fg">{REGISTERED} registered</b>
            </span>
            <span>
              KINDS <b className="font-semibold text-fg">feature · service</b>
            </span>
            <span>
              STATE <b className="font-semibold text-fg">준비 중</b>
            </span>
          </div>
        </section>

        <section className="pt-12">
          <SectionHead
            no="01"
            title="Entries"
            meta={`registered · ${REGISTERED}${REGISTERED === 0 ? " (데모 표시)" : ""}`}
          />

          <div className="grid grid-cols-2 gap-px border border-border-soft bg-border-soft max-md:grid-cols-1">
            {ENTRIES.map((e, i) => (
              <EntryCard key={e.id} entry={e} index={i} />
            ))}
            <article className="grid min-h-[210px] place-items-center gap-2 bg-surface p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Slot · empty
              </span>
              <span className="max-w-[32ch] text-sm text-muted">
                앞으로 만드는 기능·서비스가 등록형으로 이 자리에 채워집니다.
              </span>
            </article>
          </div>

          {REGISTERED === 0 && (
            <Banner tag="Coming soon" variant="warn" className="mt-8">
              등록된 entry는 <b>현재 0건</b>입니다. 위 <b>jarvis</b>는 목록이 어떤
              모양이 될지 보여주는 <b>데모(BUILDING)</b>이며, 실제 진입은 아직 열리지
              않습니다.
            </Banner>
          )}
        </section>

        <section className="pt-12">
          <SectionHead no="02" title="Entry 두 종류" meta="확정 spec" />
          <div className="border border-border">
            <div className="border-b border-border bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              목록은 entry metadata(title · kind · date · status)만 읽습니다
            </div>
            <div className="grid grid-cols-2 gap-px bg-border-soft max-md:grid-cols-1">
              {[
                {
                  k: "feature",
                  badge: "site 내장",
                  desc: "사이트 안에서 도는 경량 기능. 카드에서 /labs/{id} 상세로 진입합니다.",
                },
                {
                  k: "service",
                  badge: "subdomain",
                  desc: "독립적으로 돌아가는 서비스. 카드에서 {svc}.marinkim.xyz를 새 탭으로 “열기”합니다.",
                },
              ].map((c) => (
                <div key={c.k} className="grid content-start gap-2 bg-bg p-5">
                  <div className="flex items-center gap-2">
                    <b className="font-mono text-sm font-semibold">{c.k}</b>
                    <span className="border border-border px-1.5 py-px font-mono text-xs uppercase tracking-[0.08em] text-muted">
                      {c.badge}
                    </span>
                  </div>
                  <p className="m-0 text-sm text-fg-2">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
