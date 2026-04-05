# Portfolio v2 — Complete Redesign

## Overview

Full redesign of Prem Prakash Sharma's portfolio from a single-page app to a multi-page site with 3D hero, MDX blog, and modern animation stack. The portfolio serves three equal goals: job hunting, personal brand building, and freelance/client acquisition.

## Design Direction

**Aesthetic:** Hybrid — clean dark design with strategic 3D/GSAP accents. Polished + purposeful motion. Not a full immersive 3D experience, but a premium feel with a striking hero and smooth animations throughout.

**Theme:** Dark only, no light mode toggle. Deep dark backgrounds, subtle glows, glass-morphism cards, gradient accents.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 (App Router) | Existing, keep |
| Styling | Tailwind CSS + Shadcn UI | Existing, keep |
| 3D | Three.js + @react-three/fiber + @react-three/drei | Hero wireframe scene |
| Animation | GSAP (ScrollTrigger) | Page transitions, scroll animations |
| Animation | Framer Motion | Component-level animations (existing, keep) |
| Blog | next-mdx-remote | Blog content (file-based with frontmatter) |
| Syntax | rehype-pretty-code + shiki | Code block highlighting in blog |
| Forms | React Hook Form + Zod | Existing, keep |
| Icons | Lucide React + React Icons | Existing, keep |

### New Dependencies to Add

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `gsap` (with ScrollTrigger plugin)
- `next-mdx-remote`
- `rehype-pretty-code`
- `shiki`
- `gray-matter` (MDX frontmatter parsing)

## Route Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Curated highlight reel: Hero, About, Featured Projects (3), Latest Blog Post |
| `/projects` | Projects | Full project gallery with tech filter |
| `/blog` | Blog Listing | All blog posts, sorted by date, filterable by tag |
| `/blog/[slug]` | Blog Post | Individual MDX blog post with TOC |
| `/experience` | Experience | Work timeline + Tech stack + Open source contributions |
| `/contact` | Contact | Contact form + social links + Buy Me a Coffee |

## Shared Layout

### Navigation

- Fixed/sticky header
- Left: Logo/name (links to `/`)
- Center: Home, Projects, Blog, Experience, Contact
- Right: "Download Resume" CTA button
- Mobile: hamburger menu with slide-out drawer
- Subtle background blur on scroll

### Footer

- Social links (GitHub, LinkedIn, Email, Twitter)
- Copyright
- Buy Me a Coffee link
- Built with Next.js credit

### Page Entrance Animations

- GSAP-powered entrance animations on each page (content fades/slides in on route change)
- Not true cross-page transitions (complex and fragile in App Router) — instead, each page animates its own content in on mount

## Page Designs

### Home Page (`/`)

#### Hero Section
- Full viewport height (100vh)
- **3D Element:** Three.js wireframe icosahedron, slowly rotating, subtle mouse-follow interaction. Rendered via @react-three/fiber. Wireframe style with faint glow/edge highlight. Semi-transparent so text is readable.
- **Text overlay:** Name in large gradient text (white to blue/violet), "Senior Fullstack Developer" subtitle, one-liner description
- **CTAs:** "View Projects" (primary filled button), "Download Resume" (outline/ghost button)
- **Scroll indicator:** subtle animated chevron at bottom
- **Entry animation:** GSAP staggered text reveal on page load (letters/words fade up sequentially)
- **Performance:** Canvas renders at reduced resolution on mobile, or replaced with a CSS-only animated gradient fallback on low-end devices

#### About Section
- Split layout: profile photo (left), bio text (right)
- Photo has subtle animated border glow (CSS or Framer Motion)
- Bio: 2-3 sentences about identity, approach, and what drives you
- "Buy Me a Coffee" button — custom-styled to match dark theme (not default yellow widget)
- GSAP ScrollTrigger fade-in animation

#### Featured Projects (3 cards)
- Section heading: "Featured Work"
- 3-column grid (1-col mobile, 2-col tablet, 3-col desktop)
- Glass-morphism cards: frosted background (backdrop-filter: blur), subtle border, inner glow on hover
- Each card: project name, short description, tech tags (pills), demo + GitHub links
- Hover: scale(1.02) + border glow via Framer Motion
- "View All Projects →" link below grid
- Staggered scroll-triggered reveal (GSAP)

#### Latest Blog Post
- Section heading: "Latest from the Blog"
- Single featured card: title, excerpt, date, read time, tag pills
- "Read More →" link on card, "View All Posts →" below
- Scroll-triggered entrance animation

### Projects Page (`/projects`)

- Page header: "Projects" title + intro line
- **Filter bar:** horizontal scrollable pills — "All", "React", "Next.js", "Node.js", "TypeScript", etc. Click to filter. Active state: filled pill. Derived from project tags in data.
- **Project grid:** 2-column desktop, 1-column mobile
- **Card design:** same glass-morphism style as home, but with more detail — longer description, more tags, icon/screenshot area at top
- Framer Motion `AnimatePresence` for filter transitions (cards animate out/in)
- Data source: `lib/data.ts` (existing `projects` array, can be expanded)

### Blog Listing (`/blog`)

- Page header: "Blog" + tagline
- Optional tag filter pills at top (derived from post frontmatter)
- Grid of post cards (2-column desktop, 1-column mobile)
- Each card: title, excerpt, date, read time, tag pills
- Sorted newest first
- Staggered Framer Motion entrance

#### MDX Setup

- Blog posts stored in `content/blog/` directory as `.mdx` files
- Frontmatter schema:
  ```yaml
  title: "Post Title"
  description: "Brief description for SEO and cards"
  date: "2026-04-05"
  tags: ["next.js", "react"]
  readTime: "5 min read"
  published: true
  ```
- Utility functions in `lib/blog.ts` to:
  - List all published posts (sorted by date)
  - Get post by slug
  - Get all tags
  - Filter by tag
- Uses `gray-matter` for frontmatter parsing
- Static generation via `generateStaticParams`

### Blog Post (`/blog/[slug]`)

- Clean reading layout, max-width ~720px centered
- **Header:** title (large), date, read time, tag pills
- **Content:** MDX rendered with custom components:
  - Code blocks: syntax highlighting via `rehype-pretty-code` + shiki, dark theme, copy button
  - Callouts/admonitions (info, warning, tip)
  - Images with caption support
  - Custom heading anchors for linking
- **Table of Contents:** sticky sidebar on desktop (right side), hidden on mobile. Auto-generated from headings.
- **Navigation:** "← Back to Blog" at top
- **Bottom:** share/copy-link buttons

### Experience Page (`/experience`)

#### Work Timeline
- Vertical timeline with center line on desktop, left-aligned on mobile
- Cards alternate left/right on desktop
- Each card: company name, role, dates, description bullets, tech used
- GSAP ScrollTrigger: cards slide in from their respective sides as user scrolls
- Timeline dot animates (scale spring) when card enters viewport
- Data source: existing `experienceData` from `lib/data.ts`

#### Tech Stack
- Section heading: "Tech Stack"
- Grouped by category: Languages, Frontend, Backend, Database, DevOps
- Each item: icon + label
- Grid layout within each category
- Subtle hover animation (scale + glow)
- Data source: existing tech stack data or new structured data in `lib/data.ts`

#### Open Source Contributions
- Section heading: "Open Source"
- Same GitHub API fetching logic as current (`lib/github.ts`)
- Glass-morphism cards grouped by repository
- Shows: repo name + stars, PR title, status badge (merged/open)
- Staggered scroll reveal
- 24hr revalidation cache (existing)

### Contact Page (`/contact`)

- Split layout: form (left 60%), info (right 40%)
- **Form:** name, email, message fields — validated with Zod + React Hook Form
- **Info panel:** social links with icons + labels, email address, location info
- **Buy Me a Coffee:** prominently placed in info panel, custom-styled button
- Success/error toast notifications (existing Shadcn toast)
- Form submission: currently logs to console (can be wired to API later)
- GSAP entrance animation on page load

## Animation Strategy

| Context | Library | Examples |
|---------|---------|----------|
| Hero 3D scene | Three.js / R3F | Wireframe rotation, mouse interaction |
| Page entrances | GSAP | Per-page content fade + slide on mount |
| Scroll reveals | GSAP ScrollTrigger | Section fade-ins, timeline cards, staggered grids |
| Component interactions | Framer Motion | Hover effects, card animations, filter transitions |
| Micro-interactions | Framer Motion | Button press, icon hover, menu toggle |

**Performance rules:**
- Three.js only on the home page hero — not loaded on other routes
- Lazy-load the 3D canvas component
- Reduce canvas resolution on mobile or fall back to CSS gradient animation
- `will-change` and GPU-accelerated properties only where needed
- Respect `prefers-reduced-motion` — disable animations for users who prefer it

## Data Architecture

No changes to the data pattern. All portfolio content stays in `lib/data.ts`. New additions:

- `lib/blog.ts` — utility functions for reading MDX files from `content/blog/`
- `content/blog/*.mdx` — blog post files
- Expand `projects` array in `lib/data.ts` if needed for the full projects page

## Buy Me a Coffee Integration

- Custom-styled button/link (not the default embed widget)
- Links to `https://buymeacoffee.com/<username>` (user provides their BMC username)
- Appears in: About section on home page, Contact page info panel, Footer
- Styled to match the dark theme — subtle, not aggressive

## SEO & Metadata

- Keep existing metadata structure in root layout
- Add per-page metadata via `generateMetadata` on each route
- Blog posts get dynamic metadata from MDX frontmatter (title, description, OG image)
- Keep existing sitemap.ts, update to include new routes
- Keep JSON-LD structured data, update for new page structure
- Keep Google Analytics integration

## Responsive Behavior

- Mobile-first approach (existing)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation: horizontal on desktop, hamburger + drawer on mobile
- Grids: collapse from multi-column to single-column
- 3D hero: reduced quality or CSS fallback on mobile
- Blog TOC: hidden on mobile, sticky sidebar on desktop
- Timeline: center-aligned on desktop, left-aligned on mobile

## Files to Create

```
content/
  blog/
    hello-world.mdx              # Starter blog post

app/
  layout.tsx                      # Update: new nav, footer, page transitions
  page.tsx                        # Rewrite: home page (hero, about, featured, blog preview)
  projects/
    page.tsx                      # New: projects gallery with filters
  blog/
    page.tsx                      # New: blog listing
    [slug]/
      page.tsx                    # New: individual blog post
  experience/
    page.tsx                      # New: timeline + tech stack + OSS
  contact/
    page.tsx                      # Update: redesigned contact page

components/
  three-hero.tsx                  # New: Three.js wireframe hero (client component)
  about-section.tsx               # New: about + photo + BMC button
  featured-projects.tsx           # New: home page project cards
  latest-blog.tsx                 # New: home page blog preview
  project-card.tsx                # New: reusable project card
  project-filter.tsx              # New: tech filter pills
  blog-card.tsx                   # New: reusable blog card
  blog-post-layout.tsx            # New: MDX post layout with TOC
  table-of-contents.tsx           # New: sticky TOC sidebar
  mdx-components.tsx              # New: custom MDX component overrides
  experience-timeline.tsx         # Update: redesigned with GSAP
  tech-stack.tsx                  # Update: redesigned layout
  contributions.tsx               # Update: glass-morphism restyling
  nav-bar.tsx                     # Update: new routes, resume CTA
  footer.tsx                      # Update: BMC link, new layout
  buy-me-coffee.tsx               # New: custom BMC button
  page-entrance.tsx               # New: GSAP page entrance animation wrapper
  scroll-animation.tsx            # New: reusable GSAP scroll wrapper

lib/
  blog.ts                         # New: MDX utilities (list, get, filter)
  data.ts                         # Update: expand if needed
```

## Files to Remove

```
components/
  blogs.tsx                       # Replaced by new blog system
  education.tsx                   # Section dropped
  certificates.tsx                # Section dropped
  section-background.tsx          # Replaced by new styling approach
  loading-spinner.tsx             # Replace with skeleton/shimmer if needed
```

## Starter Blog Post

Include one starter blog post (`content/blog/hello-world.mdx`) with real content — a short "Welcome to my blog" post that demonstrates the MDX setup works (headings, code block, paragraph, tags).
