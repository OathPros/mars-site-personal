import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { GuideSection } from "../data/guides";

interface FlatField {
  sectionId: string;
  sectionTitle: string;
  sectionIntro?: string;
  fieldIndexInSection: number;
  fieldCountInSection: number;
  id: string;
  label: string;
  coach: string;
  placeholder?: string;
  short?: boolean;
  optional?: boolean;
}

function flatten(sections: GuideSection[]): FlatField[] {
  return sections.flatMap((section) =>
    section.fields.map((field, i) => ({
      sectionId: section.id,
      sectionTitle: section.title,
      sectionIntro: i === 0 ? section.intro : undefined,
      fieldIndexInSection: i,
      fieldCountInSection: section.fields.length,
      ...field,
    })),
  );
}

interface GuideAction {
  label: string;
  help?: string;
  /** Renders as the primary (filled red) button when true; otherwise an outlined button. */
  primary?: boolean;
  onClick: (answers: Record<string, string>) => void | Promise<void>;
}

interface GuidedFormProps {
  storageKey: string;
  eyebrow: string;
  title: string;
  intro: string;
  backLink: { label: string; href: string };
  sections: GuideSection[];
  /** Actions offered at the review step once every field is answerable, e.g. one per export format. Mark exactly one `primary`. */
  completeActions: GuideAction[];
  /** Lets the user export a snapshot of their answers at any step, not just once every field is filled in. One button per export format. */
  quickExportHelp?: string;
  quickExports?: { label: string; onExport: (answers: Record<string, string>) => void | Promise<void> }[];
}

export function GuidedForm({
  storageKey,
  eyebrow,
  title,
  intro,
  backLink,
  sections,
  completeActions,
  quickExportHelp,
  quickExports,
}: GuidedFormProps) {
  const fields = useMemo(() => flatten(sections), [sections]);
  const total = fields.length;

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(`${storageKey}-answers`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [step, setStep] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(`${storageKey}-step`);
      const parsed = raw ? Number(raw) : 0;
      return Number.isFinite(parsed) ? Math.min(parsed, total) : 0;
    } catch {
      return 0;
    }
  });
  const [done, setDone] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [quickExportBusy, setQuickExportBusy] = useState<number | null>(null);
  const [completeActionBusy, setCompleteActionBusy] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(`${storageKey}-answers`, JSON.stringify(answers));
  }, [answers, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}-step`, String(step));
  }, [step, storageKey]);

  const answeredCount = fields.filter((f) => answers[f.id]?.trim()).length;
  const pct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  const isReview = step >= total;
  const current = !isReview ? fields[step] : null;
  const currentValue = current ? answers[current.id] ?? "" : "";
  const canAdvance = !current || current.optional || currentValue.trim().length > 0;

  const setValue = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setLastSavedAt(new Date());
  };

  const goNext = () => setStep((s) => Math.min(s + 1, total));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const reset = () => {
    const hasAnswers = Object.values(answers).some((v) => v?.trim());
    if (hasAnswers && !window.confirm("This clears everything you've entered so far. Are you sure you want to start over?")) {
      return;
    }
    setAnswers({});
    setStep(0);
    setDone(false);
    setLastSavedAt(null);
    localStorage.removeItem(`${storageKey}-answers`);
    localStorage.removeItem(`${storageKey}-step`);
  };

  const handleQuickExport = async (index: number, exportItem: NonNullable<GuidedFormProps["quickExports"]>[number]) => {
    setQuickExportBusy(index);
    try {
      await exportItem.onExport(answers);
    } finally {
      setQuickExportBusy(null);
    }
  };

  const handleCompleteAction = async (index: number, action: GuideAction) => {
    setCompleteActionBusy(index);
    try {
      await action.onClick(answers);
      setDone(true);
    } finally {
      setCompleteActionBusy(null);
    }
  };

  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-york-red">{eyebrow}</p>
      <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-mid-grey">{intro}</p>
      <Link to={backLink.href} className="mt-3 inline-block text-sm font-semibold text-york-red underline underline-offset-4">
        {backLink.label} →
      </Link>

      <div className="sticky top-16 z-10 mt-8 border border-light-grey bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-ink">
              {answeredCount} / {total} answered
            </div>
            <div className="text-sm text-mid-grey">
              {pct}% complete
              {lastSavedAt && (
                <span className="ml-2 text-mid-grey/80">
                  · Autosaved to this browser at {lastSavedAt.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {quickExports?.map((exportItem, i) => (
              <button
                key={exportItem.label}
                onClick={() => handleQuickExport(i, exportItem)}
                disabled={quickExportBusy === i}
                className="border border-light-grey px-4 py-2 text-xs font-semibold uppercase tracking-wide text-charcoal hover:border-york-red hover:text-york-red disabled:cursor-not-allowed disabled:opacity-60"
              >
                {quickExportBusy === i ? "Exporting…" : exportItem.label}
              </button>
            ))}
            <button
              onClick={reset}
              className="border border-light-grey px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mid-grey hover:border-york-red hover:text-york-red"
            >
              Start over
            </button>
          </div>
        </div>
        {quickExportHelp && quickExports && quickExports.length > 0 && (
          <p className="mt-2 text-xs text-mid-grey">{quickExportHelp}</p>
        )}
        <div className="mt-4 h-2.5 w-full bg-[#F1F1F1]" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-york-red transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {!isReview && current && (
        <div className="mt-10 max-w-2xl border border-light-grey bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-mid-grey">
            {current.sectionTitle} · Step {step + 1} of {total}
          </p>
          {current.sectionIntro && (
            <p className="mt-2 text-sm italic text-mid-grey">{current.sectionIntro}</p>
          )}
          <h2 className="mt-4 text-2xl font-semibold text-ink">
            {current.label}
            {current.optional && <span className="ml-2 text-sm font-normal text-mid-grey">(optional)</span>}
          </h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal">{current.coach}</p>

          {current.short ? (
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setValue(current.id, e.target.value)}
              placeholder={current.placeholder}
              className="mt-5 w-full border border-light-grey px-4 py-3 text-sm outline-none focus:border-york-red"
              autoFocus
            />
          ) : (
            <textarea
              value={currentValue}
              onChange={(e) => setValue(current.id, e.target.value)}
              placeholder={current.placeholder}
              rows={5}
              className="mt-5 w-full border border-light-grey px-4 py-3 text-sm outline-none focus:border-york-red"
              autoFocus
            />
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="border border-light-grey px-5 py-2.5 text-sm font-bold text-charcoal disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              onClick={goNext}
              disabled={!canAdvance}
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === total - 1 ? "Review answers" : "Next"} →
            </button>
          </div>
        </div>
      )}

      {isReview && (
        <div className="mt-10 max-w-3xl">
          <div className="border border-light-grey bg-white p-8">
            <h2 className="text-2xl font-semibold text-ink">Review your answers</h2>
            <p className="mt-2 text-sm text-mid-grey">
              Check everything below before generating your file. You can go back and edit any answer.
            </p>

            <div className="mt-6 space-y-6">
              {sections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-york-red">{section.title}</h3>
                  <dl className="mt-3 space-y-3">
                    {section.fields.map((field) => (
                      <div key={field.id} className="border-b border-light-grey pb-3">
                        <dt className="text-sm font-semibold text-ink">{field.label}</dt>
                        <dd className="mt-1 whitespace-pre-wrap text-sm text-charcoal">
                          {answers[field.id]?.trim() || <span className="italic text-mid-grey">Not answered</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={goBack}
                className="border border-light-grey px-5 py-2.5 text-sm font-bold text-charcoal"
              >
                ← Back to editing
              </button>
              <div className="flex flex-wrap items-center gap-3">
                {completeActions
                  .filter((a) => !a.primary)
                  .map((action) => {
                    const i = completeActions.indexOf(action);
                    return (
                      <button
                        key={action.label}
                        onClick={() => handleCompleteAction(i, action)}
                        disabled={completeActionBusy === i}
                        className="rounded-full border border-york-red px-6 py-2.5 text-sm font-bold text-york-red transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {completeActionBusy === i ? "Generating…" : action.label}
                      </button>
                    );
                  })}
                {completeActions
                  .filter((a) => a.primary)
                  .map((action) => {
                    const i = completeActions.indexOf(action);
                    return (
                      <button
                        key={action.label}
                        onClick={() => handleCompleteAction(i, action)}
                        disabled={completeActionBusy === i}
                        className="rounded-full bg-york-red px-6 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {completeActionBusy === i ? "Generating…" : action.label}
                      </button>
                    );
                  })}
              </div>
            </div>
            {completeActions.map((action) =>
              action.help ? (
                <p key={action.label} className="mt-3 text-sm text-mid-grey">
                  {action.help}
                </p>
              ) : null,
            )}

            {done && (
              <div className="mt-6 border-[3px] border-york-red bg-[#FFF4F5] p-5">
                <p className="font-semibold text-ink">Your file has been generated and downloaded.</p>
                <p className="mt-1 text-sm text-charcoal">
                  You can keep editing your answers and generate it again as many times as you like, in either format.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
