"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";

interface WordSwapProps {
  words: string[];
  interval?: number;
  style?: CSSProperties;
}

export default function WordSwap({
  words,
  interval = 2200,
  style,
}: WordSwapProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <span aria-hidden style={{ visibility: "hidden" }}>
        {longest}
      </span>
      {words.map((w, j) => (
        <span
          key={w}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: j === i ? 1 : 0,
            transform: j === i ? "translateY(0)" : "translateY(0.12em)",
            transition:
              "opacity .45s ease, transform .45s cubic-bezier(.2,.7,.3,1)",
            color: "var(--accent)",
            whiteSpace: "nowrap",
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
