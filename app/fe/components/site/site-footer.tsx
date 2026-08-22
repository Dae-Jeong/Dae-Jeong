import { Container } from "./container";
import { cn } from "@/lib/cn";

const LINKS: { label: string; href: string; disabled?: boolean; external?: boolean }[] = [
  { label: "GitHub ↗", href: "https://github.com/Dae-Jeong", external: true },
  { label: "Resume", href: "/resume" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Labs", href: "/labs" },
];

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border py-8", className)}>
      <Container
        variant="hub"
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <span className="inline-flex items-center gap-2 font-mono text-sm font-semibold">
          <span aria-hidden className="size-[9px] bg-fg" />
          김대정{" "}
          <span className="font-normal text-muted">/ Tech Lead · Backend Engineer</span>
        </span>
        <nav aria-label="외부 링크" className="flex flex-wrap gap-5">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-disabled={l.disabled}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              className="focus-ring font-mono text-xs tracking-[0.03em] text-muted transition-colors duration-100 hover:text-fg"
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
