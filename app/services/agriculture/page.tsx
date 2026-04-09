import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'

export const metadata: Metadata = {
  title: 'Agriculture Sustainability Consulting | Klimate Consulting',
  description:
    'Research-based guidance on agricultural decarbonization, soil carbon, and sustainable farming systems. We help clients reduce emissions from farm to fork.',
}

export default function AgriculturePage() {
  return (
    <div className="pt-20">
      <section className="relative py-28 md:py-36 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/agriculture-hero.jpg"
            alt="Aerial view of agricultural crop rows"
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
            <Image src="/icons/agriculture-white.png" alt="" width={48} height={48} className="w-12 h-12 object-contain" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Agriculture</h1>
          </div>
          <p className="font-body text-lg text-gray-200 max-w-2xl">
            Our soils are degrading. Our water resources are dwindling. Agriculture is both a major
            emissions source and our greatest opportunity to sequester carbon.
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
              Agriculture accounts for roughly 11.5% of U.S. greenhouse gas emissions — and when
              you include the broader food system, that number rises to nearly a third of global
              emissions. But agriculture is also uniquely positioned: with the right practices,
              farmland can shift from being a carbon source to the world&apos;s largest carbon sink.
            </p>
            <p>
              We work with farming operations, agtech companies, and food companies to reduce their
              environmental footprint and build regenerative systems that sequester carbon, improve
              soil health, and increase long-term productivity.
            </p>
            <h3>Our Agriculture Services</h3>
            <ul>
              <li>Farm production analytics and crop data analysis</li>
              <li>Agricultural census data insights</li>
              <li>Carbon sequestration research and soil carbon assessment</li>
              <li>Agricultural GHG emissions measurement and reduction strategies</li>
              <li>Controlled Environment Agriculture (CEA) technology evaluation</li>
              <li>Regenerative agriculture advisory</li>
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Projects
            </h3>
            <div className="space-y-3">
              <Link href="/projects/cea-lbnl/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-green dark:hover:bg-kc-green/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Controlled Environment Agriculture</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-400 mt-1">$2.5M DOE initiative with LBNL</span>
              </Link>
              <Link href="/projects/carbon-market-carba/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-green dark:hover:bg-kc-green/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Carbon Market Research — Biochar CDR</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-400 mt-1">Carba — voluntary carbon markets</span>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Insights
            </h3>
            <div className="space-y-3">
              <Link href="/insights/decarbonizing-agriculture-part-1/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-green dark:hover:bg-kc-green/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Decarbonizing Agriculture Part 1: Understanding Emissions Sources</span>
              </Link>
              <Link href="/insights/decarbonizing-agriculture-part-2/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-green dark:hover:bg-kc-green/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Decarbonizing Agriculture Part 2: Reduction Strategies</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Button href="/contact/" variant="primary">
              Discuss an Agriculture Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
