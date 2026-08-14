import { Fragment } from "react";
import { cn } from "@/lib/cn";

type KV = { k: string; v: React.ReactNode; "data-claim"?: string };

/* hero card 변형 — bordered dl, 값 우측 정렬. groups 사이에 rule 이 들어간다 */
export function KeyValueCard({
  groups,
  valueClassName = "",
  className = "",
}: {
  groups: KV[][];
  /** cn 병합 — dd 기본(text-xs)과 충돌 시 이 값이 이긴다 (예: hero 카드는 text-cred) */
  valueClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("border border-border p-5", className)}>
      <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
        {groups.map((group, gi) => (
          <Fragment key={gi}>
            {gi > 0 && (
              <div
                aria-hidden
                className="col-span-full my-1.5 h-px bg-border-soft"
              />
            )}
            {group.map(({ k, v }) => (
              <Fragment key={k}>
                <dt className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
                  {k}
                </dt>
                <dd
                  className={cn(
                    "m-0 text-right font-mono text-xs",
                    valueClassName,
                  )}
                >
                  {v}
                </dd>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </dl>
    </div>
  );
}

/* skills row 변형 — 150px key 컬럼 + 값, 행 경계선 */
export function KeyValueRows({
  items,
  className = "",
}: {
  items: KV[];
  className?: string;
}) {
  return (
    <div className={cn("grid border-t border-border-soft", className)}>
      {items.map(({ k, v, "data-claim": dataClaim }) => (
        <div
          key={k}
          data-claim={dataClaim}
          className="grid grid-cols-[150px_1fr] gap-4 border-b border-border-soft py-[11px] max-sm:grid-cols-1 max-sm:gap-1"
        >
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
            {k}
          </span>
          <span className="text-sm text-fg-2">{v}</span>
        </div>
      ))}
    </div>
  );
}
