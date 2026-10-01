export function StatusSectionHeading({
  id,
  title,
  count,
}: {
  id: string;
  title: string;
  count: number;
}) {
  return (
    <h2 id={id} className="m-0 mb-3 flex items-baseline gap-2 text-[16px] leading-6 font-semibold">
      {title}
      <span className="font-mono text-[12px] font-normal text-muted">{count}</span>
    </h2>
  );
}
