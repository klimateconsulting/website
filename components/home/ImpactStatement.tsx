'use client'

import { motion } from 'framer-motion'

export default function ImpactStatement() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-kc-dark">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-lg md:text-xl text-kc-dark dark:text-gray-200 leading-relaxed"
        >
          Our work focuses on decarbonizing industry, agriculture, forestry, and other land use —
          which combined make up about{' '}
          <span className="font-heading font-bold text-4xl md:text-5xl text-kc-blue inline-block mx-1">
            45%
          </span>{' '}
          of global emissions.
        </motion.p>
      </div>
    </section>
  )
}
