"use client";

import { useEffect, useState } from "react";

/* Returns true when the viewport is ≤ 1024 px (mobile + tablet).
   Starts false (desktop) so SSR and the first paint are consistent
   with the desktop breakpoint; the effect corrects it instantly. */
export function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const fn = () => setCompact(mq.matches);
    fn();
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return compact;
}
