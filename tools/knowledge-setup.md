# 로컬 지식 연결 설정

제품 코드와 실행 도구는 이 저장소가 소유합니다. 경력 사실·검증 근거와 작업 문서의 정본은 별도로 보존하는 Obsidian vault의 `Wiki/sources/Dae-Jeong/wiki`에 있습니다. 공개 clone에는 개인 정본과 `output/` 산출물이 포함되지 않습니다.

## 새 clone 연결

1. 사용자 소유 백업에서 vault를 먼저 복원합니다. wiki의 context/products/rules/backlog/docs/archive/profile/evidence 8계층과 필수 입력이 있어야 합니다.
2. repo 루트에서 실제 vault 경로를 지정합니다.

```sh
python3 tools/bootstrap_knowledge.py --vault /path/to/Obsidian
```

이 명령은 repo의 `wiki` symlink만 생성합니다. 같은 정본에 반복 실행할 수 있으며 vault 파일·제품 bridge를 만들거나 수정하지 않습니다. 기존 실폴더·파일·다른 링크·깨진 링크는 덮어쓰지 않습니다. 이전 clone에 wiki 실폴더가 남았다면 먼저 별도 이관·보존을 확인해야 합니다.

3. 연결 후 `wiki/context/manifest.yaml`, `wiki/context/index.md`, `wiki/context/current-state.md`와 대상 제품 hub를 읽습니다. 세부 정책은 이 로컬 정본이 소유합니다.
4. 개인 로컬 파생 데이터가 필요한 새 환경에서만 다음을 실행합니다. 기존 파생 파일을 덮어쓸 수 있으므로 현재 작업 중인 파일은 먼저 보존합니다.

```sh
uv sync --locked --project tools
uv run --project tools python tools/build_application_projection.py
uv run --project tools python tools/build_platform_projection.py
make verify
```

`output/`의 JSON은 위 도구로 만드는 로컬 projection이며 PDF·스크린샷·지원 패키지는 별도 로컬 산출물입니다. 배포 build가 개인 vault를 복사하거나 접근하도록 구성하지 않습니다. 공개 앱 표현은 `app/fe`가 소유합니다.

## 연결 검증

```sh
uv run --project tools python -m unittest discover -s tools -p 'test_knowledge_bootstrap.py'
```

8계층 sentinel이나 필수 검증 입력이 없으면 bootstrap과 validator는 실패해야 합니다. 정본 누락을 빈 검사나 PASS로 처리하지 않습니다. `wiki` symlink에는 디렉터리 전용 `/wiki/` 대신 `/wiki` ignore 패턴을 사용합니다. `output/`과 이관 백업도 로컬에 보존하고 Git에 추가하지 않습니다.

Git 추적 해제는 다음 commit tree에서 제외하는 작업입니다. 기존 commit 이력의 파일을 지우거나 개인 백업을 대체하지 않습니다. 제품 코드와 정본의 시점이 다르면 전체 문안 검증이 실패할 수 있으므로 연결 성공과 제품 내용 검증을 구분합니다.
