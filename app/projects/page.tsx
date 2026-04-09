import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/mdx'
import ProjectCard from '@/components/shared/ProjectCard'
import SectionHeader from '@/components/shared/SectionHeader'

export const metadata: Metadata = {
  title: 'Our Work — Klimate Consulting',
  description:
    'Case studies from our applied research and consulting with LBNL, NRDC, Ceres, Carba, and Scale Microgrid.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            title="Our Work"
            subtitle="Applied research and consulting projects with leading organizations in sustainability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.frontmatter.title}
                client={project.frontmatter.client}
                sector={project.frontmatter.sector}
                image={project.frontmatter.image}
                description={project.frontmatter.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
