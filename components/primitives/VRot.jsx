/* Vertical rotated gutter label — sits in the leftmost column on desktop. */
export function VRot({ children }) {
  return (
    <div
      className="hidden md:block t-caption"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {children}
    </div>
  );
}
