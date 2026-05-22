"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, FG } from "@/lib/tokens";

/* SVG path that draws on scroll into view using stroke-dasharray. */
export function DrawPath({ d, stroke = FG, strokeWidth = 1.2, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}
