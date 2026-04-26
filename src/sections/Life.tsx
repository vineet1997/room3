import { useReveal } from '../lib/useReveal';

/**
 * Section 3 — The Life.
 * Magazine spread: cropped meal photo + three short caption-blocks + a
 * pull quote with a hand-drawn underline under "gooo".
 *
 * Copy describes the home, not the people who live in it. A reader who runs
 * every day and a reader who never runs should both feel addressed.
 */

export default function Life() {
  const sectionRef = useReveal<HTMLElement>();
  const quoteRef = useReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="reveal section-pad gutter relative bg-bg"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-number mb-6">— 03 —</p>
        <h2 className="display-l mb-12 md:mb-16">
          The <span className="italic">life</span> of it.
        </h2>

        {/* Magazine spread: photo on left, captions on right (desktop). Stacked on mobile. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <figure className="md:col-span-5">
            <picture>
              <source srcSet="/photos/meal.webp" type="image/webp" />
              <img
                src="/photos/meal.jpg"
                alt="A black pan of quinoa stir-fry with carrots, peppers, and beans, alongside a bowl of paneer in a tomato curry."
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="caption mt-3 italic">
              tuesday lunch.
            </figcaption>
          </figure>

          <div className="md:col-span-7 md:pt-4">
            <div className="space-y-8 md:space-y-10">
              <p className="body-l text-ink">
                Our cook makes a quinoa stir-fry that has converted two committed rice-eaters.
              </p>
              <p className="body-l text-ink">
                Most days, somebody is just back from a run, or about to leave for one.
              </p>
              <p className="body-l text-ink-2">
                The fridge has both a meal plan and someone&apos;s late-night ice cream.
              </p>
            </div>
          </div>
        </div>

        {/* Pull quote — large display, italic, hand-drawn underline under "gooo" */}
        <div
          ref={quoteRef}
          className="reveal mt-20 border-t border-ink-3 pt-16 md:mt-32 md:pt-24"
        >
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="display-m italic md:text-display-l">
              Someone said let&apos;s go for a hike. We all said let&apos;s{' '}
              <span className="relative inline-block">
                gooo
                <UnderlineSquiggle />
              </span>
              . It was 5am.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/**
 * A hand-drawn squiggle underline. Drawn as SVG (not text-decoration)
 * so it has personality — slightly wavy, gold colour. Animates in via
 * stroke-dasharray when the parent .reveal becomes in-view.
 */
function UnderlineSquiggle() {
  return (
    <svg
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-2 w-full"
      aria-hidden="true"
    >
      <path
        d="M 4 8 Q 30 2, 60 7 T 120 6 T 180 8 L 196 7"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 220,
          strokeDashoffset: 220,
          animation: 'squiggle-draw 700ms 200ms cubic-bezier(0.2, 0.6, 0.2, 1) forwards',
        }}
      />
      <style>{`
        @keyframes squiggle-draw {
          to { stroke-dashoffset: 0; }
        }
        .reveal:not(.in-view) svg path { stroke-dashoffset: 220; animation: none; }
        @media (prefers-reduced-motion: reduce) {
          svg path {
            stroke-dasharray: none !important;
            stroke-dashoffset: 0 !important;
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}
