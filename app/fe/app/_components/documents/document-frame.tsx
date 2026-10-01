import type { ComponentPropsWithoutRef } from "react";
import styles from "./document-frame.module.css";

/** Shared screen paper. Renderers keep their semantic content and print rules. */
export function DocumentFrame({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"main">) {
  return (
    <main
      {...props}
      data-document-frame=""
      className={`${styles.paper} ${className}`}
    />
  );
}
