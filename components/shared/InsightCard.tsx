import Link from 'next/link'
import Image from 'next/image'
import TagBadge from './TagBadge'

interface InsightCardProps {
  slug: string
  title: string
  date: string
  author: string
  sector: string
  description: string
  readingTime: number
  image?: string
}

export default function InsightCard({
  slug,
  title,
  date,
  author,
  sector,
  description,
  readingTime,
  image,
}: InsightCardProps) {
  return (
    <Link
      href={`/insights/${slug}/`}
      className="group block bg-white dark:bg-kc-dark-card rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 h-full"
    >
      {image && (
        <div className="aspect-[16/9] relative overflow-hidden">
          {/* Source: klimate-owned */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <TagBadge sector={sector} />
          <span className="text-xs text-kc-text-secondary dark:text-gray-300">
            {readingTime} min read
          </span>
        </div>
        <h3 className="font-heading text-lg font-bold text-kc-dark dark:text-white mb-2 leading-snug group-hover:text-kc-blue dark:group-hover:text-kc-light-blue transition-colors">
          {title}
        </h3>
        <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-kc-text-secondary dark:text-gray-500">
          <span>{author}</span>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>
      </div>
    </Link>
  )
}
