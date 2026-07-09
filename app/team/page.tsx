import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTABand from '@/components/shared/CTABand'
import FadeIn from '@/components/shared/FadeIn'
import Kicker from '@/components/shared/Kicker'
import SectorStripe from '@/components/shared/SectorStripe'

export const metadata: Metadata = {
  title: 'Team — Klimate Consulting',
  alternates: { canonical: '/team/' },
  description:
    'Meet the Klimate Consulting team. Experts in sustainability research, energy, water, and agriculture.',
}

// Draft copy from the mock — kept editable here, client rewrites messaging later.
const HEADER = {
  kicker: 'Team',
  intro:
    'A small team with deep expertise in research, data science, and technical consulting. The people you meet are the people doing the work.',
}

interface Member {
  name: string
  role: string
  photo: string
  bio: string[]
  education?: string
  showPublications?: boolean
}

// Bios lifted verbatim from the pre-redesign team page; the closing degree
// sentence for Arian now lives in the separate Education panel below.
const TEAM: Member[] = [
  {
    name: 'Arian Aghajanzadeh',
    role: 'Founder',
    photo: '/images/team/arian-aghajanzadeh.jpg',
    bio: [
      'Arian has 10 years of experience working with industrial, agricultural, water, and energy stakeholders in the U.S. and globally. Arian has been recognized as the subject matter expert in energy and water use in irrigated agriculture.',
      'Prior to launching Klimate Consulting, Arian was the Head of Sustainability at an agricultural technology startup. In that role, he was responsible for standing up a sustainability initiative for permanent crop farmers in California, leading activities to understand tree nut farming footprint including greenhouse gas emissions and water as well as carbon sequestration potential through regenerative farming.',
    ],
    education:
      "BS Chemical Engineering, UC Berkeley · MS Chemical Engineering + Dean's Certificate in Energy Engineering and Economics, Cornell University",
    showPublications: true,
  },
  {
    name: 'Darren Sholes',
    role: 'Senior Consultant',
    photo: '/images/team/darren-sholes.jpg',
    bio: [
      'Darren brings 10 years of experience working at the intersection of advanced manufacturing, renewable energy technology and data science in the public and private sector. Prior to Klimate Consulting, Darren provided technical assistance to the Department of Energy, with a focus on the water-energy nexus in manufacturing.',
      'He has also worked as a data science consultant, building Social Network Analysis tools to strengthen international development ecosystems. Most recently, he worked with giga-scale battery manufacturers, building tools to enhance quality and efficiency in their factories.',
    ],
  },
]

export default function TeamPage() {
  return (
    <div>
      {/* ============ PAGE HEADER ============ */}
      <section className="border-b border-kc-border bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 pt-[88px] pb-[72px]">
          <FadeIn>
            <Kicker accent="#70A288" className="mb-6">
              {HEADER.kicker}
            </Kicker>
            <div className="grid items-end gap-10 lg:grid-cols-[7fr_5fr] lg:gap-[72px]">
              <h1 className="m-0 font-heading text-[44px] font-semibold leading-[1.08] tracking-[-0.025em] text-kc-dark md:text-[56px]">
                Senior researchers.
                <br />
                No pass-throughs.
              </h1>
              <p className="m-0 font-body text-base leading-[1.8] text-kc-text-lead">
                {HEADER.intro}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ PROFILES ============ */}
      <section className="bg-kc-bg">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[88px] px-8 pt-24 pb-[110px]">
          {TEAM.map((member, i) => (
            <div key={member.name}>
              {i > 0 && <div className="mb-[88px] border-t border-kc-divider" aria-hidden="true" />}
              <FadeIn className="grid grid-cols-1 items-start gap-10 md:grid-cols-[320px_1fr] md:gap-16">
                <div>
                  <div className="relative h-[280px] w-full overflow-hidden rounded-md shadow-[0_20px_48px_rgba(15,76,129,0.12)] md:h-[360px]">
                    {/* Source: klimate-owned */}
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <SectorStripe variant="mini" className="mt-4" />
                </div>
                <div>
                  <h2 className="m-0 mb-[6px] font-heading text-[32px] font-semibold leading-[1.2] tracking-[-0.015em] text-kc-dark">
                    {member.name}
                  </h2>
                  <div className="mb-[26px] font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-kc-blue">
                    {member.role}
                  </div>
                  {member.bio.map((p, idx) => (
                    <p
                      key={idx}
                      className={`m-0 font-body text-[15px] leading-[1.85] text-kc-text-lead ${
                        idx < member.bio.length - 1 ? 'mb-[18px]' : 'mb-7'
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                  {member.education && (
                    <div className="mb-6 rounded-md bg-kc-bg-grey px-6 py-5">
                      <div className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                        Education
                      </div>
                      <div className="font-body text-[13.5px] leading-[1.7] text-kc-text-lead">
                        {member.education}
                      </div>
                    </div>
                  )}
                  {member.showPublications && (
                    <Link
                      href="/research/"
                      className="font-body text-[13.5px] font-semibold text-kc-blue hover:text-kc-blue-dark"
                    >
                      Explore Arian&apos;s research &amp; publications →
                    </Link>
                  )}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        heading="Work directly with us."
        subline="No account managers, no hand-offs — just the researchers."
        buttonLabel="Get in touch"
      />
    </div>
  )
}
