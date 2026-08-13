import { ArrowUpRight, GitPullRequest } from "lucide-react";
import { openSourceHighlights } from "@/lib/site";

export default function OpenSourceHighlights() {
  return (
    <section id="open-source" className="section-padding scroll-mt-24 border-y border-border bg-[radial-gradient(circle_at_15%_15%,hsl(var(--signal)/0.07),transparent_28rem),hsl(var(--card)/0.3)]" aria-labelledby="open-source-title">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
          <div>
            <p className="section-kicker">Third-party proof</p>
            <h2 id="open-source-title" className="section-title mt-3">
              Open-source work, reviewed and shipped.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-7 text-muted-foreground">
              Contributions across AI platforms and developer tools demonstrate
              how I debug unfamiliar systems, respond to review, and deliver
              durable fixes in public.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {openSourceHighlights.map((item, index) => (
              <article key={item.repository} className="grid gap-5 py-7 md:grid-cols-[3rem_1fr_auto] md:py-8">
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-medium tracking-tight text-foreground">{item.repository}</h3>
                    <span className="font-mono text-xs text-primary">{item.stars}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.context}</p>
                  <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{item.summary}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
                    <GitPullRequest aria-hidden="true" className="size-4 text-primary" />
                    {item.impact}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                    {item.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="link-arrow">
                        {link.label}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
