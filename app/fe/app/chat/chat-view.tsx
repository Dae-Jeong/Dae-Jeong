"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/* Phase 2 프리뷰 — 입력 비활성, suggestion 클릭 시 확정 데모 대화 표시.
   대화 문장·claim id 는 확정 프로토타입(chat-page-v2) 그대로 (창작 금지) */

const SUGGESTIONS = [
  "김대정은 어떤 엔지니어인가요?",
  "Thready에서 어떤 기여를 했는지 자세히 알려주세요.",
  "인프라 운영 범위는 어디까지인가요?",
];

const RAIL_CLAIMS = [
  {
    id: "career.medisolve-role-evolution",
    desc: "Backend Engineer 합류 후 Tech Lead·PO 역할 병행",
  },
  { id: "thready.backend-rebuild", desc: "backend 전면 재구축과 이후 개발·운영 전담" },
  {
    id: "thready.generation-quality-system",
    desc: "typed prompt builder·LLM judge 기반 생성 품질 시스템",
  },
  {
    id: "thready.production-operation-quality",
    desc: "월 수만 건 규모 요청, HTTP 5xx 0.3% 수준 운영",
  },
];

function Evidence({ ids }: { ids: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {ids.map((id) => (
        <span
          key={id}
          className="border border-border-soft px-1.5 py-0.5 font-mono text-[10px] text-muted"
        >
          {id}
        </span>
      ))}
    </div>
  );
}

function Related({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {items.map((r) => (
        <Link
          key={r.label}
          href={r.href}
          className="focus-ring border border-fg px-2.5 py-1.5 font-mono text-xs text-fg transition-colors duration-100 hover:bg-fg hover:text-accent-on"
        >
          {r.label}
        </Link>
      ))}
    </div>
  );
}

function VisitorMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-right font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        Visitor
      </span>
      <div className="max-w-[72%] justify-self-end bg-surface px-4 py-3 text-base">
        {children}
      </div>
    </div>
  );
}

function AgentMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        Profile Agent
      </span>
      <div className="max-w-[62ch] border-l-2 border-fg py-1 pl-4 text-fg-2 [&_p]:m-0 [&_p]:mb-2.5 [&_p:last-of-type]:mb-0">
        {children}
      </div>
    </div>
  );
}

export function ChatView() {
  const [demo, setDemo] = useState(false);

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1180px] flex-1 grid-cols-[minmax(0,1fr)_280px] gap-10 px-4 md:px-7 max-lg:grid-cols-1">
        {!demo ? (
          /* — STATE 01 · 빈 대화 (첫 진입) — */
          <main aria-label="첫 진입 안내" className="pb-44 pt-12">
            <div className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Profile Agent
            </div>
            <h2 className="mt-3 max-w-[26ch] text-2xl font-semibold leading-[1.3]">
              김대정의 이력·포트폴리오를 근거와 함께 답하는 프로필 에이전트입니다.
            </h2>
            <p className="mt-3 max-w-[52ch] text-base text-fg-2">
              검증된 claim registry의 public 표현만 사용해 답합니다. 아래 질문으로
              시작하거나, 직접 물어보세요.
            </p>

            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              이런 걸 물어볼 수 있어요
            </div>
            <div className="mt-2 grid max-w-[520px]">
              {SUGGESTIONS.map((q, i) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setDemo(true)}
                  className={cn(
                    "focus-ring flex cursor-pointer items-baseline gap-3 border-t border-border-soft bg-bg py-3.5 text-left text-base transition-colors duration-100 hover:bg-surface",
                    i === 0 && "border-t-0",
                  )}
                >
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q}
                  <span aria-hidden className="ml-auto font-mono text-muted">
                    →
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] text-muted">
              suggestion 클릭 시 데모 대화가 표시됩니다 — 실제 응답은 Phase 2에서.
            </p>
          </main>
        ) : (
          /* — STATE 02 · 진행 대화 (확정 데모 문답) — */
          <main aria-label="대화" className="grid content-start gap-6 pb-44 pt-9">
            <button
              type="button"
              onClick={() => setDemo(false)}
              className="focus-ring justify-self-start font-mono text-xs text-muted hover:text-fg"
            >
              ← 처음으로
            </button>

            <VisitorMsg>김대정은 어떤 엔지니어인가요?</VisitorMsg>
            <AgentMsg>
              <p>
                AI 제품을 운영 가능한 시스템으로 만드는 백엔드 엔지니어입니다.
                FastAPI/NestJS 기반 product backend, AI generation quality,
                async/realtime processing, Azure/Terraform deployment를 다뤄왔고, 제품
                운영과 engineering standard를 agent-readable workflow로 구조화합니다.
              </p>
              <p>
                MediSolve AI에 Backend Engineer로 합류한 뒤 Tech Lead·PO 역할을
                병행하고 있습니다.
              </p>
              <Evidence ids={["profile.identity", "career.medisolve-role-evolution"]} />
              <Related
                items={[
                  { label: "→ Resume 전체 보기", href: "/resume" },
                  { label: "→ Portfolio · case 5건", href: "/portfolio" },
                ]}
              />
            </AgentMsg>

            <VisitorMsg>Thready에서 어떤 기여를 했는지 자세히 알려주세요.</VisitorMsg>
            <AgentMsg>
              <p>
                AI 콘텐츠 생성 backend를 전면 재구축하고, cutover 이후 개발·운영을
                전담했습니다. release·QA·task 구조 기반으로 backend를 운영합니다.
              </p>
              <p>
                생성 품질은 감이 아니라 시스템으로 다룹니다 — typed prompt builder,
                LLM judge, 평가 루프, 관측 로깅으로 품질 시스템을 구축했습니다. 현재
                월 수만 건 규모 요청을 HTTP 5xx 0.3% 수준으로 운영하고 있습니다.
              </p>
              <p>
                더 깊은 배경과 트레이드오프는{" "}
                <Link
                  href="/portfolio/thready"
                  className="text-fg underline underline-offset-[3px]"
                >
                  Portfolio의 Thready case
                </Link>
                에 정리돼 있습니다.
              </p>
              <Evidence
                ids={[
                  "thready.backend-rebuild",
                  "thready.generation-quality-system",
                  "thready.release-operation",
                  "thready.production-operation-quality",
                ]}
              />
              <Related items={[{ label: "→ Thready Rebuild · CASE", href: "/portfolio/thready" }]} />
            </AgentMsg>
          </main>
        )}

        {/* — 근거 rail — */}
        <aside
          aria-label="이 대화의 근거"
          className="sticky top-0 self-start border-l border-border-soft py-12 pl-7 max-lg:hidden"
        >
          <h3 className="m-0 mb-3.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            이 대화의 근거
          </h3>
          {!demo ? (
            <p className="m-0 text-xs text-muted">
              질문을 시작하면 답변에 사용된 claim이 여기에 순서대로 쌓입니다.
            </p>
          ) : (
            <ul className="m-0 grid list-none gap-3 p-0">
              {RAIL_CLAIMS.map((c) => (
                <li key={c.id} className="grid gap-0.5 border-t border-border-soft pt-2.5">
                  <span className="font-mono text-[10px] text-fg">{c.id}</span>
                  <span className="text-xs text-muted">{c.desc}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="m-0 mt-4 font-mono text-[10px] leading-relaxed text-muted">
            답변은 검증된 claim registry의 public 표현만 사용합니다. 근거 없는
            질문에는 curated Q&amp;A로 대체하거나 모른다고 답합니다.
          </p>
        </aside>
      </div>

      {/* — Composer · 하단 고정 (Phase 2 비활성) — */}
      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-bg from-30% to-transparent pb-5 pt-6">
        <div className="mx-auto flex max-w-[820px] gap-2 px-4 md:px-7">
          <input
            type="text"
            disabled
            placeholder="질문 입력 — Phase 2에서 열립니다"
            className="min-w-0 flex-1 border border-border bg-surface px-4 py-3.5 text-base text-muted placeholder:text-muted"
          />
          <button
            disabled
            className="bg-accent px-5 font-mono text-sm text-accent-on opacity-65"
          >
            SEND
          </button>
        </div>
        <p className="mx-auto mt-1.5 max-w-[820px] px-4 font-mono text-[10px] tracking-[0.06em] text-muted md:px-7">
          PHASE 2 PREVIEW · 입력은 아직 열리지 않았습니다
        </p>
      </div>
    </>
  );
}
