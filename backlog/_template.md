---
type: template
title: Idea Template
description: 새 아이디어 폴더의 README 템플릿. 아래 frontmatter와 섹션을 복사해 {id}/README.md로 만든다.
timestamp: 2026-07-15
tags: [backlog, template]
---

# Idea Template

새 아이디어는 `backlog/{id}/README.md`로 만들고 아래를 채운다. 비어 있는 섹션은 지운다 — 미리 채우지 않는다.

```markdown
---
type: idea
title: <이름>
description: <한 줄 — 무엇을, 왜>
status: idea            # idea | spec | wip | done | hold | drop
registered: <YYYY-MM-DD>
tags: [backlog]
---

# <이름>

## 한 줄

무엇을 만들고 싶고, 왜 필요한가.

## 메모

떠오른 것 자유 기록 (bullet).

## 연결

- 관련 spec/wiki/서비스 링크. 외부 자료는 `wiki:<문서>` alias 사용.

## 승격

착수 확정 시 spec/task 링크를 남기고 status를 갱신한다.
```
