import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTABand from '@/components/shared/CTABand'
import FadeIn from '@/components/shared/FadeIn'
import Kicker from '@/components/shared/Kicker'
import SectionHeader from '@/components/shared/SectionHeader'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about/' },
  description:
    'Our mission: make sustainability understandable and achievable. Based in San Francisco, serving NGOs, government labs, and private sector clients.',
}

// Draft copy from the mock — kept editable here, client rewrites messaging later.
const MISSION = {
  kicker: 'Our mission',
  title: 'Make complex systems understandable — and decisions defensible.',
  intro:
    "Navigating today's technical and regulatory landscape is overwhelming. We distill the intricacies into actionable, citable insight for the people who have to decide.",
}

const STORY = {
  kicker: 'Our story',
  title: 'Built to bridge a gap',
  paragraphs: [
    'Klimate Consulting was founded on a simple premise: the organizations best positioned to drive progress on water, energy, and agriculture often lack the specialized expertise to do it. We bridge that gap.',
    'Based in San Francisco, we work at the intersection of applied research, data analysis, and technical consulting — serving government, national labs, nonprofits, utilities, academia, startups, and venture capital.',
  ],
  image: '/images/projects/energy-water-management.webp',
  imageAlt: 'Klimate Consulting project work',
}

const WHERE_WE_WORK = {
  kicker: 'Where we work',
  title: 'Overlapping systems, one method',
  paragraph:
    'Carbon, agriculture, water, and energy overlap in the food system that ties them all together. Working across all of them is what lets us answer the questions that fall between disciplines.',
  chart: '/images/charts/industries-chart.png',
  chartAlt:
    "Klimate Consulting's focus areas as overlapping circles — Carbon, Agriculture, Water, and Energy — converging at the Food System.",
}

const TEAM_PREVIEW = [
  { name: 'Arian Aghajanzadeh', role: 'Founder', photo: '/images/team/arian-aghajanzadeh.jpg' },
  { name: 'Darren Sholes', role: 'Senior Consultant', photo: '/images/team/darren-sholes.jpg' },
]

// Retained only to keep the dropped-but-not-deleted SDG section below type-checked.
const sdgs = [
  { number: 2, name: 'Zero Hunger', color: '#DDA63A' },
  { number: 6, name: 'Clean Water and Sanitation', color: '#26BDE2' },
  { number: 7, name: 'Affordable and Clean Energy', color: '#FCC30B' },
  { number: 9, name: 'Industry, Innovation and Infrastructure', color: '#F36D25' },
  { number: 11, name: 'Sustainable Cities and Communities', color: '#FD9D24' },
  { number: 12, name: 'Responsible Consumption and Production', color: '#BF8B2E' },
  { number: 13, name: 'Climate Action', color: '#3F7E44' },
  { number: 15, name: 'Life on Land', color: '#56C02B' },
]

export default function AboutPage() {
  return (
    <div>
      {/* ============ MISSION ============ */}
      <section className="border-b border-kc-border bg-kc-bg">
        <div className="mx-auto max-w-[1000px] px-8 pt-[100px] pb-[88px] text-center">
          <FadeIn>
            <div className="mb-7 flex items-center justify-center gap-3">
              <span className="block h-[2px] w-7 shrink-0 bg-kc-yellow" aria-hidden="true" />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-kc-text-lead">
                {MISSION.kicker}
              </span>
              <span className="block h-[2px] w-7 shrink-0 bg-kc-yellow" aria-hidden="true" />
            </div>
            <h1 className="m-0 mb-7 font-heading text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-kc-dark md:text-[48px]">
              {MISSION.title}
            </h1>
            <p className="mx-auto m-0 max-w-[640px] font-body text-[17px] leading-[1.8] text-kc-text-lead">
              {MISSION.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-8 py-24 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <Kicker className="mb-4">{STORY.kicker}</Kicker>
            <h2 className="m-0 mb-[26px] font-heading text-[30px] font-semibold tracking-[-0.02em] text-kc-dark md:text-[36px]">
              {STORY.title}
            </h2>
            {STORY.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`m-0 font-body text-[15.5px] leading-[1.85] text-kc-text-lead ${
                  i < STORY.paragraphs.length - 1 ? 'mb-[18px]' : ''
                }`}
              >
                {p}
              </p>
            ))}
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative h-[300px] overflow-hidden rounded-md shadow-[0_24px_60px_rgba(15,76,129,0.14)] md:h-[400px]">
              {/* Source: klimate-owned */}
              <Image src={STORY.image} alt={STORY.imageAlt} fill className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/*
        Dropped in redesign pending client confirmation — see IMPLEMENTATION_PLAN
        open item #2. The old "Impact Focus" section (intro copy, the emissions
        trajectory chart, and the paired GHG-by-sector / industries charts) is
        not part of the new mock. Left inert (not deleted) below.
      */}
      {false && (
        <section className="bg-kc-bg-grey">
          <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
            <h2 className="mb-6 text-center font-heading text-3xl font-bold text-kc-dark">
              Our Impact Focus
            </h2>
            <div className="mx-auto mb-12 max-w-3xl space-y-4 font-body leading-relaxed text-kc-text-secondary">
              <p>
                <strong className="text-kc-dark">The math is clear.</strong> To limit global
                temperature rise to between 1.5&deg;C and 2&deg;C and avoid the worst effects of
                climate change — prolonged droughts, extreme weather events, and lost biodiversity
                — we need to reduce emissions and remove carbon from the atmosphere. Now.
              </p>
              <p>
                Klimate is doing its part by helping industries decarbonize and working to
                transform our agricultural and food systems into the largest carbon sink on Earth.
              </p>
            </div>

            <div className="mx-auto mb-16 max-w-4xl">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                {/* Source: klimate-owned */}
                <Image
                  src="/images/charts/global-warming-v2.png"
                  alt="Global emissions trajectory: business-as-usual versus a path to net-zero by mid-century and net-negative beyond, combining conventional mitigation with carbon removal."
                  width={1200}
                  height={750}
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <div className="mx-auto mt-6 max-w-3xl text-center">
                <h3 className="mb-3 font-heading text-xl font-bold text-kc-dark">
                  Bending the Curve
                </h3>
                <p className="font-body text-base leading-relaxed text-kc-text-secondary">
                  This is the trajectory we work toward: pulling the line away from
                  business-as-usual, reaching net-zero by mid-century, then net-negative through
                  carbon removal. Every Klimate engagement — from microgrid deployments and energy
                  management research to food-system decarbonization and water modernization — is
                  aimed at moving that line.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
              <div className="flex h-full flex-col">
                <div className="flex flex-1 items-center justify-center rounded-xl bg-white p-4 shadow-sm">
                  {/* Source: klimate-owned */}
                  <Image
                    src="/images/charts/ghg-by-sector.png"
                    alt="Global greenhouse gas emissions by economic sector: 25% electricity & heat, 24% agriculture/forestry/land use, 21% industry, 14% transportation, 10% other energy, 6% buildings."
                    width={600}
                    height={750}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
                <p className="mt-3 px-2 text-center font-body text-sm text-kc-text-secondary">
                  Where the emissions live. Industry plus agriculture, forestry, and land use are{' '}
                  <span className="font-semibold text-kc-blue">45%</span> of the global total.
                </p>
              </div>
              <div className="flex h-full flex-col">
                <div className="flex flex-1 items-center justify-center rounded-xl bg-white p-4 shadow-sm">
                  {/* Source: klimate-owned */}
                  <Image
                    src="/images/charts/industries-chart.png"
                    alt="Klimate Consulting's focus areas as overlapping circles — Carbon, Agriculture, Water, and Energy — converging at the Food System."
                    width={600}
                    height={600}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
                <p className="mt-3 px-2 text-center font-body text-sm text-kc-text-secondary">
                  Where we work. Carbon, agriculture, water, and energy — overlapping in the food
                  system that ties them all together.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ WHERE WE WORK ============ */}
      <section className="bg-kc-bg-grey">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-8 py-24 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <FadeIn>
            <Kicker className="mb-4">{WHERE_WE_WORK.kicker}</Kicker>
            <h2 className="m-0 mb-6 font-heading text-[30px] font-semibold tracking-[-0.02em] text-kc-dark md:text-[36px]">
              {WHERE_WE_WORK.title}
            </h2>
            <p className="m-0 font-body text-[15.5px] leading-[1.85] text-kc-text-lead">
              {WHERE_WE_WORK.paragraph}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-lg border border-kc-border bg-white p-10">
              {/* Source: klimate-owned */}
              <Image
                src={WHERE_WE_WORK.chart}
                alt={WHERE_WE_WORK.chartAlt}
                width={600}
                height={600}
                className="h-auto w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/*
        Dropped in redesign pending client confirmation — see IMPLEMENTATION_PLAN
        open item #2. SDG alignment grid is not part of the new mock. Left inert
        (not deleted) below.
      */}
      {false && (
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
            <SectionHeader
              title="Aligned with the UN Sustainable Development Goals"
              subtitle="Klimate Consulting's work contributes to 8 of the 17 United Nations Sustainable Development Goals."
            />

            <div className="mx-auto mb-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {sdgs.map((sdg) => (
                <div
                  key={sdg.number}
                  className="flex flex-col items-center rounded-lg p-4"
                  style={{ backgroundColor: sdg.color + '15' }}
                >
                  <div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg font-heading text-lg font-bold text-white"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.number}
                  </div>
                  <span className="text-center font-body text-xs text-kc-dark">{sdg.name}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-kc-light-green p-6">
                <h3 className="mb-3 font-heading font-bold text-kc-dark">Food And Agriculture</h3>
                <p className="font-body text-sm text-kc-text-secondary">
                  By making our soil healthier and agriculture system regenerative, we not only
                  help reduce emissions and sequester carbon, but we also encourage higher yields,
                  less chemical inputs, and healthier communities.
                </p>
              </div>
              <div className="rounded-xl bg-kc-bg-blue p-6">
                <h3 className="mb-3 font-heading font-bold text-kc-dark">Water And Energy</h3>
                <p className="font-body text-sm text-kc-text-secondary">
                  By working on addressing energy and water management, we not only ensure clean,
                  reliable and safe water and power for everyone, but also promote sustainable
                  cities and communities.
                </p>
              </div>
              <div className="rounded-xl bg-kc-light-brown p-6">
                <h3 className="mb-3 font-heading font-bold text-kc-dark">Carbon And Emissions</h3>
                <p className="font-body text-sm text-kc-text-secondary">
                  By decarbonizing our economy, we empower our industries to innovate and produce
                  responsibly, reduce greenhouse gas emissions, reverse climate change, and improve
                  life on our planet.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ TEAM PREVIEW ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 py-24 text-center">
          <FadeIn>
            <h2 className="m-0 mb-12 font-heading text-[30px] font-semibold tracking-[-0.02em] text-kc-dark md:text-[36px]">
              The team
            </h2>
            <div className="mb-10 flex flex-wrap justify-center gap-16">
              {TEAM_PREVIEW.map((member) => (
                <Link key={member.name} href="/team/" className="group">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={140}
                    height={140}
                    className="mx-auto mb-[18px] block h-[140px] w-[140px] rounded-full object-cover shadow-[0_12px_32px_rgba(15,76,129,0.14)]"
                  />
                  <div className="font-heading text-lg font-semibold text-kc-dark group-hover:text-kc-blue">
                    {member.name}
                  </div>
                  <div className="mt-1 font-body text-[13px] text-kc-text-lead">{member.role}</div>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              <Link href="/team/" className="font-body text-[13.5px] font-semibold text-kc-blue hover:text-kc-blue-dark">
                Meet the full team →
              </Link>
              <Link href="/research/" className="font-body text-[13.5px] font-semibold text-kc-blue hover:text-kc-blue-dark">
                Explore our research &amp; publications →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTABand
        heading="Let's talk."
        subline="Tell us about your organization and what you're trying to figure out."
        buttonLabel="Get in touch"
      />
    </div>
  )
}
