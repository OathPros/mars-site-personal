import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathQuestions, pathResults } from "../data/process";

type Stage = { type: "question"; id: string } | { type: "result"; id: string };

export function FindMyPathPage() {
  const [stage, setStage] = useState<Stage>({ type: "question", id: "need-resources" });
  const navigate = useNavigate();

  const restart = () => setStage({ type: "question", id: "need-resources" });

  return (
    <div className="container-page max-w-3xl py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-york-red">Find My Path</p>
      <h1 className="editorial-heading mt-2 text-4xl sm:text-5xl">What do I do next?</h1>
      <p className="mt-3 text-mid-grey">
        Answer one question at a time. No need to interpret the full diagram yourself.
      </p>

      <div className="mt-10 border border-light-grey bg-white p-8 sm:p-12">
        {stage.type === "question" && (
          <QuestionCard
            questionId={stage.id}
            onAnswer={(answer) => {
              const q = pathQuestions[stage.id];
              const next = answer ? q.yes : q.no;
              if (next.resultId) setStage({ type: "result", id: next.resultId });
              else if (next.nextQuestionId) setStage({ type: "question", id: next.nextQuestionId });
            }}
          />
        )}

        {stage.type === "result" && (
          <ResultCard
            resultId={stage.id}
            onRestart={restart}
            onViewInProcess={(targetId) =>
              navigate({ pathname: "/", search: `?node=${encodeURIComponent(targetId)}` })
            }
          />
        )}
      </div>
    </div>
  );
}

function QuestionCard({
  questionId,
  onAnswer,
}: {
  questionId: string;
  onAnswer: (answer: boolean) => void;
}) {
  const q = pathQuestions[questionId];
  return (
    <div>
      <h2 className="text-2xl font-medium leading-snug text-ink">{q.question}</h2>
      {q.helpText && <p className="mt-3 text-sm text-mid-grey">{q.helpText}</p>}
      {q.examples && (
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-charcoal sm:grid-cols-2">
          {q.examples.map((ex) => (
            <li key={ex} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-york-red">•</span>
              {ex}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => onAnswer(true)}
          className="min-w-32 border-2 border-york-red bg-york-red px-6 py-3 text-base font-semibold text-white hover:bg-york-red-dark"
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="min-w-32 border-2 border-ink px-6 py-3 text-base font-semibold text-ink hover:border-york-red hover:text-york-red"
        >
          No
        </button>
      </div>
    </div>
  );
}

function ResultCard({
  resultId,
  onRestart,
  onViewInProcess,
}: {
  resultId: string;
  onRestart: () => void;
  onViewInProcess: (targetId: string) => void;
}) {
  const result = pathResults[resultId];
  return (
    <div>
      <span
        className={`inline-block text-xs font-semibold uppercase tracking-widest ${
          result.tone === "positive" ? "text-york-red" : "text-charcoal"
        }`}
      >
        Recommended next step
      </span>
      <h2 className="mt-2 text-3xl font-semibold text-ink">{result.title}</h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-charcoal">{result.body}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => onViewInProcess(result.targetNodeId)}
          className="bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-charcoal"
        >
          View this step in the process →
        </button>
        <button
          onClick={onRestart}
          className="border border-light-grey px-6 py-3 text-sm font-semibold text-mid-grey hover:border-york-red hover:text-york-red"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
