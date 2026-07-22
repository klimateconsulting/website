# WEBSITE V2 POLISH — SINGLE EXECUTION PLAN

**Audience:** Claude Code. Execute this plan top to bottom, completely, with no questions back to the user. Every decision has already been made. If something in the codebase contradicts an assumption here, adapt using the acceptance criteria as the source of truth and note the deviation in the final summary.

**Repo:** `klimateconsulting-web` — Next.js App Router + React + Tailwind v4 + TypeScript, MDX content in `content/insights/`, static export (`output: 'export'` → `out/`), deployed by GitHub Pages **on every push to `main`** (production, no previews). `EDITING_GUIDE.md` in repo root is the authoritative how-to for content patterns.

## Ground rules (read first)

1. **Never push to `main`.** All work happens on branch **`claude/website-v2-polish`**. Definition of done = branch pushed to origin, clean build, QA checklist passed, summary written. Arian merges.
2. Never use the word "climate" in marketing copy (brand name "Klimate" is fine; existing old article bodies are exempt).
3. Never hand-edit quotes inside `public/blog-posts/agtech-podcast-decade/` content — they are machine-verified. Layout/head/nav edits are fine.
4. All copy in this plan is **final wording** — paste as written (fix only obvious typos).
5. Commit per task (T-number in the message). Run `npm run build` after each phase; never leave the branch broken.

---

## PHASE 1 — Critical fixes

### T1. Fix the broken mobile navigation menu (CRITICAL — do first)
**Bug (verified on live site and on Arian's phone):** tapping the hamburger toggles it to an X but no menu appears.
**Root cause:** the mobile menu panel (`div.lg:hidden.fixed.inset-0.top-[79px].bg-kc-bg.z-40.overflow-y-auto`) is a descendant of the sticky `<header>`, which has `backdrop-blur-[12px]`. `backdrop-filter` creates a containing block for `position: fixed` descendants, so the panel sizes itself against the 80px header → computed height ≈ 0 → `overflow-y-auto` clips everything.
**Fix (this option, exactly):** keep the panel inside the header component's JSX but change its positioning to not depend on the broken fixed context: `absolute top-full inset-x-0 h-[calc(100dvh-80px)]` (keep `lg:hidden bg-kc-bg z-40 overflow-y-auto`). The header is `sticky top-0`, so `top-full` pins the panel directly under it. If the header component structure makes `absolute` awkward, the fallback is to portal the panel to `document.body` with the original fixed classes. Also add body scroll-lock while open (`overflow-hidden` on `<html>` or `<body>`), and close the menu on route change.
**Accept:** at 390×844 (real viewport, DevTools device emulation) on `/`, `/insights/`, a project page, and `/contact/`: menu opens covering the viewport below the header, scrolls internally, links navigate, menu closes on navigation, body doesn't scroll behind it, X closes it.

### T2. Fix duplicated page titles
Nearly every page renders `… | Klimate Consulting | Klimate Consulting` (e.g. About, all services, all projects, all insights). Set in the root layout: `title: { default: 'Klimate Consulting — A lean, AI-native research firm', template: '%s | Klimate Consulting' }`, then remove the brand suffix from every per-page/per-frontmatter title so each contributes only its page name. While there, shorten any title whose pre-template text exceeds ~50 chars (worst offenders: `/projects/water-system-nrdc/` 107, `/projects/voluntary-carbon-ceres/` 103, `/insights/microirrigation-energy-paradox/` 102).
**Accept:** `grep -r "Klimate Consulting | Klimate" out/` returns nothing after build; every page title contains the brand exactly once.

### T3. Branded 404 page
Add `app/not-found.tsx`: site header + footer, "404 — This page doesn't exist." heading in the site's heading font, one line of body copy, buttons to `/` and `/insights/`. Static export emits it as `out/404.html` (GitHub Pages picks that name up automatically — verify it's emitted).
**Accept:** `out/404.html` exists, branded, with working nav.

### T4. Meta gaps
- Add `og:image` to `/research/` (use the site-wide default og image; if none exists, create `public/images/og-default.png` 1200×630 — dark navy `#162123` background, white Klimate Consulting wordmark + tagline in brand fonts — and wire it as the layout-level default `openGraph.images` fallback for all pages missing one).
- `public/blog-posts/microirrigation/index.html`: add `<meta name="description">` (reuse the microirrigation insight's frontmatter description) and `og:image` (its featured/hero image) to the `<head>`.
- Sector-tag consistency: The Golden Tide/Sargassum is tagged Water on `/research/` but Ecosystems on `/insights/`. Make it **Ecosystems** in both places; if the research page's filter-chip system doesn't have an Ecosystems topic, add the chip.
**Accept:** view-source on both pages shows the tags; research page filter still works.

---

## PHASE 2 — Copy changes (all final wording)

### T5. Hero headline
Replace `National-lab rigor.` with `Research-grade rigor.` → hero reads: **"Research-grade rigor. AI-native speed."** Keep styling/line breaks. Then de-duplicate: the "How we work" card 01 heading is currently also "Research-grade rigor" — retitle that card to **"Rigor first"** (body text changes in T6).

### T6. "How we work" card 01 body
Replace "Our team comes from national laboratories and peer-reviewed research. Every claim is sourced, every number traceable — analysis you can put in front of a review board." with:
> "We rely solely on credible scientific literature and primary data. We do the research ourselves — and we stand by our results. Every claim is sourced, every number traceable — analysis you can put in front of a review board."
Also `grep -ri "comes from national laboratories" app/ components/ content/` and apply the same fix anywhere else the "people come from peer-reviewed research" phrasing appears (About page likely).

### T7. "Lean by design" card
Change "…and get answers in weeks, not quarters." to "…and get answers in **days or weeks**, not quarters." `grep -ri "weeks, not quarters"` to catch every instance.

### T8. Water copy addition
Keep all existing Water copy. Append this paragraph on `/services/water/` (end of the "What we do" intro block) and a shortened first sentence of it on the homepage Water row if the row layout allows a second sentence:
> "Our deep research into California water points to two structural barriers: the lack of usable water data and the way water is priced. That's where we focus — building the datasets and the pricing analysis that modernization decisions need."
Where it lands on `/services/water/`, link "datasets" to https://data.klimateconsulting.com/ca-water/ and "pricing analysis" to `/blog-posts/price-of-water/`.

### T9. Energy copy replacement (we don't develop microgrids)
Replace every marketing claim that Klimate develops microgrid solutions with:
> "We research how industries use and manage energy — and how to change the way energy is viewed, managed, and used across operations."
Locations to fix (grep `microgrid` to find all): homepage Energy row, `/services/energy/` hero + what-we-do, `/services/` index Energy card ("Microgrid solutions, energy management R&D, industrial energy efficiency, DOE program support." → "Industrial energy research, energy management R&D, industrial energy efficiency, DOE program support."). **Do not touch** the Scale Microgrid Solutions project card/page — that's client work and stays.

### T10. Agriculture copy addition
Append to the homepage Agriculture row description and to `/services/agriculture/` intro:
> "We believe agriculture is the next frontier — no sector has greater untapped potential for efficiency, resilience, and carbon impact."

### T11. "Trusted by" row
- Rename "Lawrence Berkeley National Laboratory" → **"Berkeley Lab"**.
- Wrap each name in a link, `target="_blank" rel="noopener noreferrer"`, styled to inherit the current muted color with underline on hover only: Berkeley Lab → https://www.lbl.gov · NRDC → https://www.nrdc.org · UC Davis → https://www.ucdavis.edu · Ceres → https://www.ceres.org · Carba → https://www.carba.com · Scale Microgrid Solutions → https://www.scalemicrogrids.com
- Verify each URL returns 200 (curl -IL). If one fails, find the org's canonical homepage and use it — do not drop the link.

---

## PHASE 3 — Media

### T12. Podcast-covers featured image for the agtech post
Replace `public/blog-posts/agtech-podcast-decade/featured.png` (currently a text screenshot that crops badly) with a 1200×630 composite of the two podcast covers side by side — "Future of Agriculture with Tim Hammerich" LEFT, "AgTech… So What?" RIGHT.
1. Fetch full-res art via iTunes Search API: `https://itunes.apple.com/search?term=future+of+agriculture+hammerich&media=podcast` and `https://itunes.apple.com/search?term=agtech+so+what&media=podcast`; take `artworkUrl600` from the correct result (match `collectionName`) and replace the `600x600` suffix with `1200x1200`.
2. Compose (sharp or Pillow): canvas 1200×630; each cover resized to 630×630 (Lanczos), center-cropped to 600×630, placed edge-to-edge left/right. No overlay text.
3. Export `featured.png` ≤ 250 KB (if PNG exceeds that, export `featured.webp` q82 and update the reference in `content/insights/agtech-podcast-decade.mdx` `image:` field).
4. Update `public/blog-posts/agtech-podcast-decade/index.html` `<head>` `og:image` to the same file.
**Accept:** `/insights/` featured card shows both covers uncropped-in-spirit (no cut-off title text), file ≤ 250 KB, og:image matches.

### T13. Site-wide image optimization (~60 MB → target < 6 MB total)
`output:'export'` disables next/image optimization, and these shipped raw (live sizes): carbon-market-ceres.png 8.3MB, water-system-modernization.png 8.1MB, carbon-market-carba.png 7.2MB, cea-project.png 7.0MB, team/arian-aghajanzadeh.jpg 6.5MB, microgrid.png 5.9MB, energy-water-management.png 3.2MB, team/darren-sholes.jpg 3.1MB, food-center.jpg 2.3MB, plus ~5 files 0.5–1.3MB in `public/images/insights/` and `public/blog-posts/sargassum/images/`.
Process: `npm i -D sharp`, write `scripts/optimize-images.mjs` that walks `public/images/` (+ the sargassum hero): resize longest edge to 1600px (heroes/projects) or 800px (team portraits), re-encode **keeping the same filename and format** (mozjpeg q80 for .jpg; for the huge .png photos, convert content to JPEG-in-PNG is wasteful — instead re-save as .webp q82 AND update code references; if a file is referenced from MDX/HTML in many places and rewiring is risky, palette-quantized PNG is acceptable as long as it lands ≤ 300 KB).
Add `loading="lazy"` + explicit width/height to below-the-fold `<img>`/next-image usages that lack them.
**Accept:** `find public/images -size +300k` returns nothing; every page's images render; total `public/images` < 6 MB.

---

## PHASE 4 — Features

### T14. Insights index → thumbnail card grid
Rebuild `/insights/` as a card grid (Arian explicitly wants the pre-redesign feel back; it must NOT look like the `/research/` text list):
- Featured (newest) post: full-width card at top — image left / text right on desktop, stacked on mobile (roughly what exists today, now with the T12 composite).
- All other posts: grid of cards, 3-up desktop / 2-up ≥768px / 1-up mobile. Card = thumbnail (frontmatter `image`, `object-cover`, uniform 16:10 crop, rounded per design tokens), sector badge (colors from `lib/sectors.ts`), date, title (2-line clamp), description (2–3-line clamp), whole card clickable.
- Hover: same lift/shadow treatment as project cards. Entrance animation subject to T16 rules.
- Every insights MDX has an `image` field — verify each file exists; any post whose image is missing gets `og-default.png` from T4 as thumbnail. Sizes governed by T13.
**Accept:** `/insights/` is a thumbnail grid, `/research/` unchanged, no layout shift from unsized images, mobile 1-col clean.

### T15. Two carousels: homepage field notes + featured projects
Build one reusable client-side carousel component (`components/shared/Carousel.tsx`): auto-advance 7s, pause on hover/focus, arrow buttons + dot indicators, touch swipe, `aria-roledescription="carousel"`, respects `prefers-reduced-motion` (no auto-advance). Static-export-safe (pure client component; deterministic SSR first slide → no hydration mismatch).

**15a — Hero field notes.** Replace the single static "FIELD NOTE · WATER" card+image with a 4-slide carousel (one per sector), each slide = sector image + field-note card:
- WATER: "California moves water with laws written in the 1800s. We research how to modernize it." (keep existing aerial image)
- ENERGY: "Industrial facilities buy more energy than they need. We research where the waste hides — and how to manage it out."
- AGRICULTURE: "We believe agriculture is the next frontier. We map where the biggest gains hide."
- FOOD SYSTEMS: "Most food-system impacts happen far from the farm gate. We trace them end to end."
Images: for the three new slides use open-license photography (Unsplash: search "industrial energy plant", "california almond orchard aerial", "food distribution warehouse" or similar; download, optimize per T13 rules, save under `public/images/home/field-notes/`, and record each photo's Unsplash URL + photographer in a comment at the top of the carousel component). Match the existing slide's crop/treatment.

**15b — Featured projects carousel.** Convert the homepage "Featured projects" 3-card row into the carousel showing ALL 8 projects, 3 visible per view on desktop (1 on mobile), advancing one card at a time, wrapping. Keep the existing card design and "All projects →" link.
**Accept:** both carousels work with mouse, touch, and keyboard; no console hydration warnings; reduced-motion users get static slides with manual controls.

### T16. Tame entrance animations
Current behavior leaves whole viewports blank while scrolling (verified on `/projects/`, `/about/`, `/services/`) and heroes take ~2s to appear. Change globally:
- Fade/slide duration ≤ 400ms, stagger ≤ 100ms between siblings.
- IntersectionObserver `rootMargin: '0px 0px -10% 0px'` or trigger threshold so content starts animating before it's centered in view.
- Initial state opacity ≥ 0.3 (not 0) so unanimated content is never invisible.
- Wrap all entrance animation in a `prefers-reduced-motion` check → render fully visible immediately.
- Page heroes (above-the-fold) animate on mount immediately, not on observer.
**Accept:** fast-scrolling any page never shows an empty viewport; Lighthouse/manual check confirms text visible with JS disabled is at worst dimmed, not absent.

### T17. Interactive posts — one consistent light nav shell
`public/blog-posts/_shared/site-nav.{js,css}` currently renders the OLD dark bar (used by price-of-water, sargassum, microirrigation); the agtech post has no shell at all (just a text back-link). Restyle the shared shell to match the new light header (background `rgba(253,253,251,0.94)`, same links: Insights · Research · Data Labs · Services · Contact, Klimate wordmark → `/`, mobile-friendly), then include it on the agtech post's `index.html` (keep its in-page section nav below). Ensure the shell's own mobile behavior doesn't reproduce the T1 bug (no fixed-inside-backdrop-filter).
**Accept:** all four `/blog-posts/*/` pages show the same light shell; links work; agtech page keeps its internal anchor nav.

### T18. Agtech post mobile overflow
At ~390px the agtech page content measured 430px wide (sideways scroll). Find offenders: run in DevTools `[...document.querySelectorAll('*')].filter(e => e.scrollWidth > document.documentElement.clientWidth)` at 390px. Likely the stat-tile row or a chart block. Fix with `max-width:100%` / `min-width:0` / `overflow-x:auto` on chart-wrappers only. Do not alter quote content.
**Accept:** no horizontal scroll at 360, 390, 428px widths.

### T19. Data Labs parity
`data.klimateconsulting.com` lists 5 tools; `/data-labs/` lists 4. Add the missing card to `/data-labs/`:
> **Sargassum Bloom Tracker** — "Track the world's largest macroalgal bloom from space: monthly bloom maps 2002–2026, the ~2014 regime shift, and seasonal and regional trends." → https://data.klimateconsulting.com/sargassum/ (sector styling: Ecosystems if available, else Water)
Also add "Sargassum Bloom Tracker" to the homepage "Klimate Data Labs" link strip (currently 4 links).
**Accept:** both pages list all 5 tools with working links.

---

## PHASE 5 — QA gate (all must pass before finishing)

Run `npm run build`, serve `out/` locally (`npx serve out`), then verify:

- [ ] Mobile menu (T1) on every page type at 390px — open/scroll/navigate/close/scroll-lock
- [ ] No blank viewports when scrolling fast on `/projects/`, `/about/`, `/services/`, `/insights/`
- [ ] Every page `<title>`: brand appears exactly once
- [ ] 404 page branded (`out/404.html`)
- [ ] Trusted-by: 6 links, all 200, open new tab; "Berkeley Lab" naming
- [ ] All copy edits present (grep: "Research-grade rigor" hero, "days or weeks", "solely on credible scientific", "next frontier", no marketing "microgrid solutions", water barriers paragraph)
- [ ] New copy contains no standalone "climate" (`grep -ri climate` diff-only check)
- [ ] `/insights/` = thumbnail grid; featured card = two podcast covers, no cut-off text
- [ ] Both carousels: auto-advance, hover-pause, swipe, dots, no hydration warnings in console
- [ ] `/data-labs/` + homepage strip list 5 tools
- [ ] `find public/images -size +300k` → empty; agtech featured ≤ 250 KB
- [ ] og:image present on `/research/`, microirrigation post, agtech post (covers composite)
- [ ] All four interactive posts share the light nav shell
- [ ] No horizontal overflow at 360/390/428px on `/`, `/insights/`, agtech post
- [ ] 0 broken internal links (crawl `out/` or re-run a link check on the served site)
- [ ] Full `npm run build` clean; sitemap regenerated and includes all pages

## Finish (do exactly this, nothing more)

1. Update `CHANGES.md`: date, branch name, task-by-task summary of what changed, any deviations from this plan and why, plus anything observed but deliberately not touched.
2. Commit everything; push branch `claude/website-v2-polish` to origin. **Do not merge. Do not push `main`. Do not open a deploy.**
3. Final message to Arian: one-paragraph summary + the QA checklist with pass marks + exact command he can use to preview locally (`git checkout claude/website-v2-polish && npm run build && npx serve out`) and the note that merging `claude/website-v2-polish` → `main` ships it live.
