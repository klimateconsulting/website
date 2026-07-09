import Link from 'next/link'
import { getSector } from '@/lib/sectors'

/**
 * JournalRow — the editorial list row used for insights/research:
 * date · title + description · sector tag (colored) · arrow.
 * Top/bottom hairline dividers come from the parent's `divide`/border.
 * Hover tints the row background.
 */
export default function JournalRow({
  href,
  date,
  title,
  description,
  tagLabel,
  sector,
  external = false,
}: {
  href: string
  date: string
  title: string
  description: string
  /** Override the tag text (defaults to the sector label). */
  tagLabel?: string
  sector: string
  external?: boolean
}) {
  const s = getSector(sector)
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const inner = (
    <>
      <span className="font-body text-[12.5px] font-medium text-kc-text-muted md:pt-1">
        {formattedDate}
      </span>
      <div>
        <h3 className="font-heading text-[21px] font-semibold tracking-[-0.01em] text-kc-dark m-0 mb-2 group-hover:text-kc-blue transition-colors">
          {title}
        </h3>
        <p className="font-body text-[13.5px] leading-[1.65] text-kc-text-secondary m-0 max-w-[640px]">
          {description}
        </p>
      </div>
      <span
        className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] md:justify-self-end"
        style={{ color: s.textColor }}
      >
        {tagLabel ?? s.label}
      </span>
      <span
        className="hidden md:block font-heading text-xl text-kc-blue md:justify-self-end"
        aria-hidden="true"
      >
        →
      </span>
    </>
  )

  // Column template survives narrow parents (sector "related" columns) as well
  // as the full 1240px list: date is fixed-narrow, the title takes the flexible
  // remainder (minmax(0,1fr) lets it shrink instead of forcing a wrap), tag +
  // arrow are content-width and hug the right edge.
  const cls =
    'group grid grid-cols-1 md:grid-cols-[104px_minmax(0,1fr)_auto_16px] gap-2 md:gap-x-7 md:gap-y-0 md:items-center px-3 py-[26px] border-b border-kc-divider hover:bg-[#F6F8FA] transition-colors'

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
