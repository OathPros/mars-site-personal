import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { processNodes, processEdges, nodeMap, categoryMeta, lifecycleStages } from "../data/process";
import type { ProcessNode, ProcessEdge } from "../data/process";
import { computePathway } from "../lib/graph";
import { layoutProcess } from "../lib/layout";
import { ProcessFlowNode, type FlowNodeData } from "./ProcessFlowNode";
import { LoopEdge } from "./LoopEdge";
import { RightAngleEdge } from "./RightAngleEdge";
import { NodeDetailDrawer } from "./NodeDetailDrawer";
import { LifecycleBadge } from "./LifecycleBadge";

const nodeTypes = { process: ProcessFlowNode };
const edgeTypes = { loopEdge: LoopEdge, rightAngleEdge: RightAngleEdge };

const edgeColor: Record<string, string> = {
  default: "#686868",
  yes: "#E31837",
  no: "#686868",
  skip: "#A7A7A7",
  loop: "#B5122B",
};

// Computed once. The process graph is static, authoritative data.
const layout = layoutProcess(processNodes, processEdges);

/**
 * Loop-back edges (pointing to an earlier rank) are routed via side
 * handles so they arc around the main spine instead of crossing back
 * through unrelated nodes, which is what made the flow look "wonky".
 */
function isLoopEdge(edge: ProcessEdge): boolean {
  // The data model is authoritative: edges explicitly marked "loop" are
  // the only ones that should route via the loop corridor. A geometric
  // fallback catches any edge that dagre still ranked backward for other
  // reasons, but must not be the primary signal; otherwise a forward
  // edge that happens to sit on an equal/earlier rank (e.g. two branches
  // merging) gets misrouted as a loop, which is what caused "Build" to
  // wander before reaching "Need York resources?".
  if (edge.kind === "loop") return true;
  const source = layout.positions[edge.source];
  const target = layout.positions[edge.target];
  if (!source || !target) return false;
  return target.y < source.y - 4;
}

function chooseHandles(edge: ProcessEdge): { sourceHandle?: string; targetHandle?: string } {
  if (edge.id === "e-J-R") {
    return { sourceHandle: "right-source" };
  }
  if (isLoopEdge(edge)) {
    if (LEFT_LOOP_EDGES.has(edge.id)) {
      return { sourceHandle: "left-source", targetHandle: "left-target" };
    }
    return { sourceHandle: "right-source", targetHandle: "right-target" };
  }
  return {};
}

// Some loop-back edges are better routed via a left-side corridor because
// the right side of their column is crowded by other nodes (e.g. the
// production-review cluster). The data model marks which edges these are.
const LEFT_LOOP_EDGES = new Set(processEdges.filter((e) => e.loopSide === "left").map((e) => e.id));

// Loop-back edges swing out to a shared corridor just beyond the widest
// node in the whole diagram, guaranteeing they never cross another node.
const loopCorridorX = layout.width + 70;
const loopCorridorXLeft = layout.minX - 70;

function MapInner({
  initialSelected,
  onSelectedChange,
}: {
  initialSelected?: string;
  onSelectedChange?: (id: string | null) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelected ?? null);
  const [showLegend, setShowLegend] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { fitView } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleChange = () => {
      const active = document.fullscreenElement === containerRef.current;
      setIsFullscreen(active);
      // The container's size changes drastically on entering/exiting
      // fullscreen; React Flow needs a moment to observe the new size
      // before re-fitting, otherwise it fits to the stale dimensions.
      setTimeout(() => fitView({ duration: 400, padding: 0.15 }), 60);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, [fitView]);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  }, []);

  const pathway = useMemo(() => (selectedId ? computePathway(selectedId) : null), [selectedId]);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId((current) => (current === id ? current : id));
      onSelectedChange?.(id);
    },
    [onSelectedChange],
  );

  useEffect(() => {
    if (initialSelected) {
      setSelectedId(initialSelected);
      const t = setTimeout(() => {
        fitView({ nodes: [{ id: initialSelected }], duration: 600, padding: 1.2 });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [initialSelected, fitView]);

  const nodes: Node<FlowNodeData>[] = useMemo(
    () =>
      processNodes.map((n) => ({
        id: n.id,
        type: "process",
        position: layout.positions[n.id] ?? { x: 0, y: 0 },
        draggable: false,
        zIndex: selectedId === n.id ? 30 : 20,
        data: {
          node: n,
          selected: selectedId === n.id,
          dimmed: !!pathway && selectedId !== n.id && !pathway.upstreamNodes.has(n.id) && !pathway.downstreamNodes.has(n.id),
          onSelect: handleSelect,
        },
      })),
    [selectedId, pathway, handleSelect],
  );

  const edges: Edge[] = useMemo(() => {
    let loopIndexRight = 0;
    let loopIndexLeft = 0;
    return processEdges.map((e) => {
      const isActive = pathway?.edgeIds.has(e.id);
      const dimmed = !!pathway && !isActive;
      const { sourceHandle, targetHandle } = chooseHandles(e);
      const loop = isLoopEdge(e);
      const isLeft = LEFT_LOOP_EDGES.has(e.id);
      const sourcePos = layout.positions[e.source];
      const targetPos = layout.positions[e.target];
      // When a node's source and target are perfectly vertically aligned
      // (same x), smoothstep still routes it through the shared step/turn
      // point of its sibling branches, making an otherwise-straight path
      // look bent. Force a plain straight line in that case so the
      // dominant/centered branch reads as a clean vertical drop.
      const isStraightVertical =
        !loop && e.id !== "e-J-R" && !!sourcePos && !!targetPos && Math.abs(sourcePos.x - targetPos.x) < 1;
      const corridorX = loop
        ? isLeft
          ? loopCorridorXLeft - (loopIndexLeft++ % 3) * 26
          : loopCorridorX + (loopIndexRight++ % 3) * 26
        : undefined;
      const loopData = loop
        ? {
            corridorX,
          }
        : undefined;
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle,
        targetHandle,
        label: e.label,
        type: loop ? "loopEdge" : e.id === "e-J-R" ? "rightAngleEdge" : isStraightVertical ? "straight" : "smoothstep",
        pathOptions: loop || e.id === "e-J-R" || isStraightVertical ? undefined : { borderRadius: 14 },
        data: loopData,
        animated: isActive && (e.kind === "yes" || e.kind === "no"),
        style: {
          stroke: edgeColor[e.kind] ?? edgeColor.default,
          strokeWidth: isActive ? 3 : 2,
          strokeDasharray: e.kind === "skip" || e.kind === "loop" ? "6 4" : undefined,
          opacity: dimmed ? 0.15 : 1,
          fill: "none",
        },
        labelStyle: { fill: "#181818", fontWeight: 700, fontSize: 11 },
        labelBgStyle: { fill: "#FFFFFF", fillOpacity: 0.95 },
        labelBgPadding: [6, 3] as [number, number],
        labelBgBorderRadius: 3,
        markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor[e.kind] ?? edgeColor.default, width: 18, height: 18 },
        zIndex: isActive ? 2 : 1,
      };
    });
  }, [pathway]);

  const selectedNode: ProcessNode | null = selectedId ? nodeMap[selectedId] : null;

  return (
    <div ref={containerRef} className="relative h-full w-full bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        nodesDraggable={false}
        elementsSelectable
        panOnScroll
        zoomOnPinch
        onPaneClick={() => setSelectedId(null)}
      >
        <Background color="#E5E5E5" gap={24} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>

      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
        <button
          onClick={() => fitView({ duration: 500, padding: 0.15 })}
          className="border border-light-grey bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink shadow-sm hover:border-york-red hover:text-york-red"
        >
          Fit
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            onSelectedChange?.(null);
            fitView({ duration: 500, padding: 0.15 });
          }}
          className="border border-light-grey bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink shadow-sm hover:border-york-red hover:text-york-red"
        >
          Reset
        </button>
        <button
          onClick={() => setShowLegend((v) => !v)}
          aria-expanded={showLegend}
          className="border border-light-grey bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink shadow-sm hover:border-york-red hover:text-york-red"
        >
          Legend
        </button>
        <button
          onClick={toggleFullscreen}
          aria-pressed={isFullscreen}
          className="border border-york-red bg-york-red px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-york-red-dark"
        >
          {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        </button>
      </div>

      {showLegend && (
        <div className="absolute right-3 top-3 z-10 w-72 max-h-[calc(100%-3.5rem)] space-y-4 overflow-y-auto border border-light-grey bg-white/95 p-4 text-xs shadow-md">
          <div>
            <div className="mb-2 font-semibold uppercase tracking-widest text-mid-grey">Shapes (BPMN)</div>
            <ul className="space-y-2 text-charcoal">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-york-red-dark bg-york-red" aria-hidden="true" />
                <span><span className="font-semibold">Circle:</span> start / end of the process</span>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="h-5 w-5 shrink-0 border-2 border-mid-grey bg-[#F4F4F4]"
                  style={{ transform: "rotate(45deg)" }}
                  aria-hidden="true"
                />
                <span><span className="font-semibold">Diamond:</span> decision / gateway (YES/NO or recommendation)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-7 shrink-0 rounded-md border-2 border-york-red bg-white" aria-hidden="true" />
                <span><span className="font-semibold">Rectangle:</span> action, form, or governance step</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold uppercase tracking-widest text-mid-grey">Lifecycle</div>
            <div className="flex flex-wrap gap-1.5">
              {lifecycleStages.map((s) => (
                <LifecycleBadge key={s.id} stage={s.id} className="!text-[10px] !px-2 !py-0.5" />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 font-semibold uppercase tracking-widest text-mid-grey">Node types</div>
            <ul className="space-y-1">
              {Object.entries(categoryMeta).map(([key, meta]) => (
                <li key={key} className="text-charcoal">
                  <span className="font-semibold">{meta.label}:</span> {meta.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold uppercase tracking-widest text-mid-grey">Branches</div>
            <ul className="space-y-1 text-charcoal">
              <li><span className="font-semibold text-york-red">Red solid</span>: YES / proceed</li>
              <li><span className="font-semibold text-mid-grey">Grey solid</span>: NO / default flow</li>
              <li><span className="font-semibold text-[#A7A7A7]">Dotted</span>: optional / skip</li>
              <li><span className="font-semibold text-york-red-dark">Dashed</span>: loop back</li>
            </ul>
          </div>
        </div>
      )}

      <NodeDetailDrawer
        node={selectedNode}
        onClose={() => setSelectedId(null)}
        onNavigate={(id) => {
          setSelectedId(id);
          onSelectedChange?.(id);
          setTimeout(() => fitView({ nodes: [{ id }], duration: 600, padding: 1.2 }), 30);
        }}
      />
    </div>
  );
}

export function ProcessMap(props: {
  initialSelected?: string;
  compact?: boolean;
  height?: string;
  onSelectedChange?: (id: string | null) => void;
}) {
  return (
    <div className="w-full" style={{ height: props.height ?? "80vh" }}>
      <ReactFlowProvider>
        <MapInner {...props} />
      </ReactFlowProvider>
    </div>
  );
}
