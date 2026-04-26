# Room 3

A small website to find a flatmate for a 3BHK in DLF Phase 2, Gurgaon.

It is also a portfolio piece — the design and build are deliberate.

## What it is

- One page, six sections, mobile-first, dark mode
- Built with Vite + React + Tailwind, hand-coded
- Custom hand-drawn floor plan, traced into SVG, with a 3.5-second
  draw-on animation that plays when Section 2 enters view
- Real photos, considered crops, restrained palette
- No Lovable, no template, no CMS

## What it isn't

- A landing page in the SaaS sense
- A real-estate listing in the typical sense

## Local development

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The build outputs to `dist/`.

Bundle budget is met — first-load gzipped JS ~52 kB (React + app), CSS ~3.7 kB.

## Deploy

This site is hosted on Vercel at [room3.vineet.cc](https://room3.vineet.cc),
auto-deployed from the `main` branch of GitHub.

## Notes

The full design direction document lives at `docs/design.md`.
The decisions are deliberate; the cuts more so.

Photo handling, fonts, and Section 2's draw-on animation are documented
separately in `docs/`.

— Vineet, 2026
