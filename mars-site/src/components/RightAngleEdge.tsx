import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from "reactflow";

export function RightAngleEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  label,
}: EdgeProps) {
  const radius = 12;
  const towardTargetX = targetX >= sourceX ? 1 : -1;
  const towardTargetY = targetY >= sourceY ? 1 : -1;

  const path = [
    `M ${sourceX},${sourceY}`,
    `L ${targetX - radius * towardTargetX},${sourceY}`,
    `Q ${targetX},${sourceY} ${targetX},${sourceY + radius * towardTargetY}`,
    `L ${targetX},${targetY}`,
  ].join(" ");

  return (
    <>
      <BaseEdge id={id} path={path} style={style} markerEnd={markerEnd} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${targetX}px, ${(sourceY + targetY) / 2}px)`,
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
