---
type: idea
title: Resume Page
description: marinkim.xyz /resume — 검증된 master 이력서의 웹 노출 + PDF 다운로드.
status: spec
registered: 2026-07-15
tags: [backlog, resume, site]
---

# Resume Page

## 한 줄

marinkim.xyz `/resume`에서 웹 이력서를 보여주고 PDF를 내려받게 한다 — 이력서 기틀의 마지막 블로커(공개 URL) 해소.

## 메모

- Phase 1 최소 경로: 화면 QA까지 끝난 기존 responsive `resume.html`을 그대로 서빙 + PDF (site spec 결정). Next 네이티브 이력서 뷰는 발생 시.
- 화면 디자인 확정 (2026-07-16): D2 Profile 프로젝트 `resume-page-prototype.html` — 문서형 본문(섹션 01~07, contract frame 준수) + 우측 sticky rail(PDF 다운로드·KO/EN 토글·목차). EN 토글은 [english-resume](../english-resume/README.md) 완성 전까지 "준비 중".
- 공개 웹 연락처 결정 (2026-07-16): email·GitHub·시 단위 거주지만 노출. **전화번호는 PDF 배포본에만** (공개 웹 스팸 수집 방지).
- 웹 관행 시사점 (2026-07-17, `wiki:korean-dev-resume`): 한국 공개 웹 이력서는 회사별 상세 bullet을 충분히 푸는 게 표준 — A4는 압축, 웹은 상세. `/resume` 화면에서 경력 행에 상세 bullet(또는 portfolio case 링크) 확장 여지를 두는 개선 후보. 외부 활동 섹션(블로그·오픈소스)도 콘텐츠 생기면 추가할 틀 예약.
- 콘텐츠 canonical은 [products/resume/](../../products/resume/README.md) — 이 entry는 **site 노출 기획만** 추적한다. 콘텐츠는 export 스크립트로만 유입 (public: true claim 필터).

## 연결

- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — Phase 1
- [Resume product hub](../../products/resume/README.md)

## 승격

site Phase 1 착수와 함께 `wip`.
