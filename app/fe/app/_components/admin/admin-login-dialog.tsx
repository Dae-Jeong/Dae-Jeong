"use client";
import { useEffect, useRef, type FormEvent } from "react";
import { useAdminLogin } from "@/features/admin-auth/use-admin-login";
export function AdminLoginDialog({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (expiresAt: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const { status, submit: login, reset } = useAdminLogin();
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      input.current?.focus();
    } else dialog.current?.close();
  }, [open]);
  const close = () => dialog.current?.close();
  const onClosed = () => {
    if (input.current) input.current.value = "";
    reset();
    onClose();
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await login(input.current?.value ?? "");
    if (input.current && result?.kind !== "connection-error")
      input.current.value = "";
    if (result?.kind === "ok") {
      onSuccess(result.expiresAt);
      close();
    } else if (
      result &&
      result.kind !== "locked" &&
      result.kind !== "connection-error"
    )
      input.current?.focus();
  };
  const locked = status.kind === "locked";
  const message =
    status.kind === "locked"
      ? `시도가 많아 잠시 잠겼습니다. 약 ${status.minutes}분 후 다시 시도해 주세요.`
      : status.kind === "error"
        ? status.message
        : "";

  return (
    <dialog
      ref={dialog}
      aria-labelledby="admin-dialog-title"
      onClose={onClosed}
      onClick={(event) => {
        if (event.target === dialog.current) close();
      }}
      className="m-auto w-[min(360px,calc(100vw-32px))] border border-border bg-bg p-0 text-fg backdrop:bg-black/40 print:hidden"
    >
      <form onSubmit={submit} className="grid gap-4 p-5">
        <h2 id="admin-dialog-title" className="text-base font-semibold">
          관리자 모드
        </h2>
        <label className="grid gap-2 text-sm">
          비밀번호
          <input
            ref={input}
            type="password"
            name="password"
            autoComplete="current-password"
            required
            maxLength={1024}
            disabled={locked}
            aria-describedby="admin-dialog-message"
            className="min-h-11 border border-border bg-bg px-3 font-mono text-sm focus-visible:outline-2 focus-visible:outline-fg"
          />
        </label>
        <p
          id="admin-dialog-message"
          role="status"
          aria-live="polite"
          className="min-h-5 text-sm text-muted"
        >
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="min-h-11 border border-border px-4 text-sm"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={locked || status.kind === "submitting"}
            className="min-h-11 border border-fg bg-fg px-4 text-sm text-bg disabled:opacity-50"
          >
            {status.kind === "submitting" ? "확인 중…" : "확인"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
