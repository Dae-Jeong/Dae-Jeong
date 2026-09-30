import type { ReactNode } from "react";
import { Inline } from "../inline";

/** Credential/table row of the single resume renderer (구분 | 내용 | 시기). Application Copy Standard §1-6 / gate 21:
 *  a blank label or period creates no element and reserves no column; text content stays "label text meta". */
export function ResumeRow({
  label,
  text,
  meta,
  classes,
  attributes,
}: {
  label?: ReactNode;
  text: string;
  meta?: ReactNode;
  classes: { row: string; rowLabel: string; rowText: string; rowMeta: string };
  attributes?: Record<string, string>;
}) {
  const present = (value: ReactNode) =>
    value !== undefined &&
    value !== null &&
    value !== false &&
    !(typeof value === "string" && !value.trim());
  const hasLabel = present(label);
  const hasMeta = present(meta);
  return (
    <div
      className={classes.row}
      data-row-columns={`${hasLabel ? "label-" : ""}text${hasMeta ? "-meta" : ""}`}
      {...attributes}
    >
      {hasLabel && (
        <>
          <span className={classes.rowLabel}>{label}</span>{" "}
        </>
      )}
      <span className={classes.rowText}>
        <Inline text={text} />
      </span>
      {hasMeta && (
        <>
          {" "}
          <span className={classes.rowMeta}>{meta}</span>
        </>
      )}
    </div>
  );
}
