"""단일 검증 진입점 (Application Copy Harness v1, design §3-2).

검사 항목은 tools/validate_workspace.py 와 wiki/rules/copy-gates.yaml 이 소유한다.
이 스크립트는 scope 에 따른 실행 순서, active route 확인, 실행 기록만 책임진다.

  uv run --project tools python tools/verify.py                # scope 자동 (git 변경 기준)
  uv run --project tools python tools/verify.py --scope all
  uv run --project tools python tools/verify.py --allow-frozen # 게이트 13 해제 (사용자 결정이 있을 때만)
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app" / "fe"
RUNS = ROOT / "output" / "harness" / "runs"
SURFACES = ROOT / "wiki" / "products" / "site" / "copy-surfaces.yaml"
REGISTRY = ROOT / "wiki" / "products" / "resume" / "application-registry.yaml"
COMMON_ROUTES = ["/resume", "/career/common", "/cv/common", "/portfolio"]


def changed_files() -> list[str]:
    try:
        out = subprocess.run(["git", "status", "--porcelain"], cwd=ROOT, capture_output=True, text=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError):
        return []
    files = []
    for line in out.splitlines():
        path = line[3:].split(" -> ")[-1].strip()
        if path:
            files.append(path)
    return files


def auto_scope(files: list[str]) -> str:
    if any(f.startswith("app/fe/") for f in files):
        return "copy"
    return "wiki"


def run_step(name: str, cmd: list[str], cwd: Path, env: dict[str, str] | None = None) -> dict:
    started = time.time()
    proc = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, env=env)
    output = (proc.stdout + proc.stderr).strip()
    lines = [l for l in output.splitlines() if l.strip()]
    return {
        "name": name,
        "status": "PASS" if proc.returncode == 0 else "FAIL",
        "exit": proc.returncode,
        "count": 0 if proc.returncode == 0 else max(1, len(lines) - 1),
        "tail": lines[-12:],
        "duration_s": round(time.time() - started, 1),
    }


def active_routes() -> list[str]:
    if not SURFACES.exists() or not REGISTRY.exists():
        return list(COMMON_ROUTES)
    cfg = yaml.safe_load(SURFACES.read_text(encoding="utf-8")) or {}
    active = cfg.get("active") or {}
    statuses = set(active.get("statuses") or [])
    excluded = set(active.get("exclude_artifact_states") or [])
    routes = list(COMMON_ROUTES)
    data = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    for attempt in data.get("attempts") or []:
        if not isinstance(attempt, dict):
            continue
        if attempt.get("status") not in statuses or attempt.get("artifact_state") in excluded:
            continue
        for artifact in (attempt.get("artifacts") or {}).values():
            route = artifact.get("route") if isinstance(artifact, dict) else None
            if isinstance(route, str) and route not in routes:
                routes.append(route)
    return routes


def check_routes(port: int) -> dict:
    base = f"http://127.0.0.1:{port}"
    started = time.time()
    try:
        urllib.request.urlopen(base + "/", timeout=5).read(1)
    except (urllib.error.URLError, OSError):
        return {"name": "routes", "status": "SKIP", "count": 0, "tail": [f"no dev server on {base}"], "duration_s": 0.0, "routes": {}}
    results: dict[str, int] = {}
    for route in active_routes():
        try:
            with urllib.request.urlopen(base + route, timeout=120) as resp:
                results[route] = resp.status
        except urllib.error.HTTPError as exc:
            results[route] = exc.code
        except (urllib.error.URLError, OSError):
            results[route] = 0
    bad = {r: c for r, c in results.items() if c != 200}
    return {
        "name": "routes",
        "status": "PASS" if not bad else "FAIL",
        "count": len(bad),
        "tail": [f"{r} {c}" for r, c in bad.items()] or [f"{len(results)} routes 200"],
        "duration_s": round(time.time() - started, 1),
        "routes": results,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--scope", choices=["auto", "wiki", "copy", "all"], default="auto")
    parser.add_argument("--allow-frozen", action="store_true", help="게이트 13(frozen 불변) 해제. 사용자 결정이 있을 때만.")
    parser.add_argument("--port", type=int, default=4000, help="dev server port for active route check")
    parser.add_argument("--no-routes", action="store_true")
    args = parser.parse_args()

    files = changed_files()
    scope = auto_scope(files) if args.scope == "auto" else args.scope
    env = dict(os.environ)
    if args.allow_frozen:
        env["COPY_ALLOW_FROZEN"] = "1"

    steps = [run_step("validate_workspace", [sys.executable, "tools/validate_workspace.py"], ROOT, env)]
    if scope in ("copy", "all"):
        steps.append(run_step("tsc", ["npx", "tsc", "--noEmit", "-p", "."], APP))
        if not args.no_routes:
            steps.append(check_routes(args.port))

    status = "FAIL" if any(s["status"] == "FAIL" for s in steps) else "PASS"
    record = {
        "at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "scope": scope,
        "allow_frozen": args.allow_frozen,
        "changed_files": len(files),
        "status": status,
        "steps": steps,
    }
    RUNS.mkdir(parents=True, exist_ok=True)
    out = RUNS / f"{datetime.now().strftime('%Y%m%dT%H%M%S')}.json"
    out.write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")

    for step in steps:
        mark = {"PASS": "ok", "FAIL": "FAIL", "SKIP": "skip"}[step["status"]]
        print(f"[{mark:>4}] {step['name']:<20} {step['duration_s']:>6.1f}s  {step['tail'][-1] if step['tail'] else ''}")
        if step["status"] == "FAIL":
            for line in step["tail"][:-1]:
                print(f"        {line}")
    print(f"verify {status} · scope={scope} · changed={len(files)} · {out.relative_to(ROOT)}")
    return 0 if status == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())
