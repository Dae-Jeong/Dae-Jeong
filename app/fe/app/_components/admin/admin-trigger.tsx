"use client";
import { useRef, type ReactNode } from "react";
const ACTIVATIONS = 5;
const WINDOW_MS = 1500;
export function AdminTrigger({
  children,
  disabled,
  onActivate,
}: {
  children: ReactNode;
  disabled: boolean;
  onActivate: () => void;
}) {
  const count = useRef(0);
  const last = useRef(0);
  const activate = () => {
    if (disabled) return;
    const now = Date.now();
    count.current = now - last.current > WINDOW_MS ? 1 : count.current + 1;
    last.current = now;
    if (count.current < ACTIVATIONS) return;
    count.current = 0;
    onActivate();
  };

  return (
    <button
      type="button"
      onClick={activate}
      data-admin-trigger
      className="m-0 cursor-text touch-manipulation select-text appearance-none border-0 bg-transparent p-0 font-[inherit] text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
    >
      {children}
    </button>
  );
}
