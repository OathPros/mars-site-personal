/**
 * Question schemas for the two guided, document-generating resources:
 * the Ideation Guide (exports a Markdown spec for vibe-coding) and the
 * Production Readiness Guide (exports a York-branded Word document).
 *
 * Each guide is a flat sequence of coached prompts grouped into sections.
 * A shared wizard (see components/GuidedForm.tsx) walks the user through
 * one field at a time, explaining what is being asked for and why, before
 * collecting their answer.
 */

export interface GuideField {
  id: string;
  /** Short question shown as the step heading. */
  label: string;
  /** Coaching copy explaining what is being asked for and why it matters. */
  coach: string;
  /** Placeholder text shown in the empty input to model a good answer. */
  placeholder?: string;
  /** Use a single-line input instead of a multi-line textarea. */
  short?: boolean;
  /** Field can be left blank without blocking progress. */
  optional?: boolean;
}

export interface GuideSection {
  id: string;
  title: string;
  intro?: string;
  fields: GuideField[];
}

export const ideationGuideSections: GuideSection[] = [
  {
    id: "basics",
    title: "The basics",
    intro: "Start by naming the idea in a way you and an AI coding assistant can both understand quickly.",
    fields: [
      {
        id: "projectName",
        label: "What do you want to call this idea?",
        coach: "A short working name. It does not need to be final. This becomes the title of your spec file and the name MARS will use once you create the plugin.",
        placeholder: "e.g. Advising Note Summarizer",
        short: true,
      },
      {
        id: "problem",
        label: "What problem are you trying to solve?",
        coach: "Describe the problem, workflow gap, or opportunity in plain language, as if explaining it to a colleague who has never seen it. Be specific about who is affected and when the problem shows up.",
        placeholder: "e.g. Advisors spend significant time re-reading long case histories before every appointment, which shortens the time they have with the student.",
      },
      {
        id: "audience",
        label: "Who is this for?",
        coach: "List the primary users and anyone else affected by the outcome (students, staff, faculty, a specific office). This shapes tone, access, and what \"done\" looks like.",
        placeholder: "e.g. Academic advisors in Student Success, indirectly students being advised",
      },
      {
        id: "ownerName",
        label: "Who owns this idea right now?",
        coach: "Your name (or the name of whoever is driving this idea). This is also used if you later list the idea in the AI Inventory, so other people know who to contact.",
        placeholder: "e.g. J. Alvarez",
        short: true,
      },
      {
        id: "unit",
        label: "What unit or department are you in?",
        coach: "Your home unit or department. Also used for the AI Inventory listing, and helps reviewers understand context quickly.",
        placeholder: "e.g. Student Success",
        short: true,
      },
      {
        id: "contact",
        label: "Best contact email or handle for follow-up questions?",
        coach: "Optional, but useful if someone browsing the AI Inventory wants to reach out about your idea.",
        placeholder: "e.g. j.alvarez@yorku.ca",
        short: true,
        optional: true,
      },
    ],
  },
  {
    id: "current-state",
    title: "Current state",
    fields: [
      {
        id: "currentProcess",
        label: "How is this handled today, without your idea?",
        coach: "Describe the current manual process, workaround, or tool. This gives your AI coding assistant the \"before\" picture so it understands what it is replacing or improving.",
        placeholder: "e.g. Advisors scroll through the full note history in the student system before each appointment.",
      },
      {
        id: "painPoints",
        label: "What specifically makes the current approach slow, error-prone, or frustrating?",
        coach: "Name the pain points concretely: too much manual reading, inconsistent formatting, information scattered across systems, and so on. Concrete pain points make it much easier to scope a first working version.",
        placeholder: "e.g. Notes are unstructured, span years, and important context is buried near the bottom.",
      },
    ],
  },
  {
    id: "solution",
    title: "The solution",
    fields: [
      {
        id: "shortDescription",
        label: "In one sentence, what will this solution actually do?",
        coach: "A short, concrete one-liner. This becomes the description if your idea is later listed in the AI Inventory, so keep it plain and specific rather than aspirational.",
        placeholder: "e.g. Summarizes prior advising notes into a short, structured brief before each student appointment.",
        short: true,
      },
      {
        id: "desiredOutcome",
        label: "What should the world look like once this idea works?",
        coach: "Describe the end state in outcome terms, not implementation terms. What changes for the people involved?",
        placeholder: "e.g. Advisors open a short, structured brief before each appointment instead of the full note history.",
      },
      {
        id: "successCriteria",
        label: "How will you know a first version is good enough?",
        coach: "List a few concrete, checkable signals of success. These become the acceptance criteria your AI coding assistant should build and test against.",
        placeholder: "e.g. Brief generates in under 10 seconds; advisors say it captures the right context in a short pilot.",
      },
      {
        id: "keyScenarios",
        label: "Walk through the main scenario, step by step",
        coach: "Describe the happy path from the user's first action to the result they see, as a short numbered or narrative walkthrough. This is one of the most useful sections for vibe-coding, since it reads almost like a spec.",
        placeholder: "e.g. 1) Advisor opens the tool before an appointment. 2) They select the student. 3) The tool summarizes prior notes into a short brief. 4) Advisor reviews and edits before the appointment.",
      },
    ],
  },
  {
    id: "constraints",
    title: "Constraints and context",
    fields: [
      {
        id: "dataInvolved",
        label: "What data or systems does this touch?",
        coach: "Name any data sources, institutional systems, or sensitive information involved (student records, personal data, integrations). This flags governance considerations early and helps scope what the prototype should and should not touch yet.",
        placeholder: "e.g. Advising notes stored in the student information system; no data leaves York systems.",
        optional: true,
      },
      {
        id: "constraintsNonGoals",
        label: "What is explicitly out of scope for a first version?",
        coach: "Naming non-goals is as valuable as naming goals. It keeps a prototype small enough to actually finish, and it tells your AI coding assistant what not to build yet.",
        placeholder: "e.g. Not building a full case management system, not replacing the student information system, no automated decisions.",
        optional: true,
      },
      {
        id: "similarTools",
        label: "Did you check the AI Inventory for anything similar?",
        coach: "Note what you found, if anything, when you searched the AI Inventory for existing capabilities. If something close already exists, link it here so you (or your AI assistant) can reuse or extend it instead of starting from zero.",
        placeholder: "e.g. Checked the AI Inventory, nothing addressing advising notes specifically found.",
        optional: true,
      },
    ],
  },
  {
    id: "build",
    title: "Getting started building",
    fields: [
      {
        id: "techApproach",
        label: "Any early thoughts on how this might be built?",
        coach: "You do not need a final architecture. Rough thoughts on approach, tools, or building blocks help your AI coding assistant get started faster, and it is free to disagree with you.",
        placeholder: "e.g. Small web app, calls an AI model to summarize notes, simple login, no persistent storage of notes needed.",
        optional: true,
      },
      {
        id: "openQuestions",
        label: "What open questions or risks should be worked through while building?",
        coach: "List anything you are unsure about. Surfacing these now means your AI coding assistant can flag them, propose options, or ask you before making an assumption that is hard to undo.",
        placeholder: "e.g. Not sure how long notes typically are; not sure if advisors want edits saved back anywhere.",
        optional: true,
      },
    ],
  },
];

export const productionReadinessGuideSections: GuideSection[] = [
  {
    id: "overview",
    title: "Overview",
    intro: "A few identifying details for the cover of your production request document.",
    fields: [
      {
        id: "solutionName",
        label: "What is the name of the solution?",
        coach: "The plugin or initiative name as it should appear on the production request.",
        placeholder: "e.g. Facilities Ticket Summaries",
        short: true,
      },
      {
        id: "preparedBy",
        label: "Who is preparing this request?",
        coach: "Your name and role. This becomes the document author.",
        placeholder: "e.g. D. Nguyen, Facilities Services",
        short: true,
      },
      {
        id: "summary",
        label: "Give a one or two sentence summary of the solution.",
        coach: "A short plain-language description for anyone reviewing the request who has not seen the solution before.",
        placeholder: "e.g. Generates a short status summary at the top of long facilities ticket threads.",
      },
    ],
  },
  {
    id: "ownership",
    title: "Production ownership",
    fields: [
      {
        id: "accountableOwner",
        label: "Who is the accountable owner?",
        coach: "Name the single person accountable for this solution once it is in production. ITAC and the production support team will contact this person for major decisions.",
        placeholder: "e.g. D. Nguyen, Facilities Services",
      },
      {
        id: "functionalOwner",
        label: "Who is the functional / service owner?",
        coach: "The unit or person responsible for how the solution behaves day to day from a business perspective.",
        placeholder: "e.g. Facilities Services",
      },
      {
        id: "technicalOwner",
        label: "Who is the technical owner?",
        coach: "The team or person responsible for keeping the solution running technically and fixing it when it breaks.",
        placeholder: "e.g. Enterprise Systems",
      },
      {
        id: "supportModel",
        label: "What is the support model?",
        coach: "Describe who provides first, second, and third line support once this is live, and during what hours.",
        placeholder: "e.g. Service desk handles first line; Enterprise Systems handles escalations during business hours.",
      },
      {
        id: "operationalResources",
        label: "What ongoing operational resources does this need?",
        coach: "Staff time, budget, licensing, or infrastructure required to keep the solution running, not just to build it.",
        placeholder: "e.g. Shared AI model usage budget; no dedicated staff beyond existing Enterprise Systems support.",
      },
    ],
  },
  {
    id: "readiness",
    title: "Production readiness",
    fields: [
      {
        id: "scopeFinalized",
        label: "Is the solution scope finalized?",
        coach: "Confirm what is, and is not, included in this production release, so reviewers know exactly what they are approving.",
        placeholder: "e.g. Scope is finalized: summarization only, no automated ticket routing.",
      },
      {
        id: "testingComplete",
        label: "What testing has been completed?",
        coach: "Summarize functional testing, user acceptance testing, and any load or edge case testing performed before this request.",
        placeholder: "e.g. Piloted with 3 facilities staff over 4 weeks; user acceptance testing completed.",
      },
      {
        id: "environmentReady",
        label: "Is the production environment ready?",
        coach: "Describe the hosting, environment, or configuration state that confirms this can actually run in production.",
        placeholder: "e.g. Deployed to the production MARS environment; configuration reviewed by Enterprise Systems.",
      },
      {
        id: "integrationsReady",
        label: "Are integrations ready?",
        coach: "List any systems this solution connects to and confirm those connections are tested and stable.",
        placeholder: "e.g. Reads from the facilities ticketing system through the existing read-only API; tested end to end.",
      },
      {
        id: "monitoringEstablished",
        label: "Is monitoring established?",
        coach: "Describe how you will know if the solution is failing, slow, or behaving unexpectedly once it is live.",
        placeholder: "e.g. Error alerts route to Enterprise Systems on-call; usage dashboard reviewed weekly.",
      },
      {
        id: "supportDocsComplete",
        label: "Is support documentation complete?",
        coach: "Confirm runbooks, troubleshooting notes, or support procedures exist for whoever supports this after launch.",
        placeholder: "e.g. Runbook completed and stored with Enterprise Systems support documentation.",
      },
      {
        id: "knowledgeContentReady",
        label: "Is knowledge content ready?",
        coach: "Confirm any knowledge base articles or help content for end users or support staff are written and published.",
        placeholder: "e.g. Short help article drafted for the facilities staff knowledge base.",
      },
      {
        id: "userCommunicationsReady",
        label: "Are user communications ready?",
        coach: "Describe how affected users will be told this is launching, and what they need to know or do differently.",
        placeholder: "e.g. Short announcement drafted for facilities staff distribution list ahead of launch.",
      },
    ],
  },
  {
    id: "governance",
    title: "Governance readiness",
    fields: [
      {
        id: "securityAddressed",
        label: "Have security requirements been addressed?",
        coach: "Summarize the security review status, authentication, access control, and any outstanding security concerns.",
        placeholder: "e.g. Reviewed with Information Security; uses existing single sign-on, no new attack surface identified.",
      },
      {
        id: "privacyAddressed",
        label: "Have privacy requirements been addressed?",
        coach: "Summarize what personal or sensitive data is involved and how privacy requirements are met.",
        placeholder: "e.g. No personal data stored beyond existing ticket system; privacy office consulted, no concerns raised.",
      },
      {
        id: "accessibilityAddressed",
        label: "Have accessibility requirements been addressed?",
        coach: "Confirm the solution has been checked against York's accessibility standards for anyone who will use it.",
        placeholder: "e.g. Interface tested with a screen reader; meets existing accessibility checklist.",
      },
      {
        id: "architectureAddressed",
        label: "Have architecture requirements been addressed?",
        coach: "Confirm the solution has been reviewed against institutional architecture standards and fits with existing systems.",
        placeholder: "e.g. Reviewed with Enterprise Systems architecture, consistent with existing integration patterns.",
      },
      {
        id: "dataAddressed",
        label: "Have data requirements been addressed?",
        coach: "Confirm data handling, retention, and classification requirements have been reviewed and met.",
        placeholder: "e.g. No new data retained beyond the existing ticketing system's normal retention policy.",
      },
      {
        id: "governanceReviewsIdentified",
        label: "What required governance reviews have been identified?",
        coach: "List any additional committee or governance reviews still required (or already completed) beyond this document.",
        placeholder: "e.g. AI Development Committee review completed; no further reviews required.",
      },
    ],
  },
  {
    id: "implementation",
    title: "Implementation",
    fields: [
      {
        id: "launchApproach",
        label: "What is the proposed launch approach?",
        coach: "Describe how this will roll out: all at once, phased, a pilot group first, and the rough timeline.",
        placeholder: "e.g. Phased rollout starting with one facilities team, expanding to all teams after two weeks.",
      },
      {
        id: "dependencies",
        label: "What dependencies does the launch have?",
        coach: "List anything else that needs to happen first: other projects, approvals, infrastructure changes, or resourcing.",
        placeholder: "e.g. Depends on the facilities ticketing system's read-only API remaining stable.",
        optional: true,
      },
      {
        id: "risks",
        label: "What are the known risks?",
        coach: "Name the risks reviewers should be aware of and, where possible, how you plan to manage them.",
        placeholder: "e.g. Summaries could omit an important detail; mitigated by always linking back to the full ticket thread.",
        optional: true,
      },
      {
        id: "productionSupportReadiness",
        label: "Is production support ready to take this on?",
        coach: "Confirm the team that will support this in production has agreed to take it on and knows what is expected of them.",
        placeholder: "e.g. Enterprise Systems has agreed to provide ongoing support starting at launch.",
      },
    ],
  },
];
