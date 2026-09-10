import { Link } from "react-router-dom";
import { nodeMap } from "../data/process";

export function CommitteePage() {
  const committeeNode = nodeMap["M"];
  const recommendationNode = nodeMap["N"];
  const stopOutcome = recommendationNode.outcomes?.find((o) => /stop|redirect/i.test(o.label));
  const enabledOutcome = recommendationNode.outcomes?.find((o) => /change request|operational/i.test(o.label));
  const formalOutcome = recommendationNode.outcomes?.find((o) => /ippm|formal/i.test(o.label));

  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-york-red">Governance</p>
      <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">AI Development Committee</h1>
      <p className="mt-4 max-w-2xl text-lg text-mid-grey">
        The committee meets weekly to evaluate demonstrated prototypes, working software, proposals, and
        consultation requests, and recommends one of three paths forward. Not every prototype makes it to
        production, and not every idea requires an IPPM project.
      </p>

      <div className="mt-6">
        <Link to={{ pathname: "/", search: "?node=M" }} className="text-sm font-semibold text-york-red underline underline-offset-4">
          View this step in the process map →
        </Link>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <Link
          to={stopOutcome?.targetId ? { pathname: "/", search: `?node=${encodeURIComponent(stopOutcome.targetId)}` } : "#"}
          className="border-2 border-york-red bg-[#FFF4F5] p-6 transition-shadow hover:shadow-md"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-york-red-dark">Stop / Redirect</div>
          <p className="mt-3 text-ink">
            The capability already exists, conflicts with another initiative, lacks sufficient value, or should be
            rescoped.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-charcoal">
            {nodeMap["O"].bullets?.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <span className="mt-4 inline-block text-sm font-semibold text-york-red">View →</span>
        </Link>
        <Link
          to={enabledOutcome?.targetId ? { pathname: "/", search: `?node=${encodeURIComponent(enabledOutcome.targetId)}` } : "#"}
          className="border-[3px] border-york-red bg-[#FFF4F5] p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-york-red-dark">Operationally Enabled</div>
          <p className="mt-3 text-ink">The prototype is valuable but only needs bounded operational work.</p>
          <p className="mt-2 text-sm font-semibold text-ink">Proceed through a regular Change Request.</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-charcoal">
            {nodeMap["P"].bullets?.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <span className="mt-4 inline-block text-sm font-semibold text-york-red">View →</span>
        </Link>
        <Link
          to={formalOutcome?.targetId ? { pathname: "/", search: `?node=${encodeURIComponent(formalOutcome.targetId)}` } : "#"}
          className="border-2 border-york-red bg-[#FFF4F5] p-6 transition-shadow hover:shadow-md"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-york-red-dark">Formal Initiative</div>
          <p className="mt-3 text-ink">The solution requires significant York resources, investment, coordination or governance.</p>
          <p className="mt-2 text-sm font-semibold text-ink">Proceed to IPPM.</p>
          <span className="mt-4 inline-block text-sm font-semibold text-york-red">View →</span>
        </Link>
      </section>

      <section className="mt-12 border border-light-grey bg-white p-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide text-mid-grey">What the committee considers</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {committeeNode.bullets?.map((b) => (
            <li key={b} className="flex items-start gap-2 text-ink">
              <span aria-hidden="true" className="mt-1 text-york-red">●</span>
              {b}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
