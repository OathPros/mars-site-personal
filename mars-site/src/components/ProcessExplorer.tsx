import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { phaseLabels, processSteps, relatedStepIds, type ProcessPhase } from "../domain/process";

export function ProcessExplorer({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState(compact ? "reuse" : "need");
  const [phase, setPhase] = useState<ProcessPhase | "all">("all");
  const detailRef = useRef<HTMLElement>(null);
  const selected = processSteps.find(step => step.id === selectedId) ?? processSteps[0];
  const pathway = useMemo(() => relatedStepIds(selectedId), [selectedId]);
  const visible = useMemo(() => phase === "all" ? processSteps : processSteps.filter(step => step.phase === phase), [phase]);

  const choose = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 760px)").matches) requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
  };

  return <div className={compact ? "process-explorer compact" : "process-explorer"}>
    {!compact && <div className="phase-tabs" role="group" aria-label="Filter process by stage">
      <button className={phase === "all" ? "selected" : ""} onClick={() => { setPhase("all"); setSelectedId("need"); }}>Whole process</button>
      {(Object.entries(phaseLabels) as [ProcessPhase, string][]).map(([id, label]) => <button key={id} className={phase === id ? "selected" : ""} onClick={() => { setPhase(id); setSelectedId(processSteps.find(step => step.phase === id)?.id ?? "need"); }}>{label}</button>)}
    </div>}
    <div className="process-workspace">
      <div className="process-track" aria-label="Interactive York AI development process">
        {visible.map((step, index) => <div className={`process-item ${step.optional ? "branch" : ""}`} key={step.id}>
          <button aria-pressed={step.id === selectedId} className={`${step.id === selectedId ? "selected" : ""} ${pathway.has(step.id) ? "travelled" : ""} kind-${step.kind ?? "step"}`} onClick={() => choose(step.id)}>
            <span className="step-number">{step.optional ? "Optional route" : `Step ${step.number}`}</span><strong>{step.title}</strong><small>{step.summary}</small>
          </button>
          {index < visible.length - 1 && <span className="connector" aria-hidden="true">→</span>}
        </div>)}
      </div>
      <article className="process-detail" ref={detailRef} tabIndex={-1} aria-live="polite">
        <p className="eyebrow">{phaseLabels[selected.phase]} · {selected.optional ? "Optional route" : `Step ${selected.number}`}</p>
        <h3>{selected.title}</h3><p className="detail-lede">{selected.detail}</p>
        <h4>What to do</h4><ul>{selected.actions.map(action => <li key={action}>{action}</li>)}</ul>
        <div className="detail-actions">{selected.links.map(link => <Link className="button primary" to={link.href} key={link.href}>{link.label} →</Link>)}</div>
        <p className="detail-position">{processSteps.indexOf(selected) + 1} of {processSteps.length} process points</p>
      </article>
    </div>
  </div>;
}
