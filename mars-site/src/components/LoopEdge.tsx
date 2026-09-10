import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from "reactflow";

/**
 * Loop-back sequence flows (e.g. "not ready yet, keep building") point to
 * an earlier rank in the diagram. Routing them through the normal
 * smoothstep algorithm cuts across unrelated nodes in the same column.
 * Instead, this edge swings out to a dedicated corridor beyond the
 * selected side of the entire diagram (data.corridorX) and back in. The
 * route deliberately uses the minimum three orthogonal legs with two
 * subtly rounded 90-degree corners: source → corridor → target.
 */
export function LoopEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  label,
  data,
}: EdgeProps) {
  const corridorX = (data?.corridorX as number | undefined) ?? Math.max(sourceX, targetX) + 120;
  const radius = 12;
  const towardCorridor = corridorX >= sourceX ? 1 : -1;
  const towardTargetY = targetY >= sourceY ? 1 : -1;
  const towardTargetX = targetX >= corridorX ? 1 : -1;

  const path = [
    `M ${sourceX},${sourceY}`,
    `L ${corridorX - radius * towardCorridor},${sourceY}`,
    `Q ${corridorX},${sourceY} ${corridorX},${sourceY + radius * towardTargetY}`,
    `L ${corridorX},${targetY - radius * towardTargetY}`,
    `Q ${corridorX},${targetY} ${corridorX + radius * towardTargetX},${targetY}`,
    `L ${targetX},${targetY}`,
  ].join(" ");

  const midY = (sourceY + targetY) / 2;

  return (
    <>
      <BaseEdge id={id} path={path} style={style} markerEnd={markerEnd} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${corridorX}px, ${midY}px)`,
              background: "#FFFFFF",
              padding: "2px 6px",
              fontSize: 11,
              fontWeight: 700,
              color: "#181818",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 40,
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
