"use client";

import "@xyflow/react/dist/style.css";

import { useMemo, type ReactNode } from "react";
import {
  Controls,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import type { PortfolioVisual } from "@/content/portfolios/types";

type AiSystemVisual = Extract<PortfolioVisual, { kind: "ai-system" }>;
type DiagramNode = Node<{ label: ReactNode }>;

const zoneStyle = {
  border: "1px solid #d9d9d9",
  borderRadius: 0,
  background: "#ffffff",
  color: "#111111",
} as const;

const transactionZoneStyle = {
  border: "1px dashed #707070",
  borderRadius: 0,
  background: "#f7f7f7",
  color: "#111111",
} as const;

const nodeStyle = {
  border: "1px solid #111111",
  borderRadius: 0,
  background: "#ffffff",
  color: "#111111",
  padding: 0,
  boxShadow: "none",
} as const;

function NodeCopy({
  eyebrow,
  title,
  items = [],
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  items?: readonly string[];
  inverted?: boolean;
}) {
  return (
    <div
      className={
        inverted
          ? "h-full bg-fg px-4 py-3 text-left text-bg print:bg-transparent print:text-fg"
          : "h-full px-4 py-3 text-left"
      }
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-60">
        {eyebrow}
      </span>
      <strong className="mt-1 block text-sm leading-[1.4]">{title}</strong>
      {items.length > 0 && (
        <ul className="m-0 mt-2 grid list-none gap-1 border-t border-current/15 pt-2 text-xs leading-[1.4] p-0">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ZoneLabel({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="px-4 py-3 text-left">
      <strong className="block font-mono text-[11px] uppercase tracking-[0.06em]">
        {title}
      </strong>
      <span className="mt-1 block text-[11px] leading-[1.35] text-muted">
        {detail}
      </span>
    </div>
  );
}

function buildNodes(visual: AiSystemVisual): DiagramNode[] {
  const product = visual.ownership.productBackend;
  const runtime = visual.ownership.aiRuntime;

  return [
    {
      id: "product-zone",
      type: "group",
      position: { x: 0, y: 0 },
      data: {
        label: <ZoneLabel title="PRODUCT OWNERSHIP" detail={product.label} />,
      },
      style: { ...zoneStyle, width: 340, height: 500 },
      selectable: false,
      draggable: false,
    },
    {
      id: "delivery-zone",
      type: "group",
      position: { x: 380, y: 0 },
      data: {
        label: <ZoneLabel title="DELIVERY BOUNDARY" detail={visual.delivery.transport} />,
      },
      style: { ...zoneStyle, width: 260, height: 500 },
      selectable: false,
      draggable: false,
    },
    {
      id: "runtime-zone",
      type: "group",
      position: { x: 680, y: 0 },
      data: {
        label: <ZoneLabel title="AI OWNERSHIP" detail={runtime.label} />,
      },
      style: { ...zoneStyle, width: 360, height: 500 },
      selectable: false,
      draggable: false,
    },
    {
      id: "product-backend",
      parentId: "product-zone",
      extent: "parent",
      position: { x: 20, y: 72 },
      data: {
        label: (
          <NodeCopy
            eyebrow="SOURCE OF TRUTH"
            title={product.label}
            items={product.owns}
            inverted
          />
        ),
      },
      style: { ...nodeStyle, width: 300, height: 146 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      selectable: false,
      draggable: false,
    },
    {
      id: "transaction-zone",
      type: "group",
      parentId: "product-zone",
      extent: "parent",
      position: { x: 20, y: 244 },
      data: {
        label: (
          <div className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
            {visual.transaction.label}
          </div>
        ),
      },
      style: { ...transactionZoneStyle, width: 300, height: 210 },
      selectable: false,
      draggable: false,
    },
    {
      id: "owner-db",
      parentId: "transaction-zone",
      extent: "parent",
      position: { x: 16, y: 54 },
      data: {
        label: (
          <NodeCopy
            eyebrow="OWNER DB"
            title={product.database}
            items={visual.transaction.items}
          />
        ),
      },
      style: { ...nodeStyle, width: 126, height: 130 },
      sourcePosition: Position.Right,
      targetPosition: Position.Top,
      selectable: false,
      draggable: false,
    },
    {
      id: "outbox",
      parentId: "transaction-zone",
      extent: "parent",
      position: { x: 158, y: 54 },
      data: {
        label: <NodeCopy eyebrow="DURABLE RECORD" title={visual.transaction.outbox} />,
      },
      style: { ...nodeStyle, width: 126, height: 130 },
      sourcePosition: Position.Right,
      targetPosition: Position.Top,
      selectable: false,
      draggable: false,
    },
    {
      id: "delivery-worker",
      parentId: "delivery-zone",
      extent: "parent",
      position: { x: 20, y: 114 },
      data: {
        label: (
          <NodeCopy
            eyebrow="DELIVERY WORKER"
            title={visual.delivery.worker}
            items={[visual.delivery.retry]}
            inverted
          />
        ),
      },
      style: { ...nodeStyle, width: 220, height: 122 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      selectable: false,
      draggable: false,
    },
    {
      id: "transport",
      parentId: "delivery-zone",
      extent: "parent",
      position: { x: 20, y: 294 },
      data: {
        label: (
          <NodeCopy
            eyebrow="TRANSPORT"
            title={visual.delivery.transport}
            items={[visual.delivery.authentication]}
          />
        ),
      },
      style: { ...nodeStyle, width: 220, height: 110 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      selectable: false,
      draggable: false,
    },
    {
      id: "ai-runtime",
      parentId: "runtime-zone",
      extent: "parent",
      position: { x: 20, y: 72 },
      data: {
        label: (
          <NodeCopy
            eyebrow="EXECUTION"
            title={runtime.label}
            items={runtime.owns}
            inverted
          />
        ),
      },
      style: { ...nodeStyle, width: 320, height: 146 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Left,
      selectable: false,
      draggable: false,
    },
    {
      id: "version-fence",
      parentId: "runtime-zone",
      extent: "parent",
      position: { x: 20, y: 250 },
      data: {
        label: (
          <NodeCopy
            eyebrow="VERSION FENCE"
            title={visual.versionFence.rule}
            items={visual.versionFence.outcomes}
          />
        ),
      },
      style: { ...nodeStyle, width: 154, height: 166 },
      sourcePosition: Position.Right,
      targetPosition: Position.Top,
      selectable: false,
      draggable: false,
    },
    {
      id: "ai-db",
      parentId: "runtime-zone",
      extent: "parent",
      position: { x: 190, y: 250 },
      data: {
        label: <NodeCopy eyebrow="AI DB" title={runtime.database} />,
      },
      style: { ...nodeStyle, width: 150, height: 166 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      selectable: false,
      draggable: false,
    },
  ];
}

function buildEdges(): Edge[] {
  const arrow = {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: "#111111",
  } as const;

  return [
    {
      id: "backend-owner",
      source: "product-backend",
      target: "owner-db",
      type: "smoothstep",
      markerEnd: arrow,
    },
    {
      id: "backend-outbox",
      source: "product-backend",
      target: "outbox",
      type: "smoothstep",
      markerEnd: arrow,
    },
    {
      id: "outbox-worker",
      source: "outbox",
      target: "delivery-worker",
      label: "pending delivery",
      type: "smoothstep",
      markerEnd: arrow,
    },
    {
      id: "worker-transport",
      source: "delivery-worker",
      target: "transport",
      type: "smoothstep",
      markerEnd: arrow,
      style: { strokeDasharray: "5 4" },
    },
    {
      id: "transport-runtime",
      source: "transport",
      target: "ai-runtime",
      type: "smoothstep",
      markerEnd: arrow,
    },
    {
      id: "runtime-fence",
      source: "ai-runtime",
      target: "version-fence",
      label: "compare version",
      type: "smoothstep",
      markerEnd: arrow,
    },
    {
      id: "fence-db",
      source: "version-fence",
      target: "ai-db",
      type: "smoothstep",
      markerEnd: arrow,
    },
  ].map((edge) => ({
    ...edge,
    selectable: false,
    focusable: false,
    style: { stroke: "#111111", strokeWidth: 1.2, ...edge.style },
    labelStyle: { fill: "#3a3a3a", fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: "#ffffff", fillOpacity: 0.94 },
    labelBgPadding: [4, 3] as [number, number],
    labelBgBorderRadius: 0,
  }));
}

function StaticAiSystem({ visual }: { visual: AiSystemVisual }) {
  const product = visual.ownership.productBackend;
  const runtime = visual.ownership.aiRuntime;

  return (
    <div className="grid gap-3" role="group" aria-label={`${visual.title} 정적 구조`}>
      <section className="border border-border p-4">
        <span className="font-mono text-xs text-muted">PRODUCT OWNERSHIP</span>
        <h5 className="m-0 mt-2 text-base font-semibold">{product.label}</h5>
        <p className="m-0 mt-1 text-sm text-fg-2">{product.database}</p>
        <ul className="m-0 mt-3 grid list-none gap-1 p-0 text-sm leading-[1.5]">
          {product.owns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-4 border border-dashed border-muted bg-surface p-3">
          <strong className="font-mono text-xs">{visual.transaction.label}</strong>
          <div className="mt-2 grid grid-cols-2 gap-2 max-sm:grid-cols-1">
            <span className="border border-border bg-bg px-3 py-2 text-sm font-semibold">
              {visual.transaction.items.join(" · ")}
            </span>
            <span className="border border-border bg-bg px-3 py-2 text-sm font-semibold">
              {visual.transaction.outbox}
            </span>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="text-center font-mono text-muted">
        ↓
      </div>

      <section className="border-2 border-fg p-4">
        <span className="font-mono text-xs text-muted">DELIVERY BOUNDARY</span>
        <h5 className="m-0 mt-2 text-base font-semibold">{visual.delivery.worker}</h5>
        <p className="m-0 mt-2 text-sm leading-[1.55] text-fg-2">
          {visual.delivery.retry} · {visual.delivery.transport} · {visual.delivery.authentication}
        </p>
      </section>

      <div aria-hidden="true" className="text-center font-mono text-muted">
        ↓
      </div>

      <section className="border border-border p-4">
        <span className="font-mono text-xs text-muted">AI OWNERSHIP</span>
        <h5 className="m-0 mt-2 text-base font-semibold">{runtime.label}</h5>
        <p className="m-0 mt-1 text-sm text-fg-2">{runtime.database}</p>
        <ul className="m-0 mt-3 grid list-none gap-1 p-0 text-sm leading-[1.5]">
          {runtime.owns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-4 border border-fg px-3 py-3">
          <strong className="text-sm">{visual.versionFence.rule}</strong>
          <p className="m-0 mt-2 text-sm leading-[1.5] text-fg-2">
            {visual.versionFence.outcomes.join(" · ")}
          </p>
        </div>
      </section>
    </div>
  );
}

export function AiSystemDiagram({ visual }: { visual: AiSystemVisual }) {
  const nodes = useMemo(() => buildNodes(visual), [visual]);
  const edges = useMemo(() => buildEdges(), []);

  return (
    <figure
      aria-label={visual.title}
      className="m-0 break-inside-avoid border-y border-border py-6"
    >
      <div className="h-[520px] w-full bg-bg max-lg:hidden print:hidden">
        <ReactFlow
          aria-label={visual.title}
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.08, minZoom: 0.7, maxZoom: 1.2 }}
          minZoom={0.6}
          maxZoom={1.6}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          panOnDrag
          panOnScroll
          zoomOnScroll={false}
          zoomOnPinch
          zoomOnDoubleClick={false}
          preventScrolling={false}
          autoPanOnNodeFocus={false}
          proOptions={{ hideAttribution: true }}
          ariaLabelConfig={{
            "controls.ariaLabel": "다이어그램 보기 조절",
            "controls.zoomIn.ariaLabel": "확대",
            "controls.zoomOut.ariaLabel": "축소",
            "controls.fitView.ariaLabel": "전체 구조 보기",
          }}
        >
          <Controls
            aria-label="다이어그램 보기 조절"
            position="bottom-right"
            orientation="horizontal"
            showInteractive={false}
            className="overflow-hidden rounded-none border border-border bg-bg shadow-none [&>button]:border-0 [&>button]:border-l [&>button]:border-border [&>button]:bg-bg [&>button]:text-fg [&>button:first-child]:border-l-0"
          />
        </ReactFlow>
      </div>

      <div className="hidden max-lg:block print:block">
        <StaticAiSystem visual={visual} />
      </div>

      <section
        aria-label="검증 근거"
        className="mt-4 grid grid-cols-[148px_minmax(0,1fr)] border-y border-success max-sm:grid-cols-1"
      >
        <h5 className="m-0 px-4 py-4 font-mono text-xs font-semibold text-success max-sm:border-b max-sm:border-success">
          VERIFIED BY
        </h5>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 border-l border-success px-4 py-4 max-sm:border-l-0">
          {visual.verificationRail.map((item) => (
            <li key={item} className="text-sm font-semibold leading-[1.45]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <figcaption className="mt-4 max-w-[82ch] text-sm leading-[1.65] text-fg-2">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
