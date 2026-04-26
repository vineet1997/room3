import { useReveal } from '../lib/useReveal';

/**
 * Section 5 — The Deal.
 * Receipt-style layout. All mono. Numbers right-aligned. Thin rules.
 * No accordion, no expand/collapse. Information that fits on one screen
 * should not be hidden behind interactions.
 */

export default function Deal() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal section-pad gutter relative bg-bg"
    >
      <div className="mx-auto max-w-2xl">
        <p className="section-number mb-6">— 05 —</p>
        <h2 className="display-l mb-12 md:mb-16">
          The deal.
        </h2>

        <div className="receipt text-ink">
          {/* Top rule */}
          <div className="border-t border-ink-3" />

          {/* Row 1: Room 3 */}
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-6 md:py-7">
            <div>
              <p className="text-ink text-base md:text-lg">Room 3</p>
              <p className="text-ink-2 text-[13px] md:text-sm mt-1.5 leading-relaxed">
                semi-furnished, attached bath,<br />balcony at your door
              </p>
            </div>
            <p className="text-ink text-lg md:text-xl tabular-nums">
              ₹ 24,250 <span className="text-ink-2 text-sm">/ mo</span>
            </p>
          </div>

          {/* Sub-rule */}
          <div className="border-t border-ink-3 opacity-50" />

          {/* Row 2: Deposit */}
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-6 md:py-7">
            <p className="text-ink text-base md:text-lg">
              Refundable deposit
            </p>
            <p className="text-ink text-lg md:text-xl tabular-nums">
              ₹ 47,000
            </p>
          </div>

          {/* Sub-rule */}
          <div className="border-t border-ink-3 opacity-50" />

          {/* Row 3: Conditions */}
          <div className="py-6 md:py-7">
            <p className="text-ink text-base md:text-lg leading-relaxed">
              Eggetarian kitchen.<br />
              No smoking.<br />
              Available now.
            </p>
          </div>

          {/* Sub-rule */}
          <div className="border-t border-ink-3 opacity-50" />

          {/* Row 4: Building amenities */}
          <div className="py-6 md:py-7">
            <p className="text-ink text-base md:text-lg leading-relaxed">
              Parking. Lift. 24/7 security.
            </p>
          </div>

          {/* Bottom rule */}
          <div className="border-t border-ink-3" />

          {/* Footnote */}
          <p className="text-ink-3 text-[12px] md:text-[13px] mt-6 leading-relaxed">
            Cook, househelp, electricity shared.<br />
            No brokerage.
          </p>
        </div>
      </div>
    </section>
  );
}
