# app/fe — marinkim.xyz (Next.js)

Next.js(App Router) + TypeScript + Tailwind v4. 구조·스택의 canonical은 [Phase 1 stack plan](../../wiki/docs/superpowers/plans/2026-07-17-site-phase1-stack-and-structure.md), 디자인 기준은 [app/design](../design/README.md).

- 배포: Vercel, Root Directory=`app/fe`, marinkim.xyz
- 회사별 맞춤 이력서는 `content/resumes/{company}.ts`가 문안을 소유하고 `/resume/{company}`에서 같은 resume shell로 렌더링한다. `visibility=public`만 production에서 열리며, `status=draft`는 공개 검토 중임을 화면에 표시한다. 검색 sitemap에는 등록하지 않고 page metadata는 `noindex`로 유지한다.
- 경계: 이 폴더 밖(특히 `wiki/`)을 직접 읽지 않는다 — 콘텐츠 유입은 export 스크립트 하나
- Next 버전 특이사항: [AGENTS.md](AGENTS.md) 참고 (`node_modules/next/dist/docs/` 우선)
- 디자인 시스템: 토큰은 `app/globals.css`(@theme), 컴포넌트는 `components/site·ui`, living specimen은 `/design` 라우트 — 디자인 canonical은 [component-sheet](../design/component-sheet.html)

## 개발

```bash
pnpm dev      # 개발 서버 (Turbopack)
pnpm build    # 프로덕션 빌드
pnpm lint
```
