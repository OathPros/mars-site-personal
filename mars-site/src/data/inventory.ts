import type { LifecycleStage } from "./process";

/** A single supporting attachment for a plugin: demo video, PDF, architecture brief, etc. */
export interface PluginResource {
  type: string;
  title: string;
  description: string;
  url?: string;
  action?: string;
  external?: boolean;
  download?: string;
}

export interface PluginRecord {
  id: string;
  name: string;
  problem: string;
  description: string;
  owner: string;
  unit: string;
  lifecycle: LifecycleStage;
  /** Broad classification of what the plugin does (e.g. "Service intake and routing"), distinct from `unit`. */
  category?: string;
  repository?: string;
  functionalOwner?: string;
  technicalOwner?: string;
  committeeOutcome?: string;
  relatedInitiative?: string;
  relatedChangeRequests?: string[];
  productionReadiness?: string;
  productionReview?: string;
  productionRecord?: string;
  /** Contact email or handle for the plugin owner, when available. */
  contact?: string;
  /** Primary user groups the plugin serves (students, staff, faculty, etc.). */
  audience?: string[];
  /** Plain-language explanation of how the plugin works. */
  how?: string;
  /** Demo videos, architecture PDFs, and other supporting attachments. */
  resources?: PluginResource[];
}

/** Placeholder YouTube link used for every unattached demo video resource in this sample data. */
const PLACEHOLDER_DEMO_VIDEO_URL =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";

/**
 * Sample inventory records. In production this would be auto-populated
 * from MARS plugin metadata and progressively enriched as a plugin moves
 * through committee review, IPPM, and production; the same record
 * persists rather than being recreated at each stage.
 */
export const pluginRecords: PluginRecord[] = [
  {
    id: "advising-note-summarizer",
    name: "Advising Note Summarizer",
    problem: "Advisors spend significant time re-reading long case histories before appointments.",
    description: "Summarizes prior advising notes into a short, structured brief before each student appointment.",
    owner: "J. Alvarez",
    unit: "Student Success",
    category: "Student advising support",
    lifecycle: "candidate",
    repository: "PLACEHOLDER: internal repo link",
    functionalOwner: "Student Success",
    technicalOwner: "J. Alvarez",
    committeeOutcome: "Pending review",
    relatedInitiative: "PLACEHOLDER: IPPM initiative ID (not yet raised)",
    relatedChangeRequests: ["PLACEHOLDER: CR-XXXX (not yet raised)"],
    productionReadiness: "PLACEHOLDER: not yet assessed",
    productionReview: "PLACEHOLDER: not yet scheduled",
    productionRecord: "PLACEHOLDER: production service record",
    contact: "PLACEHOLDER: contact email",
    audience: ["Advisors", "Student Success staff"],
    how: "PLACEHOLDER: plain-language explanation of how the Advising Note Summarizer reads prior case notes and generates a short, structured pre-appointment brief for advisors to review before each meeting.",
    resources: [
      {
        type: "Demo video",
        title: "Advising Note Summarizer walkthrough video",
        description: "Placeholder demo video link showing where a recorded walkthrough or pitch demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, or committee submission notes.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "grant-intake-triage",
    name: "Grant Intake Triage",
    problem: "Manual sorting of incoming grant inquiries by research office staff.",
    description: "Classifies and routes incoming grant questions to the correct research office contact.",
    owner: "R. Chen",
    unit: "Research & Innovation",
    category: "Research operations",
    lifecycle: "prototype",
    repository: "PLACEHOLDER: internal repo link",
    functionalOwner: "PLACEHOLDER: functional owner",
    technicalOwner: "PLACEHOLDER: technical owner",
    committeeOutcome: "PLACEHOLDER: not yet submitted for review",
    relatedInitiative: "PLACEHOLDER: IPPM initiative ID (not yet raised)",
    relatedChangeRequests: ["PLACEHOLDER: CR-XXXX (not yet raised)"],
    productionReadiness: "PLACEHOLDER: not yet assessed",
    productionReview: "PLACEHOLDER: not yet scheduled",
    productionRecord: "PLACEHOLDER: production service record",
    contact: "PLACEHOLDER: contact email",
    audience: ["Research office staff", "Grant applicants"],
    how: "PLACEHOLDER: plain-language explanation of how Grant Intake Triage classifies incoming grant questions and routes them to the correct research office contact.",
    resources: [
      {
        type: "Demo video",
        title: "Grant Intake Triage walkthrough video",
        description: "Placeholder demo video link showing where a recorded walkthrough or pitch demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, or testing notes.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "timetable-conflict-checker",
    name: "Timetable Conflict Checker",
    problem: "Manual cross-checking of proposed course timetables for room and instructor conflicts.",
    description: "Flags likely scheduling conflicts before timetables are finalized.",
    owner: "M. Osei",
    unit: "Registrar's Office",
    category: "Registrar operations",
    lifecycle: "initiative",
    repository: "PLACEHOLDER: internal repo link",
    functionalOwner: "Registrar's Office",
    technicalOwner: "Enterprise Systems",
    committeeOutcome: "Formal initiative required",
    relatedInitiative: "PLACEHOLDER: IPPM initiative ID",
    relatedChangeRequests: ["PLACEHOLDER: CR-XXXX (not yet raised)"],
    productionReadiness: "PLACEHOLDER: not yet assessed",
    productionReview: "PLACEHOLDER: not yet scheduled",
    productionRecord: "PLACEHOLDER: production service record",
    contact: "PLACEHOLDER: contact email",
    audience: ["Registrar's Office staff", "Timetabling coordinators"],
    how: "PLACEHOLDER: plain-language explanation of how the Timetable Conflict Checker flags likely room and instructor scheduling conflicts before timetables are finalized.",
    resources: [
      {
        type: "Demo video",
        title: "Timetable Conflict Checker walkthrough video",
        description: "Placeholder demo video link showing where a recorded walkthrough or pitch demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, or IPPM initiative brief.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "facilities-ticket-summaries",
    name: "Facilities Ticket Summaries",
    problem: "Facilities staff re-read long ticket threads to understand current status.",
    description: "Generates a short status summary at the top of long facilities ticket threads.",
    owner: "D. Nguyen",
    unit: "Facilities Services",
    category: "Facilities operations",
    lifecycle: "production",
    repository: "PLACEHOLDER: internal repo link",
    functionalOwner: "Facilities Services",
    technicalOwner: "Enterprise Systems",
    committeeOutcome: "Operationally enabled",
    relatedInitiative: "PLACEHOLDER: IPPM initiative ID (not applicable, enabled via change request)",
    relatedChangeRequests: ["PLACEHOLDER: CR-1042"],
    productionReadiness: "Complete",
    productionReview: "Approved",
    productionRecord: "PLACEHOLDER: production service record",
    contact: "PLACEHOLDER: contact email",
    audience: ["Facilities Services staff", "Ticket requesters"],
    how: "PLACEHOLDER: plain-language explanation of how Facilities Ticket Summaries generates a short status summary at the top of long ticket threads for staff to review.",
    resources: [
      {
        type: "Demo video",
        title: "Facilities Ticket Summaries walkthrough video",
        description: "Placeholder demo video link showing where a recorded walkthrough or pitch demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, or production readiness review record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "meeting-notes-drafting",
    name: "Meeting Notes Drafting Assistant",
    problem: "Committee support staff spend hours drafting minutes from raw notes.",
    description: "Drafts structured meeting minutes from raw notes for staff review and edit.",
    owner: "A. Boucher",
    unit: "University Secretariat",
    category: "Governance and secretariat support",
    lifecycle: "idea",
    repository: "PLACEHOLDER: internal repo link (not yet created)",
    functionalOwner: "PLACEHOLDER: functional owner",
    technicalOwner: "PLACEHOLDER: technical owner",
    committeeOutcome: "PLACEHOLDER: not yet submitted for review",
    relatedInitiative: "PLACEHOLDER: IPPM initiative ID (not applicable at idea stage)",
    relatedChangeRequests: ["PLACEHOLDER: CR-XXXX (not applicable at idea stage)"],
    productionReadiness: "PLACEHOLDER: not applicable at this stage",
    productionReview: "PLACEHOLDER: not applicable at this stage",
    productionRecord: "PLACEHOLDER: production service record",
    contact: "PLACEHOLDER: contact email",
    audience: ["Committee support staff", "University Secretariat"],
    how: "PLACEHOLDER: plain-language explanation of how the Meeting Notes Drafting Assistant would turn raw meeting notes into structured draft minutes for staff review and edit.",
    resources: [
      {
        type: "Demo video",
        title: "Meeting Notes Drafting Assistant walkthrough video",
        description: "Placeholder demo video link showing where a recorded walkthrough or pitch demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, idea brief, or early concept notes.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "duplicate-chatbot-widget",
    name: "Campus Info Chat Widget",
    problem: "A conversational front-end for common campus service questions.",
    description: "Proposed conversational widget for answering common student service questions.",
    owner: "S. Iqbal",
    unit: "Student Services",
    category: "Student services conversational tools",
    lifecycle: "stopped",
    repository: "PLACEHOLDER: internal repo link (archived)",
    functionalOwner: "Student Services",
    technicalOwner: "PLACEHOLDER: technical owner",
    committeeOutcome: "Stop / redirect: existing capability already meets the need",
    relatedInitiative: "PLACEHOLDER: IPPM initiative ID (not applicable, stopped before initiative)",
    relatedChangeRequests: ["PLACEHOLDER: CR-XXXX (not applicable, stopped before change request)"],
    productionReadiness: "PLACEHOLDER: not applicable, stopped before assessment",
    productionReview: "PLACEHOLDER: not applicable, stopped before review",
    productionRecord: "PLACEHOLDER: production service record",
    contact: "PLACEHOLDER: contact email",
    audience: ["Students", "Student Services staff"],
    how: "PLACEHOLDER: plain-language explanation of how the Campus Info Chat Widget would have answered common student service questions before the committee redirected the request to an existing capability.",
    resources: [
      {
        type: "Demo video",
        title: "Campus Info Chat Widget walkthrough video",
        description: "Placeholder demo video link showing where a recorded walkthrough or pitch demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, or committee stop/redirect notes.",
        action: "Not attached",
        external: false,
      },
    ],
  },

  // The records below are illustrative community examples carried over from the
  // "AI Inventory" catalogue mockup, showing a wider range of categories, audiences,
  // and attached resources (demo videos, architecture PDFs) than the sample records above.
  {
    id: "rascal",
    name: "RASCAL",
    problem:
      "Users often do not know which IT service, request type, or form matches their need. This creates abandoned requests, misrouted tickets, unnecessary triage, and a frustrating service catalogue experience.",
    description:
      "An AI-assisted service catalogue intake prototype that helps users describe what they need in plain language and find the most likely IT service or request path.",
    owner: "Luke Gagliardi",
    unit: "PLACEHOLDER: institutional unit",
    category: "Service intake and routing",
    lifecycle: "prototype",
    contact: "Not provided",
    audience: ["Students", "Faculty", "Staff", "Service teams"],
    how: "A user enters a plain-language request such as “I need a cellphone” or “my account is not working.” RASCAL compares the request against structured service catalogue data, ranks likely service actions, and can generate a dynamic form based on the required information for the selected action. AI may help interpret the request, but the valid service paths, fields, and payload are controlled by structured catalogue data.",
    resources: [
      {
        type: "Demo video",
        title: "RASCAL walkthrough video",
        description: "Sample demo video link showing where a recorded walkthrough, pitch demo, or prototype tour could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "PDF attachment",
        title: "RASCAL Architecture Brief.pdf",
        description: "A deliberately ridiculous fake PDF showing how architecture documents, pilot notes, or design briefs could be attached to a catalogue entry.",
        url: "data:application/pdf;base64,JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YyIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNCAwIG9iago8PAovQ29udGVudHMgOSAwIFIgL01lZGlhQm94IFsgMCAwIDYxMiA3OTIgXSAvUGFyZW50IDggMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdIC9QYXJlbnQgOCAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNiAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDggMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9BdXRob3IgKFwoYW5vbnltb3VzXCkpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA1MTUxNjQwNDcrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA1MTUxNjQwNDcrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFwoYW5vbnltb3VzXCkpIC9UcmFwcGVkIC9GYWxzZQo+PgplbmRvYmoKOCAwIG9iago8PAovQ291bnQgMiAvS2lkcyBbIDQgMCBSIDUgMCBSIF0gL1R5cGUgL1BhZ2VzCj4+CmVuZG9iagk5IDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDIwODcKPj4Kc3RyZWFtCkdhdTBEOWxvJkkmQUBzQm0uZEFnLGFSQUQ4MDQmJzheaFo/TmloL2FKTEg9QDlHL21JPiNCY3QrJGJbRydARFtOQU5bQ0RJLXMyYl46LGRAKEktLkM5YWRdSUY4R1BdLE5kQyQ3NGBCWlJidUtcbztkQUVmUFk6XDc7J1BkYS5IZkUicm9SQl9gNE1INUJWLidoLG8uLFtPU01sN3BdUl1wTDpJTyZpYmAnXz4wNmBHSS4wKlpRI0B0Rj1lR28yUVtiZT4iYy1zTCQjIkByZWAkbVpYTTxRci1WcikxbGAmaHEybEh0I3MhSW9ZcVJATG49aCU5NlskOltbcl45VTI3YUokW1xAWGRaT01bLXBIaCplPDZ1VEBuNkJQLFROUFJEXSZAM2YyXygkVWhTXUgkVTJYYnJuUEMyZSplaHVSUDAjUDpnYVYyPFNwSVYjTTlvWl8wJE9hVF9vNmxRRGRvLmhDXDglKDNEIz1qWC04Mz1qYGNwI0JrRVpsUys6N1BLaGYtXmlTKjxSJ1RVdUJeOk5RckBOVlhXRk5HUj5tJmlAUmdHNzRZNEZeOkQ+NnIiSmQkaEJhYC9GRkQvM2MxXyJjUG1jS1M8X0ZeZnFTcFNmXEZhYmU/KDNOQEpKXW82YTFdclpLMz8/YWhBakNmYWkhPExYTDsnMm9gVGFUIjMhPmZpZmomT2EwUydaNFIsITssSVJXO0BbVDtSWFBUL1tQLDsuVCVnMFI/QDhMV1M0LkxVUEshXFQkdDgmR1dDLicxJjlcRkBjOkEySydQIiY9Wy9GbWlUU2M1N0gzYz5rYUlnMzo6ND1EJ05YZCU6Yj0wIkdwQjk5QzY9RkstPTUwL0NoVE5tSz1IQDdPUV0jRWJVT1YyLiRoNm1TY0woSSYvK1JsUXFYbyEuV1xLPFxlRF9XLSY7NmVeMi9sVm9OKDU5PCVScyhoYlI8S0NqRk5lJzoxIyJYZEdlMlxwRlwpJTtGOjQ8QykwWDNgRmVZbC8pLUdJQldPRGNUUmApKyRbLnNSX2pqWUpHbGJxSk9USGIyIyJcTHBcK1JaOS9rOTJVY0lJI1EiSXNrSiJkI2U6TUUwVUFMRmpZKXRMbiEyWEpoN0VUSVU7IyMsM1cmJCU3Zi5hK3A5TmdOMkNYW15gc2tDa0NBSz5XUScoaFM1OUxibjFeMk5JLytENVpVVzFTaDw3QTVkMl0rJTJkMFxbXihmVEZFUUA2Q1dAPWVsb0s3KVA4Py40MkZYPF85RjgtJzZ1JGhUaT9RbWAkOHJyaTtgSSZOQWUoRlA6VFg0KUp1b2wsSTxQR19CQlRgXVUqSCtWUDhaMjxSLC85YWEnO15RaiVvRlJVOyxcRCxoTjokPWJwPE9pdEYsckYrVllNMWBlTnFlN1gmLzRgZDRVTWQ9SEJGbGVUL1FZSWhESiU8YFRGRUVNT20uTSZOaGZqL0hCdWpFOSpzVmRLbjBJTzwrRDEoOFk4M3JbPigqcFBVWUhHcU5jYFpBa2o9dFlBRGB0UlAtOVNmUT4vVGJSaVk8PHBQMGxPXiIuJ0hARGNcRGJZVTlDQlctQFJnJztQWjEqSWlfTGR0bjNjUTAhbkE8aFVxJCxQcjE4TGpkZSRXMkFwSl9LPTRmPCVzOG9bImtsWEVML2hUZnFCUV5RXik5QmouU1kyL14nIkI7ND5AcnJVaTteOzpGTFAkcDNFcSpFSEspU0txQTVHVHEsMyk/MDRdQUEnMFg7TFwuS19BYkIoKGo3TlI2VT5WWEFLJyIpZVNMQmYsQWkkJ1YtWjkwIlRoTmBAZDxlWDxPTkE4MFxtOlhOSWpmJD9Wc0hkPGpoaWN0TyhfYjRDMkVUPDpkN0piQUAyLUxsPWNRRiUxYjVjYiRYKF1LQyJEb2Q9IVxvdCI8ZEZZLmFvTEtkNEleMkFZSidWKz5GUExrO1dRImFpMlVXJjlybERMaGZHSEZlKmRYWVVEYy1LLSE6Wy1iLU5jK18uQCNlOzRDLidZUTFiYTQjUS1YIjBzZi9cWCc6dW5fWU8mI1tOIiE6Zik/SkJaUzRuZHRjbEEua2knVEcvO1c0V2QoayEySWhzPjZMOiJWRjJhS208TFolaj5aZVljPitgWHRLcENfLGFvV0JxOTlaaV5Db2hnMkpCRXRsVzJpVnEhQEBXTzVjZCtAWW8tSk1pJSRUTkYwb1xDVi5dRSpLJT8pTVZRRkklNkw0azVCUkQ2LDlgI2MkXDozIjEtLz9tbyg7dHVXWy81O3EtcF5TPlk/P0tGYD5cQl5JYW4rZFxaOD8pQ3Ribz1bZT9VP1dtW050ZGBKTj0kZVUvSiVjPHQoL188WSJBM1FPK2g0XkZwKzhVKkJZLzlQKmIyWU8oMy5QYDgldVZZLiRoXkNSa2xUOlhhKl9BMVEzQUlPO1tQW2JxalNIWy1DNVYsS3QyJGgwUHRsPmowUlszcTwlZEgqJmFkRi04cHA0QDdiS1I/ZiYhTUxuQmM+XE8mPWRvOTFgIWhhZzdbPVAnNTpfcF5cKWpjT09QPW46OVtlWkVXKzNObz1aQnMxWTBoLzlvayxuU3E2OTVhYHU3UltcXj4hTjs9TlRZaW5UKHI7VXIpRElrPDJ0Wm9qaGc1THJMISo5LV8/YjdodD50UUQ2KWg7WlB0Yj8zM0U4a0RwRVZLR2FILmY+SEpmVDwwdU5lZVRUOS1qZUpvQmhHUlE5R2FcJC5nXW0iPFxyQTMhRCxMRDZIPDE4NTs8ZmVUVHJcMW8sNWNfbX4+ZW5kc3RyZWFtCmVuZG9iagoxMCAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxMzUyCj4+CnN0cmVhbQpHYXVIS2dOKSUsJjpOLzNtLFo6NWE9K2tkcVRwK1hNKTRTLFNLcTg1JVszIXFRbSo2K1BpQklIIUBVZyovcDlAcEEyRnBsYEZUakBCP3UxIjRGRls5YydDYjlCKFlDSC1nb0giOi08JjFjMk9HXVpjU08/aHAuMGkoX10sQTYmWk5xQCZgWSpMbCRDJGo/K2FOby1kQEQxNWNIXmorQEdNW0RfMmtbV1MoO0czYidKZD05OyRkJmYoIm1NXkNVYihZdSQ/WUsvJEIhOD8mTzgvKHRFdW0nLmldbXFPM0FEKlFjVVZMRCMxZGRSXE9mQ1piI3FFKUpLVV8kcmQpRkwqJHVebidxIjI0QkcyNlhEP10vQ1k0LnQ5cls4Nm5jYyw7b18lS10tWlIiNmtpWyVvcSFmRFgoJi8oVSg0JkNVYlFXalBncTZzMyomVWBoQmUiMjZwIzdRZl8zVFQuNUohVzVFKFZjU2ItY1M9L2VJQGRkWDNBX2I8am5qLWNUZ3RHQU8jcGZUXyFzXHMsYUBhb1YsOTprSSVENnI5NlRHLDVlRTElYCU+NnI3dU9TImMwNU1fPSgiKWBFQ2VJVjtxPyFGW05RNzNPTD1VXU5sNU8+Lm81M0xVXmBQZGcnLkBfMEI1Yj48XmdrJFpCNzZvcUhfZGwpK1VKKSomPSk9M1dtPlByLlYjIVQ9R1gzT08tbVBHYSM9Z19nZC5YMGpSJGFwUCtENjFsVj5UMkJgbzBTOHJjTU4/W3JiM0BDUCNuJXMybG1mZWtYNkFiSkZSLSRiQC5fMTxIMkMxRmk9aTdoKTBUJiZIWV9XUVxTLV9TVT5KbTNnNjxzSypoZyI4XiY8S05GcCJtKyUvPU9UW2Q/NzpEXT4qJ2AuXic1ay5pJkwjaUtISWxwb2dhSFNjRUMxIipIUEBQaS86QE40KTBlNUZiTlwoPmBOY2ooNm48VGIzcFJBTXEuLzckXj0yaGInMi9EWiRQRlNRYD1nLG9ZRmxJLD80R1FnP11vISdzY0E0NmVCQ0hLSXJsYD08anFZV2Q0TEUmI1pjTERebTVgQTMoPUpRM3U7XWUjPmVpPnM2cmlYaS5VN2FVSDxBaTlALltSNCRKYE5TZikjXjQ2Oz91Zk5jRXN0LjdUUEQ7SWpjIiJDYjI5KVlMZ3FIWkhhMCRDV2o5NFNjXkRNP08icVI2NFlmXi9iR3A2OXFoJyhNSmFtLyMmSUcvQyw9WmE7O05UTk46LHVEK2wwUSxZKzpgV282dHIyPlVPT3BMOUdcJkZGZ2JxSCJkOGJiK0FgdFZrXGYmPllkbyFYaXVba1ROWClcTGMyPSJWRFlYX0pILitAVVZjZ0doJi8/JiJzQlFXOydwKFliNTBzbSRrZ29cQmpLam4ycSVmR05ORFImX0g4XVM0aWtjQFoqXW1iUSJqJXBxPkY9MzhccFMsK0cpO1k1RUE3PzJdaUNtVU03PUgtWy8rdV8yZHFbQSE0WmNtXj5ZRz8jaUJOb25JO2ZuYylJK1NoJ3FPUCYrXyZHVU84UWA9M0dFJDNkXCI1bFJJZVUkaHRHQFMhXj4sS2pvRCckJCxNWG1xUT4yMUMmQENPbiY+Ql5FbzBEJF9DOkFCZUI5WCF1a0lYbElkImFGcCQxZiU1KSE7NmpbJzhaYUhLQW8sVnUhKjlHcGRFMVltSCkmJCUkKFhzKEwoNiZIMG48VzNaQF9paFtGLDcuXWVcXFFBcnQnMTssKFArOi5aQ2RmO3FWaWRAMiclbipnLVVRWUNOKmcsL1VJJj5sJWN+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDExCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA2MSAwMDAwMCBuIAowMDAwMDAwMTAyIDAwMDAwIG4gCjAwMDAwMDAyMDkgMDAwMDAgbiAKMDAwMDAwMDMyMSAwMDAwMCBuIAowMDAwMDAwNTE0IDAwMDAwIG4gCjAwMDAwMDA3MDggMDAwMDAgbiAKMDAwMDAwMDc3NiAwMDAwMCBuIAowMDAwMDAxMDU2IDAwMDAwIG4gCjAwMDAwMDExMjEgMDAwMDAgbiAKMDAwMDAwMzI5OSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzw5OWY3YzJlNTIwMmJkZWJjZjY0ZDQ2ZjQzZTMyZmYxND48OTlmN2MyZTUyMDJiZGViY2Y2NGQ0NmY0M2UzMmZmMTQ+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDcgMCBSCi9Sb290IDYgMCBSCi9TaXplIDExCj4+CnN0YXJ0eHJlZgo0NzQzCiUlRU9GCg==",
        action: "Open PDF",
        external: false,
        download: "rascal-fake-architecture-brief.pdf",
      },
    ],
  },
  {
    id: "team2docs",
    name: "Team2Docs",
    problem:
      "Process documentation often depends on someone manually watching recordings, identifying each action, taking screenshots, and assembling a guide. This is slow, inconsistent, and easy to defer.",
    description:
      "A workflow that turns a Microsoft Teams meeting recording and transcript into a draft process document with timestamped steps and selected screenshots.",
    owner: "Gautam Janardhanan",
    unit: "PLACEHOLDER: institutional unit",
    category: "Documentation and knowledge creation",
    lifecycle: "prototype",
    contact: "Not provided",
    audience: ["Staff", "Service teams", "Knowledge authors"],
    how: "The workflow uses a Teams recording and VTT transcript as inputs. The transcript is analyzed to identify procedural steps and timestamps. ffmpeg extracts candidate frames around each timestamp, a local HTML review page lets a human choose the best screenshot for each step, and python-docx assembles the final Word process guide. AI identifies the steps; humans curate the screenshots before the final document is created.",
    resources: [
      {
        type: "Demo video",
        title: "Team2Docs walkthrough video",
        description: "Sample demo video link showing where a recorded walkthrough or workflow demo could live.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Architecture PDF",
        title: "Pipeline Architecture document",
        description: "Placeholder for the Teams recording to process document pipeline architecture PDF.",
        action: "Not attached in mockup",
        external: false,
      },
    ],
  },
  {
    id: "askari-orientation-bot",
    name: "AskAri Orientation Bot",
    problem:
      "New students receive information across many channels and often do not know where to ask basic questions about accounts, systems, orientation, or campus services.",
    description:
      "A fake student-facing orientation assistant that answers common onboarding questions and points students to the right support channels.",
    owner: "Ari Bennett",
    unit: "PLACEHOLDER: institutional unit",
    category: "Student support",
    lifecycle: "idea",
    contact: "askari-demo@example.yorku.ca",
    audience: ["Students", "Peer mentors"],
    how: "Students ask questions in plain language. The bot searches a curated orientation knowledge set, summarizes relevant answers, and recommends the next best channel when the question needs human support. Human review would be required before publishing any official guidance.",
    resources: [
      {
        type: "Demo video",
        title: "AskAri Orientation Bot walkthrough video",
        description: "Sample demo video link showing how a walkthrough or recorded demo would appear in the catalogue.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, testing notes, or service owner validation record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "formfox",
    name: "FormFox",
    problem:
      "Many forms are built from an internal process perspective rather than a user perspective, which leads to unclear fields, bad submissions, and follow-up emails.",
    description:
      "A fake form improvement assistant that reviews service request forms and suggests clearer field labels, helper text, and conditional logic.",
    owner: "Morgan Fox",
    unit: "PLACEHOLDER: institutional unit",
    category: "Service design",
    lifecycle: "idea",
    contact: "formfox-demo@example.yorku.ca",
    audience: ["Staff", "Service teams", "Form owners"],
    how: "A form owner uploads or pastes the current form questions. The assistant identifies confusing fields, duplicate questions, missing helper text, and opportunities for conditional branching. It produces a plain-language improvement summary and a revised draft form structure for human review.",
    resources: [
      {
        type: "Demo video",
        title: "FormFox walkthrough video",
        description: "Sample demo video link showing how a walkthrough or recorded demo would appear in the catalogue.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, testing notes, or service owner validation record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "policyparrot",
    name: "PolicyParrot",
    problem:
      "Frontline teams need to apply policies correctly, but policy documents are often long, formal, and hard to translate into day-to-day service decisions.",
    description:
      "A fake internal policy explainer that converts long policy documents into plain-language guidance for frontline teams.",
    owner: "Priya Nair",
    unit: "PLACEHOLDER: institutional unit",
    category: "Policy and guidance",
    lifecycle: "candidate",
    contact: "policyparrot-demo@example.yorku.ca",
    audience: ["Staff", "Service teams", "Managers"],
    how: "A user selects a policy document and asks a scenario-based question. The tool summarizes relevant sections, identifies constraints, and suggests a cautious plain-language interpretation. It does not make policy decisions; it flags when escalation or official interpretation is required.",
    resources: [
      {
        type: "Demo video",
        title: "PolicyParrot walkthrough video",
        description: "Sample demo video link showing how a walkthrough or recorded demo would appear in the catalogue.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, testing notes, or service owner validation record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "tickettriage-goblin",
    name: "TicketTriage Goblin",
    problem:
      "High ticket volumes make it difficult to quickly identify duplicates, emerging incidents, or requests that should be grouped under the same service owner.",
    description:
      "A fake triage assistant that clusters incoming tickets by issue pattern, urgency, and likely ownership.",
    owner: "Theo Goblin",
    unit: "PLACEHOLDER: institutional unit",
    category: "Operational support",
    lifecycle: "prototype",
    contact: "goblin-demo@example.yorku.ca",
    audience: ["Service desk", "Service teams", "Managers"],
    how: "The assistant reviews ticket titles, descriptions, categories, and metadata. It groups similar tickets, suggests possible ownership, and flags unusual spikes. Humans remain responsible for final triage, escalation, and customer communication.",
    resources: [
      {
        type: "Demo video",
        title: "TicketTriage Goblin walkthrough video",
        description: "Sample demo video link showing how a walkthrough or recorded demo would appear in the catalogue.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, testing notes, or service owner validation record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "meetingmule",
    name: "MeetingMule",
    problem:
      "Meeting outcomes are often buried in transcripts, chat threads, or informal notes, making it hard to track decisions and follow-through.",
    description:
      "A fake meeting follow-up assistant that turns messy meeting notes into decisions, actions, owners, and risks.",
    owner: "Maya Chen",
    unit: "PLACEHOLDER: institutional unit",
    category: "Productivity and workflow",
    lifecycle: "production",
    contact: "meetingmule-demo@example.yorku.ca",
    audience: ["Staff", "Managers", "Project teams"],
    how: "A user provides meeting notes, a transcript, or a summary. The assistant extracts decisions, action items, owners, dates, unresolved questions, and risks. The final output is reviewed by the meeting owner before being shared with attendees.",
    resources: [
      {
        type: "Demo video",
        title: "MeetingMule walkthrough video",
        description: "Sample demo video link showing how a walkthrough or recorded demo would appear in the catalogue.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, testing notes, or service owner validation record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
  {
    id: "syllabus-sprite",
    name: "Syllabus Sprite",
    problem:
      "Course syllabi can omit important support links, inconsistent expectations, or wording that creates confusion for students.",
    description:
      "A fake academic support assistant that checks course syllabi for missing student support information and accessibility-friendly wording.",
    owner: "Sophie Hart",
    unit: "PLACEHOLDER: institutional unit",
    category: "Teaching and learning",
    lifecycle: "stopped",
    contact: "sprite-demo@example.yorku.ca",
    audience: ["Faculty", "Students", "Teaching support teams"],
    how: "An instructor uploads a syllabus draft. The assistant checks for common support information, unclear deadlines, accessibility considerations, and student-facing language. It returns suggested edits and a checklist for instructor review.",
    resources: [
      {
        type: "Demo video",
        title: "Syllabus Sprite walkthrough video",
        description: "Sample demo video link showing how a walkthrough or recorded demo would appear in the catalogue.",
        url: PLACEHOLDER_DEMO_VIDEO_URL,
        action: "Watch demo",
        external: true,
      },
      {
        type: "Supporting file",
        title: "Architecture or notes PDF",
        description: "Placeholder for a PDF, architecture diagram, pilot brief, testing notes, or service owner validation record.",
        action: "Not attached",
        external: false,
      },
    ],
  },
];
