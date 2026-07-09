'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import DownloadGate from '@/components/DownloadGate'
import { getSector } from '@/lib/sectors'
import { type Publication, type PublicationType, SELF_AUTHOR } from '@/lib/publications'

const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT

// ── Editable copy ──────────────────────────────────────────────────────────
const FOOTER_NOTE = (
  <>
    For media &amp; collaborators: our interactive tools are free to cite and embed.{' '}
    <a href="/contact/" className="font-semibold text-kc-blue hover:underline">
      Get in touch
    </a>
    .
  </>
)
const EMPTY_STATE_MESSAGE = 'No publications match those filters.'

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

// Short per-row type tag — distinct from lib/publications.ts's typeLabels,
// which name the (now-retired) section headers.
const typeTagLabels: Record<PublicationType, string> = {
  journal: 'Journal',
  conference: 'Conference',
  report: 'Report',
  tool: 'Tool',
  talk: 'Talk',
}

const chipBase =
  'px-5 py-3 text-sm font-semibold font-body rounded-full border transition-colors whitespace-nowrap'
const chipInactive = 'bg-white border-kc-divider text-kc-text-lead hover:border-kc-blue/40'

const actionClass =
  'inline-flex items-center justify-center text-center border-[1.5px] border-kc-light-blue text-kc-blue font-body font-semibold text-[12.5px] px-5 py-3 rounded whitespace-nowrap hover:border-kc-blue transition-colors'

// Bold Arian's name wherever it appears in an author list.
function Authors({ authors }: { authors: string[] }) {
  return (
    <span>
      {authors.map((a, i) => {
        const isSelf = a.includes(SELF_AUTHOR)
        return (
          <span key={i}>
            {isSelf ? <strong className="text-kc-dark font-semibold">{a}</strong> : a}
            {i < authors.length - 1 ? ', ' : ''}
          </span>
        )
      })}
    </span>
  )
}

// hosted PDF -> "Download PDF ↓"; tool w/o PDF -> "Open tool ↗"; else -> DOI/publisher link.
function actionLabel(pub: Publication): string {
  if (pub.pdf) return 'Download PDF ↓'
  if (pub.type === 'tool') return 'Open tool ↗'
  return 'View at DOI ↗'
}

function PublicationRow({
  pub,
  onGate,
}: {
  pub: Publication
  onGate: (pub: Publication) => void
}) {
  const gateEnabled = Boolean(pub.gated && FORMS_ENDPOINT)
  const label = actionLabel(pub)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_170px] gap-4 md:gap-10 md:items-center py-7 px-2 border-b border-kc-divider last:border-b-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap mb-2.5">
          {pub.featured && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold font-body uppercase tracking-[0.1em] text-white bg-kc-blue px-2.5 py-1 rounded-full">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
          {pub.topics.map((t) => (
            <span
              key={t}
              className="text-[10.5px] font-semibold font-body uppercase tracking-[0.1em]"
              style={{ color: getSector(t).textColor }}
            >
              {getSector(t).label}
            </span>
          ))}
          <span className="text-[10.5px] font-semibold font-body uppercase tracking-[0.1em] text-kc-text-muted border border-kc-divider px-2.5 py-[3px] rounded-full">
            {typeTagLabels[pub.type]}
          </span>
        </div>

        <h3 className="font-heading text-[18.5px] font-semibold leading-[1.4] tracking-[-0.01em] text-kc-dark mb-2">
          {/* Title links to the primary source (DOI / LBNL page / tool). */}
          <a
            href={pub.url}
            target={pub.url.startsWith('http') ? '_blank' : undefined}
            rel={pub.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="hover:text-kc-blue transition-colors"
          >
            {pub.title}
          </a>
        </h3>

        <p className="font-body text-[13px] leading-[1.6] text-kc-text-secondary m-0">
          <Authors authors={pub.authors} /> &middot; {pub.venue} &middot; {pub.year}
        </p>

        {pub.related && pub.related.length > 0 && (
          <p className="font-body text-xs text-kc-text-muted mt-2">
            <span className="font-semibold">Related on Klimate:</span>{' '}
            {pub.related.map((r, i) => (
              <span key={r.href + i}>
                <Link href={r.href} className="text-kc-blue hover:underline">
                  {r.label}
                </Link>
                {i < pub.related!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Action: hosted PDF -> Download (gate if enabled); otherwise external link. */}
      <div className="md:justify-self-end">
        {pub.pdf ? (
          gateEnabled ? (
            <button type="button" onClick={() => onGate(pub)} className={actionClass}>
              {label}
            </button>
          ) : (
            <a
              href={pub.pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={actionClass}
            >
              {label}
            </a>
          )
        ) : (
          <a
            href={pub.url}
            target={pub.url.startsWith('http') ? '_blank' : undefined}
            rel={pub.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={actionClass}
          >
            {label}
          </a>
        )}
      </div>
    </div>
  )
}

export default function ResearchListClient({ publications }: { publications: Publication[] }) {
  const [typeFilter, setTypeFilter] = useState<PublicationType | 'all'>('all')
  const [topicFilter, setTopicFilter] = useState<string>('all')
  const [gated, setGated] = useState<Publication | null>(null)

  // Flat, filterable list — featured first, then newest year first.
  const filtered = useMemo(() => {
    return publications
      .filter(
        (p) =>
          (typeFilter === 'all' || p.type === typeFilter) &&
          (topicFilter === 'all' || p.topics.includes(topicFilter))
      )
      .sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0) || b.year - a.year)
  }, [publications, typeFilter, topicFilter])

  return (
    <>
      {/* Filters (continues the page-header visual block) */}
      <section className="bg-kc-bg border-b border-kc-border">
        <div className="max-w-[1240px] mx-auto px-8 pb-10 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-2.5">
              {typeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  className={`${chipBase} ${
                    typeFilter === f.key ? 'bg-kc-blue border-kc-blue text-white' : chipInactive
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="font-body text-[13px] text-kc-text-muted">
              {filtered.length} publication{filtered.length === 1 ? '' : 's'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {topicFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setTopicFilter(f.key)}
                className={`${chipBase} ${
                  topicFilter === f.key ? 'bg-kc-green border-kc-green text-white' : chipInactive
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Publication list */}
      <section className="bg-kc-bg">
        <div className="max-w-[1000px] mx-auto px-8 py-10 md:py-14">
          {filtered.length === 0 ? (
            <p className="font-body text-kc-text-secondary py-12 text-center">
              {EMPTY_STATE_MESSAGE}
            </p>
          ) : (
            <div className="flex flex-col border-t border-kc-divider">
              {filtered.map((pub) => (
                <PublicationRow key={pub.id} pub={pub} onGate={setGated} />
              ))}
            </div>
          )}

          <p className="font-body text-[13px] text-kc-text-muted text-center mt-8">
            {FOOTER_NOTE}
          </p>
        </div>
      </section>

      {gated && gated.pdf && (
        <DownloadGate
          reportTitle={gated.title}
          reportFile={gated.pdf}
          onClose={() => setGated(null)}
        />
      )}
    </>
  )
}
