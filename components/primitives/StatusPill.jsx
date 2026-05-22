"use client";

import { motion } from "framer-motion";
import { ACCENT, LIVE, MUTED } from "@/lib/tokens";

/* Colored mono pill with optional pulsing dot.
   Used in Current Focus + Lab + section status indicators. */
const STATUS_MAP = {
  active: { color: LIVE, pulse: true },
  "in use": { color: LIVE, pulse: true },
  shipping: { color: LIVE, pulse: false },
  exploring: { color: ACCENT, pulse: false },
  rebuilding: { color: ACCENT, pulse: false },
  curious: { color: MUTED, pulse: false },
  shelved: { color: MUTED, pulse: false },
};

export function StatusPill({ status }) {
  const m = STATUS_MAP[status] || { color: MUTED, pulse: false };
  return (
    <span className="inline-flex items-center gap-2.5">
      <motion.span
        aria-hidden
        className="inline-block rounded-full"
        style={{
          width: 7,
          height: 7,
          background: m.color,
          boxShadow: m.pulse ? `0 0 8px ${m.color}` : "none",
        }}
        animate={m.pulse ? { opacity: [1, 0.45, 1] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="t-meta" style={{ color: m.color }}>
        {status}
      </span>
    </span>
  );
}
