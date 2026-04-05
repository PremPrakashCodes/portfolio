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
