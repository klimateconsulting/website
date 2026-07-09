import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import CTABand from '@/components/shared/CTABand'
import FadeIn from '@/components/shared/FadeIn'
import Kicker from '@/components/shared/Kicker'
import ProjectCard from '@/components/shared/ProjectCard'
import JournalRow from '@/components/shared/JournalRow'
import { getSector, type SectorKey } from '@/lib/sectors'
import { getProjectBySlug, getInsightBySlug } from '@/lib/mdx'

/**
 * SectorServiceLayout — the shared template for the four focus-area pages
 * (Water · Energy · Agriculture · Food Systems). Each sector page is a thin
 * data instance that passes this config object; all layout/markup lives here.
 *
 * Sections: breadcrumb + 6/6 header (icon + kicker + H1 + intro | framed hero
 * photo) · "What we do" (2 prose paragraphs + grey services panel) · a blue
 * dashboard callout · "Related work" (one ProjectCard + three JournalRows) ·
 * the sector CTA band.
 */
export interface SectorServiceConfig {
  /** Drives accent color, color icon, and label via getSector(). */
  sectorKey: SectorKey
  /** Draft header intro (from the mock). */
  intro: string
  /** Framed hero photo, e.g. /images/services/water-hero.jpg */
  heroImage: string
  heroAlt: string
  /** "What we do" H2 (from the mock). */
  whatWeDoHeading: string
  /** Two prose paragraphs (existing sector copy). */
  paragraphs: string[]
  /** Grey-panel eyebrow, e.g. "Our water services". */
  servicesLabel: string
  /** Six service bullets (existing copy). */
  services: string[]
  /** Data Labs dashboard callout. */
  dashboard: { name: string; href: string }
  /** Related project slug (content/projects/*.mdx). */
  relatedProjectSlug: string
  /** Three related insight slugs (content/insights/*.mdx). */
  relatedInsightSlugs: string[]
  /** Sector-specific CTA band copy. */
  cta: { heading: string; subline: string; buttonLabel: string }
}

export default function SectorServiceLayout(config: SectorServiceConfig) {
  const sector = getSector(config.sectorKey)
  const project = getProjectBySlug(config.relatedProjectSlug)
  const insights = config.relatedInsightSlugs.map((slug) => getInsightBySlug(slug))

  return (
    <div>
      {/* ============ PAGE HEADER ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pt-[72px] pb-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-body text-[12.5px]"
          >
            <Link
              href="/services/"
              className="font-semibold text-kc-text-muted transition-colors hover:text-kc-blue"
            >
              Services
            </Link>
            <span className="text-kc-light-blue" aria-hidden="true">
              /
            </span>
            <span className="font-semibold" style={{ color: sector.textColor }}>
              {sector.label}
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <FadeIn>
              <div className="mb-[26px] flex items-center gap-4">
                {/* Source: klimate-owned */}
                <Image
                  src={sector.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <Kicker accent={sector.color}>Focus area</Kicker>
              </div>
              <h1 className="m-0 mb-[26px] font-heading text-[44px] font-semibold leading-[1.08] tracking-[-0.025em] text-kc-dark md:text-[56px]">
                {sector.label}
              </h1>
              <p className="m-0 font-body text-[16.5px] leading-[1.8] text-kc-text-lead">
                {config.intro}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              {/* Source: klimate-owned */}
              <div className="overflow-hidden rounded-md shadow-[0_24px_60px_rgba(15,76,129,0.14)]">
                <Image
                  src={config.heroImage}
                  alt={config.heroAlt}
                  width={720}
                  height={380}
                  priority
                  className="block h-[300px] w-full object-cover md:h-[380px]"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="border-t border-kc-border bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-8 py-24 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <FadeIn>
            <Kicker className="mb-4">What we do</Kicker>
            <h2 className="m-0 mb-7 font-heading text-[30px] font-semibold tracking-[-0.02em] text-kc-dark md:text-[34px]">
              {config.whatWeDoHeading}
            </h2>
            <div className="flex flex-col gap-5">
              {config.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="m-0 font-body text-[15.5px] leading-[1.85] text-kc-text-lead"
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="self-start rounded-md bg-kc-bg-grey px-9 py-10">
              <div className="mb-6 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-kc-text-secondary">
                {config.servicesLabel}
              </div>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {config.services.map((service) => (
                  <li key={service} className="flex items-baseline gap-[14px]">
                    <span
                      className="relative top-[6px] block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: sector.color }}
                      aria-hidden="true"
                    />
                    <span className="font-heading text-[15px] font-medium text-kc-dark">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ DASHBOARD CALLOUT ============ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-8 pb-24">
          <FadeIn>
            <div className="flex flex-col items-start gap-8 rounded-lg bg-kc-bg-blue px-8 py-11 md:flex-row md:items-center md:justify-between md:px-[52px]">
              <div>
                <div className="mb-[10px] font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-kc-blue">
                  Free tool · Klimate Data Labs
                </div>
                <div className="font-heading text-[22px] font-semibold tracking-[-0.01em] text-kc-dark md:text-[24px]">
                  {config.dashboard.name}
                </div>
              </div>
              <Button
                href={config.dashboard.href}
                external
                variant="primary"
                className="shrink-0"
              >
                Explore the dashboard →
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ RELATED WORK ============ */}
      <section className="bg-kc-bg-grey">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-8 py-24 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <FadeIn>
            <Kicker className="mb-4">Related project</Kicker>
            <ProjectCard
              slug={project.slug}
              title={project.frontmatter.title}
              client={project.frontmatter.client}
              sector={project.frontmatter.sector}
              image={project.frontmatter.image}
              description={project.frontmatter.description}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Kicker className="mb-4">Related insights</Kicker>
            <div className="flex flex-col border-t border-kc-divider">
              {insights.map((insight) => (
                <JournalRow
                  key={insight.slug}
                  href={`/insights/${insight.slug}/`}
                  date={insight.frontmatter.date}
                  title={insight.frontmatter.title}
                  description={insight.frontmatter.description}
                  sector={insight.frontmatter.sector}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CTABand
        heading={config.cta.heading}
        subline={config.cta.subline}
        buttonLabel={config.cta.buttonLabel}
      />
    </div>
  )
}
