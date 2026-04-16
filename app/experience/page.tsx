import { Metadata } from "next";
import ExperienceTimeline from "@/components/experience-timeline";
import TechStackGrid from "@/components/tech-stack-grid";
import ContributionsGrid from "@/components/contributions-grid";
import EducationCertifications from "@/components/education-certifications";
import SectionHeader from "@/components/section-header";
import ScrollAnimation from "@/components/scroll-animation";

export const metadata: Metadata = {
  title: "Experience | Prem Prakash Sharma",
  description:
    "Work experience, tech stack, certifications, and open source contributions.",
};

export default function ExperiencePage() {
  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6 space-y-28">
        {/* Work Timeline */}
        <section>
          <ScrollAnimation animation="fade-up">
            <SectionHeader
              title="Experience"
              description="My professional journey building web and AI systems."
            />
          </ScrollAnimation>
          <div className="mt-16">
            <ExperienceTimeline />
          </div>
        </section>

        {/* Education & Certifications */}
        <section>
          <ScrollAnimation animation="fade-up">
            <SectionHeader
              title="Education & Certifications"
              description="Academic background and professional credentials."
            />
          </ScrollAnimation>
          <div className="mt-16">
            <EducationCertifications />
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <ScrollAnimation animation="fade-up">
            <SectionHeader
              title="Tech Stack"
              description="Technologies I work with daily."
            />
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" className="mt-16">
            <TechStackGrid />
          </ScrollAnimation>
        </section>

        {/* Open Source */}
        {process.env.NEXT_PUBLIC_GITHUB_USERNAME && (
          <section>
            <ScrollAnimation animation="fade-up">
              <SectionHeader
                title="Open Source"
                description="Contributions to the open source community."
              />
            </ScrollAnimation>
            <div className="mt-16">
              <ContributionsGrid />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
