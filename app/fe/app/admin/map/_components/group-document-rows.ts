import { groupByStatus, STATUS_LABEL, type ApplicationStatus } from "../../../../features/applications/status.ts";

/** Group company rows only after a successful status lookup; unavailable data proves no absence. */
export function groupDocumentRows<T extends { status?: ApplicationStatus }>(
  rows: readonly T[],
  statusKind: "ready" | "missing" | "error",
): { key: string; title: string; rows: T[] }[] {
  if (!rows.length) return [];
  if (statusKind !== "ready") {
    return [{ key: "companies", title: "회사별 대표 문서", rows: [...rows] }];
  }
  // Prepared documents use the existing pre-apply presentation; this creates no application record.
  const prepared = rows.map((row) =>
    ({ ...row, status: row.status ?? "pre-apply" }),
  );
  return groupByStatus(prepared).map((group) => ({
    key: group.status,
    title: STATUS_LABEL[group.status],
    rows: group.attempts,
  }));
}
