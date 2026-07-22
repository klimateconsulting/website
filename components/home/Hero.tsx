'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Kicker from '@/components/shared/Kicker'
import Carousel from '@/components/shared/Carousel'
import { SECTOR_ORDER, SECTORS } from '@/lib/sectors'

// Toggle the right-column hero photo (client picks photo-on vs. typographic-only).
const SHOW_HERO_PHOTO = true

// ---- Editable hero copy ----
const HERO = {
  kicker: 'A lean, AI-native research firm',
  titleLine1: 'Research-grade rigor.',
  titleLine2: 'AI-native speed.',
  lead: 'We deliver high-quality analysis on water, energy, agriculture — and any question in between. Deep domain expertise, paired with AI-powered research workflows that move faster and hold a higher bar for accuracy than traditional consultancies.',
}

// One field-note slide per sector for the hero carousel (T15a). Water reuses the
// existing aqueduct photo; the other three reuse the optimized service-area hero
// photos already in the repo (license-clean, already <=300 KB).
const FIELD_NOTES = [
  {
    sector: 'Water',
    image: '/images/insights/california-aqueduct-kern.jpg',
    alt: 'The California Aqueduct near Kern County',
    note: 'California moves water with laws written in the 1800s. We research how to modernize it.',
  },
  {
    sector: 'Energy',
    image: '/images/services/energy-hero.jpg',
    alt: 'Solar panel array under blue sky',
    note: 'Industrial facilities buy more energy than they need. We research where the waste hides — and how to manage it out.',
  },
  {
    sector: 'Agriculture',
    image: '/images/services/agriculture-hero.jpg',
    alt: 'Aerial view of agricultural crop rows',
    note: 'We believe agriculture is the next frontier. We map where the biggest gains hide.',
  },
  {
    sector: 'Food Systems',
    image: '/images/services/food-systems-hero.jpg',
    alt: 'Food distribution and supply-chain facility',
    note: 'Most food-system impacts happen far from the farm gate. We trace them end to end.',
  },
]

// Above-the-fold hero: animates on mount (not on scroll). Starts at opacity 0.3
// so the hero is never fully invisible if JS is slow/disabled (T16), and settles
// quickly (≤0.4s). Reduced-motion users are pinned visible by globals.css.
const fade = (delay: number) => ({
  initial: { opacity: 0.3, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section className="bg-kc-bg">
      <div className="mx-auto max-w-[1240px] px-8 pt-24 pb-[88px] grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-[72px] items-center">
        {/* Left column */}
        <div>
          <motion.div {...fade(0.05)}>
            <Kicker className="mb-7">{HERO.kicker}</Kicker>
          </motion.div>
          <motion.h1
            {...fade(0.12)}
            className="font-heading font-semibold text-[44px] sm:text-[54px] lg:text-[64px] leading-[1.06] tracking-[-0.025em] text-kc-dark m-0 mb-7"
          >
            {HERO.titleLine1}
            <br />
            <span className="text-kc-blue">{HERO.titleLine2}</span>
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="font-body text-[17px] leading-[1.75] text-kc-text-lead max-w-[540px] m-0 mb-10"
          >
            {HERO.lead}
          </motion.p>
          <motion.div {...fade(0.28)} className="flex flex-wrap items-center gap-4">
            <Link
              href="/services/"
              className="font-body text-sm font-semibold tracking-[0.02em] text-white bg-kc-blue hover:bg-kc-blue-dark px-8 py-[15px] rounded transition-colors"
            >
              Explore our services
            </Link>
            <Link
              href="/contact/"
              className="font-body text-sm font-semibold text-kc-blue px-8 py-[14px] rounded border-[1.5px] border-kc-light-blue hover:border-kc-blue transition-colors"
            >
              Start a conversation
            </Link>
          </motion.div>

          {/* Sector index */}
          <motion.div
            {...fade(0.36)}
            className="flex flex-wrap gap-x-9 gap-y-4 mt-[60px] pt-8 border-t border-kc-border"
          >
            {SECTOR_ORDER.map((key) => {
              const s = SECTORS[key]
              return (
                <div key={key} className="flex items-center gap-[10px]">
                  <Image
                    src={s.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="w-[22px] h-[22px] object-contain"
                  />
                  <span className="font-heading text-sm font-medium text-kc-dark">
                    {s.label}
                  </span>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Right column — field-note carousel (one slide per sector) */}
        {SHOW_HERO_PHOTO && (
          <motion.div {...fade(0.24)} className="hidden lg:block">
            <Carousel ariaLabel="Field notes by focus area">
              {FIELD_NOTES.map((fn) => (
                <div key={fn.sector} className="relative pb-7 pl-7">
                  <div className="rounded-md overflow-hidden shadow-[0_24px_60px_rgba(15,76,129,0.14)]">
                    {/* Source: klimate-owned */}
                    <Image
                      src={fn.image}
                      alt={fn.alt}
                      width={620}
                      height={440}
                      className="block w-full h-[440px] object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute left-0 bottom-0 bg-white border border-kc-border border-l-[3px] border-l-kc-blue rounded px-[22px] py-[18px] shadow-[0_12px_32px_rgba(22,33,35,0.10)] max-w-[300px]">
                    <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-secondary mb-1.5">
                      Field note · {fn.sector}
                    </div>
                    <div className="font-heading text-[15px] font-medium leading-[1.45] text-kc-dark">
                      {fn.note}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  )
}
