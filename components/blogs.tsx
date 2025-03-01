"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import SectionHeader from "./section-header";

const blogPosts = [
  {
    title: "Building Modern Web Applications with Next.js",
    excerpt:
      "Explore the power of Next.js 13 and learn how to create fast, SEO-friendly web applications with the latest features.",
    date: "Feb 15, 2024",
    readTime: "5 min read",
    tags: ["Next.js", "React", "Web Development"],
    link: "#",
  },
  {
    title: "Mastering Tailwind CSS: From Basics to Advanced",
    excerpt: "Deep dive into Tailwind CSS, exploring advanced concepts, best practices, and optimization techniques.",
    date: "Feb 10, 2024",
    readTime: "7 min read",
    tags: ["CSS", "Tailwind", "Frontend"],
    link: "#",
  },
  {
    title: "The Future of Frontend Development",
    excerpt: "Insights into emerging trends, tools, and technologies shaping the future of frontend development.",
    date: "Feb 5, 2024",
    readTime: "6 min read",
    tags: ["Frontend", "Web Development", "Trends"],
    link: "#",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-14 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/0"
        style={{
          maskImage: "radial-gradient(ellipse at center, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <SectionHeader
            title="Latest Blog Posts"
            description="Thoughts, tutorials and insights about web development"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.a
                key={post.title}
                href={post.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col"
              >
                {/* Gradient background that shows on hover */}
                <div
                  className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200"
                  style={{ opacity: 0.05 }}
                />

                {/* Card Content */}
                <div className="relative h-full flex flex-col bg-gray-950 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                  <div className="flex flex-col h-full min-h-64">
                    {/* Meta information */}
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition duration-300 mt-4">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition duration-300 mt-4 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="space-y-4 mt-auto pt-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-zinc-800/50 text-zinc-400 border border-white/5 group-hover:border-white/10 transition duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition duration-300 pt-4 border-t border-white/10">
                        Read More
                        <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
