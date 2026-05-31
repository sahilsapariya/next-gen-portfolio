"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ACCENT, BG, EASE, FG, HAIR, HAIR_STRONG } from "@/lib/tokens";
import { Reveal, SectionLabel, VRot } from "@/components/primitives";
import { useIsCompact } from "@/hooks";

/* ──────────────────────────────────────────────────────────────────────
   The Path — one continuous serpentine flow showing how a feature moves
   from an idea to production. Replaces the previous three small
   box-and-arrow diagrams. The path draws on scroll and the stage nodes
   pop in along it.
   ────────────────────────────────────────────────────────────────────── */

/* Stage positions hand-tuned to sit at the bezier extrema of PATH below.
   Labels alternate above (peaks) and below (troughs) to follow the wave. */
const STAGES = [
  { x: 70,   y: 160, num: "01", label: "Brief",          desc: "Understand the problem, the constraint, the user.",     side: "above" },
  { x: 250,  y: 90,  num: "02", label: "Schema",         desc: "Data model first. Shape before code.",                  side: "above" },
  { x: 440,  y: 230, num: "03", label: "Contracts",      desc: "Module boundaries — what each piece owes the others.",  side: "below" },
  { x: 630,  y: 160, num: "04", label: "Implementation", desc: "The smallest version that proves it. Ship that first.", side: "above" },
  { x: 820,  y: 90,  num: "05", label: "Preview",        desc: "Every PR gets its own URL. Reviewers see the change.",  side: "above" },
  { x: 1010, y: 230, num: "06", label: "Review",         desc: "A conversation between author and reader. Not a gate.", side: "below" },
  { x: 1180, y: 160, num: "07", label: "Ship",           desc: "Production. Then monitor what just changed.",           side: "above" },
];

/* Smooth wavy curve through the stages. Peaks at y≈90, troughs at y≈230,
   crossings at y=160. */
const PATH =
  "M 70 160 " +
  "C 130 70, 200 70, 250 90 " +
  "C 320 110, 380 230, 440 230 " +
  "C 500 230, 580 90, 630 160 " +
  "C 680 230, 760 70, 820 90 " +
  "C 890 110, 960 230, 1010 230 " +
  "C 1070 230, 1140 100, 1180 160";

/* A small "iterate" loop branch that returns from Ship back to Brief.
   Drawn dashed and subtler to signal the secondary nature of the cycle. */
const LOOP_PATH =
  "M 1180 160 " +
  "C 1230 220, 1230 290, 1150 290 " +
  "L 100 290 " +
  "C 20 290, 20 220, 70 160";

/* Vertical wave path — portrait orientation for mobile/tablet ≤ 1024 px.
   viewBox "0 0 280 580". Centre axis x=90, right peaks x≈148, left peaks x≈32. */
const V_PATH =
  "M 90 30 " +
  "C 90 65, 148 85, 148 112 " +
  "C 148 139, 80 162, 32 192 " +
  "C -16 222, 32 252, 90 272 " +
  "C 148 292, 148 325, 148 352 " +
  "C 148 379, 80 405, 32 432 " +
  "C -16 459, 50 492, 90 512";

/* Dashed iterate-loop arc on the right side of the vertical diagram. */
const V_LOOP_PATH =
  "M 90 512 " +
  "C 125 548, 172 548, 172 272 " +
  "C 172 5, 125 5, 90 30";

/* Per-stage positions in the vertical viewBox (280 × 580).
   All labels render to the right of the dot (textAnchor start, x = cx + 12).
   Left-peak nodes (cx=32) point right into the open centre space. */
const V_STAGES = [
  { cx: 90,  cy: 30,  side: "right", isAccent: true  }, // 01 Brief
  { cx: 148, cy: 112, side: "right", isAccent: false }, // 02 Schema
  { cx: 32,  cy: 192, side: "right", isAccent: false }, // 03 Contracts
  { cx: 90,  cy: 272, side: "right", isAccent: false }, // 04 Implementation
  { cx: 148, cy: 352, side: "right", isAccent: false }, // 05 Preview
  { cx: 32,  cy: 432, side: "right", isAccent: false }, // 06 Review
  { cx: 90,  cy: 512, side: "right", isAccent: true  }, // 07 Ship
];

/* Renders the existing horizontal serpentine — desktop only (> 1024 px). */
function HorizontalWave({ inView }) {
  return (
    <svg
      viewBox="0 0 1240 360"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      {/* Iterate loop — drawn first, behind everything */}
      <motion.path
        d={LOOP_PATH}
        fill="none"
        stroke={HAIR}
        strokeWidth="0.8"
        strokeDasharray="3 5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay: 1.4 }}
      />

      {/* The main wave */}
      <motion.path
        d={PATH}
        fill="none"
        stroke={HAIR_STRONG}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 2.4, ease: EASE }}
      />

      {/* "iterate" label on the loop */}
      <motion.text
        x={625}
        y={308}
        textAnchor="middle"
        fill={FG}
        fontSize="12"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.32em"
        style={{ textTransform: "uppercase", opacity: 0.5 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.6, delay: 2.8 }}
      >
        iterate
      </motion.text>

      {/* Stage nodes + labels */}
      {STAGES.map((s, i) => {
        const labelY = s.side === "above" ? s.y - 28 : s.y + 38;
        const delay = 0.4 + i * 0.18;
        return (
          <g key={s.num}>
            {(i === 0 || i === STAGES.length - 1) && (
              <motion.circle
                cx={s.x}
                cy={s.y}
                r="11"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 0.6, scale: 1 } : {}}
                transition={{ duration: 0.6, delay, ease: EASE }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            )}
            <motion.circle
              cx={s.x}
              cy={s.y}
              r="5"
              fill={i === 0 || i === STAGES.length - 1 ? ACCENT : FG}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <motion.text
              x={s.x}
              y={labelY}
              textAnchor="middle"
              fill={FG}
              fontSize="13"
              fontFamily="var(--font-mono), monospace"
              letterSpacing="0.22em"
              style={{ textTransform: "uppercase" }}
              initial={{ opacity: 0, y: s.side === "above" ? -4 : 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.15, ease: EASE }}
            >
              {s.num} / {s.label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* Renders the portrait-orientation serpentine — mobile + tablet (≤ 1024 px). */
function VerticalWave({ inView }) {
  return (
    <svg
      viewBox="0 0 280 580"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Iterate loop arc — dashed, right side, draws in after main path */}
      <motion.path
        d={V_LOOP_PATH}
        fill="none"
        stroke={HAIR}
        strokeWidth="0.8"
        strokeDasharray="3 5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay: 1.4 }}
      />

      {/* Main serpentine wave */}
      <motion.path
        d={V_PATH}
        fill="none"
        stroke={HAIR_STRONG}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 2.4, ease: EASE }}
      />

      {/* "iterate" label — rotated 90° along the right-side arc */}
      <motion.text
        x={178}
        y={272}
        textAnchor="middle"
        fill={FG}
        fontSize="8"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.32em"
        style={{ textTransform: "uppercase" }}
        transform="rotate(90, 178, 272)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : {}}
        transition={{ duration: 0.6, delay: 2.8 }}
      >
        iterate
      </motion.text>

      {/* Stage nodes + labels */}
      {V_STAGES.map((vs, i) => {
        const s = STAGES[i];
        const delay = 0.4 + i * 0.18;
        const labelX = vs.cx + 12;
        const anchor  = "start";

        return (
          <g key={s.num}>
            {/* Accent outer ring for Brief (i=0) and Ship (i=6) */}
            {vs.isAccent && (
              <motion.circle
                cx={vs.cx}
                cy={vs.cy}
                r="11"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 0.6, scale: 1 } : {}}
                transition={{ duration: 0.6, delay, ease: EASE }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            )}

            {/* Main dot */}
            <motion.circle
              cx={vs.cx}
              cy={vs.cy}
              r="5"
              fill={vs.isAccent ? ACCENT : FG}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />

            {/* Stage number */}
            <motion.text
              x={labelX}
              y={vs.cy - 4}
              textAnchor={anchor}
              fill={vs.isAccent ? ACCENT : FG}
              fontSize="9"
              fontFamily="var(--font-mono), monospace"
              letterSpacing="0.22em"
              style={{ textTransform: "uppercase" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.15, ease: EASE }}
            >
              {s.num}
            </motion.text>

            {/* Stage label */}
            <motion.text
              x={labelX}
              y={vs.cy + 9}
              textAnchor={anchor}
              fill={FG}
              fontSize="8.5"
              fontFamily="var(--font-mono), monospace"
              letterSpacing="0.18em"
              style={{ textTransform: "uppercase" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.7 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.2, ease: EASE }}
            >
              {s.label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

function FlowDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const compact = useIsCompact();
  return (
    <div
      ref={ref}
      className="relative w-full mt-20 md:mt-24"
      style={{
        border: `1px solid ${HAIR}`,
        background:
          "linear-gradient(180deg, rgba(234,229,220,0.012), rgba(14,14,12,0))",
      }}
    >
      {compact ? <VerticalWave inView={inView} /> : <HorizontalWave inView={inView} />}
    </div>
  );
}

function StageDescription({ stage, i, total }) {
  return (
    <Reveal delay={i * 0.04}>
      <div className="grid grid-cols-12 gap-4 py-6 md:py-7 items-baseline">
        <div className="col-span-2 md:col-span-1 t-caption opacity-45 tabular-nums">
          {stage.num}
        </div>
        <div className="col-span-10 md:col-span-3 t-meta-tight">
          {stage.label}
        </div>
        <div
          className="col-span-12 md:col-span-8 font-serif italic"
          style={{
            fontSize: "clamp(17px, 1.3vw, 21px)",
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            fontVariationSettings: "'opsz' 36",
            opacity: 0.85,
          }}
        >
          {stage.desc}
        </div>
      </div>
      {i < total - 1 && (
        <div
          aria-hidden
          style={{ height: 1, width: "100%", background: HAIR }}
        />
      )}
    </Reveal>
  );
}

export function Systems() {
  return (
    <section
      id="systems"
      className="relative px-5 md:px-10 py-32 md:py-44"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>SYSTEMS — 04</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel index="04" title="Systems & Engineering" count="THE PATH" />
          <Reveal delay={0.05}>
            <h2 className="mt-10 t-section">
              <span className="block overflow-hidden">How</span>
              <span
                className="block overflow-hidden italic"
                style={{ fontWeight: 400 }}
              >
                I work
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
            <p className="mt-8 max-w-2xl t-lead italic opacity-75">
              One continuous flow — from a brief to production and back again.
              Each stage is a decision; each curve is a habit that's taken a
              while to learn.
            </p>
          </Reveal>

          <FlowDiagram />

          <div className="mt-20 md:mt-24">
            <div
              aria-hidden
              style={{ height: 1, width: "100%", background: HAIR_STRONG }}
            />
            {STAGES.map((s, i) => (
              <StageDescription
                key={s.num}
                stage={s}
                i={i}
                total={STAGES.length}
              />
            ))}
            <div
              aria-hidden
              style={{ height: 1, width: "100%", background: HAIR_STRONG }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
