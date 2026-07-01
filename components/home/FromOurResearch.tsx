import Link from 'next/link'
import InsightCard from '@/components/shared/InsightCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { getInsightBySlug } from '@/lib/mdx'

// Hand-picked to span sectors (water, agriculture, ecosystem). Data is pulled
// from each post's frontmatter so titles/images stay in sync.
const featuredSlugs = [
  'price-of-water-california',
  'decarbonizing-agriculture-part-1',
  'sargassum-golden-tide',
]

export default function FromOurResearch() {
  const posts = featuredSlugs.map((slug) => ({ slug, ...getInsightBySlug(slug).frontmatter }))

  return (
    <section className="py-20 md:py-28 bg-kc-bg-grey dark:bg-kc-dark">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="From Our Research"
          subtitle="Applied, research-grade analysis of sustainability, water, and food-system challenges."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <InsightCard key={post.slug} {...post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/insights/"
            className="text-kc-blue dark:text-kc-light-blue font-body font-semibold hover:underline"
          >
            View all insights &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
