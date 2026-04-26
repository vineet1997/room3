# Section 2 — implementation notes

The signature moment of Section 2 is the floor plan's **hand-drawn draw-on
animation**. When the section enters view, the plan composes itself line by
line over ~3.5 seconds:

1. Outer perimeter draws first (~0.7s)
2. Interior walls draw next, left rooms before right (~1.1s)
3. Door arcs fade in (~0.5s)
4. Caveat-font room labels write in with a small upward translate (~0.6s)
5. Room 3 + balcony fill dusk-blue, "← this one" callout appears (~0.7s)

The effect is implemented entirely in `FloorPlan.tsx` using SVG
`stroke-dasharray` + `stroke-dashoffset` CSS animations, with a single
`.is-drawing` class that triggers the whole sequence. No animation library,
no scroll math — one IntersectionObserver in `Room.tsx` flips `active=true`
when 40% of the plan is in view, and CSS does the rest.

`prefers-reduced-motion` is honoured: the animations are skipped and the
final state shows immediately.

## What was here before

An earlier version of this section used [@chenglou/pretext](https://github.com/chenglou/pretext)
to flow body text around the floor plan's silhouette on desktop ≥ 800px.
The library worked correctly — text wrapped around the plan, line breaks
were sub-pixel accurate, the line-precise dusk-blue trigger landed exactly
when the reader's eye reached "Room 3 is the one being offered."

It was removed because the *visual signature* did not match the engineering
effort. The plan's left edge is a clean vertical line — no notches — so the
text-around-shape effect produced rectangular wrapping that looked
identical to a regular two-column layout. Pretext was doing real work
nobody could see.

The removal was a deliberate scope cut: keep the design distinctive, drop
the layer that wasn't earning its place. The hand-drawn draw-on animation
landed harder for less code.

If a future version of the floor plan grows real notches in the silhouette
(a balcony jutting out, stairs above), Pretext is worth revisiting. For
now: simpler is better.
