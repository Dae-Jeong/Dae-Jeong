# portfolio_v0.1.0 — 회사별 포트폴리오 페이지 프로토타입

설계 근거: [docs/resume/15-portfolio-pipeline-design.md](../../docs/resume/15-portfolio-pipeline-design.md)

## 디자인 의도

- 이력서(14번)와 **같은 아이덴티티**: 흑백 컴팩트, IBM Plex Sans KR + Plex Mono, 동일 디자인 토큰
- 이력서가 A4 인쇄 문서라면, 포트폴리오는 **웹 읽기 문서** — 읽기 폭(760px), 여유 있는 행간, sticky 케이스 내비게이션
- 다이어그램은 CSS-only (mermaid 등 JS 의존 없음 — 단일 파일 이동성 유지)
- `noindex` — 회사별 페이지는 검색 노출 금지 (지원 사실 보호)

## 프레임 매핑 (15번 설계 → 마크업)

| 설계 섹션 | 마크업 |
| --- | --- |
| 헤더 (이력서 동일 아이덴티티 + 이력서 링크) | `header` + `.contact` |
| 1 인트로 (JD 대응 2~3줄) | `.intro` — 파이프라인에서 SLOT |
| 2 케이스 스터디 (문제→접근→구현→운영) | `.case` × N, 소섹션 `.step` (mono 라벨) |
| 3 일하는 방식 확장판 | `#workflow` |
| 4 부록 (수상·특허·링크) | `#appendix` |

## 프로토타입 콘텐츠

케이스 3개는 검증된 사실만으로 실물 작성 (claim strength 표 준수):

1. `thready-rebuild` — backend 전면 재구축 + 생성 품질 시스템
2. `be-template` — 조직 표준 템플릿 + agent context system
3. `mediness-ops` — agent 기반 제품 운영 시스템

이 콘텐츠가 검수를 통과하면 `docs/resume/cases/` 라이브러리의 초안으로 승격한다.
