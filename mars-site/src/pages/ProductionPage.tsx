import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { nodeMap } from "../data/process";

const STORAGE_KEY = "mars-production-checklist-v1";

export function ProductionPage() {
  const requestNode = nodeMap["V"];
  const groups = requestNode.requirementGroups ?? [];
  const allItems = useMemo(
    () => groups.flatMap((g) => g.items.map((item) => `${g.id}::${item}`)),
    [groups],
  );

  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const checkedCount = allItems.filter((k) => checked[k]).length;
  const total = allItems.length;
  const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }));
  const reset = () => setChecked({});

  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-york-red">Production</p>
      <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">Production Readiness Checklist</h1>
      <p className="mt-4 max-w-2xl text-lg text-mid-grey">
        Based on the "Request to Move to Production" requirements. Track your progress across ownership,
        readiness, governance, and implementation.
      </p>
      <Link to={{ pathname: "/", search: "?node=V" }} className="mt-3 inline-block text-sm font-semibold text-york-red underline underline-offset-4">
        View this step in the process map →
      </Link>
      <div className="mt-3">
        <Link to="/production/guide" className="text-sm font-semibold text-york-red underline underline-offset-4">
          Prefer a guided walkthrough? Try the Production Readiness Guide →
        </Link>
      </div>

      <div className="sticky top-16 z-10 mt-8 border border-light-grey bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-ink">
              {checkedCount} / {total} requirements ready
            </div>
            <div className="text-sm text-mid-grey">{pct}% complete</div>
          </div>
          <button
            onClick={reset}
            className="border border-light-grey px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mid-grey hover:border-york-red hover:text-york-red"
          >
            Reset checklist
          </button>
        </div>
        <div className="mt-4 h-2.5 w-full bg-[#F1F1F1]" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-york-red transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {groups.map((group) => {
          const groupItems = group.items.map((item) => `${group.id}::${item}`);
          const groupChecked = groupItems.filter((k) => checked[k]).length;
          return (
            <section key={group.id} className="border border-light-grey bg-white p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-semibold text-ink">{group.title}</h2>
                <span className="text-sm text-mid-grey">{groupChecked}/{group.items.length}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => {
                  const key = `${group.id}::${item}`;
                  const isChecked = !!checked[key];
                  return (
                    <li key={key}>
                      <label className="flex cursor-pointer items-start gap-3 border border-light-grey px-4 py-3 hover:border-york-red">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(key)}
                          className="mt-0.5 h-4 w-4 accent-[#E31837]"
                        />
                        <span className={isChecked ? "text-mid-grey line-through" : "text-ink"}>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
