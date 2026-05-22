"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ACCENT, BG, FG, HAIR, HAIR_STRONG } from "@/lib/tokens";
import { PROJECTS } from "@/lib/content";
import { useIsMobile } from "@/hooks";
import {
  Hairline,
  LivePreview,
  Reveal,
  SectionLabel,
  VRot,
} from "@/components/primitives";

/* ProjectPanel — desktop renders a pinned 320vh section that morphs through
   3 stages (Context · Decision · Outcome) as you scroll. Mobile falls back
   to a flat stacked layout since pinning needs the height to feel right. */
function ProjectPanel({ project }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const oContext = useTransform(
    scrollYProgress,
    [0, 0.05, 0.32, 0.42],
    [0, 1, 1, 0]
  );
  const oDecision = useTransform(
    scrollYProgress,
    [0.32, 0.42, 0.62, 0.72],
    [0, 1, 1, 0]
  );
  const oOutcome = useTransform(scrollYProgress, [0.62, 0.72, 1], [0, 1, 1]);
  const stage = useTransform(scrollYProgress, (v) =>
    v < 0.42 ? 1 : v < 0.72 ? 2 : 3
  );
  const [stageNum, setStageNum] = useState(1);
  useEffect(() => {
    const unsub = stage.on("change", (v) => setStageNum(v));
    return unsub;
  }, [stage]);

  if (isMobile) {
    return (
      <article className="border-b" style={{ borderColor: HAIR_STRONG }}>
        <div className="grid grid-cols-12 gap-3 py-10 items-baseline">
          <div className="col-span-2 t-caption">({project.n})</div>
          <div className="col-span-8 t-block">{project.title}</div>
          <div className="col-span-2 t-caption text-right">{project.year}</div>
        </div>
        <div className="space-y-8 pb-12">
          <div>
            <div className="t-caption mb-2">Context</div>
            <p className="t-lead">{project.context}</p>
            <p className="t-lead mt-3 opacity-80 italic">{project.role}</p>
          </div>
          <div>
            <div className="t-caption mb-2" style={{ color: ACCENT }}>
              Hardest decision
            </div>
            <p className="t-lead italic">{project.decision}</p>
          </div>
          <div>
            <div className="t-caption mb-2">Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="ss-tag">{s}</span>
              ))}
            </div>
            {project.links && (
              <div className="mt-5 flex flex-wrap gap-5 t-meta-tight">
                {project.links.repo && (
                  <a
                    className="ss-link"
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repository ↗
                  </a>
                )}
                {project.links.live && (
                  <a
                    className="ss-link"
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: ACCENT }}
                  >
                    View Live ↗
                  </a>
                )}
              </div>
            )}
            {!project.links && (
              <div className="mt-5 t-caption opacity-55">PRIVATE · INTERNAL PRODUCT</div>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: "320vh" }}
      data-cursor="hover"
    >
      <div className="sticky top-0 h-screen flex flex-col px-5 md:px-10 py-24 md:py-28">
        {/* Header band — always visible */}
        <div className="grid grid-cols-12 gap-4 items-baseline">
          <div className="col-span-1 t-caption">({project.n})</div>
          <div className="col-span-7 flex items-baseline gap-5">
            <h3 className="t-block font-serif" style={{ margin: 0 }}>
              {project.title}
            </h3>
            <span className="t-meta opacity-50">{project.year}</span>
          </div>
          <div className="col-span-4 flex justify-end items-baseline gap-3">
            <span className="t-caption opacity-55">{project.status}</span>
          </div>
        </div>

        <Hairline strong className="mt-6" />

        {/* Stage indicator */}
        <div className="mt-6 t-caption flex items-center gap-3">
          <span style={{ color: ACCENT }}>
            STAGE {String(stageNum).padStart(2, "0")} / 03
          </span>
          <span className="opacity-30">·</span>
          <span className="opacity-55">
            {stageNum === 1 && "CONTEXT"}
            {stageNum === 2 && "DECISION"}
            {stageNum === 3 && "OUTCOME"}
          </span>
        </div>

        {/* Morphing content */}
        <div className="relative flex-grow mt-10">
          {/* Stage 1 — context */}
          <motion.div
            style={{ opacity: oContext }}
            className="absolute inset-0 grid grid-cols-12 gap-6 md:gap-10"
          >
            <div
              className={
                project.preview
                  ? "col-span-12 md:col-span-7"
                  : "col-span-12 md:col-span-9"
              }
            >
              <div className="t-caption mb-4 opacity-55">CONTEXT</div>
              <p className="t-lead">{project.context}</p>
              <p className="mt-6 t-lead italic opacity-80">{project.role}</p>
              {project.scope && (
                <div className="mt-8">
                  <div className="t-caption opacity-45 mb-3">SCOPE</div>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.map((s) => (
                      <span key={s} className="ss-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {project.preview && (
              <div className="col-span-12 md:col-span-5 self-start">
                <LivePreview preview={project.preview} />
              </div>
            )}
          </motion.div>

          {/* Stage 2 — decision */}
          <motion.div
            style={{ opacity: oDecision }}
            className="absolute inset-0 grid grid-cols-12 gap-6"
          >
            <div className="col-span-12 md:col-span-8">
              <div className="t-caption mb-4" style={{ color: ACCENT }}>
                HARDEST DECISION
              </div>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(28px, 3vw, 48px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  fontVariationSettings: "'opsz' 72",
                }}
              >
                "{project.decision}"
              </p>
            </div>
          </motion.div>

          {/* Stage 3 — outcome */}
          <motion.div
            style={{ opacity: oOutcome }}
            className="absolute inset-0 grid grid-cols-12 gap-6 md:gap-10"
          >
            <div className="col-span-12 md:col-span-5">
              <div className="t-caption mb-4 opacity-55">STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="ss-tag">{s}</span>
                ))}
              </div>
              {project.award && (
                <div
                  className="mt-7 inline-flex items-center gap-2 px-3 py-1.5 border rounded-full t-meta-tight"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                >
                  <span>★</span> {project.award}
                </div>
              )}
              <div className="mt-8">
                {project.links ? (
                  <div className="flex flex-wrap gap-6 t-meta-tight">
                    {project.links.repo && (
                      <a
                        className="ss-link"
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Repository ↗
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        className="ss-link"
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: ACCENT }}
                      >
                        View Live ↗
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="t-caption opacity-55">
                    PRIVATE · INTERNAL PRODUCT
                  </div>
                )}
              </div>
            </div>

            {project.stakes && (
              <div
                className="col-span-12 md:col-span-6 md:col-start-7"
                style={{ borderLeft: `1px solid ${HAIR_STRONG}`, paddingLeft: 28 }}
              >
                <div className="t-caption mb-4" style={{ color: ACCENT }}>
                  STAKES
                </div>
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(20px, 1.8vw, 28px)",
                    lineHeight: 1.4,
                    letterSpacing: "-0.012em",
                    fontVariationSettings: "'opsz' 36",
                    opacity: 0.92,
                  }}
                >
                  {project.stakes}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Progress rail */}
        <div className="mt-6 flex items-center gap-3 t-caption">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex-1 h-px"
              style={{
                background: stageNum >= s ? ACCENT : HAIR,
                transition: "background .4s var(--ease)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative px-5 md:px-10 pt-32 md:pt-44 pb-0"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>WORK — 03</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel
            index="03"
            title="Selected Work"
            count={`${PROJECTS.length} CASE STUDIES`}
          />
          <Reveal delay={0.05}>
            <h2 className="mt-10 t-section">
              <span className="block overflow-hidden">Selected</span>
              <span
                className="block overflow-hidden italic"
                style={{ fontWeight: 400 }}
              >
                work
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
      </div>

      <div className="mt-20 md:mt-28">
        {PROJECTS.map((p) => (
          <ProjectPanel key={p.n} project={p} />
        ))}
      </div>
    </section>
  );
}
