"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ACCENT } from "@/lib/tokens";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: ACCENT,
        transformOrigin: "0 50%",
        scaleX,
        zIndex: 90,
      }}
    />
  );
}
