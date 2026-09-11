export const routes = {
  start: "/", process: "/process", ideation: "/ideation-guide", next: "/find-my-next-step",
  inventory: "/inventory", mars: "/build-with-mars", aide: "/aide-committee", production: "/preparing-for-production", resources: "/resources",
} as const;

export const aideRecommendations = ["Continue ideation", "Proceed with prototyping", "Proceed with conditions", "Revise and return", "Use or join existing work", "Consult a specialist authority", "Refer to IPPM", "Prepare for Change Management review", "Do not proceed at this time", "Retire or close the work"] as const;

export const processStages = [
  { stage: "01 · Discover", title: "Define and search", body: "Define the need, people affected and intended value. Search the AI Solutions Inventory and related York services before creating something new.", actions: ["Reuse or join existing work when it fits", "Create or update a lightweight inventory entry for new work", "Consult the AIDE Committee early when guidance would help"] },
  { stage: "02 · Shape", title: "Choose a path", body: "Select an appropriate development path—including MARS where applicable—and complete its prerequisites. Use the Ideation Guide to shape the work.", actions: ["Proponents may approach IPPM directly", "AIDE may recommend IPPM; IPPM may refer AI work to AIDE", "Resource needs do not automatically create an IPPM initiative"] },
  { stage: "03 · Prototype", title: "Test responsibly", body: "Prototype within Interim guidance. Reassess whenever scope, data, users, integrations, costs, risks or production intent changes.", actions: ["Seek AIDE or specialist guidance when indicated", "Record conditions and a clear next action", "Do not use sensitive or confidential information in this prototype site"] },
  { stage: "04 · Review", title: "Get recommendations", body: "The AIDE Committee reviews information and provides documented recommendations. It does not approve, authorize, reject, stop, fund or deploy solutions.", actions: ["Continue, revise, reuse or redirect", "Proceed with conditions or consult a specialist", "Approach IPPM, prepare for production or discontinue"] },
  { stage: "05 · Production", title: "Prepare to launch", body: "Complete applicable specialist reviews and Change Management review—the current working production gate. Confirm an accepted named operational owner and support model.", actions: ["This site does not submit a Change Request", "Deploy only if approved through the applicable process", "York must confirm the accountable production decision role"] },
  { stage: "06 · Operate", title: "Own the service", body: "The accepted operational owner operates and supports the solution. Review, change, suspend or retire it as circumstances evolve.", actions: ["Reassess significant changes", "Keep the inventory record current", "Change Management does not provide ongoing support"] },
] as const;
