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
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-14 max-w-3xl">
          <p className="section-kicker">Case studies</p>
          <h1 className="section-title mt-3">Selected engineering work.</h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            Production systems shaped by operational constraints, product goals,
            and the need to remain understandable after launch.
          </p>
        </div>

        <ProjectFilter />
      </div>
    </main>
  );
}
