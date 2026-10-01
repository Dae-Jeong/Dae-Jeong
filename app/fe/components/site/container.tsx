import { cn } from "@/lib/cn";

/* D1 확정 (2026-07-18): hub 1280/gutter 36 · doc 1180/gutter 28 — 역할 구분 유지 */
export type ContainerVariant = "hub" | "doc" | "narrow";

export function Container({
  variant = "hub",
  as: Element = "div",
  className = "",
  children,
}: {
  variant?: ContainerVariant;
  as?: "div" | "main";
  className?: string;
  children: React.ReactNode;
}) {
  const width = {
    hub: "max-w-[1280px] px-4 md:px-6 lg:px-9",
    doc: "max-w-[1180px] px-4 md:px-7",
    narrow: "max-w-[1024px] px-4 sm:px-6",
  }[variant];
  return (
    <Element className={cn("mx-auto w-full", width, className)}>{children}</Element>
  );
}
