import { cn } from "@/lib/cn";

/* D3 확정 (2026-07-18): Chip 은 bordered 전용 — fill 이 필요하면 Button 을 쓴다 */
export function Chip({
  href,
  external,
  className = "",
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={cn(
        "focus-ring inline-flex items-center border border-border font-mono text-xs transition-colors duration-100",
        "px-[9px] py-[5px] tracking-[0.03em] text-fg-2 hover:border-fg hover:text-fg",
        className,
      )}
    >
      {children}
    </a>
  );
}
