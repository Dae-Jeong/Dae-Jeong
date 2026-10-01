"use client";
import { useState } from "react";
import { FooterBar } from "@/components/site/footer-bar";
import { useAdminSession } from "@/features/admin-auth/use-admin-session";
import { AdminTrigger } from "./admin/admin-trigger";
import { AdminLoginDialog } from "./admin/admin-login-dialog";
import type { ContainerVariant } from "@/components/site/container";
export function SiteFooter({
  className = "",
  containerVariant = "hub",
}: {
  className?: string;
  containerVariant?: ContainerVariant;
}) {
  const [open, setOpen] = useState(false);
  const { session, authenticate } = useAdminSession();
  return (
    <FooterBar
      className={className}
      containerVariant={containerVariant}
      name={
        <>
          <AdminTrigger
            disabled={session.admin}
            onActivate={() => setOpen(true)}
          >
            김대정
          </AdminTrigger>
          <AdminLoginDialog
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={authenticate}
          />
        </>
      }
    />
  );
}
