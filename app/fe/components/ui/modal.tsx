"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* 시각부 — specimen 정적 렌더에서 재사용. 행동은 Modal 이 소유한다 */
export function ModalPanel({
  title,
  onClose,
  className = "",
  children,
}: {
  title: string;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn(
        "w-[min(440px,100%)] border border-fg bg-bg shadow-[0_16px_40px_rgba(0,0,0,0.10)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.08em]">
        {title}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="focus-ring ml-auto cursor-pointer border border-border bg-bg px-2 py-0.5 font-mono text-sm text-muted hover:border-fg hover:text-fg"
        >
          ×
        </button>
      </div>
      <div className="grid gap-3 p-5">{children}</div>
    </div>
  );
}

/* 행동 계약: ESC·backdrop·× 닫기 / open 시 초기 focus / close 시 트리거 복귀 / Tab trap.
   backdrop 은 D2 확정 — rgba(17,17,17,.55) 단색 반투명, blur 미사용 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      data-state="open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-60 grid place-items-center bg-[rgba(17,17,17,0.55)] p-5"
    >
      <div ref={panelRef} className="contents">
        <ModalPanel title={title} onClose={onClose}>
          {children}
        </ModalPanel>
      </div>
    </div>
  );
}
