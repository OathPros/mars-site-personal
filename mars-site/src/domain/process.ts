export type ProcessPhase = "discover" | "shape" | "prototype" | "review" | "production" | "operate";

export interface ProcessStep {
  id: string;
  phase: ProcessPhase;
  number: string;
  title: string;
  summary: string;
  detail: string;
  actions: string[];
  links: { label: string; href: string }[];
  kind?: "decision" | "advisory" | "gate";
  optional?: boolean;
}

export const phaseLabels: Record<ProcessPhase, string> = {
  discover: "Discover",
  shape: "Shape",
  prototype: "Prototype",
  review: "Review",
  production: "Production",
  operate: "Operate",
};

export const processSteps: ProcessStep[] = [
  { id: "need", phase: "discover", number: "01", title: "Define the need", summary: "Start with the problem, people affected and current alternative.", detail: "Describe the need without assuming AI is the answer. Clarify intended value and how people address the need today.", actions: ["Name the people affected", "Describe the current alternative", "Define a measurable intended outcome"], links: [{ label: "Open the Ideation Guide", href: "/ideation-guide" }] },
  { id: "search", phase: "discover", number: "02", title: "Search existing work", summary: "Search the inventory and related York services before building.", detail: "Look for a solution that can be reused, extended or joined. Demonstration inventory records are not authoritative York information.", actions: ["Search by need, unit and platform", "Contact owners of related work", "Record useful relationships"], links: [{ label: "Search the inventory", href: "/inventory" }] },
  { id: "reuse", phase: "discover", number: "03", title: "Reuse or create?", summary: "Decide whether existing work can meet the need.", detail: "Reuse or join existing work when appropriate. If the need remains distinct, create or update one lightweight solution record.", actions: ["Reuse or join a suitable solution", "Redirect to a York service", "Create a record for distinct new work"], links: [{ label: "Create or update a record", href: "/inventory" }], kind: "decision" },
  { id: "path", phase: "shape", number: "04", title: "Choose a build path", summary: "Select a platform—including MARS where it fits.", detail: "MARS is one supported path within the York-wide process. Other platforms may have different prerequisites and specialist needs.", actions: ["Compare platform fit", "Complete platform prerequisites", "Document why the path was chosen"], links: [{ label: "Build with MARS", href: "/build-with-mars" }] },
  { id: "ideate", phase: "shape", number: "05", title: "Shape the solution", summary: "Use the Ideation Guide and update the shared record.", detail: "Capture value before implementation, then consider users, data, integrations, ownership, support, costs, risks and measures once.", actions: ["Connect related inventory work", "Identify ownership and support", "Set success measures"], links: [{ label: "Use the Ideation Guide", href: "/ideation-guide" }] },
  { id: "early-aide", phase: "shape", number: "A", title: "Ask AIDE early", summary: "Optional consultation is available from the start.", detail: "The AIDE Committee can help frame the work, clarify boundaries and identify other expertise. It provides recommendations, not approval.", actions: ["Bring focused questions", "Share what is known", "Record recommendations and conditions"], links: [{ label: "Prepare an AIDE package", href: "/aide-intake" }], kind: "advisory", optional: true },
  { id: "prototype", phase: "prototype", number: "06", title: "Prototype safely", summary: "Test within Interim guidance pending approval.", detail: "There is no approved York prototype guardrail standard in the supplied material. Keep the work limited and do not enter sensitive or confidential information into this site.", actions: ["Follow platform-specific boundaries", "Use non-sensitive test data", "Keep a human responsible for outputs"], links: [{ label: "Check the MARS route", href: "/build-with-mars" }] },
  { id: "reassess", phase: "prototype", number: "07", title: "Reassess change", summary: "Check triggers whenever the solution changes.", detail: "Reassess scope, data, users, integrations, costs, risks and production intent. This check belongs throughout development—not only at the end.", actions: ["Compare current and planned use", "Update the solution record", "Use Find My Next Step when uncertain"], links: [{ label: "Find my next step", href: "/find-my-next-step" }], kind: "decision" },
  { id: "aide-review", phase: "review", number: "08", title: "Consult AIDE", summary: "Seek guidance or review when indicated.", detail: "AIDE reviews the available information and provides documented recommendations. The prototype does not block progress or simulate institutional review.", actions: ["Explain the help requested", "Identify what changed", "Prepare relevant context without sensitive data"], links: [{ label: "Prepare a review package", href: "/aide-intake" }], kind: "advisory" },
  { id: "recommend", phase: "review", number: "09", title: "Receive a recommendation", summary: "Continue, revise, reuse, redirect or prepare another route.", detail: "Possible recommendations include continuing ideation or prototyping, proceeding with conditions, revising, reusing work, consulting a specialist, referring to IPPM, preparing for Change Management, not proceeding now, or retiring.", actions: ["Record the rationale", "Track conditions separately", "Choose and document the next action"], links: [{ label: "Understand AIDE", href: "/aide-committee" }], kind: "advisory" },
  { id: "specialist", phase: "review", number: "B", title: "Consult specialists", summary: "Conditional reviews depend on the solution.", detail: "Privacy, security, accessibility, architecture, procurement, data, legal or other authorities may need to review particular concerns.", actions: ["Follow the applicable authority's process", "Address conditions", "Keep the solution record current"], links: [{ label: "Review resource routes", href: "/resources" }], optional: true },
  { id: "ippm", phase: "review", number: "C", title: "Consider IPPM", summary: "Direct intake and two-way referral remain possible.", detail: "AIDE may recommend IPPM; IPPM may refer York-developed AI work to AIDE. Proponents may approach IPPM directly. A resource need does not automatically become an initiative.", actions: ["Choose the appropriate intake route", "Describe material resource needs", "Do not conflate resourcing with production approval"], links: [{ label: "Explore York resources", href: "/resources" }], optional: true },
  { id: "production-ready", phase: "production", number: "10", title: "Prepare for production", summary: "Assemble the applicable context without fake submission.", detail: "Identify a named operational owner, accepted support model and relevant specialist outcomes. This prototype does not collect formal readiness evidence.", actions: ["Confirm operational ownership", "Confirm a sustainable support model", "Prepare the applicable change information"], links: [{ label: "Production guidance", href: "/preparing-for-production" }] },
  { id: "change", phase: "production", number: "11", title: "Change Management review", summary: "The current working final production gate.", detail: "Change Management review must confirm that a named operational owner and support model have been accepted. York must still confirm the accountable production decision role.", actions: ["Use the applicable institutional process", "Resolve required conditions", "Do not imply Change Management provides support"], links: [{ label: "Read production guidance", href: "/preparing-for-production" }], kind: "gate" },
  { id: "deploy", phase: "production", number: "12", title: "Deploy if approved", summary: "Launch only through the applicable process.", detail: "The site does not simulate approval or deployment. A solution moves forward only if approved through the real applicable process.", actions: ["Confirm the approved scope", "Communicate ownership and support", "Update the inventory record"], links: [{ label: "Update the inventory", href: "/inventory" }] },
  { id: "operate", phase: "operate", number: "13", title: "Operate and evolve", summary: "Support, review, change or retire the solution.", detail: "The named operational owner and support model sustain the service. Significant change triggers reassessment; retirement addresses users, data and integrations.", actions: ["Review service health", "Reassess major changes", "Suspend or retire responsibly"], links: [{ label: "Reassess a change", href: "/find-my-next-step" }] },
];

export const primaryStepIds = processSteps.filter(step => !step.optional).map(step => step.id);

export function relatedStepIds(selectedId: string): Set<string> {
  const selected = processSteps.find(step => step.id === selectedId);
  if (!selected) return new Set();
  const primaryIndex = primaryStepIds.indexOf(selectedId);
  if (primaryIndex >= 0) return new Set(primaryStepIds.slice(0, primaryIndex + 1));
  return new Set(processSteps.filter(step => step.phase === selected.phase).map(step => step.id));
}
