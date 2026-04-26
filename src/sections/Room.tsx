import { useEffect, useRef, useState } from 'react';
import FloorPlan from '../components/FloorPlan';
import { useReveal } from '../lib/useReveal';

/**
 * Section 2 — The Room.
 *
 * Single layout, mobile and desktop both: heading, photo band, floor plan,
 * body text. Plan is centered; on wider viewports it just gets a larger
 * max-width. The signature moment of this section is the floor plan's
 * hand-drawn draw-on animation — it composes itself line by line as if
 * being sketched live.
 */

const BODY_TEXT = `A flat with windows on every wall and trees on every side. The kind of home that pulls light in from sunrise to sunset, from every direction. Three bedrooms, each with its own bath. Room 3 is the one being offered: its own bath, its own door to the balcony that the kitchen also opens onto. Upstairs, a terrace that holds the sky, and sunsets we keep meaning to take for granted, and don't. There is more light here than furniture. The home is `;

export default function Room() {
  const sectionRef = useReveal<HTMLElement>();
  const [planActive, setPlanActive] = useState(false);
  const planTriggerRef = useRef<HTMLDivElement>(null);

  // Trigger the floor plan animation when 40% of the plan is in view.
  useEffect(() => {
    const el = planTriggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlanActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="reveal section-pad gutter relative bg-bg"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-number mb-6">— 02 —</p>
        <h2 className="display-l mb-12 md:mb-16">
          The <span className="italic">shape</span> of it.
        </h2>

        {/* Photo band — sunflowers + window + mullion shadows */}
        <figure className="-mx-6 mb-12 md:mx-0 md:mb-16">
          <picture>
            <source srcSet="/photos/room.webp" type="image/webp" />
            <img
              src="/photos/room.jpg"
              alt="A vase of sunflowers on a dark coffee table, the easel in the background, mullion shadows of the window cast across the polished tile floor."
              className="aspect-[4/3] w-full object-cover md:aspect-[16/9]"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>

        {/* Floor plan — animates itself drawing in when section enters view */}
        <div ref={planTriggerRef} className="mb-12 md:mb-16">
          <FloorPlan
            active={planActive}
            className="mx-auto block w-full max-w-xl md:max-w-2xl"
          />
        </div>

        {/* Body text */}
        <div className="mx-auto max-w-2xl">
          <p className="body-l text-ink">
            {BODY_TEXT}
            <span style={{ color: 'var(--dusk-2)' }}>open</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
