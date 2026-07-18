"use client";

import { useState } from "react";

/* Tailwind v4 는 @theme 토큰을 :root custom property 로 방출한다 —
   여기 값은 렌더 시점 getComputedStyle 실값이라 문서·코드 괴리가 불가능하다.
   (accent-hover/active 는 color-mix 파생이라 목록에서 제외) */
const COLORS = [
  "bg",
  "surface",
  "surface-warm",
  "fg",
  "fg-2",
  "muted",
  "border",
  "border-soft",
  "accent",
  "accent-on",
  "success",
  "warn",
  "danger",
] as const;

/* Tailwind 가 소스에서 클래스명을 정적 스캔하므로 리터럴 맵으로 둔다 */
const TYPE_SCALE: { token: string; cls: string }[] = [
  { token: "--text-xs", cls: "text-xs" },
  { token: "--text-sm", cls: "text-sm" },
  { token: "--text-base", cls: "text-base" },
  { token: "--text-lg", cls: "text-lg" },
  { token: "--text-xl", cls: "text-xl" },
  { token: "--text-2xl", cls: "text-2xl" },
  { token: "--text-3xl", cls: "text-3xl" },
  { token: "--text-4xl", cls: "text-4xl" },
];

export function ColorTokens() {
  const [values, setValues] = useState<Record<string, string> | null>(null);
  return (
    <div
      ref={(el) => {
        if (!el || values) return;
        const cs = getComputedStyle(document.documentElement);
        setValues(
          Object.fromEntries(
            COLORS.map((n) => [n, cs.getPropertyValue(`--${n}`).trim()]),
          ),
        );
      }}
      className="grid grid-cols-2 gap-px border border-border-soft bg-border-soft sm:grid-cols-3 lg:grid-cols-4">
      {COLORS.map((n) => (
        <div key={n} className="grid content-start gap-2 bg-bg p-4">
          <span
            className="h-10 border border-border-soft"
            style={{ background: `var(--${n})` }}
          />
          <span className="font-mono text-xs">--{n}</span>
          <span className="font-mono text-[10px] text-muted">
            {values?.[n] || "…"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TypeTokens() {
  const [sizes, setSizes] = useState<Record<string, string>>({});
  return (
    <div className="grid border-t border-border-soft">
      {TYPE_SCALE.map(({ token, cls }) => (
        <div
          key={token}
          className="grid grid-cols-[110px_1fr_auto] items-baseline gap-4 border-b border-border-soft py-3 max-sm:grid-cols-[90px_1fr_auto]"
        >
          <span className="font-mono text-[10px] text-muted">{token}</span>
          <span
            ref={(el) => {
              if (el && !sizes[token]) {
                const size = getComputedStyle(el).fontSize;
                setSizes((s) => (s[token] ? s : { ...s, [token]: size }));
              }
            }}
            className={`${cls} truncate font-mono`}
          >
            김대정 Backend 0123
          </span>
          <span className="font-mono text-[10px] text-muted">
            {sizes[token] || "…"}
          </span>
        </div>
      ))}
    </div>
  );
}
