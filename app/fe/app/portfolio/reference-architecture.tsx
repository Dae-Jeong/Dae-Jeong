import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "blue" | "green" | "slate";

const toneClasses: Record<Tone, string> = {
  neutral: "border-[#b7d7f0] bg-white text-[#183b56]",
  blue: "border-[#5b9bd5] bg-[#f7fbff] text-[#183b56]",
  green: "border-[#65ad83] bg-[#f5fbf7] text-[#174d2c]",
  slate: "border-[#b9c3cb] bg-[#f4f6f8] text-[#1f2933]",
};

export function ArchitectureFrame({
  product,
  title,
  status,
  children,
  className,
}: {
  product: string;
  title: string;
  status: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border-2 border-[#5b9bd5] bg-[#f7fbff] [print-color-adjust:exact] [-webkit-print-color-adjust:exact]",
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#b7d7f0] bg-[#0078d4] px-5 py-3 text-white print:px-3 print:py-2">
        <span>
          <span className="block font-mono text-xs font-semibold tracking-[0.06em] text-white">
            {product}
          </span>
          <strong className="mt-1 block text-sm font-semibold">{title}</strong>
        </span>
        <span className="whitespace-nowrap border border-white/55 px-2 py-1 font-mono text-xs tracking-[0.04em]">{status}</span>
      </header>
      {children}
    </div>
  );
}
export function ArchitectureNode({
  code,
  title,
  detail,
  tone = "neutral",
  className,
}: {
  code?: string;
  title: string;
  detail?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 border p-3", toneClasses[tone], className)}>
      <div className="flex min-w-0 items-start gap-2.5">
        {code ? (
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center border border-current font-mono text-xs font-semibold leading-none"
          >
            {code}
          </span>
        ) : null}
        <span className="min-w-0">
          <strong className="block text-pretty text-sm font-semibold leading-[1.35]">{title}</strong>
          {detail ? (
            <span className="mt-1 block text-pretty text-xs leading-[1.45] opacity-75">{detail}</span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

export function ArchitectureArrow({
  label,
  dashed = false,
  verticalOnSmall = true,
  tone = "blue",
}: {
  label?: string;
  dashed?: boolean;
  verticalOnSmall?: boolean;
  tone?: "blue" | "green" | "slate";
}) {
  const colors = {
    blue: "text-[#0078d4] border-[#0078d4]",
    green: "text-[#158442] border-[#158442]",
    slate: "text-[#44515c] border-[#44515c]",
  } as const;

  return (
    <div
      aria-hidden
      className={cn(
        "flex min-w-0 items-center justify-center gap-2 font-mono text-xs",
        colors[tone],
        verticalOnSmall && "max-md:min-h-9 max-md:flex-col print:min-h-0 print:flex-row",
      )}
    >
      <span className="min-w-0 text-center text-[#526778]">{label}</span>
      <span
        className={cn(
          "h-px min-w-5 flex-1 border-t-2",
          dashed ? "border-dashed" : "border-solid",
          verticalOnSmall && "max-md:h-5 max-md:min-h-5 max-md:w-px max-md:flex-none max-md:border-l-2 max-md:border-t-0 print:h-px print:min-h-0 print:w-auto print:flex-1 print:border-l-0 print:border-t-2",
        )}
      />
      <span className={cn("text-base leading-none", verticalOnSmall && "max-md:rotate-90 print:rotate-0")}>
        →
      </span>
    </div>
  );
}

export function ArchitectureBoundary({
  eyebrow,
  title,
  meta,
  children,
  tone = "blue",
  className,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
  children: ReactNode;
  tone?: "blue" | "green" | "slate";
  className?: string;
}) {
  const boundaryClasses = {
    blue: "border-[#5b9bd5] bg-white",
    green: "border-[#65ad83] bg-white",
    slate: "border-[#9ca8b1] bg-white",
  } as const;
  const headerClasses = {
    blue: "border-[#cfe5f6] bg-[#edf7ff] text-[#183b56]",
    green: "border-[#cfe8d8] bg-[#f1faf4] text-[#174d2c]",
    slate: "border-[#dce3e8] bg-[#f4f6f8] text-[#1f2933]",
  } as const;

  return (
    <section className={cn("min-w-0 border-2", boundaryClasses[tone], className)}>
      <header
        className={cn(
          "flex flex-wrap items-start justify-between gap-4 border-b px-4 py-3 print:px-3 print:py-2",
          headerClasses[tone],
        )}
      >
        <span className="min-w-0">
          <span className="block font-mono text-xs font-semibold tracking-[0.04em] opacity-75">
            {eyebrow}
          </span>
          <strong className="mt-1 block text-pretty text-base font-semibold">{title}</strong>
        </span>
        {meta ? (
          <span className="shrink-0 whitespace-nowrap border border-current bg-white px-2 py-1 font-mono text-xs font-normal tracking-[0.04em] opacity-75">
            {meta}
          </span>
        ) : null}
      </header>
      {children}
    </section>
  );
}
