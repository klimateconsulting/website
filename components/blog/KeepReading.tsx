import Link from 'next/link'

interface KeepReadingItem {
  href: string
  date: string
  title: string
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** "Keep reading" — lightweight related-post list rows (date · title · arrow). */
export default function KeepReading({ items }: { items: KeepReadingItem[] }) {
  if (items.length === 0) return null

  return (
    <div>
      <div className="mb-6 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-kc-text-secondary">
        Keep reading
      </div>
      <div className="flex flex-col border-t border-kc-divider">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group grid grid-cols-1 items-center gap-3 border-b border-kc-divider px-3 py-6 transition-colors hover:bg-[#F6F8FA] md:grid-cols-[130px_1fr_32px] md:gap-7"
          >
            <span className="font-body text-[12.5px] font-medium text-kc-text-muted">
              {formatDate(item.date)}
            </span>
            <h3 className="m-0 font-heading text-[17px] font-semibold leading-[1.4] text-kc-dark transition-colors group-hover:text-kc-blue">
              {item.title}
            </h3>
            <span
              className="hidden font-heading text-lg text-kc-blue md:block md:justify-self-end"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
