"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TOCItem = { id: string; text: string; level: number };

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const headings = useMemo(() => {
    const items: TOCItem[] = [];
    const regex = /^#{2,3}\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1];
      items.push({ id: slugifyHeading(text), text, level: match[0].startsWith("###") ? 3 : 2 });
    }
    return items;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveId(entry.target.id)),
      { rootMargin: "-15% 0px -72% 0px" },
    );
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const links = (
    <ol className="mt-4 flex flex-col gap-1">
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={cn(
              "grid grid-cols-[1.5rem_1fr] gap-2 rounded-md py-1.5 text-sm leading-5 transition-colors",
              heading.level === 3 && "pl-3",
              activeId === heading.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="font-mono text-[0.65rem] text-current/60">{String(index + 1).padStart(2, "0")}</span>
            <span>{heading.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="group rounded-xl border border-border bg-card/50 p-5 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground">
          On this page
          <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        {links}
      </details>
      <nav className="hidden lg:block" aria-label="On this page">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
        {links}
      </nav>
    </>
  );
}
