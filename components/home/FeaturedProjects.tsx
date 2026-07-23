import Link from 'next/link'
import Kicker from '@/components/shared/Kicker'
import FadeIn from '@/components/shared/FadeIn'
import Carousel from '@/components/shared/Carousel'
import ProjectCard from '@/components/shared/ProjectCard'
import { getAllProjects } from '@/lib/mdx'

// Carousel of ALL projects (newest first), 3 visible on desktop / 1 on mobile,
// advancing one card at a time and wrapping. Data pulled from each project's MDX
// frontmatter so titles + images stay in sync.
export default function FeaturedProjects() {
  const projects = getAllProjects().map((p) => ({
    slug: p.slug,
    ...p.frontmatter,
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

        <FadeIn>
          <Carousel
            ariaLabel="Featured projects"
            slideClassName="basis-full md:basis-[calc(50%-0.875rem)] lg:basis-[calc(33.333%-1.167rem)]"
          >
            {projects.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                client={p.client}
                sector={p.sector}
                image={p.image}
                description={p.description}
              />
            ))}
          </Carousel>
        </FadeIn>
      </div>
    </section>
  )
}
