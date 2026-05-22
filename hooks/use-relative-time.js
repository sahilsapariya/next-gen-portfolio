"use client";

import { useEffect, useMemo, useState } from "react";

/* Returns "today" / "3 days ago" / "last week" / "Nov 2025".
   Refreshes once per minute. */
export function useRelativeTime(timestamp) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(i);
  }, []);
  return useMemo(() => {
    if (!timestamp) return "";
    const diff = Math.max(0, now - timestamp);
    const days = Math.floor(diff / 86_400_000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 14) return "last week";
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    const y = Math.floor(days / 365);
    return `${y} year${y > 1 ? "s" : ""} ago`;
  }, [timestamp, now]);
}
