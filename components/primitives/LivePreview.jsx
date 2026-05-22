"use client";

import { ArrowUpRight } from "lucide-react";
import { ACCENT, HAIR, HAIR_STRONG } from "@/lib/tokens";

/* LivePreview — a designed card for case studies. Two modes:
   1. Wordmark mode  → faux URL chrome + serif title + italic tagline +
                       visit CTA. Used when no screenshot is available.
   2. Image mode     → faux URL chrome + the real screenshot below.
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
        borderRadius: 2,
        background: hasImage
          ? "rgba(14,14,12,0.6)"
          : "linear-gradient(135deg, rgba(255,91,42,0.05), rgba(234,229,220,0.015) 55%)",
      }}
    >
      {/* Faux URL chrome — consistent across modes */}
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

      {hasImage ? (
        /* Image mode — screenshot stretched into a fixed aspect frame */
        <div className="relative" style={{ aspectRatio: "16 / 10" }}>
          <img
            src={preview.image}
            alt={preview.title || ""}
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
