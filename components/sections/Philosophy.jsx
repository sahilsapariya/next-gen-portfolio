"use client";

import { BG, FG } from "@/lib/tokens";
import { PHILOSOPHY } from "@/lib/content";
import { SectionLabel, TypewriterLine, VRot } from "@/components/primitives";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative px-5 md:px-10 py-32 md:py-44 overflow-hidden"
      style={{ background: BG, color: FG }}
    >
      <SectionLabel index="08" title="Philosophy" count="5 LINES" />
      <div className="grid grid-cols-12 gap-6 mt-12">
        <div className="hidden md:block col-span-1">
          <VRot>PHILOSOPHY — 08</VRot>
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
