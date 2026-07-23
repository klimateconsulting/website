'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Carousel — one reusable, static-export-safe slider used for both the hero
 * field notes (1 slide per view) and the featured-projects row (responsive
 * 1/3 per view). Implemented with native CSS scroll-snap so:
 *   - SSR renders the real first slide (no hydration mismatch, no transform math)
 *   - touch swipe works for free
 *   - responsive "per view" is pure CSS via `slideClassName`
 *
 * Behavior: auto-advance every `autoAdvanceMs` (paused on hover/focus and
 * disabled entirely for prefers-reduced-motion), prev/next arrows, dot
 * indicators, wrapping at the end.
 */
export default function Carousel({
  children,
  ariaLabel,
  slideClassName = 'basis-full',
  autoAdvanceMs = 7000,
  showArrows = true,
  showDots = true,
  className = '',
}: {
  children: ReactNode[]
  ariaLabel: string
  /** Tailwind basis classes controlling how many slides show per view. */
  slideClassName?: string
  autoAdvanceMs?: number
  showArrows?: boolean
  showDots?: boolean
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const count = children.length

  const slideStep = useCallback((el: HTMLDivElement) => {
    const first = el.children[0] as HTMLElement | undefined
    if (!first) return el.clientWidth
    const styles = getComputedStyle(el)
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0
    return first.offsetWidth + gap
  }, [])

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current
      if (!el) return
      el.scrollTo({
        left: i * slideStep(el),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    },
    [slideStep, reduceMotion]
  )

  const next = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
    if (atEnd) {
      goTo(0)
    } else {
      el.scrollBy({
        left: slideStep(el),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }
  }, [goTo, slideStep, reduceMotion])

  const prev = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const atStart = el.scrollLeft <= 2
    if (atStart) {
      goTo(count - 1)
    } else {
      el.scrollBy({
        left: -slideStep(el),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }
  }, [goTo, slideStep, reduceMotion, count])

  // Track which slide is active (leftmost visible) from scroll position.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const step = slideStep(el)
        setActive(step ? Math.round(el.scrollLeft / step) : 0)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [slideStep])

  // Auto-advance (disabled for reduced-motion; paused on hover/focus).
  useEffect(() => {
    if (reduceMotion || paused || count <= 1) return
    const id = setInterval(next, autoAdvanceMs)
    return () => clearInterval(id)
  }, [reduceMotion, paused, count, next, autoAdvanceMs])

  return (
    <div
      className={`relative ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={`shrink-0 snap-start ${slideClassName}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-kc-border bg-white text-kc-dark transition-colors hover:border-kc-blue hover:text-kc-blue"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-kc-border bg-white text-kc-dark transition-colors hover:border-kc-blue hover:text-kc-blue"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {showDots && (
            <div className="ml-2 flex items-center gap-2">
              {children.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? 'w-5 bg-kc-blue' : 'w-2 bg-kc-border hover:bg-kc-light-blue'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
