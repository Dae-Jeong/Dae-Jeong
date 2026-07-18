"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* 시각부 — claim 요약 카드. specimen 정적 렌더에서 재사용 */
export function PopoverCard({
  claim,
  source,
  href,
  onClose,
  className = "",
}: {
  claim: string;
  source: string;
  href?: string;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div
      data-state="open"
      className={cn(
        "relative w-[min(300px,100%)] border border-fg bg-bg shadow-[0_16px_40px_rgba(0,0,0,0.10)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-[6px] left-[22px] size-[10px] rotate-45 border-l border-t border-fg bg-bg"
      />
      <div className="flex items-center gap-2 border-b border-border px-[13px] py-[9px] font-mono text-xs uppercase tracking-[0.08em] text-muted">
        Claim 요약
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="focus-ring ml-auto cursor-pointer font-mono text-muted hover:text-fg"
        >
          ×
        </button>
      </div>
      <div className="grid gap-2 px-[13px] py-3">
        <span className="text-sm font-medium text-fg">{claim}</span>
        <span className="font-mono text-xs tracking-[0.03em] text-muted">
          SOURCE · {source}
        </span>
      </div>
      {href && (
        <a
          href={href}
          className="focus-ring block border-t border-border-soft px-[13px] py-[9px] font-mono text-xs text-fg hover:underline hover:underline-offset-[3px]"
        >
          → 케이스 상세로 이동
        </a>
      )}
    </div>
  );
}

/* evidence chip → claim 요약 popover — chat 3층 답변 구조의 일부.
   행동: 클릭 토글 · 바깥 클릭 · ESC 닫기 */
export function EvidencePopover({
  index,
  label,
  claim,
  source,
  href,
}: {
  /** "근거 2" 형태의 인덱스 */
  index: string;
  label: string;
  claim: string;
  source: string;
  href?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-grid justify-items-start">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring inline-flex cursor-pointer items-center gap-1.5 border border-fg px-[11px] py-1.5 font-mono text-xs tracking-[0.03em]"
      >
        <span className="text-muted">{index}</span>
        {label}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2.5">
          <PopoverCard
            claim={claim}
            source={source}
            href={href}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
