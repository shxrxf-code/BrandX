'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import Marquee from '@/components/ui/Marquee'
import { cn } from '@/lib/utils'

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(91,91,255,0.4) 0%, transparent 50%)',
            filter: 'blur(100px)',
            animation: 'pulseGlow 6s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <motion.div
        className="section-container relative z-10 text-center"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full glass-elevated border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-eyebrow uppercase tracking-[0.18em] text-white/70 font-medium">
            Booking Q3 2026 engagements
          </span>
        </motion.div>

        <h2 className="font-display font-semibold leading-[0.92] tracking-[-0.04em] mb-8 text-display">
          <span className="block text-white">Ready To Build</span>
          <span className="block text-gradient-shine">Something Exceptional?</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A 30-minute call to discuss your vision, the constraints you&apos;re
          navigating, and whether Brandex is the right partner to build what
          comes next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <MagneticButton
            variant="primary"
            size="lg"
            href="/contact"
            showArrow
          >
            Book Strategy Call
          </MagneticButton>
          <MagneticButton
            variant="outline"
            size="lg"
            href="mailto:brandexdigital.in@gmail.com"
          >
            brandexdigital.in@gmail.com
          </MagneticButton>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/40 font-mono uppercase tracking-[0.15em]"
        >
          <span>30-min call</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>No commitment</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Reply within 24h</span>
        </motion.div>
      </motion.div>

      {/* Marquee strip */}
      <div className="mt-24 md:mt-32 pt-8 border-t border-white/[0.06]">
        <Marquee
          items={[
            'BRANDEX DIGITAL',
            '◆',
            'PREMIUM DIGITAL TRANSFORMATION',
            '◆',
            'STRATEGY · DESIGN · TECHNOLOGY · GROWTH',
            '◆',
            'BOOK A CALL',
            '◆',
          ]}
          speed={2.5}
          separator=""
          className="py-2"
          itemClassName="font-display text-3xl md:text-5xl font-bold text-white/10"
        />
      </div>
    </section>
  )
}
