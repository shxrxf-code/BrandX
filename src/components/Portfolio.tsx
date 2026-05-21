'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

const projects = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85',
    year: '2026',
    description: 'Complete rebrand and web platform for a renewable energy startup',
    metrics: { conversion: '+340%', traffic: '+180%', engagement: '4.2x' },
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    accent: '#3B82F6',
  },
  {
    title: "Drifto Men's Fashion",
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85',
    year: '2026',
    description: 'Luxury fashion e-commerce with immersive product experience',
    metrics: { conversion: '+220%', traffic: '+95%', engagement: '3.8x' },
    tech: ['Shopify', 'React', 'GSAP'],
    accent: '#A855F7',
  },
  {
    title: 'Mirra Montessori School',
    category: 'Personal Branding',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=85',
    year: '2026',
    description: 'Complete personal branding strategy and digital identity for a Montessori school',
    metrics: { conversion: '+150%', traffic: '+120%', engagement: '2.9x' },
    tech: ['WordPress', 'Custom Theme', 'SEO'],
    accent: '#22D3EE',
  },
  {
    title: 'Diamond Restaurant',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
    year: '2025',
    description: 'Premium restaurant branding with menu design and online ordering platform',
    metrics: { conversion: '+190%', traffic: '+140%', engagement: '3.1x' },
    tech: ['Next.js', 'Stripe', 'Sanity'],
    accent: '#F59E0B',
  },
  {
    title: 'Aero Travels',
    category: 'Personal Branding',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=85',
    year: '2026',
    description: 'Premium travel brand identity and digital presence for a luxury travel agency',
    metrics: { conversion: '+210%', traffic: '+130%', engagement: '3.3x' },
    tech: ['Astro', 'Tailwind', 'Contentful'],
    accent: '#10B981',
  },
]

function ProjectScene({
  project,
  index,
  scrollProgress,
  isActive,
  isMobile,
  reducedMotion,
}: {
  project: typeof projects[0]
  index: number
  scrollProgress: number
  isActive: boolean
  isMobile: boolean
  reducedMotion: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const titleWords = project.title.split(' ')

  const v = scrollProgress
  const imageScale = v < 0.1 ? 1.15 - v * 1.5 : v > 0.8 ? 1 - (v - 0.8) * 0.75 : 1
  const imageBlur = v < 0.15 ? Math.max(0, 20 - v * 133) : v > 0.85 ? (v - 0.85) * 133 : 0
  const imageOpacity = v < 0.05 ? v * 20 : v > 0.9 ? (1 - v) * 10 : 1
  const titleOpacity = v < 0.15 ? 0 : v < 0.3 ? (v - 0.15) * 6.67 : v > 0.8 ? (1 - v) * 5 : 1
  const titleY = v < 0.2 ? 60 - v * 300 : v > 0.8 ? (v - 0.8) * -150 : 0
  const metricsOpacity = v < 0.25 ? 0 : v < 0.4 ? (v - 0.25) * 6.67 : v > 0.7 ? (1 - v) * 3.33 : 1
  const metricsY = v < 0.35 ? 40 - (v - 0.2) * 267 : v > 0.75 ? (v - 0.75) * -200 : 0
  const hudOpacity = v > 0.2 && v < 0.85 ? 0.4 : 0
  const actionOpacity = v > 0.3 && v < 0.8 ? 1 : 0
  const rotateY = reducedMotion ? 0 : v < 0.3 ? (0.3 - v) * 15 : v > 0.7 ? (v - 0.7) * -15 : 0

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: imageOpacity,
          background: `radial-gradient(ellipse at center, ${project.accent}15 0%, transparent 70%)`,
        }}
      />

      {/* Grid overlay */}
      {!isMobile && !reducedMotion && (
        <div
          className="absolute inset-0 grid-lines pointer-events-none transition-opacity duration-300"
          style={{ opacity: v > 0.1 && v < 0.9 ? 0.3 : 0 }}
        />
      )}

      {/* Main project image */}
      <motion.div
        className="relative w-[85vw] md:w-[70vw] lg:w-[60vw] h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden"
        style={{
          scale: imageScale,
          filter: `blur(${imageBlur}px)`,
          opacity: imageOpacity,
          rotateY,
          transformPerspective: 1200,
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 85vw, 60vw"
          quality={85}
        />

        {/* Glass overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70" />

        {/* Reflection layer */}
        {!isMobile && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
            }}
          />
        )}
      </motion.div>

      {/* Floating content layers */}
      <div
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 md:pb-16 pointer-events-none"
        style={{ opacity: titleOpacity }}
      >
        {/* Category + Year */}
        <div className="flex items-center gap-4 mb-3" style={{ transform: `translateY(${titleY - 20}px)` }}>
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
            style={{
              color: project.accent,
              borderColor: `${project.accent}40`,
              background: `${project.accent}10`,
            }}
          >
            {project.category}
          </span>
          <span className="text-sm text-text-muted font-mono">{project.year}</span>
        </div>

        {/* Title - word by word */}
        <h3
          className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3"
          style={{ transform: `translateY(${titleY}px)` }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h3>

        {/* Description */}
        <p
          className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl mb-6"
          style={{ transform: `translateY(${titleY + 10}px)` }}
        >
          {project.description}
        </p>

        {/* Tech stack pills */}
        {!isMobile && (
          <div
            className="flex gap-2 mb-6"
            style={{ transform: `translateY(${metricsY}px)`, opacity: metricsOpacity }}
          >
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded bg-white/5 border border-white/10 text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Metrics */}
        <div
          className="flex gap-8 md:gap-12"
          style={{ transform: `translateY(${metricsY}px)`, opacity: metricsOpacity }}
        >
          <div>
            <div className="text-xl md:text-2xl font-bold" style={{ color: project.accent }}>
              {project.metrics.conversion}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Conversion</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold" style={{ color: project.accent }}>
              {project.metrics.traffic}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Traffic</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold" style={{ color: project.accent }}>
              {project.metrics.engagement}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Engagement</div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <motion.div
        className="absolute top-6 right-6 md:top-8 md:right-8"
        style={{ opacity: actionOpacity, scale: isHovered ? 1.1 : 1 }}
      >
        <div
          className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer pointer-events-auto transition-all duration-300"
          style={{
            background: `${project.accent}20`,
            border: `1px solid ${project.accent}40`,
          }}
        >
          <ArrowUpRight size={20} style={{ color: project.accent }} />
        </div>
      </motion.div>

      {/* HUD accents */}
      {!isMobile && !reducedMotion && (
        <>
          <div
            className="absolute top-8 left-8 flex items-center gap-2 pointer-events-none transition-opacity duration-300"
            style={{ opacity: hudOpacity }}
          >
            <div className="w-6 h-[1px]" style={{ background: project.accent }} />
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: project.accent }}>
              PRJ.{String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div
            className="absolute bottom-8 right-8 flex items-center gap-2 pointer-events-none transition-opacity duration-300"
            style={{ opacity: hudOpacity }}
          >
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: project.accent }}>
              SCROLL.EXPLORE
            </span>
            <div className="w-6 h-[1px]" style={{ background: project.accent }} />
          </div>
        </>
      )}
    </div>
  )
}

function getProjectProgress(scrollValue: number, index: number, total: number) {
  const start = index / total
  const end = (index + 1) / total
  if (scrollValue < start) return 0
  if (scrollValue > end) return 1
  return (scrollValue - start) / (end - start)
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollValue, setScrollValue] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollValue(v)
    const idx = Math.min(Math.floor(v * projects.length), projects.length - 1)
    setActiveIndex(Math.max(0, idx))
  })

  const headerOpacity = scrollValue < 0.05 ? 1 - scrollValue * 20 : 0
  const headerY = scrollValue < 0.05 ? 0 : -30
  const finalCTAOpacity = scrollValue > 0.85 ? (scrollValue - 0.85) * 6.67 : 0
  const scrollHintOpacity = scrollValue < 0.08 ? 1 - scrollValue * 12.5 : 0

  if (!mounted) return null

  const projectHeight = isMobile ? 120 : 140

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative"
      style={{ height: `${projects.length * projectHeight}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* Section header */}
        <div
          className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-16 pt-12 md:pt-16 transition-all duration-300"
          style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)` }}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
            Our Projects
          </h2>
        </div>

        {/* Project scenes */}
        {projects.map((project, i) => {
          const progress = getProjectProgress(scrollValue, i, projects.length)
          return (
            <ProjectScene
              key={i}
              project={project}
              index={i}
              scrollProgress={progress}
              isActive={i === activeIndex}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          )
        })}

        {/* Final CTA */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-opacity duration-300"
          style={{ opacity: finalCTAOpacity }}
        >
          <div className="text-center">
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
              Ready for Yours?
            </h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Let&apos;s create something extraordinary together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-background font-medium text-sm tracking-wide uppercase rounded-full hover:bg-accent-blue hover:text-white transition-all duration-300"
            >
              Start a Project
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Progress indicator */}
        {!isMobile && (
          <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
            {projects.map((_, i) => (
              <div key={i} className="relative">
                <div
                  className={`w-1 h-8 rounded-full transition-all duration-500 ${
                    i === activeIndex ? 'bg-accent-blue' : 'bg-white/10'
                  }`}
                />
                {i === activeIndex && (
                  <div
                    className="absolute bottom-0 left-0 w-1 rounded-full bg-accent-blue/30 transition-all duration-100"
                    style={{
                      height: `${((scrollValue * projects.length) - i) * 100}%`,
                      maxHeight: '2rem',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-accent-blue/50 to-transparent"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  )
}
