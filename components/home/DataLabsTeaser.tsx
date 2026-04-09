'use client'

import { motion } from 'framer-motion'
import { BarChart3, Droplets, Zap, Wheat } from 'lucide-react'
import Button from '@/components/shared/Button'

export default function DataLabsTeaser() {
  return (
    <section className="py-20 md:py-28 bg-kc-blue">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Klimate Data Labs
            </h2>
            <p className="font-body text-lg text-blue-100 leading-relaxed mb-8">
              We don&apos;t just analyze data — we build tools to make it accessible. Explore our
              California Water Intelligence Dashboard, U.S. Food &amp; Agriculture Value Chain
              analysis, and industrial energy efficiency tools — all free and open.
            </p>
            <Button href="https://data.klimateconsulting.com" variant="white" external>
              Explore Data Labs &rarr;
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20"
          >
            <div className="text-white/80 text-xs font-body font-semibold uppercase tracking-wider mb-4">
              data.klimateconsulting.com
            </div>
            <div className="space-y-4">
              {[
                { icon: Droplets, label: 'California Water Intelligence', color: 'text-blue-300' },
                { icon: Wheat, label: 'U.S. Food & Ag Value Chain', color: 'text-green-300' },
                { icon: Zap, label: 'EnMS Opportunity Finder', color: 'text-yellow-300' },
                { icon: BarChart3, label: 'EnMS Insights Database', color: 'text-purple-300' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 bg-white/5 rounded-lg px-4 py-3"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-white font-body text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
