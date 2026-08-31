import { Metadata } from "next";
import ProjectFilter from "@/components/project-filter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies in production AI systems, event-driven document processing, payment infrastructure, and full-stack product development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <p className="section-kicker">System archive / 04 cases</p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[1.01] tracking-[-0.055em] text-foreground md:text-7xl">
              Systems designed for <span className="highlight-text">production.</span>
            </h1>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              Production systems shaped by operational constraints, product goals,
              and the need to remain understandable after launch.
            </p>
            <dl className="mt-7 grid grid-cols-2 border-y border-border py-4 font-mono text-[0.62rem] uppercase tracking-[0.12em]">
              <div>
                <dt className="text-muted-foreground">Archive state</dt>
                <dd className="mt-1 flex items-center gap-2 text-primary"><span className="size-1.5 bg-primary" /> Online</dd>
              </div>
              <div className="border-l border-border pl-5">
                <dt className="text-muted-foreground">Domains</dt>
                <dd className="mt-1 text-foreground">AI / Web / Infra</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <ProjectFilter />
        </div>
      </div>
    </main>
  );
}
