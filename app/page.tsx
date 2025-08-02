import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />
      {/* Tech Stack Section */}
      <TechStack />
      {/* Experience Section */}
      <Experience />
      {/* Education Section */}
      <Education />
      {/* Certificates Section */}
      <Certificates />
      {/* Projects Section */}
      <Projects />
      {/* Blogs Section */}
      {/* <Blogs /> */}
      {/* Contact Section */}
      <Contact />
    </main>
  );
}
