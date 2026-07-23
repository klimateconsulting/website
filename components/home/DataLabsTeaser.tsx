import Link from 'next/link'
import Kicker from '@/components/shared/Kicker'

// Live dashboard hub URLs.
const TOOLS = [
  { label: 'California Water Intelligence', color: '#0F4C81', href: 'https://data.klimateconsulting.com/ca-water/' },
  { label: 'U.S. Food & Ag Value Chain', color: '#70A288', href: 'https://data.klimateconsulting.com/food-ag/' },
  { label: 'EnMS Opportunity Finder', color: '#FFAD05', href: 'https://data.klimateconsulting.com/enms/' },
  { label: 'EnMS Insights Database', color: '#220C10', href: 'https://data.klimateconsulting.com/enms-insights/' },
  { label: 'Sargassum Bloom Tracker', color: '#70A288', href: 'https://data.klimateconsulting.com/sargassum/' },
]

export default function DataLabsTeaser() {
  return (
    <section className="bg-kc-bg">
      <div className="mx-auto max-w-[1240px] px-8 py-24">
        <div className="bg-kc-bg-blue rounded-lg p-10 lg:p-[72px] grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-12 lg:gap-[72px] items-center">
          <div>
            <Kicker accent="#0F4C81" color="#0F4C81" className="mb-5">
              Free &amp; open tools
            </Kicker>
            <h2 className="font-heading text-[40px] font-semibold tracking-[-0.02em] text-kc-dark m-0 mb-[22px]">
              Klimate Data Labs
            </h2>
            <p className="font-body text-base leading-[1.8] text-[#2c4046] m-0 mb-9 max-w-[460px]">
              We don&apos;t just analyze data — we build tools that make it
              accessible. Explore live dashboards for California water, U.S. food
              &amp; agriculture, and industrial energy efficiency.
            </p>
            <Link
              href="/data-labs/"
              className="inline-block font-body text-sm font-semibold text-white bg-kc-blue hover:bg-kc-blue-dark px-8 py-[15px] rounded transition-colors"
            >
              Explore Data Labs →
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-blue mb-1">
              data.klimateconsulting.com
            </div>
            {TOOLS.map((t) => (
              <a
                key={t.label}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 bg-white rounded-md px-5 py-4 shadow-[0_4px_14px_rgba(15,76,129,0.08)] hover:shadow-[0_8px_22px_rgba(15,76,129,0.14)] transition-shadow"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: t.color }}
                />
                <span className="font-heading text-[15px] font-medium text-kc-dark">
                  {t.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
