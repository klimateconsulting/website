'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/shared/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background image — Next.js optimized */}
      {/* Source: klimate-owned */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-kc-dark/60" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Research-Based Sustainability Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          At Klimate Consulting, we distill the complexity of the sustainability landscape into
          actionable insights. We handle the technical, scientific, and regulatory details — so you
          can act with confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/services/" variant="white">
            Explore Our Services
          </Button>
          <Button href="/contact/" variant="outline-white">
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
