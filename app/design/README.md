# app/design — 프로필 제품 확정 디자인 (승격 스냅샷)

**작업장은 D2**(daejeong-design repo의 "Profile" 프로젝트 — 반복 수정·버전 실험), 여기는 **확정본만 승격(복사)해 두는 스냅샷**이다. `app/fe` 구현은 이 폴더를 기준으로 한다.

## 기준 시트 (컴포넌트 계약)

| 파일 | 역할 | 확정일 | 구현 |
| --- | --- | --- | --- |
| `component-sheet.html` | 컴포넌트 9종 specimen — anatomy·variants·states. D1(hub 1280·doc 1180)·D3(Button=fill·Chip=bordered) 확정, D2(상태 정의) 보류 | 2026-07-18 | `components/site·ui` + `/design` |
| `overlay-sheet.html` | 오버레이 5종 specimen — Modal·Popover·Banner·Toast·MobileNav. 디자이너 결정: Toast 상단 중앙 · backdrop 단색 반투명 · MobileNav 풀스크린 (업계 패턴 교차 검증) | 2026-07-18 | `components/site·ui` + `/design` |

## 화면 (라우트 순)

| 파일 | 역할 | 확정일 | 구현 |
| --- | --- | --- | --- |
| `index.html` | 완결형 프로필 v2 — `root-v3`로 대체됨 (이력 보존용) | 2026-07-16 | — |
| `root-phase2-prototype.html` | 다이어트 root — `root-v3`로 대체됨 (이력 보존용) | 2026-07-16 | — |
| `root-v3-prototype.html` | **root 확정본 (10차 재승격 2026-08-13 — 섹션 제목 xl→2xl, Explore 카드 이름 sm→base)** — 다이어트형 관문 (hero+메타카드·Summary 4행·Proof 넘버드 축약·Explore 3카드). 6~9차 라운드: PR 축 반영(페르소나 2인 "통과·콜" 검증 — Career 2020·CES Best of Innovation·특허 첫 뷰포트, 미완성 신호 6→2, "이 사이트도 같은 방식으로 만들었다" 훅), type scale base 16 첫 적용본 | 2026-07-18 | ✅ `/` |
| `resume-page-prototype.html` | `/resume` 문서형 + rail (KO/EN 토글). **11차 재승격 2026-08-13 — 9차 base-16 정렬(누락분) + 헤더 4줄 재배치(이름40·주장22·현재16·이전13, 라벨-값 2행)** | 2026-08-13 | ✅ `/resume` |
| `portfolio-list-prototype.html` | `/portfolio` 목록 — 넘버드 리스트 5건 + Role·Scope 메타 (결정: root 아코디언 미재사용) | 2026-07-18 | ✅ `/portfolio` |
| `portfolio-case-prototype.html` | `/portfolio/{case}` 상세 — **12차 재승격 2026-08-13: 5단(문제·검토·결정·시스템·결과)**. 검토=선택 섹션(기각 대안 카드), 운영근거→결과 개칭(id #ops 유지), 결과 끝 한계·다음 수 자리, sticky rail 동적 5항목 | 2026-08-13 | ✅ `/portfolio/thready` |
| `blog-list-prototype.html` | `/blog` 행형 목록(date-first) + 구조 placeholder + COMING SOON (결정: 목록 문법 — 규율 공유·형태 분리: labs=카드·blog=행·portfolio=넘버드) | 2026-07-18 | ✅ `/blog` |
| `labs-list-prototype.html` | `/labs` 카드형 관문(kind×status) + jarvis 데모 + EMPTY 슬롯 (결정: 빈 상태 = 데모 1건+배너 공통 문법) | 2026-07-18 | ✅ `/labs` |
| `chat-page-prototype.html` | `/chat` v1 — v2로 대체됨 (이력 보존용) | 2026-07-16 | — |
| `chat-page-v2-prototype.html` | **`/chat` 확정본** — 빈 대화 첫 진입 상태 추가 (결정: GPT식 중앙 정렬 반려 — 문서형 · 우측 bubble 유지) | 2026-07-18 | ✅ `/chat` |

- 토큰 계약(Mono 시스템)의 canonical: [architecture spec — Design Baseline](../../wiki/docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md)
- 구현 매핑: [Phase 1 stack plan](../../wiki/docs/superpowers/plans/2026-07-17-site-phase1-stack-and-structure.md)
- ✅ **12차 해소 (2026-08-13)**: doc 지면 섹션 제목도 `--text-2xl`(28)로 통일
  (`resume-page-prototype` · `portfolio-case-prototype`). 구현의 `SectionHead size` 변형은
  두 값이 같아져 실질 무의미해졌으나 향후 분기 대비로 유지.
- 규칙: 이 폴더에서 직접 수정하지 않는다 — D2에서 작업하고 확정 시 재승격. labs 서비스 디자인은 각자 `labs/{svc}/design/`이 소유한다.
