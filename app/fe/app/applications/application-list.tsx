"use client";

import { cn } from "@/lib/cn";

import {
  APPLICATION_STATUS_LABEL,
  type ApplicationAttemptProjection,
  type ApplicationStatus,
} from "./application-types";

type ApplicationListProps = {
  attempts: readonly ApplicationAttemptProjection[];
  selectedId?: string;
  onSelect: (attempt: ApplicationAttemptProjection) => void;
};

const STATUS_TONE: Record<ApplicationStatus, string> = {
  "pre-apply": "text-fg-2",
  "in-progress": "text-warn",
  accepted: "text-success",
  declined: "text-muted",
  rejected: "text-danger",
  unknown: "text-muted",
};

export function ApplicationStatusText({ status }: { status: ApplicationStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs", STATUS_TONE[status])}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {APPLICATION_STATUS_LABEL[status]}
    </span>
  );
}

export function ApplicationList({ attempts, selectedId, onSelect }: ApplicationListProps) {
  return (
    <div className="divide-y divide-border-soft">
      {attempts.map((attempt) => {
        const selected = attempt.id === selectedId;
        return (
          <button
            key={attempt.id}
            type="button"
            onClick={() => onSelect(attempt)}
            aria-current={selected ? "true" : undefined}
            className={cn(
              "focus-ring group grid w-full gap-2 px-3 py-4 text-left transition-colors",
              selected ? "bg-surface" : "hover:bg-surface/70",
            )}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{attempt.company}</span>
                <span className="mt-0.5 block text-sm leading-snug text-fg-2">{attempt.role}</span>
              </span>
              <span aria-hidden className="pt-0.5 font-mono text-sm text-muted transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
            <span className="grid gap-1">
              <ApplicationStatusText status={attempt.status} />
              <span className="truncate font-mono text-xs text-muted">
                {attempt.tracking ?? "추적 정보 미상"}
                {attempt.lastConfirmed ? ` · ${attempt.lastConfirmed}` : ""}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
