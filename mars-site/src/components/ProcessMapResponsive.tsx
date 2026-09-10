import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProcessMap } from "./ProcessMap";
import { MobileProcessList } from "./MobileProcessList";

export function ProcessMapResponsive({ height = "80vh", compact = false }: { height?: string; compact?: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeParam = searchParams.get("node") ?? undefined;

  useEffect(() => {
    if (!nodeParam) return;
    const timer = window.setTimeout(() => {
      const map = document.getElementById("process-map");
      if (!map) return;
      const y = map.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (map.offsetHeight / 2);
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [nodeParam]);

  return (
    <div>
      <div className="hidden md:block">
        <ProcessMap
          height={height}
          compact={compact}
          initialSelected={nodeParam}
          onSelectedChange={(id) => {
            const next = new URLSearchParams(searchParams);
            if (id) next.set("node", id);
            else next.delete("node");
            setSearchParams(next, { replace: true });
          }}
        />
      </div>
      <div className="md:hidden">
        <MobileProcessList initialSelected={nodeParam} />
      </div>
    </div>
  );
}
