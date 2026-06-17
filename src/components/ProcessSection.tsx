'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'

interface Stage {
  number: string
  title: string
  description: string
  detail: string
  deliverables: string[]
  outcome: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
}

const stages: Stage[] = [
  {
    number: '01',
    title: 'Research',
    description: 'Understanding your market, users, and competition before making any decisions.',
    detail: 'We conduct stakeholder interviews, user surveys, competitive analysis, and market research to build a complete picture of your landscape.',
    deliverables: ['Market Analysis', 'User Personas', 'Competitive Audit', 'Opportunity Map'],
    outcome: 'A complete picture of your market landscape and user needs.',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.2)',
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Turning insights into a clear roadmap with defined goals and milestones.',
    detail: 'We define KPIs, create user personas, map customer journeys, and establish a strategic direction aligned with your business objectives.',
    deliverables: ['KPI Definition', 'User Journeys', 'Roadmap', 'Go-to-Market Plan'],
    outcome: 'A clear strategic direction aligned with your business objectives.',
    color: '#6366F1',
    bgColor: 'rgba(99,102,241,0.08)',
    borderColor: 'rgba(99,102,241,0.2)',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Crafting intuitive interfaces and compelling visual experiences.',
    detail: 'We produce wireframes, interactive prototypes, design systems, and high-fidelity mockups validated through usability testing.',
    deliverables: ['Wireframes', 'Interactive Prototypes', 'Design System', 'UI Kit'],
    outcome: 'Pixel-perfect designs validated through usability testing.',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.2)',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Building robust, scalable solutions with modern technology.',
    detail: 'We implement using modular architecture, automated testing, continuous integration, and performant front-end and back-end systems.',
    deliverables: ['Modular Architecture', 'Automated Testing', 'CI/CD Pipeline', 'Performance Tuning'],
    outcome: 'A robust, scalable solution built for production.',
    color: '#D946EF',
    bgColor: 'rgba(217,70,239,0.08)',
    borderColor: 'rgba(217,70,239,0.2)',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deploying, testing, and optimizing for production readiness.',
    detail: 'We manage staging environments, run QA and load testing, configure CI/CD pipelines, and execute a smooth go-live with monitoring.',
    deliverables: ['Staging Environment', 'QA & Load Testing', 'Go-Live Plan', 'Monitoring Setup'],
    outcome: 'A smooth, monitored launch with zero-downtime deployment.',
    color: '#10B981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
    icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Continuous improvement through data-driven iteration and optimization.',
    detail: 'We implement analytics, set up A/B testing, optimize conversion funnels, and iterate based on real user behavior and metrics.',
    deliverables: ['Analytics Setup', 'A/B Testing', 'Conversion Optimization', 'Iteration Cycle'],
    outcome: 'Ongoing growth through data-driven iteration and optimization.',
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.2)',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  },
]

const stageOffsets = [
  { start: 0, end: 0.16 },
  { start: 0.16, end: 0.32 },
  { start: 0.32, end: 0.48 },
  { start: 0.48, end: 0.64 },
  { start: 0.64, end: 0.80 },
  { start: 0.80, end: 1.0 },
]

function StepCard({
  stage,
  isActive,
  isPast,
  onClick,
}: {
  stage: Stage
  isActive: boolean
  isPast: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1.5 pt-1 group cursor-pointer"
      animate={{ y: isActive ? -2 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <span
        className="text-xs font-semibold tracking-wider transition-all duration-300"
        style={{
          color: isActive ? stage.color : isPast ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
        }}
      >
        {stage.number}
      </span>

      <div className="relative w-3 h-3 flex items-center justify-center">
        <motion.div
          className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
          style={{
            backgroundColor: isActive ? stage.color : isPast ? 'rgba(255,255,255,0.25)' : 'transparent',
            borderColor: isActive ? stage.color : 'rgba(255,255,255,0.15)',
            boxShadow: isActive ? `0 0 12px ${stage.color}50` : 'none',
          }}
        />
      </div>

      <span
        className="text-sm font-display tracking-tight transition-all duration-300"
        style={{
          color: isActive ? '#F8FAFC' : isPast ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
          fontWeight: isActive ? 700 : isPast ? 500 : 400,
        }}
      >
        {stage.title}
      </span>
    </motion.button>
  )
}

function DesktopView({
  stages,
  activeStage,
  progress,
  onStageClick,
}: {
  stages: Stage[]
  activeStage: number
  progress: number
  onStageClick: (i: number) => void
}) {
  const stage = stages[activeStage]

  return (
    <div className="hidden md:block">
      <div className="relative mb-10 lg:mb-14">
        <div className="absolute left-[2%] right-[2%] top-[52px] h-px bg-white/[0.04] rounded-full" />
        <motion.div
          className="absolute left-[2%] top-[52px] h-px rounded-full origin-left"
          style={{
            scaleX: progress,
            background: `linear-gradient(to right, ${stages[activeStage].color}, ${stages[activeStage].color})`,
            opacity: progress > 0.01 ? 1 : 0,
          }}
        />

        <div
          className="absolute left-[2%] top-[52px] w-2 h-2 -ml-1 -mt-[3px] rounded-full transition-colors duration-300"
          style={{
            backgroundColor: progress > 0.01 ? stages[activeStage].color : 'rgba(255,255,255,0.15)',
            boxShadow: progress > 0.01 ? `0 0 12px ${stages[activeStage].color}60` : 'none',
          }}
        />

        <div className="grid grid-cols-6 gap-0">
          {stages.map((s, i) => (
            <StepCard
              key={s.number}
              stage={s}
              isActive={i === activeStage}
              isPast={i < activeStage}
              onClick={() => onStageClick(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="glass-strong rounded-2xl overflow-hidden"
          style={{ borderColor: stage.borderColor }}
        >
          <div className="relative p-6 md:p-8">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${stage.color}08, transparent 50%)`,
              }}
            />

            <div className="relative z-10">
              <div className="flex items-start gap-4 md:gap-6 mb-6">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: stage.bgColor, color: stage.color }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path d={stage.icon} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase block mb-1"
                    style={{ color: stage.color }}
                  >
                    {stage.number} — {stage.title}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground">
                    {stage.title}
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {stage.description}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase mb-3">
                    Deliverables
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {stage.deliverables.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg"
                        style={{
                          background: `${stage.color}12`,
                          color: stage.color,
                          border: `1px solid ${stage.borderColor}`,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase mb-2">
                    Outcome
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{stage.outcome}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-muted/60 font-medium">
                  {stage.number} / 06
                </span>
                <div className="flex gap-1.5">
                  {stages.map((_, i) => (
                    <span
                      key={i}
                      className="block w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          i === activeStage
                            ? stage.color
                            : i < activeStage
                              ? 'rgba(255,255,255,0.25)'
                              : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function MobileView({
  stages,
  activeStage,
  progress,
  onStageClick,
}: {
  stages: Stage[]
  activeStage: number
  progress: number
  onStageClick: (i: number) => void
}) {
  const stage = stages[activeStage]

  return (
    <div className="md:hidden space-y-5">
      <div className="flex items-center gap-2">
        {stages.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full flex-1 transition-all duration-500"
            style={{
              backgroundColor:
                i <= activeStage ? stages[activeStage].color : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>

      <div className="space-y-2">
        {stages.map((s, i) => {
          const isActive = i === activeStage
          const isPast = i < activeStage

          return (
            <motion.button
              key={s.number}
              onClick={() => onStageClick(i)}
              className="w-full text-left"
              animate={{
                opacity: isActive ? 1 : isPast ? 0.6 : 0.35,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 py-2.5 px-1">
                <div className="relative w-3 h-3 flex items-center justify-center shrink-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? s.color : isPast ? 'rgba(255,255,255,0.2)' : 'transparent',
                      borderColor: isActive ? s.color : 'rgba(255,255,255,0.15)',
                      boxShadow: isActive ? `0 0 10px ${s.color}50` : 'none',
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="text-[10px] font-semibold tracking-wider"
                    style={{ color: isActive ? s.color : 'rgba(255,255,255,0.25)' }}
                  >
                    {s.number}
                  </span>
                  <h3
                    className="text-sm font-display tracking-tight truncate transition-all duration-300"
                    style={{
                      color: isActive ? '#F8FAFC' : 'rgba(255,255,255,0.45)',
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${stage.borderColor}`,
          }}
        >
          <div className="p-4">
            <p className="text-sm text-foreground leading-relaxed mb-3">
              {stage.detail}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {stage.deliverables.map((d) => (
                <span
                  key={d}
                  className="px-2 py-1 text-[10px] font-medium rounded-md"
                  style={{
                    background: `${stage.color}15`,
                    color: stage.color,
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-muted/60 font-medium">{stage.number} / 06</span>
              <span className="text-[10px] text-muted/40 font-medium">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    for (let i = 0; i < stageOffsets.length; i++) {
      const { start, end } = stageOffsets[i]
      if (latest >= start && latest < end) {
        setActiveStage(i)
        return
      }
    }
    setActiveStage(stageOffsets.length - 1)
  })

  const progress = scrollYProgress.get()

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary"
      style={{ height: '400vh' }}
      id="process"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] animate-aurora-slow" />
        <div className="absolute -bottom-40 right-1/3 w-[350px] h-[350px] rounded-full bg-magenta/5 blur-[100px] animate-aurora" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
              How We Work
            </span>
            <h2 className="text-heading-2 font-bold tracking-tight">
              From idea to impact.
            </h2>
            <p className="text-muted text-sm mt-2 max-w-lg">
              A connected journey from discovery to growth — scroll through each stage.
            </p>
          </motion.div>

          <DesktopView
            stages={stages}
            activeStage={activeStage}
            progress={progress}
            onStageClick={(i) => {
              setActiveStage(i)
              const offsets = stageOffsets[i]
              const targetProgress = offsets.start + (offsets.end - offsets.start) / 2
              const section = sectionRef.current
              if (section) {
                const scrollTarget = section.offsetTop + targetProgress * (section.scrollHeight - window.innerHeight)
                window.scrollTo({ top: scrollTarget, behavior: 'smooth' })
              }
            }}
          />

          <MobileView
            stages={stages}
            activeStage={activeStage}
            progress={progress}
            onStageClick={(i) => {
              setActiveStage(i)
              const offsets = stageOffsets[i]
              const targetProgress = offsets.start + (offsets.end - offsets.start) / 2
              const section = sectionRef.current
              if (section) {
                const scrollTarget = section.offsetTop + targetProgress * (section.scrollHeight - window.innerHeight)
                window.scrollTo({ top: scrollTarget, behavior: 'smooth' })
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}
