"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaAws, FaCloud, FaCode, FaDatabase, FaDocker, FaGitAlt, FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import SectionHeader from "./section-header";

interface Technology {
  name: string;
  category: "language" | "frontend" | "backend" | "database" | "devops";
  icon: React.ReactNode;
  link: string;
}

const technologies: Technology[] = [
  // Languages
  {
    name: "Java",
    category: "language",
    icon: <FaJava className="w-5 h-5 text-orange-400" />,
    link: "https://www.java.com",
  },
  {
    name: "JavaScript",
    category: "language",
    icon: <SiJavascript className="w-5 h-5 text-yellow-400" />,
    link: "https://www.javascript.com",
  },
  {
    name: "TypeScript",
    category: "language",
    icon: <SiTypescript className="w-5 h-5 text-blue-400" />,
    link: "https://www.typescript.com",
  },
  // Frontend
  {
    name: "React",
    category: "frontend",
    icon: <FaReact className="w-5 h-5 text-blue-400" />,
    link: "https://react.dev",
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: <SiNextdotjs className="w-5 h-5 text-white" />,
    link: "https://nextjs.org",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: <SiTailwindcss className="w-5 h-5 text-cyan-400" />,
    link: "https://tailwindcss.com",
  },
  {
    name: "Redux",
    category: "frontend",
    icon: <SiRedux className="w-5 h-5 text-violet-400" />,
    link: "https://redux.js.org",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    icon: <FaNodeJs className="w-5 h-5 text-green-400" />,
    link: "https://nodejs.org",
  },
  {
    name: "Express",
    category: "backend",
    icon: <SiExpress className="w-5 h-5 text-white" />,
    link: "https://expressjs.com",
  },
  {
    name: "REST APIs",
    category: "backend",
    icon: <FaAws className="w-5 h-5 text-yellow-400" />,
    link: "https://www.amazonwebservices.com",
  },
  {
    name: "GraphQL",
    category: "backend",
    icon: <SiGraphql className="w-5 h-5 text-pink-400" />,
    link: "https://www.graphql.com",
  },

  // Database
  {
    name: "MongoDB",
    category: "database",
    icon: <SiMongodb className="w-5 h-5 text-green-500" />,
    link: "https://www.mongodb.com",
  },
  {
    name: "PostgreSQL",
    category: "database",
    icon: <SiPostgresql className="w-5 h-5 text-blue-400" />,
    link: "https://www.postgresql.org",
  },
  {
    name: "MySQL",
    category: "database",
    icon: <SiMysql className="w-5 h-5 text-orange-400" />,
    link: "https://www.mysql.com",
  },

  // DevOps
  {
    name: "Docker",
    category: "devops",
    icon: <FaDocker className="w-5 h-5 text-blue-400" />,
    link: "https://www.docker.com",
  },
  {
    name: "AWS",
    category: "devops",
    icon: <FaAws className="w-5 h-5 text-orange-400" />,
    link: "https://aws.amazon.com",
  },
  {
    name: "Git",
    category: "devops",
    icon: <FaGitAlt className="w-5 h-5 text-orange-500" />,
    link: "https://git-scm.com",
  },
];

const categories = [
  { id: "language", name: "Languages", color: "from-red-500 to-rose-400", icon: <FaCode className="w-6 h-6" /> },
  {
    id: "frontend",
    name: "Frontend Development",
    color: "from-blue-500 to-cyan-400",
    icon: <FaReact className="w-6 h-6" />,
  },
  {
    id: "backend",
    name: "Backend Development",
    color: "from-green-500 to-emerald-400",
    icon: <FaNodeJs className="w-6 h-6" />,
  },
  {
    id: "database",
    name: "Database",
    color: "from-orange-500 to-yellow-400",
    icon: <FaDatabase className="w-6 h-6" />,
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    color: "from-violet-500 to-purple-400",
    icon: <FaCloud className="w-6 h-6" />,
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-14 relative overflow-hidden">
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
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <SectionHeader
            title="Technical Expertise"
            description="Proficient in a wide range of technologies for building modern, scalable applications"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="relative group"
              >
                {/* Gradient background that shows on hover */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200`}
                  style={{ opacity: 0.05 }}
                />

                {/* Card Content */}
                <div className="relative h-full space-y-4 bg-black/60 p-5 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gradient-to-r ${category.color} p-3.5 rounded-xl text-white shadow-lg`}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white/90">{category.name}</h3>
                  </div>

                  {/* Technologies Grid */}
                  <div className="flex flex-wrap !mt-8 gap-3">
                    {technologies
                      .filter((tech) => tech.category === category.id)
                      .map((tech, index) => (
                        <Link href={tech.link} target="_blank" rel="noopener noreferrer" key={tech.name}>
                          <motion.div
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
                            className={`group/tech px-4 py-2 rounded-full text-sm bg-white/[0.03] border border-white/10 
                              hover:border-white/20 transition-all duration-300 flex items-center gap-2.5
                              hover:shadow-lg hover:shadow-${category.color}/5 backdrop-blur-xl cursor-pointer`}
                          >
                            <span className="text-lg">{tech.icon}</span>
                            <span className="text-white font-medium text-[11px] sm:text-xs whitespace-nowrap antialiased">
                              {tech.name}
                            </span>
                          </motion.div>
                        </Link>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
