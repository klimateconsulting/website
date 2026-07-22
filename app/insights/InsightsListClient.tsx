'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSector } from '@/lib/sectors'
import FadeIn from '@/components/shared/FadeIn'
import NewsletterPanel from '@/components/blog/NewsletterPanel'

interface Post {
  slug: string
  title: string
  date: string
  author: string
  sector: string
  sectors?: string[]
  description: string
  readingTime: number
  image?: string
}

// ---- Editable page copy ----------------------------------------------------
const KICKER = 'Insights'
const HEADING = 'Analysis you can cite.'

// Filter tabs (client-side). Kept from the previous list behavior.
const FILTERS = ['all', 'water', 'energy', 'agriculture', 'food-systems', 'ecosystem'] as const

// Sector label that also covers the legacy "ecosystem" tag (not in getSector).
function sectorLabel(sector: string) {
  if (sector === 'ecosystem') return 'Ecosystems'
  return getSector(sector).label
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function InsightsListClient({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all')

  // Latest post drives the featured card (posts arrive sorted newest-first).
  const featured = posts[0]
  const rest = posts.slice(1)

  const filtered =
    filter === 'all'
      ? rest
      : rest.filter((p) => p.sector === filter || p.sectors?.includes(filter))

  return (
    <div className="bg-kc-bg pt-20">
      {/* ============ PAGE HEADER + FEATURED ============ */}
      <section className="border-b border-kc-border bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pb-20 pt-[88px]">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[2px] w-7 bg-kc-blue" />
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-kc-text-secondary">
              {KICKER}
            </span>
          </div>
          <h1 className="m-0 mb-16 font-heading text-[42px] font-semibold leading-[1.08] tracking-[-0.025em] text-kc-dark md:text-[56px]">
            {HEADING}
          </h1>

          {featured && (
            <Link
              href={`/insights/${featured.slug}/`}
              className="grid grid-cols-1 overflow-hidden rounded-lg border border-kc-border bg-white text-inherit transition-shadow duration-200 hover:shadow-[0_24px_56px_rgba(22,33,35,0.10)] md:grid-cols-2"
            >
              {featured.image && (
                <div className="relative h-[240px] w-full md:h-[380px]">
                  {/* Source: klimate-owned */}
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-9 md:px-14 md:py-[52px]">
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-kc-blue px-3 py-[5px] font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    Featured
                  </span>
                  <span className="font-body text-[12.5px] font-medium text-kc-text-muted">
                    {formatDate(featured.date)} · {sectorLabel(featured.sector)}
                  </span>
                </div>
                <h2 className="m-0 mb-[18px] font-heading text-[26px] font-semibold leading-[1.2] tracking-[-0.015em] text-kc-dark md:text-[32px]">
                  {featured.title}
                </h2>
                <p className="m-0 mb-6 font-body text-[14.5px] leading-[1.75] text-kc-text-secondary">
                  {featured.description}
                </p>
                <span className="font-body text-[13.5px] font-semibold text-kc-blue">
                  Read the analysis →
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ============ ALL POSTS ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pb-[110px] pt-[72px]">
          {/* Sector filter (client-side) */}
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 font-body text-[12.5px] font-semibold transition-colors ${
                  filter === f
                    ? 'bg-kc-blue text-white'
                    : 'bg-kc-bg-grey text-kc-text-secondary hover:bg-kc-light-blue'
                }`}
              >
                {f === 'all' ? 'All' : sectorLabel(f)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => {
              const s = getSector(post.sector)
              return (
                <FadeIn key={post.slug} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/insights/${post.slug}/`}
                    className="group block h-full overflow-hidden rounded-md border border-kc-border bg-white text-inherit transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_44px_rgba(22,33,35,0.10)]"
                  >
                    <div className="h-[3px]" style={{ background: s.color }} />
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {/* Source: klimate-owned */}
                      <Image
                        src={post.image || '/og-image.png'}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-6 pb-7 pt-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className="rounded-full px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.1em]"
                          style={{ background: s.tint, color: s.textColor }}
                        >
                          {sectorLabel(post.sector)}
                        </span>
                        <span className="font-body text-[12px] font-medium text-kc-text-muted">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h3 className="m-0 mb-2.5 line-clamp-2 font-heading text-[19px] font-semibold leading-[1.35] tracking-[-0.01em] text-kc-dark transition-colors group-hover:text-kc-blue">
                        {post.title}
                      </h3>
                      <p className="m-0 line-clamp-3 font-body text-[13.5px] leading-[1.7] text-kc-text-secondary">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <p className="px-3 py-12 font-body text-[14px] text-kc-text-muted">
              No analysis in this sector yet.
            </p>
          )}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <NewsletterPanel variant="strip" />
    </div>
  )
}
