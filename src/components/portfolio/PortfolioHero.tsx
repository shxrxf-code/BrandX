'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

export default function PortfolioHero() {
  const isMobile = useIsMobile()

  return (
    <section className="relative min-h-[80vh] flex items-end overflow-hidden pt-32 pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(91,91,255,0.3) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="section-container relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-elevated border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-eyebrow uppercase tracking-[0.18em] text-white/70 font-medium">
            Selected Work · 2024–2026
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-display">
              <span className="block text-white">Work that</span>
              <span className="block text-gradient-shine">moves metrics.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/55 leading-relaxed max-w-md"
            >
              A selection of brand, web, product, and growth work for clients who
              refuse to ship forgettable things.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
