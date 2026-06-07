'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { useIsMobile } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const pillars = [
  {
    number: '01',
    title: 'Strategy',
    headline: 'Insight before instinct.',
    description:
      'Every engagement begins with a forensic audit of your category, audience, and competitive whitespace. We don\'t ship opinion; we ship hypotheses with evidence.',
    points: ['Market & competitor audit', 'Audience modeling', 'Positioning architecture', 'GTM strategy'],
    metric: { value: '40+', label: 'Strategy frameworks' },
  },
  {
    number: '02',
    title: 'Design',
    headline: 'Craft that earns attention.',
    description:
      'Design at Brandex is the intersection of behavioral psychology, brand storytelling, and visual precision. Every pixel is intentional; every motion is meaningful.',
    points: ['Identity & design systems', 'Editorial UI craft', 'Motion & micro-interactions', 'Prototyping'],
    metric: { value: 'Awwwards', label: 'Recognized work' },
  },
  {
    number: '03',
    title: 'Technology',
    headline: 'Engineering as a craft.',
    description:
      'We build with the same rigor as the design. Modern stacks, headless architecture, performance budgets enforced at commit, and infrastructure that scales linearly.',
    points: ['Next.js & headless CMS', 'Type-safe end to end', 'Edge-first deployment', '90+ Lighthouse by default'],
    metric: { value: '97', label: 'Lighthouse average' },
  },
  {
    number: '04',
    title: 'Growth',
    headline: 'Compounding, not campaigning.',
    description:
      'We engineer organic and paid engines that compound. Technical SEO, content clusters, lifecycle, attribution — a system that turns marketing into a moat.',
    points: ['Programmatic SEO', 'Digital PR at scale', 'Full-funnel paid media', 'Lifecycle & retention'],
    metric: { value: '3.4x', label: 'Average ROAS' },
  },
]

function PillarBlock({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30%' })
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 py-12 md:py-16 border-t border-white/[0.06]">
        {/* Number */}
        <div className="lg:col-span-2">
          <div className="font-mono text-sm text-accent/80 tracking-wider">
            {pillar.number}
          </div>
        </div>

        {/* Title block */}
        <div className="lg:col-span-5">
          <h3
            className={cn(
              'font-display font-semibold leading-[0.95] tracking-tight transition-all duration-500',
              'text-5xl md:text-7xl',
              isHovered ? 'text-white' : 'text-white/85'
            )}
            style={{ letterSpacing: '-0.04em' }}
          >
            {pillar.title}
          </h3>
        </div>

        {/* Description + points */}
        <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/[0.06]">
          <motion.div
            className="font-display text-2xl md:text-3xl font-medium text-white/90 mb-5 leading-snug"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {pillar.headline}
          </motion.div>
          <p className="text-white/55 leading-relaxed mb-6">
            {pillar.description}
          </p>
          <ul className="space-y-2 mb-6">
            {pillar.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-3 text-sm text-white/70"
              >
                <span className="w-1 h-1 rounded-full bg-accent" />
                {p}
              </motion.li>
            ))}
          </ul>
          <div className="flex items-baseline gap-3 pt-4 border-t border-white/[0.06]">
            <span className="font-display text-3xl font-semibold text-accent">
              {pillar.metric.value}
            </span>
            <span className="text-xs text-white/40 uppercase tracking-wider font-mono">
              {pillar.metric.label}
            </span>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className={cn(
          'absolute -inset-x-4 top-1/2 -translate-y-1/2 h-32 rounded-full pointer-events-none transition-opacity duration-700',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(91,91,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  )
}

export default function FourPillars() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="max-w-4xl mb-16 md:mb-24">
          <SectionLabel number="03" label="What Sets Us Apart" className="mb-8" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white"
          >
            We don&apos;t do everything.{' '}
            <span className="text-gradient-shine">We do what scales brands.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/55 max-w-2xl mt-6 text-lg leading-relaxed"
          >
            Four disciplines, executed at the highest level, with the rigor of a
            global consultancy and the speed of a boutique studio.
          </motion.p>
        </div>

        <div>
          {pillars.map((pillar, i) => (
            <PillarBlock key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
