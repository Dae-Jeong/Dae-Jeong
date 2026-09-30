# app/fe — marinkim.xyz (Next.js)

Next.js(App Router) + TypeScript + Tailwind v4. 디자인 기준은 [DESIGN.md](DESIGN.md). 과거 HTML 시안(`app/design`)은 2026-09-30 제거했고 사본은 로컬 `output/harness/site-remove-extra-surfaces-20260930/before/app-design`에 있다.

- 배포: Vercel, Root Directory=`app/fe`, marinkim.xyz
- 방문객 IA는 `/`·`/resume`·`/career`·`/cv`다. 회사 문서는 `/{company}/resume|career|cv` 대표 URL 하나이며(`features/company-documents/policy.ts`) sitemap에 넣지 않고 `noindex`다. 관리자 화면(`/admin`·`/admin/map`)은 세션 없이 404다. 플랫폼 비교 화면(`/admin/platforms`·구 `/_platforms`)은 제거되어 누구에게나 404다.
- 경계: 이 폴더 밖(특히 `wiki/`)을 직접 읽지 않는다 — 콘텐츠 유입은 export 스크립트 하나
- Next 버전 특이사항: [AGENTS.md](AGENTS.md) 참고 (`node_modules/next/dist/docs/` 우선)
- 디자인 시스템: 토큰은 `app/globals.css`(@theme), 컴포넌트는 `components/site·ui`. `/design` specimen 라우트는 제거됐다.

## 개발

```bash
pnpm dev      # 개발 서버 (Turbopack)
pnpm build    # 프로덕션 빌드
pnpm lint
```

## FE 책임 구조

- `app/admin/`: 인증 뒤 관리자 route와 route `_components`.
- `app/_components/`: 여러 화면의 도메인 UI·푸터 조립·문서 종류별 단일 renderer와 인쇄 CSS.
- `features/<domain>/`: 평평한 API/type/hook·정책·mapping·서버 loader. 이름은 폴더 문맥을 반복하지 않는다.
- `components/`: features를 import하지 않는 공용 UI. FooterBar는 이름 slot만 표시한다.
- `lib/routes.ts`: 방문객/관리자 링크·구 관리자 주소 redirect 등록. 회사 문서 URL은 `features/company-documents/urls.ts`에서 검증 후 정규화한다.

private 읽기 직전 loader·관리자 page·proxy·API의 세션 검증을 유지한다. 서버 모듈은 `server-only`, shared mapping은 Node ≥22.18의 기본 type stripping과 `erasableSyntaxOnly`를 사용한다. 인쇄 분할 알고리즘은 그대로이며 회사별 인쇄 예외나 revision 화면을 추가하지 않는다.
