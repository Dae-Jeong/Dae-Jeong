/* D3 확정 (2026-07-18): accent-fill 은 전부 Button — Chip 은 bordered 전용 */
type ButtonProps = {
  href?: string;
  external?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const BASE =
  "focus-ring inline-flex items-center gap-2 whitespace-nowrap border border-accent bg-accent px-3.5 py-2 " +
  "font-mono text-xs font-medium tracking-[0.04em] text-accent-on " +
  "transition-colors duration-100 hover:bg-accent-hover active:bg-accent-active " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-65";

export function Button({
  href,
  external,
  disabled,
  title,
  className = "",
  children,
}: ButtonProps) {
  const cls = `${BASE} ${className}`;
  if (href !== undefined) {
    return (
      <a
        href={href}
        title={title}
        aria-disabled={disabled}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" title={title} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
