import Image from 'next/image'
import Link from 'next/link'
import Kicker from '@/components/shared/Kicker'
import { SECTOR_ORDER, SECTORS } from '@/lib/sectors'

// Short, editable descriptions per focus area (homepage index rows).
const DESCRIPTIONS: Record<string, string> = {
  water:
    'Most of the world lives in water-stressed regions. We research how to modernize water management for the 21st century.',
  energy:
    'Energy systems are under new pressure. We develop microgrid solutions and energy-management R&D for a resilient, efficient grid.',
  agriculture:
    'From farm operations to agtech, we analyze how agriculture uses land, water, and energy — and where the biggest efficiency gains hide.',
  'food-systems':
    'We trace impacts through the food value chain from farm to fork — giving clients the data for smarter Scope 3 reporting and sourcing decisions.',
}

export default function FocusAreas() {
  return (
    <section id="focus" className="bg-kc-bg">
      <div className="mx-auto max-w-[1240px] px-8 pt-[110px] pb-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-8 lg:gap-[72px] mb-16">
          <div>
            <Kicker className="mb-4">Where we go deep</Kicker>
            <h2 className="font-heading text-[40px] leading-[1.12] font-semibold tracking-[-0.02em] text-kc-dark m-0">
              Depth where
              <br />
              it matters.
            </h2>
          </div>
          <p className="font-body text-base leading-[1.8] text-kc-text-lead m-0 self-end max-w-[560px]">
            Our core domains are water, energy, agriculture, and food systems —
            but the method travels. If it needs rigorous analysis, we can
            research it.
          </p>
        </div>

        <div className="flex flex-col border-t border-kc-divider">
          {SECTOR_ORDER.map((key, i) => {
            const s = SECTORS[key]
            return (
              <Link
                key={key}
                href={`/services/${key}/`}
                className="sector-row group grid grid-cols-[auto_auto_1fr] md:grid-cols-[90px_56px_240px_1fr_120px] gap-x-5 md:gap-x-7 gap-y-2 items-center px-3 md:px-5 py-8 border-b border-kc-divider border-l-[3px] border-l-transparent transition-colors"
                style={{ ['--tint' as string]: s.tint, ['--accent' as string]: s.color }}
              >
                <span className="font-heading text-[15px] font-medium text-kc-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Image
                  src={s.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <h3 className="font-heading text-[24px] font-semibold tracking-[-0.01em] text-kc-dark m-0 col-span-3 md:col-span-1 order-last md:order-none">
                  {s.label}
                </h3>
                <p className="font-body text-sm leading-[1.7] text-kc-text-secondary m-0 max-w-[520px] col-span-3 md:col-span-1">
                  {DESCRIPTIONS[key]}
                </p>
                <span
                  className="hidden md:block font-body text-[13px] font-semibold text-kc-blue justify-self-end"
                >
                  Learn more →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
