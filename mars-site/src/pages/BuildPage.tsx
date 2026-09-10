import { Link } from "react-router-dom";

const steps = [
  { title: "Start with a problem", detail: "Name the problem, workflow gap, or opportunity before deciding what to build." },
  { title: "Check the AI Inventory", detail: "See whether the problem is already solved or whether someone is already working on a related solution.", link: { label: "Browse inventory", href: "/inventory" } },
  { title: "Create a new solution", detail: "If the need is distinct, move forward with a new MARS prototype." },
  { title: "Download / install MARS", detail: "Follow the setup guide for your device or workspace." },
  { title: "Complete required MARS training", detail: "Training establishes the guardrails that let you prototype without a governance gate." },
  { title: "Create a new plugin", detail: "Register your plugin's identity in MARS with a name and problem statement." },
  { title: "Build and vibe-code within normal MARS prototype guardrails", detail: "Iterate freely. Loop here as many times as you need." },
];

export function BuildPage() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-york-red">Getting Started</p>
      <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">Build with MARS</h1>
      <p className="mt-4 max-w-2xl text-lg text-mid-grey">
        You're encouraged to experiment before you've fully solved project governance, as long as you stay
        inside normal MARS prototype boundaries.
      </p>

      <ol className="mt-12 space-y-0 border border-light-grey bg-white">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-6 border-b border-light-grey p-6 last:border-b-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-lg font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">{step.title}</h2>
              <p className="mt-1 text-mid-grey">{step.detail}</p>
              {step.link && (
                <Link to={step.link.href} className="mt-2 inline-block text-sm font-semibold text-york-red underline underline-offset-4">
                  {step.link.label} →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
