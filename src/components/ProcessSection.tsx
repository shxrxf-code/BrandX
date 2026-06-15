'use client'

import { useRef, useState, useEffect } from 'react'
import type { MotionValue } from 'framer-motion'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'

const stages = [
  {
    title: 'Research',
    number: '01',
    description: 'Understanding your market, users, and competition before making any decisions.',
    detail: 'We conduct stakeholder interviews, user surveys, competitive analysis, and market research to build a complete picture of your landscape.',
    color: '#2563EB',
    bgColor: 'rgba(37, 99, 235, 0.08)',
    borderColor: 'rgba(37, 99, 235, 0.15)',
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    title: 'Strategy',
    number: '02',
    description: 'Turning insights into a clear roadmap with defined goals and milestones.',
    detail: 'We define KPIs, create user personas, map customer journeys, and establish a strategic direction aligned with your business objectives.',
    color: '#6366F1',
    bgColor: 'rgba(99, 102, 241, 0.08)',
    borderColor: 'rgba(99, 102, 241, 0.15)',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Design',
    number: '03',
    description: 'Crafting intuitive interfaces and compelling visual experiences.',
    detail: 'We produce wireframes, interactive prototypes, design systems, and high-fidelity mockups validated through usability testing.',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.15)',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: 'Development',
    number: '04',
    description: 'Building robust, scalable solutions with modern technology.',
    detail: 'We implement using modular architecture, automated testing, continuous integration, and performant front-end and back-end systems.',
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.08)',
    borderColor: 'rgba(6, 182, 212, 0.15)',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Launch',
    number: '05',
    description: 'Deploying, testing, and optimizing for production readiness.',
    detail: 'We manage staging environments, run QA and load testing, configure CI/CD pipelines, and execute a smooth go-live with monitoring.',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.15)',
    icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  },
  {
    title: 'Growth',
    number: '06',
    description: 'Continuous improvement through data-driven iteration and optimization.',
    detail: 'We implement analytics, set up A/B testing, optimize conversion funnels, and iterate based on real user behavior and metrics.',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.15)',
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

function getActiveStage(progress: number): number {
  for (let i = 0; i < stageOffsets.length; i++) {
    const { start, end } = stageOffsets[i]
    if (progress >= start && progress < end) return i
  }
  return stageOffsets.length - 1
}

const easeLinear = [0.16, 1, 0.3, 1] as const

function PulseRing({ color }: { color: string }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color, opacity: 0.25 }}
      animate={{
        scale: [1, 1.6],
        opacity: [0.25, 0],
      }}
      transition={{
        duration: 2,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    />
  )
}

function StageDot({
  isActive,
  isPast,
  color,
}: {
  isActive: boolean
  isPast: boolean
  color: string
}) {
  return (
    <div className="relative flex items-center justify-center w-4 h-4">
      {isActive && <PulseRing color={color} />}
      <motion.span
        className="block rounded-full border-2"
        style={{
          borderColor: isActive || isPast ? color : 'rgb(226, 232, 240)',
          backgroundColor: isPast ? color : isActive ? color : 'transparent',
        }}
        animate={{
          scale: isActive ? 1 : 0.85,
          boxShadow: isActive
            ? `0 0 0 4px ${color}22`
            : '0 0 0 0px transparent',
        }}
        transition={{ duration: 0.6, ease: easeLinear }}
      />
    </div>
  )
}

function Timeline({
  activeStage,
  scrollProgress,
}: {
  activeStage: number
  scrollProgress: MotionValue<number>
}) {

  return (
    <div className="shrink-0 w-44 pt-1">
      <div className="relative flex flex-col">
        {/* Background track */}
        <div className="absolute left-[34px] top-3 bottom-3 w-0.5 bg-slate-100 rounded-full" />

        {/* Fill track */}
        <motion.div
          className="absolute left-[34px] top-3 w-0.5 rounded-full origin-top"
          style={{
            background: `linear-gradient(to bottom, ${stages[activeStage].color}, ${stages[activeStage].color})`,
            scaleY: scrollProgress,
          }}
        />

        {stages.map((stage, i) => {
          const isActive = i === activeStage
          const isPast = i < activeStage

          return (
            <div key={stage.title} className="flex items-center gap-4 py-2.5">
              <StageDot isActive={isActive} isPast={isPast} color={stage.color} />

              <div className="flex-1 min-w-0">
                <motion.span
                  className="block text-sm font-medium leading-tight"
                  animate={{
                    color: isActive
                      ? stage.color
                      : isPast
                        ? 'rgb(100, 116, 139)'
                        : 'rgb(148, 163, 184)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                  transition={{ duration: 0.4, ease: easeLinear }}
                >
                  {stage.title}
                </motion.span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ContentPanel({ activeStage }: { activeStage: number }) {
  const stage = stages[activeStage]

  return (
    <div className="flex-1 min-h-0">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, scale: 0.97, filter: 'blur(2px)' }}
          transition={{ duration: 0.55, ease: easeLinear }}
          className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 md:p-10"
          style={{
            borderColor: stage.borderColor,
          }}
        >
          <div className="flex items-start gap-5 md:gap-6 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: easeLinear, delay: 0.05 }}
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
            </motion.div>
            <div className="min-w-0">
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: easeLinear, delay: 0.08 }}
                className="text-xs font-semibold tracking-wider uppercase block mb-1"
                style={{ color: stage.color }}
              >
                {stage.number}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeLinear, delay: 0.1 }}
                className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground"
              >
                {stage.title}
              </motion.h3>
            </div>
          </div>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeLinear, delay: 0.14 }}
              className="text-sm md:text-base text-foreground leading-relaxed max-w-xl"
            >
              {stage.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeLinear, delay: 0.2 }}
              className="text-sm text-muted leading-relaxed max-w-xl"
            >
              {stage.detail}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.28 }}
            className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between"
          >
            <span className="text-xs text-muted/60 font-medium">
              {stage.number} / 06
            </span>
            <div className="flex gap-1.5">
              {stages.map((_, i) => (
                <span
                  key={i}
                  className="block w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      i === activeStage
                        ? stage.color
                        : i < activeStage
                          ? 'rgb(203, 213, 225)'
                          : 'rgb(226, 232, 240)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function MobileView({ activeStage, scrollProgress }: { activeStage: number; scrollProgress: number }) {
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
                i <= activeStage ? stage.color : 'rgb(226, 232, 240)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.45, ease: easeLinear }}
          className="bg-white rounded-2xl border border-border/50 p-6"
          style={{ borderColor: stage.borderColor }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: stage.bgColor, color: stage.color }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path d={stage.icon} />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase block" style={{ color: stage.color }}>
                {stage.number}
              </span>
              <h3 className="text-base font-display font-bold tracking-tight text-foreground">
                {stage.title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-3">{stage.description}</p>
          <p className="text-sm text-muted leading-relaxed">{stage.detail}</p>

          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-[10px] text-muted/60 font-medium">{stage.number} / 06</span>
            <span className="text-[10px] text-muted/40 font-medium">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const [activeStage, setActiveStage] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveStage(getActiveStage(latest))
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary"
      style={{ height: isMobile ? 'auto' : '400vh' }}
      id="process"
    >
      <div
        className={isMobile ? 'relative py-20' : 'sticky top-0 h-screen flex items-center overflow-hidden'}
      >
        <div className="max-w-content mx-auto px-6 md:px-10 w-full py-16 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-12"
          >
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
              How We Work
            </span>
            <h2 className="text-heading-2 font-bold tracking-tight">
              From idea to impact.
            </h2>
            <p className="text-muted text-sm mt-2 max-w-md">
              Scroll through each stage of our process — a journey from discovery to growth.
            </p>
          </motion.div>

          {isMobile ? (
            <MobileView
              activeStage={activeStage}
              scrollProgress={scrollYProgress.get()}
            />
          ) : (
            <div className="flex gap-12 lg:gap-20">
              <Timeline
                activeStage={activeStage}
                scrollProgress={scrollYProgress}
              />
              <ContentPanel activeStage={activeStage} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
