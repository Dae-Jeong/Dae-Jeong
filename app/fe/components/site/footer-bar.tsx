import { ROUTES } from "@/lib/routes";
import { Container, type ContainerVariant } from "./container";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "GitHub ↗", href: "https://github.com/Dae-Jeong", external: true },
  { label: "Resume", href: ROUTES.resume },
  { label: "Career", href: ROUTES.career },
  { label: "CV", href: ROUTES.cv },
];

export function FooterBar({
  name,
  className = "",
  containerVariant = "hub",
}: {
  name: ReactNode;
  className?: string;
  containerVariant?: ContainerVariant;
}) {
  return (
    <footer className={cn("border-t border-border py-8", className)}>
      <Container
        variant={containerVariant}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <span className="inline-flex min-h-11 items-center gap-2 font-mono text-sm font-semibold">
          <span aria-hidden className="size-[9px] bg-fg" />
          {name}{" "}
          <span className="font-normal text-muted">
            / Tech Lead · Backend Engineer
          </span>
        </span>
        <nav aria-label="외부 링크" className="flex flex-wrap gap-5">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              className="focus-ring inline-flex min-h-11 items-center font-mono text-xs tracking-[0.03em] text-muted transition-colors duration-100 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <span className="font-mono text-xs tracking-[0.02em] text-muted">
          marinkim.xyz · 2026
        </span>
      </Container>
    </footer>
  );
}
