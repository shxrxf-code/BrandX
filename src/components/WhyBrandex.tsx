'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Award, Code2, TrendingUp } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import { useIsMobile } from '@/lib/hooks'

const reasons = [
  {
    number: '01',
    icon: Zap,
    title: 'Strategic Thinking',
    description: 'Every project begins with deep research and strategic planning. We don\'t guess—we analyze, test, and validate.',
    color: 'blue',
    accent: '#7C3AED',
  },
  {
    number: '02',
    icon: Award,
    title: 'Award-Winning Design',
    description: 'Our design philosophy blends aesthetics with functionality, creating experiences that are both beautiful and effective.',
    color: 'purple',
    accent: '#06B6D4',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Technical Excellence',
    description: 'We build with the latest technologies, ensuring your digital products are fast, secure, and scalable.',
    color: 'cyan',
    accent: '#22D3EE',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Results That Matter',
    description: 'Beautiful design means nothing without results. We measure success by the impact we create for your business.',
    color: 'blue',
    accent: '#7C3AED',
  },
]

function ReasonCard({ reason, index, isActive }: { reason: typeof reasons[0]; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateX.set(((e.clientY - centerY) / rect.height) * -8)
    rotateY.set(((e.clientX - centerX) / rect.width) * 8)
  }, [isMobile, rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <ScrollReveal delay={index * 0.08} direction="left" distance={40}>
      <motion.div
        ref={cardRef}
        className={`glass-card rounded-3xl p-8 group relative overflow-hidden border transition-all duration-500 cursor-pointer ${
          isActive ? 'border-white/15' : 'border-white/[0.06] hover:border-white/15'
        }`}
        style={{
          perspective: '1000px',
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={isMobile ? {} : { y: -4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Active indicator */}
        <motion.div
          className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
          style={{ background: reason.accent }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive || isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${reason.accent}12, transparent 60%)`,
          }}
        />

        <div className="relative z-10 flex items-start gap-6">
          <div className="flex-shrink-0">
            <motion.div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3`}
              style={{
                background: `${reason.accent}15`,
                border: `1px solid ${reason.accent}30`,
              }}
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <reason.icon size={24} style={{ color: reason.accent }} />
            </motion.div>
            <motion.span
              className="font-display text-2xl font-bold block"
              style={{ color: reason.accent }}
              animate={{ opacity: isActive || isHovered ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              {reason.number}
            </motion.span>
          </div>

          <div>
            <motion.h3
              className="font-display text-xl font-bold mb-3 transition-colors duration-300"
              animate={{ color: isActive || isHovered ? reason.accent : '#fff' }}
            >
              {reason.title}
            </motion.h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {reason.description}
            </p>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function WhyBrandex() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = parseInt(entry.target.getAttribute('data-reason-index') || '0')
          if (entry.isIntersecting) {
            setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-10% 0px -30% 0px' }
    )

    const cards = sectionRef.current.querySelectorAll('[data-reason-index]')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-accent-purple/10 blur-[200px] -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Sticky sidebar */}
          <ScrollReveal direction="right">
            <div className="lg:sticky lg:top-32">
              <motion.span
                className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Why Brandex
              </motion.span>
              <motion.h2
                className="font-display text-section font-bold text-gradient mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Built Different.<br />Built Better.
              </motion.h2>
              <motion.p
                className="text-text-secondary text-body-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We&apos;re not just another agency. We&apos;re your strategic partner in
                digital transformation, committed to delivering excellence at every touchpoint.
              </motion.p>

              {/* Feature list */}
              <motion.div
                className="space-y-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {['Data-Driven Decisions', 'Transparent Process', 'Dedicated Support'].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <CheckCircle2 size={16} className="text-accent-blue" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <MagneticButton variant="primary" href="#contact">
                  Start Your Project
                </MagneticButton>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Reason cards */}
          <div className="space-y-6">
            {reasons.map((reason, i) => (
              <div key={i} data-reason-index={i}>
                <ReasonCard reason={reason} index={i} isActive={i === activeIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
