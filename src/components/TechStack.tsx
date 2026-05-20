'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

const technologies = [
  { name: 'Next.js', category: 'Framework', level: 95, icon: '⬢' },
  { name: 'React', category: 'Library', level: 98, icon: '⚛' },
  { name: 'TypeScript', category: 'Language', level: 95, icon: '🔷' },
  { name: 'Tailwind CSS', category: 'Styling', level: 92, icon: '🎨' },
  { name: 'Framer Motion', category: 'Animation', level: 90, icon: '✨' },
  { name: 'Node.js', category: 'Runtime', level: 88, icon: '🟢' },
  { name: 'PostgreSQL', category: 'Database', level: 85, icon: '🐘' },
  { name: 'AWS', category: 'Cloud', level: 82, icon: '☁' },
  { name: 'Figma', category: 'Design', level: 95, icon: '🎯' },
  { name: 'Three.js', category: '3D', level: 78, icon: '🧊' },
  { name: 'GSAP', category: 'Animation', level: 88, icon: '🚀' },
  { name: 'Vercel', category: 'Deployment', level: 92, icon: '▲' },
]

function TechCard3D({ tech, index, isLoaded, baseDelay }: { tech: typeof technologies[0]; index: number; isLoaded: boolean; baseDelay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }, [x, y, isMobile])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    scale.set(1.08)
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    scale.set(1)
    x.set(0)
    y.set(0)
  }, [x, y, scale])

  const floatDelay = index * 0.3
  const floatDuration = 4 + (index % 3) * 0.5

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: baseDelay + index * 0.08, duration: 0.5 }}
        className="rounded-xl border border-white/10 bg-background-secondary/80 backdrop-blur-xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-lg">{tech.icon}</span>
            <span className="font-display text-white font-semibold text-sm">{tech.name}</span>
          </div>
          <span className="text-xs text-text-muted">{tech.category}</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
            initial={{ width: 0 }}
            animate={isLoaded ? { width: `${tech.level}%` } : {}}
            transition={{ duration: 1, delay: baseDelay + index * 0.08 + 0.3, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: baseDelay + index * 0.08, duration: 0.6, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-xl border border-white/10 bg-background-secondary/90 backdrop-blur-xl p-5 cursor-pointer overflow-hidden relative"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: {
            duration: floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: floatDelay,
          },
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 transition-opacity duration-500`} style={{ opacity: isHovered ? 1 : 0 }} />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <motion.span
                className="text-xl"
                style={{ transform: 'translateZ(30px)' }}
                animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tech.icon}
              </motion.span>
              <motion.span
                className="font-display text-white font-semibold text-sm"
                style={{ transform: 'translateZ(20px)' }}
              >
                {tech.name}
              </motion.span>
            </div>
            <motion.span
              className="text-xs text-text-muted"
              style={{ transform: 'translateZ(15px)' }}
            >
              {tech.category}
            </motion.span>
          </div>

          <motion.div
            className="h-1.5 bg-white/5 rounded-full overflow-hidden"
            style={{ transform: 'translateZ(10px)' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan rounded-full"
              initial={{ width: 0 }}
              animate={isLoaded ? { width: `${tech.level}%` } : {}}
              transition={{ duration: 1.2, delay: baseDelay + index * 0.08 + 0.3, ease: 'easeOut' }}
            />
          </motion.div>

          <motion.div
            className="mt-2 text-right"
            style={{ transform: 'translateZ(10px)' }}
          >
            <span className="text-xs font-mono text-accent-blue">{tech.level}%</span>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function TechStack() {
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay }}
          >
            Technology
          </motion.span>
          <motion.h2
            className="font-display text-section font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
          >
            Our Tech Stack
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-2xl mx-auto text-body-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.2 }}
          >
            We leverage cutting-edge technologies to build fast, scalable, and
            beautiful digital products.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, i) => (
            <TechCard3D
              key={i}
              tech={tech}
              index={i}
              isLoaded={isLoaded}
              baseDelay={baseDelay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
