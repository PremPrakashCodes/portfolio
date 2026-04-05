"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";

export default function ProjectFilter() {
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => (p.tags as readonly string[]).includes(activeTag))
    : projects;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeTag === null
              ? "bg-blue-500 text-white"
              : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTag === tag
                ? "bg-blue-500 text-white"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? "all"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
