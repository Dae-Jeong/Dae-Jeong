# app/design — 프로필 제품 확정 디자인 (승격 스냅샷)

**작업장은 D2**(daejeong-design repo의 "Profile" 프로젝트 — 반복 수정·버전 실험), 여기는 **확정본만 승격(복사)해 두는 스냅샷**이다. `app/fe` 구현은 이 폴더를 기준으로 한다.

| 파일 | 역할 | 확정일 |
| --- | --- | --- |
| `index.html` | 완결형 프로필 v2 — 사이트 전~Phase 1 초기 root | 2026-07-16 |
| `root-phase2-prototype.html` | 다이어트 root + 전역 Ask 런처 — Phase 1~2 root 기준 | 2026-07-16 |
| `resume-page-prototype.html` | `/resume` 문서형 + rail (KO/EN 토글) | 2026-07-17 |
| `chat-page-prototype.html` | `/chat` 풀 대화 — 근거 rail + 3층 답변 | 2026-07-16 |
| `component-sheet.html` | 컴포넌트 9종 specimen — anatomy·variants·states, `app/fe` 컴포넌트 구현 기준. D1(hub 1280·doc 1180)·D3(Button=fill·Chip=bordered) 확정, D2(상태 정의) 보류 | 2026-07-18 |
| `overlay-sheet.html` | 오버레이·피드백 5종 specimen — Modal·Popover·Banner·Toast·MobileNav, 실제 용례 접지. 디자이너 결정: Toast 상단 중앙 · Modal backdrop 단색 반투명 · MobileNav 풀스크린 (업계 패턴 교차 검증됨) | 2026-07-18 |

- 토큰 계약(Mono 시스템)의 canonical: [architecture spec — Design Baseline](../../wiki/docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md)
- 구현 매핑: [Phase 1 stack plan](../../wiki/docs/superpowers/plans/2026-07-17-site-phase1-stack-and-structure.md)
- 규칙: 이 폴더에서 직접 수정하지 않는다 — D2에서 작업하고 확정 시 재승격. labs 서비스 디자인은 각자 `labs/{svc}/design/`이 소유한다.
