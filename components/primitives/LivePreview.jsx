"use client";

import { ArrowUpRight } from "lucide-react";
import { ACCENT, BG, HAIR, HAIR_STRONG } from "@/lib/tokens";

/* macOS-style window chrome — proper traffic light colours,
   centered URL bar with padlock, subtle inset depth.
   Same chrome strip used for both wordmark and image modes so the
   preview reads as a real browser window in either case. */
function MacChrome({ display }) {
  return (
    <div
      className="ss-mac-chrome flex items-center gap-3 px-3 py-2.5"
      style={{
        background:
          "linear-gradient(180deg, rgba(234,229,220,0.06), rgba(234,229,220,0.025))",
        borderBottom: `1px solid ${HAIR}`,
      }}
    >
      {/* Traffic lights — real macOS colours */}
      <div className="flex gap-[6px] shrink-0" aria-hidden>
        <span
          className="block rounded-full"
          style={{
            width: 11,
            height: 11,
            background: "#FF5F57",
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.18)",
          }}
        />
        <span
          className="block rounded-full"
          style={{
            width: 11,
            height: 11,
            background: "#FEBC2E",
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.18)",
          }}
        />
        <span
          className="block rounded-full"
          style={{
            width: 11,
            height: 11,
            background: "#28C840",
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.18)",
          }}
        />
      </div>

      {/* URL pill — Safari-style centered bar with padlock */}
      <div
        className="flex-grow flex items-center justify-center gap-2 px-3 py-1"
        style={{
          background: "rgba(14,14,12,0.45)",
          border: `1px solid rgba(234,229,220,0.06)`,
          borderRadius: 6,
          maxWidth: "70%",
          margin: "0 auto",
          minHeight: 22,
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          style={{ opacity: 0.55, flexShrink: 0 }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span
          className="font-mono truncate"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.02em",
            opacity: 0.85,
          }}
        >
          {display}
        </span>
      </div>

      {/* Visit-cue arrow on the far right to balance the lights */}
      <span aria-hidden style={{ opacity: 0.5, flexShrink: 0 }}>
        <ArrowUpRight size={13} />
      </span>
    </div>
  );
}

/* LivePreview — a designed card for case studies. Two modes:
   1. Wordmark mode  → macOS chrome + serif title + italic tagline +
                       visit CTA. Used when no screenshot is available.
   2. Image mode     → macOS chrome + the real screenshot below.
                       Triggered by setting `preview.image`. */
export function LivePreview({ preview }) {
  if (!preview) return null;
  const display = preview.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const hasImage = !!preview.image;

  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="ss-live-preview block group relative overflow-hidden"
      style={{
        border: `1px solid ${HAIR_STRONG}`,
        borderRadius: 10,
        boxShadow:
          "0 18px 40px -12px rgba(0,0,0,0.55), 0 6px 14px -4px rgba(0,0,0,0.3)",
        background: hasImage
          ? BG
          : "linear-gradient(135deg, rgba(255,91,42,0.05), rgba(234,229,220,0.015) 55%)",
      }}
    >
      <MacChrome display={display} />

      {hasImage ? (
        /* Image mode — screenshot in a fixed-aspect frame */
        <div className="relative" style={{ aspectRatio: "16 / 10" }}>
          <img
            src={preview.image}
            alt={
              preview.alt ||
              `${preview.title || "Project"} — live marketing site preview`
            }
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
          {/* CTA strip overlaid at the bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between t-caption"
            style={{
              background:
                "linear-gradient(to top, rgba(14,14,12,0.85), rgba(14,14,12,0))",
              color: "#EAE5DC",
            }}
          >
            <span style={{ color: ACCENT }}>
              {preview.label || "LIVE MARKETING SITE"}
            </span>
            <span className="inline-flex items-center gap-2">
              VISIT SITE
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      ) : (
        /* Wordmark mode — designed editorial card */
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
      )}
    </a>
  );
}
