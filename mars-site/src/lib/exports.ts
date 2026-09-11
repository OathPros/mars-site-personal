import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import type { AideDraft, SolutionRecord } from "../domain/model";

const fields: [keyof SolutionRecord, string][] = [["summary","Summary"],["problem","Problem or need"],["intendedOutcome","Intended outcome"],["intendedUsers","Intended users"],["unit","York unit"],["owner","Owner or contact"],["platform","Platform"],["dataConsiderations","Data considerations"],["integrations","Integrations"],["resourceNeeds","Resource needs"],["supportModel","Support model"],["costs","Costs"],["risks","Risks"],["successMeasures","Success measures"],["nextAction","Next action"]];

export function solutionMarkdown(record: SolutionRecord) {
  return [`# ${record.name || "Untitled solution"}`, "", "> Prototype browser-local export; not an institutional submission.", "", ...fields.flatMap(([key,label]) => [`## ${label}`, "", String(record[key] || "Not provided"), ""]), "## Status", "", `- Lifecycle: ${record.lifecycleStage}`, `- Review: ${record.reviewState}`, `- Governance route: ${record.governanceRoute}`, `- Disposition: ${record.disposition}`, `- Service: ${record.serviceState}`, ""].join("\n");
}

export function aideMarkdown(record: SolutionRecord, draft: AideDraft) {
  return [`# AIDE Committee review package: ${record.name}`, "", "> Export only. This package has not been submitted to York University or the AIDE Committee.", "", `## Help requested\n\n${draft.helpType}`, `## What changed or is missing\n\n${draft.changedInformation || "No changes provided."}`, `## Questions\n\n${draft.questions || "No questions provided."}`, "", solutionMarkdown(record)].join("\n");
}

export async function markdownDocx(markdown: string): Promise<Blob> {
  const children = markdown.split("\n").filter(line => line.trim()).map(line => {
    if (line.startsWith("# ")) return new Paragraph({ text: line.slice(2), heading: HeadingLevel.TITLE });
    if (line.startsWith("## ")) return new Paragraph({ text: line.slice(3), heading: HeadingLevel.HEADING_1 });
    if (line.startsWith("- ")) return new Paragraph({ text: line.slice(2), bullet: { level: 0 } });
    return new Paragraph({ children: [new TextRun(line.replace(/^> /, ""))] });
  });
  return Packer.toBlob(new Document({ sections: [{ children }] }));
}

export function download(blob: Blob, filename: string) { const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 0); }
