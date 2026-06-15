'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  {
    title: 'Research',
    subtitle: '0 1',
    description: 'Understanding your market, users, and competition before making any decisions.',
    detail: 'We conduct stakeholder interviews, user surveys, competitive analysis, and market research to build a complete picture of your landscape.',
  },
  {
    title: 'Strategy',
    subtitle: '0 2',
    description: 'Turning insights into a clear roadmap with defined goals and milestones.',
    detail: 'We define KPIs, create user personas, map customer journeys, and establish a strategic direction aligned with your business objectives.',
  },
  {
    title: 'Design',
    subtitle: '0 3',
    description: 'Crafting intuitive interfaces and compelling visual experiences.',
    detail: 'We produce wireframes, interactive prototypes, design systems, and high-fidelity mockups validated through usability testing.',
  },
  {
    title: 'Development',
    subtitle: '0 4',
    description: 'Building robust, scalable solutions with modern technology.',
    detail: 'We implement using modular architecture, automated testing, continuous integration, and performant front-end and back-end systems.',
  },
  {
    title: 'Launch',
    subtitle: '0 5',
    description: 'Deploying, testing, and optimizing for production readiness.',
    detail: 'We manage staging environments, run QA and load testing, configure CI/CD pipelines, and execute a smooth go-live with monitoring.',
  },
  {
    title: 'Growth',
    subtitle: '0 6',
    description: 'Continuous improvement through data-driven iteration and optimization.',
    detail: 'We implement analytics, set up A/B testing, optimize conversion funnels, and iterate based on real user behavior and metrics.',
  },
]

const stageIcons = [
  'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
]

const stageOffsets = [
  { start: 0, end: 0.16 },
  { start: 0.16, end: 0.32 },
  { start: 0.32, end: 0.48 },
  { start: 0.48, end: 0.64 },
  { start: 0.64, end: 0.80 },
  { start: 0.80, end: 1.0 },
]

function getActiveStage(progress: number): number {
  for (let i = 0; i < stageOffsets.length; i++) {
    const { start, end } = stageOffsets[i]
    if (progress >= start && progress < end) return i
  }
  return stageOffsets.length - 1
}

function StageIcon({ path, progress }: { path: string; progress: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d={path} />
    </svg>
  )
}

function DesktopView({ activeStage, progress }: { activeStage: number; progress: number }) {
  return (
    <div className="hidden md:flex gap-16 lg:gap-24 items-start relative z-10">
      {/* Left: Timeline */}
      <div className="shrink-0 pt-2">
        <div className="relative flex flex-col items-center">
          {/* Vertical line */}
          <div className="absolute top-2 bottom-2 w-px bg-border left-1/2 -translate-x-1/2" />
          {/* Fill line */}
          <div
            className="absolute top-2 w-px bg-accent left-1/2 -translate-x-1/2 transition-all duration-300"
            style={{ height: `${progress * 100}%`, maxHeight: 'calc(100% - 16px)' }}
          />

          {stages.map((stage, i) => {
            const isActive = i === activeStage
            const isPast = i < activeStage
            return (
              <div key={stage.title} className="flex items-center gap-4 relative py-3 w-full">
                <div className="w-24 text-right shrink-0">
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isActive ? 'text-accent' : isPast ? 'text-muted/50' : 'text-muted'
                    }`}
                  >
                    {stage.title}
                  </span>
                </div>
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? 'border-accent bg-accent shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                        : isPast
                          ? 'border-accent/30 bg-accent/20'
                          : 'border-border bg-background'
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right: Content Panel */}
      <div className="flex-1 min-h-[400px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-xl border border-border p-8 md:p-10"
          >
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <StageIcon path={stageIcons[activeStage]} progress={progress} />
              </div>
              <div>
                <span className="text-xs text-accent font-semibold tracking-wider uppercase mb-1 block">
                  {stages[activeStage].subtitle}
                </span>
                <h3 className="text-2xl lg:text-3xl font-display font-bold tracking-tight">
                  {stages[activeStage].title}
                </h3>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-4 text-sm max-w-xl">
              {stages[activeStage].description}
            </p>
            <p className="text-muted/70 leading-relaxed text-sm max-w-xl">
              {stages[activeStage].detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function MobileView({ activeStage, progress }: { activeStage: number; progress: number }) {
  return (
    <div className="md:hidden space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {stages.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 flex-1 ${
              i <= activeStage ? 'bg-accent' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Stage label */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-accent font-semibold tracking-wider uppercase">
          {stages[activeStage].subtitle} — {stages[activeStage].title}
        </span>
        <span className="text-xs text-muted">{Math.round(progress * 100)}%</span>
      </div>

      {/* Content card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white rounded-xl border border-border p-6"
        >
          <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
            <StageIcon path={stageIcons[activeStage]} progress={progress} />
          </div>
          <p className="text-muted leading-relaxed mb-3 text-sm">
            {stages[activeStage].description}
          </p>
          <p className="text-muted/70 leading-relaxed text-sm">
            {stages[activeStage].detail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const update = useCallback((self: ScrollTrigger) => {
    const p = self.progress
    setProgress(p)
    setActiveStage(getActiveStage(p))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const pin = pinRef.current
    if (!pin) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: '+=300%',
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
        onUpdate: update,
      })
    }, pin)

    return () => ctx.revert()
  }, [isMobile, update])

  return (
    <section ref={sectionRef} className="relative bg-secondary" id="process">
      {/* Spacer for scroll room on desktop */}
      {!isMobile && <div className="h-[10vh]" />}

      <div ref={pinRef}>
        <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
              How We Work
            </span>
            <h2 className="text-heading-2 font-bold tracking-tight">
              From idea to impact.
            </h2>
            <p className="text-muted text-sm mt-2 max-w-md">
              Scroll through each stage of our process — no clicking required.
            </p>
          </motion.div>

          {isMobile ? (
            <MobileView activeStage={activeStage} progress={progress} />
          ) : (
            <DesktopView activeStage={activeStage} progress={progress} />
          )}
        </div>
      </div>

      {/* Spacer for scroll room on desktop */}
      {!isMobile && <div className="h-[90vh]" />}
    </section>
  )
}
