import { cn } from "@/lib/cn";

/* 1px-border collapse 그리드 — gap-px + 배경색 트릭 */
export function CardGrid({
  cols = 2,
  className = "",
  children,
}: {
  cols?: 2 | 4;
  className?: string;
  children: React.ReactNode;
}) {
  const colCls =
    cols === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2";
  return (
    <div
      className={cn(
        "grid gap-px border border-border-soft bg-border-soft",
        colCls,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid content-start gap-2 bg-bg p-5 transition-colors duration-[180ms] hover:bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
