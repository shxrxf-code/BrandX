'use client'

import { motion, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { use3DTilt, useIsMobile, useReducedMotion } from '@/lib/hooks'

interface ProjectData {
  title: string
  category: string
  image: string
  year: string
  description: string
  metrics: { conversion: string; traffic: string; engagement: string }
  tech: string[]
  accent: string
  span: string
}

interface HolographicCardProps {
  project: ProjectData
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

export default function HolographicCard({ project, index, isHovered, onHover, onLeave }: HolographicCardProps) {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const maxRotation = isMobile || reducedMotion ? 3 : 7

  const {
    ref,
    rotateX,
    rotateY,
    scale,
    glareX,
    glareY,
    intensity,
    handlers,
  } = use3DTilt(maxRotation)

  const shadowX = useTransform(rotateY, [-maxRotation, maxRotation], [-12, 12])
  const shadowY = useTransform(rotateX, [-maxRotation, maxRotation], [-12, 12])
  const shadowBlur = useTransform(intensity, [0, 1], [20, 40])
  const shadowOpacity = useTransform(intensity, [0, 1], [0.3, 0.6])

  const glareOpacity = useTransform(intensity, [0, 1], [0, 0.12])
  const edgeHighlight = useTransform(intensity, [0, 1], [0, 0.4])

  const shineX = useTransform(glareX, [0, 100], [-50, 150])

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl cursor-pointer group ${project.span}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      {...handlers}
      onMouseEnter={() => { onHover(); handlers.onMouseEnter() }}
      onMouseLeave={() => { onLeave(); handlers.onMouseLeave() }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          scale,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* Layer 1: Background image (slowest parallax) */}
        <motion.div
          className="absolute inset-0 bg-background-secondary"
          style={{
            scale: useTransform(scale, [1, 1.025], [1, 1.06]),
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 90vw, 40vw"
            quality={80}
          />
        </motion.div>

        {/* Layer 2: Gradient overlay (depth-based) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              rgba(5,5,5,0.2) 30%,
              rgba(5,5,5,0.7) 70%,
              rgba(5,5,5,0.95) 100%
            )`,
          }}
        />

        {/* Layer 3: Holographic glare (cursor-following) */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(
                circle at ${gx}% ${gy}%,
                ${project.accent}25 0%,
                transparent 55%
              )`
            ),
            opacity: glareOpacity,
          }}
        />

        {/* Layer 4: Shine sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              105deg,
              transparent 40%,
              rgba(255,255,255,0.06) 45%,
              rgba(255,255,255,0.1) 50%,
              rgba(255,255,255,0.06) 55%,
              transparent 60%
            )`,
            x: useTransform(shineX, (x) => `${x}%`),
            opacity: useTransform(intensity, [0, 1], [0, 1]),
          }}
        />

        {/* Layer 5: Edge highlight (top-left lighting) */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useTransform(
              [glareX, glareY],
              (values) => {
                const [gx, gy] = values as [number, number]
                const angleX = gx < 50 ? 'left' : 'right'
                const angleY = gy < 50 ? 'top' : 'bottom'
                return `linear-gradient(
                  to ${angleX} ${angleY},
                  ${project.accent}30 0%,
                  transparent 40%
                )`
              }
            ),
            opacity: edgeHighlight,
          }}
        />

        {/* Layer 6: Dynamic shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: useTransform(
              [shadowX, shadowY, shadowBlur, shadowOpacity],
              (values) => {
                const [sx, sy, blur, opacity] = values as [number, number, number, number]
                return `${sx}px ${sy}px ${blur}px rgba(0,0,0,${opacity}),
                 0 0 ${blur * 1.5}px ${project.accent}10`
              }
            ),
          }}
        />

        {/* Layer 7: Glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: useTransform(
              intensity,
              (i) => `inset 0 0 0 1px ${project.accent}${Math.round(i * 60).toString(16).padStart(2, '0')},
                       inset 0 0 20px ${project.accent}${Math.round(i * 15).toString(16).padStart(2, '0')}`
            ),
          }}
        />

        {/* Layer 8: Content (fastest parallax - floats above) */}
        <div
          className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end"
          style={{
            transform: 'translateZ(30px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Category + Year */}
          <motion.div
            className="flex items-center justify-between mb-2"
            style={{
              transform: 'translateZ(20px)',
            }}
          >
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
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-display text-lg md:text-xl lg:text-2xl font-bold text-white mb-1"
            style={{
              transform: 'translateZ(25px)',
              color: useTransform(intensity, [0, 1], ['#FFFFFF', project.accent]),
              transition: 'color 0.3s ease',
            }}
          >
            {project.title}
          </motion.h3>

          {/* Description - only on large cards */}
          {project.span.includes('row-span-2') && (
            <motion.p
              className="text-xs text-text-secondary leading-relaxed mb-3 max-w-sm line-clamp-2"
              style={{
                transform: 'translateZ(15px)',
                opacity: useTransform(intensity, [0, 1], [1, 0.7]),
              }}
            >
              {project.description}
            </motion.p>
          )}

          {/* Metrics - reveal on hover */}
          <motion.div
            className="flex gap-5 md:gap-6 mt-2"
            initial={{ opacity: 0, y: 12 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: 'translateZ(35px)',
            }}
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
              transition={{ duration: 0.25, delay: 0.08 }}
              style={{
                transform: 'translateZ(40px)',
              }}
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
          )}
        </div>

        {/* Layer 9: Arrow button (highest depth) */}
        <motion.div
          className="absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: `${project.accent}20`,
            border: `1px solid ${project.accent}30`,
            transform: 'translateZ(50px)',
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUpRight size={16} style={{ color: project.accent }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
