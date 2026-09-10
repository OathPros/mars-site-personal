import { useState } from "react";
import { processNodes } from "../data/process";
import { NodeDetailDrawer } from "./NodeDetailDrawer";
import { LifecycleBadge } from "./LifecycleBadge";

/**
 * Simplified mobile experience: a sequential, scrollable list of process
 * steps (main spine + branches in order) rather than a dense pannable
 * canvas. Tapping a step opens the same detail drawer used by the full map.
 */
export function MobileProcessList({ initialSelected }: { initialSelected?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelected ?? null);

  return (
    <div className="divide-y divide-light-grey border border-light-grey bg-white">
      {processNodes.map((node, i) => (
        <button
          key={node.id}
          onClick={() => setSelectedId(node.id)}
          className="flex w-full items-center gap-4 px-4 py-4 text-left hover:bg-bg-grey"
        >
          <span className="w-6 shrink-0 text-xs font-semibold text-mid-grey">{i + 1}</span>
          <span aria-hidden="true" className="text-xl">{node.icon}</span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink">{node.shortLabel}</span>
            <span className="mt-0.5 block text-xs text-mid-grey">{node.summary}</span>
          </span>
          <LifecycleBadge stage={node.lifecycle} className="!text-[10px] !px-2 !py-0.5" />
        </button>
      ))}

      <NodeDetailDrawer
        node={selectedId ? processNodes.find((n) => n.id === selectedId) ?? null : null}
        onClose={() => setSelectedId(null)}
        onNavigate={(id) => setSelectedId(id)}
      />
    </div>
  );
}
