"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* reveal-on-scroll — IntersectionObserver + prefers-reduced-motion 대응.
   스타일은 globals.css 의 .reveal / .stagger 가 소유한다 */
export function Reveal({
  stagger = false,
  className = "",
  children,
}: {
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (stagger) {
            Array.from(el.children).forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay =
                `${Math.min(i * 55, 330)}ms`;
            });
          }
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={cn(stagger ? "stagger" : "reveal", className)}>
      {children}
    </div>
  );
}
