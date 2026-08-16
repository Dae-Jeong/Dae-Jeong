/* size: 지면별 계약 변형. 12차(2026-08-13)에서 doc도 2xl로 통일돼 현재는 동일값 —
   향후 분기 대비로 prop만 유지한다. app/design 승격본이 소유. */
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
    <div
      className={
        size === "doc"
          ? "mb-7 flex flex-wrap items-baseline gap-4 border-b border-border pb-3"
          : "mb-8 flex flex-wrap items-baseline gap-4 border-b border-border pb-4"
      }
    >
      <span className="font-mono text-xs tracking-[0.08em] text-muted">
        {no}
      </span>
      <h2
        className={
          size === "hub"
            ? "font-mono text-2xl font-semibold tracking-[-0.01em]"
            : "font-mono text-2xl font-semibold tracking-[-0.015em]"
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
