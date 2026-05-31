"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ACCENT, BG, FG, HAIR, HAIR_STRONG } from "@/lib/tokens";
import { NOTES } from "@/lib/content";
import { useIsCompact } from "@/hooks";
import { Reveal, SectionLabel } from "@/components/primitives";

/* FieldNoteCard — one production story tile. */
function FieldNoteCard({ note }) {
  return (
    <article
      className="ss-note-card relative h-full flex flex-col p-7 md:p-9"
      style={{
        border: `1px solid ${HAIR_STRONG}`,
        borderRadius: 2,
        background: "rgba(234,229,220,0.01)",
        minHeight: 380,
      }}
    >
      <div className="flex items-baseline justify-between">
        <div className="t-caption opacity-50 tabular-nums">NOTE {note.n}</div>
        <div className="t-caption" style={{ color: ACCENT }}>
          {note.tag}
        </div>
      </div>
      <h3
        className="mt-7 font-serif italic"
        style={{
          fontSize: "clamp(22px, 1.9vw, 32px)",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        {note.title}
      </h3>
      <p
        className="mt-5 t-sans flex-grow"
        style={{ color: "rgba(234,229,220,0.85)" }}
      >
        {note.body}
      </p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {note.pills.map((p) => (
          <span
            key={p}
            className="t-caption px-2 py-1"
            style={{
              border: `1px solid ${HAIR}`,
              borderRadius: 2,
              letterSpacing: "0.2em",
              opacity: 0.75,
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </article>
  );
}

export function FieldNotes() {
  const ref = useRef(null);
  const isCompact = useIsCompact();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  /* Translate the inner track horizontally as we scroll vertically.
     -68% chosen so the last card's right edge lines up with viewport right. */
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  if (isCompact) {
    /* Mobile fallback — stack vertically, no horizontal scroll.
       id="notes" must also be here so the nav anchor target exists
       on mobile (it's not just a desktop-only feature). */
    return (
      <section
        id="notes"
        className="relative px-5 md:px-10 py-32"
        style={{ background: BG, color: FG, borderTop: `1px solid ${HAIR}` }}
      >
        <SectionLabel index="05" title="Field Notes" count="5 NOTES" />
        <Reveal delay={0.05}>
          <h2 className="mt-10 t-section">
            <span className="block overflow-hidden">Notes from</span>
            <span
              className="block overflow-hidden italic"
              style={{ fontWeight: 400 }}
            >
              production
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
          <p className="mt-6 max-w-xl t-lead italic opacity-70">
            Real engineering moments, abstracted to protect client and internal
            details. Lessons production teaches that documentation doesn't.
          </p>
        </Reveal>
        <div className="mt-16 space-y-12">
          {NOTES.map((n) => (
            <Reveal key={n.n}>
              <FieldNoteCard note={n} />
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="notes"
      className="relative"
      style={{
        background: BG,
        color: FG,
        height: "420vh",
        borderTop: `1px solid ${HAIR}`,
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header band */}
        <div className="px-5 md:px-10 pt-12 pb-4">
          <SectionLabel
            index="05"
            title="Field Notes"
            count="5 NOTES — SCROLL HORIZONTALLY"
          />
          <Reveal delay={0.05}>
            <h2
              className="mt-6 font-serif"
              style={{
                fontSize: "clamp(28px, 3.2vw, 54px)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                fontVariationSettings: "'opsz' 72",
                fontWeight: 300,
              }}
            >
              <span className="block overflow-hidden">Notes from</span>
              <span
                className="block overflow-hidden italic"
                style={{ fontWeight: 400 }}
              >
                production
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
        </div>

        {/* Horizontal scroll track */}
        <div className="relative flex-grow flex items-center px-5 md:px-10">
          <motion.div
            style={{ x }}
            className="flex gap-8 will-change-transform"
          >
            {/* Lead-in copy as first "card" so the section opens with a thought */}
            <div
              className="shrink-0 flex flex-col justify-end pb-12"
              style={{ width: "min(420px, 80vw)" }}
            >
              <p className="t-lead italic opacity-80">
                Real engineering moments, abstracted to protect client and
                internal details.
              </p>
              <p className="mt-4 t-caption opacity-50">
                ← SCROLL ↓ TO ADVANCE →
              </p>
            </div>
            {NOTES.map((n) => (
              <div
                key={n.n}
                className="shrink-0"
                style={{ width: "min(520px, 86vw)" }}
              >
                <FieldNoteCard note={n} />
              </div>
            ))}
            {/* Trailing closer */}
            <div
              className="shrink-0 flex flex-col justify-center"
              style={{ width: "min(360px, 78vw)" }}
            >
              <div className="t-caption opacity-50">END OF NOTES</div>
              <p
                className="mt-3 font-serif italic"
                style={{ fontSize: 22, lineHeight: 1.4 }}
              >
                More live in commit messages.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Progress rail */}
        <div className="px-5 md:px-10 pb-8">
          <div className="flex items-center gap-3 t-caption">
            <span className="opacity-55">PROGRESS</span>
            <div className="flex-grow h-px relative" style={{ background: HAIR }}>
              <motion.div
                className="absolute inset-0"
                style={{
                  background: ACCENT,
                  transformOrigin: "0 50%",
                  scaleX: scrollYProgress,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
