"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
   Tokens
   ────────────────────────────────────────────────────────────────────── */
const BG = "#0E0E0C";
const FG = "#EAE5DC";
const ACCENT = "#FF5B2A";
const LIVE = "#4DB874";
const MUTED = "#8B847A";
const HAIR = "rgba(234,229,220,0.14)";
const HAIR_STRONG = "rgba(234,229,220,0.22)";
const HAIR_SOFT = "rgba(234,229,220,0.08)";
const EASE = [0.22, 1, 0.36, 1];
const EASE_HEAVY = [0.76, 0, 0.24, 1];

const EMAIL = "sahileng03@gmail.com";

/* ──────────────────────────────────────────────────────────────────────
   Content
   ────────────────────────────────────────────────────────────────────── */
const SOCIALS = [
  { idx: "01", label: "GitHub", href: "https://github.com/sahilsapariya", Icon: Github },
  { idx: "02", label: "LinkedIn", href: "https://linkedin.com/in/sahilsapariya", Icon: Linkedin },
  { idx: "03", label: "Twitter", href: "https://twitter.com/sahil_sapariya", Icon: Twitter },
  { idx: "04", label: "Instagram", href: "https://instagram.com/_sahil_sapariya_03", Icon: Instagram },
];

const FOCUS = [
  {
    status: "active",
    title: "School ERP platform",
    desc: "Frontend architecture and several backend modules.",
  },
  {
    status: "active",
    title: "Inventory management system",
    desc: "Practical workflows and reliable execution.",
  },
  {
    status: "exploring",
    title: "AI-assisted engineering workflows",
    desc: "Pipelines, automation, iteration loops.",
  },
  {
    status: "shipping",
    title: "Production SaaS systems",
    desc: "Release cadence and deployment discipline.",
  },
  {
    status: "curious",
    title: "Low-level + high-performance systems",
    desc: "Systems thinking and execution depth.",
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "School ERP",
    year: "2025",
    status: "Active · Production",
    context:
      "A production-focused school ERP platform being built for real institutions — academics, attendance, timetable, dashboard, and management workflows.",
    role: "I own the frontend architecture and several backend modules, working closely on product decisions and implementation flow.",
    decision:
      "Designing the academic backbone in a future-proof way instead of taking shortcuts that would have made timetable, attendance, and subject management harder later.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "REST", "Auth"],
    links: null,
  },
  {
    n: "02",
    title: "College360",
    year: "2024",
    status: "Shipped · Award",
    context:
      "A 3D virtual campus experience built during DUHACKS 2.0 to help students explore Dharmsinh Desai University remotely.",
    role: "I was the team lead — product direction, frontend implementation, and overall execution.",
    decision:
      "Aggressively limiting scope so the demo felt polished and complete instead of trying to simulate an entire university ecosystem.",
    stack: ["Three.js", "Panolens.js", "HTML", "CSS"],
    award: "Best Open Innovation — DUHACKS 2.0",
    links: {
      repo: "https://github.com/sahilsapariya/college360",
      live: "https://college360.netlify.app",
    },
  },
  {
    n: "03",
    title: "Inventory System",
    year: "2025",
    status: "Active · Internal",
    context:
      "An inventory and operational management system focused on practical workflows, reliability, and maintainable architecture.",
    role: "I handle the product architecture, frontend system design, and backend workflow implementation.",
    decision:
      "Prioritizing operational simplicity and maintainability over adding unnecessary complexity too early.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "REST"],
    links: null,
  },
  {
    n: "04",
    title: "AI Workflow Experiments",
    year: "Ongoing",
    status: "Exploring · Solo",
    context:
      "A collection of internal experiments around AI-assisted engineering workflows, implementation pipelines, and developer automation systems.",
    role: "Solo — exploring how AI can improve execution speed and iteration quality without replacing engineering judgment.",
    decision:
      "Designing workflows that remain reliable and practical instead of becoming over-automated gimmicks.",
    stack: ["OpenAI API", "LangChain", "Python", "Node"],
    links: null,
  },
];

const JOURNEY = [
  {
    year: "2017",
    body: "A small town. Curiosity. Internet mostly through mobile devices, and early interest in technology before I had words for it.",
  },
  {
    year: "2021",
    body: "JEE preparation in a metro hostel after years of native-language schooling. The transition exposed me to intense competition and reshaped how I think about discipline, pressure, and ambition.",
  },
  {
    year: "2022",
    body: "Entered DDU for Information Technology. Started programming seriously and got deeply pulled into software engineering and product building.",
  },
  {
    year: "2023",
    body: "First real-world projects and collaborative development. Early exposure to production thinking and implementation discipline.",
  },
  {
    year: "2024",
    body: "Frontend-heavy product development. Sharper sense of UI systems, implementation quality, and engineering workflows.",
  },
  {
    year: "2024",
    body: "DUHACKS 2.0 — won Best Open Innovation with College360 while leading the team.",
    highlight: true,
  },
  {
    year: "2025",
    body: "Working on complete product systems — frontend architecture, backend workflows, deployment flow, and product execution.",
  },
  {
    year: "Today",
    body: "Building School ERP, exploring AI-assisted engineering workflows, and getting more interested in systems thinking, execution quality, and low-level engineering concepts.",
    active: true,
  },
];

const LAB = [
  {
    title: "AI Engineering Pipeline",
    body: "Structured AI-assisted implementation workflows for faster feature delivery and engineering iteration cycles.",
    status: "exploring",
    since: "today",
  },
  {
    title: "Portfolio Monograph",
    body: "Rebuilding my portfolio into a cinematic editorial-style engineering experience focused on storytelling and systems thinking.",
    status: "in use",
    since: "today",
  },
  {
    title: "ERP Academic System Experiments",
    body: "Timetable flows, attendance architecture, and scalable academic workflow ideas for the ERP platform.",
    status: "in use",
    since: "3 days ago",
  },
  {
    title: "Autonomous Workflow Research",
    body: "Supervisor-agent style development workflows, implementation orchestration, and AI critique/review loops.",
    status: "rebuilding",
    since: "last week",
  },
  {
    title: "Inventory Architecture Exploration",
    body: "Practical inventory workflows, schema structures, and operational UX patterns before full implementation.",
    status: "exploring",
    since: "5 days ago",
  },
];

const PHILOSOPHY = [
  "Ship the smallest version that proves it.",
  "Architecture is a series of small honest choices.",
  "Most engineering taste is restraint.",
  "Read code more than you write code.",
  "The best tool is the one you finish.",
];

const NAV_LINKS = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#systems", label: "Systems", id: "systems" },
  { href: "#lab", label: "Lab", id: "lab" },
  { href: "#contact", label: "Contact", id: "contact" },
];

/* ──────────────────────────────────────────────────────────────────────
   Hooks
   ────────────────────────────────────────────────────────────────────── */
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
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () => {
      try {
        setT(
          new Date().toLocaleTimeString("en-GB", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
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

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useMagnetic(strength = 0.22) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = `translate3d(0, 0, 0)`;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

/* ──────────────────────────────────────────────────────────────────────
   Primitives
   ────────────────────────────────────────────────────────────────────── */
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
      className="hidden md:block t-caption"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ index, title, count }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 t-meta">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT }}
        />
        <span style={{ color: ACCENT }}>INDEX / {index}</span>
        <span className="opacity-45">— {title}</span>
      </div>
      {count && <div className="opacity-45 t-caption">{count}</div>}
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
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SplitDisplay({ text, delay = 0, italic = false, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span
      ref={ref}
      aria-label={text}
      className={className}
      style={{ fontStyle: italic ? "italic" : "normal" }}
    >
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
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
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TypewriterLine({ text, start = 0, speed = 28, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const total = text.length;
    const startTimer = setTimeout(function tick() {
      i += 1;
      setN(i);
      if (i < total) setTimeout(tick, speed);
    }, start);
    return () => clearTimeout(startTimer);
  }, [inView, text, speed, start]);
  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, n)}
      {inView && n < text.length && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.55em",
            marginLeft: 2,
            color: ACCENT,
            animation: "ssCaret 0.85s steps(1) infinite",
          }}
        >
          |
        </span>
      )}
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    active: { color: LIVE, pulse: true },
    "in use": { color: LIVE, pulse: true },
    shipping: { color: LIVE, pulse: false },
    exploring: { color: ACCENT, pulse: false },
    rebuilding: { color: ACCENT, pulse: false },
    curious: { color: MUTED, pulse: false },
    shelved: { color: MUTED, pulse: false },
  };
  const m = map[status] || { color: MUTED, pulse: false };
  return (
    <span className="inline-flex items-center gap-2.5">
      <motion.span
        aria-hidden
        className="inline-block rounded-full"
        style={{
          width: 7,
          height: 7,
          background: m.color,
          boxShadow: m.pulse ? `0 0 8px ${m.color}` : "none",
        }}
        animate={m.pulse ? { opacity: [1, 0.45, 1] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="t-meta" style={{ color: m.color }}>
        {status}
      </span>
    </span>
  );
}

function MarqueeRow({ children, speed = 40, reverse = false }) {
  return (
    <div className="overflow-hidden w-full" aria-hidden>
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `${reverse ? "ssMarqRev" : "ssMarq"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

function DrawPath({ d, stroke = FG, strokeWidth = 1.2, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Chrome
   ────────────────────────────────────────────────────────────────────── */
function Nav({ time }) {
  const active = useActiveSection([
    "top",
    "focus",
    "work",
    "systems",
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

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 380, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 380, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mv = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      setHover(
        !!(
          t.closest("[data-cursor='hover']") ||
          t.closest("a") ||
          t.closest("button")
        )
      );
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[210] pointer-events-none rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: hover ? 48 : 12,
        height: hover ? 48 : 12,
        background: hover ? FG : "transparent",
        border: hover ? "none" : `1px solid ${FG}`,
        mixBlendMode: "difference",
        transition:
          "width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), background .25s ease",
      }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: ACCENT,
        transformOrigin: "0 50%",
        scaleX,
        zIndex: 90,
      }}
    />
  );
}

function FilmGrain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        pointerEvents: "none",
        opacity: 0.035,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   01 · Hero
   ────────────────────────────────────────────────────────────────────── */
function Hero({ reduced, time }) {
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
              <span style={{ color: ACCENT }}>01</span>
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

          <Reveal delay={0.7} y={20}>
            <div className="mt-10 max-w-md t-meta-tight" style={{ color: MUTED }}>
              Currently @ Jeavio
              <span className="opacity-50 mx-2">·</span>
              Ahmedabad, IN
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
          <span>BASED IN AHMEDABAD · IN</span>
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

/* ──────────────────────────────────────────────────────────────────────
   02 · Current Focus
   ────────────────────────────────────────────────────────────────────── */
function CurrentFocus({ time }) {
  return (
    <section
      id="focus"
      className="relative px-5 md:px-10 py-32 md:py-44"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>FOCUS — 02</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel
            index="02"
            title="Current Focus"
            count={
              <span>
                LIVE <span className="tabular-nums">{time}</span> IST
              </span>
            }
          />

          <Reveal delay={0.05}>
            <h2 className="mt-10 t-section">
              <span className="block overflow-hidden">Currently</span>
              <span
                className="block overflow-hidden italic"
                style={{ fontWeight: 400 }}
              >
                building
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

          <div className="mt-16 md:mt-24">
            <Hairline strong />
            {FOCUS.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 items-baseline">
                  <div className="col-span-12 md:col-span-1 t-caption opacity-45 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-12 md:col-span-3">
                    <StatusPill status={f.status} />
                  </div>
                  <div className="col-span-12 md:col-span-4 font-serif" style={{ fontSize: "clamp(18px, 1.5vw, 24px)", lineHeight: 1.3, fontVariationSettings: "'opsz' 36" }}>
                    {f.title}
                  </div>
                  <div
                    className="col-span-12 md:col-span-4 font-serif italic opacity-75"
                    style={{
                      fontSize: "clamp(16px, 1.2vw, 19px)",
                      lineHeight: 1.4,
                      fontVariationSettings: "'opsz' 36",
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
                <Hairline />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 t-caption">
              <TypewriterLine text="// open to discussions, collaborations, and hard problems." />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   03 · Selected Work — pinned case study panels
   ────────────────────────────────────────────────────────────────────── */
function ProjectPanel({ project }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* 3 stages: context (0–33%), decision (33–66%), outcome (66–100%) */
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
  const oOutcome = useTransform(
    scrollYProgress,
    [0.62, 0.72, 1],
    [0, 1, 1]
  );
  const stage = useTransform(scrollYProgress, (v) =>
    v < 0.42 ? 1 : v < 0.72 ? 2 : 3
  );
  const [stageNum, setStageNum] = useState(1);
  useEffect(() => {
    const unsub = stage.on("change", (v) => setStageNum(v));
    return unsub;
  }, [stage]);

  /* On mobile, render flat (no pinning) */
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
                  <a className="ss-link" href={project.links.repo} target="_blank" rel="noreferrer">
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

  /* Desktop: pinned panel that morphs through 3 stages */
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
            className="absolute inset-0 grid grid-cols-12 gap-6"
          >
            <div className="col-span-12 md:col-span-7">
              <div className="t-caption mb-4 opacity-55">CONTEXT</div>
              <p className="t-lead">{project.context}</p>
              <p className="mt-6 t-lead italic opacity-80">{project.role}</p>
            </div>
          </motion.div>

          {/* Stage 2 — decision */}
          <motion.div
            style={{ opacity: oDecision }}
            className="absolute inset-0 grid grid-cols-12 gap-6"
          >
            <div className="col-span-12 md:col-span-8">
              <div
                className="t-caption mb-4"
                style={{ color: ACCENT }}
              >
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
            className="absolute inset-0 grid grid-cols-12 gap-6"
          >
            <div className="col-span-12 md:col-span-7">
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

function SelectedWork() {
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

      {/* Pinned panels */}
      <div className="mt-20 md:mt-28">
        {PROJECTS.map((p) => (
          <ProjectPanel key={p.n} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   04 · Systems & Engineering — three SVG flows
   ────────────────────────────────────────────────────────────────────── */
function SystemsDiagram({ title, nodes, paths, caption }) {
  return (
    <div className="mt-20 md:mt-24">
      <Reveal>
        <div className="t-meta-tight opacity-55 mb-3">{title}</div>
      </Reveal>
      <div
        className="relative w-full"
        style={{ border: `1px solid ${HAIR}`, background: "rgba(234,229,220,0.015)" }}
      >
        <svg
          viewBox="0 0 1000 220"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block" }}
        >
          {paths.map((p, i) => (
            <DrawPath key={i} d={p} stroke={HAIR_STRONG} strokeWidth="1" delay={0.2 + i * 0.1} />
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

function Systems() {
  const feature = {
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
  };
  const deploy = {
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
  };
  const ai = {
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
  };

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
          <SystemsDiagram {...feature} />
          <SystemsDiagram {...deploy} />
          <SystemsDiagram {...ai} />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   05 · Journey
   ────────────────────────────────────────────────────────────────────── */
function JourneyEntry({ entry, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.25, 1, 1, 0.25]);
  const yearScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1.08, 1.08, 0.92]);
  const yearColor = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [
    FG,
    ACCENT,
    ACCENT,
    FG,
  ]);

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

function Journey() {
  return (
    <section
      id="journey"
      className="relative px-5 md:px-10 py-32 md:py-44"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>JOURNEY — 05</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel index="05" title="Journey" count="2017 → TODAY" />
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
                <JourneyEntry entry={e} i={i} />
                <Hairline />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   06 · Experimental Lab
   ────────────────────────────────────────────────────────────────────── */
function LabTile({ entry, i }) {
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
        <div className="mt-6 t-caption opacity-45">
          LAST TOUCHED · {entry.since.toUpperCase()}
        </div>
      </motion.div>
    </Reveal>
  );
}

function ExperimentalLab() {
  return (
    <section
      id="lab"
      className="relative px-5 md:px-10 py-32 md:py-44"
      style={{ background: BG, color: FG }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-1">
          <VRot>LAB — 06</VRot>
        </div>
        <div className="col-span-12 md:col-span-11">
          <SectionLabel
            index="06"
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
              Half-built experiments and side explorations. Honest about status — not every idea ships, and that's the point.
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

/* ──────────────────────────────────────────────────────────────────────
   07 · Philosophy
   ────────────────────────────────────────────────────────────────────── */
function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative px-5 md:px-10 py-32 md:py-44 overflow-hidden"
      style={{ background: BG, color: FG }}
    >
      <SectionLabel index="07" title="Philosophy" count="5 LINES" />
      <div className="grid grid-cols-12 gap-6 mt-12">
        <div className="hidden md:block col-span-1">
          <VRot>PHILOSOPHY — 07</VRot>
        </div>
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <div className="space-y-8 md:space-y-10 mt-8 md:mt-16">
            {PHILOSOPHY.map((line, i) => (
              <div
                key={i}
                className="flex items-baseline gap-5 md:gap-8 font-serif italic"
                style={{
                  fontSize: "clamp(24px, 3.4vw, 56px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  fontVariationSettings: "'opsz' 72",
                }}
              >
                <span
                  className="t-caption tabular-nums opacity-30"
                  style={{ fontStyle: "normal" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontWeight: 400 }}>
                  <TypewriterLine text={line} start={i * 700} speed={22} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   08 · Contact
   ────────────────────────────────────────────────────────────────────── */
function Contact({ time }) {
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
      className="relative px-5 md:px-10 pt-32 md:pt-44 pb-10"
      style={{ background: FG, color: BG }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4 t-meta">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: ACCENT }}
          />
          <span style={{ color: ACCENT }}>INDEX / 08</span>
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
            lineHeight: 0.95,
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

      {/* Signature wordmark — small but kept */}
      <Reveal delay={0.3}>
        <div
          className="mt-20 md:mt-28 font-script"
          style={{
            fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85,
            color: BG,
            letterSpacing: "-0.005em",
          }}
        >
          Sahil Sapariya
          <span style={{ color: ACCENT }}>.</span>
        </div>
      </Reveal>

      {/* Socials */}
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

      {/* Footer band */}
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
              <span aria-hidden style={{ transform: "rotate(-45deg)", display: "inline-flex" }}>
                <ArrowUpRight size={16} />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────── */
export default function Page() {
  const time = useLiveTime();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && !reduced && <Cursor />}
      <ScrollProgress />
      <FilmGrain />
      <Nav time={time} />

      <main>
        <Hero reduced={reduced} time={time} />
        <CurrentFocus time={time} />
        <SelectedWork />
        <Systems />
        <Journey />
        <ExperimentalLab />
        <Philosophy />
        <Contact time={time} />
      </main>
    </>
  );
}
