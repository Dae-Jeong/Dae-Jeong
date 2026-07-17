import Link from "next/link";

const routes = [
  { href: "/resume", label: "RESUME", desc: "A4 마스터 이력서 · PDF" },
  { href: "/portfolio", label: "PORTFOLIO", desc: "case 5건 — 문제·결정·시스템·운영 근거" },
  { href: "/blog", label: "BLOG", desc: "판단 과정과 운영 경험 기록" },
  { href: "/labs", label: "LABS", desc: "만든 것들 — 기능·서비스 관문" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-7 py-20">
      <p className="inline-block border border-border px-2.5 py-1 font-mono text-[11px] tracking-wider text-fg-2">
        MediSolve AI · Backend Engineer · 재직 중
      </p>
      <h1 className="mt-6 font-mono text-5xl font-semibold tracking-tight">김대정</h1>
      <p className="mt-3 font-mono text-sm uppercase tracking-widest text-fg-2">
        <b className="font-semibold text-fg">Backend Engineer</b> · AI Product Systems
      </p>
      <p className="mt-6 max-w-xl text-xl font-medium">
        AI 제품을 운영 가능한 시스템으로 만드는 백엔드 엔지니어
      </p>

      <div className="mt-14 grid grid-cols-1 gap-px border border-border-soft bg-border-soft sm:grid-cols-2">
        {routes.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="bg-bg p-5 transition-colors hover:bg-surface"
          >
            <span className="font-mono text-xs font-semibold tracking-widest">{r.label}</span>
            <p className="mt-1.5 text-xs text-muted">{r.desc}</p>
          </Link>
        ))}
      </div>

      <p className="mt-10 font-mono text-[11px] tracking-wider text-muted">
        PHASE 1 — 화면 이식 진행 중
      </p>
    </main>
  );
}
