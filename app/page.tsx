import Blogs from "@/components/blogs";
import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      {/* Hero Section */}
      <Hero />
      {/* Tech Stack Section */}
      <TechStack />
      {/* Projects Section */}
      <Projects />
      {/* Blogs Section */}
      <Blogs />
      {/* Contact Section */}
      <Contact />
    </main>
  )
}

