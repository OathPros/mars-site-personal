import { useState } from "react";
import { ProcessMapResponsive } from "../components/ProcessMapResponsive";
import { mermaidSource } from "../data/mermaidSource";

export function ProcessPage() {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-york-red">Full Process</p>
          <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">MARS Idea-to-Production Map</h1>
          <p className="mt-3 max-w-2xl text-mid-grey">
            The entire workflow, explorable at once. Use Fit / Reset to navigate, click any step to see details,
            and follow the highlighted pathway upstream and downstream from your selection.
          </p>
        </div>
        <button
          onClick={() => setShowSource((v) => !v)}
          className="whitespace-nowrap border border-light-grey px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mid-grey hover:border-york-red hover:text-york-red"
        >
          {showSource ? "Hide" : "View"} Mermaid source
        </button>
      </div>

      {showSource && (
        <pre className="mb-8 max-h-96 overflow-auto border border-light-grey bg-ink p-4 text-xs leading-relaxed text-white/90">
          {mermaidSource}
        </pre>
      )}

      <div className="border border-light-grey bg-white">
        <ProcessMapResponsive height="82vh" />
      </div>

      <p className="mt-4 text-xs text-mid-grey">
        Keyboard: Tab to a node, Enter/Space to select it. Node selection updates the URL for deep linking and
        sharing a specific step.
      </p>
    </div>
  );
}
