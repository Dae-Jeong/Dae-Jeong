import type { ReactNode } from "react";
import { Container } from "@/components/site/container";
import { SiteTopBar } from "@/app/_components/site-topbar";
import { SiteFooter } from "../site-footer";
import {
  AdminPageHeader,
  type AdminPage,
} from "./admin-page-header";

export function AdminShell({
  page,
  description,
  children,
}: {
  page: AdminPage;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <div data-admin-shell className="flex min-h-screen flex-col bg-bg">
      <SiteTopBar />
      <Container
        as="main"
        variant="narrow"
        className="min-w-0 flex-1 pt-6 pb-8 sm:pt-10 sm:pb-12"
      >
        <AdminPageHeader page={page} description={description} />
        {children}
      </Container>
      <SiteFooter containerVariant="narrow" className="py-6 sm:py-8" />
    </div>
  );
}
