"use client";

import { motion } from "framer-motion";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiAmazonwebservices,
  SiGit,
  SiGraphql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const categories = [
  {
    name: "Languages",
    items: [
      { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { label: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { label: "Python", icon: SiPython, color: "#3776ab" },
      { label: "Java", icon: FaJava, color: "#f89820" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { label: "React", icon: SiReact, color: "#61dafb" },
      { label: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { label: "Express", icon: SiExpress, color: "#ffffff" },
      { label: "FastAPI", icon: SiFastapi, color: "#009688" },
      { label: "GraphQL", icon: SiGraphql, color: "#e10098" },
    ],
  },
  {
    name: "Database",
    items: [
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { label: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { label: "Redis", icon: SiRedis, color: "#dc382d" },
    ],
  },
  {
    name: "DevOps & Cloud",
    items: [
      { label: "Docker", icon: SiDocker, color: "#2496ed" },
      { label: "AWS", icon: SiAmazonwebservices, color: "#ff9900" },
      { label: "Git", icon: SiGit, color: "#f05032" },
    ],
  },
];

export default function TechStackGrid() {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.name}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {category.items.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-card-hover flex items-center gap-3 px-4 py-3"
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span className="text-sm text-white/80">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
