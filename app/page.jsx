"use client";

import React, { useEffect, useRef, useState, useCallback, useLayoutEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Clock,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────── */
/*  Tokens                                                                   */
/* ──────────────────────────────────────────────────────────────────────── */
const INK = "#0A0A0A";
const IVORY = "#F5F1EA";
const ACCENT = "#FF4A1C";
const MUTED = "#7A736B";
const HAIR_STRONG = "rgba(245,241,234,0.22)";
const HAIR = "rgba(245,241,234,0.14)";
const HAIR_SOFT = "rgba(245,241,234,0.08)";
const EASE = [0.22, 1, 0.36, 1];
const EASE_HEAVY = [0.76, 0, 0.24, 1];

const RESUME =
  "https://drive.google.com/file/d/1819NG4-1vkpc_sH3KYaxZW6EEwOojy40/view";

const EMAIL = "sahileng03@gmail.com";

const SOCIALS = [
  { idx: "01", label: "LinkedIn", href: "https://linkedin.com/in/sahilsapariya", Icon: Linkedin },
  { idx: "02", label: "GitHub", href: "https://github.com/sahilsapariya", Icon: Github },
  { idx: "03", label: "Twitter", href: "https://twitter.com/sahil_sapariya", Icon: Twitter },
  { idx: "04", label: "Instagram", href: "https://instagram.com/_sahil_sapariya_03", Icon: Instagram },
];

const PROJECTS = [
  {
    n: "01",
    title: "Nirmaan Yaatraa",
    year: "2024",
    blurb:
      "Real-time construction project monitoring connecting contractors and admins.",
    stack: ["Django REST", "React", "Redux", "PostgreSQL", "SaaS"],
    repo: "https://github.com/sahilsapariya/nirmaan-yaatra",
    live: "https://nirmaanyaatra.netlify.app",
    img: "/projects/nirmaan.jpg",
  },
  {
    n: "02",
    title: "College360",
    award: "Best Open Innovation",
    year: "2023",
    blurb: "3D campus tour of DDIT — virtual exploration of buildings, labs and corridors.",
    stack: ["Panolens.js", "Three.js", "HTML", "CSS"],
    repo: "https://github.com/sahilsapariya/college360",
    live: "https://college360.netlify.app",
    img: "/projects/college360.jpg",
  },
  {
    n: "03",
    title: "Elite Mode",
    tag: "In Progress",
    year: "2025",
    blurb: "High-quality apparel e-commerce with editorial product storytelling.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    repo: "https://github.com/sahilsapariya/elite-mode",
    live: "https://elitemode.vercel.app",
    img: "/projects/elitemode.jpg",
  },
  {
    n: "04",
    title: "Sure Bank",
    year: "2024",
    blurb: "Fictional banking site with savings, loans, credit cards.",
    stack: ["Next.js", "Tailwind"],
    repo: "https://github.com/sahilsapariya/surebank",
    live: "https://surebank.vercel.app",
    img: "/projects/surebank.jpg",
  },
];

const EXPERIENCE = [
  {
    company: "Restrosoft Solutions",
    role: "Frontend Developer Intern",
    dates: "May'24 – Jun'24",
    location: "Ahmedabad, IN",
    body:
      "Translated Figma to responsive pages using HTML/CSS/Bootstrap/JS, built reusable React components, fixed frontend + backend bugs.",
    stats: [],
  },
  {
    company: "Trakky Services Pvt Ltd",
    role: "Full Stack Developer Intern",
    dates: "Apr'23 – Jul'23",
    location: "Ahmedabad, IN",
    body:
      "Led team that launched 4 features, migrated backend DB, mentored juniors.",
    stats: [
      { v: 40, suf: "%", label: "Engagement", sign: "+" },
      { v: 25, suf: "%", label: "Downtime", sign: "−" },
      { v: 20, suf: "%", label: "Code quality", sign: "+" },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Kevin Tamakuwala",
    role: "SDE @Pirimid Fintech",
    quote:
      "Sahil is an exceptional frontend developer with a strong ability to solve complex bugs efficiently…",
  },
  {
    name: "Nisarg Pipaliya",
    role: "SE @IGNOSIS",
    quote:
      "For any web development queries, Sahil has always been my first point of contact.",
  },
];

const NAV_LINKS = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
];

/* ──────────────────────────────────────────────────────────────────────── */
/*  Hooks                                                                    */
/* ──────────────────────────────────────────────────────────────────────── */
function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const fn = () => setR(m.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);
  return r;
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return m;
}

function useLiveTime(tz = "Asia/Kolkata") {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const f = () => {
      try {
        setT(
          new Date().toLocaleTimeString("en-GB", {
            timeZone: tz, hour: "2-digit", minute: "2-digit",
            second: "2-digit", hour12: false,
          })
        );
      } catch {
        setT(new Date().toLocaleTimeString());
      }
    };
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, [tz]);
  return t;
}

/* Active nav section via IntersectionObserver */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const opts = { rootMargin: "-45% 0px -45% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Lenis-style smooth scroll                                                */
/* ──────────────────────────────────────────────────────────────────────── */
function useLenisLike(enabled) {
  const contentRef = useRef(null);
  useEffect(() => {
    if (!enabled || !contentRef.current) {
      document.body.style.height = "";
      if (contentRef.current) contentRef.current.style.transform = "";
      return;
    }
    let target = window.scrollY;
    let current = window.scrollY;
    let raf;

    const setHeight = () => {
      if (!contentRef.current) return;
      const h = contentRef.current.getBoundingClientRect().height;
      document.body.style.height = h + "px";
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(contentRef.current);

    const onScroll = () => { target = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      current += (target - current) * 0.085;
      if (Math.abs(target - current) < 0.05) current = target;
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${-current}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      document.body.style.height = "";
    };
  }, [enabled]);
  return contentRef;
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Reusable bits                                                            */
/* ──────────────────────────────────────────────────────────────────────── */
function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3 select-none font-mono text-[11px] tracking-[0.35em] uppercase">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: ACCENT }}
        aria-hidden
      />
      <span style={{ color: ACCENT }}>INDEX / {index}</span>
      <span className="opacity-50">— {title}</span>
    </div>
  );
}

function Hairline({ strong = false, soft = false, className = "" }) {
  return (
    <div
      aria-hidden
      className={"w-full " + className}
      style={{
        height: 1,
        background: soft ? HAIR_SOFT : strong ? HAIR_STRONG : HAIR,
      }}
    />
  );
}

function VRot({ children }) {
  return (
    <div
      className="hidden md:block font-mono text-[10px] tracking-[0.4em] uppercase opacity-50"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, y = 40, className = "", once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y, clipPath: "inset(0 0 100% 0)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
            : { opacity: 0, y, clipPath: "inset(0 0 100% 0)" }
        }
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SplitText({ text, className = "", delay = 0, italic = false, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ fontStyle: italic ? "italic" : "normal", ...style }}
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 1.0,
              delay: delay + i * 0.035,
              ease: EASE,
            }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function CountUp({ to, suffix = "", sign = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2.0,
      ease: EASE,
      onUpdate: (val) => setV(Math.round(val)),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {sign}{v}{suffix}
    </span>
  );
}

function Marquee({ children, speed = 32, reverse = false, pauseOnHover = true }) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="overflow-hidden w-full"
      aria-hidden
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={paused ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}

/* Film grain overlay */
function FilmGrain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 80, pointerEvents: "none",
        opacity: 0.045, mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

/* Scroll progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 1.5,
        background: ACCENT, transformOrigin: "0 50%", scaleX,
        zIndex: 90,
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Hero atmospheric blob                                                    */
/* ──────────────────────────────────────────────────────────────────────── */
function HeroBlob({ mx, my }) {
  const rotate = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const rotateY = useTransform(my, [-0.5, 0.5], [10, -10]);
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: 1400 }}
    >
      <motion.div style={{ rotate, rotateY }} transition={{ type: "spring", damping: 30, stiffness: 80 }}>
        <div style={{ width: "min(125vmin, 1200px)", height: "min(125vmin, 1200px)", position: "relative" }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              opacity: 0.20, filter: "blur(48px)",
              background: `conic-gradient(from 120deg, ${ACCENT}, transparent 35%, ${ACCENT} 60%, transparent 90%)`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "10%", mixBlendMode: "screen", filter: "blur(22px)",
              background: `radial-gradient(circle at 32% 30%, rgba(255,74,28,0.6), rgba(255,74,28,0) 55%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.07), transparent 60%)`,
            }}
          />
          <svg className="absolute" style={{ inset: "16%", opacity: 0.20 }} viewBox="0 0 200 200">
            <defs>
              <radialGradient id="gG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={IVORY} stopOpacity="0.7" />
                <stop offset="100%" stopColor={IVORY} stopOpacity="0" />
              </radialGradient>
            </defs>
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={"h" + i} x1="0" x2="200" y1={i * 9} y2={i * 9}
                stroke="url(#gG)" strokeWidth="0.25" />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={"v" + i} y1="0" y2="200" x1={i * 9} x2={i * 9}
                stroke="url(#gG)" strokeWidth="0.25" />
            ))}
          </svg>
          <svg className="absolute inset-0" style={{ opacity: 0.07, mixBlendMode: "overlay" }}>
            <filter id="hn">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hn)" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Loader                                                                   */
/* ──────────────────────────────────────────────────────────────────────── */
function Loader({ onDone }) {
  /* Stable ref to onDone so re-renders of the parent don't restart anything */
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const [exit, setExit] = useState(false);

  useEffect(() => {
    /* Show 900ms, exit-wipe 600ms, total ~1500ms */
    const t1 = setTimeout(() => setExit(true), 900);
    const t2 = setTimeout(() => onDoneRef.current?.(), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []); // run once

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 0 0)" }}
      animate={exit ? { clipPath: "inset(0 0 100% 0)" } : {}}
      transition={{ duration: 0.7, ease: EASE_HEAVY }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: INK, color: IVORY }}
    >
      {/* Top corner mark */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase opacity-60">
        <span
          className="inline-block"
          style={{
            width: 26,
            height: 26,
            border: `1px solid ${IVORY}`,
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            letterSpacing: "0.15em",
          }}
        >
          SS
        </span>
        <span>PORTFOLIO 2026 ©</span>
      </div>

      {/* Centered wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          fontFamily:
            "var(--font-fraunces), 'Fraunces', 'Instrument Serif', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(56px, 11vw, 180px)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
        }}
      >
        Sahil Sapariya<span style={{ color: ACCENT, fontStyle: "normal" }}>.</span>
      </motion.div>

      {/* Bottom row */}
      <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10 flex items-center justify-between font-mono text-[10px] tracking-[0.4em] uppercase opacity-50">
        <span>AHMEDABAD · IN</span>
        <span>FULL STACK ENGINEER</span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Nav                                                                      */
/* ──────────────────────────────────────────────────────────────────────── */
function Nav({ time }) {
  const active = useActiveSection(["top", "about", "work", "experience", "contact"]);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-6 flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase"
      style={{ color: IVORY, mixBlendMode: "difference" }}
    >
      <a href="#top" data-cursor="hover" className="flex items-center gap-3 no-underline">
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: 32, height: 32, border: `1px solid ${IVORY}`, borderRadius: 2,
            fontSize: 10, letterSpacing: "0.15em",
          }}
        >
          SS
        </span>
        <span className="hidden md:inline opacity-70">Sahil / Sapariya</span>
      </a>
      <nav className="ss-nav hidden md:flex items-center gap-9">
        {NAV_LINKS.map((l) => (
          <a key={l.id} data-cursor="hover" href={l.href} className="relative no-underline">
            <span style={{ opacity: active === l.id ? 1 : 0.6, transition: "opacity .3s" }}>
              {l.label}
            </span>
            {active === l.id && (
              <motion.span
                layoutId="nav-dot"
                style={{
                  position: "absolute", left: -10, top: "50%",
                  width: 4, height: 4, borderRadius: "50%",
                  background: ACCENT, transform: "translateY(-50%)",
                }}
              />
            )}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2 opacity-70">
        <Clock size={12} />
        <span className="tabular-nums">{time}</span>
        <span className="opacity-50">IST</span>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Hero                                                                     */
/* ──────────────────────────────────────────────────────────────────────── */
function Hero({ reduced }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = useCallback(
    (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my]
  );
  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: INK, color: IVORY }}
    >
      {!reduced && <HeroBlob mx={mx} my={my} />}

      {/* Main content */}
      <div className="relative z-10 grid grid-cols-12 gap-4 px-5 md:px-10 pt-32 md:pt-40 pb-12">
        <div className="ss-gutter col-span-1 hidden md:flex flex-col gap-4">
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-50">
            ©<br />2026
          </div>
        </div>
        <div className="col-span-12 md:col-span-10 ss-hero-main">
          <Reveal y={20}>
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT }}
                aria-hidden
              />
              <div
                className="font-mono text-[11px] tracking-[0.4em] uppercase"
                style={{ color: ACCENT }}
              >
                01 — FULL STACK DEVELOPER
              </div>
            </div>
          </Reveal>

          <h1
            className="mt-8 font-serif font-light"
            style={{
              fontSize: "clamp(72px, 13vw, 220px)",
              lineHeight: 0.86,
              letterSpacing: "-0.045em",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            <div className="overflow-hidden">
              <SplitText text="SAHIL" />
            </div>
            <div className="overflow-hidden flex items-start">
              <SplitText text="SAPARIYA" delay={0.1} />
              <motion.span
                aria-hidden
                style={{
                  display: "inline-block", color: ACCENT,
                  marginLeft: "0.05em",
                  fontSize: "0.7em",
                  lineHeight: 1,
                }}
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                *
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <SplitText text="BUILDS BACKEND-FIRST WEB." delay={0.2} italic />
            </div>
          </h1>

          <Reveal delay={0.6} y={20}>
            <div
              className="mt-8 max-w-md font-mono text-[11px] tracking-[0.25em] uppercase leading-relaxed"
              style={{ color: MUTED, opacity: 0.85 }}
            >
              *available for senior frontend / full-stack roles
            </div>
          </Reveal>

          <Reveal delay={0.7} y={20}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={RESUME}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="ss-btn ss-btn-outline"
              >
                <Download size={14} />
                <span>Download Resume</span>
                <span className="ss-btn-arrow"><ArrowUpRight size={14} /></span>
              </a>
              <a
                href="#contact"
                data-cursor="hover"
                className="ss-btn ss-btn-accent"
              >
                <span>Get in Touch</span>
                <span className="ss-btn-arrow"><ArrowRight size={14} /></span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Flex spacer pushes the bottom band to the floor */}
      <div className="flex-grow" aria-hidden />

      {/* Bottom band — meta row + hairline + marquee. In flow, never overlaps. */}
      <div className="relative z-10">
        <div className="px-5 md:px-10 pb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.4em] uppercase opacity-55">
          <span>BASED IN AHMEDABAD · IN</span>
          <span className="hidden md:flex items-center gap-2">
            SCROLL
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >↓</motion.span>
          </span>
        </div>
        <Hairline />
        <div className="py-7 md:py-8">
          <Marquee speed={32}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="font-serif"
                style={{
                  fontStyle: i % 2 === 0 ? "italic" : "normal",
                  fontWeight: i % 2 === 0 ? 400 : 300,
                  fontSize: "clamp(36px, 5.6vw, 76px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  paddingRight: "0.6em",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                SYNTAX BLAZER <span style={{ color: ACCENT }}>🔥</span>
                <span className="opacity-30" style={{ margin: "0 22px" }}>·</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  About                                                                    */
/* ──────────────────────────────────────────────────────────────────────── */
function About() {
  const meta = [
    ["ROLE", "Associate Software Engineer"],
    ["COMPANY", "Jeavio India Pvt Ltd"],
    ["SINCE", "May 2025"],
    ["EDUCATION", "B.Tech IT — DDU (2021–2025)"],
    ["BASED", "Ahmedabad, IN"],
  ];
  return (
    <section
      id="about"
      className="relative px-5 md:px-10 py-32 md:py-56"
      style={{ background: INK, color: IVORY }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="ss-gutter col-span-1 hidden md:block">
          <VRot>ABOUT — 02</VRot>
        </div>
        <div className="ss-about-main col-span-12 md:col-span-7">
          <Reveal><SectionLabel index="02" title="About" /></Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-12 font-serif"
              style={{
                fontSize: "clamp(22px, 2.4vw, 38px)",
                lineHeight: 1.22,
                letterSpacing: "-0.012em",
                fontVariationSettings: "'opsz' 36",
              }}
            >
              Sahil is a driven{" "}
              <span style={{ fontStyle: "italic", color: ACCENT }}>Full-Stack Developer</span>{" "}
              with a solid grounding in modern web technologies and a strong passion for{" "}
              <span style={{ fontStyle: "italic" }}>backend engineering</span>.
              He actively works with React.js, Next.js, TypeScript, Python, and various
              backend frameworks while continuously expanding into advanced tools like
              Redis, FastAPI, cloud services, and{" "}
              <span style={{ fontStyle: "italic" }}>system design</span>.
              Known for learning quickly and adapting fast, Sahil has built multiple projects
              across different stacks, including an innovative{" "}
              <span style={{ color: ACCENT }}>DUHACKS 2.0</span> winning project during his
              college years.
            </p>
          </Reveal>
        </div>
        <div className="ss-about-meta col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-24">
          <Hairline strong />
          {meta.map(([k, v]) => (
            <Reveal key={k} delay={0.05}>
              <div className="grid grid-cols-3 py-5 font-mono text-[11px] tracking-[0.22em] uppercase">
                <div className="opacity-45">{k}</div>
                <div className="col-span-2">{v}</div>
              </div>
              <Hairline />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Work — projects with cursor-following preview                            */
/* ──────────────────────────────────────────────────────────────────────── */
function CursorImage({ project, mouse }) {
  const x = useSpring(mouse.x, { damping: 22, stiffness: 200, mass: 0.5 });
  const y = useSpring(mouse.y, { damping: 22, stiffness: 200, mass: 0.5 });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0,
        x, y,
        translateX: "-50%", translateY: "-50%",
        zIndex: 70,
        pointerEvents: "none",
        width: 360, height: 270,
        overflow: "hidden",
        borderRadius: 2,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <img
        src={project.img}
        alt=""
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: "saturate(1.05) contrast(1.05)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.18,
          background:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </motion.div>
  );
}

function ProjectRow({ p, i, onHover }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      layout
      onMouseEnter={() => { setHover(true); onHover(p); }}
      onMouseLeave={() => { setHover(false); onHover(null); }}
      data-cursor="project"
      className="group relative"
    >
      <Hairline strong />
      <div className="grid grid-cols-12 gap-4 py-10 md:py-12 items-center">
        <div className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.3em] uppercase opacity-50">
          ({p.n})
        </div>
        <div className="ss-proj-title col-span-10 md:col-span-7">
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(36px, 6.2vw, 100px)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              margin: 0,
              fontVariationSettings: "'opsz' 144",
              color: hover ? ACCENT : IVORY,
              transition: "color .5s",
            }}
          >
            <motion.span
              animate={{ x: hover ? -8 : 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-block"
              style={{ fontStyle: hover ? "italic" : "normal", transition: "font-style .3s" }}
            >
              {p.title}
            </motion.span>
            {p.award && (
              <span
                className="ml-3 align-middle inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 border"
                style={{
                  borderColor: ACCENT, color: ACCENT,
                  borderRadius: 999,
                }}
              >
                <span>★</span> {p.award}
              </span>
            )}
            {p.tag && (
              <span
                className="ml-3 align-middle inline-block font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5"
                style={{
                  border: `1px solid ${IVORY}`, opacity: 0.7,
                  borderRadius: 999,
                }}
              >
                {p.tag}
              </span>
            )}
          </h3>
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mt-5 max-w-2xl font-mono text-[12px] leading-[1.7] opacity-80">
                  {p.blurb}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1.5"
                      style={{
                        border: "1px solid rgba(245,241,234,0.25)",
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-5 font-mono text-[11px] tracking-[0.22em] uppercase">
                  <a href={p.repo} target="_blank" rel="noreferrer" className="ss-link">
                    Repository ↗
                  </a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="ss-link" style={{ color: ACCENT }}>
                    View Live ↗
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="col-span-12 md:col-span-4 flex justify-end items-center gap-6">
          <div className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-50 text-right">
            <div>{p.year}</div>
            <div className="mt-1 opacity-60">PROJECT</div>
          </div>
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="ss-circle-arrow"
            aria-label={`Visit ${p.title}`}
          >
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Work() {
  const [hovered, setHovered] = useState(null);
  const mouse = { x: useMotionValue(-300), y: useMotionValue(-300) };
  useEffect(() => {
    const onMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section
      id="work"
      className="relative px-5 md:px-10 py-32 md:py-56"
      style={{ background: INK, color: IVORY }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="ss-gutter col-span-1 hidden md:block">
          <VRot>WORK — 03</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <SectionLabel index="03" title="Selected Work" />
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-50">
              04 / PROJECTS
            </div>
          </div>
          <Reveal delay={0.05}>
            <h2
              className="mt-8 font-serif"
              style={{
                fontSize: "clamp(60px, 11.2vw, 200px)",
                lineHeight: 0.85,
                letterSpacing: "-0.045em",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              SELECTED<span style={{ color: ACCENT }}> / </span>
              <span className="italic" style={{ fontWeight: 400 }}>WORK</span>
            </h2>
          </Reveal>
          <div className="mt-16">
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.n} p={p} i={i} onHover={setHovered} />
            ))}
            <Hairline strong />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hovered && <CursorImage project={hovered} mouse={mouse} key={hovered.n} />}
      </AnimatePresence>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Capabilities — magazine spec sheet                                       */
/* ──────────────────────────────────────────────────────────────────────── */
const META = [
  { label: "TIMEFRAME", value: "2022 — Present" },
  { label: "DISCIPLINE", value: "UI/UX · Frontend · Backend\nDB Design · System Design" },
  { label: "TOOLS", value: "Figma · Postman · GitHub" },
  { label: "AVAILABILITY", value: "Open to senior FE / full-stack roles" },
];

const STACK_GROUPS = [
  { title: "Languages", items: ["TypeScript", "Python", "JavaScript"] },
  { title: "Frameworks", items: ["React", "Next.js", "Django", "FastAPI"] },
  { title: "Data & Persistence", items: ["PostgreSQL", "MySQL", "Redis", "Pinecone"] },
  { title: "Infrastructure", items: ["AWS (EC2 / S3 / Lambda)", "NGINX", "CI/CD"] },
  { title: "APIs & Protocols", items: ["REST", "GraphQL", "WebSockets", "JWT", "OAuth2"] },
  { title: "AI & Graphics", items: ["OpenAI API", "LangChain", "Three.js"] },
  { title: "UI & State", items: ["Framer Motion", "Zustand", "Redux Toolkit", "Shadcn UI", "Tailwind"] },
];

function Capabilities() {
  const total = STACK_GROUPS.reduce((a, g) => a + g.items.length, 0);

  return (
    <section
      className="relative px-5 md:px-10 py-32 md:py-56"
      style={{ background: INK, color: IVORY }}
    >
      {/* Header band */}
      <div className="grid grid-cols-12 gap-6">
        <div className="ss-gutter col-span-1 hidden md:block">
          <VRot>STACK — 04</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <SectionLabel index="04" title="Capabilities" />
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-50">
              {total} / TECHNOLOGIES{" "}
              <span className="opacity-40 mx-1">·</span>{" "}
              {STACK_GROUPS.length} / CATEGORIES
            </div>
          </div>

          {/* Two-line dramatic heading */}
          <Reveal delay={0.05}>
            <h2
              className="mt-10 font-serif font-light"
              style={{
                fontSize: "clamp(64px, 10.5vw, 200px)",
                lineHeight: 0.82,
                letterSpacing: "-0.05em",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              <span className="block overflow-hidden">SPEC</span>
              <span className="block overflow-hidden italic" style={{ fontWeight: 400 }}>
                sheet
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

      {/* Body — two-column editorial layout */}
      <div className="grid grid-cols-12 gap-6 md:gap-10 mt-20 md:mt-28">
        <div className="hidden md:block col-span-1" />

        {/* Left: meta column */}
        <div className="ss-cap-meta col-span-12 md:col-span-4">
          <Hairline strong />
          {META.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.04}>
              <div className="py-7 md:py-8">
                <div className="flex items-baseline gap-4">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">
                    0{i + 1}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-55">
                    {m.label}
                  </div>
                </div>
                <div
                  className="mt-4 font-serif whitespace-pre-line"
                  style={{
                    fontSize: "clamp(20px, 1.7vw, 26px)",
                    lineHeight: 1.28,
                    letterSpacing: "-0.012em",
                    fontVariationSettings: "'opsz' 36",
                  }}
                >
                  {m.value}
                </div>
              </div>
              <Hairline />
            </Reveal>
          ))}
        </div>

        {/* Right: tech groups */}
        <div className="ss-cap-stack col-span-12 md:col-span-7 mt-10 md:mt-0">
          <Hairline strong />
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.035}>
              <div
                className="grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-7 items-baseline ss-group-row"
                data-cursor="hover"
              >
                <div className="col-span-12 md:col-span-4 flex items-baseline gap-3">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-90">
                    {g.title}
                  </div>
                </div>
                <div
                  className="col-span-12 md:col-span-8 font-serif"
                  style={{
                    fontSize: "clamp(20px, 1.85vw, 30px)",
                    lineHeight: 1.32,
                    letterSpacing: "-0.012em",
                    fontVariationSettings: "'opsz' 36",
                  }}
                >
                  {g.items.map((t, j) => (
                    <React.Fragment key={t}>
                      <span className="ss-stack-item">{t}</span>
                      {j < g.items.length - 1 && (
                        <span
                          aria-hidden
                          style={{ color: ACCENT, margin: "0 14px", opacity: 0.85 }}
                        >
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <Hairline />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Experience                                                               */
/* ──────────────────────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section
      id="experience"
      className="relative px-5 md:px-10 py-32 md:py-56"
      style={{ background: INK, color: IVORY }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="ss-gutter col-span-1 hidden md:block">
          <VRot>EXP — 05</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <SectionLabel index="05" title="Experience" />
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-50">
              2023 → 2024
            </div>
          </div>
          <Reveal delay={0.05}>
            <h2
              className="mt-8 font-serif"
              style={{
                fontSize: "clamp(54px, 9vw, 160px)",
                lineHeight: 0.85,
                letterSpacing: "-0.045em",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Field <span className="italic" style={{ fontWeight: 400 }}>notes.</span>
            </h2>
          </Reveal>
          <div className="mt-16">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.08}>
                <Hairline strong />
                <div className="grid grid-cols-12 gap-4 py-12 items-start">
                  <div className="col-span-12 md:col-span-2 font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
                    <div>0{i + 1}</div>
                    <div className="mt-2 opacity-80">{e.dates}</div>
                    <div className="mt-1 opacity-50">{e.location}</div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "clamp(28px, 3.8vw, 56px)",
                        lineHeight: 1,
                        letterSpacing: "-0.025em",
                        margin: 0,
                        fontVariationSettings: "'opsz' 144",
                      }}
                    >
                      {e.company}
                    </h3>
                    <div
                      className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase"
                      style={{ color: ACCENT }}
                    >
                      — {e.role}
                    </div>
                    <p className="mt-6 max-w-xl leading-[1.7] opacity-85" style={{ fontSize: 15 }}>
                      {e.body}
                    </p>
                  </div>
                  <div
                    className={`col-span-12 md:col-span-4 ${e.stats.length ? "grid grid-cols-3 md:grid-cols-1 gap-6" : ""}`}
                  >
                    {e.stats.map((s) => (
                      <div key={s.label}>
                        <div
                          className="font-serif tabular-nums"
                          style={{
                            fontSize: "clamp(40px, 5vw, 72px)",
                            lineHeight: 1, color: ACCENT,
                            letterSpacing: "-0.035em",
                            fontVariationSettings: "'opsz' 144",
                          }}
                        >
                          <CountUp to={s.v} suffix={s.suf} sign={s.sign} />
                        </div>
                        <div className="mt-2 font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
            <Hairline strong />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Testimonials                                                             */
/* ──────────────────────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section
      className="relative px-5 md:px-10 py-32 md:py-56 overflow-hidden"
      style={{ background: INK, color: IVORY }}
    >
      <SectionLabel index="06" title="Testimonials" />
      <div className="grid grid-cols-12 gap-6 mt-12">
        <div className="ss-testi-left col-span-12 md:col-span-7 relative">
          <Reveal>
            <blockquote
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(42px, 6.8vw, 116px)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                margin: 0,
                fontVariationSettings: "'opsz' 144",
                textIndent: "-0.4em",
              }}
            >
              <span style={{ color: ACCENT, fontStyle: "normal" }}>“</span>Success is not the key to
              happiness. Happiness is the key to success.<span style={{ color: ACCENT, fontStyle: "normal" }}>”</span>
            </blockquote>
          </Reveal>
          <div className="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase opacity-60">
            <span className="inline-block w-8 h-px" style={{ background: IVORY, opacity: 0.4 }} aria-hidden />
            ALBERT SCHWEITZER
          </div>
          <div className="mt-16">
            <Marquee speed={36} reverse>
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="px-6 font-mono text-[12px] tracking-[0.45em] uppercase"
                  style={{ opacity: i % 2 ? 0.6 : 0.3 }}
                >
                  TESTIMONIALS<span style={{ margin: "0 18px" }}>·</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
        <div className="ss-testi-right col-span-12 md:col-span-5 flex flex-col gap-5 mt-8 md:mt-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="p-7"
                style={{ border: `1px solid ${HAIR_STRONG}`, borderRadius: 2 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center font-mono"
                    style={{
                      background: ACCENT, color: INK,
                      fontSize: 13, letterSpacing: "0.05em",
                      borderRadius: 999,
                    }}
                  >
                    {t.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <div className="font-mono text-[12px] tracking-[0.18em] uppercase">{t.name}</div>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.25em] uppercase opacity-50">{t.role}</div>
                  </div>
                  <div className="ml-auto font-mono text-[10px] tracking-[0.3em] uppercase opacity-30">
                    0{i + 1}
                  </div>
                </div>
                <p
                  className="mt-6 font-serif"
                  style={{ fontSize: 20, lineHeight: 1.35, letterSpacing: "-0.005em" }}
                >
                  <span style={{ color: ACCENT }}>“</span>{t.quote.replace(/^“|”$/g, "")}<span style={{ color: ACCENT }}>”</span>
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Contact                                                                  */
/* ──────────────────────────────────────────────────────────────────────── */

/* Hand-drawn underline that draws on scroll-in */
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

function Contact({ time }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      const a = document.createElement("a");
      a.href = `mailto:${EMAIL}`;
      a.click();
    }
  }, []);

  /* Greeting derived from IST hour; depends on `time` so it stays accurate */
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
      if (h < 5) return "Burning the midnight oil";
      if (h < 12) return "Good morning, friend";
      if (h < 17) return "Good afternoon, friend";
      if (h < 21) return "Good evening, friend";
      return "Up late, friend?";
    } catch {
      return "Hello, friend";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time?.slice(0, 2)]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      id="contact"
      className="relative px-5 md:px-10 pt-32 md:pt-44 pb-10"
      style={{ background: IVORY, color: INK }}
    >
      {/* ─── Header band ──────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: ACCENT }}
            aria-hidden
          />
          <span style={{ color: ACCENT }}>INDEX / 07</span>
          <span className="opacity-50">— Contact</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] uppercase opacity-65">
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "#1f8a3a", boxShadow: "0 0 8px #1f8a3a" }}
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          AVAILABLE FOR WORK
        </div>
      </div>

      {/* ─── Greeting line ────────────────────────────────── */}
      <Reveal delay={0.05}>
        <div className="mt-14 md:mt-20 flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] uppercase opacity-55">
          <span style={{ color: ACCENT }}>↳</span>
          <span>{greeting}</span>
        </div>
      </Reveal>

      {/* ─── Hero prompt ──────────────────────────────────── */}
      <Reveal delay={0.1}>
        <h2
          className="mt-6 font-serif font-light"
          style={{
            fontSize: "clamp(60px, 10.5vw, 200px)",
            lineHeight: 0.82,
            letterSpacing: "-0.05em",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          <span className="block">Have a project</span>
          <span className="block italic" style={{ fontWeight: 400 }}>
            in mind
            <span
              style={{
                color: ACCENT,
                fontStyle: "normal",
                display: "inline-block",
                marginLeft: "0.02em",
              }}
            >
              ?
            </span>
          </span>
        </h2>
      </Reveal>

      {/* ─── Email copy CTA ───────────────────────────────── */}
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
            color: INK,
            cursor: "inherit",
          }}
        >
          <span
            className="ss-email-text"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontSize: "clamp(28px, 4.8vw, 78px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {EMAIL}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.35em] uppercase inline-flex items-center gap-2"
            style={{
              color: copied ? ACCENT : "rgba(10,10,10,0.55)",
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
                  <span aria-hidden>✓</span>
                  COPIED TO CLIPBOARD
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
                  <span aria-hidden>[</span>
                  CLICK TO COPY
                  <span aria-hidden>]</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </Reveal>

      {/* ─── Signature wordmark with SVG underline ────────── */}
      <Reveal delay={0.25}>
        <div className="mt-20 md:mt-28 relative inline-block">
          <div
            style={{
              fontFamily:
                "var(--font-caveat), 'Caveat Brush', 'Caveat', cursive",
              fontSize: "clamp(110px, 19vw, 340px)",
              lineHeight: 0.82,
              color: INK,
              letterSpacing: "-0.01em",
              position: "relative",
              paddingRight: "0.15em",
            }}
          >
            Sahil Sapariya<span style={{ color: ACCENT }}>.</span>
            <SignatureUnderline />
          </div>
        </div>
      </Reveal>

      {/* ─── Made-with line ───────────────────────────────── */}
      <Reveal delay={0.3}>
        <p
          className="mt-10 font-serif"
          style={{
            fontSize: "clamp(22px, 3vw, 44px)",
            lineHeight: 1.18,
            letterSpacing: "-0.018em",
            maxWidth: 920,
            fontVariationSettings: "'opsz' 36",
          }}
        >
          Made with <span style={{ color: ACCENT }}>❤</span> and Next.js in
          Ahmedabad, India.
        </p>
      </Reveal>

      {/* ─── Social grid ──────────────────────────────────── */}
      <div
        className="ss-social-grid mt-20 grid grid-cols-1 md:grid-cols-4"
        style={{
          borderTop: `1px solid rgba(10,10,10,0.18)`,
          borderLeft: `1px solid rgba(10,10,10,0.18)`,
        }}
      >
        {SOCIALS.map(({ idx, label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="ss-social-btn group relative overflow-hidden p-7 md:p-8 flex items-center justify-between no-underline"
            style={{
              background: IVORY,
              color: INK,
              borderRight: `1px solid rgba(10,10,10,0.18)`,
              borderBottom: `1px solid rgba(10,10,10,0.18)`,
            }}
          >
            <span className="ss-social-fill" aria-hidden />
            <span className="ss-social-label relative flex items-center gap-4 font-mono text-[12px] tracking-[0.25em] uppercase">
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

      {/* ─── Footer band ──────────────────────────────────── */}
      <div className="mt-16 grid grid-cols-12 gap-4 items-end">
        <div className="col-span-12 md:col-span-5 font-mono text-[11px] tracking-[0.25em] uppercase opacity-65">
          © 2026 Sahil Sapariya · All Rights Reserved
        </div>
        <div className="col-span-12 md:col-span-4 flex md:justify-center font-mono text-[11px] tracking-[0.25em] uppercase opacity-65">
          <span className="flex items-center gap-2">
            <Clock size={12} />
            <span className="tabular-nums">{time}</span>
            <span className="opacity-60">IST · AHMEDABAD</span>
          </span>
        </div>
        <div className="col-span-12 md:col-span-3 flex md:justify-end">
          <button
            onClick={scrollToTop}
            data-cursor="hover"
            className="ss-back-top group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
            aria-label="Back to top"
            style={{ border: "none", background: "transparent", color: INK, padding: 0 }}
          >
            <span>BACK TO TOP</span>
            <span
              className="ss-back-circle"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44, height: 44,
                borderRadius: 999,
                border: "1px solid rgba(10,10,10,0.3)",
                transition: "background .4s var(--ease), color .4s var(--ease), border-color .4s var(--ease), transform .4s var(--ease)",
              }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
                style={{ display: "inline-block", transform: "rotate(-45deg)" }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </span>
          </button>
        </div>
      </div>

      {/* ─── Marquee watermark ────────────────────────────── */}
      <div className="mt-16 -mx-5 md:-mx-10">
        <Marquee speed={50} pauseOnHover={false}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-serif"
              style={{
                fontStyle: i % 2 === 0 ? "italic" : "normal",
                fontWeight: 300,
                fontSize: "clamp(80px, 17vw, 280px)",
                lineHeight: 0.85,
                letterSpacing: "-0.045em",
                color: "rgba(10,10,10,0.07)",
                paddingRight: "0.4em",
                fontVariationSettings: "'opsz' 144",
                whiteSpace: "nowrap",
              }}
            >
              Sahil Sapariya
              <span style={{ color: "rgba(255,74,28,0.18)", margin: "0 0.3em" }}>·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Custom cursor — three states (default, hover, project)                   */
/* ──────────────────────────────────────────────────────────────────────── */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 380, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 380, mass: 0.4 });
  const [mode, setMode] = useState("default"); // default | hover | project

  useEffect(() => {
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("[data-cursor='project']")) setMode("project");
      else if (t.closest("[data-cursor='hover']") || t.closest("a") || t.closest("button")) setMode("hover");
      else setMode("default");
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  const size = mode === "project" ? 96 : mode === "hover" ? 56 : 14;
  const showLabel = mode === "project";

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[210] pointer-events-none flex items-center justify-center"
      style={{
        x: sx, y: sy,
        translateX: "-50%", translateY: "-50%",
        width: size, height: size,
        background: mode === "default" ? "transparent" : IVORY,
        border: mode === "default" ? `1px solid ${IVORY}` : "none",
        borderRadius: "50%",
        mixBlendMode: "difference",
        transition: "width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), background .25s ease",
      }}
    >
      {showLabel && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: INK,
          }}
        >
          VIEW
        </span>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Root                                                                     */
/* ──────────────────────────────────────────────────────────────────────── */
export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);
  const time = useLiveTime();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const smoothEnabled = loaded && !isMobile && !reduced;
  const contentRef = useLenisLike(smoothEnabled);

  /* Anchor link smooth-scroll override (works with our lerp) */
  useEffect(() => {
    if (!smoothEnabled) return;
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [smoothEnabled]);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader key="loader" onDone={handleLoaded} />}
      </AnimatePresence>

      {!isMobile && !reduced && loaded && <Cursor />}
      {loaded && <ScrollProgress />}
      {loaded && <FilmGrain />}

      <Nav time={time} />

      {/* Smooth-scroll fixed wrapper (desktop only) */}
      <div
        style={
          smoothEnabled
            ? { position: "fixed", top: 0, left: 0, right: 0, willChange: "transform" }
            : {}
        }
      >
        <div ref={contentRef}>
          <main style={{ visibility: loaded ? "visible" : "hidden" }}>
            <Hero reduced={reduced} />
            <About />
            <Work />
            <Capabilities />
            <Experience />
            <Testimonials />
            <Contact time={time} />
          </main>
        </div>
      </div>
    </>
  );
}
