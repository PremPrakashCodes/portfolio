import Link from "next/link";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";
import SectionHeader from "./section-header";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Selected work"
          title="Systems built around real constraints."
          description="A closer look at production AI workflows, event-driven processing, and product infrastructure I have designed and delivered."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>

        <div className="mt-10">
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
