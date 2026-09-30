"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ROUTES } from "@/lib/routes";
const ADMIN_LINKS = [
  { href: ROUTES.admin.dashboard, label: "지원 관리" },
  { href: ROUTES.admin.map, label: "문서 지도" },
];
export function AdminMenu({
  logout,
  logoutError,
}: {
  logout: () => void;
  logoutError: boolean;
}) {
  const menu = useRef<HTMLElement>(null);
  // The fixed menu never covers the footer: while it is shown the page gains bottom space equal to the menu height,
  // so the end of every page (footer name and links) scrolls clear above it on desktop and when it wraps on mobile.
  // The space is a CSS variable applied only on screen (globals.css), so printing in admin mode adds no space or page.
  useEffect(() => {
    const element = menu.current;
    if (!element) return;
    const body = document.body;
    const apply = () => {
      const height = element.getBoundingClientRect().height;
      if (height)
        body.style.setProperty("--admin-menu-space", `${height + 24}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => {
      observer.disconnect();
      body.style.removeProperty("--admin-menu-space");
    };
  }, []);

  return (
    <nav
      ref={menu}
      aria-label="관리자 메뉴"
      data-admin-menu
      className="fixed bottom-4 left-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-x-4 gap-y-1 border border-fg bg-bg px-3 py-2 font-mono text-xs shadow-sm print:hidden"
    >
      <span className="font-semibold">ADMIN</span>
      {ADMIN_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
        >
          {link.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={logout}
        className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
      >
        로그아웃
      </button>
      {logoutError && (
        <span role="alert" className="text-danger">
          로그아웃하지 못했습니다. 다시 시도해 주세요.
        </span>
      )}
    </nav>
  );
}
