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

        <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {posts.slice(0, 3).map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              readTime={post.readTime}
              tags={post.tags}
              slug={post.slug}
              image={post.image}
            />
          ))}
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
