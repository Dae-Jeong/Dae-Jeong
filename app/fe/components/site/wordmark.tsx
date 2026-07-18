import Link from "next/link";

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      aria-label="marinkim.xyz 홈"
      className="focus-ring inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.02em]"
    >
      <span aria-hidden className="size-[9px] bg-fg" />
      marinkim.xyz
    </Link>
  );
}
