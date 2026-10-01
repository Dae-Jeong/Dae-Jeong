import { PRIMARY_NAV } from "@/lib/routes";
import Link from "next/link";
import { Container } from "./container";
import { MobileNav, type NavigationControls } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function TopBar({ currentPath, extraLinks = [], action }: NavigationControls) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-bg/88 backdrop-blur-[8px] backdrop-saturate-[180%] print:hidden">
      <Container variant="hub" className="flex h-16 items-center gap-7">
        <Wordmark />
        <nav aria-label="주요 메뉴" className="ml-auto flex shrink-0 items-center gap-4 max-[720px]:hidden">
          {[...PRIMARY_NAV, ...extraLinks].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-current={item.href === currentPath ? "page" : undefined}
              className="nav-underline focus-ring inline-flex min-h-11 items-center font-mono text-xs tracking-[0.04em] text-muted transition-colors duration-100 hover:text-fg aria-[current=page]:font-semibold aria-[current=page]:text-fg"
            >
              {item.label}
            </Link>
          ))}
          {action && (
            <button type="button" onClick={action.onClick} className="focus-ring inline-flex min-h-11 items-center font-mono text-xs text-muted hover:text-fg">
              {action.label}
            </button>
          )}
        </nav>
        <div className="ml-auto hidden max-[720px]:flex">
          <MobileNav currentPath={currentPath} extraLinks={extraLinks} action={action} />
        </div>
      </Container>
      {action?.error && <p role="alert" className="px-4 pb-2 text-[12px] text-danger max-[720px]:hidden">{action.error}</p>}
    </header>
  );
}
