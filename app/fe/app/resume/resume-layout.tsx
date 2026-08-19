"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type ResumeSection = {
  id: string;
  label: string;
};

export type ResumeLanguageControl = {
  value: string;
  options: readonly {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
};

type ResumeLayoutProps = {
  children: React.ReactNode;
  sections: readonly ResumeSection[];
  pdfHref?: string;
  language?: ResumeLanguageControl;
};

function LanguageSwitcher({
  control,
  compact = false,
}: {
  control: ResumeLanguageControl;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex border border-border",
        compact && "w-full flex-col border-0 border-t border-border-soft",
      )}
      role="group"
      aria-label="이력서 언어"
    >
      {control.options.map((option) => {
        const active = option.value === control.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => control.onChange(option.value)}
            className={cn(
              "cursor-pointer whitespace-nowrap font-mono text-xs transition-colors duration-100",
              compact
                ? "grid min-h-11 w-full place-items-center text-muted hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg"
                : "focus-ring min-h-11 flex-1 px-3 py-2 text-muted hover:text-fg",
              active && (compact ? "bg-fg text-accent-on" : "bg-fg text-accent-on"),
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function ResumeNavigator({
  sections,
  pdfHref,
  language,
}: Omit<ResumeLayoutProps, "children">) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
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
  }, [sections]);

  return (
    <aside className="fixed bottom-24 right-3 top-20 z-40 hidden w-11 flex-col text-fg print:hidden xl:flex">
      {pdfHref && (
        <a
          href={pdfHref}
          download
          aria-label="A4 PDF 다운로드"
          title="A4 PDF 다운로드"
          className="grid min-h-11 w-full place-items-center border-b border-border-soft font-mono text-sm text-muted transition-colors duration-100 hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg"
        >
          ↓
        </a>
      )}

      <nav aria-label="이력서 목차" className="my-auto w-full">
        <ol className="m-0 grid list-none gap-1 p-0">
          {sections.map((section) => {
            const active = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-label={section.label}
                  aria-current={active ? "location" : undefined}
                    className="group relative grid min-h-11 w-full place-items-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-px bg-border transition-[width,background-color] duration-100",
                      active ? "w-7 bg-fg" : "w-3 group-hover:w-5 group-hover:bg-muted",
                    )}
                  />
                  <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border border-border bg-bg px-2 py-1 font-mono text-xs text-fg opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {language && <LanguageSwitcher control={language} compact />}
    </aside>
  );
}

export function ResumeLayout({
  children,
  sections,
  pdfHref,
  language,
}: ResumeLayoutProps) {
  const hasLanguage = (language?.options.length ?? 0) > 1;
  const visibleLanguage = hasLanguage ? language : undefined;
  const hasCompactActions = Boolean(pdfHref || visibleLanguage);

  return (
    <div className="relative">
      {hasCompactActions && (
        <div className="mx-auto flex w-full max-w-[210mm] items-center justify-end gap-3 border-b border-border-soft py-5 print:hidden xl:hidden">
          {pdfHref && (
            <a
              href={pdfHref}
              download
              className="focus-ring inline-flex min-h-11 items-center border border-accent bg-accent px-3.5 font-mono text-xs font-medium tracking-[0.04em] text-accent-on transition-colors duration-100 hover:bg-accent-hover"
            >
              ↓ PDF 다운로드 (A4)
            </a>
          )}
          {visibleLanguage && <LanguageSwitcher control={visibleLanguage} />}
        </div>
      )}

      <main
        data-resume-canvas
        className={cn(
          "mx-auto w-full max-w-[210mm] pb-24 print:pb-0",
          hasCompactActions ? "pt-6 xl:pt-12" : "pt-12",
        )}
      >
        {children}
      </main>

      <ResumeNavigator sections={sections} pdfHref={pdfHref} language={visibleLanguage} />
    </div>
  );
}
