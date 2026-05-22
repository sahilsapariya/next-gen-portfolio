import { ImageResponse } from "next/og";
import { PERSON, SITE_SHORT, SITE_URL } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${PERSON.name} — ${PERSON.jobTitle}, Product Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Next.js App Router opengraph-image convention — this function is
   evaluated at request time on the edge and serves the resulting PNG
   as the OG image at /opengraph-image (and is referenced by metadata
   in layout.jsx). */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0E0E0C",
          color: "#EAE5DC",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top band — index marker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(234,229,220,0.65)",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#FF5B2A",
              display: "block",
            }}
          />
          <div style={{ color: "#FF5B2A" }}>INDEX / 00</div>
          <div style={{ opacity: 0.5 }}>—</div>
          <div>ENGINEER · PRODUCT BUILDER · SYSTEMS THINKER</div>
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1, display: "flex" }} />

        {/* Wordmark — italic serif name + accent period */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontSize: 168,
            fontStyle: "italic",
            lineHeight: 1,
            letterSpacing: -6,
            fontWeight: 400,
          }}
        >
          {PERSON.name}
          <span style={{ color: "#FF5B2A", fontStyle: "normal" }}>.</span>
        </div>

        {/* Subhead */}
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            fontStyle: "italic",
            opacity: 0.85,
            display: "flex",
            lineHeight: 1.2,
          }}
        >
          An engineer who ships systems end to end.
        </div>

        {/* Bottom band — locality + url */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "rgba(234,229,220,0.55)",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex" }}>
            {SITE_URL.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex" }}>
            {PERSON.location.city.toUpperCase()} · {PERSON.location.countryCode}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
