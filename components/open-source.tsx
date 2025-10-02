"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import SectionHeader from "./section-header";
import { openSourceContributions } from "@/lib/data";

export default function OpenSource() {
  return (
    <section id="open-source" className="py-14 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="space-y-16">
          {/* Section Header */}
          <SectionHeader
            title="Open Source Contributions"
            description="Contributing to the open source community and collaborating on projects that make a difference."
          />

          {/* Contributions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openSourceContributions.map((contribution, index) => (
              <motion.div
                key={contribution.id}
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
                      {contribution.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white/90">{contribution.project}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] leading-relaxed text-gray-400 md:text-base/relaxed mt-4">
                    {contribution.description}
                  </p>

                  {/* Contribution Details */}
                  <p className="text-sm leading-relaxed text-gray-500 mt-4">
                    {contribution.contribution}
                  </p>

                  <div className="mt-auto pt-8">
                    {/* Status Badge */}
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          contribution.status === "Merged"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {contribution.status}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {contribution.technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
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
                          <span className="text-white/90 font-medium">{tech}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <Link
                        href={contribution.repository}
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
                        <span>View Repository</span>
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
