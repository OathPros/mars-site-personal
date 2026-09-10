import type { GuideField, GuideSection } from "../data/guides";

/** Triggers a client-side download of a Blob under the given filename. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function fieldAnswer(answers: Record<string, string>, field: GuideField): string {
  const value = answers[field.id]?.trim();
  return value || "_Not answered._";
}

/** Turns free text into a short, filename- and id-safe slug. */
export function slugify(text: string, fallback = "untitled"): string {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || fallback;
}

/** Splits a free-text answer on commas or newlines into a trimmed string array. */
function toStringArray(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function tsStringLiteral(text: string): string {
  return JSON.stringify(text);
}

const RICKROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";

/**
 * Generates a lightweight, point-in-time Markdown snapshot of whatever has
 * been answered so far in any guide. Used for the "save a backup" export
 * that is available at every step, not just once the guide is fully complete.
 */
export function generateAnswersSnapshotMarkdown(
  title: string,
  sections: GuideSection[],
  answers: Record<string, string>,
): string {
  const lines: string[] = [];
  lines.push(`# ${title}: in-progress draft`);
  lines.push("");
  lines.push(
    `_Backup exported ${new Date().toLocaleString()}. This is a snapshot of your answers so far, not a final output._`,
  );
  lines.push("");

  for (const section of sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const field of section.fields) {
      lines.push(`### ${field.label}`);
      lines.push("");
      lines.push(fieldAnswer(answers, field));
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * Generates a Markdown export of a fully completed guide (as opposed to
 * generateAnswersSnapshotMarkdown's "in-progress draft" framing). Used by
 * guides whose primary output is a .docx but that also want to offer a
 * plain-Markdown copy of the same completed answers, e.g. the Production
 * Readiness Guide.
 */
export function generateCompletedGuideMarkdown(
  title: string,
  sections: GuideSection[],
  answers: Record<string, string>,
  footerNote?: string,
): string {
  const lines: string[] = [];
  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`_Generated ${new Date().toLocaleString()}._`);
  lines.push("");

  for (const section of sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const field of section.fields) {
      lines.push(`### ${field.label}`);
      lines.push("");
      lines.push(fieldAnswer(answers, field));
      lines.push("");
    }
  }

  if (footerNote) {
    lines.push("---");
    lines.push("");
    lines.push(`_${footerNote}_`);
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Turns Ideation Guide answers into a Markdown spec designed to be dropped
 * straight into an AI coding assistant (Copilot, etc.) as project context
 * for vibe-coding a first working version of the idea.
 */
export function generateIdeationMarkdown(sections: GuideSection[], answers: Record<string, string>): string {
  const projectName = answers.projectName?.trim() || "Untitled idea";
  const lines: string[] = [];

  lines.push(`# ${projectName}: Ideation Spec`);
  lines.push("");
  lines.push(`_Generated from the MARS Ideation Guide on ${new Date().toLocaleDateString()}._`);
  lines.push("");
  lines.push(
    "> This file was generated to help you vibe-code a first working version with an AI coding assistant. Paste it in as project context, or keep it open alongside your prompts.",
  );
  lines.push("");

  for (const section of sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const field of section.fields) {
      lines.push(`### ${field.label}`);
      lines.push("");
      lines.push(fieldAnswer(answers, field));
      lines.push("");
    }
  }

  lines.push("## Suggested first prompt");
  lines.push("");
  lines.push("```");
  lines.push(`Build a first working version of "${projectName}".`);
  lines.push("");
  lines.push(`Problem: ${answers.problem?.trim() || "(see above)"}`);
  lines.push(`Primary users: ${answers.audience?.trim() || "(see above)"}`);
  lines.push(`Main scenario: ${answers.keyScenarios?.trim() || "(see above)"}`);
  lines.push(`Success looks like: ${answers.successCriteria?.trim() || "(see above)"}`);
  if (answers.constraintsNonGoals?.trim()) {
    lines.push(`Out of scope for now: ${answers.constraintsNonGoals.trim()}`);
  }
  lines.push("");
  lines.push("Ask me clarifying questions before assuming anything not covered above.");
  lines.push("```");
  lines.push("");

  return lines.join("\n");
}

/**
 * Turns Ideation Guide answers into a ready-to-paste `PluginRecord` entry
 * (see src/data/inventory.ts), so an idea captured through the guide can be
 * added to the AI Inventory without retyping anything. Returned as a
 * Markdown file with an explanation plus a fenced TypeScript code block.
 */
export function generateInventoryEntryMarkdown(answers: Record<string, string>): string {
  const projectName = answers.projectName?.trim() || "Untitled idea";
  const slug = slugify(projectName, "untitled-idea");
  const audience = toStringArray(answers.audience);
  const how = answers.techApproach?.trim() || answers.keyScenarios?.trim() || "PLACEHOLDER: how this works";
  const description =
    answers.shortDescription?.trim() || answers.desiredOutcome?.trim() || "PLACEHOLDER: short description";
  const problem = answers.problem?.trim() || "PLACEHOLDER: problem statement";
  const owner = answers.ownerName?.trim() || "PLACEHOLDER: owner name";
  const unit = answers.unit?.trim() || "PLACEHOLDER: institutional unit";
  const contact = answers.contact?.trim() || "PLACEHOLDER: contact email";

  const audienceTs = audience.length > 0 ? audience.map(tsStringLiteral).join(", ") : `${tsStringLiteral("PLACEHOLDER: audience")}`;

  const snippet = `{
  id: ${tsStringLiteral(slug)},
  name: ${tsStringLiteral(projectName)},
  problem: ${tsStringLiteral(problem)},
  description: ${tsStringLiteral(description)},
  owner: ${tsStringLiteral(owner)},
  unit: ${tsStringLiteral(unit)},
  category: ${tsStringLiteral("PLACEHOLDER: category")},
  lifecycle: "idea",
  contact: ${tsStringLiteral(contact)},
  audience: [${audienceTs}],
  how: ${tsStringLiteral(how)},
  resources: [
    {
      type: "Demo video",
      title: ${tsStringLiteral(`${projectName} walkthrough video`)},
      description: "Placeholder demo video link showing where a recorded walkthrough could live.",
      url: ${tsStringLiteral(RICKROLL_URL)},
      action: "Watch demo",
      external: true,
    },
  ],
}`;

  const lines: string[] = [];
  lines.push(`# ${projectName}: AI Inventory entry`);
  lines.push("");
  lines.push(`_Generated from the MARS Ideation Guide on ${new Date().toLocaleDateString()}._`);
  lines.push("");
  lines.push(
    "> This file captures your idea in the shape the AI Inventory expects. Share it with the MARS team, or paste the snippet below directly into the `pluginRecords` array in `src/data/inventory.ts`.",
  );
  lines.push("");
  lines.push("## Plugin record");
  lines.push("");
  lines.push("```ts");
  lines.push(snippet);
  lines.push("```");
  lines.push("");
  lines.push(
    "Review every `PLACEHOLDER:` value before submitting. Fields left blank in the Ideation Guide were filled with a placeholder here so the entry stays valid.",
  );
  lines.push("");

  return lines.join("\n");
}

/**
 * Builds a York-branded Word document (.docx) from any guide's sections and
 * answers, using the `docx` library so it can run entirely client-side. This
 * is the shared builder behind every .docx export offered by any guide
 * (Ideation, Production Readiness, and the in-progress "draft" snapshots).
 */
async function buildBrandedDocx(options: {
  title: string;
  subtitle?: string;
  metaLines?: string[];
  noteItalic?: string;
  sections: GuideSection[];
  answers: Record<string, string>;
  footerText: string;
  skipSectionIds?: string[];
}): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = await import("docx");

  const YORK_RED = "E31837";
  const INK = "1A1A1A";
  const MID_GREY = "6B6B6B";

  const { title, subtitle, metaLines = [], noteItalic, sections, answers, footerText, skipSectionIds = [] } = options;

  const children: InstanceType<typeof Paragraph>[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      border: { bottom: { color: YORK_RED, space: 4, style: BorderStyle.SINGLE, size: 24 } },
      children: [new TextRun({ text: "YORK UNIVERSITY", bold: true, color: YORK_RED, size: 20 })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: title, color: INK })],
      spacing: { after: subtitle ? 100 : 200 },
    }),
  );

  if (subtitle) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: subtitle, color: YORK_RED })],
        spacing: { after: 200 },
      }),
    );
  }

  for (const line of metaLines) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: line, color: MID_GREY, size: 20 })],
        spacing: { after: 100 },
      }),
    );
  }

  if (noteItalic) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: noteItalic, italics: true, color: INK })],
        spacing: { before: metaLines.length > 0 ? 200 : 0, after: 400 },
      }),
    );
  } else if (metaLines.length > 0) {
    children.push(new Paragraph({ children: [], spacing: { after: 200 } }));
  }

  for (const section of sections) {
    if (skipSectionIds.includes(section.id)) continue;

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true,
        children: [new TextRun({ text: section.title, color: INK })],
        spacing: { before: 300, after: 150 },
      }),
    );

    for (const field of section.fields) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun({ text: field.label, color: YORK_RED })],
          spacing: { before: 200, after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: fieldAnswer(answers, field), color: INK })],
          spacing: { after: 100 },
        }),
      );
    }
  }

  children.push(
    new Paragraph({
      spacing: { before: 500 },
      border: { top: { color: "CCCCCC", space: 4, style: BorderStyle.SINGLE, size: 6 } },
      children: [new TextRun({ text: footerText, italics: true, color: MID_GREY, size: 18 })],
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

/**
 * Builds a York-branded Word document (.docx) from Production Readiness
 * Guide answers, using the `docx` library so it can run entirely client-side.
 */
export async function generateProductionReadinessDocx(
  sections: GuideSection[],
  answers: Record<string, string>,
): Promise<Blob> {
  const solutionName = answers.solutionName?.trim() || "Untitled solution";
  const preparedBy = answers.preparedBy?.trim() || "Not provided";
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return buildBrandedDocx({
    title: "Production Readiness Request",
    subtitle: solutionName,
    metaLines: [`Prepared by: ${preparedBy}`, `Generated: ${today}`],
    noteItalic: answers.summary?.trim(),
    sections,
    answers,
    footerText: "Generated by the MARS Production Readiness Guide. Review and edit before submitting for governance review.",
    skipSectionIds: ["overview"],
  });
}

/**
 * Builds a York-branded Word document (.docx) version of the Ideation Guide
 * spec, mirroring generateIdeationMarkdown so ideas can be shared as a .docx
 * as well as a .md file.
 */
export async function generateIdeationDocx(
  sections: GuideSection[],
  answers: Record<string, string>,
): Promise<Blob> {
  const projectName = answers.projectName?.trim() || "Untitled idea";
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return buildBrandedDocx({
    title: "Ideation Spec",
    subtitle: projectName,
    metaLines: [`Generated: ${today}`],
    noteItalic:
      "This file was generated to help you vibe-code a first working version with an AI coding assistant. Paste it in as project context, or keep it open alongside your prompts.",
    sections,
    answers,
    footerText: "Generated by the MARS Ideation Guide.",
  });
}

/**
 * Builds a York-branded Word document (.docx) snapshot of whatever has been
 * answered so far in any guide, mirroring generateAnswersSnapshotMarkdown so
 * an in-progress guide can be backed up as a .docx as well as a .md file.
 */
export async function generateAnswersSnapshotDocx(
  title: string,
  sections: GuideSection[],
  answers: Record<string, string>,
): Promise<Blob> {
  return buildBrandedDocx({
    title: `${title}: In-Progress Draft`,
    metaLines: [`Backup exported: ${new Date().toLocaleString()}`],
    noteItalic: "This is a snapshot of your answers so far, not a final output.",
    sections,
    answers,
    footerText: "This is an in-progress snapshot, not a final submission.",
  });
}
