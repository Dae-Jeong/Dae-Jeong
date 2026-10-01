import type { ReactNode } from "react";

// Shared notice appearance only; each route owns the message, condition and spacing.
export function AdminNotice({
  tone = "status",
  className = "",
  children,
}: {
  tone?: "status" | "muted" | "alert";
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      role={tone === "alert" ? "alert" : "status"}
      className={`m-0 border p-4 text-[14px] leading-5 ${tone === "alert" ? "border-danger text-danger" : tone === "muted" ? "border-border text-muted" : "border-border"} ${className}`}
    >
      {children}
    </p>
  );
}
