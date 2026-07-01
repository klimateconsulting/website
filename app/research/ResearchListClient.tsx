'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Download, ExternalLink, Star } from 'lucide-react'
import TagBadge from '@/components/shared/TagBadge'
import DownloadGate from '@/components/DownloadGate'
import {
  type Publication,
  type PublicationType,
  typeLabels,
  typeOrder,
  SELF_AUTHOR,
} from '@/lib/publications'

const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT

const typeFilters: { key: PublicationType | 'all'; label: string }[] = [
  { key: 'all', label: 'All types' },
  { key: 'journal', label: 'Journal' },
  { key: 'conference', label: 'Conference' },
  { key: 'report', label: 'Report' },
  { key: 'tool', label: 'Tools' },
]

const topicFilters: { key: string; label: string }[] = [
  { key: 'all', label: 'All topics' },
  { key: 'agriculture', label: 'Agriculture' },
  { key: 'energy', label: 'Energy' },
  { key: 'water', label: 'Water' },
  { key: 'food-systems', label: 'Food Systems' },
]

// Bold Arian's name wherever it appears in an author list.
function Authors({ authors }: { authors: string[] }) {
  return (
    <span>
      {authors.map((a, i) => {
        const isSelf = a.includes(SELF_AUTHOR)
        return (
          <span key={i}>
            {isSelf ? (
              <strong className="text-kc-dark dark:text-white font-semibold">{a}</strong>
            ) : (
              a
            )}
            {i < authors.length - 1 ? ', ' : ''}
          </span>
        )
      })}
    </span>
  )
}

function PublicationRow({
  pub,
  onGate,
}: {
  pub: Publication
  onGate: (pub: Publication) => void
}) {
  const gateEnabled = Boolean(pub.gated && FORMS_ENDPOINT)

  return (
    <div className="py-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {pub.featured && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold font-body text-kc-blue dark:text-kc-light-blue">
                <Star className="w-3.5 h-3.5 fill-current" />
                Featured
              </span>
            )}
            {pub.topics.map((t) => (
              <TagBadge key={t} sector={t} />
            ))}
          </div>

          <h3 className="font-heading text-lg font-bold text-kc-dark dark:text-white leading-snug">
            {/* Title links to the primary source (DOI / LBNL page / tool). */}
            <a
              href={pub.url}
              target={pub.url.startsWith('http') ? '_blank' : undefined}
              rel={pub.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="hover:text-kc-blue dark:hover:text-kc-light-blue transition-colors"
            >
              {pub.title}
            </a>
          </h3>

          <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 mt-1.5">
            <Authors authors={pub.authors} />
          </p>
          <p className="font-body text-sm text-kc-text-secondary dark:text-gray-400 mt-0.5">
            {pub.venue} · {pub.year}
          </p>

          {pub.related && pub.related.length > 0 && (
            <p className="font-body text-xs text-kc-text-secondary dark:text-gray-400 mt-2">
              <span className="font-semibold">Related on Klimate:</span>{' '}
              {pub.related.map((r, i) => (
                <span key={r.href + i}>
                  <Link
                    href={r.href}
                    className="text-kc-blue dark:text-kc-light-blue hover:underline"
                  >
                    {r.label}
                  </Link>
                  {i < pub.related!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Action: hosted PDF -> Download (gate if enabled); otherwise external link. */}
        <div className="flex-shrink-0">
          {pub.pdf ? (
            gateEnabled ? (
              <button
                type="button"
                onClick={() => onGate(pub)}
                className="inline-flex items-center gap-2 bg-kc-blue text-white font-body font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-kc-blue-dark transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            ) : (
              <a
                href={pub.pdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 bg-kc-blue text-white font-body font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-kc-blue-dark transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            )
          ) : (
            <a
              href={pub.url}
              target={pub.url.startsWith('http') ? '_blank' : undefined}
              rel={pub.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-kc-dark dark:text-white font-body font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-kc-bg-grey dark:hover:bg-kc-blue/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {pub.type === 'tool' ? 'Open tool' : 'View'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResearchListClient({ publications }: { publications: Publication[] }) {
  const [typeFilter, setTypeFilter] = useState<PublicationType | 'all'>('all')
  const [topicFilter, setTopicFilter] = useState<string>('all')
  const [gated, setGated] = useState<Publication | null>(null)

  const grouped = useMemo(() => {
    const filtered = publications.filter(
      (p) =>
        (typeFilter === 'all' || p.type === typeFilter) &&
        (topicFilter === 'all' || p.topics.includes(topicFilter))
    )

    return typeOrder
      .map((t) => ({
        type: t,
        items: filtered
          .filter((p) => p.type === t)
          // Featured first, then newest year first.
          .sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0) || b.year - a.year),
      }))
      .filter((g) => g.items.length > 0)
  }, [publications, typeFilter, topicFilter])

  const total = grouped.reduce((n, g) => n + g.items.length, 0)

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Filters */}
        <div className="space-y-3 mb-10">
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setTypeFilter(f.key)}
                className={`px-3.5 py-1.5 text-sm font-semibold font-body rounded-full transition-colors ${
                  typeFilter === f.key
                    ? 'bg-kc-blue text-white'
                    : 'bg-kc-bg-grey dark:bg-kc-dark-card text-kc-text-secondary dark:text-gray-300 hover:bg-kc-light-blue dark:hover:bg-kc-blue/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {topicFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setTopicFilter(f.key)}
                className={`px-3.5 py-1.5 text-sm font-semibold font-body rounded-full transition-colors ${
                  topicFilter === f.key
                    ? 'bg-kc-green text-white'
                    : 'bg-kc-bg-grey dark:bg-kc-dark-card text-kc-text-secondary dark:text-gray-300 hover:bg-kc-light-green dark:hover:bg-kc-green/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {total === 0 ? (
          <p className="font-body text-kc-text-secondary dark:text-gray-400 py-12 text-center">
            No publications match those filters.
          </p>
        ) : (
          <div className="space-y-14">
            {grouped.map((group) => (
              <div key={group.type}>
                <h2 className="font-heading text-2xl font-bold text-kc-dark dark:text-white mb-2 pb-3 border-b-2 border-kc-blue/30">
                  {typeLabels[group.type]}
                </h2>
                <div>
                  {group.items.map((pub) => (
                    <PublicationRow key={pub.id} pub={pub} onGate={setGated} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {gated && gated.pdf && (
        <DownloadGate
          reportTitle={gated.title}
          reportFile={gated.pdf}
          onClose={() => setGated(null)}
        />
      )}
    </section>
  )
}
