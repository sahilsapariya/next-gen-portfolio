import { HAIR, HAIR_SOFT, HAIR_STRONG } from "@/lib/tokens";

export function Hairline({ strong = false, soft = false, className = "" }) {
  return (
    <div
      aria-hidden
      className={"w-full " + className}
      style={{
        height: 1,
        background: soft ? HAIR_SOFT : strong ? HAIR_STRONG : HAIR,
      }}
    />
  );
}
