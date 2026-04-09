import type { Metadata } from 'next'
import { getAllInsights } from '@/lib/mdx'
import InsightsListClient from './InsightsListClient'

export const metadata: Metadata = {
  title: 'Insights — Klimate Consulting',
  description:
    'Research-grade articles on agriculture, energy, water, and food systems decarbonization.',
}

export default function InsightsPage() {
  const insights = getAllInsights()

  const posts = insights.map((i) => ({
    slug: i.slug,
    ...i.frontmatter,
  }))

  return <InsightsListClient posts={posts} />
}
