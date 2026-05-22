"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

/* Seamless infinite horizontal text band.
   Uses Framer Motion's useAnimationFrame so the scroll is driven at the
   display refresh rate with no CSS-keyframe reset flicker.

   speed  — pixels per second (default 80).  Higher = faster.
   reverse — scroll right-to-left when false (default), left-to-right when true. */
export function MarqueeRow({ children, speed = 80, reverse = false }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;

    /* Half the scroll width is exactly one copy of the content.
       When we've scrolled that far, snap back to 0 — seamlessly. */
    const half = track.scrollWidth / 2;
    const pxPerMs = speed / 1000;
    const direction = reverse ? 1 : -1;

    let next = x.get() + direction * pxPerMs * delta;

    /* Wrap: keep x in the range [-half, 0) for forward,
       (0, half] for reverse. */
    if (!reverse && next <= -half) next += half;
    if (reverse && next >= 0) next -= half;

    x.set(next);
  });

  return (
    <div className="overflow-hidden w-full" aria-hidden>
      <motion.div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {/* Two identical copies — when the first scrolls fully off-screen
            the second is already in place, making the loop invisible. */}
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
