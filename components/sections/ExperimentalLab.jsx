"use client";

import { motion } from "framer-motion";
import { ACCENT, BG, EASE, FG, HAIR_STRONG } from "@/lib/tokens";
import { LAB } from "@/lib/content";
import { useRelativeTime } from "@/hooks";
import {
  Reveal,
  SectionLabel,
  StatusPill,
  VRot,
} from "@/components/primitives";

/* LabTile — one experiment card with tech, status, live-updating timestamp. */
function LabTile({ entry, i }) {
  const relative = useRelativeTime(entry.touched);
  return (
    <Reveal delay={i * 0.05}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="ss-lab-tile p-7 h-full flex flex-col"
        style={{
          border: `1px solid ${HAIR_STRONG}`,
          borderRadius: 2,
        }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <div className="t-caption opacity-50 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </div>
          <StatusPill status={entry.status} />
        </div>
        <h3
          className="mt-5 font-serif"
          style={{
            fontSize: "clamp(20px, 1.6vw, 26px)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontVariationSettings: "'opsz' 36",
          }}
        >
          {entry.title}
        </h3>
        {entry.tech && (
          <div
            className="mt-2 t-caption opacity-55"
            style={{ letterSpacing: "0.3em" }}
          >
            {entry.tech}
          </div>
        )}
        <p
          className="mt-3 font-serif italic opacity-75 flex-grow"
          style={{
            fontSize: 15,
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            fontVariationSettings: "'opsz' 18",
          }}
        >
          {entry.body}
        </p>
        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="t-caption opacity-45">
            LAST TOUCHED · {relative.toUpperCase()}
          </div>
          {entry.repo ? (
            <a
              href={entry.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="ss-link t-meta-tight"
              style={{ paddingBottom: 2 }}
            >
              Repo ↗
            </a>
          ) : (
            <span className="t-caption opacity-30">PRIVATE</span>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}

export function ExperimentalLab() {
  return (
    <section
      id="lab"
      className="relative px-5 md:px-10 py-32 md:py-44"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>LAB — 07</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel
            index="07"
            title="Experimental Lab"
            count={`${LAB.length} EXPERIMENTS`}
          />
          <Reveal delay={0.05}>
            <h2 className="mt-10 t-section">
              <span className="block overflow-hidden">Things</span>
              <span
                className="block overflow-hidden italic"
                style={{ fontWeight: 400 }}
              >
                in progress
                <span
                  style={{
                    color: ACCENT,
                    fontStyle: "normal",
                    display: "inline-block",
                    marginLeft: "0.02em",
                  }}
                >
                  .
                </span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl t-lead italic opacity-70">
              Half-built experiments and side explorations. Honest about
              status — not every idea ships, and that's the point.
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LAB.map((e, i) => (
              <LabTile key={e.title} entry={e} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
