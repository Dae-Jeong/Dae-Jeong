# app — 프로필 제품 (marinkim.xyz)

| 폴더 | 배포 | 내용 | 실체 생성 시점 |
| --- | --- | --- | --- |
| [fe/](fe/README.md) | Vercel (Root Directory=`app/fe`) | Next.js + TypeScript + Tailwind v4 — 모든 화면 + visitor chat serverless | Phase 1 scaffold |
| [be/](be/README.md) | Render (free) | FastAPI — jarvis backend (RAG·wiki 인덱싱·대화 메모리) | jarvis 착수 시 |
| [design/](design/README.md) | (배포 없음) | 확정 디자인 스냅샷 — 작업은 D2, 확정본만 승격. fe 구현의 기준 | ✅ 승격됨 (화면 4장) |

경계: fe는 `app/fe` 밖을 직접 읽지 않는다 (콘텐츠 유입은 tools의 export 스크립트 하나). be는 상태를 전부 Supabase에 둔다 (Render는 휘발).

설계·스택의 canonical: [architecture spec](../wiki/docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) · [Phase 1 stack plan](../wiki/docs/superpowers/plans/2026-07-17-site-phase1-stack-and-structure.md)
