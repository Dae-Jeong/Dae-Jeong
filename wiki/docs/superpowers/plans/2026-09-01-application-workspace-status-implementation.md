# Application Workspace Status Implementation Plan

**Status:** Implemented; visual QA pending browser availability (2026-09-01)

**Goal:** 공고 탐색과 지원 관리를 한 `/applications` route에서 오가되, 지원 상태는 `지원 전·진행중·합격·거절·탈락` 다섯 개로만 관리하고 제출 Snapshot은 덮어쓰지 못하게 한다.

**Boundary:** 기존 이력서·포트폴리오 문안, `content-draft.md`, legacy `package/preview/source`, 제출 완료된 왓섭 route는 수정하지 않는다. `/applications`는 local-only이며 production에서는 404다.

**Canonical inputs:** `wiki/products/resume/application-registry.yaml`, `wiki/products/resume/application-lifecycle.md`, `wiki/products/resume/tailored/*/README.md`

## Shared Contract

```ts
type ApplicationStatus =
  | "pre-apply"
  | "in-progress"
  | "accepted"
  | "declined"
  | "rejected"
  | "unknown"; // legacy 기록을 추정하지 않기 위한 내부 sentinel
```

- `tracking`은 `기업 검토 중`, `1차 면접 예정` 같은 자유 문구다.
- `artifactState`는 `mutable | approved | frozen`이며 status와 별개다.
- `pre-apply`, `in-progress`만 현재 진행 대상이다.
- `accepted`, `declined`, `rejected`는 종료 결과다.
- Status는 YAML만 소유하며 local README와 UI JSON은 consumer다.
- 제출 시 `Snapshot S{n}`을 만들고 기존 Snapshot을 수정하지 않는다.
- JYP·피처링처럼 별도 세션이 이어지는 지원본은 `work_session`의 scope·state·last_synced·next_action만 portable handoff로 기록한다.

## Task 1: Registry And Local Attempt Contract

**Owner:** Registry worker

**Files:**
- Create: `wiki/products/resume/application-registry.yaml`
- Modify: `wiki/products/resume/application-lifecycle.md`
- Modify: `wiki/products/resume/tailored/_template/README.md`
- Create: `wiki/products/resume/tailored/_template/submissions/.gitkeep`
- Read only: existing `tailored/*/content-draft.md`, `package/`, `preview/`, `source/`

1. Current registry records를 machine-readable YAML로 이동한다.
2. Markdown lifecycle 문서는 규칙과 YAML 링크만 소유하도록 정리한다.
3. 새 application template에 `submissions/s{n}/manifest.yaml` 계약을 추가한다.
4. Legacy folder를 이동하거나 실제 제출 artifact로 추정하지 않는다.

## Task 2: Projection Generator And Validation

**Owner:** Projection worker

**Files:**
- Create: `tools/build_application_projection.py`
- Modify: `tools/validate_workspace.py`
- Generate only: `output/application-workspace/application-attempts.json`

1. YAML schema, status enum, unique ID, artifact state를 검증한다.
2. Terminal status와 current-source 경계, frozen Snapshot 불변 조건을 검증한다.
3. UI에 필요한 필드만 local JSON으로 생성한다.
4. Generated JSON은 Git에 추가하지 않고 drift 검사 대상으로만 사용한다.

## Task 3: Local-Only Support Management UI

**Owner:** UI worker

**Files:**
- Modify: `app/fe/app/applications/page.tsx`
- Modify: `app/fe/app/applications/application-workspace.tsx`
- Create: `app/fe/app/applications/application-data.server.ts`
- Create: `app/fe/app/applications/application-types.ts`
- Create as needed: `app/fe/app/applications/application-list.tsx`, `application-detail.tsx`

1. 기존 공고 탐색 기능·filter·localStorage를 보존한다.
2. 상단에 `공고 탐색`과 `지원 관리` tab을 추가한다.
3. 지원 관리는 generated local JSON의 read-only master-detail projection만 보여준다.
4. 사용자 상태는 다섯 개로 유지하고, legacy sentinel은 `상태 미확인`으로만 표시한다. tracking은 secondary text로 둔다.
5. Production에서 `/applications`는 `notFound()` 처리한다.
6. Empty·missing projection·unknown·frozen 상태를 구현한다.

## Task 4: Integration And Verification

**Owner:** Root agent

1. 세 작업의 소유 파일과 data contract 충돌을 해소한다.
2. generator를 실행하고 registry→projection→UI 연결을 확인한다.
3. `uv run --project tools python tools/validate_workspace.py`를 실행한다.
4. `pnpm lint`와 `pnpm build`를 실행한다.
5. local browser에서 desktop과 mobile을 렌더링해 clipping·상태 위계·tab·detail을 확인한다. 현재 실행 세션에서는 browser surface가 연결되지 않아 이 항목만 후속 검증으로 남긴다.
6. production build에서 `/applications`가 404이고 private data가 client bundle에 없는지 확인한다.

## Completion Criteria

- Status canonical owner가 YAML 하나뿐이다.
- 지원 관리 화면은 다섯 사용자 status와 legacy `상태 미확인` sentinel을 구분한다.
- 기존 공고 탐색과 localStorage state가 보존된다.
- Frozen Snapshot은 overwrite되지 않는다.
- Legacy artifact는 이동·추정·삭제되지 않는다.
- `/applications`는 local에서 동작하고 production에서는 404다.
- workspace validator, lint, build, production 404, client artifact privacy 검사가 통과한다. Desktop/mobile visual QA는 browser 연결 후 완료한다.
- 커밋·배포하지 않는다.
