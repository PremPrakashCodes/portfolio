import AboutSection from "@/components/about-section";
import FeaturedProjects from "@/components/featured-projects";
import HeroSection from "@/components/hero-section";
import LatestBlog from "@/components/latest-blog";
import OpenSourceHighlights from "@/components/open-source-highlights";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Prem Prakash Sharma",
    jobTitle: "AI Engineer",
    url: "https://premprakash.dev",
    knowsAbout: [
      "Artificial intelligence",
      "Backend development",
      "Python",
      "TypeScript",
      "FastAPI",
      "Node.js",
      "Amazon Web Services",
    ],
  },
};

export default function Home() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <HeroSection />
      <FeaturedProjects />
      <OpenSourceHighlights />
      <AboutSection />
      <LatestBlog />
    </main>
  );
}
