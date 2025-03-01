"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { socialLinks } from "@/lib/data";

export default function Hero() {
  const staggerDelay = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-14">
      {/* Background gradient circles */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-violet-500/20 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Content */}
          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi, I&#39;m{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent font-bold">
                    Prem Prakash Sharma
                  </span>
                </h1>
              </motion.div>

              <motion.p className="text-xl text-muted-foreground max-w-[600px]" {...staggerDelay(0.2)}>
                Software Developer specializing in full-stack development with expertise in modern web technologies.
                Crafting scalable solutions and clean, maintainable code.
              </motion.p>
            </div>

            <motion.div className="flex flex-wrap gap-4" {...staggerDelay(0.4)}>
              <Button
                variant="outline"
                className="rounded-full bg-gradient-to-r from-blue-400 to-violet-400 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                asChild
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  View Projects
                  <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 5 }}>
                    <ArrowRightIcon />
                  </motion.span>
                </motion.a>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-2 border-blue-400/20 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-300 px-8 group"
                asChild
              >
                <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Get In Touch
                </motion.a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex items-center gap-4 text-muted-foreground" {...staggerDelay(0.6)}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors p-2 hover:bg-blue-400/10 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  {...staggerDelay(0.6 + index * 0.1)}
                >
                  <social.icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 blur-2xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="relative h-48 w-48 md:h-64 md:w-64 rounded-full border-2 border-border/40 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image src="/images/profile-image.png" alt="Prem Prakash Sharma" fill className="object-cover" priority />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
