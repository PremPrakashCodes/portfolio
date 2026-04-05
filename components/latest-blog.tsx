import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import BlogCard from "./blog-card";
import SectionHeader from "./section-header";
import ScrollAnimation from "./scroll-animation";
import { ArrowRight } from "lucide-react";

export default async function LatestBlog() {
  const posts = await getPublishedPosts();
  const latest = posts[0];

  if (!latest) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <SectionHeader
            title="Latest from the Blog"
            description="Thoughts on fullstack development, AI systems, and engineering."
          />
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" className="max-w-2xl mx-auto mt-16">
          <BlogCard
            title={latest.title}
            description={latest.description}
            date={latest.date}
            readTime={latest.readTime}
            tags={latest.tags}
            slug={latest.slug}
          />
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
}
