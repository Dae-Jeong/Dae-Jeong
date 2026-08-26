"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  fontFamily: "Pretendard, Arial, sans-serif",
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#ffffff",
    primaryBorderColor: "#1f2937",
    primaryTextColor: "#111827",
    secondaryColor: "#f8fafc",
    tertiaryColor: "#f0fdf4",
    lineColor: "#64748b",
    clusterBkg: "#f8fafc",
    clusterBorder: "#cbd5e1",
    edgeLabelBackground: "#ffffff",
    fontSize: "14px",
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true,
    nodeSpacing: 28,
    rankSpacing: 42,
    useMaxWidth: true,
  },
});

let renderQueue = Promise.resolve();

function renderDiagram(id: string, chart: string) {
  const render = renderQueue.then(() => mermaid.render(id, chart));
  renderQueue = render.then(
    () => undefined,
    () => undefined,
  );
  return render;
}

export function MermaidDiagram({ chart, title }: { chart: string; title: string }) {
  const diagramId = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    void renderDiagram(diagramId, chart)
      .then(({ svg: renderedSvg }) => {
        if (active) setSvg(renderedSvg);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, [chart, diagramId]);

  return (
    <div
      role="img"
      aria-label={title}
      data-mermaid-state={svg ? "ready" : error ? "error" : "loading"}
      className="min-h-40 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full"
      {...(svg ? { dangerouslySetInnerHTML: { __html: svg } } : {})}
    >
      {!svg && error ? (
        <p className="m-0 text-sm text-danger">다이어그램을 불러오지 못했습니다.</p>
      ) : !svg ? (
        <p className="m-0 py-12 text-center font-mono text-xs text-muted">
          Mermaid rendering…
        </p>
      ) : null}
    </div>
  );
}
