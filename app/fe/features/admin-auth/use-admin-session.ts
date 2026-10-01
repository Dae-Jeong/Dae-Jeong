"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSession, logout as logoutRequest } from "./apis";
import type { AdminSession } from "./types";
import { isAdminPath } from "@/lib/routes";
const hasUiCookie = () =>
  document.cookie.split("; ").some((item) => item === "admin_ui=1");
const SESSION_CHANGED = "admin-session-changed";
export function useAdminSession() {
  const [session, setSession] = useState<AdminSession>({ admin: false });
  const [logoutError, setLogoutError] = useState(false);
  const refreshVersion = useRef(0);
  // On an admin surface the session is always asked from the server; losing it (logout elsewhere, expiry) leaves the
  // protected page for the home page instead of keeping private data on screen.
  const apply = useCallback((next: AdminSession) => {
    // A GET started before expiry must not restore an already expired menu.
    const current = next.admin && next.expiresAt * 1000 <= Date.now()
      ? { admin: false } as const
      : next;
    setSession(current);
    if (!current.admin && isAdminPath(location.pathname)) location.replace("/");
  }, []);
  const refreshFromServer = useCallback(() => {
    const version = ++refreshVersion.current;
    void getSession().then((next) => {
      if (version === refreshVersion.current) apply(next);
    });
  }, [apply]);
  const refresh = useCallback(() => {
    if (hasUiCookie() || isAdminPath(location.pathname)) refreshFromServer();
    else {
      ++refreshVersion.current;
      setSession({ admin: false });
    }
  }, [refreshFromServer]);

  // Show the menu only for a server-verified session; re-check when the tab returns and hide it at expiry.
  useEffect(() => {
    // Initial state is already anonymous. Only synchronize an existing session;
    // later events may also reset the state when the UI cookie disappears.
    if (hasUiCookie() || isAdminPath(location.pathname)) refreshFromServer();
    const version = refreshVersion;
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    // A page restored from the back/forward cache re-checks the session, so Back after logout never shows a cached
    // admin screen as authenticated.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);
    // Footer login and top navigation consume the same verified state without a Provider.
    // The event carries no credential; the server still guards every private request.
    const onSessionChanged = (event: Event) => {
      ++refreshVersion.current;
      apply((event as CustomEvent<AdminSession>).detail);
    };
    window.addEventListener(SESSION_CHANGED, onSessionChanged);
    return () => {
      ++version.current;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener(SESSION_CHANGED, onSessionChanged);
    };
  }, [refreshFromServer, refresh, apply]);
  useEffect(() => {
    if (!session.admin) return;
    const timer = window.setTimeout(
      refresh,
      Math.max(0, session.expiresAt * 1000 - Date.now()) + 500,
    );
    return () => window.clearTimeout(timer);
  }, [session, refresh]);

  // The menu stays until the server confirms the cookies were cleared; a failed logout is shown, not hidden.
  const logout = async () => {
    setLogoutError(false);
    const confirmed = await logoutRequest();
    if (confirmed) {
      window.dispatchEvent(new CustomEvent<AdminSession>(SESSION_CHANGED, { detail: { admin: false } }));
      return;
    }
    setLogoutError(true);
    refresh();
  };

  return {
    session,
    logout,
    logoutError,
    authenticate: (expiresAt: number) => {
      window.dispatchEvent(new CustomEvent<AdminSession>(SESSION_CHANGED, { detail: { admin: true, expiresAt } }));
    },
  };
}
