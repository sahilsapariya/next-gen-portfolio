"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ACCENT, BG, FG, LIVE } from "@/lib/tokens";
import { JOURNEY } from "@/lib/content";
import { Hairline, Reveal, SectionLabel, VRot } from "@/components/primitives";

/* JourneyEntry — year + body row. As the row crosses the viewport's
   middle band the year scales up and shifts to accent color. */
function JourneyEntry({ entry }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.25, 1, 1, 0.25]
  );
  const yearScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.92, 1.08, 1.08, 0.92]
  );
  const yearColor = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.6, 0.7],
    [FG, ACCENT, ACCENT, FG]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-baseline"
    >
      <motion.div
        className="col-span-12 md:col-span-3 font-serif tabular-nums"
        style={{
          fontSize: "clamp(36px, 4.5vw, 72px)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontVariationSettings: "'opsz' 144",
          scale: yearScale,
          color: yearColor,
          transformOrigin: "left center",
        }}
      >
        {entry.year}
        {entry.active && (
          <motion.span
            aria-hidden
            className="inline-block ml-3"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: LIVE,
              boxShadow: `0 0 10px ${LIVE}`,
              verticalAlign: "middle",
            }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
      <div
        className="col-span-12 md:col-span-9 font-serif"
        style={{
          fontSize: "clamp(18px, 1.4vw, 22px)",
          lineHeight: 1.55,
          letterSpacing: "-0.005em",
          fontVariationSettings: "'opsz' 36",
          color: entry.highlight ? ACCENT : "inherit",
        }}
      >
        {entry.body}
      </div>
    </motion.div>
  );
}

export function Journey() {
  return (
    <section
      id="journey"
      className="relative px-5 md:px-10 py-32 md:py-44"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>JOURNEY — 06</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel index="06" title="Journey" count="2017 → TODAY" />
          <Reveal delay={0.05}>
            <h2 className="mt-10 t-section">
              <span className="block overflow-hidden">A working</span>
              <span
                className="block overflow-hidden italic"
                style={{ fontWeight: 400 }}
              >
                timeline
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
          <div className="mt-16 md:mt-20">
            <Hairline strong />
            {JOURNEY.map((e, i) => (
              <React.Fragment key={i}>
                <JourneyEntry entry={e} />
                <Hairline />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
