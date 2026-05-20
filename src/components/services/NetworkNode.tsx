'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks'

interface NetworkNodeProps {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
  color: string
  index: number
  isLoaded: boolean
  baseDelay: number
}

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; accent: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/20', glow: 'shadow-glow-blue', accent: 'accent-blue' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/20', glow: 'shadow-glow-purple', accent: 'accent-purple' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', border: 'border-accent-cyan/20', glow: 'shadow-glow-cyan', accent: 'accent-cyan' },
}

const positions = [
  { top: '2%', left: '50%', translateX: '-50%' },
  { top: '28%', left: '5%', translateX: '0' },
  { top: '28%', right: '5%', left: 'auto', translateX: '0' },
  { top: '62%', left: '5%', translateX: '0' },
  { top: '62%', right: '5%', left: 'auto', translateX: '0' },
  { top: '90%', left: '50%', translateX: '-50%' },
]

export default function NetworkNode({ icon: Icon, title, description, tags, color, index, isLoaded, baseDelay }: NetworkNodeProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })
  const glareX = useSpring(50, { stiffness: 150, damping: 20 })
  const glareY = useSpring(50, { stiffness: 150, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height
    x.set(normalizedX)
    y.set(normalizedY)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [x, y, glareX, glareY, isMobile])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    scale.set(1.05)
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    scale.set(1)
    x.set(0)
    y.set(0)
    glareX.set(50)
    glareY.set(50)
  }, [x, y, scale, glareX, glareY])

  const colors = colorMap[color] || colorMap.blue
  const pos = positions[index]

  const accentGradient = color === 'blue'
    ? 'from-transparent via-accent-blue/50 to-transparent'
    : color === 'purple'
      ? 'from-transparent via-accent-purple/50 to-transparent'
      : 'from-transparent via-accent-cyan/50 to-transparent'

  if (isMobile) {
    return (
      <motion.div
        ref={cardRef}
        className="relative w-full"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: baseDelay + index * 0.1, duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`relative rounded-2xl border ${colors.border} bg-background-secondary/80 backdrop-blur-xl p-6 overflow-hidden`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent transition-opacity duration-500`} style={{ opacity: isHovered ? 0.08 : 0 }} />

          <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg} border ${colors.border}`}>
              <Icon size={22} className={colors.text} />
            </div>

            <h3 className={`font-display text-lg font-bold mb-2 ${isHovered ? colors.text : 'text-white'}`}>
              {title}
            </h3>

            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-white/5 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-[300px]"
      style={{
        top: pos.top,
        left: pos.left,
        right: pos.right,
        transform: `translateX(${pos.translateX || '0'})`,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: baseDelay + index * 0.12, duration: 0.7, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-2xl border border-white/10 bg-background-secondary/90 backdrop-blur-xl p-6 cursor-pointer overflow-hidden"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(59, 130, 246, 0.15), transparent 60%)`
              : 'none',
          }}
        />

        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent transition-opacity duration-500`} style={{ opacity: isHovered ? 0.08 : 0 }} />

        <div className="relative z-10">
          <motion.div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg} border ${colors.border}`}
            style={{ transform: 'translateZ(40px)' }}
          >
            <Icon size={22} className={colors.text} />
          </motion.div>

          <motion.h3
            className={`font-display text-lg font-bold mb-2 transition-colors duration-300 ${isHovered ? colors.text : 'text-white'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-text-secondary text-sm leading-relaxed mb-4"
            style={{ transform: 'translateZ(20px)' }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-1.5"
            style={{ transform: 'translateZ(10px)' }}
          >
            {tags.map((tag, j) => (
              <span
                key={j}
                className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-white/5 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${accentGradient}`}
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  )
}
