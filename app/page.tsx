import Blogs from "@/components/blogs";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Tech Stack Section */}
      <TechStack />
      {/* Experience Section */}
      <Experience />
      {/* Projects Section */}
      <Projects />
      {/* Blogs Section */}
      <Blogs />
      {/* Contact Section */}
      <Contact />
    </>
  )
}

