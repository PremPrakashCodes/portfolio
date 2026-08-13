import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import BlogCard from "./blog-card";
import SectionHeader from "./section-header";
import { ArrowRight } from "lucide-react";

export default async function LatestBlog() {
  const posts = await getPublishedPosts();
  const latest = posts[0];

  if (!latest) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Writing"
          title="Notes from the work."
          description="Field notes on full-stack development, AI systems, and the engineering decisions behind production software."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="link-arrow"
          >
            View All Posts
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
