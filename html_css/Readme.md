# Eagle Creek Golf Club - Stay & Play

A single responsive page built with plain HTML and CSS (no frameworks, no
JavaScript) to match the provided Stay & Play design.

## Structure and approach

Everything is in `index.html` and `styles.css`, with an `assets` folder for images
and icons. The HTML uses semantic tags (`header`, `main`, `section`, `article`,
`aside`, `footer`), and I used Flexbox and Grid for layout (no floats). Colours,
fonts and spacing are kept in CSS variables, classes follow BEM naming, and the CSS
is split into commented sections in page order. Icons are `<img>` tags with two
folders (`icons` dark, `icons-white` white) since an SVG in an `<img>` can't be
recoloured by CSS.

## Breakpoints

Desktop-first, using `max-width` media queries:

- **1024px and below** (tablet): hamburger nav, booking box swaps to the Stay/Play
  card, grids drop to two columns, map moves above the cards.
- **767px and below** (mobile): single-column grids, icon-only search and button,
  two-column footer.
- **425px and below**: small fixes for narrow phones.

## Assumptions / limitations

- No JavaScript, so dropdowns, carousel dots, pager and filters are visual only.
- Some weather text is kept from the mockup on purpose even though it doesn't match
  Orlando ("Vancouver's Weather Patterns", "Sedona's trails", and the -15.2 C
  weekday temps).
- Images in `assets` are placeholders on the correct filenames, to be swapped for
  the real photos.
- Filenames are lowercase since GitHub Pages is case-sensitive.