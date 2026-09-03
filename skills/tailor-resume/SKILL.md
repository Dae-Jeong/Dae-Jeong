---
name: tailor-resume
description: Prepare, review, adapt, render, or archive a company-specific resume, career-description, portfolio, and optional CV package when the user asks for application artifacts. Uses a Markdown-first content review before HTML/PDF rendering. Do not use for fit-only JD analysis.
---

# Tailor Resume

특정 JD에 맞춘다는 것은 사실을 다시 쓰는 일이 아니라 검증된 claim을 회사가 돈을 주고 맡길 **성과 축**으로 선택·묶음·배열하는 일이다. 프로젝트는 성과를 증명하는 출처이지 문서의 1차 목차가 아니다. Common은 이력서·경력기술서·포트폴리오·CV 네 문서를 유지하고, 회사별 package는 이력서·경력기술서·포트폴리오를 기본으로 조립하며 CV만 선택한다.

내용과 레이아웃을 분리한다. 먼저 Markdown에서 사용자와 문장을 확정하고, 명시적 승인 뒤에만 HTML/PDF를 만든다.

## 준비

1. [source contract](references/source-contract.md)를 읽는다.
2. [content rules adapter](references/content-rules.md)가 가리키는 canonical resume 계약을 읽는다.
3. `uv sync --project tools`로 선언된 runtime을 준비한다.

## Workflow

### 1. Acquire and Normalize the JD

- URL이면 가능한 browser/fetch 수단으로 현재 원문을 읽는다. 원티드는 공개 API detail을 우선할 수 있다.
- 채팅에 공고 전문을 붙여 넣거나 파일로 주면 제공된 내용을 원문으로 사용한다. URL을 다시 요구하지 않는다.
- URL과 복붙을 함께 주면 URL 원문을 우선하고, 접근 실패 시 복붙 본문을 fallback으로 사용해 차이를 기록한다.
- 공고 URL이 만료·리다이렉트되면 현재 원문, 캐시 여부, 확인 시점을 분리해 기록한다.
- 자격 요건, 우대 사항, 주요 업무, 기술, 연차, 도메인, AI/LLM/agent 기대를 구조화한다.

### 2. Apply the Eligibility Gate

- 연차, 학력, 근무지, 언어, 필수 기술처럼 합불을 먼저 가르는 조건을 판정한다.
- 즉시 탈락 위험이 있는 조건은 `match-report.md` 상단에 둔다.
- 불확실한 조건은 `[확인 필요]`로 남기고 사실을 만들지 않는다.

### 3. Decide Outcome Axes

회사가 가장 원하는 결과를 판정한다. 축의 수를 미리 고정하지 않고 JD 우선순위와 검증 가능한 case가 결정하게 한다.

- 직무명·기술명·프로젝트명 대신 `돈을 주고 맡기면 어떤 상태를 만들어 주는가`로 축을 쓴다.
- `FastAPI`, `비동기`, `어드민`은 성과가 아니라 수단이다. `실패 가능한 업무를 격리하고 복구한다`, `운영 중인 서비스를 재구축해 안정화한다`처럼 결과와 동작을 함께 쓴다.
- JD 문장을 그대로 옮기지 말고 업무·자격·우대 요건을 채용사가 구매하는 결과로 번역한다.
- 서로 겹치는 요구는 하나의 성과 축으로 묶고 지원서 전체에서 같은 순서를 유지한다.
- 시장 참고가 필요하면 `wiki/products/jd/reports/`를 읽되 특정 JD 원문을 우선한다.

### 4. Match Claims Many-to-Many

- JD 요구마다 `wiki/evidence/claims/*.yaml`의 stable claim ID를 연결한다.
- `성과 축 × claim × source project` 다대다 매트릭스를 만든다. 한 성과는 여러 프로젝트의 claim으로 증명할 수 있고, 한 프로젝트도 서로 다른 성과 축의 근거가 될 수 있다.
- 각 성과 축은 최소 1개의 verified claim을 가져야 한다. 가능하면 서로 다른 맥락의 프로젝트 2개 이상으로 반복 가능성을 보여준다.
- 프로젝트명은 proof label로만 사용하고 제목·목차의 중심에 두지 않는다.
- `wiki/products/jd/profile-skills.json`의 `none`은 gap으로 기록한다.
- `partial`은 evidence가 허용하는 범위로만 쓴다.
- 대응 claim이 없으면 내용을 만들지 않고 gap으로 남긴다.

### 5. Create the Markdown Content Draft

`assets/application-package/content-draft.md`를 복사해 지원 폴더의 `content-draft.md`를 만든다. 이 파일이 승인 전 문안의 canonical owner다.

- 성과·소개·경력 행·기술 문안은 `wiki/products/resume/resume-block-library.md`의 블록에서 시작한다. 회사별로 바꾸는 것은 블록 선택·순서·연결 문장·헤더 직함뿐이며 사실·수치·동사 강도·mechanism은 블록 그대로 쓴다 (`wiki/rules/application-copy-standard.md` §3).

- resume·career description·portfolio와 선택한 CV에 들어갈 **실제 공개 문장 전체**를 Markdown에 먼저 쓴다.
- 이력서의 `대표 기술 사례`는 문제·제약 → 실제 대안과 선택 → 구현 경계 → failure mode → 검증·운영 → 결과·한계 순으로 resume 안에서 자립적으로 쓴다.
- 기술 사례 수와 줄 수를 먼저 고정하지 않는다. JD와 가까운 강한 case를 깊게 쓰고, 추가 case는 새로운 technical signal을 제공할 때만 포함한다.
- 포트폴리오는 이력서와 같은 성과 축·순서를 사용하고, 각 축 아래 1~N개 프로젝트를 proof block으로 배치한다.
- 경력기술서는 프로젝트별 `문제 → 담당 범위 → 선택 → 구현 → 검증 → 결과·한계`를 기록하고 이력서 bullet을 길게 복제하지 않는다.
- CV는 전체 chronology와 credential의 누락 없는 확인을 우선한다. 회사별 CV가 필요 없으면 `omitted`를 정상 상태로 기록하고 빈 문서나 route를 만들지 않는다.
- 프로젝트별 상세 문제·판단·기여·결과·한계를 분리한다.
- 서로 다른 프로젝트의 수치를 더하거나 하나의 인과관계·통합 프로젝트처럼 쓰지 않는다.
- 각 성과와 proof에 claim ID를 함께 적어 검토 중에도 근거를 잃지 않는다.
- FIXED contact와 credentials는 확인 없이 변경하지 않는다.
- `claim-map.yaml`은 section mapping과 함께 `outcomes` 아래에 `title`, `employer_need`, `claim_ids`, `source_cases`를 기록한다.

### 6. Stop at the Content Review Gate

사용자가 `바로 PDF까지`, `렌더링까지`, `이대로 확정`처럼 명시하지 않았다면 첫 실행은 Markdown 작성에서 멈춘다.

- `README.md` 상태를 `내용 검토 중`으로 둔다.
- 사용자에게 `content-draft.md` 링크와 핵심 선택, `[확인 필요]` 항목을 전달한다.
- 사용자 피드백은 먼저 `content-draft.md`와 `claim-map.yaml`에 반영한다. HTML이나 PDF만 직접 고치지 않는다.
- `approved: false` 동안 `package/`의 파일은 제출본이 아니다. 기존 PDF가 있으면 삭제하지 말고 `preview`로 명시한다.
- 사용자의 명시적 승인 뒤 `approved: true`, `approved_at`을 기록하고 다음 단계로 진행한다.

### 7. Build the Application Archive

공고 URL이나 본문만 주어지고 별도 지시가 없으면 개인용 지원 초안 모드로 동작한다. 회사·포지션·플랫폼은 공고 원문에서 추출하고 확인할 수 없는 값만 `[확인 필요]`로 남긴다. 플랫폼을 알 수 없으면 slug는 `platform-unknown`으로 만들고 작업을 계속한다.

`assets/application-package/`의 템플릿을 사용해 다음 local-only 구조를 만든다.

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

- 폴더 하나는 회사 × 공고 × 지원 플랫폼 1회를 뜻한다.
- `jd.md`에는 URL만 남기지 말고 수집 시점의 원문을 저장한다.
- `source/`와 `package/`는 승인 후 생성한다. 승인 전 이미 존재하면 preview 상태로 유지한다. 회사별 artifact mode는 `common | tailored | omitted`로 기록한다.
- 플랫폼이 파일 하나만 받으면 `resume-portfolio.pdf`, 포트폴리오 URL을 받으면 `portfolio-url.md`를 만든다.
- 실제 플랫폼 업로드나 지원 완료 표시는 사용자가 명시적으로 요청하거나 제출 사실을 알려준 뒤에만 한다.
- 지원 완료 뒤 해당 폴더는 덮어쓰지 않는다. 재지원·다른 공고·다른 플랫폼은 새 날짜 폴더로 만든다.

### 8. Render the Review Screen, Then Only the Approved Draft

PDF 승인 전 화면 검토가 필요하면 local-only review preview를 만든다. 이 preview는 Markdown을 읽기 화면으로만 변환하며 `source/`와 `package/`를 수정하지 않는다.

```bash
uv run --project tools python skills/tailor-resume/scripts/render_review_preview.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}
```

- 출력: 지원 폴더의 `preview/index.html`
- 입력: `content-draft.md`, `company-research.md`, `match-report.md`
- preview는 승인이나 제출 artifact가 아니다. 사실·문안 owner는 계속 `content-draft.md`다.
- 회사별 지원 폴더와 함께 local-only로 유지하고 공개 app route나 배포 artifact에 포함하지 않는다.
- 이력서 canvas는 공개 `/resume`의 폭·섹션 순서·타이포그래피·정보 위계를 그대로 따른다. 회사별로 바꾸는 것은 검증된 문안과 claim 선택뿐이다.
- 검토 메모·회사 리서치·JD 매칭·승인 상태는 이력서 canvas 안에 섞지 않고 바깥 review chrome과 별도 tab에 둔다.
- 데스크톱 review canvas는 `210mm × 297mm` A4 경계를 사용하고, 모바일에서는 내용 손실 없이 읽기 폭으로 전환한다.

사용자가 회사별 준비 과정을 홈페이지에 공개하기로 승인하면 정적 HTML 사본 대신 app의 typed content 계약을 사용한다.

- `app/fe/content/resumes/{company-slug}.ts`에 승인된 evidence 범위의 문안을 옮긴다.
- `app/fe/content/documents/{company-slug}.ts`에 맞춤 경력기술서와 선택한 CV 문안을 옮긴다.
- `app/fe/content/resumes/index.ts` registry에 등록하면 `/resume/{company-slug}`에서 기존 resume shell과 동일한 구성으로 열린다.
- 경력기술서는 `/career/{company-slug}`, 선택한 CV는 `/cv/{company-slug}`에서 열리며 `omitted`인 CV route는 만들지 않는다.
- `visibility: "local" | "public"`은 production 노출 여부, `status: "draft" | "approved"`는 문안 승인 상태를 각각 소유한다. 두 상태를 섞지 않는다.
- 공개 draft는 화면에 `DRAFT`를 명시한다. 회사별 route는 sitemap·navigation에 넣지 않고 `noindex`, `nofollow`, `noarchive`, `nosnippet`을 유지한다.
- `wiki/products/resume/tailored/.../content-draft.md`가 계속 문안 owner다. typed content는 공개 화면을 위한 export이며 독자적인 사실을 추가하지 않는다.
- A4 PDF는 문안 승인 뒤 `package/`에서 생성한다. 공개 다운로드를 연결할 때는 승인된 PDF만 `app/fe/public/resumes/`로 export한다.

승인 후에만 출력용 HTML/PDF 절차를 실행한다.

- `content-draft.md`의 승인된 문장만 `assets/resume-template.html`과 `assets/portfolio-template.html`에 옮긴다.
- HTML에서 문장을 새로 개선하거나 claim을 추가하지 않는다. 문안 변경이 필요하면 Markdown으로 돌아간다.
- portfolio page에는 `noindex`를 설정하고 resume와 연결한다.
- case의 `diagram:`은 `->` node와 `[soft]` node convention으로 변환한다.

```bash
uv run --project tools python skills/tailor-resume/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/resume.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/resume.pdf

uv run --project tools python skills/tailor-resume/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/portfolio.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/portfolio.pdf

uv run --project tools python skills/tailor-resume/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/career-description.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/career-description.pdf

# CV를 선택한 package에서만 실행한다.
uv run --project tools python skills/tailor-resume/scripts/html_to_pdf.py \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/source/cv.html \
  wiki/products/resume/tailored/{company-slug}/{application-folder}/package/cv.pdf
```

### 9. Verify and Deliver

0. `wiki/rules/application-copy-standard.md`의 제출 전 게이트 10개를 `content-draft.md`와 대조하고, 위반 항목을 `match-report.md`에 남긴다. 하나라도 걸리면 `approved: true`로 바꾸지 않는다.
1. `uv run --project tools python tools/validate_workspace.py`
2. JD 요구별 match 또는 gap이 모두 기록됐는지 확인한다.
3. `content-draft.md`, resume, career description, portfolio의 성과 축 집합·순서가 같은 지원 전략을 유지하는지 확인한다. CV는 chronology 우선이라 같은 목차를 강제하지 않는다.
4. 모든 bullet이 claim ID와 역추적되는지 확인한다.
5. `allowed_copy`와 public-safety 상한을 넘지 않는지 확인한다.
6. 여러 프로젝트를 묶은 문장이 source별 claim 경계와 metric 귀속을 보존하는지 확인한다.
7. 선택한 모든 PDF를 생성하고 page 수는 gate로 쓰지 않는다. 첫 장의 category·경력·최강 근거 scanability, 이후 페이지의 technical signal, A4 100% scale의 잘림·겹침을 image로 확인한다.
8. 면접에서 근거를 설명할 수 없는 문장을 완화하거나 제거한다.
9. 최종 응답에 archive 경로, 현재 단계, `[확인 필요]`, 실제 플랫폼 제출 여부를 명시한다.
