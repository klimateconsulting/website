import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/shared/SectionHeader'

export const metadata: Metadata = {
  title: 'About — Klimate Consulting',
  description:
    'Our mission: make sustainability understandable and achievable. Based in San Francisco, serving NGOs, government labs, and private sector clients.',
}

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
    <div className="pt-20">
      {/* Mission */}
      <section className="py-20 md:py-28 bg-kc-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Our mission is to make sustainability understandable and achievable.
          </h1>
          <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto">
            Navigating the complexities of today&apos;s sustainability landscape can be overwhelming.
            At Klimate Consulting, we distill these intricacies into actionable insights for our
            clients.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-kc-dark dark:text-white mb-6">
                Our Story
              </h2>
              <div className="font-body text-kc-text-secondary dark:text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Klimate Consulting was founded on a simple but urgent premise: the organizations
                  best positioned to drive sustainability progress often lack the specialized
                  expertise to do it. We bridge that gap.
                </p>
                <p>
                  Based in San Francisco, we work at the intersection of applied research, data
                  analysis, and technical consulting — with a deep focus on the sectors that matter
                  most for decarbonization: agriculture, energy, water, and food systems.
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
              {/* Source: klimate-owned */}
              <Image
                src="/images/projects/energy-water-management.png"
                alt="Klimate Consulting project work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Focus */}
      <section className="py-16 md:py-20 bg-kc-bg-grey dark:bg-kc-dark-alt">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-kc-dark dark:text-white mb-6 text-center">
            Our Impact Focus
          </h2>
          <div className="max-w-3xl mx-auto font-body text-kc-text-secondary dark:text-gray-300 space-y-4 leading-relaxed mb-12">
            <p>
              <strong className="text-kc-dark dark:text-white">The math is clear.</strong> To limit
              global temperature rise to between 1.5&deg;C and 2&deg;C and avoid the worst effects
              of climate change — prolonged droughts, extreme weather events, and lost biodiversity —
              we need to reduce emissions and remove carbon from the atmosphere. Now.
            </p>
            <p>
              Klimate is doing its part by helping industries decarbonize and working to transform
              our agricultural and food systems into the largest carbon sink on Earth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Source: klimate-owned */}
            <div className="rounded-xl overflow-hidden bg-white p-4 shadow-sm dark:shadow-none">
              <Image
                src="/images/charts/global-warming-v2.png"
                alt="Global warming chart showing temperature rise scenarios"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="rounded-xl overflow-hidden bg-white p-4 shadow-sm dark:shadow-none">
              <Image
                src="/images/charts/ghg-by-sector.png"
                alt="Global greenhouse gas emissions by economic sector"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="font-body text-lg text-kc-dark dark:text-white">
              We focus on decarbonizing industry, agriculture, forestry, and other land use, which
              combined make up about{' '}
              <span className="font-heading font-bold text-2xl text-kc-blue">45%</span> of global
              emissions.
            </p>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            title="Aligned with the UN Sustainable Development Goals"
            subtitle="Klimate Consulting's work contributes to 8 of the 17 United Nations Sustainable Development Goals."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {sdgs.map((sdg) => (
              <div
                key={sdg.number}
                className="flex flex-col items-center p-4 rounded-lg"
                style={{ backgroundColor: sdg.color + '15' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-heading font-bold text-lg mb-2"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.number}
                </div>
                <span className="text-xs text-center font-body text-kc-dark dark:text-white">
                  {sdg.name}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-kc-light-green dark:bg-kc-green/10 rounded-xl p-6">
              <h3 className="font-heading font-bold text-kc-dark dark:text-white mb-3">
                Food And Agriculture
              </h3>
              <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300">
                By making our soil healthier and agriculture system regenerative, we not only help
                reduce emissions and sequester carbon, but we also encourage higher yields, less
                chemical inputs, and healthier communities.
              </p>
            </div>
            <div className="bg-kc-bg-blue dark:bg-kc-blue/10 rounded-xl p-6">
              <h3 className="font-heading font-bold text-kc-dark dark:text-white mb-3">
                Water And Energy
              </h3>
              <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300">
                By working on addressing energy and water management, we not only ensure clean,
                reliable and safe water and power for everyone, but also promote sustainable cities
                and communities.
              </p>
            </div>
            <div className="bg-kc-light-brown dark:bg-kc-brown/10 rounded-xl p-6">
              <h3 className="font-heading font-bold text-kc-dark dark:text-white mb-3">
                Carbon And Emissions
              </h3>
              <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300">
                By decarbonizing our economy, we empower our industries to innovate and produce
                responsibly, reduce greenhouse gas emissions, reverse climate change, and improve
                life on our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-16 md:py-20 bg-kc-bg-grey dark:bg-kc-dark-alt">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-kc-dark dark:text-white mb-6">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto mb-8">
            {[
              { name: 'Arian Aghajanzadeh', role: 'Founder', photo: '/images/team/arian-aghajanzadeh.jpg' },
              { name: 'Darren Sholes', role: 'Senior Consultant', photo: '/images/team/darren-sholes.jpg' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                {/* Source: klimate-owned */}
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-heading font-bold text-kc-dark dark:text-white">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/team/"
            className="text-kc-blue dark:text-kc-light-blue font-semibold hover:underline"
          >
            Meet the full team &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
