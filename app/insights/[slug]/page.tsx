import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllInsights, getInsightBySlug } from '@/lib/mdx'
import { siteUrl } from '@/lib/metadata'
import { getSector } from '@/lib/sectors'
import ReadingProgress from '@/components/shared/ReadingProgress'
import TableOfContents from '@/components/shared/TableOfContents'
import ShareBar from '@/components/shared/ShareBar'
import AuthorBio from '@/components/blog/AuthorBio'
import KeepReading from '@/components/blog/KeepReading'
import NewsletterPanel from '@/components/blog/NewsletterPanel'
import Callout from '@/components/mdx/Callout'
import Stat from '@/components/mdx/Stat'
import PullQuote from '@/components/mdx/PullQuote'
import ChartEmbed from '@/components/mdx/ChartEmbed'

const mdxComponents = { Callout, Stat, PullQuote, ChartEmbed }

interface TeamMember {
  photo: string
  role: string
  bio: string
}

const teamMembers: Record<string, TeamMember> = {
  'Arian Aghajanzadeh': {
    photo: '/images/team/arian-aghajanzadeh.jpg',
    role: 'Founder, Klimate Consulting',
    bio: 'Recognized subject matter expert in energy and water use in irrigated agriculture, with 10 years working with industrial, agricultural, water, and energy stakeholders.',
  },
  'Darren Sholes': {
    photo: '/images/team/darren-sholes.jpg',
    role: 'Senior Consultant, Klimate Consulting',
    bio: 'Senior Consultant at Klimate Consulting. Expertise in advanced manufacturing, renewable energy, and data science.',
  },
}

// Label that also covers the legacy "ecosystem" tag (not a getSector key).
function sectorLabel(sector: string) {
  if (sector === 'ecosystem') return 'Ecosystems'
  return getSector(sector).label
}

function formatLongDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
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
      'microirrigation-energy-paradox':
        'The Microirrigation Energy Paradox: Why California Farm Electricity Use Is Rising',
      'sargassum-golden-tide':
        "The Golden Tide: Tracking the World's Largest Seaweed Bloom",
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
      'microirrigation-energy-paradox':
        "California converted half its farmland to microirrigation — yet on-farm electricity use is climbing. Eight interactive charts explain the water-energy paradox and what growers can do.",
      'sargassum-golden-tide':
        "The Great Atlantic Sargassum Belt is the world's largest macroalgal bloom, up roughly sevenfold since 2011. An interactive look at how it grew, how anyone can track it with free satellite data, and how it might become a resource.",
    }

    return {
      title: seoTitles[slug] || frontmatter.title,
      description: seoDescriptions[slug] || frontmatter.description,
      alternates: { canonical: `/insights/${slug}/` },
    }
  })
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter, content, headings } = getInsightBySlug(slug)
  const allInsights = getAllInsights()

  const postTags = Array.from(
    new Set([frontmatter.sector, ...(frontmatter.sectors ?? [])])
  )

  const relatedPosts = allInsights
    .filter((p) => {
      if (p.slug === slug) return false
      const otherTags = [p.frontmatter.sector, ...(p.frontmatter.sectors ?? [])]
      return otherTags.some((t) => postTags.includes(t))
    })
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
      url: siteUrl,
    },
  }

  const authorRole = authorInfo?.role ?? 'Klimate Consulting'

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
      <div className="bg-kc-bg pt-20">
        {/* ============ ARTICLE HEADER ============ */}
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[860px] px-8 pt-[72px]">
            <nav className="mb-7 flex items-center gap-2 font-body text-[12.5px]">
              <Link
                href="/insights/"
                className="font-semibold text-kc-text-muted hover:text-kc-blue"
              >
                Insights
              </Link>
              <span className="text-kc-light-blue">/</span>
              <span className="font-semibold text-kc-blue">
                {sectorLabel(frontmatter.sector)}
              </span>
            </nav>

            <h1 className="m-0 mb-[22px] font-heading text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-kc-dark md:text-[46px]">
              {frontmatter.title}
            </h1>
            <p className="m-0 mb-8 font-body text-[18px] leading-[1.7] text-kc-text-lead">
              {frontmatter.description}
            </p>

            {/* Meta bar between hairlines */}
            <div className="flex flex-col gap-4 border-y border-kc-border py-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3.5">
                {authorInfo ? (
                  /* Source: klimate-owned */
                  <Image
                    src={authorInfo.photo}
                    alt={frontmatter.author}
                    width={42}
                    height={42}
                    className="h-[42px] w-[42px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-kc-light-blue font-heading text-sm font-semibold text-kc-blue">
                    {frontmatter.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-heading text-[14px] font-semibold text-kc-dark">
                    {frontmatter.author}
                  </div>
                  <div className="font-body text-[12px] text-kc-text-muted">
                    {formatLongDate(frontmatter.date)} · {frontmatter.readingTime} min read
                  </div>
                </div>
              </div>
              <ShareBar title={frontmatter.title} slug={slug} />
            </div>
          </div>
        </section>

        {/* ============ HERO IMAGE ============ */}
        {frontmatter.image && (
          <section className="bg-kc-bg">
            <div className="mx-auto max-w-[1000px] px-8 pt-11">
              <div className="overflow-hidden rounded-lg shadow-[0_24px_60px_rgba(15,76,129,0.12)]">
                {/* Source: klimate-owned */}
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  width={1000}
                  height={440}
                  className="h-auto max-h-[440px] w-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* ============ ARTICLE BODY ============ */}
        <section className="bg-kc-bg">
          <div className="mx-auto flex max-w-[1240px] justify-center gap-12 px-8 pb-10 pt-16 lg:gap-20">
            {/* TOC */}
            {headings.length > 0 && (
              <aside className="hidden w-[220px] shrink-0 lg:block">
                <div className="sticky top-[108px]">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}

            {/* Prose */}
            <article
              className="prose w-full min-w-0 max-w-[640px] font-body
                [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:tracking-[-0.015em] [&_h2]:text-kc-dark
                [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:font-heading [&_h3]:text-[21px] [&_h3]:font-semibold [&_h3]:text-kc-dark
                [&_p]:mb-6 [&_p]:text-[16px] [&_p]:leading-[1.9] [&_p]:text-kc-text-body
                [&_li]:text-[16px] [&_li]:leading-[1.9] [&_li]:text-kc-text-body
                [&_a]:font-semibold [&_a]:text-kc-blue"
            >
              <MDXRemote source={content} components={mdxComponents} />
            </article>
          </div>
        </section>

        {/* ============ AUTHOR + KEEP READING + NEWSLETTER ============ */}
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[864px] px-8 pb-24 pt-6">
            <div className="mb-16">
              <AuthorBio
                name={frontmatter.author}
                role={authorRole}
                bio={
                  authorInfo?.bio ??
                  `${frontmatter.author} writes for Klimate Consulting on water, energy, and agriculture.`
                }
                photo={authorInfo?.photo}
              />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mb-16">
                <KeepReading
                  items={relatedPosts.map((post) => ({
                    href: `/insights/${post.slug}/`,
                    date: post.frontmatter.date,
                    title: post.frontmatter.title,
                  }))}
                />
              </div>
            )}

            <NewsletterPanel variant="panel" />
          </div>
        </section>
      </div>
    </>
  )
}
