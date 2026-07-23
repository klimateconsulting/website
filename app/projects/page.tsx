import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/mdx'
import Kicker from '@/components/shared/Kicker'
import CTABand from '@/components/shared/CTABand'
import ProjectsListClient from './ProjectsListClient'

// Editable page copy
const KICKER = 'Our work'
const HEADING = (
  <>
    Applied research,
    <br />
    real outcomes.
  </>
)
const LEAD =
  'Case studies from our research and consulting with national laboratories, NGOs, and companies across water, energy, agriculture, and food systems.'
const CTA_HEADING = 'Your project could be next.'
const CTA_SUBLINE =
  "Tell us what you're trying to answer — we'll scope the fastest rigorous path to it."
const CTA_BUTTON_LABEL = 'Get in touch'

export const metadata: Metadata = {
  title: 'Our Work',
  alternates: { canonical: '/projects/' },
  description:
    'Case studies from our applied research and consulting with LBNL, NRDC, Ceres, Carba, and Scale Microgrid.',
}

export default function ProjectsPage() {
  const projects = getAllProjects().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    client: p.frontmatter.client,
    sector: p.frontmatter.sector,
    image: p.frontmatter.image,
    description: p.frontmatter.description,
  }))

  return (
    <div className="pt-20">
      {/* Page header */}
      <section className="border-b border-kc-border bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pt-[88px] pb-14">
          <Kicker accent="#70A288" className="mb-6">
            {KICKER}
          </Kicker>
          <div className="grid grid-cols-1 items-end gap-x-[72px] gap-y-6 lg:grid-cols-[7fr_5fr]">
            <h1 className="m-0 font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.025em] text-kc-dark sm:text-[48px] lg:text-[56px]">
              {HEADING}
            </h1>
            <p className="m-0 font-body text-base leading-[1.8] text-kc-text-lead">{LEAD}</p>
          </div>
        </div>
      </section>

      {/* Filter chips + grid */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pt-[72px] pb-[110px]">
          <ProjectsListClient projects={projects} />
        </div>
      </section>

      <CTABand heading={CTA_HEADING} subline={CTA_SUBLINE} buttonLabel={CTA_BUTTON_LABEL} />
    </div>
  )
}
