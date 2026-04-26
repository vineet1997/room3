# Fonts

The design spec calls for **GT Sectra Free** (display), **Geist** (body), and
**Geist Mono** (mono). Self-hosting these is the production target.

Currently the site uses Google Fonts as a placeholder:

| Spec target | Currently using | Why |
|---|---|---|
| GT Sectra Free | **Fraunces** | Free fallback named in the spec. Same emotional register — characterful serif, real italic, weighty display. |
| Geist | **Inter Tight** | Free fallback named in the spec. Similar grotesk warmth. |
| Geist Mono | **JetBrains Mono** | Solid monospace, free, widely supported. |
| Caveat (floor plan) | **Caveat** | Used as planned for the floor plan labels. Will be upgraded to a true trace of Vineet's handwriting in a future round. |

## Upgrading to the real fonts

When you're ready to swap to GT Sectra Free + Geist:

1. Download the font files (`.woff2`):
   - **GT Sectra Free**: [grillitype.com/typeface/gt-sectra/free](https://www.grillitype.com/typeface/gt-sectra)
     (it has a "free" tier — read the licence carefully)
   - **Geist**: [vercel.com/font/geist](https://vercel.com/font/geist)
     (Geist is open-source via Vercel)
   - **Geist Mono**: same source as Geist
2. Drop the `.woff2` files into `public/fonts/`
3. Add `@font-face` declarations to `src/styles/globals.css` at the top:

```css
@font-face {
  font-family: 'GT Sectra Display';
  src: url('/fonts/GT-Sectra-Display.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('/fonts/Geist-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('/fonts/GeistMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

4. Remove the Google Fonts `<link>` from `index.html`, or trim it to just
   Caveat (the floor plan still needs it until we trace the real handwriting).
5. The Tailwind config already has `fontFamily.display`, `fontFamily.body`,
   and `fontFamily.mono` set up to prefer these names — no changes needed there.

## Why not just self-host now?

The skill of this project is the design and the build. Shipping with
licensed fonts I can't redistribute would mean an empty `public/fonts/`
directory in the GitHub repo, which is misleading. Google Fonts as a
visible placeholder, with this doc explaining the swap, is more honest.
