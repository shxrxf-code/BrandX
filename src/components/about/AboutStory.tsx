'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { useIsMobile } from '@/lib/hooks'

const stats = [
  { value: '8+', label: 'Years building' },
  { value: '40+', label: 'Strategies shipped' },
  { value: '12', label: 'Industries' },
  { value: '97', label: 'Lighthouse avg' },
]

export default function AboutStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60])

  return (
    <section ref={ref} className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="p-6 rounded-2xl glass-elevated border border-white/[0.06]"
                >
                  <div className="font-display text-4xl font-semibold text-white tabular-nums mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SectionLabel number="02" label="Our Story" className="mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05] mb-8">
              Built in 2018. Built to last.
            </h2>
            <div className="space-y-6 text-lg text-white/65 leading-relaxed">
              <p>
                Brandex began as a side project between two designers who were
                tired of agencies that shipped forgettable work for forgettable
                budgets. Eight years later, we are a small, senior team of eight
                — designers, engineers, and strategists — working with a
                deliberate handful of ambitious clients.
              </p>
              <p>
                We have never taken outside funding, never expanded faster than
                our craft could sustain, and never said yes to work we did not
                believe in. That is the only way we know how to build a studio
                worth being proud of.
              </p>
              <p>
                Today, our work spans brand, web, product, SEO, performance
                marketing, and mobile — but the throughline is the same: craft,
                rigor, and outcomes the business can defend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
