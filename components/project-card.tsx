"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: readonly string[];
  github: string;
  demo: string;
};

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

      <div className="relative h-full flex flex-col glass-card p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white/90">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-gray-400 flex-1">
          {description}
        </p>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/[0.03] border border-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                Source
              </Link>
            )}
            {demo && (
              <Link
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto"
              >
                Live Demo
                <FaExternalLinkAlt className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
