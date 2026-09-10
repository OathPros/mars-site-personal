import { Link } from "react-router-dom";
import type { ProcessNode } from "../data/process";
import { categoryMeta, nodeMap } from "../data/process";
import { LifecycleBadge } from "./LifecycleBadge";

export function NodeDetailDrawer({
  node,
  onClose,
  onNavigate,
}: {
  node: ProcessNode | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label={node.fullTitle}>
      <button
        className="absolute inset-0 bg-ink/40"
        aria-label="Close detail panel"
        onClick={onClose}
      />
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-light-grey bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-light-grey px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <LifecycleBadge stage={node.lifecycle} />
              <span className="text-xs font-medium uppercase tracking-wide text-mid-grey">
                {categoryMeta[node.category].label}
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-ink">
              <span aria-hidden="true" className="mr-2">{node.icon}</span>
              {node.fullTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 border border-light-grey p-2 text-mid-grey hover:border-york-red hover:text-york-red"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-8 px-6 py-6">
          <p className="text-lg leading-relaxed text-charcoal">{node.summary}</p>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">What this step means</h3>
            <p className="mt-2 leading-relaxed text-ink">{node.whatItMeans}</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">What you need to do</h3>
            <p className="mt-2 leading-relaxed text-ink">{node.whatYouNeedToDo}</p>
          </section>

          {node.involved && node.involved.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">Who's involved</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {node.involved.map((person) => (
                  <li key={person} className="border border-light-grey px-3 py-1 text-sm text-charcoal">
                    {person}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {node.bullets && node.bullets.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">Considerations</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
                {node.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          )}

          {node.requirementGroups && node.requirementGroups.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">Requirements</h3>
              <div className="mt-3 space-y-4">
                {node.requirementGroups.map((group) => (
                  <div key={group.id}>
                    <div className="text-sm font-semibold text-york-red-dark">{group.title}</div>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {node.outcomes && node.outcomes.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">Possible outcomes</h3>
              <div className="mt-3 space-y-2">
                {node.outcomes.map((outcome) => {
                  const target = outcome.targetId ? nodeMap[outcome.targetId] : undefined;
                  return (
                    <button
                      key={outcome.label}
                      onClick={() => target && onNavigate(target.id)}
                      disabled={!target}
                      className="flex w-full items-center justify-between border border-light-grey px-4 py-3 text-left text-sm transition-colors hover:border-york-red disabled:cursor-default disabled:opacity-60"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={
                            outcome.tone === "positive"
                              ? "text-york-red"
                              : outcome.tone === "negative"
                                ? "text-charcoal"
                                : "text-mid-grey"
                          }
                        >
                          ●
                        </span>
                        {outcome.label}
                      </span>
                      {target && <span className="text-mid-grey">→ {target.shortLabel}</span>}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {node.links && node.links.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-mid-grey">Resources</h3>
              <ul className="mt-2 space-y-2">
                {node.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link to={link.href} className="text-sm font-medium text-york-red underline underline-offset-2">
                        {link.label} →
                      </Link>
                    ) : (
                      <span className="text-sm text-mid-grey">
                        {link.label}: <em>{link.href}</em>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
