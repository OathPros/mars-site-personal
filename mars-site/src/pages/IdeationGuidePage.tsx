import { GuidedForm } from "../components/GuidedForm";
import { ideationGuideSections } from "../data/guides";
import {
  downloadBlob,
  generateAnswersSnapshotDocx,
  generateAnswersSnapshotMarkdown,
  generateIdeationDocx,
  generateIdeationMarkdown,
  generateInventoryEntryMarkdown,
  slugify,
} from "../lib/guideExport";

export function IdeationGuidePage() {
  return (
    <GuidedForm
      storageKey="mars-ideation-guide-v1"
      eyebrow="Getting Started"
      title="Ideation Guide"
      intro="A coached set of questions that turns your idea into a short spec you can hand straight to an AI coding assistant to start vibe-coding a first working version."
      backLink={{ label: "Back to Build with MARS", href: "/build" }}
      sections={ideationGuideSections}
      quickExportHelp="Your answers are also autosaved to this browser as you go, but you can export a backup snapshot at any point, in either format, even if you haven't finished every question."
      quickExports={[
        {
          label: "Export progress (.md)",
          onExport: (answers) => {
            const slug = slugify(answers.projectName?.trim() || "ideation-draft", "ideation-draft");
            const markdown = generateAnswersSnapshotMarkdown("Ideation Guide", ideationGuideSections, answers);
            downloadBlob(new Blob([markdown], { type: "text/markdown;charset=utf-8" }), `${slug}-ideation-draft.md`);
          },
        },
        {
          label: "Export progress (.docx)",
          onExport: async (answers) => {
            const slug = slugify(answers.projectName?.trim() || "ideation-draft", "ideation-draft");
            const blob = await generateAnswersSnapshotDocx("Ideation Guide", ideationGuideSections, answers);
            downloadBlob(blob, `${slug}-ideation-draft.docx`);
          },
        },
      ]}
      completeActions={[
        {
          label: "Generate Markdown file",
          help: "Downloads a .md file structured as project context and a suggested first prompt for your AI coding assistant.",
          primary: true,
          onClick: (answers) => {
            const markdown = generateIdeationMarkdown(ideationGuideSections, answers);
            const projectSlug = slugify(answers.projectName?.trim() || "ideation-spec", "ideation-spec");
            downloadBlob(new Blob([markdown], { type: "text/markdown;charset=utf-8" }), `${projectSlug}-ideation-spec.md`);
          },
        },
        {
          label: "Generate Word document",
          help: "Downloads a York-branded .docx version of the same Ideation Spec.",
          onClick: async (answers) => {
            const blob = await generateIdeationDocx(ideationGuideSections, answers);
            const projectSlug = slugify(answers.projectName?.trim() || "ideation-spec", "ideation-spec");
            downloadBlob(blob, `${projectSlug}-ideation-spec.docx`);
          },
        },
        {
          label: "Export AI Inventory entry",
          help: "Downloads a .md file with a ready-to-paste plugin record so this idea can be added to the AI Inventory.",
          onClick: (answers) => {
            const slug = slugify(answers.projectName?.trim() || "untitled-idea", "untitled-idea");
            const markdown = generateInventoryEntryMarkdown(answers);
            downloadBlob(new Blob([markdown], { type: "text/markdown;charset=utf-8" }), `${slug}-inventory-entry.md`);
          },
        },
      ]}
    />
  );
}
