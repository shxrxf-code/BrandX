'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'
import MagneticButton from '@/components/ui/MagneticButton'

interface CoverProject {
  title: string
  category: string
  industry: string
  image: string
  year: string
  description: string
  metrics: { conversion: string; traffic: string; engagement: string }
  tech: string[]
  results: string
  accent: string
}

const CARD_W = 340
const CARD_H = 260
const CARD_W_MOBILE = 220
const CARD_H_MOBILE = 170
const SPACING = 300
const SPACING_MOBILE = 180
const AUTOPLAY_DELAY = 4500

const SCALES = [0.72, 0.85, 1.0, 0.85, 0.72]
const ROTATIONS = [24, 12, 0, -12, -24]
const OPACITIES = [0.3, 0.6, 1.0, 0.6, 0.3]

const SCALES_MOBILE = [0.78, 0.88, 1.0, 0.88, 0.78]
const ROTATIONS_MOBILE = [15, 8, 0, -8, -15]
const OPACITIES_MOBILE = [0.4, 0.7, 1.0, 0.7, 0.4]

const PROJECTS: CoverProject[] = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    industry: 'Clean Energy',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    year: '2026',
    description: 'Complete rebrand and web platform for a renewable energy startup expanding across three continents.',
    metrics: { conversion: '+340%', traffic: '+180%', engagement: '4.2x' },
    tech: ['Next.js', 'Tailwind', 'Framer Motion', 'Stripe'],
    results: '3x pipeline growth in 6 months',
    accent: '#7C3AED',
  },
  {
    title: "Drifto Men's Fashion",
    category: 'E-Commerce',
    industry: 'Luxury Retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    year: '2026',
    description: 'Luxury fashion e-commerce with immersive product experiences and AI-driven personalization.',
    metrics: { conversion: '+220%', traffic: '+95%', engagement: '3.8x' },
    tech: ['Shopify', 'React', 'Three.js', 'Algolia'],
    results: '2.2M revenue in launch quarter',
    accent: '#06B6D4',
  },
  {
    title: 'Mirra Montessori',
    category: 'Brand Identity',
    industry: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    year: '2026',
    description: 'Complete brand strategy, visual identity, and digital ecosystem for a premium Montessori school.',
    metrics: { conversion: '+150%', traffic: '+120%', engagement: '2.9x' },
    tech: ['WordPress', 'Custom Theme', 'SEO', 'LMS'],
    results: '92% enrollment increase',
    accent: '#22D3EE',
  },
  {
    title: 'Diamond Restaurant',
    category: 'Brand & Platform',
    industry: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    year: '2025',
    description: 'Premium restaurant brand identity with a seamless online ordering and reservation platform.',
    metrics: { conversion: '+190%', traffic: '+140%', engagement: '3.1x' },
    tech: ['Next.js', 'Stripe', 'Sanity', 'Google Maps'],
    results: '4.9★ average rating across platforms',
    accent: '#F59E0B',
  },
  {
    title: 'Aero Travels',
    category: 'Digital Identity',
    industry: 'Travel & Tourism',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
    year: '2026',
    description: 'Luxury travel brand identity and digital presence for a high-end concierge travel service.',
    metrics: { conversion: '+210%', traffic: '+130%', engagement: '3.3x' },
    tech: ['Astro', 'Tailwind', 'Contentful', 'Mapbox'],
    results: '1.8K bookings in first month',
    accent: '#10B981',
  },
]

function getPosition(i: number, active: number, total: number): number {
  let pos = i - active
  const half = Math.floor(total / 2)
  if (pos > half) pos -= total
  if (pos < -half) pos += total
  return pos
}

const springConfig = { type: 'spring' as const, stiffness: 180, damping: 26, mass: 1.1 }

function CoverCard({
  project,
  position,
  isHovered,
  onHover,
  onLeave,
  isMobile,
  reducedMotion,
}: {
  project: CoverProject
  position: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isMobile: boolean
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springMX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springMY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  const cw = isMobile ? CARD_W_MOBILE : CARD_W
  const ch = isMobile ? CARD_H_MOBILE : CARD_H
  const spacing = isMobile ? SPACING_MOBILE : SPACING
  const scales = isMobile ? SCALES_MOBILE : SCALES
  const rotations = isMobile ? ROTATIONS_MOBILE : ROTATIONS
  const opacities = isMobile ? OPACITIES_MOBILE : OPACITIES

  const idx = position + 2
  const targetScale = scales[idx]
  const targetRotateY = rotations[idx]
  const targetOpacity = opacities[idx]

  const isCenter = position === 0

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  const glareGradient = useTransform(
    [springMX, springMY],
    ([x, y]) =>
      `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, ${project.accent}20 0%, transparent 60%)`
  )

  const shineGradient = useTransform(
    [springMX, springMY],
    ([x, y]) => {
      const angle = 105 + ((x as number) - 0.5) * 30
      const pos = (y as number) * 100
      return `linear-gradient(${angle}deg, transparent ${pos - 20}%, rgba(255,255,255,0.06) ${pos - 5}%, rgba(255,255,255,0.04) ${pos}%, transparent ${pos + 20}%)`
    }
  )

  return (
    <motion.div
      ref={cardRef}
      className="absolute cursor-pointer"
      style={{
        width: cw,
        height: ch,
        left: '50%',
        top: '50%',
        marginLeft: -cw / 2,
        marginTop: -ch / 2,
        zIndex: isCenter ? 20 : position === -1 || position === 1 ? 10 : 1,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        pointerEvents: 'auto',
      }}
      animate={{
        x: position * spacing,
        scale: targetScale,
        rotateY: targetRotateY,
        opacity: targetOpacity,
      }}
      transition={reducedMotion ? { duration: 0 } : springConfig}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={isCenter && !reducedMotion ? {
        scale: targetScale * 1.04,
        transition: { type: 'spring' as const, stiffness: 300, damping: 18 },
      } : undefined}
    >
      {/* Card body */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          background: '#1A1A1E',
          boxShadow: isCenter
            ? `0 8px 40px rgba(0,0,0,0.5), 0 0 80px ${project.accent}15, 0 0 0 1px ${project.accent}25`
            : `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: isHovered && isCenter ? 'scale(1.05)' : 'scale(1)' }}
            loading="lazy"
            sizes="(max-width: 768px) 60vw, 340px"
            quality={80}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glareGradient }}
        />

        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: shineGradient }}
        />

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span
            className="text-[9px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 rounded-full border backdrop-blur-sm inline-block mb-1.5"
            style={{
              color: project.accent,
              borderColor: `${project.accent}40`,
              background: `${project.accent}12`,
            }}
          >
            {project.category}
          </span>
          <h3
            className="font-display text-sm md:text-base font-bold text-white"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
          >
            {project.title}
          </h3>
        </div>

        {/* Edge glow for center card */}
        {isCenter && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: isCenter ? (isHovered ? 0.6 : 0.3) : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: `linear-gradient(135deg, ${project.accent}15, transparent 40%, ${project.accent}08)`,
              boxShadow: `inset 0 0 0 1px ${project.accent}30`,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

const detailVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ProjectDetail({ project }: { project: CoverProject }) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
        {/* Left: title + description */}
        <div className="lg:col-span-3">
          <motion.div custom={0} variants={detailVariant} initial="hidden" animate="visible">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[10px] font-mono tracking-[0.25em] uppercase px-2 py-1 rounded-full border backdrop-blur-sm"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}35`,
                  background: `${project.accent}0D`,
                }}
              >
                {project.industry}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">{project.year}</span>
            </div>
          </motion.div>

          <motion.h3
            custom={1}
            variants={detailVariant}
            initial="hidden"
            animate="visible"
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, #FFFFFF 30%, ${project.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            custom={2}
            variants={detailVariant}
            initial="hidden"
            animate="visible"
            className="text-zinc-400 text-sm md:text-base leading-relaxed mb-5 max-w-xl"
          >
            {project.description}
          </motion.p>

          <motion.div
            custom={3}
            variants={detailVariant}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-5"
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border"
                style={{
                  color: `${project.accent}`,
                  borderColor: `${project.accent}25`,
                  background: `${project.accent}08`,
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div custom={4} variants={detailVariant} initial="hidden" animate="visible">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm tracking-wide uppercase transition-all duration-400"
              style={{
                background: `${project.accent}`,
                color: '#FFFFFF',
                boxShadow: `0 0 30px ${project.accent}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 50px ${project.accent}50`
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${project.accent}30`
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <span>View Project</span>
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>

        {/* Right: metrics + results */}
        <div className="lg:col-span-2 flex flex-col justify-end">
          <motion.div
            custom={5}
            variants={detailVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 mb-5"
          >
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} className="text-center">
                <div
                  className="text-xl md:text-2xl font-bold font-display"
                  style={{ color: project.accent }}
                >
                  {val}
                </div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-mono mt-1">
                  {key}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={6}
            variants={detailVariant}
            initial="hidden"
            animate="visible"
            className="rounded-xl p-4 border"
            style={{
              background: `${project.accent}08`,
              borderColor: `${project.accent}15`,
            }}
          >
            <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-mono mb-1">
              Key Result
            </div>
            <div className="text-white font-display font-semibold text-sm">{project.results}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CoverFlow() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragState = useRef({ active: false, startX: 0, startIdx: 0, moved: false })

  const containerH = isMobile ? 300 : 400

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current)
    }
  }, [])

  const goTo = useCallback((idx: number) => {
    const next = ((idx % PROJECTS.length) + PROJECTS.length) % PROJECTS.length
    activeRef.current = next
    setActiveIndex(next)
  }, [])

  const goNext = useCallback(() => goTo(activeRef.current + 1), [goTo])
  const goPrev = useCallback(() => goTo(activeRef.current - 1), [goTo])

  // Autoplay
  useEffect(() => {
    if (reducedMotion || isPaused || hoveredIndex !== null) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }
    autoplayRef.current = setInterval(goNext, AUTOPLAY_DELAY)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [reducedMotion, isPaused, hoveredIndex, goNext])

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true)
    if (pauseTimer.current) clearTimeout(pauseTimer.current)
    pauseTimer.current = setTimeout(() => setIsPaused(false), 5000)
  }, [])

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { goPrev(); pauseTemporarily() }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { goNext(); pauseTemporarily() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext, pauseTemporarily])

  // Wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 5) {
      if (e.deltaX > 0) goNext()
      else goPrev()
      pauseTemporarily()
    }
  }, [goNext, goPrev, pauseTemporarily])

  // Drag
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragState.current = { active: true, startX: e.clientX, startIdx: activeRef.current, moved: false }
    pauseTemporarily()
  }, [pauseTemporarily])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.active) return
    const dx = e.clientX - dragState.current.startX
    if (Math.abs(dx) > 40) {
      dragState.current.moved = true
      if (dx > 0) goPrev()
      else goNext()
      dragState.current.active = false
    }
  }, [goPrev, goNext])

  const handlePointerUp = useCallback(() => {
    dragState.current.active = false
  }, [])

  // Touch
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchActive = useRef(false)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchActive.current = true
    pauseTemporarily()
  }, [pauseTemporarily])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchActive.current) return
    touchActive.current = false
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) goPrev()
      else goNext()
    }
  }, [goPrev, goNext])

  const activeProject = PROJECTS[activeIndex]

  if (!mounted) return null

  return (
    <section id="work" className="relative overflow-hidden" style={{ background: '#0A0A0C' }}>
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />

      <div className="section-container py-24 md:py-32 lg:py-40 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4 block"
            style={{ color: activeProject.accent }}
          >
            Selected Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${activeProject.accent})`,
              }}
            >
              Projects
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-lg">
            A curated selection of brands, platforms, and digital experiences we&apos;ve crafted for forward-thinking clients.
          </p>
        </motion.div>

        {/* Cover Flow */}
        <div
          ref={containerRef}
          className="relative w-full select-none touch-pan-y"
          style={{
            height: containerH,
            perspective: isMobile ? '600px' : '1000px',
            perspectiveOrigin: '50% 50%',
          }}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, #0A0A0C 0%, transparent 15%, transparent 85%, #0A0A0C 100%)`,
            }}
          />

          {/* Cards */}
          <div
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {PROJECTS.map((project, i) => {
              const pos = getPosition(i, activeIndex, PROJECTS.length)
              const isHovered = hoveredIndex === i
              return (
                <CoverCard
                  key={i}
                  project={project}
                  position={pos}
                  isHovered={isHovered}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                  isMobile={isMobile}
                  reducedMotion={reducedMotion}
                />
              )
            })}
          </div>

          {/* Nav arrows */}
          {!isMobile && (
            <>
              <button
                onClick={() => { goPrev(); pauseTemporarily() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-30 transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => { goNext(); pauseTemporarily() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-30 transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-10">
          {PROJECTS.map((proj, i) => (
            <button
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === activeIndex ? 28 : 6,
                height: 6,
                background: i === activeIndex ? proj.accent : 'rgba(255,255,255,0.15)',
                boxShadow: i === activeIndex ? `0 0 12px ${proj.accent}40` : 'none',
              }}
              onClick={() => { goTo(i); pauseTemporarily() }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Active project details */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <ProjectDetail key={activeIndex} project={activeProject} />
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-zinc-500 text-sm mb-6">
            Ready to create something extraordinary?
          </p>
          <MagneticButton variant="primary" href="#contact">
            Start a Project <ExternalLink size={14} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0C, transparent)' }}
      />
    </section>
  )
}
