"use client";

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion";

const staggerDelay = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi, I&#39;m{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent animate-shimmer font-bold">
                    Prem Prakash Sharma
                  </span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-[600px]"
                {...staggerDelay(0.2)}
              >
                A passionate full-stack developer crafting beautiful and functional web experiences.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              {...staggerDelay(0.4)}
            >
              <Button 
                className="rounded-full bg-gradient-to-r from-blue-400 to-violet-400 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 group"
                asChild
              >
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  View My Work
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-2 border-blue-400/20 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-300 px-8 group"
                asChild
              >
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-4 text-muted-foreground"
              {...staggerDelay(0.6)}
            >
              {[
                { href: "https://github.com/yourusername", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { href: "https://linkedin.com/in/yourusername", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                { href: "mailto:your.email@example.com", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }
              ].map((social, index) => (
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
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d={social.icon} />
                  </svg>
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
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="relative h-48 w-48 md:h-64 md:w-64 rounded-full border-2 border-border/40 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/profile-image.png"
                alt="Prem Prakash Sharma"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
