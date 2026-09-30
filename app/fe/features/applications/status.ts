export const APPLICATION_STATUSES = [
  "pre-apply",
  "in-progress",
  "accepted",
  "declined",
  "rejected",
  "unknown",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export const STATUS_LABEL = {
  "in-progress": "진행 중",
  "pre-apply": "지원 전",
  accepted: "합격",
  declined: "거절",
  rejected: "탈락",
  unknown: "상태 미확인",
} satisfies Record<ApplicationStatus, string>;
export const STATUS_ORDER: readonly ApplicationStatus[] = [
  "in-progress",
  "pre-apply",
  "accepted",
  "declined",
  "rejected",
  "unknown",
];
export function groupByStatus<
  T extends { status: ApplicationStatus; lastConfirmed?: string },
>(attempts: readonly T[]) {
  return STATUS_ORDER.map((status) => ({
    status,
    attempts: attempts
      .filter((a) => a.status === status)
      .sort((a, b) =>
        (b.lastConfirmed ?? "").localeCompare(a.lastConfirmed ?? ""),
      ),
  })).filter((group) => group.attempts.length);
}
