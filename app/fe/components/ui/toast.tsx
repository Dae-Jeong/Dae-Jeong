"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const AUTO_DISMISS_MS = 4000;

type ToastVariant = "success" | "danger";
type ToastItem = { id: number; message: string; variant: ToastVariant };
type Listener = (items: ToastItem[]) => void;

let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<Listener>();
function emit() {
  listeners.forEach((l) => l([...items]));
}

/** 어디서든 호출 — Toaster 가 마운트돼 있어야 렌더된다 */
export function toast(message: string, variant: ToastVariant = "success") {
  const id = nextId++;
  items = [...items, { id, message, variant }];
  emit();
  setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
}

function dismiss(id: number) {
  items = items.filter((t) => t.id !== id);
  emit();
}

/* 시각부 — specimen 정적 렌더에서 재사용. 진행 바 duration 은 AUTO_DISMISS_MS 와 동기 */
export function Toast({
  message,
  variant = "success",
  onClose,
  className = "",
}: {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "relative inline-flex max-w-[360px] items-center gap-3 overflow-hidden bg-fg px-4 py-2.5 font-mono text-xs tracking-[0.03em] text-accent-on shadow-[0_16px_40px_rgba(0,0,0,0.10)]",
        variant === "danger" && "bg-danger",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-[7px] flex-none rounded-full bg-accent-on",
          variant === "success" &&
            "bg-success shadow-[0_0_0_3px_color-mix(in_srgb,var(--success)_30%,transparent)]",
        )}
      />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex-none cursor-pointer font-mono opacity-70 hover:opacity-100"
        >
          ×
        </button>
      )}
      <span
        aria-hidden
        className="toast-bar absolute bottom-0 left-0 h-0.5 w-full bg-white/35"
      />
    </div>
  );
}

/* D1 확정: 상단 중앙 스택 — AskLauncher(우하단) 회피, sticky topbar 아래 빈 축 */
export function Toaster() {
  const [list, setList] = useState<ToastItem[]>([]);
  useEffect(() => {
    const l: Listener = setList;
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  if (!list.length) return null;
  return (
    <div className="fixed left-1/2 top-[70px] z-80 grid -translate-x-1/2 justify-items-center gap-2">
      {list.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          variant={t.variant}
          onClose={() => dismiss(t.id)}
        />
      ))}
    </div>
  );
}
