import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Notice, PageHero } from "../components/Layout";
import { SolutionForm } from "../components/SolutionForm";
import { demoSolutions } from "../data/demoSolutions";
import { repository } from "../data/repository";
import { blankSolution, lifecycleStages, reviewStates, type SolutionRecord } from "../domain/model";

export function InventoryPage() {
  const [records, setRecords] = useState<SolutionRecord[]>([]);
  const [query, setQuery] = useState("");
  const [lifecycle, setLifecycle] = useState("");
  const [review, setReview] = useState("");
  const [platform, setPlatform] = useState("");
  const [editing, setEditing] = useState<SolutionRecord | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [status, setStatus] = useState("Loading browser-local records…");

  const load = () => repository.listSolutions().then(items => { setRecords([...demoSolutions, ...items]); setStatus(""); }).catch(() => setStatus("Could not load browser-local records."));
  useEffect(() => { void load(); }, []);
  const platforms = useMemo(() => [...new Set(records.map(record => record.platform))].sort(), [records]);
  const shown = useMemo(() => records.filter(record => {
    const searchable = [record.name, record.summary, record.problem, record.unit, record.platform, record.intendedUsers].join(" ").toLowerCase();
    return (!lifecycle || record.lifecycleStage === lifecycle) && (!review || record.reviewState === review) && (!platform || record.platform === platform) && searchable.includes(query.toLowerCase());
  }), [records, query, lifecycle, review, platform]);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    try {
      await repository.saveSolution({ ...editing, relatedWork: Array.isArray(editing.relatedWork) ? editing.relatedWork : String(editing.relatedWork).split(",").map(item => item.trim()).filter(Boolean) });
      setStatus("Draft saved in this browser."); setEditing(null); await load();
    } catch { setStatus("Save failed. Check browser storage and try again."); }
  };
  const clearFilters = () => { setQuery(""); setLifecycle(""); setReview(""); setPlatform(""); };

  return <><PageHero eyebrow="Search, reuse and connect" title="Find work before you build."><p>Explore York-developed AI solutions across platforms, connect related work and maintain one shared prototype record.</p></PageHero><section className="container-page section inventory-page"><div className="demo-label"><strong>Demonstration data</strong> is illustrative and is not authoritative York information.</div><Notice/><div className="inventory-toolbar"><div className="inventory-search"><label htmlFor="inventory-search">Search solutions</label><input id="inventory-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try a need, audience, unit or platform"/></div><div className="filter-row"><label>Lifecycle<select value={lifecycle} onChange={event => setLifecycle(event.target.value)}><option value="">All</option>{lifecycleStages.map(item => <option key={item}>{item}</option>)}</select></label><label>Review state<select value={review} onChange={event => setReview(event.target.value)}><option value="">All</option>{reviewStates.map(item => <option key={item}>{item}</option>)}</select></label><label>Platform<select value={platform} onChange={event => setPlatform(event.target.value)}><option value="">All</option>{platforms.map(item => <option key={item}>{item}</option>)}</select></label><button className="text-button" onClick={clearFilters}>Clear filters</button></div><div className="toolbar-actions"><p aria-live="polite"><strong>{shown.length}</strong> {shown.length === 1 ? "solution" : "solutions"}</p><button className="button primary" onClick={() => setEditing(blankSolution())}>Create prototype record</button><button className="button secondary" onClick={async () => { if (confirm("Delete your browser-local prototype records? Demonstration examples will remain.")) { await repository.resetUserData(); await load(); } }}>Reset local data</button></div></div><p role="status" aria-live="polite">{status}</p>{editing && <div className="editor"><div className="section-heading"><p className="eyebrow">Browser-local editor</p><h2>{editing.name ? "Update solution" : "Create a solution"}</h2><button className="text-button" onClick={() => setEditing(null)}>Close editor</button></div><SolutionForm record={editing} onChange={setEditing} onSave={save}/></div>}<div className="inventory-grid">{shown.map(record => { const isOpen = expanded === record.id; return <article key={record.id} className={isOpen ? "expanded" : ""}><div className="record-meta"><span className="source">{record.source === "demo" ? "Demo record" : "Browser-local record"}</span><span>{record.platform}</span></div><h2>{record.name}</h2><p>{record.summary}</p><dl><div><dt>Lifecycle</dt><dd>{record.lifecycleStage}</dd></div><div><dt>Review</dt><dd>{record.reviewState}</dd></div><div><dt>Route</dt><dd>{record.governanceRoute}</dd></div><div><dt>Disposition</dt><dd>{record.disposition}</dd></div><div><dt>Service</dt><dd>{record.serviceState}</dd></div></dl>{isOpen && <div className="record-detail"><h3>Need</h3><p>{record.problem}</p><h3>Intended outcome</h3><p>{record.intendedOutcome}</p><h3>Owner and next action</h3><p>{record.owner} · {record.nextAction}</p>{record.relatedWork.length > 0 && <p><strong>Related:</strong> {record.relatedWork.map(id => records.find(item => item.id === id)?.name || id).join(", ")}</p>}</div>}<div className="record-actions"><button className="text-button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : record.id)}>{isOpen ? "Hide details ↑" : "View details ↓"}</button>{record.source === "user" && <button className="text-button" onClick={() => setEditing(record)}>Update record →</button>}</div></article>; })}</div>{!status && shown.length === 0 && <div className="empty"><h2>No matching solutions</h2><p>Try broader keywords or clear one of the filters. If the need is distinct, create a prototype record.</p><button className="button secondary" onClick={clearFilters}>Clear all filters</button></div>}</section></>;
}
