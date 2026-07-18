"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ROUTES: { no: string; label: string; href: string }[] = [
  { no: "01", label: "Portfolio", href: "/portfolio" },
  { no: "02", label: "Blog", href: "/blog" },
  { no: "03", label: "Labs", href: "/labs" },
  { no: "04", label: "Resume", href: "/resume" },
];

/* 시각부 — specimen 정적 렌더에서 재사용. 크기·배치는 wrapper 가 소유한다 */
export function MobileNavPanel({
  onClose,
  onNavigate,
  closeButtonRef,
  className = "",
}: {
  onClose?: () => void;
  onNavigate?: () => void;
  closeButtonRef?: React.Ref<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-rows-[56px_1fr_auto] bg-fg text-accent-on",
        className,
      )}
    >
      <div className="flex items-center border-b border-white/15 px-4">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold">
          <span aria-hidden className="size-2 bg-accent-on" />
          marinkim.xyz
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="focus-ring ml-auto cursor-pointer border border-white/40 bg-transparent px-[9px] py-1 font-mono text-xs tracking-[0.08em] text-accent-on"
        >
          CLOSE
        </button>
      </div>
      <nav aria-label="모바일 메뉴" className="grid content-start self-start p-6">
        {ROUTES.map((r, i) => (
          <a
            key={r.no}
            href={r.href}
            onClick={onNavigate}
            className={cn(
              "focus-ring flex items-baseline gap-3 border-t border-white/15 py-3.5 font-mono text-xl",
              i === 0 && "border-t-0",
            )}
          >
            <span className="font-mono text-xs text-white/50">{r.no}</span>
            {r.label}
          </a>
        ))}
      </nav>
      <div className="border-t border-white/15 p-4 font-mono text-xs tracking-[0.06em] text-white/60">
        ESC · CLOSE 로 닫힘
      </div>
    </div>
  );
}

/* D3 확정: ≤720px 풀스크린 오버레이 (잉크 반전) — topnav display:none 구멍 대응.
   행동 계약: open 시 CLOSE 로 focus, ESC 닫기, close 시 MENU 트리거 복귀, 스크롤 잠금 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="focus-ring hidden cursor-pointer border border-border bg-bg px-[9px] py-1 font-mono text-xs tracking-[0.08em] max-[720px]:inline-flex"
      >
        MENU
      </button>
      {open && (
        <div data-state="open" className="fixed inset-0 z-70">
          <MobileNavPanel
            className="h-full"
            onClose={() => setOpen(false)}
            onNavigate={() => setOpen(false)}
            closeButtonRef={closeRef}
          />
        </div>
      )}
    </>
  );
}
