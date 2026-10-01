import Link from "next/link";
import { StatusSectionHeading } from "@/app/_components/admin/status-section-heading";
import {
  STATUS_LABEL,
  type ApplicationStatus,
} from "@/features/applications/status";
import type { ApplicationAttempt } from "@/features/applications/mapping";

export function StatusSection({
  status,
  attempts,
  availableAnalyses,
}: {
  status: ApplicationStatus;
  attempts: ApplicationAttempt[];
  availableAnalyses?: Set<string>;
}) {
  return (
    <section aria-labelledby={`status-${status}`} className="min-w-0">
      <StatusSectionHeading id={`status-${status}`} title={STATUS_LABEL[status]} count={attempts.length} />
      <table
        aria-labelledby={`status-${status}`}
        className="w-full table-fixed border-collapse text-[14px] leading-5"
      >
        <colgroup>
          <col className="w-[34%] sm:w-[28%]" />
          <col />
          <col className="w-20 sm:w-24 text-center" />
          <col className="w-16 sm:w-20" />
        </colgroup>
        <thead>
          <tr className="border-b border-border text-left text-[12px] leading-4 text-muted">
            <th scope="col" className="py-2 pr-2 font-medium sm:pr-4">
              회사
            </th>
            <th scope="col" className="py-2 pr-2 font-medium sm:pr-4">
              공고
            </th>
            <th scope="col" className="py-2 pr-2 text-center font-medium sm:pr-4">
              공고 분석
            </th>
            <th scope="col" className="py-2 font-medium">
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt) => (
            <tr
              key={attempt.id}
              className="border-b border-border/60 align-top"
              data-attempt={attempt.id}
            >
              <td className="py-3 pr-2 font-medium [overflow-wrap:anywhere] sm:pr-4">
                {attempt.company}
              </td>
              <td className="py-3 pr-2 [word-break:keep-all] [overflow-wrap:anywhere] sm:pr-4">
                {attempt.role}
                {attempt.postingId ? (
                  <span className="mt-1 block font-mono text-[12px] leading-4 text-muted [overflow-wrap:anywhere]">
                    #{attempt.postingId}
                  </span>
                ) : null}
              </td>
              <td className="py-3 pr-2 text-center [overflow-wrap:anywhere] sm:pr-4">
                {availableAnalyses?.has(attempt.id) ? (
                  <Link
                    href={`/admin/analysis/${attempt.id}`}
                    className="inline-flex items-center text-[13px] font-medium text-fg underline decoration-border-soft underline-offset-4 hover:decoration-fg"
                  >
                    공고 분석
                  </Link>
                ) : (
                  <span className="text-[13px] text-muted">-</span>
                )}
              </td>
              <td className="py-3 [overflow-wrap:anywhere]">
                {STATUS_LABEL[attempt.status]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
