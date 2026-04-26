# Room 3 — Design Direction (v2)

A single-page invitation. Six sections. Mobile-first. Dark mode with warmth.

This is v2. It supersedes v1 and incorporates the photo updates, the floor plan source sketch, all locked copy decisions, the byline, the build path, and the hosting setup.

---

## 1. What's locked since v1

| Decision | v2 |
|---|---|
| Hero photo | **Image 1 (hallway into living room)** — replaces the window-easel from v1. Better for scale + invitation. Title sits in the dark left zone, no scrim needed. |
| Section 2 photo | **Image 3 (sunflowers + window + mullion shadows)** — same room as the hero, in a different mood. The same easel is visible in the distance, doubling as a recurring detail across the two photos. |
| Section 3 photo | The original quinoa + paneer meal photo — kept as planned. |
| Cut from photo set | Image 2 (real-estate-staged), Image 4 (messy), the original window-easel close-up (replaced by image 3 which contains it), the building exterior, the balcony drying rack. |
| Floor plan source | The hand-drawn sketch — Image 2 of the three sketch photos sent — used as the trace source. Handwritten labels preserved in the SVG. |
| Hindi line | Cut entirely. |
| "Tuesday evening without trying" line (Section 4) | Kept. |
| "Midnight jalebi" pull quote (Section 3) | Kept. |
| Personal byline | Tiny mono line in the footer. No link. |
| Hero subhead | *"A bedroom, a balcony at your door, and 700 square feet of afternoon light."* |
| Build path | **Option B** — Claude Code primary, no Lovable. GitHub repo, Vercel auto-deploy, custom subdomain on a domain you own. |

---

## 2. Point of view (unchanged from v1)

**Room 3 is not a flat listing. It's a small magazine about one specific home, made for one specific reader.**

The reader is opening a WhatsApp link on their phone, on a metro, with three seconds of attention. The first frame is the entire pitch. Everything after the first frame is a reward for staying.

The site has the texture of something *authored* — a zine, a printed Sunday supplement, a friend's hand-set note — not a SaaS landing page. It is not "premium dark." It is *warm dark*: paper-of-an-old-book browns, cream text, one terra-cotta button, one cobalt accent. Two typefaces. One Pretext-driven moment. Six sections. No more.

**The thing being sold, emotionally, is the shape of the space** — a 700 sqft living room with windows on every wall, flooded with light, in a leafy block of Gurgaon. The site's visual job is to make that *feeling* happen before the reader reads a single word about rent.

---

## 3. The arc — six sections

| # | Section | What it does | Mood | The trick |
|---|---|---|---|---|
| 1 | **The Hook** | Land. Tell them what this is, where it is, what it costs, in one frame. | Loud. Confident. | Hero photo (hallway-into-living-room), three-line title, one line of metadata. No nav. |
| 2 | **The Room** | Make them feel the shape of the home. | Quiet. Considered. | **Pretext moment:** desktop text flows around the hand-drawn SVG floor plan. Mobile gets an animated annotated plan. The flowers-and-window photo introduces the section. |
| 3 | **The Life** | Personality leaks. Food, people, the daily rhythm. | Warm. Specific. | Magazine spread: cropped meal photo + three caption-style blocks + the "midnight jalebi" pull quote. |
| 4 | **The Neighbourhood** | The location, in three lines. | Restrained. | Three walking distances set as a poem. The "Tuesday evening" line as the wink. *No map. No radial.* |
| 5 | **The Deal** | The boring necessary truth. | Honest. | A printed-receipt layout — mono type, right-aligned numbers, thin rules. |
| 6 | **The Invitation** | One sentence. One button. One quiet byline. | Final. | Terra-cotta WhatsApp button. Tiny mono byline below. |

Total scroll, mobile: roughly 4–5 viewport heights.

---

## 4. The floor plan (Section 2 in detail)

The sketch is the SVG source. Image 2 of the three sketch photos is the cleanest. The trace preserves your handwriting in every label.

### What the floor plan shows

Reading the sketch + your clarifications, the layout is:

```
                                          
  ┌──────────┐ ┌────────────────┐       ┌──────────┐
  │          │ │                │       │  Bath    │
  │  Room 2  │ │  Living room   │       │  room    │
  │          │ │                │       ├──────────┤
  │          │ │                │       │  Closet  │
  ├────┬─────┤ │                │       ├──────────┤
  │Bath│     │ │                │       │          │
  ├────┘     │ │                │       │          │
  ┌──────────┐ │                │       │  Room 3  │
  │          │ │                │       │          │
  │          │ │                │       │          │
  │  Room 1  ├──────┐           │       │          │
  │          │ Bath │           │       │          │
  │          │      │           │       │          │
  └──────────┴──────┘           │       └──────────┘
                                │       ┌──────────┐
                                │       │ Kitchen  │ Balcony
                                │       │          │ (shared,
                                │       │          │  off
                                │       │          │  Room 3
                                │       │          │  AND
                                │       │          │  kitchen)
                                └───────┴──────────┴──────────┘
```

**Confirmed:**
- **Room 1** sits lower-left. Has its own bath, attached along its right edge (toward the living room/center), same size as Room 3's bathroom. *This was missing from the original sketch — to be added in the SVG trace.*
- **Room 2** sits upper-left. Has its own bath, the small box drawn near it.
- **Room 3** sits on the right. Has its own bathroom + closet stacked above it.
- **Living room** is the central spine.
- **Kitchen** sits below Room 3.
- **Balcony** runs along the far right, accessible from both Room 3 and the kitchen. *Not private — but directly accessible from Room 3's door, which is the honest framing.*
- **Doors** at every wall break (gap + thin swing arc in the SVG).
- **Sketch overflow** (the long line at the bottom of the page) — cut.

### The Pretext moment

**The design problem:** how do we make the reader *feel* the 700 sqft of the living room without writing the words "700 square feet" twice?

**The solution:** the description of the home is set as a single flowing paragraph that physically wraps around the SVG floor plan. The plan sits floated to one side of the column. As text wraps around the plan, the reader's eye traces the shape of the home. As scroll progresses, **Room 3 fills with dusk-blue** (the room being offered), and **the balcony fills in a slightly lighter dusk-blue** (signalling: this is connected to your room, and to the kitchen — it's the social geography of the home).

**Why Pretext, specifically:** browsers cannot wrap text around an irregular shape. CSS `shape-outside` handles simple convex shapes only; the moment the floor plan is non-rectangular (and floor plans always are), CSS gives up. Pretext lets us compute, per text line, exactly how wide that line should be based on what the plan occupies at that vertical position — without DOM reflow, so resize stays smooth.

**Implementation outline:**

- Floor plan is inline SVG, traced from the sketch in Image 2, with handwriting preserved
- Room labels in your handwriting (extracted from the sketch as paths)
- Body copy uses `prepareWithSegments`
- For each line, compute available width based on `y` and the plan's silhouette at that `y`
- Render lines as positioned `<span>` elements (DOM, not canvas — preserves accessibility, copy/paste, translation)
- Scroll-driven animation triggers the dusk-blue fill on Room 3 and the lighter dusk-blue on the balcony at 60% section visibility

**Mobile behaviour:** the flow-around does not happen below ~800px viewport width. Instead, the floor plan animates in as a small annotated SVG above the body text. Each room labels itself in sequence (kitchen → living → room 1 → room 2 → **room 3 + balcony**), with Room 3 holding the dusk-blue highlight and the balcony in lighter dusk-blue. The body text reads as a normal column below.

**Fallback:** if Pretext fails to load, desktop falls back to a single body-text column to the left of the floor plan SVG. Reader gets a worse layout but full content. No JS-required content.

---

## 5. Photography — final set

Three photos used. Different jobs.

| Section | Photo | Why |
|---|---|---|
| 1 (Hero) | **Image 1** — hallway looking into the living room | Scale + invitation. Eye walks into the room. Easel visible in the distance. Title sits in the dark left zone. Best tonal range for type overlay. |
| 2 (The Room) | **Image 3** — sunflowers + window + mullion shadows on the floor | Same room, different mood. "Someone bought flowers this week." Mullion shadows are doing real work. Same easel as the hero, photographed from the opposite side — a recurring character. |
| 3 (The Life) | The original meal photo (quinoa stir-fry + paneer) | Crop tight to remove the off-frame counter on the right. Magazine food-column treatment. |

**Cut for v2:** Image 2 (real-estate-staged), Image 4 (messy in the wrong way), the original window-easel close-up (image 3 contains it from a better angle), the building exterior (the hallway hero now does its job better), the balcony drying rack (still cut).

If a future shoot is possible, the highest-value missing shot is a **wide of Room 3 itself** in afternoon light. Not required for launch.

---

## 6. Typography (unchanged from v1)

Two typefaces. One mono *role* (small captions, numbers, the receipt).

| Role | Typeface | Why |
|---|---|---|
| Display | **GT Sectra Free** (free) — fallback Fraunces | Sectra has weight and idiosyncrasy. Avoids the Instrument-Serif-everywhere problem. |
| Body | **Geist** or **Söhne** (paid). Free fallback: **Inter Tight** | Grotesk with warmth. Reads at small sizes. |
| Mono | **JetBrains Mono** or **Geist Mono** | Captions, the rent number, the receipt rows, address lines, the byline. Mono = "fact." Serif = "feeling." |

**Type scale (mobile → desktop):**

- Display XL (hero "Room 3"): clamp(56px, 18vw, 168px). Tight (`leading: 0.95`), italic on the "3"
- Display L (section openers): clamp(40px, 8vw, 72px). Tight
- Body L (lead paragraphs): 19–22px, leading 1.5
- Body (running): 17px mobile, 18px desktop, leading 1.55
- Caption / mono: 13–14px, tracked +1%, all-lowercase

**Italic** does real work — once per section at most. ("*your* afternoon," "*midnight* jalebi," "*your* door.")

**Plus: your handwriting**, extracted from the floor plan sketch and preserved in the SVG room labels. This is the third "voice" on the site, used in exactly one place. It's the single most authored signal on the page.

---

## 7. Colour (unchanged from v1)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#16110D` | Page background |
| `surface` | `#221A14` | Cards, photo frames |
| `surface-2` | `#2C231B` | Hover states |
| `ink` | `#F2E9D8` | Primary text — warm cream |
| `ink-2` | `#A89884` | Secondary text |
| `ink-3` | `#5F574D` | Hairlines, dividers, muted captions |
| `gold` | `#C4956A` | Section numbers, small marks |
| `terra` | `#C45D3E` | The CTA button only |
| `dusk` | `#5C7A8C` | Section 2 floor plan — Room 3 fill |
| `dusk-2` | `#7A95A6` | Section 2 floor plan — balcony fill (lighter than Room 3) |

No sage green. No fourth accent.

**Rule:** any single screen has at most 3 colours including the background. Most have 2.

---

## 8. Section-by-section storyboard

### Section 1 — The Hook

**Mobile:**

```
┌────────────────────────────────┐
│                                │
│   [Image 1: hallway into       │
│    living room, full bleed,    │
│    slight darken from bottom]  │
│                                │
│                                │
│                                │
│   Room 3.                  ◄── display XL, italic on "3"
│   A bedroom, a balcony     ◄── display M, three lines
│   at your door, and 700        │
│   square feet of               │
│   afternoon light.             │
│                                │
│   DLF Phase 2 · ₹24,250/mo ◄── mono, lowercase, ink-2
│                                │
└────────────────────────────────┘
```

**Desktop:**
- Photo on the right two-thirds, full bleed top-to-bottom
- Title block on the left third, vertically centred
- Metadata mono line at bottom-left, almost a footer

**Notes:**
- "Room 3." is the largest type on the entire page.
- Italic "3" — the hand-of-a-designer signal in frame one.
- No nav. No menu. Reading is the navigation.
- Rent in the hero answers the user's two real first questions (*where, how much*) before they ask.

### Section 2 — The Room (the Pretext moment)

**Mobile:**

```
┌────────────────────────────────┐
│   ── 02 ──                     │  ◄── gold mono section number
│                                │
│   The shape of it.             │  ◄── display L, italic on "shape"
│                                │
│   [Image 3: sunflowers,        │
│    window, mullion shadows,    │
│    cropped tight]              │
│                                │
│        [animated SVG           │
│         floor plan,            │
│         your handwriting,      │
│         rooms label one by     │
│         one, Room 3 holds      │
│         in dusk-blue,          │
│         balcony in lighter     │
│         dusk-blue]             │
│                                │
│   This is a three-bedroom      │
│   flat. The living room is     │
│   the heart of it — windows    │
│   on every wall, light from    │
│   morning to dusk. Room 3      │
│   is the third bedroom — its   │
│   own bath, its own door to    │
│   the balcony. The kind of     │
│   room you wake up in.         │
│                                │
└────────────────────────────────┘
```

**Desktop (the Pretext flex):**

```
┌──────────────────────────────────────────────────────────┐
│   ── 02 ──                                               │
│                                                          │
│   The shape of it.                                       │
│                                                          │
│   [Image 3 — full-bleed band, ~40vh, mullion shadows]    │
│                                                          │
│   This is a three-bedroom flat. The      ┌──────────┐    │
│   living room is the heart of it —       │  KITCHEN │    │
│   windows on every wall, light from      ├──┬───────┤    │
│   morning to dusk. Three bedrooms        │  │       │    │
│   off the central space, each with       │R2│       │    │
│   its own bath. Room 3 is the third      │  │ LIVING│    │
│   bedroom — the one being offered.       ├──┘       │    │
│   Its own bath, its own door to the      │          │    │
│   balcony — accessible from the          │  ┌───────┤    │
│   kitchen too, so chai happens out       │R1│ ROOM3 │    │
│   there on weekends. Text continues      │██│ ▓▓▓▓▓ │    │
│   here, wrapping around the plan,        │  │ BAL ░ │    │
│   ending with one quiet line: this       │  │ ░░░░  │    │
│   is a calm home.                        └──┴───────┘    │
└──────────────────────────────────────────────────────────┘
```

The floor plan on the right; body text on the left wraps around its silhouette. Past 60% scroll, Room 3 fills dusk-blue, balcony fills lighter dusk-blue. One thin SVG callout line points to Room 3 with the label `Room 3 →`.

**Notes:**
- The floor plan is your handwriting. Not a font. Yours.
- The dusk-blue on Room 3 + lighter dusk-blue on balcony visually says: *this room, and this connected outdoor space.*
- "Calm" at the end of the paragraph is set in dusk colour — the only word in the body copy that gets a colour treatment.
- The image (sunflowers/window) sits *above* the flow-around, not inside it. Two distinct visual moments.

### Section 3 — The Life

**Mobile:**

```
┌────────────────────────────────┐
│   ── 03 ──                     │
│                                │
│   The life of it.              │
│                                │
│   [meal photo, cropped tight,  │
│    ~aspect 3:4]                │
│                                │
│   The cook makes a quinoa      │
│   stir-fry that has converted  │
│   two committed rice-eaters.   │
│                                │
│   We run on Saturdays. Play    │
│   badminton on Sundays. Don't  │
│   always finish books we       │
│   start, but we start them.    │
│                                │
│   ─────                        │
│                                │
│      We said yes to            │  ◄── display, italic, gold
│      midnight jalebi           │      hand-drawn underline
│      at one in the morning.    │      under "midnight"
│                                │
└────────────────────────────────┘
```

**Desktop:** magazine spread — meal photo on the left third, two caption blocks on the right, pull quote spans full width below at large display size.

**Notes:**
- Pull quote is the second-largest type after hero "Room 3"
- Hand-drawn SVG underline (not `text-decoration`) under "midnight"
- Caption blocks are short, magazine-sidebar style — not landing-page bullets
- Voice from the brief shows up as *evidence* (specific small stories), not claims

### Section 4 — The Neighbourhood

```
┌────────────────────────────────┐
│   ── 04 ──                     │
│                                │
│   The neighbourhood.           │
│                                │
│   8 min walk    →  CyberHub    │  ◄── set as a poem
│   10 min walk   →  the metro   │      mono on times
│   20 min drive  →  IGI         │      serif on names
│                                │
│   The kind of neighbourhood    │  ◄── voice line
│   where you run into someone   │      body italic
│   interesting on a Tuesday     │
│   evening without trying.      │
│                                │
└────────────────────────────────┘
```

**Notes:**
- Entire section. No map. No radial.
- Arrows are hand-drawn SVGs, slightly imperfect, ink-3 colour. Not Unicode arrows.
- "Tuesday evening without trying" carries the wink the brief asked for.

### Section 5 — The Deal

```
┌────────────────────────────────┐
│   ── 05 ──                     │
│                                │
│   The deal.                    │
│                                │
│  ──────────────────────────    │
│                                │
│  Room 3                        │
│  semi-furnished, attached      │
│  bath, balcony at your door    ₹ 24,250 / mo
│                                │
│  ──                            │
│                                │
│  Refundable deposit            │
│                       ₹ 47,000 │
│                                │
│  ──                            │
│                                │
│  Eggetarian kitchen.           │
│  No smoking. Available now.    │
│                                │
│  ──────────────────────────    │
│                                │
│  Cook, househelp, electricity  │  ◄── small mono, ink-3
│  shared. No brokerage.         │
│                                │
└────────────────────────────────┘
```

**Notes:**
- All mono. Numbers right-aligned. Thin rules.
- "Balcony at your door" — the honest framing of the balcony.
- Right-aligned ₹ figures are the second-largest typographic moment after the hero.
- No accordion. No expand/collapse.

### Section 6 — The Invitation

```
┌────────────────────────────────┐
│                                │
│                                │
│   If this sounds like your     │  ◄── display M, italic on "your"
│   kind of home, say hi.        │
│                                │
│                                │
│   [  WhatsApp  →  ]            │  ◄── terra-cotta button
│                                │
│                                │
│                                │
│   ─────                        │
│   Made by [your name].         │  ◄── tiny mono, ink-3, no link
│   Room 3 · DLF Phase 2 · 2026  │
│                                │
└────────────────────────────────┘
```

**Notes:**
- One sentence. One button. The byline is tiny and quiet.
- Button label: "WhatsApp" (icon + page context tell you what it does)
- Press state: subtle scale + slight darken on press
- WhatsApp link: `https://wa.me/917507171504?text=Hey!%20I%20saw%20Room%203%20and%20I'm%20interested.`

---

## 9. Motion principles (unchanged from v1)

| Where | What |
|---|---|
| Hero photo | Subtle parallax on scroll, ~5–10% offset. No Ken Burns. |
| Section transitions | Body text fades + slides up 12px on enter. 600ms ease-out. |
| Section 2 floor plan (desktop) | Text re-flows around the floor plan in real time as viewport resizes |
| Section 2 floor plan (all viewports) | Room 3 fills dusk-blue + balcony fills lighter dusk-blue at 60% scroll. 800ms. Once. |
| Section 3 pull quote | Hand-drawn SVG underline draws itself on enter. 400ms. |
| Section 6 button | Press state, micro-icon animation on hover |

`prefers-reduced-motion` honoured everywhere.

---

## 10. Performance budget (unchanged from v1)

- FCP under 1.2s on 4G
- LCP (hero photo) under 2.0s
- Hero photo ≤ 120KB on mobile, WebP/AVIF via `<picture>`, preloaded with `fetchpriority="high"`
- Fonts subset to Latin. `font-display: swap`. Self-hosted, not Google Fonts CDN
- Pretext dynamic-imported, only on desktop, only when Section 2 is within 1 viewport of being scrolled into view
- Bundle target under 80KB JS on first load
- No analytics on v1

---

## 11. Build path — Option B in detail

This is the part of v2 the previous spec didn't have.

### Stack

- **Vite + React + TypeScript** — minimal scaffolding, fast dev
- **Tailwind CSS** — for utility-first styling, but with a custom `theme.extend` config that bakes in our exact colour tokens, type scale, and font families. The Tailwind defaults are off; we use Tailwind as a styling syntax, not a design system.
- **`@chenglou/pretext`** — dynamic-imported in Section 2 only
- **No Framer Motion in v2** — the few animations we have are simple enough for CSS transitions + the Web Animations API. Framer Motion is ~50KB; we don't need it for parallax + fade-in + button press. Cutting it.
- **No CMS, no analytics, no auth** — this is a static page

### Repository structure

```
room3/
├── README.md                  # for the portfolio reader
├── public/
│   ├── photos/
│   │   ├── hero.avif          # Image 1, hallway, sized for hero
│   │   ├── hero.webp          # WebP fallback
│   │   ├── room.avif          # Image 3, sunflowers
│   │   ├── room.webp
│   │   ├── meal.avif          # quinoa + paneer
│   │   └── meal.webp
│   ├── fonts/
│   │   ├── GT-Sectra-Free.woff2
│   │   ├── Geist.woff2
│   │   └── GeistMono.woff2
│   └── og-image.png           # for WhatsApp link previews
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── sections/
│   │   ├── Hook.tsx           # Section 1
│   │   ├── Room.tsx           # Section 2 (Pretext lives here)
│   │   ├── Life.tsx           # Section 3
│   │   ├── Neighbourhood.tsx  # Section 4
│   │   ├── Deal.tsx           # Section 5
│   │   └── Invitation.tsx     # Section 6
│   ├── components/
│   │   ├── FloorPlan.tsx      # the SVG + animation logic
│   │   ├── PretextFlow.tsx    # text-around-shape, dynamic-imported
│   │   └── PullQuote.tsx
│   ├── styles/
│   │   └── globals.css        # tokens, font-faces, base
│   └── lib/
│       └── pretext-helpers.ts # silhouette computation
├── tailwind.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Build order

A real sequencing of how to build this. Follow it in order — each step ships something working.

1. **Foundation** (~1 hour). Vite + React + TS scaffold. Tailwind config with the exact tokens from this spec. Self-hosted fonts wired up. Empty `App.tsx` that renders six placeholder section components. Push to GitHub. Connect Vercel. Confirm deploy works. *Outcome: a deployed page at `room3.[yourname].com` that shows six empty sections.*

2. **Section 1 — Hook** (~2 hours). Hero photo. Title. Subhead. Metadata line. Mobile-first. *Outcome: hero ships. The site has a face.*

3. **Section 5 — Deal, and Section 6 — Invitation** (~2 hours). The two simplest sections after the hero. Mono receipt. CTA button. Byline. *Outcome: the site can be visited and acted on. A user could, technically, see the hero and click WhatsApp. Functional MVP.*

4. **Section 4 — Neighbourhood** (~1 hour). Three lines. Hand-drawn SVG arrows. Wink line.

5. **Section 3 — Life** (~3 hours). Magazine spread layout. Pull quote with hand-drawn underline (SVG that animates on enter). Meal photo crop.

6. **Section 2 — Room: phase 1, mobile + fallback** (~3 hours). The static version: photo, floor plan SVG (traced from your sketch), body text in a normal column on mobile and a wider column on desktop. Floor plan animation (rooms label one by one, Room 3 + balcony fill). *No Pretext yet — but the section is shippable.*

7. **Section 2 — Room: phase 2, the Pretext flow-around** (~4–6 hours, the hardest piece). Add `@chenglou/pretext`, dynamic-imported. Implement silhouette computation from the floor plan SVG (using `getBBox` + manual region definitions). Text wraps around the plan on desktop ≥ 800px. Resize handler stays smooth. *Outcome: the signature moment of the site lands.*

8. **Performance pass** (~2 hours). Image optimization (avif, webp, sizes), font subsetting, preload hints, dynamic import verification. Run Lighthouse on a throttled 4G profile. Hit the budget.

9. **Reduced-motion + accessibility pass** (~2 hours). Verify every animation has a static state. Tab through the page — focus rings, semantic HTML. Screen reader walkthrough. `<picture>` alt text. WhatsApp button as `<a>` with `rel="noopener"`.

10. **Polish + ship** (~2 hours). README written for the portfolio reader. Final copy pass. OG image for WhatsApp link previews. Vercel domain mapping. Cross-browser check (mobile Safari is the one that breaks Pretext-style work most often).

**Total: roughly 22–28 hours of focused work**, end to end. Spread over a week or two of evenings.

### Vercel + GitHub setup

1. Create a new GitHub repo: `room3` (private is fine; public is better for the portfolio reader, decide based on whether you want the source code visible).
2. Connect Vercel to the repo. Vercel auto-detects Vite. Default settings are correct.
3. Add the subdomain in Vercel → Settings → Domains. Vercel walks you through the DNS records (CNAME usually).
4. Every push to `main` deploys automatically. Every PR gets a preview URL. This is the iteration loop.

### What Claude Code does in this workflow

I (or whoever's running Claude Code) sit at the terminal in the `room3/` repo and use Claude Code to implement each section. The spec above is the brief. Build order is the sequence. Each step ends with a commit that produces a Vercel preview URL we can review on phone and desktop.

This is an order of magnitude better than Lovable for a project where every pixel matters and the previous Lovable attempt failed for reasons that won't go away the second time.

---

## 12. The README that ships with the site

A small but real concern: this is a portfolio piece. People will look at the GitHub repo. The README needs to do a job — not a generic "this is a Vite + React project" but a short note that contextualizes what they're seeing.

Proposed structure:

```markdown
# Room 3

A small website to find a flatmate for a 3BHK in DLF Phase 2, Gurgaon.

It is also a portfolio piece — the design and build are deliberate.

## What it is
- One page, six sections, mobile-first, dark mode
- Built with Vite + React + Tailwind, hand-coded
- Custom hand-drawn floor plan, traced into SVG
- One Pretext-driven moment: text that flows around the floor plan
  on desktop, made possible because @chenglou/pretext computes layout
  without DOM reflow
- No Lovable, no template, no CMS

## What it isn't
- A landing page in the SaaS sense
- A real estate listing in the typical sense

## Notes
The design direction document for this site is in `/docs/design.md`.
The decisions are deliberate; the cuts more so.

— [your name], 2026
```

That README is a portfolio piece in its own right.

---

## 13. Open items

A short list of things still to handle, not blocking the start of the build:

1. **Photo retouching.** The three chosen photos benefit from light retouching — the hero has some sunlight blowing out the right side, the meal photo has the off-frame counter to crop, image 3 has bleed-through that's actually beautiful but the bottle in the foreground left could come out. Recommend doing this as a deliberate pass before exporting the final AVIF/WebP set.

2. **Domain choice.** You said "subdomain on a domain you own" — this gets configured in Vercel once we know which domain. If you have a personal site like `[yourname].com`, `room3.[yourname].com` is the natural choice. If you have multiple, pick the one the portfolio audience is most likely to visit.

3. **Byline name.** "Made by [your name]" — needs your actual name when we get to Section 6.

4. **Future photo: a wide of Room 3 itself.** Not blocking. But if you can shoot it before launch, it's the highest-value missing image.

5. **Personal touches in copy.** The body text in Section 2 is currently placeholder-shaped ("This is a three-bedroom flat. The living room is the heart..."). You may want to write the actual paragraph in your own voice before we lock the Pretext flow, since the silhouette computation depends on the exact line breaks. Easy to revise but worth a draft pass.

---

## 14. What's the same as v1

Everything not listed above is unchanged from v1. Specifically: the typography system, the colour tokens, the cut list (chat bubbles, word cloud, Hindi line, sage green, accordion, balcony drying rack, etc.), the motion principles, and the performance budget.

---

This is v2. Lock it, sketch any photo retouching you want done, and we start at Step 1 of the build order whenever you're ready.
