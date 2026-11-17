# Efthalia Vogiari portfolio

A portfolio presented as a book lying open on an illustrated desk.

```sh
npm install
npm run dev          # the site, with hot reload
npm run build        # production build into dist/
npm run check:local  # lint, unit tests, and the browser checks in Chromium and Firefox
npm run check        # the same, in every browser including WebKit (what CI runs)
```

## Architecture

One owner per responsibility. Data flows one way: content, then layout, then reading state, then the book, desk and nav.

| Owner | Responsibility |
|---|---|
| `src/content/` | Text, images and chapter definitions. Data only; it imports nothing. Copy rules are at the top of `book.js`. |
| `src/book/layout.js` | Binds the cover, chapters and back cover into numbered pages; each chapter starts on a left page, and `spreadOf` numbers spreads. |
| `src/book/useBook.js` | The reading position and every way of changing it: previous / next, a click on a page, chapter jumps, arrow keys, the URL hash. Requests during a move are ignored; Book finishes the move. |
| `src/components/Book.jsx` | The sheets (two faces each, tabs on the faces) and the facts a turn needs. Animated turns finish on `animationend`; reduced-motion navigation changes pages directly. |
| `src/components/Book.css` | What a turn looks like, in CSS only, and how the book centres itself. |
| `src/components/Page.jsx`, `Page.css` | Page content, typography, the baseline grid, photo prints and project video. They do not control page turns. |
| `src/components/Desk.jsx`, `Desk.css` | The desk illustration and its idle loops. Objects stay clear of the book and of the upper half of its edges, where the tabs are. |
| `src/components/Nav.jsx`, `Nav.css` | The slip below the book; it sends requests through the same interface as the tabs and keys. |
| `src/App.jsx`, `App.css` | Composition and the scene layout (`--page-w`, `--desk-w`): one landscape layout on every screen; a phone is read sideways. |
| `src/styles/tokens.css` | Every colour, time, easing, font family and shadow, in two layers: primitives, then semantic tokens. |
| `stylelint.config.mjs` | The raw-value rules, and which stylesheet owns which class blocks. |

### How a page turn works

1. A click, key, tab, Nav segment or hash change reaches `useBook`, which sets a `target` page. While a move is running, further requests are ignored.
2. `Book.jsx` renders once for the target: `--page`, `--target`, `--last`, `--count` and `data-turn` (`fwd` or `back`) on `.book`; `--order` and `data-turning` on each turning sheet; `data-cast` on the two pages beside the turn.
3. CSS plays the turn (`Book.css`). Each turning sheet rotates about the spine (`rotateY`), delayed by its order in a chapter jump, with its stacking order swapped once at 50%. One set of keyframes describes a turn forward; a turn back plays them in reverse. The face turning away darkens; a shadow falls on the page it uncovers and on the one it lands on. Each chapter's first page carries its tab on both faces of its sheet, so the tab turns with it.
4. The book's own `centre` animation ends last on every move, and `Book` calls `finish()` from its `animationend`. The resting styles equal the last frame, so nothing jumps.
5. The Reduce motion control selects direct page changes and stops decorative loops. The choice is saved locally; without a saved choice, the system preference applies.

### The page grid

`--lh` (in `Page.css`) is the gap between the ruled lines. Every line-height is `var(--lh)` and every vertical gap a whole multiple, and the page's content height is snapped to whole rows, so text lands on the rules and the flexible rows (photos) get a whole number of rows. Headings are bold and underlined in the chapter colour, with the underline drawn on the rule. A print is as big as its layout allows at its image proportions, so a page that has less to say leaves its space at the bottom.

## Rules and what enforces them

| Rule | Owner | Enforced by |
|---|---|---|
| No colour, time, easing or font-family literal outside tokens | `src/styles/tokens.css` | Stylelint (`color-no-hex`, `color-named`, `function-disallowed-list`, unit and value lists) |
| A class block lives in one stylesheet | the prefix map in `stylelint.config.mjs` | Stylelint `selector-class-pattern`; the config throws if two files share a prefix |
| Every token is used | `tokens.css` | `tests/unit/dead-tokens.test.mjs` |
| `content/` is data only; components never import content; `book/` has no UI | folder layout | ESLint `no-restricted-imports` |
| No `requestAnimationFrame` | CSS owns animation timing | ESLint `no-restricted-globals` / `-properties` |
| Hook dependencies are complete | all hooks | ESLint react-hooks |
| Only transform, translate, rotate, scale and opacity animate, never SVG children | `Book.css`, `Desk.css` | review (the file headers say so) |
| The site loads without errors, no page overflows, a page turns, a tab and the hash navigate | the whole site | `tests/e2e/smoke.spec.js` in Chromium and WebKit |

## Verification

`npm run check:local` (about 10 s): Stylelint, ESLint, the token test, and the smoke test in Chromium. Playwright builds the site and serves it on port 4173 itself. `npm run check` adds WebKit (Safari's engine); CI runs it. Install the browser once with `npx playwright install chromium`.

Look at the site yourself after a visual change: the checks cover breakage, not taste. Keep the checks this small: a new guard is one more assertion in the smoke test, not a new test file.

## Deploy

`.github/workflows/deploy.yml` runs on a push to `main`: a `check` job installs Chromium and WebKit and runs `npm run check`, and the `deploy` job (build, then publish to GitHub Pages) runs only if it passes. So nothing that breaks in Safari's engine can go live. Commit and push only when explicitly requested by the user.
