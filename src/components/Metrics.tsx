'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { useIsMobile } from '@/lib/hooks'

const metrics = [
  { value: 50, suffix: '+', label: 'Projects Completed', description: 'Across industries and continents', color: 'blue' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', description: 'Long-term partnerships built on trust', color: 'purple' },
  { value: 10, suffix: 'M+', label: 'Users Reached', description: 'Through our digital experiences', color: 'cyan' },
  { value: 25, suffix: '+', label: 'Awards Won', description: 'Recognition for design excellence', color: 'blue' },
]

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; gradient: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/20', glow: 'shadow-glow-blue', gradient: 'from-accent-blue to-accent-cyan' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/20', glow: 'shadow-glow-purple', gradient: 'from-accent-purple to-accent-violet' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', border: 'border-accent-cyan/20', glow: 'shadow-glow-cyan', gradient: 'from-accent-cyan to-accent-blue' },
}

function MetricCard3D({ metric, index, isLoaded, baseDelay }: { metric: typeof metrics[0]; index: number; isLoaded: boolean; baseDelay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })
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
    scale.set(1.06)
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    scale.set(1)
    x.set(0)
    y.set(0)
  }, [x, y, scale])

  const colors = colorMap[metric.color] || colorMap.blue

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: baseDelay + index * 0.1, duration: 0.6 }}
        className="text-center rounded-2xl border border-black/10 bg-background-secondary/80 backdrop-blur-xl p-8"
      >
        <div className={`font-display text-5xl md:text-6xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent mb-4`}>
          <AnimatedCounter value={metric.value} suffix={metric.suffix} duration={2} />
        </div>
        <div className={`font-display text-text-primary font-semibold text-lg mb-2 ${colors.text}`}>
          {metric.label}
        </div>
        <div className="text-sm text-text-muted">{metric.description}</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 60, rotateX: -15, scale: 0.9 }}
      animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ delay: baseDelay + index * 0.15, duration: 0.8, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-2xl border border-black/10 bg-background-secondary/90 backdrop-blur-xl p-8 cursor-pointer overflow-hidden relative text-center"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent transition-opacity duration-500`} style={{ opacity: isHovered ? 0.1 : 0 }} />

        <motion.div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${colors.bg} blur-3xl`}
          animate={isHovered ? { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 1, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10">
          <motion.div
            className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent mb-6`}
            style={{ transform: 'translateZ(40px)' }}
          >
            <AnimatedCounter value={metric.value} suffix={metric.suffix} duration={2} />
          </motion.div>

          <motion.div
            className={`font-display text-text-primary font-semibold text-xl mb-3 transition-colors duration-300 ${isHovered ? colors.text : ''}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {metric.label}
          </motion.div>

          <motion.p
            className="text-text-muted text-sm"
            style={{ transform: 'translateZ(20px)' }}
          >
            {metric.description}
          </motion.p>

          <motion.div
            className={`mt-6 h-px w-16 mx-auto bg-gradient-to-r ${colors.gradient}`}
            style={{
              width: isHovered ? 80 : 64,
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <motion.div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${metric.color === 'blue' ? 'accent-blue' : metric.color === 'purple' ? 'accent-purple' : 'accent-cyan'}/50 to-transparent`}
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Metrics() {
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-cyan/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay }}
          >
            Impact
          </motion.span>
          <motion.h2
            className="font-display text-section font-bold text-gradient"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
          >
            Numbers That Speak
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, i) => (
            <MetricCard3D
              key={i}
              metric={metric}
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
