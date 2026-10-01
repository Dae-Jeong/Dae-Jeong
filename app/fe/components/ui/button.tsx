import { cn } from "@/lib/cn";

/* D3 확정 (2026-07-18): accent-fill 은 전부 Button — Chip 은 bordered 전용 */
const BASE =
  "focus-ring inline-flex items-center gap-2 whitespace-nowrap border border-accent bg-accent px-3.5 py-2 " +
  "font-mono text-xs font-medium tracking-[0.04em] text-accent-on " +
  "transition-colors duration-100 hover:bg-accent-hover active:bg-accent-active";

export function Button({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={cn(BASE, className)}>
      {children}
    </a>
  );
}
