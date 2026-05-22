"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ACCENT } from "@/lib/tokens";

/* Per-character typing animation triggered on viewport entry.
   The blinking caret stays until the line completes. */
export function TypewriterLine({ text, start = 0, speed = 28, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const total = text.length;
    const startTimer = setTimeout(function tick() {
      i += 1;
      setN(i);
      if (i < total) setTimeout(tick, speed);
    }, start);
    return () => clearTimeout(startTimer);
  }, [inView, text, speed, start]);
  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, n)}
      {inView && n < text.length && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.55em",
            marginLeft: 2,
            color: ACCENT,
            animation: "ssCaret 0.85s steps(1) infinite",
          }}
        >
          |
        </span>
      )}
    </span>
  );
}
