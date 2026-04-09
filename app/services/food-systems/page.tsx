import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'

export const metadata: Metadata = {
  title: 'Food Systems Consulting | Klimate Consulting',
  description:
    'Emission accounting, supply chain analysis, and Scope 3 reporting for the food and beverage industry. Farm to fork sustainability consulting.',
}

export default function FoodSystemsPage() {
  return (
    <div className="pt-20">
      <section className="relative py-28 md:py-36 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/food-systems-hero.jpg"
            alt="Fresh produce and vegetables"
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
            <Image src="/icons/food-white.png" alt="" width={48} height={48} className="w-12 h-12 object-contain" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Food Systems</h1>
          </div>
          <p className="font-body text-lg text-gray-200 max-w-2xl">
            Our food system is the single largest source of greenhouse gas emissions on Earth. We
            help clients understand and account for food-related emissions from farm to fork,
            enabling smarter Scope 3 reporting.
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
              Our global food system is responsible for roughly one-third of all greenhouse gas
              emissions — more than any other single sector. From livestock methane and fertilizer
              nitrous oxide to food processing energy and cold-chain logistics, emissions are
              embedded at every stage from farm to fork. For companies facing Scope 3 reporting
              requirements, the food supply chain is often the most complex and opaque part of
              their carbon footprint.
            </p>
            <p>
              We help organizations navigate this complexity with research-based analysis and
              strategic guidance — whether that means building a Scope 3 inventory, evaluating
              carbon credit quality, or understanding the lifecycle impact of specific products.
            </p>
            <h3>Our Food Systems Services</h3>
            <ul>
              <li>Scope 3 emission accounting and reporting</li>
              <li>Food supply chain analysis</li>
              <li>Carbon insetting and offsetting strategy</li>
              <li>Life Cycle Assessment (LCA)</li>
              <li>Food system data analysis and visualization</li>
              <li>Voluntary carbon market guidance for food companies</li>
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Projects
            </h3>
            <div className="space-y-3">
              <Link href="/projects/voluntary-carbon-ceres/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-brown dark:hover:bg-kc-brown/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Voluntary Carbon Markets & Natural Climate Solutions Research</span>
                <span className="block text-sm text-kc-text-secondary dark:text-gray-400 mt-1">Ceres — carbon credits in F&B industry</span>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-4">
              Related Insights
            </h3>
            <div className="space-y-3">
              <Link href="/insights/navigating-esg-disclosure/" className="block p-4 bg-kc-bg-grey dark:bg-kc-dark-card rounded-lg hover:bg-kc-light-brown dark:hover:bg-kc-brown/10 transition-colors">
                <span className="font-heading font-bold text-kc-dark dark:text-white">Navigating the ESG Disclosure Landscape</span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://data.klimateconsulting.com/food-ag/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-kc-blue dark:text-kc-light-blue font-semibold hover:underline"
            >
              Explore the Food & Ag Data Dashboard &rarr;
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Button href="/contact/" variant="primary">
              Discuss a Food Systems Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
