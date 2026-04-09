'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/shared/SectionHeader'

const projects = [
  {
    title: 'Energy & Water Management Systems Research',
    client: 'Lawrence Berkeley National Laboratory',
    sector: 'energy',
    slug: 'energy-water-lbnl',
    image: '/images/projects/energy-water-management.png',
    description:
      'Advancing DOE energy management programs and expanding the framework to include water management.',
  },
  {
    title: 'Modernization of California\'s Agricultural Water Delivery Network',
    client: 'Natural Resources Defense Council',
    sector: 'water',
    slug: 'water-system-nrdc',
    image: '/images/projects/water-system-modernization.png',
    description:
      'Researching how to modernize California\'s agricultural water delivery network — the state\'s single largest electricity consumer.',
  },
  {
    title: 'Controlled Environment Agriculture',
    client: 'Lawrence Berkeley National Laboratory',
    sector: 'agriculture',
    slug: 'cea-lbnl',
    image: '/images/projects/cea-project.png',
    description:
      'Spearheading a $2.5 million DOE initiative to catalog CEA technologies and analyze their impact on water, energy, and emissions.',
  },
]

const sectorColors: Record<string, string> = {
  agriculture: 'bg-kc-light-green text-kc-green',
  energy: 'bg-kc-light-yellow text-kc-brown',
  water: 'bg-kc-light-blue text-kc-blue',
  'food-systems': 'bg-kc-light-brown text-kc-brown',
}

export default function FeaturedProjects() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-kc-dark">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Featured Projects"
          subtitle="Applied research and consulting with leading organizations"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/projects/${project.slug}/`}
                className="group block bg-white dark:bg-kc-dark-card rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 h-full"
              >
                {/* Source: klimate-owned */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold font-body text-kc-text-secondary dark:text-gray-300 uppercase tracking-wider">
                    {project.client}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-kc-dark dark:text-white mt-2 mb-3 leading-snug">
                    {project.title}
                  </h3>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
                      sectorColors[project.sector] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {project.sector.charAt(0).toUpperCase() + project.sector.slice(1)}
                  </span>
                  <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  <span className="inline-block mt-4 text-kc-blue dark:text-kc-light-blue text-sm font-semibold">
                    View project &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
