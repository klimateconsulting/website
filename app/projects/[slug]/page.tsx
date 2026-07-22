import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProjectBySlug, type ProjectFrontmatter } from '@/lib/mdx'
import { getSector } from '@/lib/sectors'
import Button from '@/components/shared/Button'
import CTABand from '@/components/shared/CTABand'

// `type` / `status` / the optional dashboard-callout fields live in the MDX
// frontmatter but aren't part of the shared `ProjectFrontmatter` interface in
// lib/mdx.ts (foundation file — not edited here). Widen locally instead; see
// final report for the note on this gap.
type ProjectDetailFrontmatter = ProjectFrontmatter & {
  type?: string
  status?: string
  dashboardLabel?: string
  dashboardUrl?: string
}

// Blue-rail pull quote: renders any plain markdown `> ...` blockquote in a
// project's body with the mock's styling. Only shows up where the MDX
// content actually contains a blockquote.
function BlockQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="not-prose my-9 border-l-[3px] border-kc-blue pl-7 [&>p]:m-0 [&>p]:font-heading [&>p]:text-[21px] [&>p]:font-medium [&>p]:leading-[1.5] [&>p]:tracking-[-0.01em] [&>p]:text-kc-dark">
      {children}
    </blockquote>
  )
}

const mdxComponents = { blockquote: BlockQuote }

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

// Shorter <title> strings for projects whose full frontmatter title runs long
// (the layout template appends " | Klimate Consulting"). Keeps rendered titles
// under ~55 chars total. Falls back to the frontmatter title otherwise.
const seoTitles: Record<string, string> = {
  'water-system-nrdc': 'Agricultural Water Delivery Modernization',
  'voluntary-carbon-ceres': 'Voluntary Carbon Markets Research',
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const { frontmatter } = getProjectBySlug(slug)
    return {
      title: seoTitles[slug] || frontmatter.title,
      description: frontmatter.description,
      alternates: { canonical: `/projects/${slug}/` },
    }
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter, content } = getProjectBySlug(slug)
  const fm = frontmatter as ProjectDetailFrontmatter
  const sector = getSector(fm.sector)

  return (
    <div className="pt-20">
      <article>
        {/* Breadcrumb + title */}
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[900px] px-8 pt-[72px]">
            <nav className="mb-7 flex items-center gap-2 font-body text-[12.5px] font-semibold">
              <Link href="/projects/" className="text-kc-text-muted hover:text-kc-blue">
                Projects
              </Link>
              <span className="text-kc-light-blue">/</span>
              <span style={{ color: sector.textColor }}>{sector.label}</span>
            </nav>

            <div className="mb-3.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-kc-text-muted">
              {fm.client}
            </div>
            <h1 className="mb-9 font-heading text-[32px] font-semibold leading-[1.14] tracking-[-0.02em] text-kc-dark sm:text-[42px]">
              {fm.title}
            </h1>

            {/* Framed hero image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-md shadow-[0_24px_60px_rgba(15,76,129,0.14)]">
              {/* Source: klimate-owned */}
              <Image src={fm.image} alt={fm.title} fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* At a glance */}
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[900px] px-8 pt-10">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-kc-divider bg-kc-divider sm:grid-cols-4">
              <div className="bg-kc-bg-grey px-6 py-5">
                <div className="mb-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                  Client
                </div>
                <div className="font-heading text-[14.5px] font-semibold text-kc-dark">{fm.client}</div>
              </div>
              <div className="bg-kc-bg-grey px-6 py-5">
                <div className="mb-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                  Sector
                </div>
                <div
                  className="font-heading text-[14.5px] font-semibold"
                  style={{ color: sector.color }}
                >
                  {sector.label}
                </div>
              </div>
              <div className="bg-kc-bg-grey px-6 py-5">
                <div className="mb-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                  Type
                </div>
                <div className="font-heading text-[14.5px] font-semibold text-kc-dark">
                  {fm.type || 'Applied research'}
                </div>
              </div>
              <div className="bg-kc-bg-grey px-6 py-5">
                <div className="mb-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
                  Status
                </div>
                <div className="font-heading text-[14.5px] font-semibold text-kc-dark">
                  {fm.status || 'Completed'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[900px] px-8 pt-14 pb-8">
            <div className="prose max-w-[640px]">
              <MDXRemote source={content} components={mdxComponents} />
            </div>
          </div>
        </section>

        {/* Optional dashboard callout — only renders when the project's
            frontmatter points at a real dashboard. */}
        {fm.dashboardUrl && (
          <section className="bg-kc-bg">
            <div className="mx-auto max-w-[900px] px-8">
              <div className="mb-12 flex flex-col items-start gap-6 rounded-md bg-kc-bg-blue px-[30px] py-[26px] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-blue">
                    Explore the data
                  </div>
                  <div className="font-heading text-[18px] font-semibold text-kc-dark">
                    {fm.dashboardLabel}
                  </div>
                </div>
                <Button href={fm.dashboardUrl} variant="primary" external className="shrink-0">
                  Open dashboard &rarr;
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Back-to-projects row */}
        <section className="bg-kc-bg">
          <div className="mx-auto max-w-[900px] px-8 pb-24">
            <div className="flex flex-col items-stretch justify-between gap-4 border-t border-kc-divider pt-8 sm:flex-row sm:items-center">
              <Button href="/projects/" variant="outline">
                &larr; All projects
              </Button>
              <Button href="/contact/" variant="primary">
                Discuss a similar project
              </Button>
            </div>
          </div>
        </section>

        <CTABand />
      </article>
    </div>
  )
}
