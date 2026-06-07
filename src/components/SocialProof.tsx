'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useIsMobile } from '@/lib/hooks'
import Marquee from '@/components/ui/Marquee'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

const logos = [
  { name: 'SolarTech', style: 'font-bold tracking-tight' },
  { name: 'Drifto', style: 'font-light italic tracking-tight' },
  { name: 'FinFlow', style: 'font-bold tracking-wider' },
  { name: 'Lumen', style: 'font-light tracking-[0.2em]' },
  { name: 'Meridian', style: 'font-medium tracking-tight' },
  { name: 'Arc Studio', style: 'font-bold tracking-tighter' },
  { name: 'Northwind', style: 'font-light tracking-wider' },
  { name: 'Aether', style: 'font-semibold tracking-tight' },
  { name: 'Kindred', style: 'font-light italic' },
  { name: 'Cascade', style: 'font-bold tracking-wide' },
]

const headlineMetrics = [
  { value: 150, suffix: '+', label: 'Projects delivered', sub: 'Across 12 industries' },
  { value: 40, suffix: 'M+', label: 'Users reached', sub: 'Through our work' },
  { value: 12, suffix: '', label: 'Industries', sub: 'From fintech to fashion' },
  { value: 97, suffix: '', label: 'Lighthouse avg.', sub: 'Across our portfolio' },
  { value: 28, suffix: 'M+', label: 'Ad spend managed', sub: 'Across paid channels' },
  { value: 6, suffix: '', label: 'Continents', sub: 'Client footprint' },
]

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Label */}
        <SectionLabel
          number="01"
          label="Trusted Globally"
          align="center"
          className="mb-12"
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center text-3xl md:text-5xl font-medium tracking-tight text-white max-w-3xl mx-auto mb-6"
        >
          The partner for brands that{' '}
          <span className="text-gradient-shine">refuse to be average</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-white/50 max-w-2xl mx-auto mb-20"
        >
          From Series A scale-ups to global enterprises, we build the digital
          systems that move the metrics that matter.
        </motion.p>

        {/* Logo cloud - infinite marquee */}
        <div className="mb-24">
          <Marquee
            items={logos.map((l) => l.name)}
            speed={3}
            separator="✦"
            className="py-2"
            itemClassName="font-display text-3xl md:text-4xl font-bold text-white/20 hover:text-white/60 transition-colors duration-500"
          />
          <div className="h-12" />
          <Marquee
            items={logos.slice().reverse().map((l) => l.name)}
            speed={3.5}
            reverse
            separator="◈"
            className="py-2"
            itemClassName="font-display text-3xl md:text-4xl font-medium text-white/15 hover:text-white/50 transition-colors duration-500"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {headlineMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors duration-500 overflow-hidden">
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/0 group-hover:bg-accent/20 blur-3xl transition-all duration-700"
                />
                <div className="relative z-10">
                  <div className="font-display text-4xl md:text-5xl font-semibold text-white tabular-nums leading-none mb-3">
                    <AnimatedCounter value={m.value} suffix={m.suffix} duration={2200} />
                  </div>
                  <div className="text-sm font-medium text-white/80 mb-1">{m.label}</div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-wider">{m.sub}</div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/50 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
