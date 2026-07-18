"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/* 페이지 상단 고지 라인. 기본형은 dismiss 가능, warn 형은 dismiss 불가
   (사용자가 넘겨선 안 되는 고지 — Carbon Passive/Transactional 구분과 동일 사고) */
export function Banner({
  tag,
  variant = "default",
  className = "",
  children,
}: {
  tag: string;
  variant?: "default" | "warn";
  className?: string;
  children: React.ReactNode;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const warn = variant === "warn";
  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-border bg-surface px-4 py-2.5 font-mono text-xs tracking-[0.03em] text-fg-2",
        "[&_b]:font-semibold [&_b]:text-fg",
        warn &&
          "border-warn bg-[color-mix(in_srgb,var(--warn)_7%,var(--bg))] text-warn",
        className,
      )}
    >
      <span className="flex-none border border-current px-[7px] py-0.5 text-xs uppercase tracking-[0.08em]">
        {tag}
      </span>
      <span className="text-fg-2">{children}</span>
      {!warn && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="고지 닫기"
          className="focus-ring ml-auto flex-none cursor-pointer border border-border bg-transparent px-[7px] py-px font-mono text-muted hover:border-fg hover:text-fg"
        >
          ×
        </button>
      )}
    </div>
  );
}
