# Eagle Creek Golf Club — Stay & Play

A static landing page for the "Eagle Creek Golf Club, Stay and Play" listing,
built with **raw HTML and CSS only** (no frameworks, no JavaScript) to match the
provided desktop, tablet, and mobile designs.

## Overview of structure and approach

- **Semantic HTML5.** The page uses `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<aside>`, `<figure>`, `<blockquote>`, and `<footer>` where
  appropriate, with a single `<h1>` and a logical heading hierarchy beneath it.
- **External stylesheet only.** All styling lives in `styles.css`; there are no
  inline styles. Small UI icons are inline `<svg>` markup (not CSS), kept
  `aria-hidden` where decorative.
- **Layout with Flexbox and Grid.** No floats are used anywhere. CSS Grid drives
  the page/section layouts (hero, card grids, footer) and Flexbox handles
  component-level alignment (nav, buttons, card actions).
- **BEM-style naming.** Classes follow `block`, `block__element`, and
  `block--modifier` conventions (e.g. `.stay-card`, `.stay-card__body`,
  `.btn--primary`).
- **Organized CSS.** `styles.css` opens with a table of contents and is split
  into commented sections (tokens, reset, components, responsive).
- **Design tokens.** Colors, spacing, radius, and shadows are defined once as CSS
  custom properties in `:root` for consistency.

### File structure

```
eagle-creek/
├── index.html
├── styles.css
├── README.md
└── assets/
    ├── logo.svg
    ├── hero-main.svg, hero-2.svg, hero-3.svg
    ├── stay-1.svg … stay-6.svg
    ├── course-1.svg … course-3.svg
    ├── avatar.svg
    └── map.svg
```

## Breakpoints used

Mobile-first CSS with two `min-width` breakpoints:

| Breakpoint | Width      | Key changes                                                        |
|------------|------------|-------------------------------------------------------------------|
| Base       | `< 768px`  | Single-column, stacked layout; nav collapses to actions only.     |
| Tablet     | `≥ 768px`  | Gallery mosaic; 2-up stay/feature/review grids; 4-col footer.     |
| Desktop    | `≥ 1024px` | Full nav; booking widget beside hero; card grid beside sticky map.|
| Wide       | `≥ 1200px` | Stay cards go 3-up.                                                |

The layout also targets the common test widths (~375px, ~768px, ~1024px, and
larger) with no horizontal scrolling, and typography/images scale fluidly.

## Accessibility

- Skip-to-content link, visible `:focus-visible` states, and keyboard-operable
  controls.
- Descriptive `alt` text on meaningful images; decorative icons/avatars are
  hidden from assistive tech.
- `prefers-reduced-motion` disables smooth scroll and transitions.

## Assumptions and limitations

- **Placeholder assets.** The images in `assets/` are lightweight SVG
  placeholders standing in for the real photography, logo, and map from the
  design. Swap them for optimized production assets (same file names) with no
  markup changes required.
- **Static only.** Interactive behaviors implied by the design (date pickers,
  filter dropdowns, map toggle, carousel arrows, favorite buttons) are rendered
  as styled controls but are not wired up, since the assignment scope is HTML/CSS
  for design fidelity.
- **Copy.** A few illustrative review/paragraph strings that were not fully
  legible in the source design are approximated.

## Preview locally

Open `index.html` in any modern browser, or serve the folder:

```bash
python3 -m http.server
# then visit http://localhost:8000
```
