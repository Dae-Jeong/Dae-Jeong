"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export type ReviewDestination = {
  href: string;
  label: string;
  match: "exact" | "section";
};

export type ReviewGroup = {
  label: string;
  destinations: readonly ReviewDestination[];
};

export function LocalReviewLauncher({
  groups,
  className = "",
}: {
  groups: readonly ReviewGroup[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 print:hidden sm:bottom-6 sm:right-6",
        className,
      )}
    >
      <details className="group relative">
        <summary
          role="button"
          className="focus-ring inline-flex min-h-11 cursor-pointer list-none items-center bg-accent px-5 font-mono text-sm tracking-[0.08em] text-accent-on shadow-[0_8px_8px_rgba(0,0,0,0.16)] transition-colors duration-100 hover:bg-accent-hover [&::-webkit-details-marker]:hidden"
        >
          <span className="group-open:hidden">VIEWS</span>
          <span className="hidden group-open:inline">× CLOSE</span>
        </summary>

        <nav
          aria-label="로컬 문서 빠른 이동"
          className="absolute bottom-[calc(100%+0.75rem)] right-0 max-h-[70vh] w-[min(320px,calc(100vw-32px))] overflow-y-auto border border-border bg-bg"
        >
          <div className="flex items-center justify-between border-b border-border px-3.5 py-3">
            <strong className="text-sm font-semibold">미리보기 이동</strong>
            <span className="border border-border px-2 py-0.5 font-mono text-xs text-muted">
              LOCAL
            </span>
          </div>
          {groups.map((reviewGroup) => (
            <section key={reviewGroup.label} aria-labelledby={`review-${reviewGroup.label.toLowerCase()}`}>
              <p
                id={`review-${reviewGroup.label.toLowerCase()}`}
                className="m-0 border-b border-border bg-surface px-3.5 py-2 font-mono text-xs font-semibold tracking-[0.06em] text-muted"
              >
                {reviewGroup.label}
              </p>
              <ul className="m-0 grid list-none p-0">
                {reviewGroup.destinations.map((destination) => {
                  const isActive =
                    destination.match === "section"
                      ? pathname.startsWith(destination.href)
                      : pathname === destination.href;

                  return (
                    <li
                      key={destination.href}
                      className="border-b border-border-soft last:border-b-0"
                    >
                      <Link
                        href={destination.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "focus-ring flex min-h-11 items-center justify-between gap-4 px-3.5 py-2.5 text-sm transition-colors duration-100",
                          isActive
                            ? "bg-fg font-semibold text-bg"
                            : "text-fg-2 hover:bg-surface hover:text-fg",
                        )}
                      >
                        <span>{destination.label}</span>
                        {isActive ? (
                          <span className="font-mono text-xs">현재</span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>
      </details>
    </div>
  );
}
