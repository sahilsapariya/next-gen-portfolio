"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { ACCENT, BG, FG, MUTED } from "@/lib/tokens";
import { useMagnetic } from "@/hooks";
import { Hairline, MarqueeRow, Reveal, SplitDisplay } from "@/components/primitives";

export function Hero({ reduced, time }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  /* Signature interaction — headline tightens as you scroll out */
  const tighten = useTransform(scrollYProgress, [0, 1], [0, -0.02]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const magWork = useMagnetic(0.22);
  const magContact = useMagnetic(0.22);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: BG, color: FG }}
    >
      <div className="relative z-10 grid grid-cols-12 gap-4 px-5 md:px-10 pt-32 md:pt-44 pb-12">
        <div className="hidden md:flex col-span-1 flex-col gap-4 t-caption">
          ©
          <br />
          2026
        </div>
        <div className="col-span-12 md:col-span-10 ss-hero-main">
          <Reveal y={20}>
            <div className="flex items-center gap-3 t-meta">
              <motion.span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT }}
                animate={reduced ? {} : { opacity: [1, 0.45, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span style={{ color: ACCENT }}>SAHIL SAPARIYA</span>
              <span className="opacity-50">—</span>
              <span>ENGINEER · PRODUCT BUILDER · SYSTEMS THINKER</span>
            </div>
          </Reveal>

          <motion.h1
            className="mt-8 t-display"
            style={{
              letterSpacing: tighten,
              scale,
              opacity,
              transformOrigin: "left top",
            }}
          >
            {/* Screen-reader / crawler-visible name + role.
                Visually hidden so the display design stays untouched. */}
            <span className="sr-only">
              Sahil Sapariya — Software Engineer and Product Builder, based in
              Vadodara, Gujarat, India. Working at Jeavio; alumnus of Dharmsinh
              Desai University.{" "}
            </span>
            <div className="overflow-hidden">
              <SplitDisplay text="An engineer" />
            </div>
            <div className="overflow-hidden">
              <SplitDisplay text="who ships systems" delay={0.12} italic />
            </div>
            <div className="overflow-hidden">
              <SplitDisplay text="end to end" delay={0.24} />
              <span style={{ color: ACCENT }}>.</span>
            </div>
          </motion.h1>

          {/* Hidden bio paragraph — keyword-rich natural prose that
              search engines can use to construct snippets. Not visible
              to sighted users; the visible design carries the same
              meaning at a higher level. */}
          <p className="sr-only">
            Sahil Sapariya is a full-stack software engineer at Jeavio, based
            in Vadodara, Gujarat, India. He builds production SaaS systems end
            to end — frontend architecture, backend workflows, deployment. He
            is an alumnus of Dharmsinh Desai University (DDU). Selected work
            includes Nexchool (a school management SaaS), Retail-OS (a retail
            platform), and the DUHACKS 2.0 award-winning College360. Sahil
            works with Next.js, TypeScript, Python, Django, FastAPI,
            PostgreSQL, and React.
          </p>

          <Reveal delay={0.7} y={20}>
            <div className="mt-10 max-w-lg t-meta-tight" style={{ color: MUTED }}>
              Software Engineer @ Jeavio
              <span className="opacity-50 mx-2">·</span>
              Vadodara, IN
              <span className="opacity-50 mx-2">·</span>
              <span className="tabular-nums">{time}</span> IST
            </div>
          </Reveal>

          <Reveal delay={0.8} y={20}>
            <div className="mt-10 flex flex-wrap gap-3">
              <div ref={reduced ? null : magWork} className="ss-mag-wrap">
                <a
                  href="#work"
                  data-cursor="hover"
                  className="ss-btn ss-btn-outline"
                >
                  <span>Selected Work</span>
                  <span className="ss-btn-arrow">
                    <ArrowRight size={14} />
                  </span>
                </a>
              </div>
              <div ref={reduced ? null : magContact} className="ss-mag-wrap">
                <a
                  href="#contact"
                  data-cursor="hover"
                  className="ss-btn ss-btn-accent"
                >
                  <span>Get in Touch</span>
                  <span className="ss-btn-arrow">
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="flex-grow" aria-hidden />

      {/* Bottom band */}
      <div className="relative z-10">
        <div className="px-5 md:px-10 pb-3 flex items-center justify-between t-caption">
          <span>BASED IN VADODARA · IN</span>
          <span className="hidden md:flex items-center gap-2">
            SCROLL
            <motion.span
              aria-hidden
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </span>
        </div>
        <Hairline />
        <div className="py-8 md:py-10">
          <MarqueeRow speed={36}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="font-serif"
                style={{
                  fontStyle: i % 2 === 0 ? "italic" : "normal",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 5.6vw, 76px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  paddingRight: "0.6em",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Engineer
                <span style={{ color: ACCENT, margin: "0 0.4em" }}>·</span>
                Product Builder
                <span style={{ color: ACCENT, margin: "0 0.4em" }}>·</span>
                Systems Thinker
                <span className="opacity-25" style={{ margin: "0 22px" }}>—</span>
              </span>
            ))}
          </MarqueeRow>
        </div>
      </div>
    </section>
  );
}
