# Source Contract

맞춤 이력서의 모든 재료는 아래 active source에서만 추출한다. 경로는 repo 루트 기준이며 archive는 source로 사용하지 않는다.

## 필수 (항상 읽기)

| 파일 | 추출 대상 |
| --- | --- |
| `profile/identity.md` | primary category, specialty, differentiator |
| `profile/career.md`, `profile/capabilities.md`, `profile/credentials.md` | 안정적인 경력·역량·자격 사실 |
| `evidence/claims/*.yaml` | stable claim ID, strength, allowed/forbidden copy, evidence link |
| `rules/evidence-policy.md`, `rules/public-safety.md` | claim과 공개 표현 정책 |
| `products/resume/content-contract.md` | 섹션, 문체, 분량, acceptance gates |
| `products/jd/profile-skills.json` | strong/partial/none 분류. `none`은 사용 금지 |

## 매칭 심화용 (JD 요구에 따라 선택적으로 읽기)

| 파일 | 용도 |
| --- | --- |
| `evidence/projects/*.md` | claim의 상세 근거와 boundary |
| `evidence/agent-workflow.md` | agent workflow의 검증 기록 |
| `products/jd/reports/gap-map.md` | 시장 수요와 gap 참고 |
| `products/portfolio/cases/` | resume project와 sync할 canonical case library |

## 템플릿 / 변환

| 파일 | 용도 |
| --- | --- |
| `skills/tailor-resume/assets/resume-template.html` | 이력서 HTML 템플릿 — `[[SLOT:...]]` 채우기, FIXED 영역 유지 |
| `skills/tailor-resume/assets/portfolio-template.html` | 포트폴리오 HTML 템플릿 — 케이스 조립용 |
| `products/resume/master/v0/` | 구조·시각 baseline만. content source로 사용 금지 |
| `skills/tailor-resume/scripts/html_to_pdf.py` | HTML -> A4 PDF 변환 (`uv run python`) |

## 소스 갱신 규칙

- 새 프로젝트/성과가 생기면 `evidence/projects/`와 claim registry를 먼저 갱신한다. skill은 source를 읽기만 한다.
- 연락처는 템플릿 FIXED 영역에 반영된 값이 최신이다 (개인 이메일 `marin.backend@gmail.com`, 주소는 시 단위 표기).
- 검증되지 않은 새 claim은 registry에 등재하고 validator를 통과하기 전까지 사용하지 않는다.
