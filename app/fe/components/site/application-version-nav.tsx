import Link from "next/link";
import { cn } from "@/lib/cn";

const DOCUMENTS = [
  { kind: "resume", label: "이력서" },
  { kind: "career", label: "경력기술서" },
  { kind: "portfolio", label: "포트폴리오" },
] as const;

export function ApplicationVersionNav({
  slug,
  label,
  active,
}: {
  slug: string;
  label: string;
  active: (typeof DOCUMENTS)[number]["kind"];
}) {
  return (
    <nav aria-label={`${label} 문서`} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border py-3 print:hidden">
      <span className="font-mono text-xs font-semibold">{label}</span>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {DOCUMENTS.map(({ kind, label: documentLabel }) => (
          <Link
            key={kind}
            href={`/${kind}/${kind === "resume" && slug === "jyp-v2" ? "jyp" : slug}`}
            aria-current={active === kind ? "page" : undefined}
            className={cn("focus-ring inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline", active === kind ? "font-semibold text-fg underline" : "text-muted")}
          >
            {documentLabel}
          </Link>
        ))}
      </div>
      <Link href="/_map" className="focus-ring ml-auto inline-flex min-h-11 items-center text-xs text-muted hover:underline">전체 버전</Link>
    </nav>
  );
}
