# Klimate Consulting — Website Editing & Maintenance Guide

This is the practical guide for changing the site after the 2026 redesign. It covers where
copy lives, the design system, how to add content, and how to run/deploy. If you only read one
section, read **"Common edits"**.

> **Two hard rules for all page copy**
> 1. **Never use the word "climate"** in marketing copy. The brand name **"Klimate Consulting"** is fine.
>    (Existing article/project bodies under `content/` are historical and exempt — see "The climate rule" below.)
> 2. Keep copy in the **editable constants** at the top of each component / in MDX frontmatter — that's
>    where every headline and paragraph lives, so edits are a 5-minute job, not a code hunt.

---

## 1. Stack & how to run it

- **Next.js 16 (App Router) + React 19 + Tailwind CSS v4**, TypeScript, MDX content, framer-motion.
- Static site: `next.config.ts` has `output: 'export'` → the build emits plain HTML into `out/`.
- Fonts: Space Grotesk (headings) + Montserrat (body) via `next/font` in `app/layout.tsx`.

```bash
npm install          # first time
npm run dev          # local dev at http://localhost:3000
npm run build        # static export → ./out  (this is what gets deployed)
```

To preview the real production output locally: `npm run build && (cd out && python3 -m http.server 3002)`.

---

## 2. The design system (where the look is defined)

**Design tokens** live in `app/globals.css` under `@theme` — colors, fonts, container width.
Change a brand color once here and it updates everywhere. Key tokens (Tailwind class → hex):

| Class | Hex | Use |
|---|---|---|
| `kc-bg` | `#FDFDFB` | page background |
| `kc-bg-grey` | `#F3F5F8` | alternating sections |
| `kc-bg-blue` | `#D3EBFB` | callout / Data Labs panels |
| `kc-border` / `kc-divider` | `#E7EAEE` / `#DDE3E8` | hairlines / list rows |
| `kc-blue` / `kc-blue-dark` | `#0F4C81` / `#0a3a66` | primary · Water · footer |
| `kc-green` | `#70A288` | Agriculture |
| `kc-yellow` / `kc-yellow-hover` | `#FFAD05` / `#FFC145` | Energy · CTA button |
| `kc-brown` | `#220C10` | Food Systems |
| `kc-dark` / `kc-text-lead` / `kc-text-secondary` / `kc-text-muted` | `#162123` / `#45565a` / `#5a6a6e` / `#8a979b` | text scale |

**Sectors** (`lib/sectors.ts`) is the single source of truth for the 4 focus areas + the
`ecosystem` topic tag — label, accent color, tint, and icon. Anything that shows a sector
color/label/icon reads from here.

**Shared building blocks** in `components/shared/` (reused on every page — edit once, changes everywhere):
- `SectorStripe` — the 4-color brand stripe (header bottom, CTA top, footer, under team photos).
- `Kicker` — the dash + uppercase eyebrow above headings.
- `Button` — `variant="primary" | "cta" | "outline"`.
- `CTABand` — the blue closing band. Props: `heading`, `subline`, `buttonLabel`, `href`.
- `FadeIn` — the scroll-in animation wrapper.
- `ProjectCard` — project card with sector top-rule.
- `JournalRow` — the editorial "date · title · tag · arrow" list row (insights, research, related work).

**Header/Footer**: `components/layout/Header.tsx` (nav links + active states) and `Footer.tsx`
(columns, tagline, LinkedIn URL). The nav list is the `navLinks` array at the top of `Header.tsx`.

---

## 3. Common edits (recipes)

### Change a headline or paragraph on a marketing page
Open the page's file and edit the constant at the top. Locations:
| Page | File | Copy lives in |
|---|---|---|
| Home hero | `components/home/Hero.tsx` | `HERO` object (+ `SHOW_HERO_PHOTO` toggle) |
| Home "How we work" | `components/home/HowWeWork.tsx` | `CARDS` array |
| Home focus areas | `components/home/FocusAreas.tsx` | `DESCRIPTIONS` object |
| Home client bar | `components/home/ClientLogos.tsx` | `CLIENTS` array |
| Home Data Labs teaser | `components/home/DataLabsTeaser.tsx` | `TOOLS` array |
| Services hub | `app/services/page.tsx` | header consts + engagement tiles |
| Sector pages | `app/services/{water,energy,agriculture,food-systems}/page.tsx` | the `config` object (shared layout: `components/services/SectorServiceLayout.tsx`) |
| Projects list | `app/projects/page.tsx` | header consts |
| Insights list | `app/insights/InsightsListClient.tsx` | header + featured card |
| Blog post shell | `app/insights/[slug]/page.tsx` | layout only; post text = MDX |
| Research | `app/research/page.tsx` + `ResearchListClient.tsx` | header consts; data = `lib/publications.ts` |
| Data Labs | `app/data-labs/page.tsx` | the dashboard cards array |
| Team | `app/team/page.tsx` | the profiles array (bios) |
| About | `app/about/page.tsx` | section consts |
| Contact | `app/contact/page.tsx` | `PAGE_HEADER`, info-card consts (⚠ don't touch the form backend) |
| Footer | `components/layout/Footer.tsx` | tagline + `LINKEDIN_URL` |
| Site title / meta | `app/layout.tsx` | `metadata` |

### Toggle the homepage hero photo
`components/home/Hero.tsx` → set `SHOW_HERO_PHOTO = false` for a typographic-only hero.

### Add a new insight / blog post
Create `content/insights/<slug>.mdx` with frontmatter (`title`, `date`, `author`, `sector`,
`description`, `readingTime`, `image`, optional `featured`, `sectors[]`). It auto-appears in the
Insights list, sitemap, and homepage "From our research". Body is Markdown/MDX; you can use the
`<Stat>`, `<ChartEmbed>`, `<PullQuote>`, `<Callout>` components (styled in `components/mdx/`).
Sector must be one of `water | energy | agriculture | food-systems | ecosystem`.

### Add a new project (case study)
Create `content/projects/<slug>.mdx` with frontmatter: `title`, `client`, `sector`, `date`,
`image`, `description`, optional `featured`, `type`, `status`, and optional
`dashboardLabel` + `dashboardUrl` (drives the light-blue dashboard callout on the detail page).
The "At a glance" strip reads Client / Sector / `type` / `status`.

### Add a publication
Add an entry to the array in `lib/publications.ts` (`type`, `topics`, `authors`, `venue`, `year`,
`pdf`/`doi`/`toolUrl`, `featured`, `gated`). Type + topic filter chips update automatically.

### Change nav or footer links
`components/layout/Header.tsx` (`navLinks`) and `components/layout/Footer.tsx`
(`serviceLinks`, `companyLinks`).

### Change a brand color
Edit the token in `app/globals.css` (`@theme`) and, if it's a sector accent, `lib/sectors.ts`.

### Swap a photo
Drop the file into `public/images/...` and update the `src` path in the relevant file. Images are
served unoptimized (static export) — export them at a sensible size (hero ~1600px wide).

---

## 4. Content vs. chrome — "the climate rule"

The redesign copy (headlines, section text, buttons) is **climate-free**. The word still appears in
some **pre-existing article/project/publication content** that was intentionally preserved:
- Insight bodies: California Water Dilemma (1 & 2), ESG Disclosure, Navigating the Changing Tides.
- Project titles/bodies: "Natural Climate Solutions Research" (Ceres), water-system-nrdc, carbon-market-carba.
- One publication title: "…ISO 50001 on climate change mitigation".

These are real, citable content — rewriting them is a **content decision for the client**, not part of
the visual redesign. When you rewrite messaging, re-run:
`npm run build && grep -rioE "climate" out --include=*.html | grep -vi klimate` and review each hit.

The old About-page emissions chart + SDG grid are **not deleted** — they're wrapped in `{false && (…)}`
in `app/about/page.tsx` (open item: confirm permanent removal with the client, then delete the block).

---

## 5. Open items to decide with the client
1. **Final messaging** — copy in the mocks is draft; rewrite in the constants above, then re-run the climate grep.
2. **About page** — confirm dropping the emissions-trajectory chart + SDG grid (currently inert).
3. **Newsletter** — UI exists on Insights + blog posts, gated behind `NEWSLETTER_ENABLED = false`
   in `components/blog/NewsletterPanel.tsx`. Flip to `true` once a provider/endpoint is wired.
4. **LinkedIn URL** — `LINKEDIN_URL` in `Footer.tsx` (and Contact) — confirm the real company URL.
5. **Dark mode** — removed by design (light-only). Confirm.

---

## 6. Before you ship
- `npm run build` must pass with zero errors.
- Spot-check pages at 1280px, 768px, 375px (layouts stack; nav collapses to the hamburger).
- Contact form: submit a real test — the Google Apps Script + Cloudflare Turnstile backend is
  untouched by the redesign; don't edit that logic in `app/contact/page.tsx`.
- The staging build is `noindex` only if you gate it; production must remain indexable.
