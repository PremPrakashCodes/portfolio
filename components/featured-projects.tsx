import Link from "next/link";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";
import SectionHeader from "./section-header";
import ScrollAnimation from "./scroll-animation";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <SectionHeader
            title="Featured Work"
            description="Recent projects showcasing fullstack development and AI integration."
          />
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {featured.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
}
