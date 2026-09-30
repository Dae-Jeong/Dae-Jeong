export type AdminSession =
  { admin: false } | { admin: true; expiresAt: number };
export type LoginResult =
  | { kind: "ok"; expiresAt: number }
  | { kind: "invalid" }
  | { kind: "locked"; retryAfter: number }
  | { kind: "unavailable" }
  | { kind: "connection-error" };
export type LoginStatus =
  | { kind: "idle" | "submitting" }
  | { kind: "error"; message: string }
  | { kind: "locked"; minutes: number };
