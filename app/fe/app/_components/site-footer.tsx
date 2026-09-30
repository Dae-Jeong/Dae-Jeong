"use client";
import { useState } from "react";
import { FooterBar } from "@/components/site/footer-bar";
import { useAdminSession } from "@/features/admin-auth/use-admin-session";
import { AdminTrigger } from "./admin/admin-trigger";
import { AdminLoginDialog } from "./admin/admin-login-dialog";
import { AdminMenu } from "./admin/admin-menu";
export function SiteFooter({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { session, authenticate, logout, logoutError } = useAdminSession();
  return (
    <FooterBar
      className={className}
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
          {session.admin && (
            <AdminMenu logout={logout} logoutError={logoutError} />
          )}
        </>
      }
    />
  );
}
