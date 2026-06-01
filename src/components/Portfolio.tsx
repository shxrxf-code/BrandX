'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
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
}

const CARD_WIDTH = 340
const CARD_HEIGHT = 260
const ORBIT_RADIUS_DESKTOP = 520
const ORBIT_RADIUS_MOBILE = 320
const AUTO_ROTATE_DURATION = 24000

function getOrbitRadius(isMobile: boolean) {
  return isMobile ? ORBIT_RADIUS_MOBILE : ORBIT_RADIUS_DESKTOP
}

function OrbitCard({
  project,
  angle,
  isActive,
  isHovered,
  onHover,
  onLeave,
  isMobile,
  reducedMotion,
}: {
  project: ProjectData
  angle: number
  isActive: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isMobile: boolean
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const intensity = useMotionValue(isActive ? 0.6 : 0)
  const springIntensity = useSpring(intensity, { stiffness: 200, damping: 15 })

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 100, damping: 18 })
  const springTiltY = useSpring(tiltY, { stiffness: 100, damping: 18 })

  const floatPhase = useMemo(() => Math.random() * Math.PI * 2, [])
  const floatY = useMotionValue(0)
  const springFloatY = useSpring(floatY, { stiffness: 50, damping: 12 })

  const maxTilt = isMobile || reducedMotion ? 3 : 6

  useAnimationFrame((time) => {
    if (isHovered || reducedMotion) return
    const t = time / 1000
    floatY.set(Math.sin(t * 0.5 + floatPhase) * 4)
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -maxTilt
    tiltX.set(x)
    tiltY.set(y)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
    intensity.set(1)
  }, [isMobile, reducedMotion, maxTilt, tiltX, tiltY, glareX, glareY, intensity])

  const handleMouseEnter = useCallback(() => {
    onHover()
    intensity.set(1)
  }, [onHover, intensity])

  const handleMouseLeave = useCallback(() => {
    onLeave()
    tiltX.set(0)
    tiltY.set(0)
    intensity.set(isActive ? 0.6 : 0)
  }, [onLeave, tiltX, tiltY, intensity, isActive])

  const cardScale = useTransform(springIntensity, [0, 1], [1, 1.04])
  const glareOpacity = useTransform(springIntensity, [0, 1], [0, 0.08])
  const edgeOpacity = useTransform(springIntensity, [0, 1], [0, 0.3])

  return (
    <div
      ref={cardRef}
      className="absolute rounded-2xl cursor-pointer"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        left: '50%',
        top: '50%',
        marginLeft: -CARD_WIDTH / 2,
        marginTop: -CARD_HEIGHT / 2,
        transformStyle: 'preserve-3d',
        transform: `rotateY(${angle}deg) translateZ(${getOrbitRadius(isMobile)}px)`,
        pointerEvents: isActive || isHovered ? 'auto' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-background-secondary"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: springTiltX,
          rotateY: springTiltY,
          y: springFloatY,
          scale: cardScale,
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
            sizes="(max-width: 768px) 90vw, 340px"
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
              rgba(5,5,5,0.1) 20%,
              rgba(5,5,5,0.55) 60%,
              rgba(5,5,5,0.9) 100%
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
                return `radial-gradient(circle at ${gx}% ${gy}%, ${project.accent}18 0%, transparent 45%)`
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
                return `linear-gradient(to ${dirX} ${dirY}, ${project.accent}20 0%, transparent 30%)`
              }
            ),
            opacity: edgeOpacity,
          }}
        />

        {/* Glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: useTransform(
              springIntensity,
              (i) => `inset 0 0 0 1px ${project.accent}${Math.round(i * 45).toString(16).padStart(2, '0')}`
            ),
          }}
        />

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: project.accent }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Content layer */}
        <div
          className="absolute inset-0 p-4 flex flex-col justify-end"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          {/* Category + Year */}
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[9px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 rounded-full border backdrop-blur-sm"
              style={{
                color: project.accent,
                borderColor: `${project.accent}35`,
                background: `${project.accent}08`,
              }}
            >
              {project.category}
            </span>
            <span className="text-[10px] text-text-muted font-mono">{project.year}</span>
          </div>

          {/* Title */}
          <motion.h3
            className="font-display text-base font-bold mb-0.5"
            style={{
              transform: 'translateZ(15px)',
              color: useTransform(springIntensity, [0, 1], ['#FFFFFF', project.accent]),
            }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-[10px] text-text-secondary leading-relaxed mb-2 line-clamp-2">
            {project.description}
          </p>

          {/* Metrics */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(25px)' }}
          >
            <div>
              <div className="text-xs font-bold" style={{ color: project.accent }}>
                {project.metrics.conversion}
              </div>
              <div className="text-[8px] text-text-muted uppercase tracking-wider">Conversion</div>
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: project.accent }}>
                {project.metrics.traffic}
              </div>
              <div className="text-[8px] text-text-muted uppercase tracking-wider">Traffic</div>
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: project.accent }}>
                {project.metrics.engagement}
              </div>
              <div className="text-[8px] text-text-muted uppercase tracking-wider">Engage</div>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            className="flex gap-1 mt-1.5"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.15, delay: 0.03 }}
            style={{ transform: 'translateZ(30px)' }}
          >
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-[8px] font-mono tracking-wider uppercase px-1 py-0.5 rounded bg-black/5 border border-black/10 text-text-muted"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Arrow button */}
        <motion.div
          className="absolute top-3 right-3 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}25`,
            transform: 'translateZ(35px)',
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUpRight size={12} style={{ color: project.accent }} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const orbitAngle = useMotionValue(0)
  const springOrbitAngle = useSpring(orbitAngle, { stiffness: 60, damping: 15, mass: 1.5 })
  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const dragStartAngle = useRef(0)
  const velocity = useRef(0)
  const lastDragPos = useRef(0)
  const lastDragTime = useRef(0)

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
    },
  ], [])

  const anglePerCard = 360 / projects.length

  useEffect(() => {
    setMounted(true)
  }, [])

  useAnimationFrame((_time, delta) => {
    if (reducedMotion || isDragging.current || hoveredIndex !== null) return

    const speed = 360 / (AUTO_ROTATE_DURATION / 16)
    const current = orbitAngle.get()
    orbitAngle.set(current - speed * (delta / 16))

    const normalizedAngle = (((current - speed * (delta / 16)) % 360) + 360) % 360
    const newActive = Math.round(normalizedAngle / anglePerCard) % projects.length
    if (newActive !== activeIndexRef.current) {
      activeIndexRef.current = newActive
      setActiveIndex(newActive)
    }
  })

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = e.clientX
    dragStartAngle.current = orbitAngle.get()
    velocity.current = 0
    lastDragPos.current = e.clientX
    lastDragTime.current = performance.now()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [orbitAngle])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const delta = e.clientX - dragStart.current
    orbitAngle.set(dragStartAngle.current + delta * 0.3)

    const now = performance.now()
    const dt = now - lastDragTime.current
    if (dt > 0) {
      velocity.current = (e.clientX - lastDragPos.current) / dt * 0.3
    }
    lastDragPos.current = e.clientX
    lastDragTime.current = now
  }, [orbitAngle])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false

    const decay = () => {
      if (isDragging.current || reducedMotion) return
      velocity.current *= 0.95
      if (Math.abs(velocity.current) < 0.01) {
        velocity.current = 0
        return
      }
      const newVal = orbitAngle.get() + velocity.current * 16
      orbitAngle.set(newVal)

      const normalizedAngle = ((newVal % 360) + 360) % 360
      const newActive = Math.round(normalizedAngle / anglePerCard) % projects.length
      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive
        setActiveIndex(newActive)
      }

      requestAnimationFrame(decay)
    }

    requestAnimationFrame(decay)
  }, [orbitAngle, reducedMotion, anglePerCard, projects.length])

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

        {/* Orbit container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: isMobile ? 360 : 480,
            perspective: isMobile ? '800px' : '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Ambient grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Orbit path glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: getOrbitRadius(isMobile) * 2 + 100,
              height: getOrbitRadius(isMobile) * 2 + 100,
              marginLeft: -(getOrbitRadius(isMobile) + 50),
              marginTop: -(getOrbitRadius(isMobile) + 50),
              borderRadius: '50%',
              border: '1px solid rgba(124, 58, 237, 0.06)',
              boxShadow: '0 0 60px rgba(124, 58, 237, 0.03)',
            }}
          />

          {/* Center glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 70%)',
            }}
          />

          {/* Rotating carousel */}
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              rotateY: springOrbitAngle,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {projects.map((project, i) => {
              const angle = i * anglePerCard
              const isActive = i === activeIndex
              const isHovered = hoveredIndex === i

              return (
                <OrbitCard
                  key={i}
                  project={project}
                  angle={angle}
                  isActive={isActive}
                  isHovered={isHovered}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                  isMobile={isMobile}
                  reducedMotion={reducedMotion}
                />
              )
            })}
          </motion.div>

          {/* Fade edges */}
          <div
            className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(5,5,5,0.9) 0%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 md:w-40 pointer-events-none"
            style={{
              background: 'linear-gradient(-90deg, rgba(5,5,5,0.9) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Active project indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === activeIndex ? projects[i].accent : 'rgba(255,255,255,0.15)',
                width: i === activeIndex ? 24 : 6,
              }}
              onClick={() => {
                orbitAngle.set(-i * anglePerCard)
                setActiveIndex(i)
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-text-primary text-white font-medium text-sm tracking-wide uppercase rounded-full hover:bg-accent-blue hover:text-white transition-all duration-200"
          >
            Start a Project
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
