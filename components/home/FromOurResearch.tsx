import Link from 'next/link'
import Kicker from '@/components/shared/Kicker'
import JournalRow from '@/components/shared/JournalRow'
import { getAllInsights } from '@/lib/mdx'

export default function FromOurResearch() {
  const posts = getAllInsights().slice(0, 3)

  return (
    <section className="bg-kc-bg">
      <div className="mx-auto max-w-[1240px] px-8 pt-5 pb-[110px]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <Kicker className="mb-4">From our research</Kicker>
            <h2 className="font-heading text-[40px] font-semibold tracking-[-0.02em] text-kc-dark m-0">
              Analysis you can cite
            </h2>
          </div>
          <Link
            href="/insights/"
            className="font-body text-[13.5px] font-semibold text-kc-blue hover:text-kc-blue-dark transition-colors"
          >
            All insights →
          </Link>
        </div>

        <div className="flex flex-col border-t border-kc-divider">
          {posts.map((post) => (
            <JournalRow
              key={post.slug}
              href={`/insights/${post.slug}/`}
              date={post.frontmatter.date}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              sector={post.frontmatter.sector}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
