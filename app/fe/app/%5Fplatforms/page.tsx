import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// 로컬 전용 시뮬레이션. 플랫폼은 건드리지 않고, 필드마다 before(live 스냅샷) / after(canonical)를 나란히 본다.
// 데이터: tools/build_platform_projection.py → output/platform-profiles/platforms.json
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "_platforms",
  robots: { index: false, follow: false },
};

const PROJECTION = path.join(process.cwd(), "..", "..", "output", "platform-profiles", "platforms.json");

type Field = {
  name: string;
  limit: number | null;
  before: string | null;
  before_banned: string[];
  after: string;
  after_len: number;
  after_banned: string[];
  over_limit: boolean;
  changed: boolean;
};
type Platform = {
  id: string;
  name: string;
  url: string;
  status: string;
  live_version?: string;
  live_verified_at?: string;
  live_checked_at?: string;
  drift?: boolean;
  automation?: { text_input?: string; click_fields?: string } | null;
  fields: Field[];
};
type Projection = { generated_at: string; canonical_version: string; platforms: Platform[] };

function load(): Projection | null {
  try {
    return JSON.parse(fs.readFileSync(PROJECTION, "utf8")) as Projection;
  } catch {
    return null;
  }
}

function Chip({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "ok" | "warn" }) {
  const cls =
    tone === "ok"
      ? "border-emerald-700/40 text-emerald-700"
      : tone === "warn"
        ? "border-amber-700/40 text-amber-700"
        : "border-border text-muted";
  return <span className={`inline-block border px-1.5 py-0.5 font-mono text-[11px] ${cls}`}>{children}</span>;
}

export default function PlatformsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const data = load();
  if (!data) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="m-0 text-xl font-semibold">_platforms</h1>
        <p className="mt-2 text-sm text-muted">
          projection이 없습니다. <code>uv run --project tools python tools/build_platform_projection.py</code>
        </p>
      </main>
    );
  }
  const active = data.platforms.filter((p) => p.status === "active");
  const others = data.platforms.filter((p) => p.status !== "active");

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="mb-8 border-b border-border pb-4">
        <h1 className="m-0 text-xl font-semibold">_platforms · 적용 시뮬레이션</h1>
        <p className="m-0 mt-1 text-sm text-muted">
          로컬 전용 · 플랫폼 무변경 · before = live 스냅샷 / after = canonical {data.canonical_version} · 생성 {data.generated_at}
          <span className="mx-2">·</span>
          <Link href="/_map" className="underline underline-offset-4">/_map</Link>
        </p>
      </header>

      <div className="grid gap-12">
        {active.map((p) => {
          const changed = p.fields.filter((f) => f.changed).length;
          const over = p.fields.filter((f) => f.over_limit).length;
          const bannedAfter = p.fields.filter((f) => f.after_banned.length).length;
          return (
            <section key={p.id}>
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-fg pb-2">
                <h2 className="m-0 text-lg font-semibold">{p.name}</h2>
                <a href={p.url} target="_blank" rel="noreferrer" className="font-mono text-xs underline underline-offset-4">
                  {p.url}
                </a>
                <span className="ml-auto flex flex-wrap gap-1">
                  <Chip tone={p.drift ? "warn" : "ok"}>{p.drift ? "drift" : "in-sync"}</Chip>
                  <Chip>live {p.live_version ?? "?"} · {p.live_checked_at ?? p.live_verified_at ?? "-"}</Chip>
                  <Chip tone={p.automation?.text_input === "auto" ? "ok" : "warn"}>
                    text {p.automation?.text_input ?? "?"}
                  </Chip>
                  <Chip>변경 {changed}/{p.fields.length}</Chip>
                  {over ? <Chip tone="warn">초과 {over}</Chip> : null}
                  {bannedAfter ? <Chip tone="warn">after 금지어 {bannedAfter}</Chip> : <Chip tone="ok">after 금지어 0</Chip>}
                </span>
              </div>
              <div className="grid gap-4">
                {p.fields.map((f) => (
                  <article key={f.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 border border-border p-3 max-md:grid-cols-1">
                    <div className="col-span-full flex flex-wrap items-baseline gap-2">
                      <strong className="text-sm">{f.name}</strong>
                      <Chip>{f.limit ? `${f.after_len}/${f.limit}자` : `${f.after_len}자 · 제한 없음`}</Chip>
                      {f.over_limit ? <Chip tone="warn">초과</Chip> : null}
                      {f.changed ? <Chip tone="warn">변경</Chip> : <Chip tone="ok">동일</Chip>}
                    </div>
                    <div>
                      <div className="mb-1 flex flex-wrap gap-1">
                        <Chip>before · live</Chip>
                        {f.before_banned.map((b) => (
                          <Chip key={b} tone="warn">{b}</Chip>
                        ))}
                      </div>
                      <pre className="m-0 whitespace-pre-wrap break-words bg-surface p-3 font-sans text-[13px] leading-relaxed text-fg-2">
                        {f.before ?? "(live 미수집)"}
                      </pre>
                    </div>
                    <div>
                      <div className="mb-1 flex flex-wrap gap-1">
                        <Chip tone="ok">after · canonical</Chip>
                        {f.after_banned.map((b) => (
                          <Chip key={b} tone="warn">{b}</Chip>
                        ))}
                      </div>
                      <pre className="m-0 whitespace-pre-wrap break-words border border-border p-3 font-sans text-[13px] leading-relaxed">
                        {f.after}
                      </pre>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {others.length ? (
          <section>
            <h2 className="m-0 mb-2 font-mono text-xs uppercase tracking-wide text-muted">제외·보류</h2>
            <ul className="m-0 p-0 text-sm">
              {others.map((p) => (
                <li key={p.id} className="list-none py-1">
                  <span className="font-mono text-xs">{p.id}</span> · {p.name} · <Chip>{p.status}</Chip>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
