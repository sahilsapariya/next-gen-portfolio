import { ACCENT } from "@/lib/tokens";

export function SectionLabel({ index, title, count }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 t-meta">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT }}
        />
        <span style={{ color: ACCENT }}>INDEX / {index}</span>
        <span className="opacity-45">— {title}</span>
      </div>
      {count && <div className="opacity-45 t-caption">{count}</div>}
    </div>
  );
}
