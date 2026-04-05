import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
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
    rehypePlugins: [
      [rehypePrettyCode, { theme: "github-dark-dimmed" }],
    ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return (
    <article className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {post.image && (
          <div className="max-w-3xl mx-auto mb-10 rounded-xl overflow-hidden border border-white/10">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <TableOfContents content={post.content} />
          <MDXContent components={components} />
        </div>
      </div>
    </article>
  );
}
