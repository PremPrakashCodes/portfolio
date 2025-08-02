"use client";

import { socialLinks } from "@/lib/data";
import { motion } from "framer-motion";
import SectionHeader from "./section-header";

export default function Contact() {
  return (
    <section id="contact" className="py-14 relative overflow-hidden">
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
          <SectionHeader title="Let's Connect" description="Feel free to reach out through any of these platforms" />

          {/* Social Links */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex flex-wrap justify-center gap-8">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                    }}
                    className="group flex flex-col items-center gap-3"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      {/* Icon Background */}
                      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.075] to-white/[0.025] border border-white/10 backdrop-blur-xl group-hover:border-white/20 transition-colors duration-300">
                        <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                          <link.icon />
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-violet-500/40 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
                    </motion.div>

                    <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
