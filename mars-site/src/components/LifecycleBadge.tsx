import type { LifecycleStage } from "../data/process";
import { lifecycleStages } from "../data/process";
import clsx from "clsx";

const styles: Record<LifecycleStage, string> = {
  idea: "bg-white text-ink border border-light-grey",
  prototype: "bg-charcoal text-white border border-charcoal",
  candidate: "bg-[#FFF4F5] text-york-red-dark border border-york-red",
  initiative: "bg-ink text-white border border-ink",
  production: "bg-york-red text-white border border-york-red-dark",
  stopped: "bg-[#F1F1F1] text-mid-grey border border-mid-grey",
  redirected: "bg-[#F1F1F1] text-mid-grey border border-mid-grey",
};

/** Softer pill palette used by catalogue-style card layouts (e.g. the plugin inventory). */
const pillStyles: Record<LifecycleStage, string> = {
  idea: "bg-[#f4f0ff] text-[#5d3c91] border border-transparent",
  prototype: "bg-[#fff5e6] text-[#8a5b00] border border-transparent",
  candidate: "bg-[#eef5ff] text-[#1d4f91] border border-transparent",
  initiative: "bg-[#eaeaea] text-[#25262a] border border-transparent",
  production: "bg-[#edf8ed] text-[#285b28] border border-transparent",
  stopped: "bg-[#f2f3f5] text-[#5b6069] border border-transparent",
  redirected: "bg-[#f7eeee] text-[#7d2f2f] border border-transparent",
};

export function LifecycleBadge({
  stage,
  className,
  variant = "square",
}: {
  stage: LifecycleStage;
  className?: string;
  variant?: "square" | "pill";
}) {
  const meta = lifecycleStages.find((s) => s.id === stage);
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium uppercase tracking-wide",
        variant === "pill" ? clsx("rounded-full font-semibold", pillStyles[stage]) : clsx("rounded-none", styles[stage]),
        className,
      )}
      title={meta?.description}
    >
      {meta?.label ?? stage}
    </span>
  );
}
