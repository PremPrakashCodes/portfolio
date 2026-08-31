import { ArrowUpRight, GitPullRequest, Star } from "lucide-react";
import { openSourceHighlights } from "@/lib/site";

export default function ContributionsGrid() {
  return (
    <div className="border-x border-t border-border bg-background/25">
      {openSourceHighlights.map((item, index) => (
        <article key={item.repository} className="group relative border-b border-border p-6 transition-colors hover:bg-card/50 md:p-8">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100" />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary">MERGED / 0{index + 1}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-foreground md:text-2xl">{item.repository}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.context}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 border border-border bg-background/60 px-3 py-1 font-mono text-xs text-primary">
              <Star aria-hidden="true" className="size-3" />
              {item.stars}
            </span>
          </div>
          <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{item.summary}</p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <GitPullRequest aria-hidden="true" className="size-4 text-signal" />
            {item.impact}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {item.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="link-arrow py-1">
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
