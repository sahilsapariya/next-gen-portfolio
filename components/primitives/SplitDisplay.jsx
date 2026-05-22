"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/tokens";

/* Per-letter rise cascade on entry. Used for display headlines.
   - Outer line wrapper (in the consuming code) handles overflow:hidden
     during the rise — so we deliberately don't clip the inner span,
     which would crop italic descenders (y, p, g, j).
   - Spaces are rendered as non-breaking spaces so word gaps don't
     collapse inside the per-letter inline-block boxes. */
export function SplitDisplay({ text, delay = 0, italic = false, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span
      ref={ref}
      aria-label={text}
      className={className}
      style={{ fontStyle: italic ? "italic" : "normal" }}
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="inline-block align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 1.0,
              delay: delay + i * 0.035,
              ease: EASE,
            }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
