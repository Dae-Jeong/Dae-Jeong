import { DesignDiagram, type DesignDiagramKey } from "./design-diagrams";

/* 케이스 본문 아래에 붙는 "설계" 섹션. 도식 순서가 곧 우선순위다 — 회사별 content에서 정한다. */
export function DesignSection({
  ids,
  label = "설계",
  className = "mt-12",
}: {
  ids?: readonly DesignDiagramKey[];
  label?: string;
  className?: string;
}) {
  if (!ids?.length) return null;
  return (
    <section className={`${className} grid grid-cols-[170px_minmax(0,1fr)] gap-6 max-sm:grid-cols-1 max-sm:gap-3`}>
      <p className="m-0 font-mono text-xs font-semibold tracking-[0.06em] text-[var(--portfolio-blue)]">{label}</p>
      <div className="grid min-w-0 gap-8 [&_.design-diagram]:my-0">
        {ids.map((id) => (
          <DesignDiagram key={id} id={id} />
        ))}
      </div>
    </section>
  );
}
