"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import SectionHeader from "./section-header";
import { certificates } from "@/lib/data";

export default function Certificates() {
  return (
    <section id="certificates" className="py-14">
      <div className="container px-4 md:px-6">
        <SectionHeader title="Certificates" description="Professional certifications and courses I've completed" />

        <div className="grid gap-8 mt-12 md:grid-cols-2">
          {certificates.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 mr-4 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full">
                  <item.icon />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <span>View</span>
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{item.institution}</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="mb-2 text-sm text-gray-500">{item.duration}</p>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
