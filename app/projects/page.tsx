import { Metadata } from "next";
import ProjectFilter from "@/components/project-filter";
import ScrollAnimation from "@/components/scroll-animation";

export const metadata: Metadata = {
  title: "Projects | Prem Prakash Sharma",
  description:
    "Featured projects showcasing fullstack development, AI systems, and enterprise applications.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of projects I&apos;ve built — from AI-powered systems to
              fullstack web applications.
            </p>
          </div>
        </ScrollAnimation>

        <ProjectFilter />
      </div>
    </main>
  );
}
