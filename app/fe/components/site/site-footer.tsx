import { Container } from "./container";

const LINKS: { label: string; href: string; disabled?: boolean }[] = [
  { label: "GitHub ↗", href: "https://github.com/Dae-Jeong" },
  { label: "Resume PDF", href: "#", disabled: true },
  { label: "Blog", href: "#", disabled: true },
  { label: "Labs", href: "#", disabled: true },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <Container
        variant="hub"
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <span className="inline-flex items-center gap-2 font-mono text-sm font-semibold">
          <span aria-hidden className="size-[9px] bg-fg" />
          김대정{" "}
          <span className="font-normal text-muted">/ Backend Engineer</span>
        </span>
        <nav aria-label="외부 링크" className="flex flex-wrap gap-5">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-disabled={l.disabled}
              {...(l.disabled
                ? {}
                : { target: "_blank", rel: "noopener" })}
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
