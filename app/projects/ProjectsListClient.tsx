'use client'

import { useMemo, useState } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import ProjectCard from '@/components/shared/ProjectCard'
import { SECTOR_ORDER, getSector } from '@/lib/sectors'

interface ProjectListItem {
  slug: string
  title: string
  client: string
  sector: string
  image: string
  description: string
}

// Filter chips: All + the four focus areas, in brand order.
const FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  ...SECTOR_ORDER.map((key) => ({ key, label: getSector(key).label })),
]

/**
 * ProjectsListClient — the only interactive piece of the projects listing:
 * pill filter chips (client-side, filters on frontmatter `sector`) + the
 * resulting 3-col grid of ProjectCards. Project data comes from the server
 * page via props so the page itself stays a server component.
 */
export default function ProjectsListClient({ projects }: { projects: ProjectListItem[] }) {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.sector === filter)),
    [filter, projects]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-[10px]">
        {FILTERS.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`inline-flex min-h-[44px] items-center justify-center rounded-full border-[1.5px] px-[22px] py-[10px] font-body text-[13px] font-semibold transition-colors duration-200 ${
                active
                  ? 'border-kc-blue bg-kc-blue text-white'
                  : 'border-kc-divider bg-white text-kc-text-lead hover:border-kc-blue hover:text-kc-blue'
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <FadeIn key={project.slug} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard
              slug={project.slug}
              title={project.title}
              client={project.client}
              sector={project.sector}
              image={project.image}
              description={project.description}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
