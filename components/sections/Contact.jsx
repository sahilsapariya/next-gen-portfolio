"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ACCENT, BG, EASE, EMAIL, FG, LIVE } from "@/lib/tokens";
import { SOCIALS } from "@/lib/content";
import { Reveal } from "@/components/primitives";

/* SignatureUnderline — hand-drawn SVG arc that draws on view. */
function SignatureUnderline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 800 40"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: "1%",
        right: "1%",
        bottom: "-6px",
        width: "92%",
        height: 38,
        pointerEvents: "none",
      }}
    >
      <motion.path
        d="M 6 28 C 120 6, 280 32, 440 18 S 720 26, 794 12"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
      />
    </svg>
  );
}

export function Contact({ time }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const a = document.createElement("a");
      a.href = `mailto:${EMAIL}`;
      a.click();
    }
  }, []);

  const greeting = useMemo(() => {
    try {
      const h = parseInt(
        new Date()
          .toLocaleTimeString("en-GB", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            hour12: false,
          })
          .split(":")[0],
        10
      );
      if (h < 5) return "Up late";
      if (h < 12) return "Good morning";
      if (h < 17) return "Good afternoon";
      if (h < 21) return "Good evening";
      return "Up late";
    } catch {
      return "Hello";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time?.slice(0, 2)]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      id="contact"
      className="relative px-5 md:px-10 pt-32 md:pt-56 pb-10"
      style={{ background: FG, color: BG }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4 t-meta">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: ACCENT }}
          />
          <span style={{ color: ACCENT }}>INDEX / 09</span>
          <span className="opacity-45">— Contact</span>
        </div>
        <div className="flex items-center gap-3 opacity-65">
          <motion.span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: LIVE, boxShadow: `0 0 8px ${LIVE}` }}
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          AVAILABLE FOR PRODUCT WORK
        </div>
      </div>

      <Reveal delay={0.05}>
        <div className="mt-14 md:mt-20 t-caption opacity-55">
          ↳ {greeting}, friend.
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="mt-6 font-serif font-light"
          style={{
            fontSize: "clamp(48px, 8vw, 140px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontVariationSettings: "'opsz' 144",
            maxWidth: "18ch",
          }}
        >
          Talk to me about hard
          <br />
          <span className="italic" style={{ fontWeight: 400 }}>
            product or systems work
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

      <Reveal delay={0.2}>
        <button
          onClick={copyEmail}
          data-cursor="hover"
          aria-label={`Copy ${EMAIL}`}
          className="ss-email-cta mt-14 md:mt-16 group inline-flex items-baseline gap-5 flex-wrap text-left"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            color: BG,
          }}
        >
          <span
            className="ss-email-text"
            style={{
              fontFamily: "var(--font-serif), Newsreader, serif",
              fontStyle: "italic",
              fontSize: "clamp(28px, 4.6vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.022em",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {EMAIL}
          </span>
          <span
            className="t-meta inline-flex items-center gap-2"
            style={{
              color: copied ? ACCENT : "rgba(14,14,12,0.55)",
              transition: "color .3s var(--ease)",
              whiteSpace: "nowrap",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-flex items-center gap-2"
                >
                  ✓ COPIED
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-flex items-center gap-2"
                >
                  [ CLICK TO COPY ]
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="relative inline-block">
          <div
            className="mt-20 md:mt-28 font-script"
            style={{
              fontSize: "clamp(72px, 13vw, 220px)",
              lineHeight: 1.18,
              color: BG,
              letterSpacing: "-0.005em",
              paddingBottom: "0.12em",
              position: "relative",
            }}
          >
            Sahil Sapariya
            <span style={{ color: ACCENT }}>.</span>
            <SignatureUnderline />
          </div>
        </div>
      </Reveal>

      <div
        className="ss-social-grid mt-16 grid grid-cols-2 md:grid-cols-4"
        style={{
          borderTop: `1px solid rgba(14,14,12,0.18)`,
          borderLeft: `1px solid rgba(14,14,12,0.18)`,
        }}
      >
        {SOCIALS.map(({ idx, label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="ss-social-btn group relative overflow-hidden p-6 md:p-8 flex items-center justify-between"
            style={{
              background: FG,
              color: BG,
              borderRight: `1px solid rgba(14,14,12,0.18)`,
              borderBottom: `1px solid rgba(14,14,12,0.18)`,
            }}
          >
            <span className="ss-social-fill" aria-hidden />
            <span className="ss-social-label relative flex items-center gap-4 t-meta-tight">
              <span className="opacity-40">{idx}</span>
              <Icon size={16} />
              {label}
            </span>
            <span className="ss-social-arrow relative">
              <ArrowUpRight size={22} />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-12 gap-4 items-end t-meta-tight">
        <div className="col-span-12 md:col-span-5 opacity-65">
          © 2026 Sahil Sapariya · All Rights Reserved
        </div>
        <div className="col-span-12 md:col-span-4 flex md:justify-center opacity-65">
          <span className="tabular-nums">{time}</span>
          <span className="opacity-60 ml-2">IST · AHMEDABAD</span>
        </div>
        <div className="col-span-12 md:col-span-3 flex md:justify-end">
          <button
            onClick={scrollToTop}
            data-cursor="hover"
            className="ss-back-top group inline-flex items-center gap-3"
            aria-label="Back to top"
            style={{
              border: "none",
              background: "transparent",
              color: BG,
              padding: 0,
            }}
          >
            <span>BACK TO TOP</span>
            <span
              className="ss-back-circle"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 999,
                border: "1px solid rgba(14,14,12,0.3)",
                transition:
                  "background .4s var(--ease), color .4s var(--ease), border-color .4s var(--ease), transform .4s var(--ease)",
              }}
            >
              <span
                aria-hidden
                style={{ transform: "rotate(-45deg)", display: "inline-flex" }}
              >
                <ArrowUpRight size={16} />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
