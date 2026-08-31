"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";

export default function MagneticAction({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--mx", `${x}px`);
      element.style.setProperty("--my", `${y}px`);
      element.style.transform = `translate3d(${(x - rect.width / 2) * 0.055}px, ${(y - rect.height / 2) * 0.08}px, 0)`;
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className="magnetic-action"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
