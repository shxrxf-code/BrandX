'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion'
import { services, colorConfig } from '@/data/services'
import { useIsMobile, useMousePosition } from '@/lib/hooks'
import ServiceSlide from '@/components/services/ServiceSlide'
import ServiceNavigation from '@/components/services/ServiceNavigation'
import CursorGlow from '@/components/services/CursorGlow'
import AmbientParticles from '@/components/services/AmbientParticles'

const numServices = services.length

const SECTION_HEADER_HEIGHT = 30

function useHasBeenInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [hasBeen, setHasBeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return hasBeen
}

export default function Services() {
  const isMobile = useIsMobile()
  const mouse = useMousePosition()

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const hasBeenInView = useHasBeenInView(sectionRef)

  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [headerLoaded, setHeaderLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setHeaderLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollTargetPadding = isMobile ? 0 : SECTION_HEADER_HEIGHT

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const currentServiceProgress = useTransform(scrollYProgress, (latest) => {
    return latest * numServices
  })

  useMotionValueEvent(currentServiceProgress, 'change', (v) => {
    const idx = Math.min(Math.max(Math.round(v), 0), numServices - 1)
    setActiveIndex(idx)
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, mouseX, mouseY])

  const sectionHeight = useMemo(() => {
    if (!mounted) return `${numServices * 100}vh`
    return `${scrollTargetPadding + numServices * 100}vh`
  }, [mounted, scrollTargetPadding])

  const headerOpacity = useTransform(
    smoothProgress,
    [0, 0.03, 0.08],
    [1, 1, 0]
  )

  const headerY = useTransform(
    smoothProgress,
    [0, 0.08],
    [0, -60]
  )

  const activeServiceColor = services[activeIndex]?.color ?? 'blue'
  const cfg = colorConfig[activeServiceColor]

  if (isMobile) {
    return (
      <section
        id="services"
        ref={sectionRef}
        className="relative overflow-hidden bg-background"
      >
        <div className="relative z-10">
          <div className="px-6 pt-24 pb-8 text-center">
            <motion.span
              className="text-xs font-mono tracking-[0.3em] uppercase block mb-4"
              style={{ color: cfg.accentColor }}
              initial={{ opacity: 0, y: -20 }}
              animate={headerLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              What We Do
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={headerLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Services Built for Growth
            </motion.h2>
            <motion.p
              className="text-text-secondary text-sm max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={headerLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              End-to-end digital solutions designed to transform your brand presence
              and accelerate business outcomes.
            </motion.p>
          </div>
          <CursorGlow isActive={false} color={cfg.accentColor} />
          {services.map((service, i) => (
            <ServiceSlide
              key={service.id}
              service={service}
              index={i}
              total={numServices}
              scrollYProgress={smoothProgress}
              isMobile={true}
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Ambient effects - follow active service color */}
      <AmbientParticles
        isActive={true}
        color={activeServiceColor}
      />

      <CursorGlow
        isActive={true}
        color={cfg.accentColor}
      />

      {/* Sticky wrapper */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Section header — fades out on scroll */}
        <motion.div
          ref={headerRef}
          className="absolute inset-x-0 top-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{
            opacity: headerOpacity,
            y: headerY,
            height: '100%',
          }}
        >
          <motion.span
            className="text-xs font-mono tracking-[0.3em] uppercase block mb-4"
            style={{ color: cfg.accentColor }}
            initial={{ opacity: 0, y: -20 }}
            animate={headerLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What We Do
          </motion.span>
          <motion.h2
            className="font-display text-6xl xl:text-7xl font-bold text-gradient text-center px-8"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={headerLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Services Built for Growth
          </motion.h2>
          <motion.p
            className="text-text-secondary text-lg max-w-xl text-center mt-6 px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={headerLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            End-to-end digital solutions designed to transform your brand presence
            and accelerate business outcomes.
          </motion.p>
        </motion.div>

        {/* Service slides */}
        {hasBeenInView && services.map((service, i) => (
          <ServiceSlide
            key={service.id}
            service={service}
            index={i}
            total={numServices}
            scrollYProgress={smoothProgress}
            isMobile={false}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
          />
        ))}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Navigation dots */}
      <ServiceNavigation
        services={services}
        activeIndex={activeIndex}
        isMobile={false}
      />

      {/* Progress indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-0.5 w-32 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
                background: `linear-gradient(90deg, ${cfg.accentColor}, ${cfg.secondaryColor})`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-wider text-text-muted">
            {String(activeIndex + 1).padStart(2, '0')}/{String(numServices).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity={0.3}>
          <path d="M12 5V19M12 19L19 12M12 19L5 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
