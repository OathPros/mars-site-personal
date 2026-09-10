import { processEdges } from "../data/process";

/**
 * Given a selected node id, compute the set of upstream (ancestor) and
 * downstream (descendant) node ids plus the edge ids that connect them,
 * so the process map can highlight the full relevant pathway.
 */
export function computePathway(nodeId: string) {
  const upstreamNodes = new Set<string>();
  const downstreamNodes = new Set<string>();
  const edgeIds = new Set<string>();

  const byTarget = new Map<string, typeof processEdges>();
  const bySource = new Map<string, typeof processEdges>();
  for (const e of processEdges) {
    if (!byTarget.has(e.target)) byTarget.set(e.target, []);
    byTarget.get(e.target)!.push(e);
    if (!bySource.has(e.source)) bySource.set(e.source, []);
    bySource.get(e.source)!.push(e);
  }

  // Walk upstream (ancestors)
  const visitedUp = new Set<string>([nodeId]);
  const stackUp = [nodeId];
  while (stackUp.length) {
    const current = stackUp.pop()!;
    const incoming = byTarget.get(current) ?? [];
    for (const e of incoming) {
      edgeIds.add(e.id);
      upstreamNodes.add(e.source);
      if (!visitedUp.has(e.source)) {
        visitedUp.add(e.source);
        stackUp.push(e.source);
      }
    }
  }

  // Walk downstream (descendants)
  const visitedDown = new Set<string>([nodeId]);
  const stackDown = [nodeId];
  while (stackDown.length) {
    const current = stackDown.pop()!;
    const outgoing = bySource.get(current) ?? [];
    for (const e of outgoing) {
      edgeIds.add(e.id);
      downstreamNodes.add(e.target);
      if (!visitedDown.has(e.target)) {
        visitedDown.add(e.target);
        stackDown.push(e.target);
      }
    }
  }

  return { upstreamNodes, downstreamNodes, edgeIds };
}
