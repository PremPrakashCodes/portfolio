import Link from "next/link";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";
import SectionHeader from "./section-header";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section id="systems" className="section-padding systems-section relative overflow-hidden scroll-mt-20 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <p className="section-kicker">02 / Deployed systems</p>
          <SectionHeader
            title="From uncertain input to dependable output."
            description="Production AI is an architecture problem. These systems make model behavior observable, keep slow work off request paths, and preserve control at every handoff."
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} {...project} featured={index === 0} />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/projects"
            className="link-arrow"
          >
            View All Projects
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
