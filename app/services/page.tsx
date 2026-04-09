import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/shared/SectionHeader'
import Button from '@/components/shared/Button'

export const metadata: Metadata = {
  title: 'Services — Klimate Consulting',
  description:
    'Technical analysis, applied research, data analytics, and policy guidance for agriculture, energy, water, and food systems.',
}

const serviceTypes = [
  'Technical Analysis & Report Writing',
  'Applied Research',
  'Data Analysis & Visualization',
  'R&D Support',
  'Technical Content Creation',
  'Technology Evaluation',
  'Market Research',
  'Policy Analysis',
]

const sectors = [
  {
    name: 'Agriculture',
    icon: '/icons/agriculture-color.png',
    href: '/services/agriculture/',
    color: 'border-l-kc-green',
    problem:
      'Soil degradation, water overuse, agriculture as emissions source and carbon sink opportunity.',
    solution:
      'Farm production analytics, crop data analysis, agricultural census insights, carbon sequestration research.',
  },
  {
    name: 'Energy',
    icon: '/icons/energy-color.png',
    href: '/services/energy/',
    color: 'border-l-kc-yellow',
    problem: 'Grid stress, climate threats to energy security, transition needs.',
    solution:
      'Microgrid solutions, energy management R&D, industrial energy efficiency, DOE program support.',
  },
  {
    name: 'Water',
    icon: '/icons/water-color.png',
    href: '/services/water/',
    color: 'border-l-kc-blue',
    problem:
      "Most of the world's population lives in water-stressed regions. California manages water with laws from the 1800s.",
    solution:
      'Water management R&D, infrastructure modernization research, water data analysis.',
  },
  {
    name: 'Food Systems',
    icon: '/icons/food-color.png',
    href: '/services/food-systems/',
    color: 'border-l-kc-brown',
    problem: 'Largest GHG emitter globally, complex supply chain, Scope 3 challenges.',
    solution:
      'Emission accounting, supply chain analysis, carbon insetting, LCA, food system data.',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 md:py-28 bg-kc-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            How We Help Our Clients
          </h1>
          <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto">
            Klimate Consulting offers professional services focused on agriculture, energy, water,
            and our food system. The ultimate goal is to conserve resources and reduce greenhouse gas
            emissions.
          </p>
        </div>
      </section>

      {/* Service types */}
      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-kc-dark dark:text-white mb-8 text-center">
            Services We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes.map((service) => (
              <div
                key={service}
                className="p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg text-center"
              >
                <span className="font-body text-sm font-semibold text-kc-dark dark:text-white">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector deep-dives */}
      <section className="py-16 md:py-20 bg-kc-bg-grey dark:bg-kc-dark-alt">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader title="Our Focus Areas" />
          <div className="space-y-8">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className={`bg-white dark:bg-kc-dark-card rounded-xl p-8 border-l-4 ${sector.color} shadow-sm`}
              >
                <div className="flex items-start gap-6">
                  {/* Source: klimate-owned */}
                  <Image
                    src={sector.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-12 h-12 flex-shrink-0 mt-1 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-3">
                      {sector.name}
                    </h3>
                    <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 mb-2">
                      <strong>The challenge:</strong> {sector.problem}
                    </p>
                    <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 mb-4">
                      <strong>What we do:</strong> {sector.solution}
                    </p>
                    <Link
                      href={sector.href}
                      className="text-kc-blue dark:text-kc-light-blue text-sm font-semibold hover:underline"
                    >
                      Learn more &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-kc-blue text-white text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Have a project in mind?
          </h2>
          <p className="font-body text-lg text-blue-100 mb-8">
            Let&apos;s discuss how Klimate can support your sustainability goals.
          </p>
          <Button href="/contact/" variant="white">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  )
}
