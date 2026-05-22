"use client";

import { ACCENT, BG, FG } from "@/lib/tokens";
import { FOCUS } from "@/lib/content";
import {
  Hairline,
  Reveal,
  SectionLabel,
  StatusPill,
  TypewriterLine,
  VRot,
} from "@/components/primitives";

export function CurrentFocus({ time }) {
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
                  <div
                    className="col-span-12 md:col-span-4 font-serif"
                    style={{
                      fontSize: "clamp(18px, 1.5vw, 24px)",
                      lineHeight: 1.3,
                      fontVariationSettings: "'opsz' 36",
                    }}
                  >
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
