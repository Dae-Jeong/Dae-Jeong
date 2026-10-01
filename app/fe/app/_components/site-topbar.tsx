"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "@/components/site/topbar";
import { useAdminSession } from "@/features/admin-auth/use-admin-session";
import { ROUTES } from "@/lib/routes";

const ADMIN_LINKS = [
  { href: ROUTES.admin.dashboard, label: "지원 관리" },
  { href: ROUTES.admin.map, label: "문서 지도" },
] as const;

export function SiteTopBar() {
  const currentPath = usePathname();
  const { session, logout, logoutError } = useAdminSession();
  return (
    <TopBar
      currentPath={currentPath}
      extraLinks={session.admin ? ADMIN_LINKS : undefined}
      action={session.admin ? {
        label: "로그아웃",
        onClick: logout,
        error: logoutError ? "로그아웃하지 못했습니다. 다시 시도해 주세요." : undefined,
      } : undefined}
    />
  );
}
