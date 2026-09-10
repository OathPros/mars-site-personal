/**
 * Structured, authoritative process data derived from `mermaidSource.ts`.
 * Every part of the site (process map, Find My Path, node detail panels,
 * lifecycle indicators, plugin inventory, production checklist) reads
 * from this single definition rather than re-encoding business rules.
 */

export type NodeCategory =
  | "hero"
  | "action"
  | "form"
  | "decision"
  | "reference"
  | "governance"
  | "stop"
  | "production"
  | "remediation";

export type LifecycleStage =
  | "idea"
  | "prototype"
  | "candidate"
  | "initiative"
  | "production"
  | "stopped"
  | "redirected";

export const lifecycleStages: { id: LifecycleStage; label: string; description: string }[] = [
  { id: "idea", label: "Idea", description: "You have an idea for a solution to a problem" },
  { id: "prototype", label: "Prototype", description: "You are working on a proof of concept or initial version of your solution" },
  { id: "candidate", label: "Candidate", description: "Your prototype is working locally and pending  committee review, or moving toward a production decision" },
  { id: "initiative", label: "Initiative", description: "Your prototype is formalized through IPPM as an institutional project with dedicated resourcing" },
  { id: "production", label: "Production", description: "Your work is deployed and operating as a supported production solution" },
  { id: "stopped", label: "Stopped", description: "Work on your solution has ceased, the capability might already exist, or the solution might lack sufficient value to warranted the effort required to continue" },
  { id: "redirected", label: "Redirected", description: "Redirected toward an existing tool, team, or initiative instead of proceeding as planned" },
];

export const lifecycleOrder: LifecycleStage[] = [
  "idea",
  "prototype",
  "candidate",
  "initiative",
  "production",
];

export interface ProcessOutcome {
  label: string;
  targetId?: string;
  tone?: "positive" | "negative" | "neutral";
}

export interface ProcessLink {
  label: string;
  href: string;
}

export interface RequirementGroup {
  id: string;
  title: string;
  items: string[];
}

export interface ProcessNode {
  id: string;
  shortLabel: string;
  fullTitle: string;
  icon: string;
  category: NodeCategory;
  lifecycle: LifecycleStage;
  summary: string;
  whatItMeans: string;
  whatYouNeedToDo: string;
  involved?: string[];
  requirementGroups?: RequirementGroup[];
  bullets?: string[];
  outcomes?: ProcessOutcome[];
  links?: ProcessLink[];
}

export interface ProcessEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  kind: "default" | "yes" | "no" | "skip" | "loop";
  /** For loop-back edges only: which side corridor to route through. Defaults to right. */
  loopSide?: "left" | "right";
  /**
   * Marks this edge as part of the primary "spine" of the process (the
   * main, most-travelled path from start to finish). Spine edges get a
   * much higher layout weight so dagre keeps this path a single straight
   * vertical line even where side branches (e.g. optional steps, stop /
   * redirect outcomes) fan out from the same node.
   */
  primary?: boolean;
}

const PLACEHOLDER = "Link to be supplied by MARS service team";

export const processNodes: ProcessNode[] = [
  {
    id: "A",
    shortLabel: "I have a problem",
    fullTitle: "I Have a Problem",
    icon: "💡",
    category: "hero",
    lifecycle: "idea",
    summary: "Every MARS journey starts with a problem worth solving",
    whatItMeans: "This is the entry point for anyone at York who has a problem, workflow gap, or opportunity that might benefit from a rapidly developed AI-assisted solution",
    whatYouNeedToDo: "Name the problem clearly before deciding whether to build. The next step is to check whether the need is already solved or someone is already working on it",
    involved: ["You"],
    outcomes: [{ label: "Check AI Inventory", targetId: "D", tone: "neutral" }]
  },
  {
    id: "D",
    shortLabel: "Check AI Inventory",
    fullTitle: "Check AI Inventory",
    icon: "🗂️",
    category: "reference",
    lifecycle: "idea",
    summary: "Check whether the problem is already solved or someone is already working on a solution. Great minds think alike, and the AI Inventory helps avoid duplicate work and might turn your solo prototype into a teamup",
    whatItMeans: "The AI Inventory helps avoid duplicate work by showing existing AI capabilities, plugins, and prototypes already in flight",
    whatYouNeedToDo: "Search or filter by problem area, lifecycle status, owner, or unit. If something relevant exists, connect with the owner before starting a new build",
    bullets: ["Existing capabilities", "Plugins in development", "Problem being solved", "Owner / unit", "Lifecycle status", "Brief description"],
    involved: ["You", "Plugin owners across York"],
    links: [{ label: "Browse the AI Inventory", href: "/inventory" }],
    outcomes: [{ label: "Create a new solution", targetId: "B", tone: "positive" }]
  },
  {
    id: "B",
    shortLabel: "Create new solution?",
    fullTitle: "Do I Want to Create a New Solution?",
    icon: "🚀",
    category: "decision",
    lifecycle: "idea",
    summary: "Move forward with a new solution after checking what already exists",
    whatItMeans: "You've confirmed that building something new is appropriate, or that your problem is distinct enough to prototype separately",
    whatYouNeedToDo: "Use MARS to begin creating the new solution. Download and install MARS as the next step",
    involved: ["You"],
    outcomes: [{ label: "YES: Download / install MARS", targetId: "F", tone: "positive" }]
  },
  {
    id: "F",
    shortLabel: "Download / Install MARS",
    fullTitle: "Download / Install MARS",
    icon: "⬇️",
    category: "action",
    lifecycle: "idea",
    summary: "Get MARS installed on your machine or workspace",
    whatItMeans: "A one-time setup step to get the MARS tooling running",
    whatYouNeedToDo: "Follow the install instructions on the MARS service site",
    involved: ["You"],
    links: [{ label: "Installation guide", href: PLACEHOLDER }],
    outcomes: [
      { label: "Continue: Complete training", targetId: "G", tone: "positive" },
      { label: "Complete the Ideation Guide", targetId: "G-ideation", tone: "positive" },
      { label: "Consult AI Committee", targetId: "G-consult", tone: "positive" },
    ]
  },
  {
    id: "G",
    shortLabel: "Complete training",
    fullTitle: "Complete MARS Training",
    icon: "🎓",
    category: "action",
    lifecycle: "idea",
    summary: "Essential training before landing on MARS",
    whatItMeans: "Training is your rocket to MARS, it saves you time, helps you get started the right way and helps prevent you getting lost in the vacuous black of space...",
    whatYouNeedToDo: "Complete the MARS training modules",
    involved: ["You"],
    links: [{ label: "MARS training", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "H", tone: "positive" }]
  },
  {
    id: "G-ideation",
    shortLabel: "Complete Ideation Guide",
    fullTitle: "Complete the Ideation Guide",
    icon: "💡",
    category: "action",
    lifecycle: "idea",
    summary: "Recommended before you create a plugin",
    whatItMeans: "This helps everyone — it marks your idea in the AI Inventory and helps others check if a solution is already in the works. Its output also becomes your starting prompt, unlocking prototyping",
    whatYouNeedToDo: "Complete the Ideation Guide to turn your idea into a Markdown spec ready for vibe-coding with an AI coding assistant",
    involved: ["You"],
    links: [{ label: "Start the Ideation Guide", href: "/build/ideation-guide" }],
    outcomes: [{ label: "Continue", targetId: "H", tone: "positive" }]
  },
  {
    id: "G-consult",
    shortLabel: "Consult AI Committee",
    fullTitle: "Consult AI Committee",
    icon: "🤝",
    category: "action",
    lifecycle: "idea",
    summary: "Recommended before you create a plugin",
    whatItMeans: "Consulting our AI experts helps you start off on the right foot and saves you time and effort off the rip",
    whatYouNeedToDo: "Book a consultation with the AI Development Committee before you begin building",
    involved: ["You", "AI Development Committee"],
    links: [{ label: "Book a consultation", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "H", tone: "positive" }]
  },
  {
    id: "H",
    shortLabel: "Create a plugin",
    fullTitle: "Create a New Plugin",
    icon: "➕",
    category: "action",
    lifecycle: "idea",
    summary: "Register a new plugin workspace inside MARS",
    whatItMeans: "This creates your plugin in MARS and gives you a workspace to start building your prototype",
    whatYouNeedToDo: "Create the plugin in MARS with a clear name and problem statement",
    involved: ["You"],
    outcomes: [{ label: "Start building", targetId: "I", tone: "positive" }]
  },
  {
    id: "I",
    shortLabel: "Build / vibe-code",
    fullTitle: "Build / Vibe-Code Plugin in MARS",
    icon: "🧪",
    category: "action",
    lifecycle: "prototype",
    summary: "The core prototyping loop: build, test, iterate. We recommend using GitHub Copilot to accelerate your rockship development",
    whatItMeans: "This is where most of the creative and technical work happens. It's normal to loop here many times",
    whatYouNeedToDo: "Build, test, and refine your plugin. Come back to this step as often as needed",
    involved: ["You"],
    outcomes: [{ label: "Assess resource needs", targetId: "J", tone: "neutral" }]
  },
  {
    id: "J",
    shortLabel: "Need York resources?",
    fullTitle: "Do I Need York Resources, Support or Involvement Outside Normal MARS Use to Continue Development?",
    icon: "👥",
    category: "decision",
    lifecycle: "prototype",
    summary: "The single most important fork in the entire process",
    whatItMeans: "This decision determines whether your prototype can keep growing informally inside MARS, or whether it now needs institutional resourcing and governance via IPPM. Examples of \"York resources\" include dedicated staff, funding, procurement, significant infrastructure, integrations, institutional data, ongoing involvement from other York teams, or significant operational dependencies",
    whatYouNeedToDo: "Honestly assess whether continuing requires resources or commitments beyond what you can arrange yourself within MARS",
    involved: ["You"],
    bullets: [
      "Dedicated staff",
      "Funding",
      "Procurement",
      "Significant infrastructure",
      "Integrations",
      "Institutional data",
      "Ongoing involvement from other York teams",
      "Significant operational dependencies",
    ],
    outcomes: [
      { label: "YES: Go to IPPM", targetId: "R", tone: "negative" },
      { label: "NO: Keep prototyping", targetId: "K", tone: "positive" },
    ]
  },

  // ---- NO branch: stay in MARS ----
  {
    id: "K",
    shortLabel: "Continue prototyping",
    fullTitle: "Continue Prototyping",
    icon: "🛠️",
    category: "action",
    lifecycle: "prototype",
    summary: "Keep working independently within normal MARS guardrails",
    whatItMeans: "No formal project approval is needed simply to keep experimenting within normal MARS boundaries",
    whatYouNeedToDo: "Keep building. When you believe the prototype is ready, assess whether it should move toward production",
    involved: ["You"],
    outcomes: [{ label: "Ready for production?", targetId: "L", tone: "neutral" }]
  },
  {
    id: "L",
    shortLabel: "Ready to promote to production?",
    fullTitle: "Is My Plugin Ready to Promote to Production?",
    icon: "🚦",
    category: "decision",
    lifecycle: "prototype",
    summary: "Decide whether the prototype is mature enough for committee review",
    whatItMeans: "This checkpoint recognizes that not every prototype needs to progress further, but if yours is working and valuable, it's time for a second opinion before promoting it toward production",
    whatYouNeedToDo: "If not ready, keep building. If ready to promote toward production, bring it to the AI Development Committee",
    involved: ["You"],
    outcomes: [
      { label: "NO: Keep building", targetId: "I", tone: "neutral" },
      { label: "YES: Go to Committee", targetId: "M", tone: "positive" },
    ]
  },

  // ---- Committee ----
  {
    id: "M",
    shortLabel: "AI Development Committee",
    fullTitle: "AI Development Committee",
    icon: "🤖",
    category: "governance",
    lifecycle: "candidate",
    summary: "Committee reviews the demonstrated prototype and recommends a path",
    whatItMeans: "The committee evaluates working prototypes, proposals, and consultation requests, and recommends one of three paths forward. Not every prototype makes it to production",
    whatYouNeedToDo: "Present your working prototype for review",
    involved: ["You", "AI Development Committee"],
    bullets: [
      "Institutional value",
      "Collisions with other initiatives and existing tools and services",
      "Operational requirements",
      "Supportability",
      "Scope and complexity",
      "Strategic alignment",
      "Risk and governance implications",
    ],
    links: [{ label: "AI Development Committee details", href: "/committee" }],
    outcomes: [{ label: "Committee recommendation", targetId: "N", tone: "neutral" }]
  },
  {
    id: "N",
    shortLabel: "Committee recommendation",
    fullTitle: "Committee Recommendation",
    icon: "🧭",
    category: "decision",
    lifecycle: "candidate",
    summary: "One of three outcomes: stop/redirect, operational enablement, or formal initiative",
    whatItMeans: "The committee's recommendation determines how much governance the prototype needs next, proportionate to its scope and impact",
    whatYouNeedToDo: "Await and act on the committee's recommendation",
    involved: ["AI Development Committee"],
    outcomes: [
      { label: "Conflict or insufficient value → Stop/Redirect", targetId: "O", tone: "negative" },
      { label: "Operational resources sufficient → Change Request", targetId: "P", tone: "positive" },
      { label: "Formal initiative required → IPPM", targetId: "R", tone: "negative" },
    ]
  },
  {
    id: "O",
    shortLabel: "Stop / redirect",
    fullTitle: "Stop / Redirect",
    icon: "⛔",
    category: "stop",
    lifecycle: "stopped",
    summary: "The prototype does not proceed as-is",
    whatItMeans: "This is a legitimate, healthy outcome, not a failure. It keeps MARS focused and avoids duplicated institutional effort",
    whatYouNeedToDo: "Review the committee's reasoning and consider whether re-scoping or redirecting toward an existing capability makes sense",
    involved: ["AI Development Committee", "You"],
    bullets: [
      "Existing capability already meets the need",
      "Duplicate initiative underway",
      "Conflict with institutional direction",
      "Insufficient value to proceed",
      "Prototype should be re-scoped",
    ]
  },

  // ---- Operational path ----
  {
    id: "P",
    shortLabel: "Change request",
    fullTitle: "Regular Change Request",
    icon: "📝",
    category: "form",
    lifecycle: "candidate",
    summary: "Request bounded operational resources to support the plugin",
    whatItMeans: "Some prototypes are valuable but only need small, bounded operational work, not a full institutional project",
    whatYouNeedToDo: "Submit a regular Change Request describing the operational support needed",
    involved: ["You", "Operational teams"],
    bullets: [
      "Infrastructure configuration",
      "Platform configuration",
      "Technical enablement",
      "Access / permissions",
      "Operational team support",
      "Other bounded technical work",
    ],
    links: [{ label: "Change Request form", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "Q", tone: "positive" }]
  },
  {
    id: "Q",
    shortLabel: "Resources provided",
    fullTitle: "Operational Resources or Support Provided",
    icon: "🛠️",
    category: "action",
    lifecycle: "candidate",
    summary: "The requested operational support is delivered",
    whatItMeans: "Once bounded resourcing is in place, the plugin is ready to prepare for a production request",
    whatYouNeedToDo: "Confirm the operational support has been delivered, then prepare your production request",
    involved: ["Operational teams", "You"],
    outcomes: [{ label: "Continue", targetId: "V", tone: "positive" }]
  },

  // ---- Formal initiative path (IPPM) ----
  {
    id: "R",
    shortLabel: "Go to IPPM",
    fullTitle: "Go to IPPM",
    icon: "🏛️",
    category: "governance",
    lifecycle: "initiative",
    summary: "The prototype is becoming an institutional initiative",
    whatItMeans: "Reached either directly (you need York resources to keep developing) or via committee recommendation (a formal initiative is required). IPPM (Integrated Planning & Portfolio Management) is York's process for institutional initiatives",
    whatYouNeedToDo: "Engage IPPM to formalize resourcing, sponsorship, and governance for the initiative",
    involved: ["You", "IPPM", "Sponsor"],
    links: [{ label: "IPPM intake", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "S", tone: "neutral" }]
  },
  {
    id: "S",
    shortLabel: "IPPM intake",
    fullTitle: "Notice of Intent / IPPM Intake",
    icon: "📄",
    category: "form",
    lifecycle: "initiative",
    summary: "Formalize the prototype as an institutional initiative or project",
    whatItMeans: "This intake captures the business case, ownership, resourcing, and delivery/governance considerations needed to run the work as a formal initiative",
    whatYouNeedToDo: "Complete the Notice of Intent with your sponsor and IPPM",
    involved: ["You", "Sponsor", "IPPM", "Functional owner", "Technical owner"],
    requirementGroups: [
      {
        id: "business",
        title: "Business",
        items: ["Business need", "Problem / opportunity", "Scope", "Expected value", "Strategic alignment"],
      },
      {
        id: "ownership",
        title: "Ownership",
        items: ["Sponsor", "Functional owner", "Technical ownership"],
      },
      {
        id: "resourcing",
        title: "Resourcing",
        items: ["People / teams required", "Funding", "Procurement / vendors", "Ongoing operational resources"],
      },
      {
        id: "delivery-governance",
        title: "Delivery & Governance",
        items: [
          "Dependencies",
          "Integrations",
          "Delivery approach",
          "Privacy / security considerations",
          "Architecture considerations",
          "Data considerations",
          "Accessibility",
          "Other governance requirements",
        ],
      },
    ],
    links: [{ label: "Notice of Intent form", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "T", tone: "positive" }]
  },
  {
    id: "T",
    shortLabel: "Formal initiative",
    fullTitle: "Continue Development as a Formal Initiative",
    icon: "🏗️",
    category: "action",
    lifecycle: "initiative",
    summary: "Development continues with institutional resourcing and oversight",
    whatItMeans: "The work is now a recognized institutional initiative with sponsorship, funding, and governance in place",
    whatYouNeedToDo: "Continue delivery as an initiative. Periodically assess readiness for production",
    involved: ["Initiative team", "Sponsor"],
    outcomes: [{ label: "Ready for production?", targetId: "U", tone: "neutral" }]
  },
  {
    id: "U",
    shortLabel: "Ready for production?",
    fullTitle: "Is the Solution Ready to Move Toward Production?",
    icon: "🚦",
    category: "decision",
    lifecycle: "initiative",
    summary: "Checkpoint before requesting production readiness review",
    whatItMeans: "This gate confirms that the formal initiative is ready to proceed into the production request",
    whatYouNeedToDo: "When ready, prepare the production request",
    involved: ["Initiative team", "Sponsor"],
    outcomes: [{ label: "YES: Request production", targetId: "V", tone: "positive" }]
  },

  // ---- Merge point: production request ----
  {
    id: "V",
    shortLabel: "Request production",
    fullTitle: "Request to Move to Production",
    icon: "📄",
    category: "form",
    lifecycle: "candidate",
    summary: "The shared gate both paths converge on before production review",
    whatItMeans: "Whether you arrived via operational enablement or a formal initiative, this is where production readiness is documented in full",
    whatYouNeedToDo: "Complete the production request covering ownership, readiness, governance, and implementation",
    involved: ["You", "Functional owner", "Technical owner", "ITAC"],
    requirementGroups: [
      {
        id: "ownership",
        title: "Production Ownership",
        items: ["Accountable owner", "Functional / service owner", "Technical owner", "Support model", "Operational resources"],
      },
      {
        id: "readiness",
        title: "Production Readiness",
        items: [
          "Solution scope finalized",
          "Testing complete",
          "Production environment ready",
          "Integrations ready",
          "Monitoring established",
          "Support documentation complete",
          "Knowledge content ready",
          "User communications ready",
        ],
      },
      {
        id: "governance",
        title: "Governance Readiness",
        items: [
          "Security requirements addressed",
          "Privacy requirements addressed",
          "Accessibility requirements addressed",
          "Architecture requirements addressed",
          "Data requirements addressed",
          "Required governance reviews identified",
        ],
      },
      {
        id: "implementation",
        title: "Implementation",
        items: ["Proposed launch approach", "Dependencies", "Risks", "Production support readiness"],
      },
    ],
    links: [{ label: "Production request form", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "W", tone: "positive" }]
  },
  {
    id: "W",
    shortLabel: "Production review",
    fullTitle: "ITAC / Required Production Review",
    icon: "🏛️",
    category: "governance",
    lifecycle: "candidate",
    summary: "Governance review of the production request",
    whatItMeans: "ITAC (or the applicable governance body) reviews the production request against institutional requirements",
    whatYouNeedToDo: "Support the review with any additional information requested",
    involved: ["ITAC", "You"],
    outcomes: [{ label: "Decision", targetId: "X", tone: "neutral" }]
  },
  {
    id: "X",
    shortLabel: "Approved?",
    fullTitle: "Approved to Move to Production?",
    icon: "✅",
    category: "decision",
    lifecycle: "candidate",
    summary: "The final governance gate before production change management",
    whatItMeans: "If requirements remain outstanding, they're addressed and resubmitted rather than treated as a hard failure",
    whatYouNeedToDo: "If not approved, address outstanding items and resubmit. If approved, proceed to change management",
    involved: ["ITAC"],
    outcomes: [
      { label: "NO: Address requirements", targetId: "Y", tone: "negative" },
      { label: "YES: Proceed to change management", targetId: "Z", tone: "positive" },
    ]
  },
  {
    id: "Y",
    shortLabel: "Address requirements",
    fullTitle: "Address Outstanding Production Requirements",
    icon: "🔧",
    category: "remediation",
    lifecycle: "candidate",
    summary: "Close the gaps identified during production review",
    whatItMeans: "This is a normal remediation loop, not a rejection, most production requests need at least one pass here",
    whatYouNeedToDo: "Resolve the outstanding items, then resubmit the production request",
    involved: ["You", "Technical owner"],
    outcomes: [{ label: "Resubmit", targetId: "V", tone: "neutral" }]
  },

  // ---- Production ----
  {
    id: "Z",
    shortLabel: "Production change request",
    fullTitle: "Production Change Request",
    icon: "📝",
    category: "production",
    lifecycle: "production",
    summary: "Follow change management best practices to deploy",
    whatItMeans: "The final formal step before deployment, following standard change management discipline",
    whatYouNeedToDo: "Submit the production change request with a full implementation and rollback plan",
    involved: ["You", "Change management", "Technical approvers"],
    bullets: [
      "Implementation plan",
      "Systems / services affected",
      "Testing evidence",
      "Risk and impact",
      "Implementation window",
      "User / stakeholder communications",
      "Technical approvals",
      "Validation plan",
      "Backout / rollback plan",
    ],
    links: [{ label: "Change management process", href: PLACEHOLDER }],
    outcomes: [{ label: "Continue", targetId: "AA", tone: "positive" }]
  },
  {
    id: "AA",
    shortLabel: "Deploy",
    fullTitle: "Deploy to Production",
    icon: "🚀",
    category: "production",
    lifecycle: "production",
    summary: "The plugin goes live",
    whatItMeans: "The capability is released into production per the approved change",
    whatYouNeedToDo: "Execute the deployment plan and validate against the change record",
    involved: ["Change management", "Technical owner"],
    outcomes: [{ label: "Continue", targetId: "AB", tone: "positive" }]
  },
  {
    id: "AB",
    shortLabel: "Operate & support",
    fullTitle: "Operate & Support",
    icon: "⚙️",
    category: "production",
    lifecycle: "production",
    summary: "The plugin becomes a supported production service or capability",
    whatItMeans: "The journey is complete. The plugin is now a supported institutional capability with an accountable owner and support model",
    whatYouNeedToDo: "Maintain the service per its support model, and keep its inventory / production record current",
    involved: ["Functional owner", "Technical owner", "Support teams"]
  },
];

export const processEdges: ProcessEdge[] = [
  { id: "e-A-D", source: "A", target: "D", kind: "default", primary: true },
  { id: "e-D-B", source: "D", target: "B", kind: "default", primary: true },
  { id: "e-B-F", source: "B", target: "F", kind: "yes", label: "YES", primary: true },
  { id: "e-F-G", source: "F", target: "G", kind: "default" },
  { id: "e-F-G-ideation", source: "F", target: "G-ideation", kind: "default", primary: true },
  { id: "e-F-G-consult", source: "F", target: "G-consult", kind: "default" },
  { id: "e-G-H", source: "G", target: "H", kind: "default" },
  { id: "e-G-ideation-H", source: "G-ideation", target: "H", kind: "default", primary: true },
  { id: "e-G-consult-H", source: "G-consult", target: "H", kind: "default" },
  { id: "e-H-I", source: "H", target: "I", kind: "default", primary: true },
  { id: "e-I-J", source: "I", target: "J", kind: "default", primary: true },
  { id: "e-J-R", source: "J", target: "R", kind: "yes", label: "YES" },
  { id: "e-J-K", source: "J", target: "K", kind: "no", label: "NO", primary: true },
  { id: "e-K-L", source: "K", target: "L", kind: "default", primary: true },
  { id: "e-L-I", source: "L", target: "I", kind: "loop", label: "NO", loopSide: "left" },
  { id: "e-L-M", source: "L", target: "M", kind: "yes", label: "YES", primary: true },
  { id: "e-M-N", source: "M", target: "N", kind: "default", primary: true },
  { id: "e-N-O", source: "N", target: "O", kind: "no", label: "Conflict / insufficient value" },
  { id: "e-N-P", source: "N", target: "P", kind: "yes", label: "Operational resources sufficient", primary: true },
  { id: "e-N-R", source: "N", target: "R", kind: "yes", label: "Formal initiative required" },
  { id: "e-P-Q", source: "P", target: "Q", kind: "default", primary: true },
  { id: "e-Q-V", source: "Q", target: "V", kind: "default" },
  { id: "e-R-S", source: "R", target: "S", kind: "default" },
  { id: "e-S-T", source: "S", target: "T", kind: "default" },
  { id: "e-T-U", source: "T", target: "U", kind: "default" },
  { id: "e-U-V", source: "U", target: "V", kind: "yes", label: "YES" },
  { id: "e-V-W", source: "V", target: "W", kind: "default" },
  { id: "e-W-X", source: "W", target: "X", kind: "default" },
  { id: "e-X-Y", source: "X", target: "Y", kind: "no", label: "NO" },
  { id: "e-Y-V", source: "Y", target: "V", kind: "loop", loopSide: "left" },
  { id: "e-X-Z", source: "X", target: "Z", kind: "yes", label: "YES" },
  { id: "e-Z-AA", source: "Z", target: "AA", kind: "default" },
  { id: "e-AA-AB", source: "AA", target: "AB", kind: "default" },
];

export const nodeMap: Record<string, ProcessNode> = Object.fromEntries(
  processNodes.map((n) => [n.id, n]),
);

export const categoryMeta: Record<NodeCategory, { label: string; description: string }> = {
  hero: { label: "Start", description: "Entry point into the process" },
  action: { label: "Action", description: "Something you do" },
  form: { label: "Form / Request", description: "A form or formal request to complete" },
  decision: { label: "Decision", description: "A branch point: YES/NO or a recommendation" },
  reference: { label: "Reference", description: "Informational / lookup content" },
  governance: { label: "Governance body", description: "A committee or governance review" },
  stop: { label: "Stop / redirect", description: "The path ends or redirects elsewhere" },
  production: { label: "Production", description: "Live, supported production stage" },
  remediation: { label: "Remediation", description: "Fixing outstanding items before resubmitting" },
};

/** Entry points shown on the homepage "Where are you now?" section. */
export const entryPoints: { id: string; label: string; targetId: string; description: string }[] = [
  { id: "idea", label: "I have a problem", targetId: "A", description: "Start at the very beginning of the MARS process" },
  { id: "building", label: "I'm building a prototype", targetId: "I", description: "Jump to the build / vibe-code loop" },
  { id: "works", label: "My prototype works", targetId: "J", description: "See what happens once something works" },
  { id: "launch", label: "I want to launch", targetId: "V", description: "Go straight to the production request gate" },
];

/** Find My Path guided decision tree. */
export interface PathQuestion {
  id: string;
  question: string;
  helpText?: string;
  examples?: string[];
  yes: { resultId?: string; nextQuestionId?: string };
  no: { resultId?: string; nextQuestionId?: string };
}

export interface PathResult {
  id: string;
  title: string;
  body: string;
  targetNodeId: string;
  tone: "positive" | "negative" | "neutral";
}

export const pathQuestions: Record<string, PathQuestion> = {
  "need-resources": {
    id: "need-resources",
    question: "Do you need York resources, support or involvement outside normal MARS use to continue development?",
    helpText: "This is the single most important decision in the whole process",
    examples: [
      "Dedicated staff",
      "Funding",
      "Procurement",
      "Significant infrastructure",
      "Integrations",
      "Institutional data",
      "Ongoing involvement from other York teams",
      "Significant operational dependencies",
    ],
    yes: { resultId: "go-ippm" },
    no: { resultId: "keep-prototyping" },
  },
};

export const pathResults: Record<string, PathResult> = {
  "go-ippm": {
    id: "go-ippm",
    title: "Go to IPPM",
    body: "The prototype is becoming an institutional initiative. IPPM will help formalize sponsorship, resourcing, and governance",
    targetNodeId: "R",
    tone: "negative",
  },
  "keep-prototyping": {
    id: "keep-prototyping",
    title: "Keep prototyping in MARS",
    body: "You don't need formal project approval simply to experiment within normal MARS guardrails. When a viable prototype is ready to move toward production, bring it to the AI Development Committee",
    targetNodeId: "K",
    tone: "positive",
  },
};
