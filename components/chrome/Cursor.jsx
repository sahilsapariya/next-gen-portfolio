"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FG } from "@/lib/tokens";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 380, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 380, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mv = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      setHover(
        !!(
          t.closest("[data-cursor='hover']") ||
          t.closest("a") ||
          t.closest("button")
        )
      );
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[210] pointer-events-none rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: hover ? 48 : 12,
        height: hover ? 48 : 12,
        background: hover ? FG : "transparent",
        border: hover ? "none" : `1px solid ${FG}`,
        mixBlendMode: "difference",
        transition:
          "width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), background .25s ease",
      }}
    />
  );
}
