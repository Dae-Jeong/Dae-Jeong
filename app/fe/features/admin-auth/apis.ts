import type { AdminSession, LoginResult } from "./types";

let sessionRequest: Promise<AdminSession> | undefined;

// Share concurrent consumers only while this GET is pending. Never retain a settled session.
export function getSession(): Promise<AdminSession> {
  if (sessionRequest) return sessionRequest;
  const request = fetchSession().finally(() => {
    // A login/logout may have detached this request and started a newer one.
    if (sessionRequest === request) sessionRequest = undefined;
  });
  sessionRequest = request;
  return request;
}

async function fetchSession(): Promise<AdminSession> {
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
  sessionRequest = undefined;
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
  } finally {
    // A later recheck must use the cookies at the completed mutation boundary.
    sessionRequest = undefined;
  }
}
export async function logout(): Promise<boolean> {
  sessionRequest = undefined;
  try {
    return Boolean(
      (
        await fetch("/api/admin/logout", {
          method: "POST",
          credentials: "same-origin",
        }).catch(() => undefined)
      )?.ok,
    );
  } finally {
    // A later recheck must use the cookies at the completed mutation boundary.
    sessionRequest = undefined;
  }
}
