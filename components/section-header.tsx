import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-6 text-center">
      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent animate-shimmer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mx-auto max-w-[700px] text-gray-400 md:text-lg/relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {description}
      </motion.p>
    </div>
  );
}
