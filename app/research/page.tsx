import type { Metadata } from 'next'
import { publications, type Publication } from '@/lib/publications'
import { siteUrl } from '@/lib/metadata'
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

      {/* Hero / intro */}
      <section className="py-20 md:py-28 bg-kc-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Research &amp; Publications
          </h1>
          <p className="font-body text-lg text-gray-300 max-w-3xl mx-auto">
            Two decades of peer-reviewed papers, national-lab technical reports, and interactive
            tools on energy, water, and agricultural sustainability — from grid demand response and
            ISO 50001 energy management to controlled environment agriculture and the water-energy
            nexus. Our work is grounded in this research.
          </p>
          <p className="font-body text-sm text-gray-400 max-w-2xl mx-auto mt-6">
            For media &amp; collaborators: our interactive tools are free to cite and embed.{' '}
            <a href="/contact/" className="text-kc-light-blue hover:underline">
              Get in touch
            </a>
            .
          </p>
        </div>
      </section>

      <ResearchListClient publications={publications} />
    </div>
  )
}
