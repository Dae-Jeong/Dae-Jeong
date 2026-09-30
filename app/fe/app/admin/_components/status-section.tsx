import {
  STATUS_LABEL,
  type ApplicationStatus,
} from "@/features/applications/status";
import type { ApplicationAttempt } from "@/features/applications/mapping";

type Attempt = ApplicationAttempt;

export function StatusSection({
  status,
  attempts,
}: {
  status: ApplicationStatus;
  attempts: Attempt[];
}) {
  return (
    <section aria-labelledby={`status-${status}`} className="min-w-0">
      <h2
        id={`status-${status}`}
        className="m-0 mb-3 flex items-baseline gap-2 text-base font-semibold"
      >
        {STATUS_LABEL[status] ?? status}
        <span className="font-mono text-xs font-normal text-muted">
          {attempts.length}
        </span>
      </h2>
      <div>
        <table className="w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-[38%] sm:w-1/4" />
            <col />
            <col className="w-16 sm:w-20" />
          </colgroup>
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th scope="col" className="py-2 pr-3 font-medium sm:pr-4">
                회사
              </th>
              <th scope="col" className="py-2 pr-3 font-medium sm:pr-4">
                공고
              </th>
              <th scope="col" className="py-2 pl-2 font-medium">
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
                <td className="py-3 pr-3 font-medium [overflow-wrap:anywhere] sm:pr-4">{attempt.company}</td>
                <td className="py-3 pr-3 break-words [word-break:keep-all] sm:pr-4">
                  {attempt.role}
                  {attempt.postingId ? (
                    <span className="ml-2 inline-block max-w-full break-all align-baseline font-mono text-xs text-muted">
                      #{attempt.postingId}
                    </span>
                  ) : null}
                </td>
                <td className="py-3 pl-2 whitespace-nowrap">
                  {STATUS_LABEL[attempt.status] ?? attempt.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
