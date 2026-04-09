import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'

export const metadata: Metadata = {
  title: 'Water Resource Management Consulting | Klimate Consulting',
  description:
    'Modernizing water management for a climate-changed world. Klimate Consulting works with utilities, agencies, and NGOs on data-driven water strategy.',
}

export default function WaterPage() {
  return (
    <div className="pt-20">
      <section className="relative py-28 md:py-36 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/water-hero.jpg"
            alt="Aerial view of Lake Berryessa reservoir, California"
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
            <Image src="/icons/water-white.png" alt="" width={48} height={48} className="w-12 h-12 object-contain" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Water</h1>
          </div>
          <p className="font-body text-lg text-gray-200 max-w-2xl">
            Most of the world&apos;s population lives in water-stressed regions. California manages
            its water with laws from the 1800s and infrastructure from the 1900s. We research how to
            modernize water management for the 21st century.
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
              California&apos;s water system — the largest in the world — was built for a climate
              that no longer exists. Snowpack is declining, groundwater basins are overdrafted, and
              the state&apos;s agricultural water delivery network remains the single largest
              electricity consumer in the state. Effective management requires data-driven
              modernization, but most water agencies still lack the granular data needed to make
              informed decisions.
            </p>
            <p>
              We help organizations understand and address water challenges through research,
              data analysis, and strategic advisory — with a particular focus on California&apos;s water
              infrastructure and policy landscape.
            </p>
            <h3>Our Water Services</h3>
            <ul>
              <li>Water management R&D and policy analysis</li>
              <li>Infrastructure modernization research</li>
              <li>Water data analysis and dashboard development</li>
              <li>Water-energy nexus assessment</li>
              <li>Agricultural water delivery network analysis</li>
              <li>SGMA compliance support and groundwater analysis</li>
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Projects
            </h3>
            <div className="space-y-3">
              <Link href="/projects/water-system-nrdc/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-blue dark:hover:bg-kc-blue/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Modernization of California&apos;s Agricultural Water Delivery Network</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-400 mt-1">Natural Resources Defense Council</span>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Insights
            </h3>
            <div className="space-y-3">
              <Link href="/insights/california-water-dilemma-part-1/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-blue dark:hover:bg-kc-blue/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">California&apos;s Water Dilemma Part 1: We Cannot Manage What We Don&apos;t Measure</span>
              </Link>
              <Link href="/insights/california-water-dilemma-part-2/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-blue dark:hover:bg-kc-blue/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">California&apos;s Water Dilemma Part 2: Water [Data] Scarcity</span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://data.klimateconsulting.com/ca-water/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-kc-blue dark:text-kc-light-blue font-semibold hover:underline"
            >
              Explore the California Water Intelligence Dashboard &rarr;
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Button href="/contact/" variant="primary">
              Discuss a Water Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
