export const lifecycleStages = ["Idea", "Prototype", "Production candidate", "Production", "Retired"] as const;
export const reviewStates = ["Not reviewed", "Preparing for review", "Under review", "Conditions open", "Review complete"] as const;
export const governanceRoutes = ["Within interim boundaries", "AIDE consultation", "Specialist consultation", "IPPM", "Change Management"] as const;
export const dispositions = ["Active", "On hold", "Redirected", "Discontinued"] as const;
export const serviceStates = ["Not applicable", "Planned", "Transitioning", "Live", "Suspended", "Retiring", "Retired"] as const;

export interface SolutionRecord {
  schemaVersion: 1;
  id: string;
  name: string;
  summary: string;
  problem: string;
  intendedOutcome: string;
  unit: string;
  owner: string;
  collaborators: string;
  platform: string;
  marsDetails: string;
  intendedUsers: string;
  lifecycleStage: typeof lifecycleStages[number];
  reviewState: typeof reviewStates[number];
  governanceRoute: typeof governanceRoutes[number];
  disposition: typeof dispositions[number];
  serviceState: typeof serviceStates[number];
  dataConsiderations: string;
  integrations: string;
  resourceNeeds: string;
  relatedWork: string[];
  currentConditions: string;
  nextAction: string;
  supportModel: string;
  costs: string;
  risks: string;
  successMeasures: string;
  createdAt: string;
  updatedAt: string;
  source: "demo" | "user";
}

export interface AideDraft {
  schemaVersion: 1;
  id: string;
  solutionId: string;
  helpType: string;
  changedInformation: string;
  questions: string;
  createdAt: string;
  updatedAt: string;
}

export const PROTOTYPE_NOTICE = "Prototype only. Information is stored in this browser and is not submitted to York University.";

export function blankSolution(): SolutionRecord {
  const now = new Date().toISOString();
  return { schemaVersion: 1, id: crypto.randomUUID(), name: "", summary: "", problem: "", intendedOutcome: "", unit: "", owner: "", collaborators: "", platform: "Undecided", marsDetails: "", intendedUsers: "", lifecycleStage: "Idea", reviewState: "Not reviewed", governanceRoute: "Within interim boundaries", disposition: "Active", serviceState: "Not applicable", dataConsiderations: "", integrations: "", resourceNeeds: "", relatedWork: [], currentConditions: "", nextAction: "", supportModel: "", costs: "", risks: "", successMeasures: "", createdAt: now, updatedAt: now, source: "user" };
}
