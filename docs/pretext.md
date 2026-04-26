# Pretext — current state

## What's wired up

`@chenglou/pretext` is fully integrated in Section 2 (`src/sections/Room.tsx`).

**Mobile (< 800px viewport):** Stacked layout. Photo band → floor plan SVG → body
text in a normal column. Floor plan animates labels in and fills Room 3 +
balcony dusk-blue when the section enters view. Pretext is not loaded on
mobile — it stays out of the bundle entirely.

**Desktop (≥ 800px):** Photo band on top. Below it, the body text and the
floor plan sit side-by-side: text on the left, plan floated to the right.
Pretext measures every text line so the column narrows where the plan
occupies vertical space. Resize triggers a debounced (250ms) relayout.

The Room 3 + balcony dusk-blue fill triggers exactly when the
"Room 3 is the one being offered" line enters the viewport — a line-precise
trigger, not a section-based one.

## Architecture

Three files do the work:

1. **`src/lib/floorPlanSilhouette.ts`** — pure functions that compute, for
   any vertical position `y` in the column, the available text width given
   the floor plan's geometry. The plan is hand-coded SVG so we know its
   exact shape without reading pixels.

2. **`src/components/PretextFlow.tsx`** — the React component that consumes
   the silhouette function and Pretext's APIs (`prepareWithSegments`,
   `layoutNextLineRange`, `materializeLineRange`) to lay out the body
   paragraph as positioned `<span>` elements. Includes the trigger-line
   IntersectionObserver and the dusk-blue word render slot.

3. **`src/sections/Room.tsx`** — the section component. Detects desktop
   viewport, dynamic-imports `PretextFlow`, hands it a `planLayout` and a
   font config, and renders the static fallback during Suspense.

## What Pretext is doing here, honestly

The current floor plan has a clean rectangular silhouette on its left edge
— no notches. CSS `shape-outside: rect()` could approximate the same visual
result.

The reasons we still use Pretext:

1. **Line-precise trigger.** Pretext lets us know which line contains the
   string "Room 3 is the one being offered" before render, so we can fire
   the dusk-blue fill exactly as the reader's eye reaches that line. This
   is the move that takes the section from "good" to "memorable."
2. **Sub-pixel-accurate measurement.** CSS shape-outside has rounding
   inconsistencies across browsers; Pretext measures via canvas and is
   exact.
3. **Smooth resize relayout.** Pretext's measurement is fast enough that
   on resize we recompute layout without forcing a browser reflow.
4. **Future-proofing.** If a future floor plan version sticks the balcony
   out further to the right, or the kitchen juts out at the bottom — i.e.,
   becomes genuinely irregular — the integration is already in place.

## Opportunity for a follow-up

The most direct way to make the flow-around *visually* dramatic is to
modify the floor plan SVG so the silhouette has real notches. Two simple
moves:

- **Stick the balcony out further** — currently the balcony is at SVG
  x=525..580; widening it to extend further right (e.g., to x=600 or
  beyond) would make the silhouette notched at the y-range where the
  balcony lives.
- **Add stairs above the plan** — a small block at the top, narrower than
  the plan, would create a notch at the top.

Either edit is a 5-line change to `FloorPlan.tsx` plus the corresponding
update to `floorPlanSilhouette.ts` so the silhouette function reflects the
new shape.

## Bundle impact

Pretext is dynamic-imported. The mobile bundle is unaffected: ~7 KB gzipped
JS for the entire app, no Pretext code shipped. On desktop, Pretext loads
as a separate ~15 KB gzipped chunk only when Section 2 is rendered.

## Font matching

Pretext measures with a CSS font shorthand string. The desktop body uses
`20px "Inter Tight", system-ui, sans-serif` with a 31px line-height. These
must match the rendered CSS exactly — if the rendered font and the
measured font differ, line breaks land at the wrong words.

The component waits for `document.fonts.ready` before measuring, so the
web font is fully loaded by the time Pretext runs. Without this, Pretext
would measure with the system fallback font and produce wrong line breaks.
