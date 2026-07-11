# Resume Master v1 Implementation Plan

**Status:** Complete (2026-07-11). Active artifact: `products/resume/master/v1/`.

**Goal:** evidence-linked claim만 사용해 15초 안에 Backend Engineer / AI Product Systems 적합성을 전달하는 public-ready A4 master v1을 만든다.

**Boundary:** v0는 구조·시각 reference일 뿐 content source가 아니다. Resume는 hooking만 담당하고 문제·접근·구현의 깊이는 portfolio case가 소유한다.

**Canonical inputs:** `profile/`, `evidence/claims/`, `products/resume/content-contract.md`, `rules/public-safety.md`

## Task 1: Select The Master Claims

**Files:**
- Modify: `products/resume/claim-map.yaml`
- Read: `profile/*.md`, `evidence/claims/*.yaml`

1. Summary, capabilities, projects, career, agent workflow, credentials별 후보 claim ID를 선택한다.
2. `public: true`, confidence, strength, allowed/forbidden copy를 확인한다.
3. 중복 proof를 제거하고 대표 프로젝트는 최대 3개로 제한한다.
4. `uv run python scripts/validate_workspace.py`로 ID를 검증한다.

## Task 2: Write The 15-Second Content Draft

**Files:**
- Create: `products/resume/master/v1/content.md`
- Modify: `products/resume/claim-map.yaml`

1. 헤더 role-line과 요약 3~4줄을 작성한다.
2. capability 5~6그룹을 선언 1줄 + claim 근거 1줄로 작성한다.
3. 기술 4행, 대표 프로젝트 최대 3개, compact career timeline을 작성한다.
4. Agent Workflow는 전체 유지/제거 두 안만 비교한다.
5. 각 bullet 옆에 비공개 authoring metadata로 claim ID를 기록한다.

## Task 3: Run Editorial And Evidence Gates

**Files:**
- Modify: `products/resume/master/v1/content.md`

1. 헤더+요약만 읽는 15초 테스트를 수행한다.
2. 문장체, marketing rhetoric, 배경 설명, 상세 work log를 제거한다.
3. 모든 role verb가 claim strength 상한을 지키는지 대조한다.
4. provider·고객사·팀원·private path·commit count·미검증 수치를 검색한다.
5. 면접에서 evidence anchor로 설명할 수 없는 문장을 완화하거나 제거한다.

## Task 4: Implement The A4 Artifact

**Files:**
- Create: `products/resume/master/v1/resume.html`
- Create: `products/resume/master/v1/resume.pdf`
- Read: `skills/tailor-resume/assets/resume-template.html`

1. template과 v0의 검증된 layout pattern만 사용해 HTML을 만든다.
2. public bullet에 `data-claim`을 넣고 claim map과 일치시킨다.
3. contact와 credentials를 canonical profile source와 대조한다.
4. external font 실패에도 fallback이 유지되게 한다.

## Task 5: Render And Inspect

1. 아래 명령으로 PDF를 생성한다.

```bash
uv run python skills/tailor-resume/scripts/html_to_pdf.py \
  products/resume/master/v1/resume.html \
  products/resume/master/v1/resume.pdf
```

2. A4 1~2페이지, overflow, clipping, 겹침, orphan heading을 검사한다.
3. 100% scale에서 hierarchy와 한 줄 bullet scanability를 이미지로 확인한다.
4. `uv run python scripts/validate_workspace.py`를 실행한다.

## Task 6: Sync Product Consumers

**Files:**
- Modify: `products/resume/README.md`
- Modify: `products/homepage/public-content.md` only when v1 is approved
- Read: `products/portfolio/cases/README.md`

1. v1을 active general master로 표시하고 v0는 baseline으로 유지한다.
2. 홈페이지의 category와 대표 proof가 v1과 같은 claim set을 소비하는지 확인한다.
3. 대표 프로젝트와 portfolio case의 집합·순서를 연결한다.
4. `uv run python scripts/verify_portable_clone.py`로 clean-clone contract를 재검증한다.

## Completion Criteria

- 모든 public bullet이 known public claim ID에 연결됨
- 헤더와 요약이 15초 테스트 통과
- A4 1~2페이지 시각 QA 통과
- public-safety 위반 0건
- resume/portfolio/homepage 사이 claim strength drift 0건
- portable clone verifier 통과
