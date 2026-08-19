import { cn } from "@/lib/cn";

/* 좌측 mono 라벨 컬럼 + 텍스트 행 — 순번 56px / record metadata 150px */
const COLS = {
  sm: "grid-cols-[40px_1fr] sm:grid-cols-[56px_1fr]",
  "sm-t": "grid-cols-[40px_1fr_auto] sm:grid-cols-[56px_1fr_auto]",
  md: "grid-cols-[110px_1fr]",
  "md-t": "grid-cols-[110px_1fr_auto]",
  lg: "max-sm:grid-cols-1 grid-cols-[150px_1fr]",
  "lg-t": "max-sm:grid-cols-1 grid-cols-[150px_1fr_auto]",
};

export function NumberedList({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <ol className={cn("m-0 grid list-none p-0", className)}>{children}</ol>;
}

export function NumberedRow({
  label,
  labelWidth = "sm",
  accent = false,
  labelClassName = "",
  trailing,
  className = "",
  "data-claim": dataClaim,
  children,
}: {
  label: React.ReactNode;
  labelWidth?: "sm" | "md" | "lg";
  /** 그린 액센트 1점 — 핵심 지표 행에만 쓴다 */
  accent?: boolean;
  /** cn 병합 — 기본 톤(text-muted)과 충돌하는 utility 는 호출부가 이긴다 */
  labelClassName?: string;
  trailing?: React.ReactNode;
  className?: string;
  "data-claim"?: string;
  children: React.ReactNode;
}) {
  const key = (
    trailing !== undefined ? `${labelWidth}-t` : labelWidth
  ) as keyof typeof COLS;
  const cols = COLS[key];
  return (
    <li
      data-claim={dataClaim}
      className={cn(
        "grid items-baseline gap-4 border-t border-border py-5 first:border-t-0 max-sm:gap-2",
        cols,
        className,
      )}
    >
      <span
        className={cn(
          "font-mono text-sm tracking-[0.06em]",
          accent ? "font-bold text-success" : "text-muted",
          labelClassName,
        )}
      >
        {label}
      </span>
      <span className="min-w-0 text-lg font-[450] max-sm:text-base">{children}</span>
      {trailing !== undefined && (
        <span className="whitespace-nowrap text-right font-mono text-xs tracking-[0.04em] text-muted max-sm:text-left">
          {trailing}
        </span>
      )}
    </li>
  );
}
