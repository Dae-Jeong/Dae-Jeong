"use client";

import { PRIMARY_NAV } from "@/lib/routes";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type NavigationControls = {
  currentPath: string;
  extraLinks?: readonly { href: string; label: string }[];
  action?: { label: string; onClick: () => void; error?: string };
};

/* 열린 dialog 안의 표시부. 링크 이동과 CLOSE 모두 onClose 로 닫는다 */
function MobileNavPanel({
  onClose,
  closeButtonRef,
  currentPath,
  extraLinks = [],
  action,
}: {
  onClose: () => void;
  closeButtonRef: React.Ref<HTMLButtonElement>;
} & NavigationControls) {
  return (
    <div className="grid grid-rows-[56px_1fr_auto] bg-fg text-accent-on min-h-full overflow-y-auto">
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
      <nav
        aria-label="모바일 메뉴"
        className="grid content-start self-start p-6"
      >
        {[...PRIMARY_NAV, ...extraLinks].map((route, index) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={onClose}
            prefetch={false}
            aria-current={route.href === currentPath ? "page" : undefined}
            className={cn(
              "focus-ring flex items-baseline gap-3 border-t border-white/15 py-3.5 font-mono text-xl",
              index === 0 && "border-t-0",
            )}
          >
            <span className="font-mono text-xs text-white/50">{String(index + 1).padStart(2, "0")}</span>
            {route.label}
          </Link>
        ))}
        {action && <>
          <button type="button" onClick={action.onClick} className="focus-ring flex min-h-11 items-center border-t border-white/15 py-3.5 text-left font-mono text-xl">{action.label}</button>
          {action.error && <p role="alert" className="py-2 text-sm">{action.error}</p>}
        </>}
      </nav>
      <div className="border-t border-white/15 p-4 font-mono text-xs tracking-[0.06em] text-white/60">
        ESC · CLOSE 로 닫힘
      </div>
    </div>
  );
}

/* D3 확정: ≤720px 풀스크린 오버레이 (잉크 반전) — topnav display:none 구멍 대응.
   행동 계약: open 시 CLOSE 로 focus, ESC 닫기, close 시 MENU 트리거 복귀, 스크롤 잠금 */
export function MobileNav(controls: NavigationControls) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    dialog?.showModal();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && dialog) {
        const targets = dialog.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)");
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const onResize = () => { if (window.innerWidth > 720) setOpen(false); };
    window.addEventListener("resize", onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
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
      <dialog ref={dialogRef} aria-label="모바일 메뉴" onCancel={(event) => { event.preventDefault(); setOpen(false); }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 p-0 backdrop:bg-black/40">
      {open && (
          <MobileNavPanel
            {...controls}
            onClose={() => setOpen(false)}
            closeButtonRef={closeRef}
          />
      )}
      </dialog>
    </>
  );
}
