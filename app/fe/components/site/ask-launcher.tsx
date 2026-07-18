"use client";

import { useState } from "react";
import Link from "next/link";

const SUGGESTED = [
  "김대정은 어떤 엔지니어인가요?",
  "Thready에서 어떤 기여를 했나요?",
  "AI agent를 실무에 어떻게 쓰나요?",
];

/* 패널 본체 — specimen 시트에서도 정적 렌더로 재사용한다 */
export function AskPanel() {
  return (
    <div
      role="dialog"
      aria-label="Ask 미니 패널"
      className="w-[min(340px,calc(100vw-32px))] border border-border bg-bg shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
    >
      <div className="flex items-center gap-2.5 bg-accent px-3.5 py-[11px] font-mono text-xs uppercase tracking-[0.08em] text-accent-on">
        Ask · 프로필과 대화
        <span className="ml-auto border border-white/40 px-[7px] py-0.5 text-xs normal-case">
          PHASE 2 PREVIEW
        </span>
      </div>
      <div className="grid gap-2.5 p-3.5">
        <p className="text-sm text-fg-2">
          안녕하세요 — 김대정의 프로필 agent입니다. 무엇이 궁금하세요?
        </p>
        {/* 질문 클릭 → /chat 직행 (죽은 버튼 금지 — 페르소나 검토 반영) */}
        {SUGGESTED.map((q) => (
          <Link
            key={q}
            href="/chat"
            className="focus-ring border border-border bg-bg px-2.5 py-2 text-left text-xs text-fg-2 transition-colors duration-100 hover:border-fg hover:text-fg"
          >
            {q}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-border-soft px-3.5 py-3">
        <input
          type="text"
          disabled
          placeholder="질문 입력 — Phase 2에서 열립니다"
          className="min-w-0 flex-1 border border-border bg-surface px-[11px] py-[9px] text-sm text-muted placeholder:text-muted"
        />
        <Link
          href="/chat"
          className="focus-ring whitespace-nowrap font-mono text-xs text-muted"
        >
          전체 대화 → /chat
        </Link>
      </div>
    </div>
  );
}

export function AskLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-50 grid justify-items-end gap-2.5 sm:bottom-6 sm:right-6">
      {open && <AskPanel />}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring inline-flex cursor-pointer items-center gap-2 bg-accent px-[18px] py-3.5 font-mono text-sm tracking-[0.08em] text-accent-on shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-colors duration-100 hover:bg-accent-hover"
      >
        {open ? "× CLOSE" : "ASK"}
      </button>
    </div>
  );
}
