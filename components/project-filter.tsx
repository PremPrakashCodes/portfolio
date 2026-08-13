"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./project-card";
import { cn } from "@/lib/utils";

const categories = ["All", "AI", "Web"] as const;

export default function ProjectFilter() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(
    () => activeCategory === "All" ? [...projects] : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activeCategory === category
                ? "border-foreground/15 bg-foreground text-background shadow-[0_8px_24px_hsl(var(--foreground)/0.08)]"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((project) => <ProjectCard key={project.slug} {...project} />)}
      </div>
    </div>
  );
}
