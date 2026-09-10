import { useMemo, useState } from "react";
import { pluginRecords, type PluginRecord } from "../data/inventory";
import { lifecycleStages, type LifecycleStage } from "../data/process";
import { LifecycleBadge } from "../components/LifecycleBadge";

function isLikelyUrl(value?: string) {
  return !!value && /^https?:\/\//i.test(value);
}

/** Card view of a single plugin record: mirrors the "AI Inventory" mockup's `.card` layout. */
function PluginCard({ plugin, onSelect }: { plugin: PluginRecord; onSelect: (id: string) => void }) {
  return (
    <article className="flex min-h-[300px] flex-col gap-4 rounded-3xl border border-light-grey bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,.04)] transition-all duration-200 hover:-translate-y-1 hover:border-york-red/35 hover:shadow-[0_22px_40px_rgba(0,0,0,.09)]">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-ink">{plugin.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal">{plugin.problem}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <LifecycleBadge stage={plugin.lifecycle} variant="pill" />
        <span className="inline-flex items-center rounded-full border border-light-grey bg-bg-grey px-2.5 py-1 text-xs font-semibold text-charcoal">
          {plugin.category ?? plugin.unit}
        </span>
      </div>

      <dl className="mt-auto grid gap-1.5 text-sm">
        <div className="flex gap-2 text-mid-grey">
          <dt className="min-w-[64px] font-semibold text-charcoal">Owner</dt>
          <dd>{plugin.owner}</dd>
        </div>
        <div className="flex gap-2 text-mid-grey">
          <dt className="min-w-[64px] font-semibold text-charcoal">Unit</dt>
          <dd>{plugin.unit}</dd>
        </div>
        {plugin.committeeOutcome && (
          <div className="flex gap-2 text-mid-grey">
            <dt className="min-w-[64px] font-semibold text-charcoal">Outcome</dt>
            <dd className="line-clamp-1">{plugin.committeeOutcome}</dd>
          </div>
        )}
      </dl>

      <button
        onClick={() => onSelect(plugin.id)}
        className="mt-1 w-full rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
      >
        Learn more
      </button>
    </article>
  );
}

function DetailField({ label, value, wide = false }: { label: string; value?: string; wide?: boolean }) {
  if (!value) return null;
  return (
    <div className={`rounded-[20px] border border-light-grey bg-white p-5 ${wide ? "sm:col-span-2" : ""}`}>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">{label}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal">{value}</p>
    </div>
  );
}

/** Detail view for a single plugin: mirrors the mockup's `.detail-hero` / `.resources-section`. */
function PluginDetail({ plugin, onBack }: { plugin: PluginRecord; onBack: () => void }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center rounded-full border border-light-grey bg-white px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-york-red"
      >
        ← Back to inventory
      </button>

      <div className="relative mt-6 overflow-hidden rounded-[30px] border border-light-grey bg-white p-6 shadow-[0_18px_50px_rgba(10,10,10,.10)] sm:p-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-york-red">Plugin inventory detail</p>
            <h1 className="editorial-heading mt-2 max-w-2xl text-3xl sm:text-5xl">{plugin.name}</h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-charcoal">{plugin.problem}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <LifecycleBadge stage={plugin.lifecycle} variant="pill" />
            <span className="inline-flex items-center rounded-full border border-light-grey bg-bg-grey px-2.5 py-1 text-xs font-semibold text-charcoal">
              {plugin.category ?? plugin.unit}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <DetailField label="Owner" value={plugin.owner} />
          <DetailField label="Unit" value={plugin.unit} />
          <DetailField label="Category" value={plugin.category} />
          <DetailField label="Contact" value={plugin.contact} />
          <DetailField label="Functional owner" value={plugin.functionalOwner} />
          <DetailField label="Technical owner" value={plugin.technicalOwner} />
          <DetailField label="Committee outcome" value={plugin.committeeOutcome} />
          <DetailField label="Related IPPM initiative" value={plugin.relatedInitiative} />
          <DetailField label="Change requests" value={plugin.relatedChangeRequests?.join(", ")} />
          <DetailField label="Production readiness" value={plugin.productionReadiness} />
          <DetailField label="Production review" value={plugin.productionReview} />
          <DetailField label="Production record" value={plugin.productionRecord} />
          <DetailField label="Audience" value={plugin.audience?.join(", ")} />
          <DetailField label="Description" value={plugin.description} wide />
          <DetailField label="How it works" value={plugin.how} wide />
        </div>

        {(plugin.repository || (plugin.resources && plugin.resources.length > 0)) && (
          <div className="mt-8 border-t border-light-grey pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">Resources</h2>
            <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
              {plugin.repository && (
                <article className="flex flex-col gap-3 rounded-[20px] border border-light-grey bg-white p-4.5">
                  <span className="inline-flex w-fit items-center rounded-full bg-bg-grey px-2.5 py-1 text-xs font-semibold text-charcoal">
                    Repository
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-ink">Source code</h3>
                  {isLikelyUrl(plugin.repository) ? (
                    <a
                      href={plugin.repository}
                      target="_blank"
                      rel="noopener"
                      className="mt-auto w-fit rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
                    >
                      Open repository
                    </a>
                  ) : (
                    <>
                      <p className="text-sm text-mid-grey">{plugin.repository}</p>
                      <span className="mt-auto w-fit cursor-not-allowed rounded-full bg-bg-grey px-4 py-2 text-sm font-bold text-mid-grey">
                        Not attached
                      </span>
                    </>
                  )}
                </article>
              )}
              {plugin.resources?.map((resource, i) => (
                <article
                  key={`${resource.title}-${i}`}
                  className="flex flex-col gap-3 rounded-[20px] border border-light-grey bg-white p-4.5"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-bg-grey px-2.5 py-1 text-xs font-semibold text-charcoal">
                    {resource.type}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-ink">{resource.title}</h3>
                  <p className="text-sm text-mid-grey">{resource.description}</p>
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target={resource.external ? "_blank" : undefined}
                      rel={resource.external ? "noopener" : undefined}
                      download={resource.download}
                      className="mt-auto w-fit rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
                    >
                      {resource.action ?? "Open"}
                    </a>
                  ) : (
                    <span className="mt-auto w-fit cursor-not-allowed rounded-full bg-bg-grey px-4 py-2 text-sm font-bold text-mid-grey">
                      {resource.action ?? "Not attached"}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function InventoryPage() {
  const [query, setQuery] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [stageFilter, setStageFilter] = useState<LifecycleStage | "">("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const units = useMemo(() => [...new Set(pluginRecords.map((p) => p.unit))].sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pluginRecords.filter((p) => {
      const matchesStage = !stageFilter || p.lifecycle === stageFilter;
      const matchesUnit = !unitFilter || p.unit === unitFilter;
      const matchesQuery =
        !q ||
        [p.name, p.problem, p.description, p.owner, p.unit, p.category, p.contact, p.how, ...(p.audience ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesStage && matchesUnit && matchesQuery;
    });
  }, [query, unitFilter, stageFilter]);

  const selected = selectedId ? pluginRecords.find((p) => p.id === selectedId) ?? null : null;

  if (selected) {
    return (
      <div className="container-page py-14">
        <PluginDetail plugin={selected} onBack={() => setSelectedId(null)} />
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      {/* Hero card, styled after the mockup's `.hero-card` */}
      <div className="relative overflow-hidden rounded-[30px] border border-light-grey bg-white p-6 shadow-[0_18px_50px_rgba(10,10,10,.10)] sm:p-10">
        <div className="pointer-events-none absolute -right-32 -top-32 h-88 w-88 rounded-full bg-york-red/[0.08]" />
        <p className="relative text-xs font-extrabold uppercase tracking-widest text-york-red">Reference</p>
        <h1 className="editorial-heading relative mt-2 max-w-3xl text-4xl sm:text-5xl">MARS Plugin Inventory</h1>
        <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-charcoal">
          A single record follows each plugin from idea through production; the same record is progressively
          enriched rather than recreated at each governance stage.
        </p>
      </div>

      {/* Search + unit filter toolbar */}
      <div className="mt-8 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, problem, owner, or unit…"
          className="h-14 min-w-[220px] flex-1 rounded-full border border-light-grey bg-white px-5 text-sm outline-none focus:border-york-red"
          aria-label="Search plugin inventory"
        />
        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          aria-label="Filter by unit"
          className="h-14 min-w-[220px] rounded-full border border-light-grey bg-white px-5 text-sm font-semibold text-charcoal outline-none focus:border-york-red"
        >
          <option value="">All units</option>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Pipeline stage filter, styled after the mockup's `.pipeline-filter` / `.stage-node` */}
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-3xl border border-light-grey bg-white/70 p-3.5 shadow-[0_8px_20px_rgba(0,0,0,.035)]">
        <span className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-mid-grey">
          Pipeline stage
        </span>
        <button
          onClick={() => setStageFilter("")}
          className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
            stageFilter === "" ? "border-york-red bg-york-red text-white" : "border-light-grey bg-white text-charcoal"
          }`}
        >
          All
        </button>
        <div className="flex flex-wrap items-center gap-5 overflow-x-auto">
          {lifecycleStages.map((s, i) => (
            <div key={s.id} className="flex items-center gap-5">
              <button
                onClick={() => setStageFilter(s.id)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
                  stageFilter === s.id ? "border-york-red bg-york-red text-white" : "border-light-grey bg-white text-charcoal"
                }`}
              >
                {s.label}
              </button>
              {i < lifecycleStages.length - 1 && <span className="text-mid-grey" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-mid-grey">
        {filtered.length} of {pluginRecords.length} plugins
      </p>

      {/* Card grid, styled after the mockup's `.cards` / `.card` */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PluginCard key={p.id} plugin={p} onSelect={setSelectedId} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-light-grey bg-white p-10 text-center text-mid-grey">
          No plugins match your search.
        </div>
      )}
    </div>
  );
}
