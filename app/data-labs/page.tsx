import type { Metadata } from 'next'
import Image from 'next/image'
import CTABand from '@/components/shared/CTABand'
import FadeIn from '@/components/shared/FadeIn'
import Kicker from '@/components/shared/Kicker'
import { getSector, type SectorKey } from '@/lib/sectors'

export const metadata: Metadata = {
  title: 'Klimate Data Labs',
  alternates: { canonical: '/data-labs/' },
  description:
    'Free, open-source data dashboards for California water, U.S. food systems, and industrial energy efficiency.',
}

// Draft copy from the mock — kept editable here, client rewrites messaging later.
const HEADER = {
  kicker: 'Free & open tools',
  title: 'Klimate Data Labs',
  intro:
    'Public data should be open, accessible, and visually compelling. Data Labs is our collection of open-source dashboards built on federal and state datasets — all free to use.',
}

interface Dashboard {
  sectorKey: SectorKey
  urlLabel: string
  href: string
  title: string
  description: string
  stats: { value: string; label: string }[]
}

const DASHBOARDS: Dashboard[] = [
  {
    sectorKey: 'water',
    urlLabel: 'data.klimateconsulting.com/ca-water',
    href: 'https://data.klimateconsulting.com/ca-water/',
    title: 'California Water Intelligence Dashboard',
    description:
      'NOAA, CDEC, and CA DWR data: drought conditions, precipitation indices, reservoir levels, and maps of 1,900+ water districts.',
    stats: [
      { value: '1,900+', label: 'water district maps' },
      { value: '3', label: 'public data sources' },
    ],
  },
  {
    sectorKey: 'agriculture',
    urlLabel: 'data.klimateconsulting.com/food-ag',
    href: 'https://data.klimateconsulting.com/food-ag/',
    title: 'U.S. Food & Agriculture Value Chain',
    description:
      'USDA, Census, EPA, and EIA data: the end-to-end U.S. food system analyzed across 8 dimensions.',
    stats: [
      { value: '11', label: 'datasets' },
      { value: '8', label: 'value-chain dimensions' },
    ],
  },
  {
    sectorKey: 'energy',
    urlLabel: 'data.klimateconsulting.com/enms',
    href: 'https://data.klimateconsulting.com/enms/',
    title: 'EnMS Improvement Opportunity Finder',
    description:
      'DOE Industrial Assessment Center data — search energy-efficiency opportunities by industry and system type.',
    stats: [
      { value: '18,000+', label: 'assessments' },
      { value: '125,000+', label: 'recommendations' },
    ],
  },
  {
    sectorKey: 'food-systems',
    urlLabel: 'data.klimateconsulting.com/enms-insights',
    href: 'https://data.klimateconsulting.com/enms-insights/',
    title: 'EnMS Insights Database',
    description:
      'ISO 50001 / SEP case studies from around the world — searchable evidence on what energy management delivers.',
    stats: [
      { value: '386', label: 'case studies' },
      { value: '47+', label: 'countries' },
    ],
  },
]

export default function DataLabsPage() {
  return (
    <div>
      {/* ============ PAGE HEADER ============ */}
      <section className="bg-kc-bg-blue">
        <div className="mx-auto max-w-[1240px] px-8 pt-[88px] pb-20">
          <FadeIn>
            <Kicker accent="#0F4C81" color="#0F4C81" className="mb-6">
              {HEADER.kicker}
            </Kicker>
            <div className="grid items-end gap-10 lg:grid-cols-[7fr_5fr] lg:gap-[72px]">
              <h1 className="m-0 font-heading text-[44px] font-semibold leading-[1.08] tracking-[-0.025em] text-kc-dark md:text-[56px]">
                {HEADER.title}
              </h1>
              <p className="m-0 font-body text-base leading-[1.8] text-[#2c4046]">
                {HEADER.intro}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ DASHBOARDS ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 py-24">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {DASHBOARDS.map((dash, i) => {
              const sector = getSector(dash.sectorKey)
              return (
                <FadeIn key={dash.title} delay={(i % 2) * 0.1}>
                  <a
                    href={dash.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-md border border-kc-border bg-white px-10 pb-9 pt-10 transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_44px_rgba(22,33,35,0.10)]"
                    style={{ borderTop: `3px solid ${sector.color}` }}
                  >
                    <div className="mb-[22px] flex items-center justify-between gap-4">
                      {/* Source: klimate-owned */}
                      <Image
                        src={sector.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-kc-text-muted">
                        {dash.urlLabel}
                      </span>
                    </div>
                    <h3 className="m-0 mb-[14px] font-heading text-[23px] font-semibold tracking-[-0.01em] text-kc-dark">
                      {dash.title}
                    </h3>
                    <p className="m-0 mb-6 font-body text-sm leading-[1.75] text-kc-text-lead">
                      {dash.description}
                    </p>
                    <div className="mb-[22px] flex gap-6 border-t border-kc-border pt-5">
                      {dash.stats.map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="font-heading text-[22px] font-semibold"
                            style={{ color: sector.textColor }}
                          >
                            {stat.value}
                          </div>
                          <div className="font-body text-xs text-kc-text-muted">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <span className="font-body text-[13.5px] font-semibold text-kc-blue">
                      Open dashboard →
                    </span>
                  </a>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <CTABand
        heading="Need a dashboard like these?"
        subline="We build custom data tools on public and private datasets — for your team or your stakeholders."
        buttonLabel="Get in touch"
      />
    </div>
  )
}
