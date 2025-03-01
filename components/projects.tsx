"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import SectionHeader from "./section-header";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-14 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="space-y-16">
          {/* Section Header */}
          <SectionHeader
            title="Featured Projects"
            description="Here are some of my recent projects that showcase my technical skills and problem-solving abilities."
          />

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                {/* Gradient background that shows on hover */}
                <div
                  className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200"
                  style={{ opacity: 0.05 }}
                />

                {/* Card Content */}
                <div className="relative h-full flex flex-col bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                  {/* Project Header */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-blue-500 to-violet-500 p-3.5 rounded-xl text-white shadow-lg"
                    >
                      {project.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white/90">{project.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] leading-relaxed text-gray-400 md:text-base/relaxed mt-6">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag, index) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.05,
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                          }}
                          className="group/tech px-4 py-1.5 rounded-full text-xs bg-white/[0.03] border border-white/10 
                            hover:border-white/20 transition-all duration-300 flex items-center gap-2
                            hover:shadow-lg hover:shadow-violet-500/5 backdrop-blur-xl"
                        >
                          <span className="text-white/90 font-medium">{tag}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20"
                        >
                          <FaGithub className="w-4 h-4" />
                        </motion.div>
                        <span>View Source</span>
                      </Link>
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 ml-auto"
                      >
                        <span>Live Demo</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
