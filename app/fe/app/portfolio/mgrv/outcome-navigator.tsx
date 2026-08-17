"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export type PortfolioNavItem = {
  id: string;
  no: string;
  title: string;
};

export function OutcomeNavigator({ items }: { items: readonly PortfolioNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => target !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="fixed bottom-24 right-3 top-20 z-40 hidden w-11 flex-col text-fg xl:flex print:hidden">
      <nav aria-label="포트폴리오 목차" className="my-auto w-full">
        <ol className="m-0 grid list-none gap-1 p-0">
          {items.map((item) => {
            const active = activeId === item.id;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-label={item.title}
                  aria-current={active ? "location" : undefined}
                  className="group relative grid min-h-11 w-full place-items-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-px bg-border transition-[width,background-color] duration-100",
                      active
                        ? "w-7 bg-fg"
                        : "w-3 group-hover:w-5 group-hover:bg-muted",
                    )}
                  />
                  <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border border-border bg-bg px-2 py-1 font-mono text-xs text-fg opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {item.no} {item.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
