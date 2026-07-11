# Source Contract — 원천 소스 계약

맞춤 이력서의 모든 재료는 아래 파일에서만 추출한다. 경로는 repo 루트 기준.

## 필수 (항상 읽기)

| 파일 | 추출 대상 |
| --- | --- |
| `docs/resume/10-resume-narrative-flow.md` | 기본 서사, 섹션 구조, 검증된 경력 bullet (조정의 베이스) |
| `docs/resume/09-profile-homepage-public-content-draft.md` | Claim strength 표 (표현 상한), Public Safety Guardrails (공개 금지 목록), 프로젝트별 confidence |
| `scripts/jd/profile_skills.json` | 스킬 보유 상태 (strong/partial/none) — none은 사용 금지 |

## 매칭 심화용 (JD 요구에 따라 선택적으로 읽기)

| 파일 | 용도 |
| --- | --- |
| `docs/resume/06-impact-case-candidates.md` | 프로젝트별 세부 사실 목록 — JD 특정 요구에 맞는 bullet 재료 |
| `docs/resume/06-project-work-log.md` | 작업 원장 — impact case에 없는 세부 근거 검색 (파일이 크므로 grep 권장) |
| `docs/resume/13-jd-gap-map.md` | 직군별 수요·강조 순서 참고 |
| `profile/capabilities.md` | 역량 맵과 confidence |
| `profile/contribution.md` | 기여 프레임, supporting projects |
| `profile/career.md` | 타임라인 정확한 날짜 |

## 템플릿 / 변환

| 파일 | 용도 |
| --- | --- |
| `skills/tailor-resume/assets/resume-template.html` | 이력서 HTML 템플릿 — `[[SLOT:...]]` 채우기, FIXED 영역 유지 |
| `skills/tailor-resume/assets/portfolio-template.html` | 포트폴리오 HTML 템플릿 — 케이스 조립용 |
| `docs/resume/cases/` | 포트폴리오 케이스 라이브러리 — 회사별 조립의 유일한 케이스 출처 (cases/README 규칙 준수) |
| `docs/resume/14-resume-draft-v1.html` | 전체판 초안 — 슬롯에 넣을 콘텐츠의 예시/소스 |
| `skills/tailor-resume/scripts/html_to_pdf.py` | HTML -> A4 PDF 변환 (Python playwright) |

## 소스 갱신 규칙

- 새 프로젝트/성과가 생기면 이 스킬이 아니라 소스(10번 flow, work log)를 먼저 갱신한다. 스킬은 소스를 읽기만 한다.
- 연락처는 템플릿 FIXED 영역에 반영된 값이 최신이다 (개인 이메일 `marin.backend@gmail.com`, 주소는 시 단위 표기).
- Git 검증이 안 된 새 claim은 09의 claim strength 표에 먼저 등재한 뒤 사용한다.
