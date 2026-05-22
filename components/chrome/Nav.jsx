"use client";

import { motion } from "framer-motion";
import { ACCENT, FG } from "@/lib/tokens";
import { NAV_LINKS } from "@/lib/content";
import { useActiveSection } from "@/hooks";

export function Nav({ time }) {
  const active = useActiveSection([
    "top",
    "focus",
    "work",
    "systems",
    "notes",
    "journey",
    "lab",
    "philosophy",
    "contact",
  ]);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-6 flex items-center justify-between t-meta-tight"
      style={{ color: FG, mixBlendMode: "difference" }}
    >
      <a href="#top" data-cursor="hover" className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex items-center justify-center"
          style={{
            width: 30,
            height: 30,
            border: `1px solid ${FG}`,
            borderRadius: 2,
            fontSize: 10,
            letterSpacing: "0.15em",
          }}
        >
          SS
        </span>
        <span className="hidden md:inline opacity-65">Sahil Sapariya</span>
      </a>
      <nav className="ss-nav hidden md:flex items-center gap-9">
        {NAV_LINKS.map((l) => (
          <a key={l.id} data-cursor="hover" href={l.href} className="relative">
            <span
              style={{
                opacity: active === l.id ? 1 : 0.55,
                transition: "opacity .3s",
              }}
            >
              {l.label}
            </span>
            {active === l.id && (
              <motion.span
                layoutId="nav-dot"
                style={{
                  position: "absolute",
                  left: -12,
                  top: "50%",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: ACCENT,
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2 opacity-65 tabular-nums">
        {time}
        <span className="opacity-55">IST</span>
      </div>
    </header>
  );
}
