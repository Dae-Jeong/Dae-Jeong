import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Wordmark } from "./wordmark";

const NAV: { label: string; href: string; disabled?: boolean }[] = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#", disabled: true },
  { label: "Labs", href: "#", disabled: true },
];

type TopBarProps =
  | { variant?: "home" }
  | { variant: "subpage"; crumb: string; tag?: string };

export function TopBar(props: TopBarProps) {
  if (props.variant === "subpage") {
    return (
      <header className="border-b border-border-soft">
        <Container variant="doc" className="flex h-14 items-center gap-5">
          <Wordmark />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
            / {props.crumb}
          </span>
          {props.tag && (
            <span className="ml-auto whitespace-nowrap border border-border px-2 py-[3px] font-mono text-[10px] tracking-[0.08em] text-muted">
              {props.tag}
            </span>
          )}
        </Container>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-bg/88 backdrop-blur-[8px] backdrop-saturate-[180%]">
      <Container
        variant="hub"
        className="flex h-14 items-center justify-between"
      >
        <Wordmark />
        <nav aria-label="주요 메뉴" className="hidden items-center gap-6 sm:flex">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-disabled={l.disabled}
              className="nav-underline focus-ring py-2 font-mono text-xs tracking-[0.04em] text-muted transition-colors duration-100 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button href="#" disabled title="Resume PDF (준비 중)">
          ↓ Resume PDF
        </Button>
      </Container>
    </header>
  );
}
