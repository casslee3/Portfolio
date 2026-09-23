# Product & Interaction Design Portfolio

Landing page for hiring managers and recruiters. Built with **Vite**, **Tailwind CSS v4** and vanilla JavaScript modules, with no framework runtime.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Quality checks

| Command            | What it does                                                         |
| ------------------ | -------------------------------------------------------------------- |
| `npm run check`    | Lint + format check + dead-code scan + build. Run before every push. |
| `npm run deadcode` | [Knip](https://knip.dev): unused files, exports and dependencies.    |
| `npm run lint`     | ESLint (unused variables and unreachable code are errors).           |
| `npm run a11y`     | axe-core WCAG 2.2 AA audit of `dist/` in light and dark mode.        |

`npm run a11y` needs a Chromium binary. Point `CHROMIUM_PATH` at it if Playwright can't find one:
`CHROMIUM_PATH=/path/to/chrome npm run build && npm run a11y`.

Tailwind only emits the utility classes used in `index.html`, so unused CSS never ships.

## Structure

```
index.html              Page markup, SEO meta and JSON-LD structured data
src/css/main.css        Tailwind entry, design tokens (light/dark via light-dark()) and shared component classes
src/js/main.js          JS entry: wires up the modules below
src/js/theme.js         Light/dark toggle (persists choice, follows OS by default)
src/js/nav.js           Mobile menu disclosure (aria-expanded, Escape to close)
src/js/typewriter.js    One-shot hero typing effect (skipped for reduced motion)
src/js/principles.js    "How I think" highlight cycle with a pause button
src/js/motion.js        Shared prefers-reduced-motion check
src/js/copy-email.js    Copy-email button with screen-reader announcement
public/js/init.js       Tiny blocking script: applies saved theme before first paint
public/                 Static files copied as-is (favicon, robots.txt, sitemap, llms.txt)
scripts/a11y.mjs        Automated accessibility audit (light/dark × desktop/mobile)
```

Page sections, top to bottom: floating nav → hero with stats → featured case studies → product approach → about → recruiter FAQ and contact → footer.

### Theming

All colours are semantic tokens in `src/css/main.css` (`bg-surface`, `text-fg-muted`, `border-line`, `bg-accent`...). Change a colour once there and both themes update. Keep text pairs at 4.5:1 contrast or higher.

## Accessibility

- Semantic landmarks (`header`, `nav`, `aside`, `main`, `footer`), a single `h1` and logical heading order
- Skip link, visible `:focus-visible` ring on every control, targets ≥ 40px
- Mobile menu is a proper disclosure button; FAQ uses native `<details>` (keyboard accessible without JS)
- Auto-cycling principles can be paused (WCAG 2.2.2); the typing effect runs once, under 5 seconds
- Theme toggle exposed as a pressed/unpressed button; copy feedback in a `role="status"` live region
- Respects `prefers-reduced-motion` and `prefers-color-scheme`

## SEO & AI search

- Descriptive `<title>`, meta description, canonical URL, Open Graph and Twitter tags
- `schema.org` `ProfilePage` + `Person` JSON-LD
- `llms.txt` summary for AI answer engines, plus `robots.txt` and `sitemap.xml`
- Real text content (not images) for every name, role, metric and skill

## Before you ship

Everything below is placeholder content. Replace it before publishing:

- [ ] Name, bio, location, experience and companies (`index.html`, JSON-LD, `public/llms.txt`)
- [ ] Case studies and metrics: use your real work and real numbers only
- [ ] `hello@example.com` and the LinkedIn URL
- [ ] `https://example.com` in the canonical URL, OG tags, JSON-LD, `robots.txt`, `sitemap.xml` and `llms.txt`
- [ ] Add `public/resume.pdf` and `public/og-image.png` (1200×630)
- [ ] Create the case-study pages linked from the cards (`/case-studies/<slug>/`)
- [ ] Replace the gradient mock visuals in each case-study card with real screenshots (`<img>` with alt text)
- [ ] Replace the hero stats and recruiter FAQ answers with your own
- [ ] Optional: swap the initials avatar for a portrait `<img>` with descriptive `alt` text
