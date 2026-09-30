"use client";
import { useEffect, useRef, useState } from "react";
import { login } from "./apis";
import type { LoginStatus } from "./types";
export function useAdminLogin() {
  const [status, setStatus] = useState<LoginStatus>({ kind: "idle" });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const reset = () =>
    setStatus((current) =>
      current.kind === "locked" ? current : { kind: "idle" },
    );
  const submit = async (password: string) => {
    if (status.kind === "submitting" || status.kind === "locked") return;
    setStatus({ kind: "submitting" });
    const result = await login(password);
    if (result.kind === "ok") setStatus({ kind: "idle" });
    else if (result.kind === "locked") {
      setStatus({ kind: "locked", minutes: Math.ceil(result.retryAfter / 60) });
      timer.current = setTimeout(
        () => setStatus({ kind: "idle" }),
        result.retryAfter * 1000,
      );
    } else
      setStatus({
        kind: "error",
        message:
          result.kind === "invalid"
            ? "비밀번호가 맞지 않습니다."
            : result.kind === "connection-error"
              ? "연결에 실패했습니다. 다시 시도해 주세요."
              : "지금은 관리자 모드를 사용할 수 없습니다.",
      });
    return result;
  };
  return { status, submit, reset };
}
