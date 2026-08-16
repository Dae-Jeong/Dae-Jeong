export function ResumePeriod({
  value,
  currentLabel,
}: {
  value: string;
  currentLabel?: string;
}) {
  const [start, rawEnd] = value.split(/\s*—\s*/, 2);
  const end = rawEnd || currentLabel;

  return (
    <span className="grid gap-0.5 font-mono text-xs font-normal text-muted">
      <span>{start.trim()}</span>
      {end && <span>- {end.trim()}</span>}
    </span>
  );
}
