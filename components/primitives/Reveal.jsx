"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/tokens";

/* Clip-path + translateY reveal on entry into the viewport.
   `once` (default true) keeps the reveal from re-firing on scroll-back. */
export function Reveal({ children, delay = 0, y = 40, className = "", once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y, clipPath: "inset(0 0 100% 0)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
            : { opacity: 0, y, clipPath: "inset(0 0 100% 0)" }
        }
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
