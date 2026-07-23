'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * FadeIn — the standard scroll-in entrance used across the site:
 * opacity 0.3→1, y 16→0, 0.4s ease. `delay` staggers siblings (≤0.1s each).
 *
 * Tamed for T16: content never starts fully invisible (initial opacity 0.3),
 * the trigger fires as the element enters (small amount + a -10% bottom margin)
 * rather than when centered, and reduced-motion users get static content.
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
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as]
  return (
    <MotionTag
      initial={{ opacity: 0.3, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
