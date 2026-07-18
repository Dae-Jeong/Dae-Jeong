import type { Metadata } from "next";
import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Banner } from "@/components/ui/banner";
import { SectionHead } from "@/components/ui/section-head";
import { POSTS } from "./posts";

export const metadata: Metadata = {
  title: "Blog — 김대정 · Backend Engineer",
  description: "판단 과정과 운영 경험 기록",
};

const ROW =
  "grid grid-cols-[116px_minmax(0,1fr)_220px] items-baseline gap-5 border-b border-border px-1 py-5 max-md:grid-cols-1 max-md:gap-2";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-border px-[7px] py-0.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
      {children}
    </span>
  );
}

export default function BlogPage() {
  return (
    <>
      <TopBar variant="subpage" crumb="Blog" />

      <Container variant="doc" className="flex-1 pb-24">
        <section className="border-b-2 border-fg pb-8 pt-14">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            Blog · 글 목록
          </span>
          <h1 className="mt-3 font-mono text-3xl font-semibold leading-[1.06] tracking-[-0.025em]">
            Blog
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg font-medium">
            판단 과정과 운영 경험 기록. 무엇을 왜 그렇게 정했고, 이후 운영에서
            무엇을 겪었는지를 글 단위로 남깁니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs tracking-[0.04em] text-muted">
            <span>
              POSTS <b className="font-semibold text-fg">{POSTS.length} published</b>
            </span>
            <span>
              FORMAT <b className="font-semibold text-fg">MDX</b>
            </span>
            <span>
              ROW <b className="font-semibold text-fg">날짜 · 제목 · 태그 · 요약</b>
            </span>
          </div>
        </section>

        <section className="pt-12">
          <SectionHead
            no="01"
            title="Posts"
            meta={`published · ${POSTS.length}${POSTS.length === 0 ? " (구조 데모)" : ""}`}
          />

          <div>
            {POSTS.length === 0 ? (
              /* 가짜 글 금지 — 제목 자리에 구조 라벨, 날짜 자리에 [준비 중] */
              <div className={`${ROW} text-muted`}>
                <span className="font-mono text-sm tracking-[0.04em]">[준비 중]</span>
                <span className="grid gap-1.5">
                  <span className="font-mono text-lg font-semibold tracking-[-0.01em]">
                    글 행 구조 — 제목 · 날짜 · 태그 · 한 줄 요약
                    <span className="ml-2 inline-block border border-warn px-[7px] py-0.5 align-[2px] font-mono text-xs uppercase tracking-[0.08em] text-warn">
                      Placeholder
                    </span>
                  </span>
                  <span className="text-sm">
                    발행 글이 등록되면 이 행에 제목, 좌측에 날짜, 우측에 태그, 아래 한
                    줄 요약이 채워집니다. 지금은 형태만 보여주는 자리입니다.
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5 max-md:justify-start md:justify-end">
                  <Tag>tag</Tag>
                  <Tag>tag</Tag>
                </span>
              </div>
            ) : (
              POSTS.map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className={`${ROW} focus-ring hover:bg-surface`}>
                  <span className="font-mono text-sm tracking-[0.04em] text-muted">{p.date}</span>
                  <span className="grid gap-1.5">
                    <span className="font-mono text-lg font-semibold tracking-[-0.01em]">
                      {p.title}
                    </span>
                    <span className="text-sm text-fg-2">{p.summary}</span>
                  </span>
                  <span className="flex flex-wrap gap-1.5 md:justify-end">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </span>
                </a>
              ))
            )}
          </div>

          {POSTS.length === 0 && (
            <Banner tag="Coming soon" variant="warn" className="mt-8">
              발행된 글은 <b>현재 0건</b>입니다. 위 행은 <b>글 행의 구조를 보여주는
              placeholder</b>이며, 실제 글 제목이 아닙니다.
            </Banner>
          )}
        </section>
      </Container>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
