'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Marquee from '@/components/ui/Marquee'

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const marqueeItems = [
    'LET\'S BUILD SOMETHING',
    '◆',
    'AMAZING TOGETHER',
    '◆',
    'BOOK A STRATEGY CALL',
    '◆',
    'TRANSFORM YOUR BRAND',
    '◆',
  ]

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-blue/10 blur-[200px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/10 blur-[150px]" />
      </div>

      <motion.div
        className="section-container relative z-10 text-center"
        style={{ scale, opacity }}
      >
        <ScrollReveal>
          <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-8 block">
            Start Your Journey
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-bold leading-[0.95] tracking-[-0.03em] mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
            <span className="text-gradient block">Let&apos;s Create</span>
            <span className="text-gradient-blue block">Something Epic</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto mb-12">
            Ready to transform your digital presence? Let&apos;s discuss your vision
            and build an experience that sets you apart.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton variant="primary" href="tel:+9170100096308">
              Book a Strategy Call
            </MagneticButton>
            <MagneticButton variant="secondary" href="mailto:brandexdigital.in@gmail.com">
              brandexdigital.in@gmail.com
            </MagneticButton>
          </div>
        </ScrollReveal>
      </motion.div>

      <div className="mt-24 pt-12 border-t border-white/5">
        <Marquee
          items={marqueeItems}
          speed={25}
          itemClassName="font-display text-2xl md:text-4xl font-bold text-white/5"
        />
      </div>
    </section>
  )
}
