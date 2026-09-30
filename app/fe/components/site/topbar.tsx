import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

/* Visitor IA (2026-09-29 approval): Home · Resume · Career · CV. */
const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Resume", href: ROUTES.resume },
  { label: "Career", href: ROUTES.career },
  { label: "CV", href: ROUTES.cv },
] as const;

type TopBarProps =
  | { variant?: "home" }
  | { variant: "subpage"; crumb: React.ReactNode; tag?: string };

export function TopBar(props: TopBarProps) {
  if (props.variant === "subpage") {
    return (
      <header className="border-b border-border-soft">
        <Container
          variant="doc"
          className="flex h-14 items-center gap-3 sm:gap-5"
        >
          <div className="shrink-0">
            <Wordmark />
          </div>
          <span className="min-w-0 flex-1 truncate font-mono text-xs uppercase tracking-[0.08em] text-muted max-[520px]:hidden">
            / {props.crumb}
          </span>
          {props.tag && (
            <span className="ml-auto whitespace-nowrap border border-border px-2 py-[3px] font-mono text-xs tracking-[0.08em] text-muted max-[520px]:text-[10px]">
              {props.tag}
            </span>
          )}
        </Container>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-bg/88 backdrop-blur-[8px] backdrop-saturate-[180%]">
      <Container variant="hub" className="flex h-16 items-center gap-7">
        <Wordmark />
        <nav
          aria-label="주요 메뉴"
          className="ml-auto flex items-center gap-5 max-[720px]:hidden"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.href === "/" ? "page" : undefined}
              className="nav-underline focus-ring py-2 font-mono text-xs tracking-[0.04em] text-muted transition-colors duration-100 hover:text-fg aria-[current=page]:font-semibold aria-[current=page]:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden max-[720px]:flex">
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
