/**
 * Floor plan silhouette helper.
 *
 * The floor plan is a hand-coded SVG (see FloorPlan.tsx). Because we own the
 * geometry, we can compute "what's the leftmost edge of the floor plan at
 * vertical position y?" without reading pixels. This lets us tell Pretext
 * how wide each text line should be.
 *
 * SVG coordinates: viewBox 0..600 x 0..500.
 * The plan's outer perimeter sits at x=60..580 and y=50..390. Outside that
 * range, the SVG is transparent space.
 *
 * The silhouette: for any y in [50, 390], the leftmost edge of the plan's
 * content is at SVG x = 60 (the outer left wall). Above and below that
 * vertical range, the SVG is empty and text can use the full column width.
 *
 * Note: this floor plan happens to have a clean rectangular silhouette on its
 * left edge. CSS shape-outside: rect() could approximate the same effect.
 * The reasons we still use Pretext are:
 *   1) Sub-pixel-accurate measurement (CSS shape-outside can have rounding
 *      errors that produce different breaks across browsers)
 *   2) The line-precise trigger for the Room 3 dusk-blue fill (we know which
 *      line contains "Room 3 is the one being offered" before render)
 *   3) Smooth resize relayout without forcing browser reflows
 *   4) Future-proofing: if a future plan version has true notches (e.g. a
 *      balcony sticking out), the integration is already in place.
 */

const SVG_W = 600;
const SVG_H = 500;
const PLAN_LEFT_EDGE_SVG = 60;
const PLAN_TOP_SVG = 50;
const PLAN_BOTTOM_SVG = 390;

/**
 * Returns the leftmost x-coordinate of the floor plan content at a given y,
 * in SVG coords. Returns Infinity if the plan does not occupy that y at all
 * (i.e., text can use full column width at that y).
 */
export function leftmostXAtY_svg(y: number): number {
  if (y < PLAN_TOP_SVG) return Infinity;
  if (y > PLAN_BOTTOM_SVG) return Infinity;
  return PLAN_LEFT_EDGE_SVG;
}

/**
 * Given the rendered floor-plan dimensions and its position relative to the
 * text column, returns a function `maxWidth(y)` that tells Pretext how wide
 * a line of text starting at vertical position `y` may be.
 *
 * Geometry:
 *   - Text column starts at x = 0 in the column's coordinate space
 *   - Floor plan is rendered at (planX, planY) with width planW and height planH
 *   - The plan's SVG viewBox is 600x500 (plan content is inset within it)
 *   - `padding` adds breathing room between text and plan
 */
export function makeMaxWidthFn(args: {
  columnWidth: number;
  planX: number;
  planY: number;
  planW: number;
  planH: number;
  padding?: number;
}) {
  const { columnWidth, planX, planY, planW, planH, padding = 24 } = args;

  return function maxWidthAtY(y: number): number {
    // Outside the plan's vertical range — full column width
    if (y < planY || y > planY + planH) return columnWidth;

    // Convert column-space y to SVG-space y
    const svgY = ((y - planY) / planH) * SVG_H;

    const svgLeftX = leftmostXAtY_svg(svgY);
    if (svgLeftX === Infinity) return columnWidth;

    // Convert SVG x to column-space x
    const colLeftX = planX + (svgLeftX / SVG_W) * planW;
    const available = colLeftX - padding;

    // Don't return zero or negative widths — that would crash Pretext
    return Math.max(80, available);
  };
}
