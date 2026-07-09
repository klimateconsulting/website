import Image from 'next/image'
import Link from 'next/link'
import { getSector } from '@/lib/sectors'

interface ProjectCardProps {
  slug: string
  title: string
  client: string
  sector: string
  image: string
  description: string
}

/**
 * ProjectCard — white card with a 3px sector-color top rule, 210px cover image,
 * client small-caps, title, and description. Hover lifts + shadows (via group).
 */
export default function ProjectCard({
  slug,
  title,
  client,
  sector,
  image,
  description,
}: ProjectCardProps) {
  const s = getSector(sector)
  return (
    <Link
      href={`/projects/${slug}/`}
      className="group block bg-white rounded-md overflow-hidden border border-kc-border transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_44px_rgba(22,33,35,0.10)] h-full"
    >
      <div className="h-[3px]" style={{ background: s.color }} />
      {/* Source: klimate-owned */}
      <div className="relative h-[210px] overflow-hidden">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <div className="px-7 pt-7 pb-[30px]">
        <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted mb-3">
          {client}
        </div>
        <h3 className="font-heading text-[19px] font-semibold leading-[1.35] tracking-[-0.01em] text-kc-dark m-0 mb-3 group-hover:text-kc-blue transition-colors">
          {title}
        </h3>
        <p className="font-body text-[13.5px] leading-[1.7] text-kc-text-secondary m-0">
          {description}
        </p>
      </div>
    </Link>
  )
}
