import type { NarrativePortfolio } from "@/content/portfolios/narrative-types";

export function NarrativePortfolioView({ portfolio }: { portfolio: NarrativePortfolio }) {
  return (
    <main data-portfolio-document data-portfolio-slug={portfolio.slug}>
      <header className="portfolio-hero portfolio-hero--light my-8">
        <p className="m-0 text-sm text-fg-2">{portfolio.name} · {portfolio.role}</p>
        <div className="mt-7 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 max-lg:grid-cols-1 max-lg:gap-8">
          <div className="min-w-0">
            <h1 className="m-0 text-[clamp(2rem,3vw,2.85rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-balance">{portfolio.headline}</h1>
            <p className="m-0 mt-6 text-base leading-[1.75] text-fg-2 text-pretty">{portfolio.introduction}</p>
          </div>
          <nav aria-label="포트폴리오 사례 바로가기" className="min-w-0 border-t-2 border-[var(--portfolio-ink)]">
            <ol className="m-0 list-none p-0">
              {portfolio.cases.map((item, index) => (
                <li key={item.id} className="border-b border-border">
                  <a href={`#case-${item.id}`} className="focus-ring grid grid-cols-[28px_minmax(0,1fr)] gap-3 py-5 hover:underline">
                    <span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                    <strong className="text-base leading-relaxed">{item.title}</strong>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-3 border-t border-border p-0 pt-5 text-sm">
          {portfolio.contacts.map((contact) => (
            <li key={contact.label}>
              <a href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined} className="focus-ring underline decoration-border underline-offset-4 hover:decoration-current">{contact.label}</a>
            </li>
          ))}
        </ul>
      </header>

      {portfolio.cases.map((item, index) => (
        <article key={item.id} id={`case-${item.id}`} data-claim={item.claimIds.join(" ")} className="scroll-mt-6 border-t-2 border-[var(--portfolio-ink)] pb-16 pt-9">
          <header className="grid grid-cols-[160px_minmax(0,1fr)] gap-8 max-md:grid-cols-1 max-md:gap-3">
            <p className="m-0 font-mono text-xs font-semibold text-[var(--portfolio-blue)]">CASE {String(index + 1).padStart(2, "0")}</p>
            <div className="min-w-0">
              <h2 className="m-0 text-[clamp(1.75rem,2.8vw,2.6rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--portfolio-ink)] text-balance">{item.title}</h2>
              <p className="m-0 mt-4 text-sm leading-relaxed text-muted">{item.scope}</p>
            </div>
          </header>
          <div className="mt-10 grid gap-10">
            {item.sections.map((section, sectionIndex) => {
              const headingId = `${item.id}-${sectionIndex}`;
              return (
                <section key={section.title} aria-labelledby={headingId} className="grid grid-cols-[160px_minmax(0,1fr)] gap-8 border-t border-border-soft pt-7 max-md:grid-cols-1 max-md:gap-4">
                  <h3 id={headingId} className="m-0 text-base font-semibold leading-relaxed text-[var(--portfolio-ink)]">{section.title}</h3>
                  <div className="min-w-0 space-y-4 text-base leading-[1.75] text-fg-2">
                    {section.paragraphs.map((paragraph) => <p key={paragraph} className="m-0 text-pretty">{paragraph}</p>)}
                    {section.table ? (
                      <div role="region" aria-label={`${section.title} 비교표`} tabIndex={0} className="focus-ring overflow-x-auto border-y border-border">
                        <table className={`w-full border-collapse text-left text-[15px] leading-[1.65] ${section.table.columns.length === 3 ? "min-w-[600px]" : "min-w-[420px]"}`}>
                          <caption className="sr-only">{section.title}</caption>
                          <thead className="bg-surface text-fg">
                            <tr>{section.table.columns.map((column) => <th key={column} scope="col" className="px-4 py-3 font-semibold">{column}</th>)}</tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row) => (
                              <tr key={row[0]} className="border-t border-border">
                                {row.map((cell, cellIndex) => cellIndex === 0
                                  ? <th key={cellIndex} scope="row" className="px-4 py-4 align-top font-medium text-fg">{cell}</th>
                                  : <td key={cellIndex} className="px-4 py-4 align-top">{cell}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                    {section.afterTable?.map((paragraph) => <p key={paragraph} className="m-0 text-pretty">{paragraph}</p>)}
                  </div>
                </section>
              );
            })}
          </div>
        </article>
      ))}
    </main>
  );
}
