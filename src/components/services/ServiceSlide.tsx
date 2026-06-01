'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useTransform, useScroll, useMotionValueEvent, useSpring, MotionValue } from 'framer-motion'
import type { Service } from '@/data/services'
import { colorConfig } from '@/data/services'
import ServiceVisualization from './ServiceVisualization'
import KineticTypography from './KineticTypography'

interface Props {
  service: Service
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  isMobile: boolean
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

function MagneticButton({ children, href, color }: { children: React.ReactNode; href: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPosition({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={href}
        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          border: `1px solid ${color}30`,
        }}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 text-sm font-medium tracking-wider uppercase text-white">
          {children}
        </span>
        <svg className="relative z-10 w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}

export default function ServiceSlide({
  service,
  index,
  total,
  scrollYProgress,
  isMobile,
  mouseX,
  mouseY,
}: Props) {
  const [isActive, setIsActive] = useState(false)
  const wasActive = useRef(false)
  const hasTriggeredAnimation = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cfg = colorConfig[service.color]

  const progress = useTransform(scrollYProgress, (latest) => {
    const p = latest * total - index
    return Math.max(0, Math.min(1, p))
  })

  const scale = useTransform(progress, [0, 0.08, 0.92, 1], [0.6, 1, 1, 0.6])
  const opacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])
  const y = useTransform(progress, [0, 0.08, 0.92, 1], ['80vh', '0vh', '0vh', '-80vh'])
  const zIndex = total - index + 10

  useMotionValueEvent(progress, 'change', (v) => {
    const entering = v > 0.08 && v < 0.92
    if (entering && !wasActive.current) {
      wasActive.current = true
      hasTriggeredAnimation.current = true
      setIsActive(true)
    } else if (!entering && wasActive.current) {
      wasActive.current = false
      setIsActive(false)
    }
  })

  const benefitVariants = {
    hidden: { opacity: 0, x: -15, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: 0.3 + i * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  }

  const contentItemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  if (isMobile) {
    return (
      <div
        id={`service-${service.id}`}
        className="min-h-screen flex items-center justify-center px-6 py-24"
      >
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-8 h-[280px]">
            <ServiceVisualization
              type={service.visualization}
              isActive={true}
              isMobile={true}
              mouseX={0}
              mouseY={0}
              progress={1}
              color={service.color}
            />
          </div>
          <KineticTypography
            text={service.title}
            isActive={true}
            className="font-display text-4xl font-bold text-gradient mb-4"
            staggerDelay={0.05}
          />
          <p className="text-text-secondary text-base leading-relaxed mb-6">
            {service.description}
          </p>
          <motion.div
            className="space-y-3 mb-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                variants={contentItemVariants}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: cfg.accentColor }}
                />
                <span className="text-sm text-text-secondary">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
          <MagneticButton href="#contact" color={cfg.accentColor}>
            {service.cta}
          </MagneticButton>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      id={`service-${service.id}`}
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{
        scale,
        opacity,
        y,
        zIndex,
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Visualization */}
          <motion.div
            className="relative w-full aspect-square lg:aspect-auto lg:h-[65vh] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceVisualization
              type={service.visualization}
              isActive={isActive}
              isMobile={false}
              mouseX={mouseX.get()}
              mouseY={mouseY.get()}
              progress={1}
              color={service.color}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="space-y-6 lg:space-y-8"
            variants={contentVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
          >
            {/* Service number */}
            <motion.div
              className="flex items-center gap-3"
              variants={contentItemVariants}
            >
              <span
                className="font-mono text-xs tracking-[0.3em] uppercase"
                style={{ color: cfg.accentColor }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${cfg.accentColor}60, transparent)` }} />
            </motion.div>

            {/* Title */}
            <motion.div variants={contentItemVariants}>
              <KineticTypography
                text={service.title}
                isActive={isActive}
                className="font-display text-4xl xl:text-6xl font-bold text-gradient"
                staggerDelay={0.04}
                as="h2"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-sm font-mono tracking-wider uppercase"
              style={{ color: `${cfg.accentColor}CC` }}
              variants={contentItemVariants}
            >
              {service.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-text-secondary text-base lg:text-lg leading-relaxed"
              variants={contentItemVariants}
            >
              {service.description}
            </motion.p>

            {/* Benefits */}
            <motion.div className="space-y-3 lg:space-y-4" variants={contentVariants}>
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  custom={i}
                  variants={benefitVariants}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{
                      background: cfg.accentColor,
                      boxShadow: `0 0 8px ${cfg.accentColor}60`,
                    }}
                  />
                  <span className="text-text-primary text-sm lg:text-base">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={contentItemVariants}>
              <MagneticButton href="#contact" color={cfg.accentColor}>
                {service.cta}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
