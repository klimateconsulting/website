'use client'

import { motion } from 'framer-motion'

const clients = [
  'Lawrence Berkeley National Laboratory',
  'Natural Resources Defense Council',
  'University of California, Davis',
  'Ceres',
  'Carba',
  'Scale Microgrid Solutions',
]

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-20 bg-kc-bg-grey dark:bg-kc-dark-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-sm font-body font-semibold text-kc-text-secondary dark:text-gray-400 uppercase tracking-wider mb-10">
            Trusted by leading organizations
          </p>

          {/* Desktop: single row with dividers */}
          <div className="hidden md:flex items-center justify-center">
            {clients.map((name, i) => (
              <div key={name} className="flex items-center">
                {i > 0 && (
                  <span className="mx-6 h-5 w-px bg-kc-dark/20 dark:bg-white/20" />
                )}
                <span className="font-heading font-bold text-sm lg:text-base text-kc-dark/80 dark:text-gray-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: stacked centered list */}
          <div className="md:hidden flex flex-col items-center gap-4">
            {clients.map((name) => (
              <span
                key={name}
                className="font-heading font-bold text-sm text-kc-dark/80 dark:text-gray-300 text-center"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
