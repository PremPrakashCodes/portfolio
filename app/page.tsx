import AboutSection from "@/components/about-section";
import FeaturedProjects from "@/components/featured-projects";
import LatestBlog from "@/components/latest-blog";
import ThreeHeroClient from "@/components/three-hero-client";

export default function Home() {
  return (
    <main id="main-content">
      <ThreeHeroClient />
      <AboutSection />
      <FeaturedProjects />
      <LatestBlog />
    </main>
  );
}
