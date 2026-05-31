# Systems Section — Vertical Wave for Mobile & Tablet

**Date:** 2026-06-01
**Status:** Approved
**File touched:** `components/sections/Systems.jsx` only

---

## Problem

The "How I Work" flow diagram is a horizontal serpentine SVG with `viewBox="0 0 1240 360"`. At mobile widths (~375px) the SVG scales proportionally to ~109px tall, rendering 13px stage labels at ~4px actual size — completely unreadable. The diagram is the strongest visual in the section; it should be legible at every viewport.

---

## Solution

Render a **portrait-oriented vertical serpentine wave** on mobile and tablet (≤ 1024px). The same Bezier wave concept, the same seven stages, the same Framer Motion draw-in animation — just rotated to fit a phone screen. The desktop horizontal wave is **unchanged**.

---

## Breakpoints

| Viewport | Diagram |
|---|---|
| ≤ 1024px (mobile + tablet) | **Vertical wave** (new) |
| > 1024px (desktop) | Horizontal wave (existing, untouched) |

The existing `useIsMobile` hook uses 820px. A new `useIsCompact` hook (or inline media-query state) will cover ≤ 1024px for this component only.

---

## Vertical SVG Specification

### ViewBox & coordinate system

```
viewBox="0 0 280 580"
```

- Centre axis: x = 90
- Right peak: x ≈ 148
- Left peak: x ≈ 32
- Label clearance right: up to x = 280
- Label clearance left: down to x = 0 (text-anchor="end")

### Stage positions (top → bottom)

| # | Label | x | y | Side | Notes |
|---|---|---|---|---|---|
| 01 | Brief | 90 | 30 | centre | Accent fill + outer ring |
| 02 | Schema | 148 | 112 | right | Label right of dot |
| 03 | Contracts | 32 | 192 | left | Label left of dot |
| 04 | Implementation | 90 | 272 | centre | Label right of dot |
| 05 | Preview | 148 | 352 | right | Label right of dot |
| 06 | Review | 32 | 432 | left | Label left of dot |
| 07 | Ship | 90 | 512 | centre | Accent fill + outer ring |

### Main wave path

```
M 90 30
C 90 65,  148 85,  148 112
C 148 139, 80 162,  32 192
C -16 222, 32 252,  90 272
C 148 292, 148 325, 148 352
C 148 379, 80 405,  32 432
C -16 459, 50 492,  90 512
```

### Iterate loop path (dashed, right side)

```
M 90 512
C 125 548, 172 548, 172 272
C 172 -4,  125 -4,  90  30
```

- `stroke: HAIR` (rgba(234,229,220,0.14))
- `strokeWidth: 0.8`
- `strokeDasharray: "3 5"`
- "ITERATE" label: rotated 90°, x=178, y=272, opacity 0.3

### Node styles

- **Default dot:** r=5, fill=FG
- **Brief / Ship:** r=5 fill=ACCENT + r=11 outer ring fill=none stroke=ACCENT opacity=0.6
- **Label num:** fontSize=9, letterSpacing=0.22em, mono, FG
- **Label name:** fontSize=8.5, letterSpacing=0.18em, mono, FG, opacity=0.7

---

## Animation (identical to desktop)

| Element | Animation | Duration | Delay |
|---|---|---|---|
| Main wave path | `pathLength` 0 → 1 | 2.4s | 0s |
| Iterate loop | `pathLength` 0 → 1, `opacity` 0 → 1 | 1.6s | 1.4s |
| Node circles | `scale` 0 → 1, `opacity` 0 → 1 | 0.5s | 0.4s + i×0.18s |
| "ITERATE" text | `opacity` 0 → 0.3 | 0.6s | 2.8s |

Trigger: `useInView(ref, { once: true, amount: 0.25 })`

---

## Implementation plan (single file)

### `components/sections/Systems.jsx`

1. Add a `useIsCompact` hook (inline or imported) — returns `true` when `window.innerWidth ≤ 1024`:

   ```js
   function useIsCompact() {
     const [compact, setCompact] = useState(false);
     useEffect(() => {
       const mq = window.matchMedia("(max-width: 1024px)");
       const fn = () => setCompact(mq.matches);
       fn();
       mq.addEventListener("change", fn);
       return () => mq.removeEventListener("change", fn);
     }, []);
     return compact;
   }
   ```

2. Extract existing `<svg>` into a named `<HorizontalWave>` internal component.

3. Write a `<VerticalWave>` internal component using the path and stage data above, sharing the same `STAGES` array. The `ref` and `inView` are passed in (or the parent `FlowDiagram` manages them).

4. `FlowDiagram` calls `useIsCompact()` and renders:
   ```jsx
   {compact ? <VerticalWave inView={inView} /> : <HorizontalWave inView={inView} />}
   ```

5. The outer wrapper `<div>` (border + gradient background) stays the same for both.

---

## What does NOT change

- Desktop horizontal wave path, nodes, labels — zero changes
- Stage descriptions list below the diagram — stays on all screen sizes
- Section heading, subheading, intro paragraph
- `STAGES` data array (reused by both wave variants and the description list)
- Any other section (`Hero`, `FieldNotes`, etc.)

---

## Out of scope

- Making the diagram interactive (tap to expand stage)
- Adding descriptions inside the SVG itself
- Changing stage content or copy
