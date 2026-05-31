"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ACCENT, BG, EASE, EASE_HEAVY, FG } from "@/lib/tokens";
import { NAV_LINKS } from "@/lib/content";
import { useActiveSection } from "@/hooks";

export function Nav({ time }) {
  const active = useActiveSection([
    "top",
    "focus",
    "work",
    "systems",
    "notes",
    "journey",
    "lab",
    "philosophy",
    "contact",
  ]);

  const [open, setOpen] = useState(false);

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  /* Close menu on Esc. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Programmatic anchor navigation — needed because the browser tries
     to scroll on `<a href="#x">` click BEFORE React commits the
     setOpen(false) state update and releases the body scroll lock,
     so the hash changes but the scroll silently fails. Two RAFs let
     React commit + effect cleanup run, then we scroll manually. */
  const navigateTo = useCallback((href, id) => {
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          if (typeof window !== "undefined" && window.history?.replaceState) {
            window.history.replaceState(null, "", href);
          }
        }
      });
    });
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5 md:py-6 flex items-center justify-between t-meta-tight"
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

        {/* Desktop nav — visible from md+ */}
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

        {/* Right cluster: clock (always), menu toggle (mobile only) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 opacity-65 tabular-nums">
            {time}
            <span className="hidden md:inline opacity-55">IST</span>
          </div>
          {/* Hamburger — three lines that morph to an X when open.
              Visible only below md. */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              marginRight: -8,
              background: "transparent",
              border: "none",
              padding: 0,
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <span
              className="relative inline-block"
              style={{ width: 22, height: 14 }}
              aria-hidden
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: "currentColor",
                  top: open ? 6 : 1,
                  transform: open ? "rotate(45deg)" : "rotate(0)",
                  transition: "top .35s var(--ease), transform .35s var(--ease)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: "currentColor",
                  top: 12,
                  opacity: open ? 0 : 1,
                  transition: "opacity .2s var(--ease)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: "currentColor",
                  top: open ? 6 : 12,
                  transform: open ? "rotate(-45deg)" : "rotate(0)",
                  transition: "top .35s var(--ease), transform .35s var(--ease)",
                }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu — full-viewport editorial overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_HEAVY }}
            className="fixed inset-0 z-40 flex flex-col px-5 pt-24 pb-10"
            style={{ background: BG, color: FG }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="t-caption opacity-50 mb-8">CHAPTERS</div>
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(l.href, l.id);
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: EASE }}
                  className="font-serif flex items-baseline gap-4"
                  style={{
                    fontSize: "clamp(28px, 10vw, 56px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    fontVariationSettings: "'opsz' 72",
                    fontStyle: active === l.id ? "italic" : "normal",
                    color: active === l.id ? ACCENT : FG,
                  }}
                >
                  <span
                    className="t-caption opacity-40 tabular-nums"
                    style={{ fontStyle: "normal" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-10 grid grid-cols-2 gap-4 t-meta-tight opacity-60">
              <div>
                Vadodara, IN
                <br />
                <span className="tabular-nums">{time}</span> IST
              </div>
              <div className="text-right">
                © 2026
                <br />
                Sahil Sapariya
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
