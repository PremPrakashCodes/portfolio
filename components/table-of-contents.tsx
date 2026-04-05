"use client";

import { useEffect, useMemo, useState } from "react";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");

  const headings = useMemo(() => {
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
    return items;
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
