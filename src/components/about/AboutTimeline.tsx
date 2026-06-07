'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const milestones = [
  {
    year: '2018',
    title: 'A side project becomes a studio',
    description: 'Aarav and two designers launch Brandex as a weekend project between freelance gigs.',
  },
  {
    year: '2019',
    title: 'First major rebrand',
    description: 'A clean-energy scale-up trusts us with their full rebrand. The case study still lives on our site.',
  },
  {
    year: '2021',
    title: 'Going full-time',
    description: 'We turn down retainer work, raise our prices 2x, and ship our first $100K+ engagement.',
  },
  {
    year: '2022',
    title: 'The product practice',
    description: 'A design system engagement with FinFlow leads to our first enterprise product team.',
  },
  {
    year: '2024',
    title: 'Awwwards SOTD',
    description: 'Our Arc Studio rebrand wins Site of the Day. We are still proud of it.',
  },
  {
    year: '2026',
    title: 'Today',
    description: 'A team of 8. A handful of clients. A portfolio we are proud to defend. The next chapter is being written.',
  },
]

export default function AboutTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <SectionLabel number="03" label="Timeline" className="mb-6" />
        <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-3xl mb-16">
          Eight years,{' '}
          <span className="text-gradient-shine">by design</span>.
        </h2>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  i % 2 === 0 ? '' : 'md:[direction:rtl]'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 top-2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 shadow-[0_0_20px_rgba(91,91,255,0.6)]" />

                <div className={`pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="font-mono text-sm text-accent tracking-[0.2em] mb-2">
                    {m.year}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-snug mb-3">
                    {m.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{m.description}</p>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
