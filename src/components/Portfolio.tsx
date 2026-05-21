'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

const projects = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    year: '2026',
    description: 'Complete rebrand and web platform for a renewable energy startup',
    metrics: { conversion: '+340%', traffic: '+180%', engagement: '4.2x' },
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    accent: '#7C3AED',
    span: 'md:col-span-2 md:row-span-2',
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
    span: 'md:col-span-1 md:row-span-1',
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
    span: 'md:col-span-1 md:row-span-1',
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
    span: 'md:col-span-1 md:row-span-1',
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
    span: 'md:col-span-1 md:row-span-1',
  },
]

function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  isMobile,
  reducedMotion,
}: {
  project: typeof projects[0]
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isMobile: boolean
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    setTilt({ x, y })
  }, [isMobile, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    onLeave()
  }, [onLeave])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${project.span}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-background-secondary">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
          loading="lazy"
          sizes="(max-width: 768px) 90vw, 40vw"
          quality={80}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px ${project.accent}40, 0 0 30px ${project.accent}15`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
        {/* Category + Year */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border"
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
        <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-accent-blue transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description - hidden on small cards, shown on large */}
        {project.span.includes('row-span-2') && (
          <p className="text-xs text-text-secondary leading-relaxed mb-3 max-w-sm line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Metrics - reveal on hover */}
        <motion.div
          className="flex gap-5 md:gap-6 mt-2"
          initial={{ opacity: 0, y: 8 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
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

        {/* Tech stack pills - only on large card */}
        {project.span.includes('row-span-2') && (
          <motion.div
            className="flex gap-1.5 mt-3"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Arrow button */}
      <motion.div
        className="absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center"
        style={{
          background: `${project.accent}20`,
          border: `1px solid ${project.accent}30`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight size={16} style={{ color: project.accent }} />
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="work" className="relative section-padding">
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

        {/* Bento Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[240px]"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          ))}
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
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
