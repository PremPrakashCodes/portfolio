"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TOKENS = "01<>/{}[]*#@";

export default function TokenResolve({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    const startedAt = performance.now();
    const duration = 1050;
    let frame = 0;

    const resolve = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const resolved = Math.floor(progress * text.length);

      setOutput(
        text
          .split("")
          .map((character, index) => {
            if (character === " " || index < resolved) return character;
            return TOKENS[(index * 7 + Math.floor(now / 42)) % TOKENS.length];
          })
          .join(""),
      );

      if (progress < 1) frame = requestAnimationFrame(resolve);
    };

    frame = requestAnimationFrame(resolve);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, text]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
