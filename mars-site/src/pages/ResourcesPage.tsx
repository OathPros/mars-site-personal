import { Link } from "react-router-dom";

const resources = [
  { title: "MARS service site", href: "PLACEHOLDER: link to be supplied" },
  { title: "MARS installation guide", href: "PLACEHOLDER: link to be supplied" },
  { title: "MARS training modules", href: "PLACEHOLDER: link to be supplied" },
  { title: "IPPM intake / Notice of Intent", href: "PLACEHOLDER: link to be supplied" },
  { title: "Regular Change Request form", href: "PLACEHOLDER: link to be supplied" },
  { title: "Production Change Request / change management process", href: "PLACEHOLDER: link to be supplied" },
  { title: "AI Development Committee submission", href: "PLACEHOLDER: link to be supplied" },
];

const guides = [
  {
    title: "Ideation Guide",
    description: "Coached prompts that turn your idea into a Markdown spec ready for vibe-coding with an AI coding assistant.",
    href: "/build/ideation-guide",
    output: "Generates a .md or .docx file",
  },
  {
    title: "Production Readiness Guide",
    description: "Coached prompts covering ownership, readiness, governance, and implementation, templated into a York-branded document.",
    href: "/production/guide",
    output: "Generates a .md or .docx file",
  },
  {
    title: "Production Readiness Checklist",
    description: "Track your progress against the \"Request to Move to Production\" requirements across ownership, readiness, governance, and implementation.",
    href: "/production",
    output: "Interactive checklist",
    cta: "Open checklist →",
  },
];

export function ResourcesPage() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-york-red">Resources</p>
      <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">Links & Resources</h1>
      <p className="mt-4 max-w-2xl text-lg text-mid-grey">
        Supporting links referenced across the MARS process. Items marked as placeholders will be supplied by the
        MARS service team.
      </p>

      <h2 className="mt-12 text-xs font-semibold uppercase tracking-widest text-mid-grey">Guided document generators</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link
            key={g.title}
            to={g.href}
            className="flex flex-col gap-3 border border-light-grey bg-white p-6 transition-colors hover:border-york-red"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-bg-grey px-2.5 py-1 text-xs font-semibold text-charcoal">
              {g.output}
            </span>
            <h3 className="text-lg font-semibold text-ink">{g.title}</h3>
            <p className="text-sm text-mid-grey">{g.description}</p>
            <span className="mt-auto text-sm font-semibold text-york-red">{g.cta ?? "Start guide →"}</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-xs font-semibold uppercase tracking-widest text-mid-grey">Links</h2>
      <ul className="mt-4 divide-y divide-light-grey border border-light-grey bg-white">
        {resources.map((r) => (
          <li key={r.title} className="flex flex-wrap items-center justify-between gap-2 px-6 py-5">
            <span className="font-medium text-ink">{r.title}</span>
            <span className="text-sm italic text-mid-grey">{r.href}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
