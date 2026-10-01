import type { ReactNode } from "react";

const ADMIN_PAGE_TITLES = {
  dashboard: "지원 관리",
  map: "문서 지도",
} as const;
export type AdminPage = keyof typeof ADMIN_PAGE_TITLES;

export function AdminPageHeader({
  page,
  description,
}: {
  page: AdminPage;
  description: ReactNode;
}) {
  return (
    <header className="mb-6 border-b border-border pb-4 sm:mb-8">
      <h1 className="m-0 text-[22px] leading-[30px] font-semibold sm:text-[24px] sm:leading-8">
        {ADMIN_PAGE_TITLES[page]}
      </h1>
      <p className="m-0 mt-2 text-[14px] leading-5 text-muted [overflow-wrap:anywhere]">
        {description}
      </p>
    </header>
  );
}
