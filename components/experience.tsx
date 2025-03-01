"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/lib/data";
import SectionHeader from "./section-header";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
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
          className="space-y-20"
        >
          <SectionHeader
            title="My Experience"
            description="Professional journey and achievements in software development"
          />

          {/* Timeline container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500/30 via-violet-500/30 to-blue-500/30" />

            {experienceData.map((experience, index) => (
              <motion.div
                key={index}
                className="relative mb-16 last:mb-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-2.5 md:left-1/2 transform md:-translate-x-1/2 -top-2 w-6 h-6 rounded-full border-2 border-violet-400 bg-black z-10">
                  <motion.div
                    className="absolute inset-[3px] rounded-full bg-violet-400"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>

                {/* Card positioning - alternating left/right on larger screens */}
                <div
                  className={`relative md:w-[calc(50%-30px)] ml-8 md:ml-auto ${
                    index % 2 === 0 ? "md:mr-[calc(50%+30px)]" : "md:ml-[calc(50%+30px)]"
                  }`}
                >
                  {/* Card */}
                  <motion.div
                    className="group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 rounded-2xl opacity-50 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 blur-xl group-hover:opacity-100 transition-all duration-500" />

                    {/* Card content */}
                    <div className="relative h-full bg-black/80 p-7 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 overflow-hidden">
                      {/* Header row */}
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <motion.h3
                            className="font-bold text-2xl bg-clip-text mb-1"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + 0.1 }}
                          >
                            {experience.title}
                          </motion.h3>

                          <motion.div
                            className="flex items-center text-gray-200 font-medium text-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + 0.2 }}
                          >
                            <FaBriefcase className="mr-2 text-blue-400" />
                            {experience.company}
                          </motion.div>
                        </div>
                      </div>

                      {/* Meta information */}
                      <div className="flex flex-wrap gap-4 mb-5 text-gray-400 text-sm">
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                        >
                          <FaCalendarAlt className="mr-2 text-blue-400" />
                          {experience.date}
                        </motion.div>

                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.4 }}
                        >
                          <FaMapMarkerAlt className="mr-2 text-blue-400" />
                          {experience.location}
                        </motion.div>
                      </div>

                      {/* Description */}
                      <motion.ul
                        className="space-y-3 text-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        {experience.description.map((point, pointIndex) => (
                          <motion.li
                            key={pointIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + 0.5 + pointIndex * 0.1 }}
                            whileHover={{ x: 3 }}
                          >
                            <motion.span
                              className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-blue-400"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: index * 0.2 + 0.6 + pointIndex * 0.1,
                              }}
                            />
                            <span className="flex-1">{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
