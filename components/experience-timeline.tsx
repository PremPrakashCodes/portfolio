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
