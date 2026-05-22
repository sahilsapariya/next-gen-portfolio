"use client";

import { motion } from "framer-motion";
import { ACCENT, BG, EASE, FG, HAIR, HAIR_STRONG } from "@/lib/tokens";
import {
  DrawPath,
  Reveal,
  SectionLabel,
  VRot,
} from "@/components/primitives";

/* SystemsDiagram — labelled boxes connected by SVG paths that draw on view. */
function SystemsDiagram({ title, nodes, paths, caption }) {
  return (
    <div className="mt-20 md:mt-24">
      <Reveal>
        <div className="t-meta-tight opacity-55 mb-3">{title}</div>
      </Reveal>
      <div
        className="relative w-full"
        style={{
          border: `1px solid ${HAIR}`,
          background: "rgba(234,229,220,0.015)",
        }}
      >
        <svg
          viewBox="0 0 1000 220"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block" }}
        >
          {paths.map((p, i) => (
            <DrawPath
              key={i}
              d={p}
              stroke={HAIR_STRONG}
              strokeWidth="1"
              delay={0.2 + i * 0.1}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <motion.rect
                x={n.x - 60}
                y={n.y - 22}
                width="120"
                height="44"
                fill="none"
                stroke={FG}
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              />
              <motion.text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fill={FG}
                fontSize="11"
                fontFamily="var(--font-mono), monospace"
                letterSpacing="0.18em"
                style={{ textTransform: "uppercase" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {n.label}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
      <Reveal delay={0.4}>
        <p className="mt-5 max-w-2xl t-body italic opacity-75">{caption}</p>
      </Reveal>
    </div>
  );
}

const DIAGRAMS = [
  {
    title: "01 — FROM FEATURE BRIEF TO SHIPPED",
    nodes: [
      { x: 80, y: 110, label: "Brief" },
      { x: 240, y: 110, label: "Schema" },
      { x: 400, y: 110, label: "Contracts" },
      { x: 560, y: 110, label: "UI" },
      { x: 720, y: 110, label: "Review" },
      { x: 900, y: 110, label: "Ship" },
    ],
    paths: [
      "M 140 110 L 180 110",
      "M 300 110 L 340 110",
      "M 460 110 L 500 110",
      "M 620 110 L 660 110",
      "M 780 110 L 840 110",
    ],
    caption:
      "Schema-first. Contracts before UI. Reviews are conversations, not gates. The smallest version that proves the idea ships first.",
  },
  {
    title: "02 — DEPLOYMENT LOOP",
    nodes: [
      { x: 130, y: 110, label: "Commit" },
      { x: 320, y: 110, label: "CI" },
      { x: 510, y: 110, label: "Preview" },
      { x: 700, y: 110, label: "Review" },
      { x: 890, y: 110, label: "Prod" },
    ],
    paths: [
      "M 190 110 L 260 110",
      "M 380 110 L 450 110",
      "M 570 110 L 640 110",
      "M 760 110 L 830 110",
      "M 890 65 C 940 30, 940 30, 130 30 L 130 65",
    ],
    caption:
      "Honest about scale — preview URLs for every PR, CI catches the obvious, review catches the rest. No fake k8s theatre.",
  },
  {
    title: "03 — AI IN MY WORKFLOW",
    nodes: [
      { x: 110, y: 110, label: "Prompt" },
      { x: 300, y: 110, label: "Critique" },
      { x: 490, y: 110, label: "Patch" },
      { x: 680, y: 110, label: "Tests" },
      { x: 870, y: 110, label: "Diff" },
    ],
    paths: [
      "M 170 110 L 240 110",
      "M 360 110 L 430 110",
      "M 550 110 L 620 110",
      "M 740 110 L 810 110",
    ],
    caption:
      "AI helps generate, critique, and accelerate — but engineering judgment stays mine. The loop ends with a diff I'd sign my name to.",
  },
];

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
          <SectionLabel index="04" title="Systems & Engineering" count="3 FLOWS" />
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
          {DIAGRAMS.map((d) => (
            <SystemsDiagram key={d.title} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}
