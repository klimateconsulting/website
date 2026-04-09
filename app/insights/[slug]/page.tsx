import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllInsights, getInsightBySlug } from '@/lib/mdx'
import TagBadge from '@/components/shared/TagBadge'
import ReadingProgress from '@/components/shared/ReadingProgress'
import InsightCard from '@/components/shared/InsightCard'
import TableOfContents from '@/components/shared/TableOfContents'
import ShareBar from '@/components/shared/ShareBar'
import Callout from '@/components/mdx/Callout'
import Stat from '@/components/mdx/Stat'
import PullQuote from '@/components/mdx/PullQuote'
import ChartEmbed from '@/components/mdx/ChartEmbed'

const mdxComponents = { Callout, Stat, PullQuote, ChartEmbed }

const teamMembers: Record<string, { photo: string; bio: string } | null> = {
  'Arian Aghajanzadeh': {
    photo: '/images/team/arian-aghajanzadeh.jpg',
    bio: 'Founder of Klimate Consulting. 10 years of experience in energy, water, and agriculture sustainability.',
  },
  'Darren Sholes': {
    photo: '/images/team/darren-sholes.jpg',
    bio: 'Senior Consultant at Klimate Consulting. Expertise in advanced manufacturing, renewable energy, and data science.',
  },
}

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const { frontmatter } = getInsightBySlug(slug)

    const seoTitles: Record<string, string> = {
      'california-water-dilemma-part-1': "California's Water Crisis: Why Data Is the Missing Link",
      'california-water-dilemma-part-2': "California's Water Dilemma Part 2: Water [Data] Scarcity",
      'decarbonizing-agriculture-part-1': 'Decarbonizing Agriculture: Where Do Emissions Come From?',
      'decarbonizing-agriculture-part-2': 'How to Decarbonize Agriculture: Practical Strategies',
      'navigating-esg-disclosure': 'Navigating the ESG Disclosure Landscape: Challenges and Promises',
    }

    const seoDescriptions: Record<string, string> = {
      'california-water-dilemma-part-1':
        "California's water problem isn't scarcity alone — it's the data gap blocking effective management. A deep dive into the state's aging water infrastructure.",
      'california-water-dilemma-part-2':
        "Accurate, granular data is essential to modernize California water management. Why current data gaps are the biggest obstacle to solving the state's water crisis.",
      'decarbonizing-agriculture-part-1':
        'Agriculture accounts for ~11.5% of US GHG emissions. A science-based breakdown of methane, nitrous oxide, and CO2 sources across livestock and cropland systems.',
      'decarbonizing-agriculture-part-2':
        'A research-based guide to reducing methane, nitrous oxide, and CO2 from US farming — covering feed strategies, manure management, and soil carbon.',
      'navigating-esg-disclosure':
        'Explores the evolving world of ESG disclosure, from the rising importance of sustainability reporting to key regulatory developments in the SEC and EU.',
    }

    return {
      title: seoTitles[slug] || frontmatter.title,
      description: seoDescriptions[slug] || frontmatter.description,
    }
  })
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter, content, headings } = getInsightBySlug(slug)
  const allInsights = getAllInsights()

  const relatedPosts = allInsights
    .filter((p) => p.slug !== slug && p.frontmatter.sector === frontmatter.sector)
    .slice(0, 2)

  const authorInfo = teamMembers[frontmatter.author]

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    author: { '@type': 'Person', name: frontmatter.author },
    datePublished: frontmatter.date,
    description: frontmatter.description,
    publisher: {
      '@type': 'Organization',
      name: 'Klimate Consulting',
      url: 'https://klimateconsulting.com',
    },
  }

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="pt-20">
        <article className="py-12 md:py-20">
          {/* Breadcrumb + Header — full width centered */}
          <div className="max-w-[1200px] mx-auto px-6">
            <nav className="text-sm font-body text-kc-text-secondary dark:text-gray-300 mb-8">
              <Link href="/insights/" className="hover:text-kc-blue dark:hover:text-kc-light-blue">
                Insights
              </Link>
              <span className="mx-2">/</span>
              <span className="text-kc-dark dark:text-white">{frontmatter.title}</span>
            </nav>

            <div className="max-w-[800px] mb-8">
              <div className="flex items-center gap-3 mb-4">
                <TagBadge sector={frontmatter.sector} />
                <span className="text-sm text-kc-text-secondary dark:text-gray-300">
                  {frontmatter.readingTime} min read
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-kc-dark dark:text-white mb-4 leading-tight">
                {frontmatter.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-kc-text-secondary dark:text-gray-300">
                <span>{frontmatter.author}</span>
                <span>&middot;</span>
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>

            {/* Hero image */}
            {frontmatter.image && (
              <div className="max-w-[800px] aspect-[16/9] relative rounded-xl overflow-hidden mb-10">
                {/* Source: klimate-owned */}
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Content + TOC sidebar */}
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex gap-12">
              {/* Article content */}
              <div className="max-w-[800px] min-w-0 flex-1">
                <div className="prose prose-lg max-w-none">
                  <MDXRemote source={content} components={mdxComponents} />
                </div>

                {/* Share bar */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <ShareBar title={frontmatter.title} slug={slug} />
                </div>

                {/* Author card */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  {authorInfo ? (
                    <div className="flex items-start gap-4">
                      {/* Source: klimate-owned */}
                      <Image
                        src={authorInfo.photo}
                        alt={frontmatter.author}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-heading font-bold text-kc-dark dark:text-white">
                          {frontmatter.author}
                        </h4>
                        <p className="text-sm text-kc-text-secondary dark:text-gray-300 mt-1">
                          {authorInfo.bio}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-kc-text-secondary dark:text-gray-300">
                      Written by {frontmatter.author} &middot;{' '}
                      {new Date(frontmatter.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-16">
                    <h3 className="font-heading text-2xl font-bold text-kc-dark dark:text-white mb-6">
                      Related Articles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedPosts.map((post) => (
                        <InsightCard
                          key={post.slug}
                          slug={post.slug}
                          {...post.frontmatter}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Back link */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    href="/insights/"
                    className="text-kc-blue dark:text-kc-light-blue font-semibold hover:underline"
                  >
                    &larr; All Insights
                  </Link>
                </div>
              </div>

              {/* TOC sidebar — desktop only */}
              {headings.length > 0 && (
                <aside className="hidden xl:block w-60 flex-shrink-0">
                  <div className="sticky top-24">
                    <TableOfContents headings={headings} />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
