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
- `lib/documents/`: 화면 컴포넌트가 데이터를 쿼리하는 단일 Data Access Layer (`repository.ts`, `server-only`).
- `content/documents/`: JSON 데이터 저장소 및 디렉토리 자동 스캔 드라이버 (`storage.ts`, `server-only`).

private 읽기 직전 loader·관리자 page·proxy·API의 세션 검증을 유지한다. 서버 모듈은 `server-only`, shared mapping은 Node ≥22.18의 기본 type stripping과 `erasableSyntaxOnly`를 사용한다. 인쇄 분할 알고리즘은 그대로이며 회사별 인쇄 예외나 revision 화면을 추가하지 않는다.

## 데이터 접근 계층 (DAL) & 신규 회사 추가 가이드

프론트엔드 화면은 데이터를 직접 import하지 않고, 백엔드/DB 추상화와 동일하게 `lib/documents/repository.ts`를 통해서만 단일 인터페이스(`getDocument`, `listDocumentEntries`)로 데이터를 서빙받아 렌더링합니다.

### 1. 핵심 아키텍처 원칙
- **Single Source of Truth (SSOT)**: 공개 여부(`visibility`), 승인 상태(`status`) 등 모든 메타데이터는 TypeScript 코드가 아닌 JSON 파일 자체가 소유합니다.
- **개방-폐쇄 원칙 (OCP)**: 새로운 회사나 리비전이 추가되어도 **TypeScript 코드는 단 1줄도 수정하지 않습니다 (Zero Code Change)**.
- **서버 격리 (`server-only`)**: 파일 I/O와 데이터 파싱 로직(`storage.ts`, `repository.ts`)은 서버에서만 실행되며, 클라이언트 번들에 0바이트로 격리됩니다.

### 2. 신규 회사 추가 3단계 (Step-by-Step)

#### Step 1: 디렉토리 생성
`app/fe/content/documents/companies/{company-slug}/revisions/{revision-id}/`
- `{company-slug}`: 소문자 영문 및 하이픈 (예: `socar`, `miridih-pe`)
- `{revision-id}`: 날짜-리비전 형식 (예: `20261001-R1`)

#### Step 2: 필수 JSON 파일 배치
해당 디렉토리에 규격에 맞는 JSON 데이터를 생성합니다.
- `resume.json` : 이력서 데이터 (필수)
- `career.json` : 경력기술서 데이터 (필수)
- `presentation.json` : 화면 프레젠테이션/강조 설정 (선택)
- `emphasis.json` : 키워드 강조 목록 (선택)

#### Step 3: 무회귀 검증 실행
```bash
node tools/check_documents.mjs
make verify-all ARGS='--port 3001'
```
검증 통과 시 `/{company-slug}/resume`, `/{company-slug}/career` 경로가 즉시 활성화됩니다.

### 3. JSON 데이터 필수 필드 규약

데이터 파일 최상위에 아래 메타데이터가 반드시 포함되어야 합니다.
```json
{
  "slug": "company-slug",
  "document": "resume",
  "revision": "20261001-R1",
  "visibility": "public",
  "status": "approved",
  "approved": true,
  "companyName": "회사명",
  "position": "포지션명",
  "updatedAt": "2026-10-01",
  "content": { ... }
}
```
- `visibility`: `"public"`이면 외부 방문객 공개, `"local"`이면 개발/로컬 환경 전용.
- `status`: `"approved"`이면 정식 승인본, `"draft"`이면 초안 상태.

### 4. ❌ 절대 금지 사항 (Anti-Patterns)

향후 유지보수 시 다음 패턴은 엄격히 금지됩니다:
1. **UI 컴포넌트에서 특정 회사 JSON을 정적 import하는 행위**
   - ❌ `import resumeData from '@/content/documents/companies/...'`
   - ⭕ `await getDocument({ scope: "company", company: slug, kind: "resume" })`
2. **TypeScript 코드에 회사 목록이나 공개 여부를 하드코딩하는 행위**
   - ❌ `const publicCompanies = new Set(["socar", "sagak"]);`
   - ⭕ 데이터 파일의 `"visibility": "public"` 속성으로 제어
3. **`companies/index.ts`에 수동 import 목록을 작성하는 행위**
   - `storage.ts`의 `loadCompanySources()`가 런타임에 디렉토리를 자동 감지하므로 수동 등록 불필요.
4. **하위 레이어(`policy.ts`, `storage.ts`)를 화면에서 직접 우회 호출하는 행위**
   - 화면 및 URL 리다이렉터는 반드시 `lib/documents/repository.ts`를 경유할 것.
