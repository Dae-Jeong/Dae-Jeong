"use client";

import { useEffect, useId, useRef, useState } from "react";

const mermaidConfig = {
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  fontFamily: "Pretendard, Arial, sans-serif",
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#edf3ff",
    primaryBorderColor: "#2854d7",
    primaryTextColor: "#102044",
    secondaryColor: "#f8fafc",
    secondaryBorderColor: "#536176",
    tertiaryColor: "#eaf8f2",
    tertiaryBorderColor: "#087f5b",
    lineColor: "#536176",
    clusterBkg: "#f1f4f8",
    clusterBorder: "#a9b5c6",
    edgeLabelBackground: "#ffffff",
    fontSize: "15px",
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true,
    nodeSpacing: 28,
    rankSpacing: 42,
    useMaxWidth: true,
  },
} as const;

let mermaidConfigured = false;

export function MermaidDiagram({ chart, title }: { chart: string; title: string }) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    let active = true;
    const timeout = window.setTimeout(() => {
      if (active) setState("error");
    }, 8_000);

    setState("loading");

    void import("mermaid")
      .then(({ default: mermaid }) => {
        if (!mermaidConfigured) {
          mermaid.initialize(mermaidConfig);
          mermaidConfigured = true;
        }

        return mermaid.render(diagramId, chart);
      })
      .then(({ svg, bindFunctions }) => {
        if (!active) return;

        diagram.innerHTML = svg;
        bindFunctions?.(diagram);
        setState("ready");
      })
      .catch(() => {
        if (active) setState("error");
      })
      .finally(() => {
        window.clearTimeout(timeout);
      });

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [chart, diagramId]);

  return (
    <div className="relative min-h-40">
      <div
        ref={diagramRef}
        role="img"
        aria-label={title}
        data-mermaid-state={state}
        className={`[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full ${
          state === "ready" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
        }`}
      />

      {state === "error" ? (
        <p className="m-0 border border-[#b45309] bg-[#fff3e4] px-4 py-8 text-center text-sm text-[#7c2d12]">
          다이어그램을 불러오지 못했습니다.
        </p>
      ) : state === "loading" ? (
        <p className="m-0 py-12 text-center font-mono text-xs text-muted">
          Mermaid rendering…
        </p>
      ) : null}
    </div>
  );
}
