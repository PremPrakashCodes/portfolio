"use client";

import { useEffect, useId, useState } from "react";

let renderSequence = 0;

export default function MermaidDiagram({
  chart,
  caption,
}: {
  chart: string;
  caption: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSvg("");
    setFailed(false);

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        if (cancelled) return;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "dark",
          fontFamily: "Arial, Helvetica, sans-serif",
          flowchart: { htmlLabels: false, useMaxWidth: true, curve: "linear" },
        });
        const result = await mermaid.render(`diagram-${id}-${++renderSequence}`, chart);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void render();
    return () => { cancelled = true; };
  }, [chart, id]);

  return (
    <figure className="my-10">
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-4 md:p-6">
        {svg ? (
          <div className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:min-w-[480px]" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="py-10 text-sm leading-6 text-muted-foreground" role="status">
            {failed ? "The diagram could not load. Its description is available below." : "Loading diagram…"}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
