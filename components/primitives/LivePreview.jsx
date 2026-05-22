"use client";

import { ArrowUpRight } from "lucide-react";
import { ACCENT, HAIR, HAIR_STRONG } from "@/lib/tokens";

/* LivePreview — a designed "marketing site" card used in case studies
   where we can show the public surface but not internal architecture.
   Renders a faux URL chrome above a serif wordmark and a tagline. */
export function LivePreview({ preview }) {
  if (!preview) return null;
  const display = preview.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="ss-live-preview block group relative overflow-hidden"
      style={{
        border: `1px solid ${HAIR_STRONG}`,
        borderRadius: 2,
        background:
          "linear-gradient(135deg, rgba(255,91,42,0.05), rgba(234,229,220,0.015) 55%)",
      }}
    >
      {/* Faux URL chrome */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      >
        <span className="flex gap-1.5" aria-hidden>
          <span
            className="block w-2 h-2 rounded-full"
            style={{ background: "rgba(234,229,220,0.22)" }}
          />
          <span
            className="block w-2 h-2 rounded-full"
            style={{ background: "rgba(234,229,220,0.22)" }}
          />
          <span
            className="block w-2 h-2 rounded-full"
            style={{ background: "rgba(234,229,220,0.22)" }}
          />
        </span>
        <span
          className="flex-grow text-center font-mono opacity-65"
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "lowercase",
          }}
        >
          {display}
        </span>
        <ArrowUpRight size={12} style={{ opacity: 0.55 }} />
      </div>

      {/* Body */}
      <div className="p-7 md:p-9 flex flex-col">
        <div className="t-caption" style={{ color: ACCENT }}>
          {preview.label || "LIVE MARKETING SITE"}
        </div>
        <h4
          className="mt-4 font-serif"
          style={{
            fontSize: "clamp(32px, 3.4vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontVariationSettings: "'opsz' 144",
            fontWeight: 400,
          }}
        >
          {preview.title}
        </h4>
        <p
          className="mt-3 font-serif italic"
          style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            fontVariationSettings: "'opsz' 36",
            opacity: 0.78,
          }}
        >
          {preview.tagline}
        </p>
        <div className="mt-7 t-caption flex items-center gap-2">
          <span>VISIT SITE</span>
          <ArrowUpRight size={11} />
        </div>
      </div>
    </a>
  );
}
