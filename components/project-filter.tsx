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
      <div className="flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">Filter / system class</p>
        <div className="flex flex-wrap" aria-label="Filter projects">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "min-h-11 border border-border px-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index > 0 && "-ml-px",
                activeCategory === category
                  ? "relative z-10 border-primary bg-primary text-primary-foreground"
                  : "bg-card/45 text-muted-foreground hover:bg-card hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((project) => <ProjectCard key={project.slug} {...project} />)}
      </div>
    </div>
  );
}
