import { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Thoughts on fullstack development, AI systems, and engineering best practices.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main id="main-content" className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container mx-auto px-4 md:px-6">
        <header className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <p className="section-kicker">Engineering notes</p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[1.01] tracking-[-0.055em] text-foreground md:text-7xl">
              Ideas tested in <span className="highlight-text">production.</span>
            </h1>
          </div>
          <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
            Field notes on full-stack development, AI systems, and the engineering decisions behind software that has to keep working after launch.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <section className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3" aria-label="Published articles">
            {posts.map((post) => (
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
          </section>
        )}
      </div>
    </main>
  );
}
