import { Handle, Position, type NodeProps } from "reactflow";
import clsx from "clsx";
import type { ProcessNode } from "../data/process";
import { getShape, getNodeDimensions } from "../lib/layout";

export type FlowNodeData = {
  node: ProcessNode;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
};

/**
 * BPMN-inspired category styling for task rectangles. Gateways and events
 * are handled separately below since their shape (not just colour) differs.
 */
const taskCategoryClasses: Record<string, string> = {
  hero: "bg-york-red text-white border-york-red-dark",
  action: "bg-white text-ink border-york-red",
  form: "bg-[#FFF4F5] text-ink border-york-red",
  reference: "bg-[#F7F7F7] text-charcoal border-[#A7A7A7] border-dashed",
  governance: "bg-ink text-white border-ink",
  production: "bg-york-red text-white border-york-red-dark",
  remediation: "bg-[#F4F4F4] text-charcoal border-mid-grey border-dashed",
  stop: "bg-[#F1F1F1] text-charcoal border-mid-grey",
  decision: "bg-[#F4F4F4] text-ink border-mid-grey",
};

const handleClass = "!h-0 !w-0 !border-0 !bg-transparent !opacity-0";
// Side handles exist purely for clean loop-back routing and are not part of the visible BPMN shape.
const sideHandleClass = handleClass;

function SideHandles() {
  return (
    <>
      <Handle type="source" id="right-source" position={Position.Right} className={sideHandleClass} />
      <Handle type="target" id="right-target" position={Position.Right} className={sideHandleClass} />
      <Handle type="source" id="left-source" position={Position.Left} className={sideHandleClass} />
      <Handle type="target" id="left-target" position={Position.Left} className={sideHandleClass} />
    </>
  );
}

export function ProcessFlowNode({ data }: NodeProps<FlowNodeData>) {
  const { node, selected, dimmed, onSelect } = data;
  const shape = getShape(node);
  const { width, height } = getNodeDimensions(shape);

  const labelClasses = clsx(
    "relative z-20 mt-2 max-w-[150px] bg-white/95 px-1 text-center text-xs font-semibold leading-snug transition-colors",
    selected ? "text-york-red" : "text-ink",
  );

  if (shape === "gateway") {
    // BPMN exclusive gateway: diamond outline with a marker, external label below.
    const size = 68;
    // Rotating a square 45° makes its visual corners extend beyond its own
    // un-rotated bounding box by (size/2) * (√2 − 1) on the near sides, and
    // the far corner sits at (size/2) * (1 + √2) from the box's leading
    // edge. Handles must align with these true visual vertices; using the
    // default Top/Bottom/Left/Right positions (which sit at the *box*
    // edges) leaves a visible gap between the arrow tip and the diamond,
    // which is what made edges look disconnected from decision nodes.
    const overshoot = (size / 2) * (Math.SQRT2 - 1);
    const farSide = (size / 2) * (1 + Math.SQRT2);
    const diamondRadius = size / Math.SQRT2;
    const centerX = width / 2;
    return (
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        aria-pressed={selected}
        aria-label={`${node.fullTitle} (decision)`}
        className={clsx(
          "flex cursor-pointer flex-col items-center focus-visible:outline-none transition-opacity duration-200",
          dimmed && !selected && "opacity-25",
        )}
        style={{ width, height }}
      >
        <Handle type="target" position={Position.Top} className={handleClass} style={{ top: -overshoot }} />
        <span
          className={clsx(
            "relative z-20 flex items-center justify-center border-2 bg-[#F4F4F4] text-ink shadow-sm transition-all duration-200",
            selected ? "border-york-red ring-4 ring-york-red/30 scale-110 shadow-lg" : "border-mid-grey",
          )}
          style={{ width: size, height: size, transform: "rotate(45deg)" }}
        >
          <span
            className="flex items-center justify-center text-xl font-bold leading-none"
            style={{ transform: "rotate(-45deg)" }}
            aria-hidden="true"
          >
            {node.icon}
          </span>
        </span>
        <span className={labelClasses}>{node.shortLabel}</span>
        <Handle type="source" position={Position.Bottom} className={handleClass} style={{ bottom: height - farSide }} />
        <Handle
          type="source"
          id="right-source"
          position={Position.Right}
          className={sideHandleClass}
          style={{ top: size / 2, right: width - (centerX + diamondRadius) }}
        />
        <Handle
          type="target"
          id="right-target"
          position={Position.Right}
          className={sideHandleClass}
          style={{ top: size / 2, right: width - (centerX + diamondRadius) }}
        />
        <Handle
          type="source"
          id="left-source"
          position={Position.Left}
          className={sideHandleClass}
          style={{ top: size / 2, left: centerX - diamondRadius }}
        />
        <Handle
          type="target"
          id="left-target"
          position={Position.Left}
          className={sideHandleClass}
          style={{ top: size / 2, left: centerX - diamondRadius }}
        />
      </button>
    );
  }

  if (shape === "event-start" || shape === "event-end") {
    const size = 84;
    const isEnd = shape === "event-end";
    return (
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        aria-pressed={selected}
        aria-label={`${node.fullTitle} (${isEnd ? "end" : "start"} event)`}
        className={clsx(
          "flex cursor-pointer flex-col items-center focus-visible:outline-none transition-opacity duration-200",
          dimmed && !selected && "opacity-25",
        )}
        style={{ width, height }}
      >
        {isEnd ? (
          <Handle type="target" position={Position.Top} className={handleClass} />
        ) : (
          <Handle type="target" position={Position.Top} className={handleClass} style={{ opacity: 0 }} />
        )}
        <span
          className={clsx(
            "relative z-20 flex items-center justify-center rounded-full shadow-sm transition-all duration-200",
            isEnd ? "border-[4px] bg-[#F1F1F1] text-charcoal border-mid-grey" : "border-[3px] bg-york-red text-white border-york-red-dark",
            selected && "ring-4 ring-york-red/30 scale-110 shadow-lg",
            selected && isEnd && "border-york-red",
          )}
          style={{ width: size, height: size }}
        >
          <span aria-hidden="true" className="text-2xl leading-none">{node.icon}</span>
        </span>
        <span className={labelClasses}>{node.shortLabel}</span>
        {!isEnd && (
          <Handle
            type="source"
            position={Position.Bottom}
            className={handleClass}
            style={{ bottom: height - size }}
          />
        )}
      </button>
    );
  }

  // Task / activity rectangle (BPMN task shape: rounded rectangle).
  const borderWidth =
    node.category === "form" || node.category === "hero" || node.category === "production" ? "border-[3px]" : "border-2";
  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={selected}
      aria-label={node.fullTitle}
      className={clsx(
        "relative cursor-pointer rounded-xl px-4 py-3 text-left shadow-sm transition-all duration-200 focus-visible:outline-none",
        taskCategoryClasses[node.category],
        borderWidth,
        selected && "ring-4 ring-offset-2 ring-york-red scale-[1.04] shadow-lg z-10",
        dimmed && !selected && "opacity-25",
      )}
      style={{ width, height }}
    >
      <Handle type="target" position={Position.Top} className={handleClass} />
      <div className="relative z-20 flex items-start gap-2">
        <span aria-hidden="true" className="text-lg leading-none">{node.icon}</span>
        <span className="text-sm font-semibold leading-snug">{node.shortLabel}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className={handleClass} />
      <SideHandles />
    </button>
  );
}
