"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/0"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent)'
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
          <div className="space-y-6 text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent animate-shimmer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              My Experience
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-[700px] text-gray-400 md:text-lg/relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Professional journey and achievements in software development
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-[45rem] mx-auto">
            {experienceData.map((experience, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Gradient background that shows on hover */}
                <div 
                  className="absolute -inset-[1px] bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200"
                  style={{ opacity: 0.05 }}
                />
                
                {/* Card Content */}
                <div className="relative h-full bg-black/60 p-6 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30">
                  {/* Experience Content */}
                  <motion.div 
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.1 }}
                  >
                    <motion.h3 
                      className="font-semibold text-xl bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {experience.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400 text-sm"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                    >
                      {experience.date}
                    </motion.p>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                  >
                    <motion.p 
                      className="text-gray-300 font-medium"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {experience.company}
                    </motion.p>
                    <motion.p 
                      className="text-gray-400 text-sm"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                    >
                      {experience.location}
                    </motion.p>
                  </motion.div>
                  <motion.ul 
                    className="space-y-2 text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                  >
                    {experience.description.map((point, pointIndex) => (
                      <motion.li 
                        key={pointIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + pointIndex * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="mr-2 text-blue-400"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: index * 0.2 + 0.5 + pointIndex * 0.1 
                          }}
                        >
                          •
                        </motion.span>
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
