"use client";
import { useCallback, useEffect, useState } from "react";
import { getSession, logout as logoutRequest } from "./apis";
import type { AdminSession } from "./types";
import { isAdminPath } from "@/lib/routes";
const hasUiCookie = () =>
  document.cookie.split("; ").some((item) => item === "admin_ui=1");
export function useAdminSession() {
  const [session, setSession] = useState<AdminSession>({ admin: false });
  const [logoutError, setLogoutError] = useState(false);
  // On an admin surface the session is always asked from the server; losing it (logout elsewhere, expiry) leaves the
  // protected page for the home page instead of keeping private data on screen.
  const apply = useCallback((next: AdminSession) => {
    setSession(next);
    if (!next.admin && isAdminPath(location.pathname)) location.replace("/");
  }, []);
  const refresh = useCallback(() => {
    if (hasUiCookie() || isAdminPath(location.pathname))
      void getSession().then(apply);
    else setSession({ admin: false });
  }, [apply]);

  // Show the menu only for a server-verified session; re-check when the tab returns and hide it at expiry.
  useEffect(() => {
    if (hasUiCookie() || isAdminPath(location.pathname))
      void getSession().then(apply);
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
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [refresh, apply]);
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
      apply({ admin: false });
      return;
    }
    setLogoutError(true);
    refresh();
  };

  return {
    session,
    refresh,
    logout,
    logoutError,
    authenticate: (expiresAt: number) => setSession({ admin: true, expiresAt }),
  };
}
