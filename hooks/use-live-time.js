"use client";

import { useEffect, useState } from "react";

export function useLiveTime(tz = "Asia/Kolkata") {
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
