# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio from single-page to multi-page site with 3D hero, MDX blog, GSAP animations, Resend contact form, and Buy Me a Coffee integration.

**Architecture:** Next.js 15 App Router with multi-page routing (`/`, `/projects`, `/blog`, `/blog/[slug]`, `/experience`, `/contact`). Three.js hero on home page only (lazy-loaded), GSAP ScrollTrigger for scroll animations, Framer Motion for component interactions, MDX blog with file-based content, Resend server action for contact emails.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI, Three.js + @react-three/fiber + @react-three/drei, GSAP, Framer Motion, next-mdx-remote, rehype-pretty-code, shiki, gray-matter, Resend, React Hook Form + Zod

---

## File Structure

```
content/
  blog/
    hello-world.mdx                    # Starter blog post

app/
  layout.tsx                            # UPDATE: new nav, footer
  page.tsx                              # REWRITE: home page sections
  projects/
    page.tsx                            # NEW: project gallery with filters
  blog/
    page.tsx                            # NEW: blog listing
    [slug]/
      page.tsx                          # NEW: individual blog post
  experience/
    page.tsx                            # NEW: timeline + tech + OSS
  contact/
    page.tsx                            # UPDATE: redesigned with Resend

components/
  three-hero.tsx                        # NEW: Three.js wireframe (client)
  about-section.tsx                     # NEW: about + photo + BMC
  featured-projects.tsx                 # NEW: home page 3 project cards
  latest-blog.tsx                       # NEW: home page blog preview
  project-card.tsx                      # NEW: reusable glass project card
  project-filter.tsx                    # NEW: tech filter pills (client)
  blog-card.tsx                         # NEW: reusable blog card
  blog-post-layout.tsx                  # NEW: MDX post with TOC
  table-of-contents.tsx                 # NEW: sticky TOC (client)
  mdx-components.tsx                    # NEW: custom MDX overrides
  experience-timeline.tsx               # NEW: GSAP timeline (client)
  tech-stack-grid.tsx                   # NEW: redesigned tech grid
  contributions-grid.tsx                # NEW: glass-morphism OSS cards
  nav-bar.tsx                           # UPDATE: multi-page nav
  footer.tsx                            # UPDATE: BMC + socials
  buy-me-coffee.tsx                     # NEW: custom BMC button
  scroll-animation.tsx                  # NEW: GSAP scroll wrapper (client)
  section-header.tsx                    # KEEP: reuse as-is

lib/
  actions/
    contact.ts                          # NEW: Resend server action
  blog.ts                               # NEW: MDX utilities
  data.ts                               # KEEP: existing data
  github.ts                             # KEEP: existing GitHub fetch
  utils.ts                              # KEEP: cn() utility

styles/
  globals.css                           # UPDATE: new glass-morphism utilities
```

---

### Task 1: Install Dependencies and Configure Build

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`
- Create: `.env.local` (user must fill in RESEND_API_KEY)

- [ ] **Step 1: Install new dependencies**

```bash
npm install three @react-three/fiber @react-three/drei gsap next-mdx-remote rehype-pretty-code shiki gray-matter resend
```

```bash
npm install -D @types/three
```

- [ ] **Step 2: Update `next.config.ts` to handle MDX and images**

Replace the entire file content of `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Update `tailwind.config.ts` — add content path for MDX**

In `tailwind.config.ts`, update the `content` array to include the `content/` directory:

```ts
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./content/**/*.{md,mdx}",
],
```

- [ ] **Step 4: Add glass-morphism utilities to `styles/globals.css`**

Add after the existing `@layer base` block:

```css
@layer components {
  .glass-card {
    @apply bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl;
  }

  .glass-card-hover {
    @apply glass-card hover:border-white/20 transition-all duration-300;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-white via-blue-200 to-violet-200 bg-clip-text text-transparent;
  }

  .section-padding {
    @apply py-20 md:py-28;
  }
}
```

- [ ] **Step 5: Create `.env.local` template**

Create `.env.local`:

```
RESEND_API_KEY=your_resend_api_key_here
```

Add `.env.local` to `.gitignore` if not already there.

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json next.config.ts tailwind.config.ts styles/globals.css .gitignore
git commit -m "chore: install v2 dependencies and update build config"
```

---

### Task 2: Shared Components — Navigation, Footer, Buy Me a Coffee, Scroll Animation

**Files:**
- Modify: `components/nav-bar.tsx`
- Modify: `components/footer.tsx`
- Create: `components/buy-me-coffee.tsx`
- Create: `components/scroll-animation.tsx`

- [ ] **Step 1: Create `components/buy-me-coffee.tsx`**

```tsx
import Link from "next/link";
import { Coffee } from "lucide-react";

export default function BuyMeCoffee({ className }: { className?: string }) {
  return (
    <Link
      href="https://buymeacoffee.com/premprakash.dev"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-300 text-sm font-medium ${className ?? ""}`}
    >
      <Coffee className="w-4 h-4" />
      Buy Me a Coffee
    </Link>
  );
}
```

- [ ] **Step 2: Create `components/scroll-animation.tsx`**

```tsx
"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollAnimationProps = {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "stagger";
  delay?: number;
  duration?: number;
  staggerAmount?: number;
};

export default function ScrollAnimation({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  staggerAmount = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    if (animation === "fade-up") fromVars.y = 40;
    if (animation === "fade-left") fromVars.x = -40;
    if (animation === "fade-right") fromVars.x = 40;

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    };

    if (animation === "stagger") {
      gsap.fromTo(el.children, fromVars, {
        ...toVars,
        stagger: staggerAmount,
      });
    } else {
      gsap.fromTo(el, fromVars, toVars);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [animation, delay, duration, staggerAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `components/nav-bar.tsx`**

Replace the entire file:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
          >
            <Link
              href="/"
              className="text-base md:text-lg font-semibold text-blue-400 hover:opacity-80 transition-opacity"
            >
              Prem Prakash
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-6 lg:gap-8"
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
                  className={`relative text-sm font-medium transition-colors group py-2 ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
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
                    className={`block py-3 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
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
}
```

- [ ] **Step 4: Rewrite `components/footer.tsx`**

Replace the entire file:

```tsx
import { socialLinks } from "@/lib/data";
import BuyMeCoffee from "./buy-me-coffee";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm">
            &copy; {currentYear} Prem Prakash Sharma. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <BuyMeCoffee />
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. Pages may have errors (we haven't updated them yet), but components should compile.

- [ ] **Step 6: Commit**

```bash
git add components/nav-bar.tsx components/footer.tsx components/buy-me-coffee.tsx components/scroll-animation.tsx
git commit -m "feat: add shared components — nav, footer, BMC button, scroll animation"
```

---

### Task 3: Three.js Hero Component

**Files:**
- Create: `components/three-hero.tsx`

- [ ] **Step 1: Create `components/three-hero.tsx`**

```tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += (pointer.y * 0.2 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (pointer.x * 0.2 - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          wireframe
          color="#6366f1"
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          wireframe
          color="#818cf8"
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WireframeIcosahedron />
    </>
  );
}

export default function ThreeHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        {!isMobile ? (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" />
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 opacity-0"
        >
          <span className="gradient-text">Prem Prakash</span>
          <br />
          <span className="text-foreground/90">Sharma</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0"
        >
          Senior Fullstack Developer building production-grade web and AI
          systems. Specializing in TypeScript, Python, and cloud-native
          architecture.
        </p>

        <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 opacity-0">
          <Button
            size="lg"
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-8 shadow-lg shadow-blue-500/25"
            asChild
          >
            <Link href="/projects" className="flex items-center gap-2">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/20 hover:bg-white/5 px-8"
            asChild
          >
            <a href="/Prem_Prakash_Sharma_Resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the component compiles**

```bash
npm run build
```

Expected: Build succeeds. The component is a client component using Three.js — it will only be loaded on the home page.

- [ ] **Step 3: Commit**

```bash
git add components/three-hero.tsx
git commit -m "feat: add Three.js wireframe hero component"
```

---

### Task 4: About Section and Home Page

**Files:**
- Create: `components/about-section.tsx`
- Create: `components/featured-projects.tsx`
- Create: `components/project-card.tsx`
- Create: `components/latest-blog.tsx`
- Create: `components/blog-card.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/project-card.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: readonly string[];
  github: string;
  demo: string;
  icon: string;
};

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  demo,
  icon,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

      <div className="relative h-full flex flex-col glass-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-500/10 border border-blue-500/20 p-3.5 rounded-xl text-2xl">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white/90">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-gray-400 flex-1">
          {description}
        </p>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/[0.03] border border-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                Source
              </Link>
            )}
            {demo && (
              <Link
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto"
              >
                Live Demo
                <FaExternalLinkAlt className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/about-section.tsx`**

```tsx
import Image from "next/image";
import BuyMeCoffee from "./buy-me-coffee";
import ScrollAnimation from "./scroll-animation";

export default function AboutSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/30 to-violet-500/30 blur-2xl opacity-50" />
              <div className="relative h-48 w-48 md:h-56 md:w-56 rounded-full border-2 border-white/10 overflow-hidden">
                <Image
                  src="/images/profile-image.png"
                  alt="Prem Prakash Sharma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 224px"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                About Me
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                I&apos;m a Software Developer at BigCircle, building production-grade
                web and AI systems for enterprise use cases. I specialize in
                TypeScript, Python, and cloud-native architecture — from type-safe
                APIs with tRPC to LLM integration pipelines with observability
                built in.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I&apos;m not shipping features, I contribute to open source and
                write about fullstack development, AI systems, and engineering
                best practices.
              </p>
              <BuyMeCoffee />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/featured-projects.tsx`**

```tsx
import Link from "next/link";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";
import SectionHeader from "./section-header";
import ScrollAnimation from "./scroll-animation";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <SectionHeader
            title="Featured Work"
            description="Recent projects showcasing fullstack development and AI integration."
          />
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {featured.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/blog-card.tsx`**

```tsx
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

type BlogCardProps = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
};

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  tags,
  slug,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="glass-card-hover h-full p-8 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-white/90 group-hover:text-blue-400 transition-colors mb-3">
          {title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 5: Create `components/latest-blog.tsx`**

```tsx
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import BlogCard from "./blog-card";
import SectionHeader from "./section-header";
import ScrollAnimation from "./scroll-animation";
import { ArrowRight } from "lucide-react";

export default async function LatestBlog() {
  const posts = await getPublishedPosts();
  const latest = posts[0];

  if (!latest) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <SectionHeader
            title="Latest from the Blog"
            description="Thoughts on fullstack development, AI systems, and engineering."
          />
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" className="max-w-2xl mx-auto mt-16">
          <BlogCard
            title={latest.title}
            description={latest.description}
            date={latest.date}
            readTime={latest.readTime}
            tags={latest.tags}
            slug={latest.slug}
          />
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Rewrite `app/page.tsx`**

Replace the entire file:

```tsx
import dynamic from "next/dynamic";
import AboutSection from "@/components/about-section";
import FeaturedProjects from "@/components/featured-projects";
import LatestBlog from "@/components/latest-blog";

const ThreeHero = dynamic(() => import("@/components/three-hero"), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </section>
  ),
});

export default function Home() {
  return (
    <main id="main-content">
      <ThreeHero />
      <AboutSection />
      <FeaturedProjects />
      <LatestBlog />
    </main>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add components/project-card.tsx components/about-section.tsx components/featured-projects.tsx components/blog-card.tsx components/latest-blog.tsx app/page.tsx
git commit -m "feat: add home page with 3D hero, about, featured projects, blog preview"
```

---

### Task 5: MDX Blog System

**Files:**
- Create: `lib/blog.ts`
- Create: `components/mdx-components.tsx`
- Create: `components/table-of-contents.tsx`
- Create: `components/blog-post-layout.tsx`
- Create: `content/blog/hello-world.mdx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `lib/blog.ts`**

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  published: boolean;
  content: string;
};

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(".mdx", ""),
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      readTime: data.readTime ?? "3 min read",
      published: data.published !== false,
      content,
    };
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    readTime: data.readTime ?? "3 min read",
    published: data.published !== false,
    content,
  };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug);
}
```

- [ ] **Step 2: Create `components/mdx-components.tsx`**

```tsx
import type { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    tip: "bg-green-500/10 border-green-500/20 text-green-300",
  };

  return (
    <div className={`p-4 rounded-lg border my-6 ${styles[type]}`}>
      {children}
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentPropsWithoutRef<"h1">) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 gradient-text" {...props} />
    ),
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="text-2xl font-semibold mt-8 mb-3 text-white/90 scroll-mt-24"
        id={typeof props.children === "string" ? props.children.toLowerCase().replace(/\s+/g, "-") : undefined}
        {...props}
      />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <h3
        className="text-xl font-semibold mt-6 mb-2 text-white/80 scroll-mt-24"
        id={typeof props.children === "string" ? props.children.toLowerCase().replace(/\s+/g, "-") : undefined}
        {...props}
      />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="text-gray-400 leading-relaxed my-4" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul className="list-disc list-inside text-gray-400 space-y-2 my-4" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol className="list-decimal list-inside text-gray-400 space-y-2 my-4" {...props} />
    ),
    li: (props: ComponentPropsWithoutRef<"li">) => (
      <li className="text-gray-400" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors" {...props} />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-sm text-blue-300 font-mono" {...props} />
    ),
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
      <pre className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto my-6 text-sm" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote className="border-l-2 border-blue-500/50 pl-4 italic text-gray-500 my-6" {...props} />
    ),
    Callout,
    ...components,
  };
}
```

- [ ] **Step 3: Create `components/table-of-contents.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    const items: TOCItem[] = [];
    const regex = /^#{2,3}\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1];
      const level = match[0].startsWith("###") ? 3 : 2;
      items.push({
        id: text.toLowerCase().replace(/\s+/g, "-"),
        text,
        level,
      });
    }
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-28 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm transition-colors ${
                heading.level === 3 ? "pl-4" : ""
              } ${
                activeId === heading.id
                  ? "text-blue-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Create `components/blog-post-layout.tsx`**

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Calendar, Clock } from "lucide-react";
import TableOfContents from "./table-of-contents";
import { BlogPost } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "./mdx-components";
import rehypePrettyCode from "rehype-pretty-code";

export default function BlogPostLayout({ post }: { post: BlogPost }) {
  const components = useMDXComponents({});

  return (
    <article className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="max-w-3xl mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div className="flex gap-16">
          <div className="max-w-3xl min-w-0 flex-1">
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [rehypePrettyCode, { theme: "github-dark-dimmed" }],
                  ],
                },
              }}
            />
          </div>
          <TableOfContents content={post.content} />
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Create `content/blog/hello-world.mdx`**

```bash
mkdir -p content/blog
```

Create `content/blog/hello-world.mdx`:

```mdx
---
title: "Building My Portfolio with Next.js, Three.js, and GSAP"
description: "A look at how I built this portfolio site using modern web technologies — from 3D wireframe heroes to MDX-powered blog posts."
date: "2026-04-05"
tags: ["next.js", "three.js", "gsap", "portfolio"]
readTime: "4 min read"
published: true
---

## Why I Rebuilt My Portfolio

Every developer eventually reaches the point where their portfolio no longer reflects their skills. After a year of building production AI systems and enterprise web apps, it was time for a redesign.

## The Tech Stack

Here's what powers this site:

- **Next.js 15** with the App Router for file-based routing and server components
- **Three.js** via React Three Fiber for the 3D wireframe hero
- **GSAP** with ScrollTrigger for smooth scroll animations
- **Framer Motion** for component-level interactions
- **MDX** for this very blog post you're reading

## Code Highlighting Works Too

```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}! Welcome to my blog.`;
};

console.log(greeting("World"));
```

## What I Learned

Building a 3D hero that performs well on mobile was the biggest challenge. The key was using a CSS gradient fallback for devices that can't handle WebGL smoothly.

GSAP's ScrollTrigger made scroll-based animations much more reliable than Intersection Observer alone, especially for staggered reveals.

## What's Next

I'll be writing more about fullstack development, AI integration patterns, and the tools I use daily. Stay tuned.
```

- [ ] **Step 6: Create `app/blog/page.tsx`**

```tsx
import { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import ScrollAnimation from "@/components/scroll-animation";

export const metadata: Metadata = {
  title: "Blog | Prem Prakash Sharma",
  description:
    "Thoughts on fullstack development, AI systems, and engineering best practices.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Writing about fullstack development, AI integration, and
              engineering lessons from the field.
            </p>
          </div>
        </ScrollAnimation>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                readTime={post.readTime}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </ScrollAnimation>
        )}
      </div>
    </main>
  );
}
```

- [ ] **Step 7: Create `app/blog/[slug]/page.tsx`**

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import BlogPostLayout from "@/components/blog-post-layout";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Prem Prakash Sharma`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main id="main-content">
      <BlogPostLayout post={post} />
    </main>
  );
}
```

- [ ] **Step 8: Verify blog build**

```bash
npm run build
```

Expected: Build succeeds. Blog listing page renders the hello-world post. Blog post page renders MDX content with syntax highlighting.

- [ ] **Step 9: Commit**

```bash
git add lib/blog.ts components/mdx-components.tsx components/table-of-contents.tsx components/blog-post-layout.tsx content/blog/hello-world.mdx app/blog/
git commit -m "feat: add MDX blog system with listing, post pages, and TOC"
```

---

### Task 6: Projects Page

**Files:**
- Create: `components/project-filter.tsx`
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create `components/project-filter.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";

export default function ProjectFilter() {
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeTag === null
              ? "bg-blue-500 text-white"
              : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTag === tag
                ? "bg-blue-500 text-white"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? "all"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/projects/page.tsx`**

```tsx
import { Metadata } from "next";
import ProjectFilter from "@/components/project-filter";
import ScrollAnimation from "@/components/scroll-animation";

export const metadata: Metadata = {
  title: "Projects | Prem Prakash Sharma",
  description:
    "Featured projects showcasing fullstack development, AI systems, and enterprise applications.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of projects I&apos;ve built — from AI-powered systems to
              fullstack web applications.
            </p>
          </div>
        </ScrollAnimation>

        <ProjectFilter />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. `/projects` page renders with filter pills and project cards.

- [ ] **Step 4: Commit**

```bash
git add components/project-filter.tsx app/projects/
git commit -m "feat: add projects page with tech filter"
```

---

### Task 7: Experience Page — Timeline, Tech Stack, Contributions

**Files:**
- Create: `components/experience-timeline.tsx`
- Create: `components/tech-stack-grid.tsx`
- Create: `components/contributions-grid.tsx`
- Create: `app/experience/page.tsx`

- [ ] **Step 1: Create `components/experience-timeline.tsx`**

```tsx
"use client";

import { useRef, useEffect } from "react";
import { experienceData } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = el.querySelectorAll(".timeline-card");
    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      gsap.fromTo(
        card,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />

      <div className="space-y-12">
        {experienceData.map((job, index) => (
          <div
            key={job.company}
            className={`timeline-card relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-background -translate-x-1.5 md:-translate-x-1.5 top-8 z-10" />

            {/* Card */}
            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
              <div className="glass-card p-6">
                <span className="text-xs text-blue-400 font-medium">{job.date}</span>
                <h3 className="text-xl font-semibold text-white/90 mt-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {job.company} &middot; {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.description.map((point, i) => (
                    <li key={i} className="text-sm text-gray-400 leading-relaxed flex gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">&#8226;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/tech-stack-grid.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiAmazonwebservices,
  SiGit,
  SiGraphql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const categories = [
  {
    name: "Languages",
    items: [
      { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { label: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { label: "Python", icon: SiPython, color: "#3776ab" },
      { label: "Java", icon: FaJava, color: "#f89820" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { label: "React", icon: SiReact, color: "#61dafb" },
      { label: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { label: "Express", icon: SiExpress, color: "#ffffff" },
      { label: "FastAPI", icon: SiFastapi, color: "#009688" },
      { label: "GraphQL", icon: SiGraphql, color: "#e10098" },
    ],
  },
  {
    name: "Database",
    items: [
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { label: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { label: "Redis", icon: SiRedis, color: "#dc382d" },
    ],
  },
  {
    name: "DevOps & Cloud",
    items: [
      { label: "Docker", icon: SiDocker, color: "#2496ed" },
      { label: "AWS", icon: SiAmazonwebservices, color: "#ff9900" },
      { label: "Git", icon: SiGit, color: "#f05032" },
    ],
  },
];

export default function TechStackGrid() {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.name}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {category.items.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-card-hover flex items-center gap-3 px-4 py-3"
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span className="text-sm text-white/80">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/contributions-grid.tsx`**

```tsx
import { fetchExternalContributions } from "@/lib/github";
import { FaStar } from "react-icons/fa";
import ScrollAnimation from "./scroll-animation";

export default async function ContributionsGrid() {
  const contributions = await fetchExternalContributions();

  if (contributions.length === 0) return null;

  return (
    <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contributions.map((repo) => (
        <div key={repo.repo} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-white/90 hover:text-blue-400 transition-colors"
            >
              {repo.repo}
            </a>
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <FaStar className="w-3 h-3" />
              {repo.stars.toLocaleString()}
            </span>
          </div>
          <ul className="space-y-2">
            {repo.prs.map((pr) => (
              <li key={pr.url} className="flex items-start gap-2">
                <span
                  className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                    pr.state === "merged"
                      ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }`}
                >
                  {pr.state}
                </span>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {pr.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ScrollAnimation>
  );
}
```

- [ ] **Step 4: Create `app/experience/page.tsx`**

```tsx
import { Metadata } from "next";
import ExperienceTimeline from "@/components/experience-timeline";
import TechStackGrid from "@/components/tech-stack-grid";
import ContributionsGrid from "@/components/contributions-grid";
import SectionHeader from "@/components/section-header";
import ScrollAnimation from "@/components/scroll-animation";

export const metadata: Metadata = {
  title: "Experience | Prem Prakash Sharma",
  description:
    "Work experience, tech stack, and open source contributions.",
};

export default function ExperiencePage() {
  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6 space-y-28">
        {/* Work Timeline */}
        <section>
          <ScrollAnimation animation="fade-up">
            <SectionHeader
              title="Experience"
              description="My professional journey building web and AI systems."
            />
          </ScrollAnimation>
          <div className="mt-16">
            <ExperienceTimeline />
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <ScrollAnimation animation="fade-up">
            <SectionHeader
              title="Tech Stack"
              description="Technologies I work with daily."
            />
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" className="mt-16">
            <TechStackGrid />
          </ScrollAnimation>
        </section>

        {/* Open Source */}
        <section>
          <ScrollAnimation animation="fade-up">
            <SectionHeader
              title="Open Source"
              description="Contributions to the open source community."
            />
          </ScrollAnimation>
          <div className="mt-16">
            <ContributionsGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds. `/experience` page renders timeline, tech stack grid, and contributions.

- [ ] **Step 6: Commit**

```bash
git add components/experience-timeline.tsx components/tech-stack-grid.tsx components/contributions-grid.tsx app/experience/
git commit -m "feat: add experience page with GSAP timeline, tech stack, and OSS contributions"
```

---

### Task 8: Contact Page with Resend Server Action

**Files:**
- Create: `lib/actions/contact.ts`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Create `lib/actions/contact.ts`**

```bash
mkdir -p lib/actions
```

Create `lib/actions/contact.ts`:

```ts
"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactResult = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  formData: z.infer<typeof contactSchema>
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const { name, email, message } = parsed.data;

  try {
    // Send notification to Prem
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "premprakashsharma.dev@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "Prem Prakash Sharma <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <h2>Hi ${name}!</h2>
        <p>Thanks for reaching out. I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Prem Prakash Sharma</p>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
```

- [ ] **Step 2: Rewrite `app/contact/page.tsx`**

Replace the entire file:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { socialLinks } from "@/lib/data";
import { sendContactEmail } from "@/lib/actions/contact";
import BuyMeCoffee from "@/components/buy-me-coffee";
import { Send, Loader2 } from "lucide-react";
import { Metadata } from "next";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await sendContactEmail(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        title: "Something went wrong",
        description: result.error ?? "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <main id="main-content" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground mb-8">
              Have a question or want to work together? Drop me a message!
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white/90">Connect</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white/90">
                Support My Work
              </h2>
              <p className="text-sm text-gray-400">
                If you find my work helpful, consider buying me a coffee.
              </p>
              <BuyMeCoffee />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Check if `hooks/use-toast` exists**

The contact page uses `useToast`. Check if the hook exists at `hooks/use-toast.ts`. If not, check if it's available from Shadcn at `@/components/ui/use-toast` or similar — the existing project uses `@radix-ui/react-toast` so it should be wired up. Adjust the import path to match what exists.

- [ ] **Step 4: Remove the `Metadata` import from contact page**

The contact page is a `"use client"` component, so it cannot export metadata. Remove the unused `Metadata` import. If you need page-level metadata, create a separate `app/contact/layout.tsx` or use `generateMetadata` in a server wrapper.

Create `app/contact/metadata.ts` is not needed — instead just remove the unused import line `import { Metadata } from "next";` from the contact page file.

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Contact page renders form + info panel. (Email sending requires a valid `RESEND_API_KEY` to test.)

- [ ] **Step 6: Commit**

```bash
git add lib/actions/contact.ts app/contact/page.tsx
git commit -m "feat: add contact page with Resend server action for email"
```

---

### Task 9: Update Layout, Sitemap, and Clean Up Old Files

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Delete: `components/blogs.tsx`
- Delete: `components/education.tsx`
- Delete: `components/certificates.tsx`
- Delete: `components/section-background.tsx`
- Delete: `components/loading-spinner.tsx`
- Delete: `components/hero.tsx`
- Delete: `components/projects.tsx`
- Delete: `components/experience.tsx`
- Delete: `components/tech-stack.tsx`
- Delete: `components/contributions.tsx`
- Delete: `components/contribution-cards.tsx`
- Delete: `components/contact.tsx`
- Delete: `components/error-boundary.tsx`
- Delete: `components/scroll-to-top.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file. Key changes: remove ErrorBoundary wrapper, remove ScrollToTop, keep nav/footer/GA/fonts/metadata/structured data:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: "Prem Prakash Sharma | Software Developer | AI & Web Development Expert",
  description:
    "Software Developer building production-grade web and AI systems. Expert in TypeScript, Python, React.js, Next.js, FastAPI, Node.js, Docker, AWS, and LLM integration.",
  keywords: [
    "Prem Prakash Sharma",
    "Software Developer",
    "AI Developer",
    "Full Stack Developer",
    "TypeScript Developer",
    "Python Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
  ],
  authors: [{ name: "Prem Prakash Sharma" }],
  creator: "Prem Prakash Sharma",
  openGraph: {
    title: "Prem Prakash Sharma | Software Developer",
    description:
      "Software Developer building production-grade web and AI systems.",
    url: "https://premprakash.dev/",
    siteName: "Prem Prakash Sharma",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://premprakash.dev/images/profile-image.png",
        width: 1200,
        height: 630,
        alt: "Prem Prakash Sharma - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Prakash Sharma | Software Developer",
    description:
      "Software Developer building production-grade web and AI systems.",
    creator: "@premprakashdev",
    images: ["https://premprakash.dev/images/profile-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://premprakash.dev/" },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prem Prakash Sharma",
    url: "https://premprakash.dev",
    image: "https://premprakash.dev/images/profile-image.png",
    sameAs: [
      "https://github.com/PremPrakashCodes",
      "https://www.linkedin.com/in/premprakashsharma",
      "https://twitter.com/premprakashdev",
    ],
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "BigCircle",
    },
    email: "premprakashsharma.dev@gmail.com",
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <NavBar />
        {children}
        <Footer />
        <Toaster />
        <GoogleAnalytics gaId="G-L49P87PHWD" />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update `app/sitemap.ts`**

Replace the entire file:

```ts
import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://premprakash.dev";

  const blogSlugs = await getAllSlugs();
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...blogPages,
  ];
}
```

- [ ] **Step 3: Delete old components no longer used**

```bash
rm components/blogs.tsx components/education.tsx components/certificates.tsx components/section-background.tsx components/loading-spinner.tsx components/hero.tsx components/projects.tsx components/experience.tsx components/tech-stack.tsx components/contributions.tsx components/contribution-cards.tsx components/contact.tsx components/error-boundary.tsx components/scroll-to-top.tsx
```

- [ ] **Step 4: Verify full build passes**

```bash
npm run build
```

Expected: Build succeeds with no errors across all routes.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: update layout and sitemap, remove old components"
```

---

### Task 10: Final Verification and Dev Server Test

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Clean build, no errors, no warnings.

- [ ] **Step 2: Start dev server and verify all routes**

```bash
npm run dev
```

Verify each route loads:
- `http://localhost:3000` — Home: 3D hero, about, featured projects, latest blog
- `http://localhost:3000/projects` — Project gallery with filter pills
- `http://localhost:3000/blog` — Blog listing with hello-world post
- `http://localhost:3000/blog/hello-world` — Blog post with syntax highlighting and TOC
- `http://localhost:3000/experience` — Timeline, tech stack, contributions
- `http://localhost:3000/contact` — Form + info panel + BMC

- [ ] **Step 3: Verify responsive behavior**

Test at mobile viewport (375px) and desktop (1280px):
- Navigation collapses to hamburger on mobile
- Grids collapse to single column on mobile
- 3D hero falls back to gradient on mobile
- Blog TOC hides on mobile

- [ ] **Step 4: Commit any fixes**

If any fixes were needed:

```bash
git add -A
git commit -m "fix: address issues found during final verification"
```
