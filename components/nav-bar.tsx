"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#tech-stack", label: "Tech Stack" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-background/0"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded-md z-[100]"
      >
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-border/40">
              <Image
                src="/images/profile-image.png"
                alt="Prem Prakash Sharma"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 32px, 40px"
                priority
              />
            </div>
            <Link
              href="/"
              className="text-base md:text-lg font-semibold text-blue-400 hover:opacity-80 transition-opacity truncate max-w-[160px] md:max-w-none"
            >
              Prem Prakash Sharma
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center justify-center gap-6 lg:gap-8"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-2"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/50 transition-all duration-300"
                asChild
              >
                <a
                  href="/Prem_Prakash_Sharma_Resume.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex md:hidden items-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-0.5"
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 mt-1 ${
                    isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-0.5"
                  }`}
                />
              </div>
            </Button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border/40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-2"
              >
                <a
                  href="/Prem_Prakash_Sharma_Resume.pdf"
                  download
                  className="flex items-center gap-2 py-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
