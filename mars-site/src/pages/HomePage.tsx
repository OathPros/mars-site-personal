import { Link, useNavigate } from "react-router-dom";
import { entryPoints } from "../data/process";
import { ProcessMapResponsive } from "../components/ProcessMapResponsive";

export function HomePage() {
  const navigate = useNavigate();

  const jumpToProcess = (targetId?: string) => {
    const nextSearch = targetId ? `?node=${encodeURIComponent(targetId)}` : "";
    navigate({ pathname: "/", search: nextSearch });
    window.setTimeout(() => {
      const map = document.getElementById("process-map");
      map?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  return (
    <div>
      <section className="container-page pb-16 pt-16 sm:pt-24">
        <div className="max-w-4xl">
          <h1 className="editorial-heading mt-4 text-6xl leading-[0.95] sm:text-8xl">
            MARS
          </h1>
          <h2 className="editorial-heading mt-2 text-3xl text-charcoal sm:text-5xl">
            Prototype to Production
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/find-my-path"
              className="bg-york-red px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-york-red-dark"
            >
              Start with an idea →
            </Link>
            <button
              type="button"
              onClick={() => jumpToProcess()}
              className="border border-ink px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-york-red hover:text-york-red"
            >
              Explore the process
            </button>
          </div>
        </div>
      </section>

      <section className="rule container-page py-14">
        <h2 className="editorial-heading text-2xl sm:text-3xl">Where are you now?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entryPoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => jumpToProcess(ep.targetId)}
              className="group flex flex-col items-start border border-light-grey bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-york-red hover:shadow-md"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-mid-grey group-hover:text-york-red">
                Step {String(entryPoints.indexOf(ep) + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 text-lg font-semibold text-ink">{ep.label}</span>
              <span className="mt-2 text-sm text-mid-grey">{ep.description}</span>
              <span className="mt-4 text-sm font-semibold text-york-red">View in process →</span>
            </button>
          ))}
        </div>
      </section>

      <section id="process" className="container-page py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="editorial-heading text-2xl sm:text-3xl">Our process to production</h2>
            <p className="mt-2 max-w-2xl text-mid-grey">
              Pan, zoom, and click any step. Selecting a node highlights its full upstream and downstream pathway
              and opens a detail panel with what it means, what to do, and who's involved.
            </p>
          </div>
        </div>
        <div id="process-map" className="border border-light-grey bg-white">
          <ProcessMapResponsive height="75vh" compact />
        </div>
      </section>

    </div>
  );
}
