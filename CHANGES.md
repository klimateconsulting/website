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
