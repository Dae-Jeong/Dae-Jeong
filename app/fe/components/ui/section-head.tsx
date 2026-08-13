/* size: 지면별 계약이 다르다 — hub(root-v3)는 2xl(28), doc(/resume)은 별도 계약.
   임의로 통일하지 않는다. app/design 승격본이 소유한다. */
export function SectionHead({
  no,
  title,
  meta,
  size = "hub",
}: {
  no: string;
  title: string;
  meta?: string;
  size?: "hub" | "doc";
}) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-xs tracking-[0.08em] text-muted">
        {no}
      </span>
      <h2
        className={
          size === "hub"
            ? "font-mono text-2xl font-semibold tracking-[-0.01em]"
            : "font-mono text-xl font-semibold tracking-[-0.01em]"
        }
      >
        {title}
      </h2>
      {meta && (
        <span className="ml-auto font-mono text-xs uppercase tracking-[0.04em] text-muted max-sm:ml-0 max-sm:basis-full">
          {meta}
        </span>
      )}
    </div>
  );
}
