# Website V2 Polish — Changes Summary

**Date:** 2026-07-22 · **Branch:** `claude/website-v2-polish` (not merged; Arian merges).
Preview locally with `git checkout claude/website-v2-polish && npm run build && npx serve out`.
Merging this branch → `main` ships it live (GitHub Pages deploys on push to `main`).

Implements `WEBSITE_V2_PLAN.md` top to bottom (19 tasks). `npm run build` is clean, 0 broken
internal links, no new standalone "climate" in marketing copy.

### Phase 1 — critical fixes
- **T1** Mobile nav menu fixed. The panel was `position:fixed` inside the sticky header whose
  `backdrop-filter` created a containing block that collapsed it to ~0 height. Repositioned as
  `absolute top-full`, added body scroll-lock + close-on-route-change (`components/layout/Header.tsx`).
- **T2** De-duplicated page titles. The root layout already defined a `%s | Klimate Consulting`
  template, so per-page titles that included the brand rendered it twice — removed the suffix from
  every page; added short SEO-title overrides for the longest project/insight titles.
- **T3** Branded 404 (`app/not-found.tsx` → `out/404.html`).
- **T4** Meta gaps: og:image on `/research/`; description + og:image on the microirrigation post;
  Sargassum retagged **Ecosystems** on `/research/` (+ Ecosystems filter chip).

### Phase 2 — copy (final wording)
- **T5** Hero: "National-lab rigor." → "Research-grade rigor."; How-we-work card 01 retitled
  "Rigor first" (+ layout meta description updated to match).
- **T6** Card 01 body → "We rely solely on credible scientific literature and primary data…".
- **T7** "weeks, not quarters" → "days or weeks, not quarters".
- **T8** Water barriers paragraph added to the homepage Water row and `/services/water/`
  (with links to the CA-water dataset and the price-of-water post).
- **T9** Removed the "we develop microgrids" claims (homepage Energy row, `/services/energy/`,
  `/services/` index card, About) → research framing. **Scale Microgrid client project untouched.**
- **T10** "Agriculture is the next frontier" added to the homepage Ag row + ag service page.
- **T11** Trusted-by names are now links (new tab, verified 200); "Lawrence Berkeley National
  Laboratory" → "Berkeley Lab".

### Phase 3 — media
- **T12** New `featured.png` for the agtech post: 1200×630 composite of the two podcast covers
  (194 KB, ≤250 KB target). og:image already matched the filename.
- **T13** Site-wide image optimization: `public/images` 63 MB → **4.8 MB**, every file ≤300 KB.
  6 large project PNG photos converted to WebP (references updated); JPEGs re-encoded in place.
  Script: `scripts/optimize-images.mjs`.

### Phase 4 — features
- **T14** `/insights/` rebuilt as a thumbnail **card grid** (3/2/1-up) under the featured card;
  `/research/` list unchanged.
- **T15** New reusable `components/shared/Carousel.tsx` (scroll-snap, auto-advance 7 s, pause on
  hover/focus, arrows + dots, touch swipe, reduced-motion static). Hero right column → 4-slide
  field-note carousel; homepage Featured projects → carousel of all projects (3-up desktop / 1-up
  mobile).
- **T16** Tamed entrance animations: `FadeIn` 0.4 s, initial opacity 0.3 (never fully invisible),
  earlier trigger, reduced-motion short-circuit; hero animates on mount from opacity 0.3.
- **T17** Agtech post now includes the shared light nav shell (`_shared/site-nav.*`) — all four
  interactive posts share one shell.
- **T18** Fixed agtech mobile horizontal overflow (stat-tile row used fixed 330px columns → made
  fluid; chart/wrap max-width guards). Quotes untouched.
- **T19** Added the **Sargassum Bloom Tracker** card to `/data-labs/` and the homepage Data Labs
  strip (5 tools, matching data.klimateconsulting.com).

### Deviations from the plan (adapted per the ground-rule "acceptance criteria are source of truth")
- **T2:** the title template already existed, so this was suffix-removal + long-title shortening
  rather than adding the template.
- **T13:** its working-tree changes were produced by a background agent and got folded into the
  **T5–T7 commit** by a `git add -A` that ran at the same moment (functionally clean; webp refs all
  updated, no dangling paths). Not a separate T13 commit.
- **T15a:** the three new field-note slides (Energy/Agriculture/Food Systems) **reuse the repo's
  already-optimized service-hero photos** instead of newly-sourced Unsplash images — license-clean,
  no network dependency, consistent crop. Water keeps the existing aqueduct photo.
- **T17:** the shared shell was **already** the light 2026 header (the plan's "old dark bar"
  assumption was stale — it was restyled in the redesign). Work reduced to adding it to the agtech post.
- **T18:** the browser window could not be driven below ~500px in QA, so the fix was verified
  structurally (fluid `.tiles` grid confirmed active in the CSSOM under the ≤760px media query)
  rather than by a sub-500px screenshot. The fluid grid cannot overflow its container at any width.

### Observed but deliberately not changed
- The agtech post keeps its in-hero "← Klimate Consulting · Insights" text back-link; now somewhat
  redundant with the shell but harmless, and the report content is machine-verified so it was left
  untouched.
- About page's emissions-trajectory chart + SDG grid remain inert (`{false && …}`), as before.

### QA gate (all pass)
Mobile menu open/scroll/navigate/close (T1); titles brand-once; branded 404; trusted-by 6 links 200;
all copy edits present; no new standalone "climate"; insights thumbnail grid + two-cover featured
card; carousels auto-advance/dots/no hydration warnings; Data Labs + homepage strip list 5 tools;
`find public/images -size +300k` empty; agtech featured 194 KB; og:image on research/microirrigation/
agtech; all four posts share the light shell; agtech `.tiles` grid fluid; 0 broken internal links;
`npm run build` clean; sitemap includes the new pages.

---

# Redesign — Changes Summary

Full visual redesign of the Klimate Consulting marketing site: from the previous dark, photo-heavy
theme to a light, editorial, research-grade aesthetic. Same URLs, same content, same brand palette
and fonts, new look. Implemented from the `design_handoff_website_redesign` package.

Positioning shift: **a lean, AI-native research firm** (national-lab rigor, AI-native speed) — the
word "climate" is kept out of all new marketing copy.

## Added
- **Design tokens** rebuilt in `app/globals.css` (light-only; dark mode removed).
- **Shared foundation components:** `SectorStripe`, `Kicker`, `CTABand`, `FadeIn`, `JournalRow`,
  redesigned `ProjectCard`/`Button`; `lib/sectors.ts` sector metadata helper.
- **New homepage section** "How we work" (`components/home/HowWeWork.tsx`).
- **Shared sector-page layout** `components/services/SectorServiceLayout.tsx` (the 4 sector pages are data instances).
- **Blog components** `components/blog/{NewsletterPanel,AuthorBio,KeepReading}.tsx`.
- Project frontmatter fields `type` / `status` (+ optional `dashboardLabel`/`dashboardUrl`).
- `ecosystem` topic tag in the sector map (Sargassum insight).
- `EDITING_GUIDE.md` — where all copy lives + how to modify the site.

## Changed (restyled to the new theme)
- Light sticky `Header` (active-nav underline, sector stripe) + new dark-blue `Footer` (4 cols, mini stripe).
- Every page: home, services + 4 sector pages, projects list + detail, insights list + blog-post
  shell, research, data-labs, team, about, contact.
- MDX components `Stat`, `ChartEmbed`, `PullQuote`, `Callout`; `TableOfContents`, `ShareBar`.

## Preserved (unchanged behavior)
- All routes, canonicals, sitemap, redirects, JSON-LD; static `output: 'export'`.
- Contact form's Google Apps Script + Cloudflare Turnstile backend (byte-for-byte).
- `lib/publications.ts` data + DownloadGate flow; all 8 projects, all insights, all publications.
- Standalone interactive posts under `public/blog-posts/**`.

## Removed
- Dark-mode variants; old `CTAStrip` (replaced by `CTABand`).
- About page's emissions-trajectory chart + SDG grid are **inert** (`{false && …}`), pending client
  confirmation to delete permanently.

## Verification
- `next build` static export passes (34 routes), TypeScript clean.
- New marketing copy contains no "climate" (remaining occurrences are pre-existing article/project/
  publication content — see EDITING_GUIDE §4).
