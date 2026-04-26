import { useReveal } from '../lib/useReveal';

export default function Hook() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg">
      {/* Photo: full bleed on mobile, right two-thirds on desktop */}
      <div className="absolute inset-0 md:left-1/3">
        <picture className="block h-full w-full">
          {/* Mobile sources */}
          <source
            media="(max-width: 767px)"
            srcSet="/photos/hero-mobile.webp"
            type="image/webp"
          />
          {/* Desktop sources */}
          <source srcSet="/photos/hero.webp" type="image/webp" />
          <img
            src="/photos/hero.jpg"
            alt="The hallway opens into a sunlit living room with tall windows and an easel by the far wall."
            className="h-full w-full object-cover"
            decoding="async"
          />
        </picture>

        {/* Mobile-only darkening gradient at the bottom for text legibility */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(22,17,13,0.85) 0%, rgba(22,17,13,0.45) 35%, rgba(22,17,13,0) 70%)',
          }}
          aria-hidden="true"
        />

        {/* Desktop-only soft fade on the left edge so title sits cleanly */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(22,17,13,1) 0%, rgba(22,17,13,0.7) 8%, rgba(22,17,13,0) 25%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Title block */}
      <div
        ref={titleRef}
        className="reveal relative z-10 flex h-full flex-col justify-end gutter pb-16 md:w-1/2 md:justify-center md:pb-0"
      >
        <h1 className="display-xl">
          Room <span className="italic">3</span>.
        </h1>
        <p className="display-m mt-4 max-w-md text-ink md:mt-6">
          Some homes you visit. Some you live in.
        </p>
        <p className="caption mt-8 md:mt-10">
          dlf phase 2 · ₹24,250/mo
        </p>
      </div>
    </section>
  );
}
