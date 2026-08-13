import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import TableOfContents from "./table-of-contents";
import { BlogPost } from "@/lib/blog";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getMDXComponents } from "./mdx-components";
import rehypePrettyCode from "rehype-pretty-code";

export default async function BlogPostLayout({ post }: { post: BlogPost }) {
  const components = getMDXComponents({});
  const { default: MDXContent } = await evaluate(post.content, {
    ...runtime,
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const publishedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const articleUrl = `https://premprakash.dev/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: articleUrl,
    image: post.image ? `https://premprakash.dev${post.image}` : undefined,
    author: {
      "@type": "Person",
      name: "Prem Prakash Sharma",
      url: "https://premprakash.dev",
    },
  };

  return (
    <article className="pb-24 pt-28 md:pb-32 md:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <Link href="/blog" className="link-arrow">
            <ArrowLeft aria-hidden="true" className="size-4" />
            All writing
          </Link>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[0.7rem] text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground md:text-7xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
                {post.description}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-3 border-y border-border py-5 text-sm lg:grid-cols-1 lg:border-y-0 lg:border-l lg:py-0 lg:pl-8">
              <div>
                <dt className="sr-only">Published</dt>
                <dd className="flex items-center gap-2 whitespace-nowrap text-muted-foreground">
                  <Calendar aria-hidden="true" className="size-4" />
                  <time dateTime={post.date}>{publishedDate}</time>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Reading time</dt>
                <dd className="flex items-center gap-2 whitespace-nowrap text-muted-foreground">
                  <Clock aria-hidden="true" className="size-4" />
                  {post.readTime}
                </dd>
              </div>
            </dl>
          </div>

          {post.image && (
            <figure className="relative mt-12 aspect-[16/8.5] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_100px_hsl(var(--primary)/0.1)] md:mt-16">
              <Image
                src={post.image}
                alt={`Cover illustration for ${post.title}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
            </figure>
          )}
        </div>
      </header>

      <div className="container mx-auto mt-12 px-4 md:mt-16 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,44rem)_15rem] lg:items-start lg:justify-between lg:gap-20">
          <div className="min-w-0">
            <div className="mb-10 flex items-center gap-4 border-y border-border py-5">
              <Image src="/images/profile-image.png" alt="Prem Prakash Sharma" width={48} height={48} className="size-12 rounded-full border border-border object-cover" />
              <div>
                <p className="font-medium text-foreground">Prem Prakash Sharma</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Software developer writing from hands-on experience.</p>
              </div>
            </div>

            <div className="lg:hidden">
              <TableOfContents content={post.content} />
            </div>

            <div className="article-body">
              <MDXContent components={components} />
            </div>

            <footer className="mt-16 border-t border-border pt-8">
              <p className="section-kicker">Continue the conversation</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">Working through a similar engineering problem?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Explore the systems behind the story or send me the context on what you&apos;re building.
              </p>
              <div className="mt-6 flex flex-wrap gap-5">
                <Link href="/projects" className="link-arrow">
                  View case studies
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link href="/contact" className="link-arrow">
                  Start a conversation
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </footer>
          </div>

          <aside className="sticky top-28 hidden lg:block" aria-label="Article navigation">
            <TableOfContents content={post.content} />
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Filed under</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Career · Engineering · Building in public</p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
