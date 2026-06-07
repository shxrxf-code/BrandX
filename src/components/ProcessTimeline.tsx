'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { useIsMobile } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Forensic audit of category, audience, and competitive whitespace. We listen, observe, and learn.',
    deliverables: ['Stakeholder interviews', 'Competitor audit', 'Audience research', 'Opportunity map'],
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Define',
    description: 'Translate insight into a clear strategic brief, positioning, and success metrics.',
    deliverables: ['Strategic brief', 'Positioning', 'Success metrics', 'Roadmap'],
    duration: '1 week',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Brand, product, and motion design — built around user behavior and your commercial goals.',
    deliverables: ['Brand identity', 'Design system', 'UI/UX', 'Motion language'],
    duration: '3–6 weeks',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Engineering as a craft. Modern stacks, performance budgets, accessibility, and a CI/CD culture.',
    deliverables: ['Frontend', 'Backend', 'CMS', 'QA & performance'],
    duration: '4–8 weeks',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Coordinated go-to-market with instrumentation, monitoring, and a 30-day optimization sprint.',
    deliverables: ['GTM plan', 'Analytics', 'Monitoring', '30-day sprint'],
    duration: '1–2 weeks',
  },
  {
    number: '06',
    title: 'Scale',
    description: 'Continuous optimization, A/B testing, and new surface expansion. We compound what works.',
    deliverables: ['CRO', 'Experimentation', 'New markets', 'Quarterly reviews'],
    duration: 'Ongoing',
  },
]

function StepCard({ step, index, isActive }: { step: typeof steps[0]; index: number; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex-shrink-0 w-[320px] md:w-[380px] snap-center',
      )}
    >
      <div
        className={cn(
          'relative h-full p-7 rounded-3xl border transition-all duration-700 overflow-hidden',
          isActive
            ? 'glass-elevated border-accent/40 bg-accent/[0.04]'
            : 'border-white/[0.06] hover:border-white/15'
        )}
      >
        {/* Hover glow */}
        <div
          className={cn(
            'absolute -top-24 -right-24 w-60 h-60 rounded-full bg-accent/0 group-hover:bg-accent/15 blur-3xl transition-all duration-700'
          )}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="font-mono text-xs text-accent tracking-[0.2em] mb-1">
                {step.number}
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-white leading-none">
                {step.title}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                Duration
              </div>
              <div className="text-xs text-white/70 mt-0.5">{step.duration}</div>
            </div>
          </div>

          <p className="text-white/55 text-sm leading-relaxed mb-6 flex-grow">
            {step.description}
          </p>

          {/* Deliverables */}
          <div className="border-t border-white/[0.06] pt-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-3">
              Deliverables
            </div>
            <ul className="space-y-1.5">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-xs text-white/65"
                >
                  <span className="w-1 h-1 rounded-full bg-accent/60" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top progress line */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-700',
            isActive && 'via-accent'
          )}
        />
      </div>
    </motion.div>
  )
}

export default function ProcessTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track which step is most in view
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handle = () => {
      const cards = el.querySelectorAll('[data-step]')
      let closestIndex = 0
      let closestDistance = Infinity
      const scrollLeft = el.scrollLeft
      cards.forEach((card, i) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const containerRect = el.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const containerCenter = containerRect.left + containerRect.width / 2
        const distance = Math.abs(cardCenter - containerCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      })
      setActiveIndex(closestIndex)
    }
    el.addEventListener('scroll', handle, { passive: true })
    return () => el.removeEventListener('scroll', handle)
  }, [])

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionLabel number="05" label="How We Work" className="mb-6" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl"
            >
              A method, refined over{' '}
              <span className="text-gradient-shine">150+ engagements</span>.
            </motion.h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              className="w-12 h-12 rounded-full glass-elevated border border-white/10 hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center text-white/70"
              aria-label="Previous step"
              data-cursor-hover
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-12 h-12 rounded-full glass-elevated border border-white/10 hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center text-white/70"
              aria-label="Next step"
              data-cursor-hover
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mb-8">
          <div className="h-px bg-white/[0.06] w-full" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-accent to-accent-bright"
            style={{
              width: `${((activeIndex + 1) / steps.length) * 100}%`,
              boxShadow: '0 0 12px rgba(91,91,255,0.6)',
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 -mx-6 px-6 md:-mx-12 md:px-12 snap-x snap-mandatory no-scrollbar"
        >
          {steps.map((step, i) => (
            <div data-step={i} key={step.number}>
              <StepCard step={step} index={i} isActive={i === activeIndex} />
            </div>
          ))}
        </div>

        {/* Step counter */}
        <div className="flex items-center justify-between mt-2 text-xs font-mono text-white/40">
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span>
          <span className="hidden md:block">Scroll →</span>
        </div>
      </div>
    </section>
  )
}
