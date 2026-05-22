/* Continuous horizontal text band — purely CSS-keyframed. */
export function MarqueeRow({ children, speed = 40, reverse = false }) {
  return (
    <div className="overflow-hidden w-full" aria-hidden>
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `${reverse ? "ssMarqRev" : "ssMarq"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
