'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your brand, audience, and objectives to uncover insights that shape strategy.',
    details: ['Brand Audit', 'Market Research', 'User Interviews', 'Competitive Analysis'],
    color: 'blue',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Translate insights into a clear roadmap that aligns business goals with user needs.',
    details: ['Positioning', 'Content Strategy', 'Technical Architecture', 'KPI Framework'],
    color: 'purple',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Craft visually stunning and functionally intuitive experiences that captivate and convert.',
    details: ['Wireframing', 'Visual Design', 'Prototyping', 'Design Systems'],
    color: 'cyan',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Build with precision using modern technologies, ensuring performance and scalability.',
    details: ['Frontend Development', 'Backend Integration', 'CMS Setup', 'QA Testing'],
    color: 'blue',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deploy with confidence, monitoring every metric to ensure a flawless go-live experience.',
    details: ['Staging Review', 'Performance Optimization', 'Analytics Setup', 'Go-Live'],
    color: 'purple',
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Continuously optimize and iterate based on data, user feedback, and emerging trends.',
    details: ['A/B Testing', 'CRO', 'Content Updates', 'Scale Strategy'],
    color: 'cyan',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; ring: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/20', glow: 'shadow-glow-blue', ring: 'ring-accent-blue/30' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/20', glow: 'shadow-glow-purple', ring: 'ring-accent-purple/30' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', border: 'border-accent-cyan/20', glow: 'shadow-glow-cyan', ring: 'ring-accent-cyan/30' },
}

function ProcessCard3D({ step, index, isLoaded, baseDelay, isActive }: { step: typeof steps[0]; index: number; isLoaded: boolean; baseDelay: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const colors = colorMap[step.color] || colorMap.blue

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: -15 }}
        animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ delay: baseDelay + index * 0.15, duration: 0.7, ease: 'easeOut' }}
        className="relative"
      >
        <div className={`rounded-2xl border ${colors.border} bg-background-secondary/80 backdrop-blur-xl p-6`}>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg} border ${colors.border}`}>
              <span className={`font-display text-xl font-bold ${colors.text}`}>{step.number}</span>
            </div>
            <div className="flex-1">
              <h3 className={`font-display text-xl font-bold mb-2 ${colors.text}`}>{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{step.description}</p>
              <div className="flex flex-wrap gap-2">
                {step.details.map((detail, j) => (
                  <span key={j} className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-black/5 px-2 py-1 rounded-full">
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const isEven = index % 2 === 0
  const offset = isEven ? 'pr-16' : 'pl-16'

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -20 : 20 }}
      animate={isLoaded ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ delay: baseDelay + index * 0.15, duration: 0.8, ease: 'easeOut' }}
      className={`relative ${offset}`}
    >
      <div
        ref={cardRef}
        className={`rounded-2xl border ${isActive ? colors.border : 'border-black/10'} bg-background-secondary/90 backdrop-blur-xl p-8 cursor-pointer overflow-hidden relative`}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setIsHovered(true); scale.set(1.03) }}
        onMouseLeave={() => { setIsHovered(false); scale.set(1); x.set(0); y.set(0) }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            scale,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent transition-opacity duration-500`} style={{ opacity: isHovered ? 0.08 : 0 }} />

          <div className="relative z-10">
            <div className="flex items-start gap-6">
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg} border ${colors.border}`}
                style={{ transform: 'translateZ(40px)' }}
              >
                <span className={`font-display text-2xl font-bold ${colors.text}`}>{step.number}</span>
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  className={`font-display text-2xl font-bold mb-3 transition-colors duration-300 ${isHovered ? colors.text : 'text-text-primary'}`}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  className="text-text-secondary leading-relaxed mb-5"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {step.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {step.details.map((detail, j) => (
                    <span
                      key={j}
                      className="text-xs font-mono tracking-wider uppercase text-text-muted bg-black/5 px-3 py-1.5 rounded-full border border-black/5"
                    >
                      {detail}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${step.color === 'blue' ? 'accent-blue' : step.color === 'purple' ? 'accent-purple' : 'accent-cyan'}/50 to-transparent`}
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const stepIndex = Math.min(Math.floor(v * steps.length), steps.length - 1)
    setActiveStep(Math.max(0, stepIndex))
  })

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section id="process" className="section-padding relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase mb-4 block"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay }}
          >
            Our Process
          </motion.span>
          <motion.h2
            className="font-display text-section font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
          >
            How We Build Excellence
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-2xl mx-auto text-body-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.2 }}
          >
            A proven methodology refined over hundreds of successful projects.
            Every step is designed to deliver maximum impact.
          </motion.p>
        </div>

        <div className="relative">
          {!isMobile && (
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <div className="absolute inset-0 bg-black/5" />
              <motion.div
                className="absolute top-0 w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan"
                style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>
          )}

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => {
              return (
                <div key={i} className="relative">
                  {!isMobile && (
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        className={`w-5 h-5 rounded-full ${step.color === 'blue' ? 'bg-accent-blue' : step.color === 'purple' ? 'bg-accent-purple' : 'bg-accent-cyan'} shadow-glow-${step.color}`}
                        initial={{ scale: 0 }}
                        animate={isLoaded ? { scale: 1 } : {}}
                        transition={{ delay: baseDelay + i * 0.15, duration: 0.4 }}
                      />
                    </div>
                  )}

                  <ProcessCard3D
                    step={step}
                    index={i}
                    isLoaded={isLoaded}
                    baseDelay={baseDelay}
                    isActive={i === activeStep}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
