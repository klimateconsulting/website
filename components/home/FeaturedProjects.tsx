import Link from 'next/link'
import Kicker from '@/components/shared/Kicker'
import FadeIn from '@/components/shared/FadeIn'
import ProjectCard from '@/components/shared/ProjectCard'
import { getProjectBySlug } from '@/lib/mdx'

// Three featured projects (span energy / water / agriculture). Data pulled from
// each project's MDX frontmatter so titles + images stay in sync.
const FEATURED_SLUGS = ['energy-water-lbnl', 'water-system-nrdc', 'cea-lbnl']

export default function FeaturedProjects() {
  const projects = FEATURED_SLUGS.map((slug) => ({
    slug,
    ...getProjectBySlug(slug).frontmatter,
  }))

  return (
    <section className="bg-kc-bg-grey">
      <div className="mx-auto max-w-[1240px] px-8 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <Kicker className="mb-4">Selected work</Kicker>
            <h2 className="font-heading text-[40px] font-semibold tracking-[-0.02em] text-kc-dark m-0">
              Featured projects
            </h2>
          </div>
          <Link
            href="/projects/"
            className="font-body text-[13.5px] font-semibold text-kc-blue hover:text-kc-blue-dark transition-colors"
          >
            All projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {projects.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.1}>
              <ProjectCard
                slug={p.slug}
                title={p.title}
                client={p.client}
                sector={p.sector}
                image={p.image}
                description={p.description}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
