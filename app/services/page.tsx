import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTABand from '@/components/shared/CTABand'
import FadeIn from '@/components/shared/FadeIn'
import Kicker from '@/components/shared/Kicker'
import { SECTOR_ORDER, getSector } from '@/lib/sectors'

export const metadata: Metadata = {
  title: 'Services',
  alternates: { canonical: '/services/' },
  description:
    'Technical analysis, applied research, data analytics, and policy guidance for agriculture, energy, water, and food systems.',
}

// Editable copy ---------------------------------------------------------------

const HEADER = {
  h1a: 'Rigorous analysis,',
  h1b: 'however you need it.',
  intro:
    'From applied research and technical reports to data analysis and policy guidance — we deliver work you can defend, in the format your stakeholders need.',
}

/** The eight service types clients engage us for (existing names, numbered 01–08). */
const ENGAGEMENTS = [
  'Technical Analysis & Report Writing',
  'Applied Research',
  'Data Analysis & Visualization',
  'R&D Support',
  'Technical Content Creation',
  'Technology Evaluation',
  'Market Research',
  'Policy Analysis',
]

/** Sector deep-dive rows. Challenge/what-we-do are the concise hub summaries. */
const SECTOR_ROWS: Record<
  string,
  { href: string; challenge: string; whatWeDo: string }
> = {
  water: {
    href: '/services/water/',
    challenge:
      "Most of the world's population lives in water-stressed regions. California manages water with laws from the 1800s.",
    whatWeDo:
      'Water management R&D, infrastructure modernization research, water data analysis.',
  },
  energy: {
    href: '/services/energy/',
    challenge:
      'Grid stress, rising demand, and new threats to energy security and reliability.',
    whatWeDo:
      'Microgrid solutions, energy management R&D, industrial energy efficiency, DOE program support.',
  },
  agriculture: {
    href: '/services/agriculture/',
    challenge:
      'Soil degradation, water overuse, and pressure to do more with less land and inputs.',
    whatWeDo:
      'Farm production analytics, crop data analysis, agricultural census insights, sequestration research.',
  },
  'food-systems': {
    href: '/services/food-systems/',
    challenge:
      'A complex global supply chain and mounting Scope 3 reporting demands.',
    whatWeDo:
      'Emission accounting, supply chain analysis, carbon insetting, LCA, food system data.',
  },
}

// -----------------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <div>
      {/* ============ PAGE HEADER ============ */}
      <section className="border-b border-kc-border bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pt-[88px] pb-[72px]">
          <Kicker className="mb-6">Services</Kicker>
          <div className="grid items-end gap-10 lg:grid-cols-[7fr_5fr] lg:gap-[72px]">
            <h1 className="m-0 font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.025em] text-kc-dark md:text-[56px]">
              {HEADER.h1a}
              <br />
              {HEADER.h1b}
            </h1>
            <p className="m-0 font-body text-base leading-[1.8] text-kc-text-lead">
              {HEADER.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DELIVER ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 py-24">
          <Kicker className="mb-4">What we deliver</Kicker>
          <h2 className="m-0 mb-12 font-heading text-[32px] font-semibold tracking-[-0.02em] text-kc-dark md:text-[36px]">
            Eight ways to engage us
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENTS.map((name, i) => (
              <FadeIn as="div" key={name} delay={(i % 4) * 0.05}>
                <div className="h-full rounded-md border border-kc-border bg-white px-[26px] py-7 transition-colors duration-200 hover:border-kc-blue">
                  <div className="mb-[14px] font-heading text-[13px] font-medium text-kc-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-heading text-[17px] font-semibold leading-[1.35] text-kc-dark">
                    {name}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTOR DEEP-DIVES ============ */}
      <section className="bg-kc-bg-grey">
        <div className="mx-auto max-w-[1240px] px-8 py-24">
          <Kicker className="mb-4">Where we go deep</Kicker>
          <h2 className="m-0 mb-12 font-heading text-[32px] font-semibold tracking-[-0.02em] text-kc-dark md:text-[36px]">
            Our focus areas
          </h2>

          <div className="flex flex-col gap-6">
            {SECTOR_ORDER.map((key) => {
              const sector = getSector(key)
              const row = SECTOR_ROWS[key]
              return (
                <FadeIn as="div" key={key}>
                  <Link
                    href={row.href}
                    className="group grid grid-cols-[56px_1fr] items-start gap-6 rounded-md border border-kc-border bg-white p-9 transition-shadow duration-200 hover:shadow-[0_16px_40px_rgba(22,33,35,0.09)] lg:grid-cols-[56px_220px_1fr_1fr_100px] lg:gap-9"
                    style={{ borderLeft: `3px solid ${sector.color}` }}
                  >
                    {/* Source: klimate-owned */}
                    <Image
                      src={sector.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                    <h3 className="m-0 font-heading text-[24px] font-semibold tracking-[-0.01em] text-kc-dark">
                      {sector.label}
                    </h3>
                    <div>
                      <div className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                        The challenge
                      </div>
                      <p className="m-0 font-body text-[13.5px] leading-[1.7] text-kc-text-secondary">
                        {row.challenge}
                      </p>
                    </div>
                    <div>
                      <div className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                        What we do
                      </div>
                      <p className="m-0 font-body text-[13.5px] leading-[1.7] text-kc-text-secondary">
                        {row.whatWeDo}
                      </p>
                    </div>
                    <span className="font-body text-[13px] font-semibold text-kc-blue lg:self-center lg:justify-self-end">
                      More →
                    </span>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CTABand
        heading="Have a project in mind?"
        subline="Tell us what you're trying to answer — we'll scope the fastest rigorous path to it."
        buttonLabel="Get in touch"
      />
    </div>
  )
}
