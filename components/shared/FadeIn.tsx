'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * FadeIn — the standard scroll-in entrance used across the site:
 * opacity 0→1, y 20→0, 0.5s ease. `delay` staggers siblings (~0.1s each).
 * `prefers-reduced-motion` is honored globally via globals.css.
 *
 * Use for section blocks and cards. Renders a <div> by default.
 */
export default function FadeIn({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
