import type { Metadata } from 'next'
import { publications, type Publication } from '@/lib/publications'
import { siteUrl } from '@/lib/metadata'
import Kicker from '@/components/shared/Kicker'
import CTABand from '@/components/shared/CTABand'
import ResearchListClient from './ResearchListClient'

export const metadata: Metadata = {
  // Absolute title so the layout's "| Klimate Consulting" template isn't appended twice.
  title: { absolute: 'Research & Publications | Klimate Consulting' },
  description:
    'Peer-reviewed papers, technical reports, and interactive tools by Arian Aghajanzadeh on energy, water, and agricultural sustainability, decarbonization, and demand response.',
  alternates: { canonical: '/research/' },
  openGraph: {
    title: 'Research & Publications | Klimate Consulting',
    description:
      'Peer-reviewed papers, technical reports, and interactive tools on energy, water, and agricultural sustainability.',
    url: `${siteUrl}/research/`,
    type: 'website',
  },
}

// ── Editable page-header copy ────────────────────────────────────────────
const HEADER_KICKER = 'Research & Publications'
const HEADER_TITLE = 'The research behind the consulting.'
const HEADER_INTRO =
  'Two decades of peer-reviewed papers, national-lab technical reports, and interactive tools — from grid demand response and ISO 50001 to controlled environment agriculture and the water-energy nexus. Free to cite and embed.'

// ── Editable closing CTA copy ─────────────────────────────────────────────
const CTA_HEADING = 'Need research like this?'
const CTA_SUBLINE = 'This body of work is the standard every engagement is held to.'
const CTA_BUTTON_LABEL = 'Get in touch'

function absoluteUrl(u: string): string {
  return u.startsWith('http') ? u : `${siteUrl}${u}`
}

function schemaType(type: Publication['type']): string {
  switch (type) {
    case 'report':
      return 'Report'
    case 'tool':
      return 'CreativeWork'
    default:
      return 'ScholarlyArticle'
  }
}

// JSON-LD CollectionPage listing each entry as a ScholarlyArticle / Report — a
// strong E-E-A-T signal tying the body of work to Arian Aghajanzadeh.
function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Research & Publications',
    url: `${siteUrl}/research/`,
    about: 'Research and publications by Arian Aghajanzadeh, Klimate Consulting',
    hasPart: publications.map((p) => ({
      '@type': schemaType(p.type),
      name: p.title,
      datePublished: p.date || String(p.year),
      url: absoluteUrl(p.pdf || p.url),
      author: {
        '@type': 'Person',
        name: 'Arian Aghajanzadeh',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Klimate Consulting',
      },
    })),
  }
}

export default function ResearchPage() {
  const jsonLd = buildJsonLd()

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header */}
      <section className="bg-kc-bg">
        <div className="max-w-[1240px] mx-auto px-8 pt-20 pb-10 md:pt-24 md:pb-12">
          <Kicker className="mb-6">{HEADER_KICKER}</Kicker>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <h1 className="lg:col-span-7 font-heading text-4xl md:text-[56px] leading-[1.08] font-semibold tracking-[-0.02em] text-kc-dark m-0">
              {HEADER_TITLE}
            </h1>
            <p className="lg:col-span-5 font-body text-base leading-[1.8] text-kc-text-lead m-0">
              {HEADER_INTRO}
            </p>
          </div>
        </div>
      </section>

      <ResearchListClient publications={publications} />

      <CTABand
        heading={CTA_HEADING}
        subline={CTA_SUBLINE}
        buttonLabel={CTA_BUTTON_LABEL}
        href="/contact/"
      />
    </div>
  )
}
