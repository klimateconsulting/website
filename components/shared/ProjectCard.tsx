import Image from 'next/image'
import Link from 'next/link'
import TagBadge from './TagBadge'

interface ProjectCardProps {
  slug: string
  title: string
  client: string
  sector: string
  image: string
  description: string
}

export default function ProjectCard({ slug, title, client, sector, image, description }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}/`}
      className="group block bg-white dark:bg-kc-dark-card rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 h-full"
    >
      {/* Source: klimate-owned */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold font-body text-kc-text-secondary dark:text-gray-300 uppercase tracking-wider">
          {client}
        </span>
        <h3 className="font-heading text-lg font-bold text-kc-dark dark:text-white mt-2 mb-3 leading-snug">
          {title}
        </h3>
        <TagBadge sector={sector} />
        <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 leading-relaxed mt-3">
          {description}
        </p>
        <span className="inline-block mt-4 text-kc-blue dark:text-kc-light-blue text-sm font-semibold">
          View project &rarr;
        </span>
      </div>
    </Link>
  )
}
