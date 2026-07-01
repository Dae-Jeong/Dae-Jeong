# AGENTS

이 repo는 김대정의 profile, resume homepage, agent workflow, writing, JD 분석을 위한 개인 source-of-truth workspace다.

Codex, Claude, 또는 다른 문서/코딩 agent가 이 repo에서 작업할 때는 이 문서를 따른다.

## 시작할 때 읽을 문서

세션을 시작하면 먼저 아래를 읽는다.

1. [context/manifest.yaml](context/manifest.yaml) — 작업 목적별 읽는 순서와 쓰는 위치
2. [context/index.md](context/index.md) — repo 전체 source-of-truth 라우터
3. [context/current-state.md](context/current-state.md) — 현재 작업 상태와 다음 단계
4. [profile/README.md](profile/README.md) — 김대정 profile 원장 인덱스

이력서, 홈페이지, JD, agent/AX 관련 작업이면 `docs/resume/README.md`도 확인한다.

새 문서를 만들거나 기존 문서의 역할을 바꿀 때는 [rules/document-routing.md](rules/document-routing.md)를 먼저 읽는다.

## Source Of Truth 구조

| 경로 | 역할 | 먼저 볼 파일 |
| --- | --- | --- |
| `context/` | repo 라우팅, 현재 상태, 짧은 canonical profile snapshot | `context/index.md` |
| `profile/` | 김대정에 대한 canonical source of truth | `profile/README.md` |
| `docs/resume/` | 이력서 홈페이지, JD, positioning 작업 산출물 | `docs/resume/README.md` |
| `rules/` | 문서 위치와 변경 라우팅 규칙 | `rules/document-routing.md` |
| `docs/superpowers/` | agent 실행 계획과 skill 기반 작업 기록 | 필요한 plan/spec 문서 |

## 작업별 라우팅

| 작업 | 읽기 | 쓰기 |
| --- | --- | --- |
| 자기소개/hero/bio 작성 | `profile/identity.md`, `docs/resume/04-*`, `05-*` | `profile/identity.md` 또는 `docs/resume/` |
| 경력/회사 프로젝트 정리 | `profile/career.md`, `profile/contribution.md`, `docs/resume/02-*` | `profile/career.md`, `profile/contribution.md` |
| BE/Infra 역량 정리 | `profile/capabilities.md`, `docs/resume/02-*`, `05-*` | `profile/capabilities.md` |
| Agent/AX 섹션 작성 | `profile/agent-workflow.md`, `docs/resume/03-*`, `05-*` | `profile/agent-workflow.md` |
| 글감/블로그 기획 | `profile/writing.md`, `docs/resume/04-*`, `05-*` | `profile/writing.md` |
| JD 분석 | `docs/resume/05-*`의 JD 준비 항목 | `docs/resume/06-*`, `07-*` |

## 작성 원칙

- `profile/`은 짧고 안정적인 원장이다. 긴 근거와 분석은 `docs/resume/`에 둔다.
- 같은 내용을 여러 파일에 복사하지 말고 링크한다.
- 공개 문구를 만들 때 `Unknown`, `Unverified`, `Inference`, `Assumption`을 구분한다.
- 회사 프로젝트 claim은 repo 문서, 코드, Git history, PR, 운영 문서 근거가 있을 때만 강하게 쓴다.
- 민감한 고객사 정보, credential, raw private conversation, 내부 운영 비밀은 기록하지 않는다.

