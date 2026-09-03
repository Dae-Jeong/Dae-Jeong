---
type: idea
title: Personal Company Application Archive
description: 회사별 지원 package 구조를 설계했고 active ownership을 resume tailored registry로 승격한 historical design record.
status: done
registered: 2026-08-15
promoted: 2026-09-01
tags: [backlog, resume, portfolio, jd, application]
---

# Personal Company Application Archive

## 승격 상태

- 2026-09-01에 active ownership을 [Tailored Application Lifecycle](../../products/resume/application-lifecycle.md)로 승격했다.
- 현재 application lifecycle, stage, artifact state, 제출본 동결 규칙은 새 registry가 소유한다.
- 이 backlog 문서는 최초 구조와 판단 과정을 보존하는 historical design record다. 아래 내용과 registry가 다르면 registry를 따른다.

## 한 줄

플랫폼을 통한 지원 1회마다 당시 JD와 실제 제출한 이력서·포트폴리오 한 세트를 함께 보관한다.

## 구조

기존 local-only 경계인 `wiki/products/resume/tailored/`를 그대로 사용한다.

```text
wiki/products/resume/tailored/
  _template/
    README.md
    jd.md

  toss-payments/
    2026-08-15_wanted_server-developer/
      README.md
      jd.md
      match-report.md
      claim-map.yaml
      content-draft.md
      source/
        resume.html
        portfolio.html
      package/
        resume.pdf
        portfolio.pdf
```

- 첫 번째 폴더는 회사명 slug다.
- 두 번째 폴더는 `{YYYY-MM-DD}_{platform}_{position-slug}`다.
- 회사명은 local-only 경로에서만 사용한다. 외부 공개 URL이나 파일명에는 넣지 않아도 된다.
- 폴더 하나가 **회사 × 채용공고 × 지원 플랫폼 1회**를 뜻한다.
- `content-draft.md`가 승인 전 문안의 canonical owner다.
- `source/`와 `package/`는 사용자 승인 뒤 생성한다. `package/`에는 실제 제출할 파일이나 URL만 넣는다.
- 같은 회사에 다시 지원하거나 다른 플랫폼으로 지원하면 새 폴더를 만든다.
- 제출 전에는 수정해도 되지만, 지원 완료 후에는 해당 폴더를 덮어쓰지 않는다.

## 파일 역할

| 파일 | 내용 |
| --- | --- |
| `README.md` | 회사, 포지션, 플랫폼, 공고 URL, 지원일, 상태, 제출한 파일 |
| `jd.md` | 확인 당시의 채용 공고 원문 |
| `match-report.md` | 요구사항, 선택한 강점, 부족한 점, 확인 필요 |
| `claim-map.yaml` | 이력서 문장과 stable claim ID 연결 |
| `content-draft.md` | 사용자와 검토·확정하는 이력서·포트폴리오 공개 문안 |
| `source/` | 승인된 Markdown에서 파생한 이력서·포트폴리오 HTML |
| `package/` | 플랫폼에 실제 제출한 이력서·포트폴리오 세트 |

플랫폼이 파일 두 개를 받으면 `resume.pdf`와 `portfolio.pdf`를 넣는다. 파일 하나만 받으면 `resume-portfolio.pdf`, 포트폴리오를 URL로 제출하면 `portfolio-url.md`를 넣는다.

## README 템플릿

```markdown
# 회사명 — 포지션

- 공고 URL:
- 공고 확인일:
- 지원 플랫폼:
- 지원일:
- 상태: 내용 검토 중 | 제출 준비 | 지원 완료 | 면접 | 종료
- 내용 초안: content-draft.md
- 제출 세트:
  - package/resume.pdf
  - package/portfolio.pdf
- 핵심 포인트:
- 다음 할 일:
```

## 사용 흐름

```text
_template 복사
→ JD 저장
→ tailor-resume으로 content-draft.md 생성
→ 사용자와 Markdown 문안 검토·수정
→ 사용자 승인
→ HTML/PDF 생성·시각 확인
→ 플랫폼 형식에 맞춘 파일을 package/에 확정
→ 지원 후 README 상태를 `지원 완료`로 변경하고 폴더 동결
```

## 초안 생성 skill

새 skill을 중복 생성하지 않고 기존 [Tailor Resume skill](../../../skills/tailor-resume/SKILL.md)을 확장한다. 이 skill은 이미 JD 수집, eligibility 판정, claim 선별, resume·portfolio 조립과 PDF 검증을 소유한다.

대표 호출:

```text
이 공고로 지원할 이력서·포트폴리오 초안 만들어줘:
https://...
```

또는 공고 본문을 그대로 붙여 넣는다.

```text
이 공고로 지원할 이력서·포트폴리오 초안 만들어줘:

[회사 소개]
...
[주요 업무]
...
[자격 요건]
...
```

skill은 다음까지만 자동으로 수행한다.

1. 공고 URL 또는 채팅에 붙여 넣은 원문을 `jd.md`로 저장
2. 필수 자격 blocker와 JD 요구를 profile·claim registry에 대조
3. 회사·포지션·플랫폼 경로 생성
4. 회사가 맡길 성과 축과 이를 뒷받침할 claim·source case를 다대다로 선별
5. `content-draft.md`에 이력서·포트폴리오 전체 문안을 생성
6. `[확인 필요]`와 문안 검토 사항을 보고하고 사용자 승인을 기다림
7. 승인 뒤 `source/`와 `package/`를 생성
8. PDF·claim·public-safety·성과 축 순서를 검증

플랫폼 로그인, 파일 업로드, 지원 버튼 클릭은 자동 범위에 포함하지 않는다. 사용자가 별도로 요청할 때만 현재 플랫폼 정책을 다시 확인하고 진행한다.

복붙 본문에 회사·포지션·플랫폼이 빠져 있어도 생성을 중단하지 않는다. 확인 가능한 값으로 초안을 만들고, 빠진 값은 `[확인 필요]`로 표시한다. 플랫폼을 알 수 없을 때만 폴더명에 `platform-unknown`을 사용한다.

## 유지할 규칙

1. 사실과 claim 강도는 계속 `profile/`과 `evidence/claims/`에서 가져온다.
2. 회사별 폴더에서 새로운 경력 사실을 만들지 않는다.
3. resume와 portfolio는 같은 핵심 성과 축을 같은 순서로 사용하고, 각 축은 1~N개 case를 proof로 연결한다.
4. `package/`는 실제 제출한 이력서·포트폴리오 한 세트이며 지원 후 덮어쓰지 않는다.
5. `tailored/`는 Git에 올리지 않고 개인 private backup으로만 보관한다.

## Local operations workspace

- `/applications`는 활성 공고의 분석·지원 준비 상태를 보는 local-only 화면이다.
- `app/fe/content/applications.json`이 공고·분석 데이터의 canonical store다.
- `app/fe/content/applications.ts`는 UI가 쓰는 type adapter만 소유한다.
- AI 수집·재검증 작업은 같은 JSON을 갱신하며, DB·ORM·별도 backend service는 두지 않는다.
- 실제 제출 패키지는 기존 `wiki/products/resume/tailored/` 구조에 동결한다.

## 하지 않을 것

- 데이터베이스·ORM
- 별도 backend service
- SHA-256 manifest
- 전용 CLI — JSON 직접 갱신이 실제로 불편해진 뒤에만 추가

## 연결

- [Resume product](../../products/resume/README.md)
- [Resume content contract](../../products/resume/content-contract.md)
- [JD product](../../products/jd/README.md)
- [Portfolio case library](../../products/portfolio/cases/README.md)
- [Tailor Resume skill](../../../skills/tailor-resume/SKILL.md)

## 현재 상태

- active owner 승격 완료: [Tailored Application Lifecycle](../../products/resume/application-lifecycle.md)
- 이 문서의 역할은 historical design record로 종료
- 구조 설계 완료
- local `/applications` workspace와 단일 JSON store 구현
- tracked package template 추가
- `tailor-resume`에 Markdown-first content review gate 반영
- 공개가 승인된 회사별 문안은 `/resume/{company}` typed content route로 export하며 DRAFT와 visibility를 분리
- MGRV 공고 1건으로 content draft·preview PDF·공개 route까지 검증
- 2026-08-18 서류 탈락으로 지원 종료. 맞춤 이력서·포트폴리오는 production에서 내리고 local reference로 보존
