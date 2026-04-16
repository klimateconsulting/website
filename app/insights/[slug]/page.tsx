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
      'navigating-the-changing-tides-of-sustainability':
        'Beyond Carbon: How Klimate Consulting Approaches Modern Sustainability',
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
      'navigating-the-changing-tides-of-sustainability':
        "Sustainability has outgrown carbon accounting. How standards have evolved, why measurement is harder outside the power sector, and how Klimate Consulting works in the gaps.",
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

  const faqData: Record<string, { question: string; answer: string }[]> = {
    'california-water-dilemma-part-1': [
      {
        question: 'Why is it so difficult to manage water in a state as large as California?',
        answer:
          "California's water challenge is not simply about scarcity — it's a data and infrastructure problem. The state's water delivery system was built for a different era and lacks the comprehensive measurement tools needed to manage resources efficiently under 21st-century climate conditions.",
      },
      {
        question: "What is California's biggest water problem?",
        answer:
          'Outdated water law, aging infrastructure, and a critical lack of data. California still operates under water rights doctrines that predate modern hydrology. Combined with a delivery system designed for mid-20th century agricultural patterns, the state cannot yet manage water with the precision the current climate demands.',
      },
      {
        question: 'How can California better manage its water resources?',
        answer:
          'Modernizing the measurement and monitoring infrastructure is the essential first step. This means deploying real-time sensors, building integrated data systems, and updating the legal and regulatory framework that governs water allocation.',
      },
    ],
    'decarbonizing-agriculture-part-1': [
      {
        question: 'What percentage of US greenhouse gas emissions come from agriculture?',
        answer:
          'According to the EPA, agriculture accounts for approximately 11.5% of total US greenhouse gas emissions. When you expand to the full food system — including processing, packaging, transportation, and retail — the share rises to roughly one-third of global emissions.',
      },
      {
        question: 'What are the main sources of greenhouse gas emissions in agriculture?',
        answer:
          'The three primary agricultural GHGs are methane (CH4), nitrous oxide (N2O), and carbon dioxide (CO2). Key sources include enteric fermentation from cattle, manure management, rice cultivation, and synthetic fertilizer application.',
      },
      {
        question: 'Why is agriculture such a significant source of emissions?',
        answer:
          'Unlike many industrial sectors, agriculture involves biological processes that are inherently difficult to eliminate. Ruminant livestock, flooded rice paddies, and microbial activity in soils produce GHGs as a byproduct of natural processes — making reduction a matter of management practices rather than simply switching fuel sources.',
      },
    ],
  }

  const faqJsonLd = faqData[slug]
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData[slug].map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

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
      url: 'https://klimate.consulting',
    },
  }

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
                    timeZone: 'UTC',
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
                        timeZone: 'UTC',
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
