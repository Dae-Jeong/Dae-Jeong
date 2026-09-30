import type { AdminSession, LoginResult } from "./types";

export async function getSession(): Promise<AdminSession> {
  try {
    const response = await fetch("/api/admin/session", {
      cache: "no-store",
      credentials: "same-origin",
    });
    return response.ok
      ? ((await response.json()) as AdminSession)
      : { admin: false };
  } catch {
    return { admin: false };
  }
}

export async function login(password: string): Promise<LoginResult> {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok)
      return {
        kind: "ok",
        expiresAt: ((await response.json()) as { expiresAt: number }).expiresAt,
      };
    if (response.status === 429)
      return {
        kind: "locked",
        retryAfter: Number(response.headers.get("Retry-After")) || 600,
      };
    return { kind: response.status === 401 ? "invalid" : "unavailable" };
  } catch {
    return { kind: "connection-error" };
  }
}
export async function logout(): Promise<boolean> {
  return Boolean(
    (
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      }).catch(() => undefined)
    )?.ok,
  );
}
