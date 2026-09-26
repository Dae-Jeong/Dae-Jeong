---
name: application-write-docs
description: Write, adapt, render, or archive a company-specific resume, career-description, portfolio, and optional CV package from an analyzed posting (jd.md + match-report.md). Uses a Markdown-first content review before HTML/PDF rendering. For posting fit analysis alone, use application-analyze-posting.
---

# Application Write Docs

특정 JD에 맞춘다는 것은 사실을 다시 쓰는 일이 아니라 검증된 claim을 회사가 돈을 주고 맡길 **성과 축**으로 선택·묶음·배열하는 일이다. 성과 축은 어떤 경험을 고를지 정하는 내부 분석 도구이며, 독자가 보는 목차는 사용자와 정한 구조를 쓴다 (현재 미리디 R3는 회사 경력 → 회사별 프로젝트). Common은 이력서·경력기술서·포트폴리오·CV 네 문서를 유지하고, 회사별 package는 이력서·경력기술서·포트폴리오를 기본으로 조립하며 CV만 선택한다.

내용과 레이아웃을 분리한다. 먼저 Markdown에서 사용자와 문장을 확정하고, 명시적 승인 뒤에만 HTML/PDF를 만든다.

## 준비

1. [source contract](references/source-contract.md)를 읽는다.
2. [content rules adapter](references/content-rules.md)가 가리키는 canonical resume 계약을 읽는다.
3. `uv sync --project tools`로 선언된 runtime을 준비한다.

## Workflow

### 1. Take the Posting Analysis

공고 수집·Eligibility gate·요구별 claim 판정은 [application-analyze-posting](../application-analyze-posting/SKILL.md)이 소유한다. 이 skill은 그 결과를 입력으로 받아 문서 설계부터 시작하며, 같은 판정을 다시 하지 않는다.

- 입력은 지원 폴더의 `jd.md`와 `match-report.md`다.
- 둘 중 하나가 없거나 공고 ID·원문이 바뀌었으면 application-analyze-posting을 지원 폴더 모드로 먼저 실행해 만든다. 같은 공고이고 원문이 그대로면 기존 파일을 재사용한다.
- 판단이 `비추천`이거나 hard blocker가 있으면 문안 작성 전에 사용자에게 알리고 진행 여부를 받는다.

### 2. Decide Outcome Axes

회사가 가장 원하는 결과를 판정한다. 축의 수를 미리 고정하지 않고 JD 우선순위와 검증 가능한 case가 결정하게 한다.

- 직무명·기술명·프로젝트명 대신 `돈을 주고 맡기면 어떤 상태를 만들어 주는가`로 축을 쓴다.
- `FastAPI`, `비동기`, `어드민`은 성과가 아니라 수단이다. `실패 가능한 업무를 격리하고 복구한다`, `운영 중인 서비스를 재구축해 안정화한다`처럼 결과와 동작을 함께 쓴다.
- JD 문장을 그대로 옮기지 말고 업무·자격·우대 요건을 채용사가 구매하는 결과로 번역한다.
- 서로 겹치는 요구는 하나의 성과 축으로 묶는다. 지원서 전체에서 지원 전략과 사실은 일치시키되, 목차·순서·깊이는 각 문서의 역할과 사용자 결정을 따른다.
- 시장 참고가 필요하면 `wiki/products/jd/reports/`를 읽되 특정 JD 원문을 우선한다.

### 3. Match Claims Many-to-Many

- `match-report.md`의 요구별 판정(strong/partial/gap/check)과 claim ID에서 출발한다. 요구 단위 판정을 여기서 바꾸지 않으며, 판정이 틀렸으면 match-report를 먼저 고친다.
- `성과 축 × claim × source project` 다대다 매트릭스를 만든다. 한 성과는 여러 프로젝트의 claim으로 증명할 수 있고, 한 프로젝트도 서로 다른 성과 축의 근거가 될 수 있다.
- 각 성과 축은 최소 1개의 verified claim을 가져야 한다. 가능하면 서로 다른 맥락의 프로젝트 2개 이상으로 반복 가능성을 보여준다.
- 프로젝트명은 독자가 무엇을 만든 일인지 알 수 있게 쓴다. 내부 성과 축 분류표를 그대로 공개 목차로 강제하지 않는다.
- `partial`은 evidence가 허용하는 범위로만 쓴다.
- `gap`은 문안으로 메우지 않는다. 대응 claim이 없으면 내용을 만들지 않는다.

### 4. Create the Markdown Content Draft

성과의 상세 해석과 문서별 압축은 [성과 라이브러리](../../../wiki/products/portfolio/cases/README.md)에서
먼저 고른다. `JD별 활용`과 경력기술서·이력서·CV 후보를 읽고 아래 기존 블록 기본값과 함께
조립한다. [조립 예](../../../wiki/products/resume/achievement-library-assembly.md)를 참고하되
실제 JD의 관련성과 최신 claim을 우선한다. 인프라 등 Common 비선택 사례도 활용할 수 있다.

엔지니어링 문안은 [개인 판단 기준](../../../wiki/profile/decision-principles.md)과 [Application Copy Standard §1-6](../../../wiki/rules/application-copy-standard.md)의 `엔지니어링 판단의 구체성`을 적용한다. 경력의 책임 범위를 보존하면서, `구축·안정화`를 해당 경험만의 설계 판단으로 구체화한다. 사고방식의 참고 자료와 실제 구현을 증명하는 claim은 별개 입력으로 취급한다.

`wiki/products/resume/tailored/_template/content-draft.md`를 복사해 지원 폴더의 `content-draft.md`를 만든다. 이 파일이 승인 전 문안의 canonical owner다.

- 성과·소개·경력 행·기술 문안은 `wiki/products/resume/resume-block-library.md`의 블록에서 시작한다. 사실·수치·기여 강도·mechanism의 의미는 보존하며, 연결 claim과 최신 문안 기준 범위 안에서 선택·순서·연결 문장·헤더 직함을 조정하고 설계 판단을 구체화한다 (`wiki/rules/application-copy-standard.md` §1-6·§3). 블록의 오래된 표현을 최신 owner보다 우선하지 않는다.

- 사례·경력 문단의 읽히는 순서와 이력서/경력기술서 깊이 구분은 §1-6 `경력 문장의 주도성과 성과 의미`(canonical: `wiki/rules/application-copy-standard.md`)를 따른다. 이 skill은 내용을 복제하지 않고 그 규칙과 게이트 45 사람 검사를 읽어 적용한다.
- resume·career description·portfolio와 선택한 CV에 들어갈 **실제 공개 문장 전체**를 Markdown에 먼저 쓴다.
- 문제·제약 → 대안과 선택 → 구현 경계 → failure mode → 검증 → 결과·한계는 **작성 전 점검 질문**이다. 이력서에는 독자가 역량을 판단하는 데 필요한 것만 선별해 쓰고, 나머지 상세는 경력기술서가 소유한다. 모든 불릿에 같은 밀도를 강제하지 않는다 (§1-6 「경력 문장의 주도성과 성과 의미」).
- 사용자가 지정한 밀도가 있으면 그것을 우선한다 (현재 합의: 독립 사례는 최소 3줄, 그만한 내용이 없는 사례는 묶는다). 지정이 없으면 수와 줄 수를 먼저 고정하지 않는다. 줄 수를 채우려고 사실을 만들지 않으며, 추가 case는 새로운 technical signal을 제공할 때만 포함한다.
- 포트폴리오는 이력서와 같은 사실·지원 전략을 공유하되 순서와 깊이는 자기 역할에 맞춘다. 이력서의 압축된 한 줄을 이어받아 선별 사례를 확장하는 관계로 배치한다.
- 경력기술서는 프로젝트별 `문제 → 담당 범위 → 선택 → 구현 → 검증 → 결과·한계`를 기록하고 이력서 bullet을 길게 복제하지 않는다.
- CV는 전체 chronology와 credential의 누락 없는 확인을 우선한다. 회사별 CV가 필요 없으면 `omitted`를 정상 상태로 기록하고 빈 문서나 route를 만들지 않는다.
- 프로젝트별 상세 문제·판단·기여·결과·한계를 분리한다.
- 서로 다른 프로젝트의 수치를 더하거나 하나의 인과관계·통합 프로젝트처럼 쓰지 않는다.
- 각 성과와 proof에 claim ID를 함께 적어 검토 중에도 근거를 잃지 않는다.
- FIXED contact와 credentials는 확인 없이 변경하지 않는다.
- `claim-map.yaml`은 section mapping과 함께 `outcomes` 아래에 `title`, `employer_need`, `claim_ids`, `source_cases`를 기록한다.

### 5. Stop at the Content Review Gate

사용자가 `바로 PDF까지`, `렌더링까지`, `이대로 확정`처럼 명시하지 않았다면 첫 실행은 Markdown 작성에서 멈춘다.

이 정지 조건은 **문안을 제출 가능한 산출물로 진행시키는 단계**에만 적용한다. 로컬 preview·화면 검토, 스킬·규칙 정합, 분석·검토 기록처럼 이미 허용된 독립 작업은 이 게이트를 이유로 중단하지 않는다.

- `README.md` 상태를 `내용 검토 중`으로 둔다.
- 사용자에게 `content-draft.md` 링크와 핵심 선택, `[확인 필요]` 항목을 전달한다.
- 경험의 의미·역할·선택 이유·성과가 모호하거나 **새 우선순위 결정**이 필요하면 임의로 메우지 않는다. 확인된 근거·결정 지점·선택지·권고를 짧게 올리고 **그 결정에 의존하는 문안만** 보류한다. 이미 합의된 순서·표현 방향은 재확인 없이 실행하고, 의미를 바꾸지 않는 문장 정리는 그대로 진행한다 (`wiki/rules/application-copy-standard.md` §1-6 「최신 사용자 합의·사실 동기화·결정 경계」·게이트 51).
- 사용자 피드백이 **표현·구조 편집**이면 먼저 `content-draft.md`와 `claim-map.yaml`에 반영한다. **경험 사실의 추가·교정**이면 [copy-apply-decision](../copy-apply-decision/SKILL.md)의 Wiki 단계(evidence → claim)를 먼저 끝내고 그 다음에 문안을 고친다. HTML이나 PDF만 직접 고치지 않는다.
- `approved: false` 동안 `package/`의 파일은 제출본이 아니다. 기존 PDF가 있으면 삭제하지 말고 `preview`로 명시한다.
- 무엇을 승인했는지 구분한다. **문안 내용 승인**만 `approved: true`·`approved_at`을 기록한다. 로컬에서 화면으로 보자는 요청이나 렌더·열람 허가는 승인 값을 바꾸지 않으며 public·제출을 뜻하지도 않는다.

### 6. Build the Application Archive

공고 URL이나 본문만 주어지고 별도 지시가 없으면 개인용 지원 초안 모드로 동작한다. 회사·포지션·플랫폼은 공고 원문에서 추출하고 확인할 수 없는 값만 `[확인 필요]`로 남긴다. 플랫폼을 알 수 없으면 slug는 `platform-unknown`으로 만들고 작업을 계속한다.

`wiki/products/resume/tailored/_template/`의 현재 템플릿과 `application-lifecycle.md`를 사용해 다음 local-only 구조를 만든다. 템플릿 README의 상대 링크는 아래 실제 attempt 깊이에 맞춘다. 신규 registry record에 마감 확인 상태도 기록한다. `assets/application-package/`의 구형 양식은 현재 계약을 대신하지 않는다.

```text
wiki/products/resume/tailored/{company-slug}/{YYYY-MM-DD}_{platform}_{position-slug}/
  README.md
  jd.md
  match-report.md
  claim-map.yaml
  content-draft.md
  source/
    resume.html
    career-description.html
    portfolio.html
    cv.html                 # selected only
  package/
    resume.pdf
    career-description.pdf
    portfolio.pdf
    cv.pdf                  # selected only
```

- 폴더 하나는 회사 × 채용 건 1회를 뜻한다. 같은 채용 건이 여러 플랫폼에 올라와 있으면 기존 attempt를 재사용하고 새 폴더·문안을 만들지 않는다. 폴더 이름의 `{platform}`은 처음 확인한 경로일 뿐이다.
- `jd.md`와 `match-report.md`는 application-analyze-posting이 지원 폴더 모드로 만든다. 이 skill은 두 파일을 읽기만 한다.
- `source/`와 `package/`는 승인 후 생성한다. 승인 전 이미 존재하면 preview 상태로 유지한다. 회사별 artifact mode는 `common | tailored | omitted`로 기록한다.
- 플랫폼 제출 형식에 맞춰 package를 만든다. **원티드는 이력서 PDF를 한 개만 받으므로 `이력서 → 경력기술서` 순서의 합본 PDF**를 만든다. 다른 플랫폼이 파일 하나만 받으면 요구 문서를 같은 원칙으로 합치고, 포트폴리오 URL을 받으면 `portfolio-url.md`를 만든다.
- 실제 플랫폼 업로드나 지원 완료 표시는 사용자가 명시적으로 요청하거나 제출 사실을 알려준 뒤에만 한다.
- 지원 완료 뒤 해당 폴더는 덮어쓰지 않는다. 재지원·다른 채용 건은 새 날짜 폴더로 만든다. 같은 채용 건의 다른 플랫폼은 새 폴더가 아니다.

### 7. Render the Review Screen, Then Only the Approved Draft

PDF 승인 전 화면 검토가 필요하면 local-only review preview를 만든다. 이 preview는 Markdown을 읽기 화면으로만 변환하며 `source/`와 `package/`를 수정하지 않는다.

```bash
uv run --project tools python .agents/skills/application-write-docs/scripts/render_review_preview.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}
```

- 출력: 지원 폴더의 `preview/index.html`
- 입력: `content-draft.md`, `company-research.md`, `match-report.md`
- preview는 승인이나 제출 artifact가 아니다. 사실·문안 owner는 계속 `content-draft.md`다.
- 회사별 지원 폴더와 함께 local-only로 유지하고 공개 app route나 배포 artifact에 포함하지 않는다.
- 이력서 canvas는 공개 `/resume`의 폭·섹션 순서·타이포그래피·정보 위계를 그대로 따른다. 회사별로 바꾸는 것은 검증된 문안과 claim 선택뿐이다.
- 검토 메모·회사 리서치·JD 매칭·승인 상태는 이력서 canvas 안에 섞지 않고 바깥 review chrome과 별도 tab에 둔다.
- 데스크톱 review canvas는 `210mm × 297mm` A4 경계를 사용하고, 모바일에서는 내용 손실 없이 읽기 폭으로 전환한다.

app 반영은 **로컬 초안 표시**와 **공개**를 분리한다. 로컬에서 실제 화면으로 검토하는 것은 승인·공개·제출이 아니다.

현재 경로와 빌더는 [content-contract](../../../wiki/products/resume/content-contract.md)가 owner다. 경로를 이 skill에 복제하지 않고 그 문서를 읽어 대상을 정한다. 2026-09-13 기준 회사별 revision은 `app/fe/content/documents/companies/{slug}/revisions/{revision}/`의 JSON이며 Markdown draft에서 빌더로 생성한다. 이 JSON은 직접 손으로 고치지 않는다.
- `visibility: "local" | "public"`은 production 노출 여부, `status: "draft" | "approved"`는 문안 승인 상태를 각각 소유한다. 두 상태를 섞지 않는다.
- 공개 draft는 화면에 `DRAFT`를 명시한다. 회사별 route는 sitemap·navigation에 넣지 않고 `noindex`, `nofollow`, `noarchive`, `nosnippet`을 유지한다.
- `wiki/products/resume/tailored/.../content-draft.md`가 계속 문안 owner다. typed content는 공개 화면을 위한 export이며 독자적인 사실을 추가하지 않는다.
- A4 PDF는 문안 승인 뒤 `package/`에서 생성한다. 공개 다운로드를 연결할 때는 승인된 PDF만 `app/fe/public/resumes/`로 export한다.

승인 후에만 출력용 HTML/PDF 절차를 실행한다. 로컬에서 화면으로 확인하는 preview는 이 승인 대상이 아니며, preview를 했다고 `approved`·`public`·제출 상태가 바뀌지 않는다.

- `content-draft.md`의 승인된 문장만 `assets/resume-template.html`과 `assets/portfolio-template.html`에 옮긴다.
- HTML에서 문장을 새로 개선하거나 claim을 추가하지 않는다. 문안 변경이 필요하면 Markdown으로 돌아간다.
- portfolio page에는 `noindex`를 설정하고 resume와 연결한다.
- case의 `diagram:`은 `->` node와 `[soft]` node convention으로 변환한다.

```bash
uv run --project tools python .agents/skills/application-write-docs/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/resume.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/resume.pdf

uv run --project tools python .agents/skills/application-write-docs/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/portfolio.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/portfolio.pdf

uv run --project tools python .agents/skills/application-write-docs/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/career-description.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/career-description.pdf

# CV를 선택한 package에서만 실행한다.
uv run --project tools python .agents/skills/application-write-docs/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/cv.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/cv.pdf
```

### 8. Verify and Deliver

0. `wiki/rules/application-copy-standard.md` §4의 **현재 게이트 표 전체**를 `content-draft.md`와 대조하고, 위반 항목을 `match-report.md`에 남긴다. 게이트 수·번호를 이 skill에 고정하지 않고 그 문서를 읽어 대상을 정한다. 하나라도 걸리면 `approved: true`로 바꾸지 않는다. 게이트 45(경력 문장의 주도성과 성과 의미) 사람 검사는 사례별 읽히는 순서·기전 보존·깊이 구분 결과를 같은 보고에 남긴다.
1. `uv run --project tools python tools/validate_workspace.py`
2. JD 요구별 match 또는 gap이 모두 기록됐는지 확인한다.
3. `content-draft.md`, resume, career description, portfolio가 같은 사실과 지원 전략을 유지하는지 확인한다. 목차·순서·깊이는 문서 역할과 사용자 결정에 따르므로 일치를 강제하지 않는다. 같은 사실이 문서마다 다른 주장으로 읽히면 그것은 수정 대상이다.
4. 모든 bullet이 claim ID와 역추적되는지 확인한다.
5. `allowed_copy`와 public-safety 상한을 넘지 않는지 확인한다.
6. 여러 프로젝트를 묶은 문장이 source별 claim 경계와 metric 귀속을 보존하는지 확인한다.
7. 선택한 모든 PDF를 생성하고 page 수는 gate로 쓰지 않는다. 첫 장의 category·경력·최강 근거 scanability, 이후 페이지의 technical signal, A4 100% scale의 잘림·겹침을 image로 확인한다.
8. 면접에서 근거를 설명할 수 없는 문장을 완화하거나 제거한다.
9. 최종 응답에 archive 경로, 현재 단계, `[확인 필요]`, 실제 플랫폼 제출 여부를 명시한다.
