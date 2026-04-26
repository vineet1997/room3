import { useEffect, useState } from 'react';

/**
 * Hand-drawn floor plan, traced from Vineet's sketch.
 *
 * When `active` becomes true, the plan composes itself in a single cinematic
 * sequence — walls drawing line by line, doors and labels writing in, and
 * Room 3 + balcony filling dusk-blue at the end. The whole sequence takes
 * about 3.5 seconds.
 *
 * The "draw-on" effect uses SVG stroke-dasharray + stroke-dashoffset CSS
 * animations. Each wall path has its `pathLength` attribute set to a
 * normalized 100, so we can use the same animation values for all paths
 * regardless of actual length. Speed and ordering are controlled by per-path
 * animation duration and delay.
 *
 * Layout (from the hand-drawn sketch):
 *   Top-left:    Room 2 with attached small bath
 *   Bottom-left: Room 1 with attached bath on right edge
 *   Center:      Living room
 *   Top-right:   Bathroom + Closet stacked above Room 3
 *   Right-mid:   Room 3 (the room being offered) — fills dusk
 *   Bottom-right: Kitchen
 *   Far right:   Balcony — accessible from Room 3 and kitchen
 */

interface FloorPlanProps {
  /** When true, plays the full draw-on sequence */
  active?: boolean;
  className?: string;
}

// Sequence timings, all in milliseconds.
// The sequence has four phases:
//   0–800ms:    outer walls draw
//   800–1800ms: interior walls draw, starting from left rooms
//   1800–2400ms: doors fade in
//   2400–2800ms: labels write in
//   2800–3500ms: Room 3 + balcony fill dusk-blue, callout appears
const T = {
  outerStart: 0,
  outerDuration: 700,
  innerStart: 700,
  innerDuration: 1100,
  doorStart: 1700,
  doorDuration: 500,
  labelStart: 2100,
  labelDuration: 600,
  fillStart: 2700,
  fillDuration: 800,
  totalDuration: 3500,
};

// Reduced motion: skip the animation entirely, show the full plan.
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function FloorPlan({ active = false, className = '' }: FloorPlanProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    setRevealed(true);
  }, [active]);

  // The `revealed` state class controls all the animations via CSS.
  const sequenceClass = revealed ? 'is-drawing' : '';

  return (
    <svg
      viewBox="0 0 600 500"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${sequenceClass}`}
      aria-label="Floor plan of the 3BHK flat. Three bedrooms, each with its own bath, around a central living room. Room 3 sits to the right with a balcony accessible from both Room 3 and the kitchen."
      role="img"
    >
      <defs>
        <style>{`
          /* Stroke styles */
          .wall {
            fill: none;
            stroke: var(--ink-3);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .wall-thick {
            fill: none;
            stroke: var(--ink-2);
            stroke-width: 2.25;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .door-arc {
            fill: none;
            stroke: var(--ink-3);
            stroke-width: 1;
            stroke-dasharray: 2 2;
            opacity: 0.6;
          }

          /* Room fills */
          .room-fill-r3 {
            fill: var(--dusk);
            fill-opacity: 0;
            transition: fill-opacity ${T.fillDuration}ms cubic-bezier(0.2, 0.6, 0.2, 1);
          }
          .room-fill-balcony {
            fill: var(--dusk-2);
            fill-opacity: 0;
            transition: fill-opacity ${T.fillDuration}ms cubic-bezier(0.2, 0.6, 0.2, 1);
          }
          .is-drawing .room-fill-r3 {
            fill-opacity: 0.85;
            transition-delay: ${T.fillStart}ms;
          }
          .is-drawing .room-fill-balcony {
            fill-opacity: 0.65;
            transition-delay: ${T.fillStart + 100}ms;
          }

          /* Labels */
          .label, .label-small {
            font-family: 'Caveat', cursive;
            fill: var(--ink-2);
            opacity: 0;
            transform: translateY(4px);
            transition: opacity 400ms ease, transform 400ms ease;
          }
          .label { font-size: 22px; }
          .label-small { font-size: 14px; fill: var(--ink-3); }
          .is-drawing .label,
          .is-drawing .label-small {
            opacity: 1;
            transform: translateY(0);
          }
          .label-highlighted {
            fill: var(--ink);
          }

          /* Per-label stagger */
          .is-drawing .label-room2  { transition-delay: ${T.labelStart}ms; }
          .is-drawing .label-room1  { transition-delay: ${T.labelStart + 80}ms; }
          .is-drawing .label-living { transition-delay: ${T.labelStart + 160}ms; }
          .is-drawing .label-kitchen { transition-delay: ${T.labelStart + 240}ms; }
          .is-drawing .label-bath-r2 { transition-delay: ${T.labelStart + 100}ms; }
          .is-drawing .label-bath-r1 { transition-delay: ${T.labelStart + 200}ms; }
          .is-drawing .label-bath-r3 { transition-delay: ${T.labelStart + 280}ms; }
          .is-drawing .label-closet { transition-delay: ${T.labelStart + 320}ms; }
          .is-drawing .label-balcony { transition-delay: ${T.labelStart + 360}ms; }
          .is-drawing .label-room3   { transition-delay: ${T.fillStart + 200}ms; }

          /* Walls draw via stroke-dashoffset.
             pathLength="100" normalizes lengths so animation values match
             across all paths regardless of true geometric length. */
          .draw-path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          .is-drawing .draw-path {
            animation: draw-line var(--draw-dur, 600ms) var(--draw-delay, 0ms) cubic-bezier(0.4, 0, 0.6, 1) forwards;
          }
          @keyframes draw-line {
            to { stroke-dashoffset: 0; }
          }

          /* Doors fade in */
          .door-arc {
            opacity: 0;
            transition: opacity 400ms ease;
          }
          .is-drawing .door-arc {
            opacity: 0.6;
            transition-delay: var(--door-delay, ${T.doorStart}ms);
          }

          /* Callout: dusk-blue dotted line + "this one" text */
          .callout-line, .callout-text {
            opacity: 0;
            transition: opacity 600ms ease;
          }
          .is-drawing .callout-line,
          .is-drawing .callout-text {
            opacity: 0.85;
            transition-delay: ${T.fillStart + 400}ms;
          }
          .callout-line {
            fill: none;
            stroke: var(--dusk);
            stroke-width: 1;
            stroke-linecap: round;
          }

          /* Reduced motion: skip animation, show final state immediately */
          @media (prefers-reduced-motion: reduce) {
            .draw-path,
            .room-fill-r3,
            .room-fill-balcony,
            .label, .label-small,
            .door-arc,
            .callout-line, .callout-text {
              animation: none !important;
              transition: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
            .room-fill-r3 { fill-opacity: 0.85 !important; }
            .room-fill-balcony { fill-opacity: 0.65 !important; }
            .door-arc { opacity: 0.6 !important; }
            .callout-line, .callout-text { opacity: 0.85 !important; }
          }
        `}</style>
      </defs>

      {/* ROOM FILLS — drawn first so walls sit on top */}
      <rect className="room-fill-r3" x="380" y="170" width="140" height="130" />
      <rect className="room-fill-balcony" x="525" y="170" width="55" height="220" />

      {/*
        WALLS, in drawing order:
          Phase 1 (outerStart):  outer perimeter — 4 paths drawn together
          Phase 2 (innerStart):  interior walls of left rooms, then right
                                 rooms, then bath/closet stack
        Each path gets its own duration via --draw-dur and delay via
        --draw-delay, so "speed" is constant per unit length.
      */}

      {/* PHASE 1: OUTER PERIMETER (drawn first, all together) */}
      <path
        className="wall-thick draw-path"
        pathLength={100}
        d="M 60 50 L 580 50"
        style={{
          ['--draw-dur' as string]: `${T.outerDuration}ms`,
          ['--draw-delay' as string]: `${T.outerStart}ms`,
        }}
      />
      <path
        className="wall-thick draw-path"
        pathLength={100}
        d="M 580 50 L 580 390"
        style={{
          ['--draw-dur' as string]: `${T.outerDuration}ms`,
          ['--draw-delay' as string]: `${T.outerStart + 100}ms`,
        }}
      />
      <path
        className="wall-thick draw-path"
        pathLength={100}
        d="M 580 390 L 60 390"
        style={{
          ['--draw-dur' as string]: `${T.outerDuration}ms`,
          ['--draw-delay' as string]: `${T.outerStart + 200}ms`,
        }}
      />
      <path
        className="wall-thick draw-path"
        pathLength={100}
        d="M 60 390 L 60 50"
        style={{
          ['--draw-dur' as string]: `${T.outerDuration}ms`,
          ['--draw-delay' as string]: `${T.outerStart + 300}ms`,
        }}
      />

      {/* PHASE 2: INTERIOR — left rooms first */}
      {/* Room 2 / Room 1 vertical separator wall */}
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 200 50 L 200 145"
        style={{
          ['--draw-dur' as string]: '300ms',
          ['--draw-delay' as string]: `${T.innerStart}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 200 165 L 200 200"
        style={{
          ['--draw-dur' as string]: '180ms',
          ['--draw-delay' as string]: `${T.innerStart + 200}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 200 220 L 200 390"
        style={{
          ['--draw-dur' as string]: '380ms',
          ['--draw-delay' as string]: `${T.innerStart + 300}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 60 195 L 200 195"
        style={{
          ['--draw-dur' as string]: '320ms',
          ['--draw-delay' as string]: `${T.innerStart + 100}ms`,
        }}
      />

      {/* Room 2's bath */}
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 60 145 L 200 145"
        style={{
          ['--draw-dur' as string]: '300ms',
          ['--draw-delay' as string]: `${T.innerStart + 200}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 110 145 L 110 195"
        style={{
          ['--draw-dur' as string]: '180ms',
          ['--draw-delay' as string]: `${T.innerStart + 350}ms`,
        }}
      />

      {/* Room 1's bath */}
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 200 250 L 280 250"
        style={{
          ['--draw-dur' as string]: '220ms',
          ['--draw-delay' as string]: `${T.innerStart + 450}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 280 250 L 280 320"
        style={{
          ['--draw-dur' as string]: '200ms',
          ['--draw-delay' as string]: `${T.innerStart + 550}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 200 320 L 280 320"
        style={{
          ['--draw-dur' as string]: '220ms',
          ['--draw-delay' as string]: `${T.innerStart + 600}ms`,
        }}
      />

      {/* Right side: bath/closet stack and Room 3 walls */}
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 380 50 L 380 170"
        style={{
          ['--draw-dur' as string]: '320ms',
          ['--draw-delay' as string]: `${T.innerStart + 400}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 380 110 L 525 110"
        style={{
          ['--draw-dur' as string]: '300ms',
          ['--draw-delay' as string]: `${T.innerStart + 550}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 525 50 L 525 170"
        style={{
          ['--draw-dur' as string]: '320ms',
          ['--draw-delay' as string]: `${T.innerStart + 500}ms`,
        }}
      />

      {/* Room 3 boundary walls */}
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 380 170 L 380 300"
        style={{
          ['--draw-dur' as string]: '300ms',
          ['--draw-delay' as string]: `${T.innerStart + 650}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 380 320 L 380 390"
        style={{
          ['--draw-dur' as string]: '200ms',
          ['--draw-delay' as string]: `${T.innerStart + 750}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 380 300 L 525 300"
        style={{
          ['--draw-dur' as string]: '300ms',
          ['--draw-delay' as string]: `${T.innerStart + 700}ms`,
        }}
      />

      {/* Wall separating Kitchen from Balcony */}
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 525 320 L 525 390"
        style={{
          ['--draw-dur' as string]: '200ms',
          ['--draw-delay' as string]: `${T.innerStart + 850}ms`,
        }}
      />
      <path
        className="wall draw-path"
        pathLength={100}
        d="M 525 170 L 525 300"
        style={{
          ['--draw-dur' as string]: '300ms',
          ['--draw-delay' as string]: `${T.innerStart + 800}ms`,
        }}
      />

      {/* DOORS — small arcs at wall gaps */}
      <path className="door-arc" d="M 200 145 A 20 20 0 0 1 220 165" style={{ ['--door-delay' as string]: `${T.doorStart}ms` }} />
      <path className="door-arc" d="M 110 165 A 18 18 0 0 1 128 145" style={{ ['--door-delay' as string]: `${T.doorStart + 50}ms` }} />
      <path className="door-arc" d="M 200 200 A 20 20 0 0 1 220 220" style={{ ['--door-delay' as string]: `${T.doorStart + 100}ms` }} />
      <path className="door-arc" d="M 200 270 A 18 18 0 0 0 220 250" style={{ ['--door-delay' as string]: `${T.doorStart + 150}ms` }} />
      <path className="door-arc" d="M 380 130 A 16 16 0 0 0 396 110" style={{ ['--door-delay' as string]: `${T.doorStart + 200}ms` }} />
      <path className="door-arc" d="M 380 220 A 20 20 0 0 1 400 240" style={{ ['--door-delay' as string]: `${T.doorStart + 250}ms` }} />
      <path className="door-arc" d="M 525 220 A 16 16 0 0 1 541 236" style={{ ['--door-delay' as string]: `${T.doorStart + 300}ms` }} />
      <path className="door-arc" d="M 525 340 A 16 16 0 0 1 541 356" style={{ ['--door-delay' as string]: `${T.doorStart + 350}ms` }} />
      <path className="door-arc" d="M 60 320 A 22 22 0 0 0 82 342" style={{ ['--door-delay' as string]: `${T.doorStart + 400}ms` }} />

      {/* LABELS — in writing order, left to right and top to bottom */}
      <text className="label label-room2" x="105" y="120">Room 2</text>
      <text className="label label-room1" x="105" y="320">Room 1</text>
      <text className="label label-living" x="280" y="225">Living</text>
      <text className="label label-living" x="290" y="248">room</text>
      <text className="label label-room3 label-highlighted" x="420" y="240">Room 3</text>
      <text className="label-small label-bath-r3" x="395" y="85">Bath</text>
      <text className="label-small label-bath-r3" x="395" y="105">room</text>
      <text className="label-small label-closet" x="395" y="145">Closet</text>
      <text className="label-small label-bath-r2" x="68" y="180">Bath</text>
      <text className="label-small label-bath-r1" x="215" y="285">Bath</text>
      <text className="label label-kitchen" x="420" y="355">Kitchen</text>
      <text className="label-small label-balcony" x="535" y="285">Bal</text>
      <text className="label-small label-balcony" x="535" y="302">cony</text>

      {/* CALLOUT — appears last, after Room 3 fills dusk */}
      <path className="callout-line" d="M 360 165 L 415 195" />
      <text
        className="callout-text"
        x="305"
        y="160"
        fontFamily="Caveat, cursive"
        fontSize="14"
        fill="var(--dusk)"
      >← this one</text>
    </svg>
  );
}
