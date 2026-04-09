import type { Metadata } from 'next'
import { Droplets, Wheat, Zap, BarChart3 } from 'lucide-react'
import Button from '@/components/shared/Button'

export const metadata: Metadata = {
  title: 'Klimate Data Labs — Open Sustainability Dashboards',
  description:
    'Free, open-source data dashboards for California water, U.S. food systems, and industrial energy efficiency.',
}

const dashboards = [
  {
    title: 'California Water Intelligence Dashboard',
    description:
      'NOAA, CDEC, CA DWR data. Drought conditions, precipitation indices, reservoir levels, 1,900+ water district maps.',
    href: 'https://data.klimateconsulting.com/ca-water/',
    icon: Droplets,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    title: 'U.S. Food & Agriculture Value Chain',
    description:
      'USDA, Census, EPA, EIA, 11 datasets. End-to-end food system across 8 dimensions.',
    href: 'https://data.klimateconsulting.com/food-ag/',
    icon: Wheat,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    title: 'EnMS Improvement Opportunity Finder',
    description:
      'DOE IAC, 18,000+ assessments, 125,000+ recommendations.',
    href: 'https://data.klimateconsulting.com/enms/',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
  },
  {
    title: 'EnMS Insights Database',
    description:
      'ISO 50001/SEP, 386 case studies, 47+ countries.',
    href: 'https://data.klimateconsulting.com/enms-insights/',
    icon: BarChart3,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
  },
]

export default function DataLabsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 md:py-28 bg-kc-blue text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Klimate Data Labs</h1>
          <p className="font-body text-lg text-blue-100 max-w-2xl mx-auto">
            We believe sustainability data should be open, accessible, and visually compelling. Our
            Data Labs is a collection of open-source dashboards and data tools built on public
            federal and state datasets. All tools are free to use.
          </p>
        </div>
      </section>

      {/* Dashboard cards */}
      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dashboards.map((dash) => (
              <a
                key={dash.title}
                href={dash.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${dash.bg} rounded-xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}
              >
                <dash.icon className={`w-10 h-10 ${dash.color} mb-4`} />
                <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-3 group-hover:text-kc-blue dark:group-hover:text-kc-light-blue transition-colors">
                  {dash.title}
                </h3>
                <p className="font-body text-sm text-kc-text-secondary dark:text-gray-400 leading-relaxed mb-4">
                  {dash.description}
                </p>
                <span className="text-kc-blue dark:text-kc-light-blue text-sm font-semibold">
                  Open Dashboard &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-kc-bg-grey dark:bg-kc-dark/40 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-kc-dark dark:text-white mb-4">
            Explore All Data Labs
          </h2>
          <p className="font-body text-lg text-kc-text-secondary dark:text-gray-400 mb-8 max-w-xl mx-auto">
            All dashboards are free, open-source, and built on publicly available datasets.
          </p>
          <Button href="https://data.klimateconsulting.com" variant="primary" external>
            Open Data Lab &rarr;
          </Button>
        </div>
      </section>
    </div>
  )
}
