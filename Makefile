# Application Copy Harness — 단일 검증 진입. 검사 항목은 tools/validate_workspace.py 와 wiki/rules/copy-gates.yaml 이 소유한다.
.PHONY: verify verify-all verify-wiki

verify:
	uv run --project tools python tools/verify.py $(ARGS)

verify-all:
	uv run --project tools python tools/verify.py --scope all $(ARGS)

verify-wiki:
	uv run --project tools python tools/verify.py --scope wiki $(ARGS)
