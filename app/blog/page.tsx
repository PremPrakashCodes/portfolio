import { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import ScrollAnimation from "@/components/scroll-animation";

export const metadata: Metadata = {
  title: "Blog | Prem Prakash Sharma",
  description:
    "Thoughts on fullstack development, AI systems, and engineering best practices.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Writing about fullstack development, AI integration, and
              engineering lessons from the field.
            </p>
          </div>
        </ScrollAnimation>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                readTime={post.readTime}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </ScrollAnimation>
        )}
      </div>
    </main>
  );
}
