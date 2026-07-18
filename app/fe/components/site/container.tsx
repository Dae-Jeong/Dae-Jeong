import { cn } from "@/lib/cn";

/* D1 확정 (2026-07-18): hub 1280/gutter 36 · doc 1180/gutter 28 — 역할 구분 유지 */
export function Container({
  variant = "hub",
  className = "",
  children,
}: {
  variant?: "hub" | "doc";
  className?: string;
  children: React.ReactNode;
}) {
  const width =
    variant === "hub"
      ? "max-w-[1280px] px-4 md:px-6 lg:px-9"
      : "max-w-[1180px] px-4 md:px-7";
  return (
    <div className={cn("mx-auto w-full", width, className)}>{children}</div>
  );
}
