import { cn } from "@/lib/cn";

/* D3 확정 (2026-07-18): Chip 은 bordered 전용 — fill 이 필요하면 Button 을 쓴다 */
type ChipProps = {
  variant?: "link" | "status" | "contact";
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

const VARIANT = {
  link: "gap-2 px-[13px] py-[9px] tracking-[0.03em] text-fg hover:border-fg hover:bg-surface",
  status: "gap-2 px-2.5 py-1 tracking-[0.06em] text-fg-2",
  contact: "px-[9px] py-[5px] tracking-[0.03em] text-fg-2 hover:border-fg hover:text-fg",
};

export function Chip({
  variant = "link",
  href,
  external,
  className = "",
  children,
}: ChipProps) {
  const cls = cn(
    "focus-ring inline-flex items-center border border-border font-mono text-xs transition-colors duration-100",
    VARIANT[variant],
    className,
  );
  const content = (
    <>
      {variant === "status" && (
        <span aria-hidden className="size-1.5 rounded-full bg-success" />
      )}
      {children}
    </>
  );
  if (href !== undefined) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        className={cls}
      >
        {content}
      </a>
    );
  }
  return <span className={cls}>{content}</span>;
}
