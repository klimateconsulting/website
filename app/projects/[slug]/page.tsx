import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProjectBySlug } from '@/lib/mdx'
import TagBadge from '@/components/shared/TagBadge'
import Button from '@/components/shared/Button'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const { frontmatter } = getProjectBySlug(slug)
    return {
      title: `${frontmatter.title} | Klimate Consulting`,
      description: frontmatter.description,
    }
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter, content } = getProjectBySlug(slug)

  return (
    <div className="pt-20">
      <article className="py-12 md:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-sm font-body text-kc-text-secondary dark:text-gray-400 mb-8">
            <Link href="/projects/" className="hover:text-kc-blue dark:hover:text-kc-light-blue">
              Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-kc-dark dark:text-white">{frontmatter.title}</span>
          </nav>

          {/* Project image */}
          {/* Source: klimate-owned */}
          <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-8">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Title + meta */}
          <div className="mb-8">
            <span className="text-sm font-semibold font-body text-kc-text-secondary dark:text-gray-400 uppercase tracking-wider">
              {frontmatter.client}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-kc-dark dark:text-white mt-2 mb-4">
              {frontmatter.title}
            </h1>
            <TagBadge sector={frontmatter.sector} />
          </div>

          {/* MDX Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote source={content} />
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Button href="/projects/" variant="secondary">
              &larr; All Projects
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
