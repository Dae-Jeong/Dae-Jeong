---
name: tailor-resume
description: Use when a user asks to create or adapt a resume for a specific company or job description, supplies a recruiting URL or JD text, or requests a matched resume and portfolio package.
---

# Tailor Resume

특정 JD에 맞춘다는 것은 사실을 다시 쓰는 일이 아니라 검증된 claim을 선택하고 배열하는 일이다.

## Before Starting

1. [source contract](references/source-contract.md)를 읽는다.
2. [content rules adapter](references/content-rules.md)가 가리키는 canonical resume contract를 읽는다.
3. `uv sync --project tools`로 선언된 runtime을 준비한다.

## Workflow

### 1. Acquire and Normalize the JD

- URL이면 가능한 browser/fetch 수단으로 원문을 읽는다. 원티드는 공개 API detail을 우선할 수 있다.
- 텍스트나 파일이면 제공된 내용을 그대로 사용한다.
- 자격 요건, 우대 사항, 기술, 연차, 도메인, AI/LLM/agent 신호를 구분한다.
- 회사명은 보고서에만 쓰고 public output path에는 넣지 않는다.

### 2. Decide the Hook

회사가 가장 원하는 조건 2~3개를 판정한다. 이것이 요약과 capability 순서의 기준이다. 시장 참고가 필요하면 `wiki/products/jd/reports/`를 읽되 특정 JD 원문을 우선한다.

### 3. Match Claims

- JD 요구마다 `wiki/evidence/claims/*.yaml`의 stable claim ID를 연결한다.
- `wiki/products/jd/profile-skills.json`의 `none`은 gap으로 기록한다.
- `partial`은 evidence가 허용하는 범위로만 쓴다.
- 대응 claim이 없으면 내용을 만들지 않고 gap으로 남긴다.

### 4. Compose Inside the Fixed Contract

- `assets/resume-template.html`의 `[[SLOT:...]]`만 채운다.
- FIXED contact와 credentials 영역은 source 확인 없이 변경하지 않는다.
- 요약은 JD 핵심 2~3개와 primary category를 3~4줄 안에서 연결한다.
- 상세한 문제·선택·구현 설명은 resume에서 제거하고 portfolio case로 보낸다.
- 선택한 claim ID를 지원 산출물의 `claim-map.yaml`에 section별로 기록한다.

### 5. Build the Resume

local-only output:

```text
wiki/products/resume/tailored/{application-id}/
  resume.html
  resume.pdf
  portfolio.html
  claim-map.yaml
  match-report.md
```

`application-id`는 회사명이 아닌 opaque identifier를 사용한다.

PDF 변환:

```bash
uv run --project tools python skills/tailor-resume/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{application-id}/resume.html
```

### 6. Assemble the Portfolio

- `assets/portfolio-template.html`을 사용한다.
- 이력서 대표 프로젝트와 동일한 case를 같은 순서로 `wiki/products/portfolio/cases/`에서 로드한다.
- case가 없으면 지원 폴더에서 새로 쓰지 않는다. evidence와 claim을 등록한 뒤 canonical library에 추가한다.
- case의 `diagram:`은 `->` node와 `[soft]` node convention으로 변환한다.
- portfolio intro는 resume 요약과 논지를 공유하되 새로운 claim을 추가하지 않는다.
- page에는 `noindex`를 설정하고 resume와 서로 연결한다.

### 7. Verify Before Delivery

1. `uv run --project tools python tools/validate_workspace.py`
2. JD 요구별 match 또는 gap이 모두 기록됐는지 확인
3. 모든 bullet이 claim ID와 evidence로 역추적되는지 확인
4. allowed copy와 public-safety 상한을 넘지 않는지 확인
5. PDF가 A4 1~2페이지이고 잘림·겹침이 없는지 render image로 확인
6. portfolio case와 resume 프로젝트의 집합·순서가 동일한지 확인
7. 면접에서 근거를 설명할 수 없는 문장을 완화하거나 제거

## Guardrails

- 소스에 없는 경험, 스킬, 수치, business outcome을 만들지 않는다.
- claim registry의 strength와 allowed copy를 넘지 않는다.
- provider, 고객사, 팀원 실명, private path, commit count를 공개하지 않는다.
- 전임자나 기존 구현을 폄하하는 문제 서술을 사용하지 않는다.
- archive와 resume v0를 content source로 사용하지 않는다.
