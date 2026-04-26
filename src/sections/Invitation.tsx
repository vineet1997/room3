import { useReveal } from '../lib/useReveal';

/**
 * Section 6 — The Invitation.
 * Full-bleed sunset photo as backdrop. One sentence, one button, the byline.
 * A heavy dark gradient from the bottom ensures the closing line, button, and
 * byline are readable against the dark band of the sunset photo.
 *
 * The terra-cotta button is the only saturated colour on the page outside
 * Section 2's dusk fills.
 */

const WHATSAPP_URL =
  "https://wa.me/917507171504?text=Hey!%20I%20saw%20Room%203%20and%20I'm%20interested.";

export default function Invitation() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Sunset backdrop — full bleed */}
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/photos/sunset-mobile.webp"
            type="image/webp"
          />
          <source srcSet="/photos/sunset.webp" type="image/webp" />
          <img
            src="/photos/sunset.jpg"
            alt="Sunset over the Gurgaon skyline. Pink and orange clouds across the sky, the silhouette of the city below, lights starting to come on."
            className="h-full w-full object-cover"
            decoding="async"
            loading="lazy"
          />
        </picture>

        {/* Bottom-up dark gradient for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(22,17,13,0.95) 0%, rgba(22,17,13,0.85) 30%, rgba(22,17,13,0.5) 55%, rgba(22,17,13,0.15) 75%, rgba(22,17,13,0) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content layer — positioned at the bottom of the section so it sits over
          the dark gradient zone, not the bright sunset band. */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end gutter pb-12 pt-32 md:pb-16 md:pt-48">
        <div className="mx-auto w-full max-w-2xl">
          {/* The invitation sentence + button */}
          <div>
            <p className="display-m text-ink leading-tight">
              If this sounds like <span className="italic">your</span> kind of home, say hi.
            </p>

            <div className="mt-10 md:mt-12">
              <a
                href={WHATSAPP_URL}
                className="btn-cta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp to message about Room 3"
              >
                <span>WhatsApp</span>
                <ArrowGlyph />
              </a>
            </div>
          </div>

          {/* Footer / byline — tiny, mono, ink-3, no link */}
          <footer className="mt-24 md:mt-32 border-t border-ink-3 pt-6">
            <p className="font-mono text-[12px] md:text-[13px] text-ink-3 leading-relaxed tracking-wide">
              Made by Vineet, who lives in Room 1.
            </p>
            <p className="font-mono text-[12px] md:text-[13px] text-ink-3 leading-relaxed tracking-wide mt-1">
              Room 3 · DLF Phase 2 · 2026
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}

/** Arrow glyph for the CTA button — slightly hand-drawn, not a Unicode arrow */
function ArrowGlyph() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="h-3 w-5"
      aria-hidden="true"
    >
      <path
        d="M 1 8 L 21 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 16 3 L 22 8 L 16 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
