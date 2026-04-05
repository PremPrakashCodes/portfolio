"use client";

import { motion } from "framer-motion";
import SectionBackground from "./section-background";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 overflow-hidden">
      <SectionBackground />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative py-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-gray-400 text-sm">© {currentYear} Prem Prakash Sharma. All rights reserved.</div>

            <div className="text-gray-400 text-sm">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                Tailwind CSS
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
