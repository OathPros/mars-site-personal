import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Notice, PageHero } from "../components/Layout";
import { SolutionForm } from "../components/SolutionForm";
import { repository } from "../data/repository";
import { blankSolution } from "../domain/model";
import { download, markdownDocx, solutionMarkdown } from "../lib/exports";

const steps = ["Need and value", "Path and ownership", "Risk and change", "Review and save"];

export function IdeationGuidePage() {
  const [record, setRecord] = useState(blankSolution());
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const save = async (event: FormEvent) => {
    event.preventDefault();
    try { const saved = await repository.saveSolution(record); setRecord(saved); setMessage("Draft saved locally and available in the prototype inventory."); setShowSummary(true); }
    catch { setMessage("Draft could not be saved. Check browser storage and try again."); }
  };
  const markdown = solutionMarkdown(record);
  const canContinue = step > 0 || Boolean(record.name && record.summary && record.problem && record.intendedOutcome);

  return <><PageHero eyebrow="Focused planning" title="Shape the idea, once."><p>Four focused sections build one solution record you can refine, reuse and export.</p></PageHero><section className="container-page section guide-layout"><aside className="guide-sidebar"><p className="eyebrow">Your progress</p><ol>{steps.map((label, index) => <li className={index === step ? "current" : index < step ? "complete" : ""} key={label}><button onClick={() => setStep(index)} aria-current={index === step ? "step" : undefined}><span>{index < step ? "✓" : index + 1}</span>{label}</button></li>)}</ol><Notice/><Link to="/inventory">Search the inventory first →</Link></aside><div className="guide-main"><div className="guide-step-heading"><span>Section {step + 1} of {steps.length}</span><h2>{steps[step]}</h2></div><SolutionForm record={record} onChange={setRecord} onSave={save} activeStep={step}/><div className="guide-controls">{step > 0 && <button className="button secondary" onClick={() => setStep(step - 1)}>← Back</button>}<span/>{step < 3 && <button className="button primary" disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue →</button>}</div><p role="status" aria-live="polite">{message}</p>{showSummary && <section className="summary"><div className="section-heading"><p className="eyebrow">Local output</p><h2>Solution summary</h2></div><pre>{markdown}</pre><div className="actions"><button className="button secondary" onClick={() => download(new Blob([markdown], { type: "text/markdown" }), "solution-summary.md")}>Export Markdown</button><button className="button secondary" onClick={async () => download(await markdownDocx(markdown), "solution-summary.docx")}>Export Word (.docx)</button><Link className="button primary" to="/inventory">View the inventory</Link></div></section>}</div></section></>;
}
