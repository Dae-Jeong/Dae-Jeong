---
name: tailor-resume
description: 특정 회사/JD에 맞춘 이력서 HTML을 생성한다. 검증된 profile 소스(claim strength 표, 공개 가드레일)에서만 재료를 선별해, 채용 담당자가 15초 안에 적합성을 판단할 수 있는 맞춤 이력서와 JD 매칭 리포트를 만든다. 사용 시점 — (1) "/tailor-resume [JD URL 또는 텍스트]" (2) "OO 회사에 지원할 이력서 만들어줘", "이 JD에 맞춰 이력서 조정해줘" 같은 요청 (3) 채용 공고 URL과 함께 맞춤 이력서를 요청할 때.
---

# Tailor Resume

특정 회사의 JD에 맞춘 이력서를 검증된 profile 소스에서 생성한다.

핵심 관점 두 가지:

1. **근거를 유지한 맞춤** — 재료는 소스에 있는 것만 쓴다. JD에 맞춘다는 것은 사실을 바꾸는 게 아니라 선별·배열하는 것이다.
2. **선별이 곧 가치** — 모든 내용을 나열하지 않는다. 채용 담당자가 15초 안에 "이 지원자는 우리에게 적합하다"를 판단하게 만드는 것이 목표다.

## Workflow

### 1. JD 입수

- URL이면 사용 가능한 웹 fetch 수단(fetch 도구 또는 curl)으로 수집. JS 렌더링 페이지(점핏/랠릿/로켓펀치 등)면 Playwright 같은 브라우저 도구로 직접 열어서 읽는다. 원티드 URL(`wanted.co.kr/wd/{id}`)이면 API가 더 정확하다:
  `curl -s "https://www.wanted.co.kr/api/v4/jobs/{id}" -H "User-Agent: Mozilla/5.0"` → `job.detail.{requirements,preferred_points,main_tasks}`, `job.position`, `annual_from/to`
- 텍스트/파일이면 그대로 사용.
- 회사명을 확인한다 (출력 파일명에 필요).

### 2. JD 분석

다음을 추출한다:

- 자격 요건 / 우대 사항 (구분 유지)
- 기술 스택 키워드, 요구 연차, 도메인
- 회사가 가장 원하는 것 2~3개 판정 — 이것이 hooking 대상이다
- AI/LLM/agent 관련 요구 — 있으면 Agent Workflow 섹션 강조 근거

### 3. 소스 매칭

[references/source-contract.md](references/source-contract.md)를 읽고 소스 파일에서 재료를 수집한다.

- JD의 각 요구 항목에 대응하는 검증된 근거를 찾는다. 탐색 깊이: 10번 bullet → impact case → work log (grep).
- `scripts/jd/profile_skills.json` 기준: `none` 스킬은 이력서에 올리지 않는다. `partial`은 실제 근거 수준으로만 서술.
- 대응 근거가 없는 요구는 gap으로 기록한다 — 채우려 하지 않는다.

### 4. 맞춤 구성 — 정적 프레임 안에서 선별

스킬 동봉 템플릿 `assets/resume-template.html`을 베이스로 사용한다. 섹션 구성/개수/분량 규칙은 [references/content-rules.md](references/content-rules.md)를 따른다 — **이력서는 정적 프레임이고, JD 맞춤은 "무엇을 고르고 어떤 순서로 놓는가"로만 한다.**

- `[[SLOT:...]]`만 채우고 FIXED 영역(연락처, 수상·특허·교육, 푸터)은 유지.
- 이력서는 hooking, 깊이는 포트폴리오 몫 — 2문장 이상의 설명이 필요해지는 내용은 넣지 않는다 (content-rules의 이력서/포트폴리오 분리표 준수).
- 요약은 JD 핵심 요구 2~3개에 직접 대응하도록 재작성 (15초 테스트).
- 슬롯에 넣을 전체 콘텐츠 예시는 `docs/resume/14-resume-draft-v1.html` 참고.

### 5. 이력서 출력

- HTML: `docs/resume/tailored/{회사명-slug}/resume.html`
- PDF: `python3 skills/tailor-resume/scripts/html_to_pdf.py [HTML 경로]` — 같은 위치에 `resume.pdf` 생성 (Python playwright 필요, A4/@page CSS 존중)

### 6. 포트폴리오 조립 — 지원 패키지 완성

`assets/portfolio-template.html` 베이스. 설계: `docs/resume/15-portfolio-pipeline-design.md`.

- **이력서 04 대표 프로젝트와 1:1** — 같은 케이스, 같은 순서로 `docs/resume/cases/{slug}.md`를 로드해 조립.
- 케이스가 cases/에 없으면 그 자리에서 쓰지 않는다 — 라이브러리에 먼저 추가(cases/README 규칙) 후 조립.
- 케이스 md의 `diagram:` 라인은 `->` 구분 노드로, `[soft]` 접두는 soft 노드로 변환.
- 인트로는 이력서 01과 동일 논지 2~3줄 (확장 금지). casenav는 케이스 수에 맞게 생성.
- 출력: `docs/resume/tailored/{회사명-slug}/portfolio.html`. 이력서 contact에 포트폴리오 링크를 넣고 PDF 재생성.
- 렌더링 확인 후 대화 응답에 매칭 리포트를 요약한다:
  - JD 핵심 요구 - 대응 근거 (어떤 프로젝트/경험이 매칭됐는지)
  - Gap: 대응 근거가 없는 요구 (정직하게)
  - 선별 내역: 무엇을 앞세우고, 무엇을 압축/제거했는지

### 7. 신뢰성 검증 — 전달 전 마지막 게이트

완성된 이력서·포트폴리오를 **채용담당자 관점에서** 다시 읽고 짚는다:

- 안 믿길 것 같은 서술 — 근거가 소스에 있으면 표현을 조정해 근거를 드러내고, 없으면 완화하거나 제거
- 면접 검증 질문("어떻게 측정했나", "정말 직접 했나")에 방어할 수 없는 표현
- 전임자/기존 코드 폄하로 읽힐 수 있는 문제 서술
- 발견·수정 내역은 매칭 리포트에 포함

## 절대 가드레일 (맞춤 조정보다 우선)

1. **사실 창조 금지** — 소스에 없는 경험/스킬/수치를 만들지 않는다. JD가 요구해도 없으면 gap이다.
2. **Claim strength 준수** — `docs/resume/09`의 "Claim strength — Git 검증 결과" 표가 표현 강도의 상한이다 (전담/주도/공동/참여 구분).
3. **공개 가드레일** — 09의 Public Safety Guardrails 준수: provider 실명 금지, 고객사/브랜드명 금지, 팀원 실명 금지, 커밋 수치 금지, 주소는 시 단위.
4. **왜곡 금지** — 선별/배열/압축은 자유, 의미 변경은 금지.

## 완료 기준

- [ ] JD의 자격 요건 각각에 대해 매칭 근거 또는 gap이 판정됨
- [ ] 첫 화면이 15초 테스트를 통과함 (요약이 JD 핵심 요구에 직접 대응)
- [ ] 분량 A4 1~1.5장 이내
- [ ] 모든 bullet이 소스 파일로 역추적 가능, claim strength 상한 초과 없음
- [ ] 출력 HTML 렌더링 + PDF 생성 확인 (A4, 페이지 수 1~2 이내)
- [ ] 포트폴리오가 이력서 04와 1:1 sync (같은 케이스·같은 순서), 모든 케이스가 cases/ 라이브러리 출처
- [ ] 신뢰성 검증 통과 — 채용담당자가 안 믿을 서술 0건 (근거 노출 또는 완화 완료)
