/* 인라인 반전 칩 — career 의 NOW 등 현재/강조 상태 표기 */
export function Badge({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`ml-2 inline-block bg-accent px-1.5 py-px align-[1px] font-mono text-[10px] tracking-[0.06em] text-accent-on ${className}`}
    >
      {children}
    </span>
  );
}
