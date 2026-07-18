export function SectionHead({
  no,
  title,
  meta,
}: {
  no: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-xs tracking-[0.08em] text-muted">
        {no}
      </span>
      <h2 className="font-mono text-xl font-semibold tracking-[-0.01em]">
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
