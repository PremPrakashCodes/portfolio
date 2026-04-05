import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Contributions from "@/components/contributions";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Experience />
      <Education />
      <Certificates />
      <Projects />
      <Contributions />
      <Contact />
    </main>
  );
}
