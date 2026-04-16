'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import InsightCard from '@/components/shared/InsightCard'
import SectionHeader from '@/components/shared/SectionHeader'

interface Post {
  slug: string
  title: string
  date: string
  author: string
  sector: string
  description: string
  readingTime: number
  image?: string
}

const sectors = ['all', 'agriculture', 'energy', 'water', 'food-systems']
const sectorLabels: Record<string, string> = {
  all: 'All',
  agriculture: 'Agriculture',
  energy: 'Energy',
  water: 'Water',
  'food-systems': 'Food Systems',
}

const externalPubs = [
  {
    title: 'What Happened To Agricultural Demand Response?',
    source: 'Utility Dive',
    author: 'Arian Aghajanzadeh',
    href: 'https://www.utilitydive.com/news/what-happened-to-agricultural-demand-response/550829/',
  },
  {
    title: 'Food Eco-Labels: Re-Thinking Life Cycle Assessments',
    source: 'HowGood',
    author: 'Klimate Consulting',
    href: 'https://howgood.com/',
  },
]

export default function InsightsListClient({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.sector === filter)

  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            title="Insights"
            subtitle="Research-grade articles on sustainability, decarbonization, and natural resource management."
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 text-sm font-semibold font-body rounded-full transition-colors ${
                  filter === s
                    ? 'bg-kc-blue text-white'
                    : 'bg-kc-bg-grey dark:bg-kc-dark-card text-kc-text-secondary dark:text-gray-300 hover:bg-kc-light-blue dark:hover:bg-kc-blue/20'
                }`}
              >
                {sectorLabels[s]}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <InsightCard key={post.slug} {...post} />
            ))}
          </div>

          {/* External publications */}
          <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-heading text-2xl font-bold text-kc-dark dark:text-white mb-6">
              External Publications
            </h3>
            <div className="space-y-4">
              {externalPubs.map((pub) => (
                <a
                  key={pub.title}
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-kc-bg-grey dark:bg-kc-dark-card hover:bg-kc-light-blue dark:hover:bg-kc-blue/10 transition-colors group"
                >
                  <div>
                    <h4 className="font-heading font-bold text-kc-dark dark:text-white group-hover:text-kc-blue dark:group-hover:text-kc-light-blue transition-colors">
                      {pub.title}
                    </h4>
                    <p className="text-sm text-kc-text-secondary dark:text-gray-300 mt-1">
                      {pub.author} &middot; {pub.source}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-kc-text-secondary dark:text-gray-300 flex-shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
