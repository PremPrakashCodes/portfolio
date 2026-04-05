"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";

export default function ProjectFilter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </motion.div>
  );
}
