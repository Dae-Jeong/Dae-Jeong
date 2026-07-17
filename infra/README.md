# infra — 배포 관제

배포 구성만 소유한다. 애플리케이션 코드·`wiki/` 접근 금지.

| 시점 | 내용 |
| --- | --- |
| Phase 1 | 도메인(marinkim.xyz)·DNS·Vercel 구성 기록 (필요 시 Terraform) |
| k8s 착수 시 | 클러스터(위치 미정)·ingress·cert-manager·labs 서비스 manifest — 단일 관제 |

DNS 계약: apex/www → Vercel, wildcard `*.marinkim.xyz` → k8s ingress. canonical: [architecture spec](../wiki/docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md).
