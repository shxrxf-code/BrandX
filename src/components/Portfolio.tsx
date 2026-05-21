'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate, useAnimationFrame } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

interface ProjectData {
  title: string
  category: string
  image: string
  year: string
  description: string
  metrics: { conversion: string; traffic: string; engagement: string }
  tech: string[]
  accent: string
  width: number
}

const CARD_WIDTH = 380
const CARD_HEIGHT = 280
const GAP = 20
const AUTO_SCROLL_SPEED = 0.4

function useAutoRotation(index: number, isHovered: boolean, isMobile: boolean, reducedMotion: boolean) {
  const rotateY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const floatY = useMotionValue(0)
  const autoRotate = useMotionValue(0)

  const springConfig = { stiffness: 80, damping: 20, mass: 1.2 }
  const springRotateY = useSpring(rotateY, springConfig)
  const springRotateX = useSpring(rotateX, springConfig)
  const springFloatY = useSpring(floatY, { stiffness: 60, damping: 15, mass: 1.5 })
  const springAutoRotate = useSpring(autoRotate, { stiffness: 40, damping: 12, mass: 2 })

  const phaseOffset = index * 1.2
  const floatAmplitude = isMobile || reducedMotion ? 3 : 6
  const autoRotateRange = isMobile || reducedMotion ? 2 : 5

  useAnimationFrame((time) => {
    if (isHovered) return

    const t = time / 1000
    const float = Math.sin(t * 0.6 + phaseOffset) * floatAmplitude
    const rotation = Math.sin(t * 0.3 + phaseOffset) * autoRotateRange

    floatY.set(float)
    autoRotate.set(rotation)
  })

  return {
    rotateY: springRotateY,
    rotateX: springRotateX,
    floatY: springFloatY,
    autoRotate: springAutoRotate,
    setRotateY: rotateY.set,
    setRotateX: rotateX.set,
  }
}

function AutoRotatingCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  isMobile,
  reducedMotion,
}: {
  project: ProjectData
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isMobile: boolean
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { rotateY, rotateX, floatY, autoRotate, setRotateY, setRotateX } = useAutoRotation(
    index, isHovered, isMobile, reducedMotion
  )

  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const intensity = useMotionValue(0)
  const springIntensity = useSpring(intensity, { stiffness: 200, damping: 15 })

  const maxRotation = isMobile || reducedMotion ? 4 : 8

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * maxRotation
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -maxRotation
    setRotateY(x)
    setRotateX(y)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
    intensity.set(1)
  }, [isMobile, reducedMotion, maxRotation, setRotateY, setRotateX, glareX, glareY, intensity])

  const handleMouseEnter = useCallback(() => {
    onHover()
    intensity.set(1)
  }, [onHover, intensity])

  const handleMouseLeave = useCallback(() => {
    onLeave()
    setRotateY(0)
    setRotateX(0)
    intensity.set(0)
  }, [onLeave, setRotateY, setRotateX, intensity])

  const scale = useTransform(springIntensity, [0, 1], [1, 1.03])
  const glareOpacity = useTransform(springIntensity, [0, 1], [0, 0.1])
  const edgeOpacity = useTransform(springIntensity, [0, 1], [0, 0.35])
  const shadowDepth = useTransform(springIntensity, [0, 1], [20, 35])
  const shadowOpacity = useTransform(springIntensity, [0, 1], [0.25, 0.5])

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 rounded-2xl cursor-pointer group"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-background-secondary"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY: useTransform([rotateY, autoRotate], (values) => (values[0] as number) + (values[1] as number)),
          y: floatY,
          scale,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 90vw, 380px"
            quality={75}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              rgba(5,5,5,0.15) 25%,
              rgba(5,5,5,0.6) 65%,
              rgba(5,5,5,0.92) 100%
            )`,
          }}
        />

        {/* Holographic glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              (values) => {
                const gx = values[0] as number
                const gy = values[1] as number
                return `radial-gradient(circle at ${gx}% ${gy}%, ${project.accent}20 0%, transparent 50%)`
              }
            ),
            opacity: glareOpacity,
          }}
        />

        {/* Edge highlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useTransform(
              [glareX, glareY],
              (values) => {
                const gx = values[0] as number
                const gy = values[1] as number
                const dirX = gx < 50 ? 'left' : 'right'
                const dirY = gy < 50 ? 'top' : 'bottom'
                return `linear-gradient(to ${dirX} ${dirY}, ${project.accent}25 0%, transparent 35%)`
              }
            ),
            opacity: edgeOpacity,
          }}
        />

        {/* Dynamic shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: useTransform(
              [rotateY, rotateX, shadowDepth, shadowOpacity],
              (values) => {
                const ry = values[0] as number
                const rx = values[1] as number
                const blur = values[2] as number
                const opacity = values[3] as number
                const sx = ry * 1.5
                const sy = rx * 1.5
                return `${sx}px ${sy}px ${blur}px rgba(0,0,0,${opacity}), 0 0 ${blur * 0.8}px ${project.accent}08`
              }
            ),
          }}
        />

        {/* Glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: useTransform(
              springIntensity,
              (i) => `inset 0 0 0 1px ${project.accent}${Math.round(i * 50).toString(16).padStart(2, '0')}`
            ),
          }}
        />

        {/* Content layer */}
        <div
          className="absolute inset-0 p-5 flex flex-col justify-end"
          style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
        >
          {/* Category + Year */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border backdrop-blur-sm"
              style={{
                color: project.accent,
                borderColor: `${project.accent}40`,
                background: `${project.accent}10`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-text-muted font-mono">{project.year}</span>
          </div>

          {/* Title */}
          <motion.h3
            className="font-display text-lg font-bold mb-1"
            style={{
              transform: 'translateZ(20px)',
              color: useTransform(springIntensity, [0, 1], ['#FFFFFF', project.accent]),
            }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Metrics */}
          <motion.div
            className="flex gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(30px)' }}
          >
            <div>
              <div className="text-sm font-bold" style={{ color: project.accent }}>
                {project.metrics.conversion}
              </div>
              <div className="text-[9px] text-text-muted uppercase tracking-wider">Conversion</div>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: project.accent }}>
                {project.metrics.traffic}
              </div>
              <div className="text-[9px] text-text-muted uppercase tracking-wider">Traffic</div>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: project.accent }}>
                {project.metrics.engagement}
              </div>
              <div className="text-[9px] text-text-muted uppercase tracking-wider">Engagement</div>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            className="flex gap-1.5 mt-2.5"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            style={{ transform: 'translateZ(35px)' }}
          >
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Arrow button */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: `${project.accent}20`,
            border: `1px solid ${project.accent}30`,
            transform: 'translateZ(40px)',
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUpRight size={14} style={{ color: project.accent }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollX = useMotionValue(0)
  const isHoveringRail = useRef(false)

  const projects: ProjectData[] = useMemo(() => [
    {
      title: 'SolarTech Energy',
      category: 'Brand & Web',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      year: '2026',
      description: 'Complete rebrand and web platform for a renewable energy startup',
      metrics: { conversion: '+340%', traffic: '+180%', engagement: '4.2x' },
      tech: ['Next.js', 'Tailwind', 'Framer Motion'],
      accent: '#7C3AED',
      width: CARD_WIDTH,
    },
    {
      title: "Drifto Men's Fashion",
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      year: '2026',
      description: 'Luxury fashion e-commerce with immersive product experience',
      metrics: { conversion: '+220%', traffic: '+95%', engagement: '3.8x' },
      tech: ['Shopify', 'React', 'GSAP'],
      accent: '#06B6D4',
      width: CARD_WIDTH,
    },
    {
      title: 'Mirra Montessori School',
      category: 'Personal Branding',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      year: '2026',
      description: 'Complete personal branding strategy and digital identity',
      metrics: { conversion: '+150%', traffic: '+120%', engagement: '2.9x' },
      tech: ['WordPress', 'Custom Theme', 'SEO'],
      accent: '#22D3EE',
      width: CARD_WIDTH,
    },
    {
      title: 'Diamond Restaurant',
      category: 'Brand & Web',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      year: '2025',
      description: 'Premium restaurant branding with online ordering platform',
      metrics: { conversion: '+190%', traffic: '+140%', engagement: '3.1x' },
      tech: ['Next.js', 'Stripe', 'Sanity'],
      accent: '#F59E0B',
      width: CARD_WIDTH,
    },
    {
      title: 'Aero Travels',
      category: 'Personal Branding',
      image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
      year: '2026',
      description: 'Premium travel brand identity and digital presence',
      metrics: { conversion: '+210%', traffic: '+130%', engagement: '3.3x' },
      tech: ['Astro', 'Tailwind', 'Contentful'],
      accent: '#10B981',
      width: CARD_WIDTH,
    },
  ], [])

  const duplicatedProjects = useMemo(() => [...projects, ...projects], [projects])
  const totalWidth = projects.length * (CARD_WIDTH + GAP)

  useEffect(() => {
    setMounted(true)
  }, [])

  useAnimationFrame((_, delta) => {
    if (reducedMotion || isHoveringRail.current) return

    const current = scrollX.get()
    const next = current - AUTO_SCROLL_SPEED * (delta / 16)

    if (next <= -totalWidth) {
      scrollX.set(0)
    } else {
      scrollX.set(next)
    }
  })

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const current = scrollX.get()
    const next = current + e.deltaY * 0.5

    if (next <= -totalWidth) {
      scrollX.set(0)
    } else if (next > 0) {
      scrollX.set(-totalWidth)
    } else {
      scrollX.set(next)
    }
  }, [scrollX, totalWidth])

  const handleTouchStart = useRef<number | null>(null)
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (handleTouchStart.current === null) return
    const touch = e.touches[0]
    const delta = touch.clientX - handleTouchStart.current
    const current = scrollX.get()
    const next = current + delta * 0.8

    if (next <= -totalWidth) {
      scrollX.set(0)
    } else if (next > 0) {
      scrollX.set(-totalWidth)
    } else {
      scrollX.set(next)
    }
    handleTouchStart.current = touch.clientX
  }, [scrollX, totalWidth])

  if (!mounted) return null

  return (
    <section id="work" className="relative section-padding overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-3 block">
            Selected Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
            Our Projects
          </h2>
          <p className="text-text-secondary text-sm md:text-base mt-3 max-w-lg">
            A curated selection of brands, platforms, and digital experiences we&apos;ve crafted for forward-thinking clients.
          </p>
        </motion.div>

        {/* Auto-scrolling rail */}
        <div
          ref={containerRef}
          className="relative -mx-6 md:-mx-12 lg:-mx-16 px-6 md:px-12 lg:px-16"
          onWheel={handleWheel}
          onTouchStart={(e) => { handleTouchStart.current = e.touches[0].clientX }}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { handleTouchStart.current = null }}
          onMouseEnter={() => { isHoveringRail.current = true }}
          onMouseLeave={() => { isHoveringRail.current = false }}
        >
          <motion.div
            className="flex gap-5"
            style={{ x: scrollX, willChange: 'transform' }}
          >
            {duplicatedProjects.map((project, i) => (
              <AutoRotatingCard
                key={`${i}-${project.title}`}
                project={project}
                index={i}
                isHovered={hoveredIndex === i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-text-secondary text-sm mb-6">
            Ready to create something extraordinary?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-background font-medium text-sm tracking-wide uppercase rounded-full hover:bg-accent-blue hover:text-white transition-all duration-200"
          >
            Start a Project
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
