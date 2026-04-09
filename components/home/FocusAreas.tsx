'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const sectors = [
  {
    name: 'Agriculture',
    icon: '/icons/agriculture-color.png',
    iconWhite: '/icons/agriculture-white.png',
    href: '/services/agriculture/',
    color: 'border-kc-green',
    description:
      'Our soils are degrading. Agriculture is both a major emissions source and our greatest opportunity to sequester carbon. We work with farming operations, agtech companies, and food companies to reduce their footprint and transition agricultural land into the world\'s largest carbon sink.',
  },
  {
    name: 'Energy',
    icon: '/icons/energy-color.png',
    iconWhite: '/icons/energy-white.png',
    href: '/services/energy/',
    color: 'border-kc-yellow',
    description:
      'The energy transition is accelerating — but climate change is now threatening energy security itself. We develop microgrid solutions and conduct energy management R&D to build a more resilient energy future.',
  },
  {
    name: 'Water',
    icon: '/icons/water-color.png',
    iconWhite: '/icons/water-white.png',
    href: '/services/water/',
    color: 'border-kc-blue',
    description:
      'Most of the world\'s population lives in water-stressed regions. California manages its water with laws from the 1800s. We research how to modernize water management for the 21st century.',
  },
  {
    name: 'Food Systems',
    icon: '/icons/food-color.png',
    iconWhite: '/icons/food-white.png',
    href: '/services/food-systems/',
    color: 'border-kc-brown',
    description:
      'Our food system is the single largest source of greenhouse gas emissions on Earth. We help clients understand and account for food-related emissions from farm to fork, enabling smarter Scope 3 reporting.',
  },
]

export default function FocusAreas() {
  return (
    <section className="py-20 md:py-28 bg-kc-bg-grey dark:bg-kc-dark-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-kc-dark dark:text-white mb-4">
            Our Focus Areas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={sector.href}
                className={`block bg-white dark:bg-kc-dark-card rounded-xl p-8 shadow-sm border border-transparent dark:border-white/10 hover:-translate-y-1 hover:shadow-lg hover:border-l-4 ${sector.color} transition-all duration-200 h-full`}
              >
                {/* Source: klimate-owned */}
                <Image
                  src={sector.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 mb-4 object-contain block dark:hidden"
                />
                <Image
                  src={sector.iconWhite}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 mb-4 object-contain hidden dark:block"
                />
                <h3 className="font-heading text-xl font-bold text-kc-dark dark:text-white mb-3">
                  {sector.name}
                </h3>
                <p className="font-body text-sm text-kc-dark/70 dark:text-gray-300 leading-relaxed mb-4">
                  {sector.description}
                </p>
                <span className="text-kc-blue dark:text-kc-light-blue text-sm font-semibold">
                  Learn more &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
