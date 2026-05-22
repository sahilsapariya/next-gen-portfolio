"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/tokens";

/* Per-letter rise cascade on entry. Used for display headlines.

   Layout structure:
     <span>                                 ← outer container
       <span class="word">                  ← inline-block + whiteSpace:nowrap
                                              keeps each WORD atomic — the
                                              browser will never split a word
                                              between two of its letters.
         <motion.span>w</motion.span>
         <motion.span>h</motion.span>
         <motion.span>o</motion.span>
       </span>
       {' '}                                ← real space — the only place the
                                              browser is allowed to wrap, so
                                              long words drop to a new line
                                              whole, never mid-character.
       <span class="word">…</span>
     </span>

   Reveal:
     Each letter starts at translateY 110%, opacity 0, animates to
     y:0, opacity:1. Opacity makes the clip-style reveal robust — no
     overflow:hidden needed (which would otherwise clip italic
     descenders y/p/g/j) and the layout can wrap freely when narrow.

   Letter delay cascades globally across the phrase regardless of word
   boundaries, so the reveal feels continuous across spaces. */
export function SplitDisplay({ text, delay = 0, italic = false, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(" ");

  let letterIndex = 0;

  return (
    <span
      ref={ref}
      aria-label={text}
      className={className}
      style={{ fontStyle: italic ? "italic" : "normal" }}
    >
      {words.map((word, wi) => {
        const wordSpan = (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {Array.from(word).map((ch, ci) => {
              const i = letterIndex++;
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={
                    inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }
                  }
                  transition={{
                    duration: 1.0,
                    delay: delay + i * 0.035,
                    ease: EASE,
                  }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        );
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </span>
  );
}
