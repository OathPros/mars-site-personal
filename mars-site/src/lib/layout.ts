import dagre from "dagre";
import type { ProcessNode, ProcessEdge } from "../data/process";

/**
 * BPMN-inspired shape classification used both for rendering and for
 * auto-layout sizing. Decisions render as gateways (diamonds), the true
 * start/end of the process render as rounded events (circles), and
 * everything else renders as a task/activity rectangle.
 */
export type BpmnShape = "event-start" | "event-end" | "gateway" | "task";

const END_EVENT_IDS = new Set(["AB", "O"]);
const START_EVENT_IDS = new Set(["A"]);

export function getShape(node: ProcessNode): BpmnShape {
  if (START_EVENT_IDS.has(node.id)) return "event-start";
  if (END_EVENT_IDS.has(node.id)) return "event-end";
  if (node.category === "decision") return "gateway";
  return "task";
}

/** Bounding box (including external label space) used for layout + rendering. */
export function getNodeDimensions(shape: BpmnShape): { width: number; height: number } {
  switch (shape) {
    case "event-start":
    case "event-end":
      return { width: 150, height: 122 };
    case "gateway":
      return { width: 160, height: 118 };
    case "task":
    default:
      return { width: 220, height: 76 };
  }
}

/**
 * The primary "spine" of the process: the single most-travelled path from
 * the very first step through to the point where a prototype becomes an
 * operationally-supported capability. Side branches (optional steps like
 * training/consultation, or outcomes like stop/redirect and the formal
 * IPPM path) fan out from these nodes but must not visually displace the
 * spine itself — it should always read as one continuous straight line.
 */
const SPINE_NODE_IDS = ["A", "D", "B", "F", "G-ideation", "H", "I", "J", "K", "L", "M", "N", "P", "Q"];

export interface LayoutResult {
  positions: Record<string, { x: number; y: number }>;
  width: number;
  height: number;
  minX: number;
}

/**
 * Auto-layout the process graph with dagre so edges route cleanly without
 * manual position guesswork. Uses a top-to-bottom rank direction matching
 * the flowchart's authoritative reading order.
 */
export function layoutProcess(nodes: ProcessNode[], edges: ProcessEdge[]): LayoutResult {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: "TB",
    nodesep: 110,
    ranksep: 130,
    marginx: 60,
    marginy: 60,
    acyclicer: "greedy",
  });
  g.setDefaultEdgeLabel(() => ({}));

  const widthById: Record<string, number> = {};
  for (const node of nodes) {
    const shape = getShape(node);
    const { width, height } = getNodeDimensions(shape);
    widthById[node.id] = width;
    g.setNode(node.id, { width, height });
  }

  for (const edge of edges) {
    // Loop-back edges (e.g. "not ready yet, keep building") are excluded
    // from the ranking graph entirely. Including them lets dagre's cycle
    // breaker (acyclicer) pick *any* edge in the cycle to reverse for
    // ranking purposes, sometimes a genuinely forward edge instead of the
    // intended loop-back, which made forward edges (e.g. "Build" →
    // "Need York resources?") render as if they were loops. Since loop
    // edges are rendered with dedicated custom routing (see LoopEdge),
    // they don't need to participate in rank computation at all.
    if (edge.kind === "loop") continue;
    // Primary "spine" edges get a much higher layout weight so dagre's
    // barycenter heuristic favours keeping this path straight over
    // centering the side branches that fan out from it.
    g.setEdge(edge.source, edge.target, { weight: edge.primary ? 400 : 1 });
  }

  dagre.layout(g);

  const positions: Record<string, { x: number; y: number }> = {};
  // dagre's rank (raw, pre-conversion) center y is identical for every
  // node sharing a rank, even when node heights differ (e.g. a task next
  // to a gateway) — unlike the top-left y used for rendering, which does
  // vary with height. Ranks are grouped by this raw value below so a
  // rank can be shifted as a whole without regard to per-node height.
  const rawCenterYById: Record<string, number> = {};
  g.nodes().forEach((id) => {
    const n = g.node(id);
    rawCenterYById[id] = n.y;
    // dagre gives center coordinates; convert to top-left for React Flow.
    positions[id] = { x: n.x - n.width / 2, y: n.y - n.height / 2 };
  });

  // Straighten the primary spine into one continuous vertical line. Even
  // with heavily weighted spine edges, dagre's per-rank barycenter pass
  // can still nudge the spine sideways to balance side branches (e.g.
  // "Complete training" / "Consult AI Committee" flanking "Complete
  // Ideation Guide", or "Stop/Redirect" branching off the committee
  // recommendation). To guarantee true straightness, every rank that
  // contains a spine node is shifted horizontally so that node lands on
  // a single shared center-x, carrying any side-branch nodes in that
  // same rank along with it (preserving their relative offset). The
  // resulting shift is then carried forward (as a rigid translation) to
  // every subsequent rank, spine or not — otherwise ranks below the
  // final spine node (e.g. the production-request flow that follows
  // "Resources provided") would stay anchored to their original,
  // unshifted position while the rank right above them moved, creating
  // a brand new kink/overlap at that boundary that didn't exist before.
  const presentSpineIds = SPINE_NODE_IDS.filter((id) => positions[id]);
  if (presentSpineIds.length > 0) {
    const referenceId = presentSpineIds.includes("G-ideation") ? "G-ideation" : presentSpineIds[0];
    const referenceCenterX = positions[referenceId].x + widthById[referenceId] / 2;
    const spineIdSet = new Set(presentSpineIds);

    const idsByRawY = new Map<number, string[]>();
    for (const id of g.nodes()) {
      const y = rawCenterYById[id];
      const bucket = idsByRawY.get(y);
      if (bucket) bucket.push(id);
      else idsByRawY.set(y, [id]);
    }

    const sortedRankYs = [...idsByRawY.keys()].sort((a, b) => a - b);
    let runningDelta = 0;
    for (const y of sortedRankYs) {
      const rankIds = idsByRawY.get(y)!;
      const spineIdInRank = rankIds.find((id) => spineIdSet.has(id));
      if (spineIdInRank) {
        const currentCenterX = positions[spineIdInRank].x + widthById[spineIdInRank] / 2;
        runningDelta = referenceCenterX - currentCenterX;
      }
      if (Math.abs(runningDelta) < 0.5) continue;
      for (const id of rankIds) {
        positions[id] = { x: positions[id].x + runningDelta, y: positions[id].y };
      }
    }
  }

  let maxX = 0;
  let maxY = 0;
  let minX = Infinity;
  g.nodes().forEach((id) => {
    const n = g.node(id);
    const pos = positions[id];
    maxX = Math.max(maxX, pos.x + n.width);
    maxY = Math.max(maxY, pos.y + n.height);
    minX = Math.min(minX, pos.x);
  });

  return { positions, width: maxX, height: maxY, minX };
}
