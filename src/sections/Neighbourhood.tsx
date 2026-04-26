import { useReveal } from '../lib/useReveal';

/**
 * Section 4 — The Neighbourhood.
 * Blue-hour skyline photo (trees in foreground, towers in background) +
 * three walking distances as a poem + a closing line.
 * The photo proves the "calm but connected" thesis the words explain.
 * No map. No radial. Hand-drawn SVG arrows.
 */

const LINES: Array<{ time: string; place: string }> = [
  { time: '8 min walk', place: 'CyberHub' },
  { time: '10 min walk', place: 'the metro' },
  { time: '20 min drive', place: 'IGI' },
];

export default function Neighbourhood() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal section-pad gutter relative bg-bg"
    >
      <div className="mx-auto max-w-3xl">
        <p className="section-number mb-6">— 04 —</p>
        <h2 className="display-l mb-12 md:mb-16">
          The neighbourhood.
        </h2>

        {/* Skyline photo — trees in foreground, lit-up towers in the distance.
            The thesis of the section in one image. */}
        <figure className="-mx-6 mb-12 md:mx-0 md:mb-16">
          <picture>
            <source srcSet="/photos/neighbourhood.webp" type="image/webp" />
            <img
              src="/photos/neighbourhood.jpg"
              alt="Blue-hour view from the terrace. Trees fill the foreground, residential rooftops sit in the middle, the lit-up towers of CyberHub and DLF Camellias rise in the distance."
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>

        {/* Three lines as a poem */}
        <ul className="mb-16 space-y-5 md:mb-20 md:space-y-7" role="list">
          {LINES.map((line) => (
            <li
              key={line.place}
              className="flex items-center gap-4 md:gap-6"
            >
              <span className="font-mono text-ink-2 tabular-nums w-32 md:w-44 md:text-lg">
                {line.time}
              </span>
              <HandArrow />
              <span className="font-display italic text-ink text-2xl md:text-3xl">
                {line.place}
              </span>
            </li>
          ))}
        </ul>

        {/* The closing line */}
        <p className="body-l text-ink-2 max-w-xl">
          The block is calm. The bustle of the city is just a walk away.
        </p>
      </div>
    </section>
  );
}

/**
 * A hand-drawn arrow. Slightly imperfect — the line is a tiny bit wavy and
 * the head is hand-feeling, not geometric. ink-3 colour. Not a Unicode arrow.
 */
function HandArrow() {
  return (
    <svg
      viewBox="0 0 56 16"
      className="hand-arrow flex-shrink-0"
      style={{ width: '3rem', height: '1rem' }}
      aria-hidden="true"
    >
      <path
        d="M 2 8 C 12 7.5, 24 8.5, 40 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 36 4 L 42 8 L 36 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
