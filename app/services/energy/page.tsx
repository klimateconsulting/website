import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'

export const metadata: Metadata = {
  title: 'Energy Consulting | Klimate Consulting',
  description:
    'Microgrid solutions, energy management R&D, and industrial energy efficiency consulting. Building a more resilient energy future.',
}

export default function EnergyPage() {
  return (
    <div className="pt-20">
      <section className="relative py-28 md:py-36 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/energy-hero.jpg"
            alt="Solar panel array under blue sky"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-kc-dark/60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            {/* Source: klimate-owned */}
            <Image src="/icons/energy-white.png" alt="" width={48} height={48} className="w-12 h-12 object-contain" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Energy</h1>
          </div>
          <p className="font-body text-lg text-gray-200 max-w-2xl">
            The energy transition is accelerating — but climate change is now threatening energy
            security itself. We develop microgrid solutions and conduct energy management R&D to
            build a more resilient energy future.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold text-kc-dark dark:text-white mb-6">
            What We Do
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              The energy sector is in the middle of a generational transformation. Decarbonization
              targets are accelerating demand for clean energy, but climate change itself is now
              threatening the grid — through extreme heat, wildfires, and shifting demand patterns.
            </p>
            <p>
              We help organizations navigate this dual challenge with research-based solutions that
              span microgrid development, energy management systems, and industrial efficiency.
              Our work bridges the gap between DOE research programs and real-world implementation.
            </p>
            <h3>Our Energy Services</h3>
            <ul>
              <li>Microgrid project development and evaluation</li>
              <li>Energy management systems (EnMS) research and implementation</li>
              <li>Industrial energy efficiency analysis</li>
              <li>DOE program support and technical assistance</li>
              <li>Water-energy nexus research</li>
              <li>Distributed energy resource assessment</li>
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Projects
            </h3>
            <div className="space-y-3">
              <Link href="/projects/energy-water-lbnl/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-yellow dark:hover:bg-kc-yellow/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Energy & Water Management Systems Research</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-400 mt-1">Lawrence Berkeley National Laboratory</span>
              </Link>
              <Link href="/projects/microgrid-scale/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-yellow dark:hover:bg-kc-yellow/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Microgrid Project Development</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-400 mt-1">Scale Microgrid Solutions</span>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Insights
            </h3>
            <div className="space-y-3">
              <Link href="/insights/california-water-dilemma-part-1/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-yellow dark:hover:bg-kc-yellow/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">California&apos;s Water Dilemma: We Cannot Manage What We Don&apos;t Measure</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-300 mt-1">Covers the water-energy nexus and infrastructure challenges</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Button href="/contact/" variant="primary">
              Discuss an Energy Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
