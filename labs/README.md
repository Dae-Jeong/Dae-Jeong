# labs — 실험 서비스

`labs/{svc}/` 폴더 하나 = 서비스 하나 (자립: 자체 Dockerfile·스택 자유·서비스 간 import 금지) → k8s `{svc}.marinkim.xyz` 배포.

서비스 추가 = 접점 3개 (한 커밋):

1. `labs/{svc}/` 폴더 생성·개발
2. `infra/`에 k8s manifest 추가
3. `app/fe/content/services/{svc}.md` registry 등록 → `/labs` 카드·상세 자동 노출

계약의 canonical: [architecture spec — Service Framework](../wiki/docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md). 후보 보드: [wiki/backlog](../wiki/backlog/README.md).
