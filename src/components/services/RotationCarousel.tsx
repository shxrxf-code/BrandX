'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { LucideIcon, Pause, Play } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks'

interface ServiceCard3DProps {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
  color: string
  index: number
  total: number
  rotateX: number
  rotateY: number
  isHovered: boolean
  onHover: (index: number | null) => void
}

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; accent: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/30', glow: 'shadow-glow-blue', accent: '#3B82F6' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/30', glow: 'shadow-glow-purple', accent: '#A855F7' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', border: 'border-accent-cyan/30', glow: 'shadow-glow-cyan', accent: '#22D3EE' },
}

function ServiceCard3D({ icon: Icon, title, description, tags, color, index, total, rotateX, rotateY, isHovered, onHover }: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const colors = colorMap[color] || colorMap.blue

  const angleStep = 360 / total
  const baseAngle = index * angleStep

  const radianY = ((baseAngle + rotateY) * Math.PI) / 180
  const radius = 420

  const x = Math.sin(radianY) * radius
  const z = Math.cos(radianY) * radius
  const scale = 0.5 + ((z + radius) / (2 * radius)) * 0.5
  const opacity = 0.3 + ((z + radius) / (2 * radius)) * 0.7

  const tiltX = rotateX * 0.3

  const cardContent = (
    <div
      className={`rounded-2xl border ${isHovered ? colors.border : 'border-white/10'} bg-background-secondary/90 backdrop-blur-xl p-6 overflow-hidden relative`}
      style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent transition-opacity duration-500`} style={{ opacity: isHovered ? 0.12 : 0 }} />

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg} border ${colors.border}`} style={{ transform: 'translateZ(30px)' }}>
          <Icon size={22} className={colors.text} />
        </div>

        <h3 className={`font-display text-lg font-bold mb-2 ${isHovered ? colors.text : 'text-white'}`} style={{ transform: 'translateZ(25px)' }}>
          {title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed mb-4" style={{ transform: 'translateZ(15px)' }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(10px)' }}>
          {tags.map((tag, j) => (
            <span key={j} className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-white/5 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isHovered && (
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}80, transparent)` }} />
      )}
    </div>
  )

  if (isMobile) {
    return (
      <motion.div
        ref={cardRef}
        className={`rounded-2xl border ${colors.border} bg-background-secondary/80 backdrop-blur-xl p-6 mb-6`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 w-[300px] cursor-grab active:cursor-grabbing"
      style={{
        x: x - 150,
        y: -100 + Math.sin((tiltX * Math.PI) / 180) * 80 * Math.cos(radianY),
        z,
        rotateY: baseAngle + rotateY,
        rotateX: tiltX,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
      }}
      initial={false}
      animate={{ x: x - 150, y: -100 + Math.sin((tiltX * Math.PI) / 180) * 80 * Math.cos(radianY), z, rotateY: baseAngle + rotateY, rotateX: tiltX, scale, opacity }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.8 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {cardContent}
    </motion.div>
  )
}

interface RotationCarouselProps {
  services: Array<{ icon: LucideIcon; title: string; description: string; tags: string[]; color: string }>
  isLoaded: boolean
  baseDelay: number
}

export default function RotationCarousel({ services, isLoaded, baseDelay }: RotationCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const rotX = useMotionValue(-10)
  const rotY = useMotionValue(0)
  const velX = useMotionValue(0)
  const velY = useMotionValue(0)

  const [currentRotX, setCurrentRotX] = useState(-10)
  const [currentRotY, setCurrentRotY] = useState(0)

  useEffect(() => {
    const unsubX = rotX.on('change', (v) => setCurrentRotX(v))
    const unsubY = rotY.on('change', (v) => setCurrentRotY(v))
    return () => { unsubX(); unsubY() }
  }, [rotX, rotY])

  const lastPos = useRef({ x: 0, y: 0 })
  const autoRotateRef = useRef<number | null>(null)
  const lastMoveTime = useRef(0)

  // Snap to nearest card on drag release
  const snapToNearest = useCallback(() => {
    const angleStep = 360 / services.length
    const currentY = rotY.get()
    const normalizedAngle = ((currentY % 360) + 360) % 360
    const nearestStep = Math.round(normalizedAngle / angleStep) * angleStep
    const targetY = currentY + (nearestStep - normalizedAngle)

    rotY.set(targetY)
  }, [rotY, services.length])

  const autoRotate = useCallback(() => {
    const now = Date.now()
    if (isAutoPlaying && !isDragging && now - lastMoveTime.current > 3000) {
      rotY.set(rotY.get() + 0.12)
      rotX.set(rotX.get() + Math.sin(now / 3000) * 0.05)
    }
    autoRotateRef.current = requestAnimationFrame(autoRotate)
  }, [rotX, rotY, isDragging, isAutoPlaying])

  useEffect(() => {
    if (!isMobile && mounted) {
      autoRotateRef.current = requestAnimationFrame(autoRotate)
      return () => {
        if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current)
      }
    }
  }, [autoRotate, isMobile, mounted])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
    lastMoveTime.current = Date.now()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - lastPos.current.x
    const deltaY = e.clientY - lastPos.current.y
    rotY.set(rotY.get() + deltaX * 0.35)
    rotX.set(rotX.get() - deltaY * 0.25)
    rotX.set(Math.max(-45, Math.min(45, rotX.get())))
    velX.set(deltaY)
    velY.set(deltaX)
    lastPos.current = { x: e.clientX, y: e.clientY }
    lastMoveTime.current = Date.now()
  }, [isDragging, rotX, rotY, velX, velY])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    const vx = velX.get()
    const vy = velY.get()
    if (Math.abs(vy) > 2) {
      rotY.set(rotY.get() + vy * 6)
    }
    if (Math.abs(vx) > 2) {
      const newX = rotX.get() - vx * 4
      rotX.set(Math.max(-45, Math.min(45, newX)))
    }
    velX.set(0)
    velY.set(0)

    // Snap to nearest card
    setTimeout(snapToNearest, 200)
  }, [rotX, rotY, velX, velY, snapToNearest])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        rotY.set(rotY.get() - 360 / services.length)
        lastMoveTime.current = Date.now()
      }
      if (e.key === 'ArrowRight') {
        rotY.set(rotY.get() + 360 / services.length)
        lastMoveTime.current = Date.now()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [rotY, services.length])

  if (!mounted) {
    return (
      <div className="relative h-[650px] flex items-center justify-center">
        <div className="text-text-muted text-sm">Loading...</div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="space-y-6">
        {services.map((service, i) => (
          <ServiceCard3D
            key={i}
            icon={service.icon}
            title={service.title}
            description={service.description}
            tags={service.tags}
            color={service.color}
            index={i}
            total={services.length}
            rotateX={0}
            rotateY={0}
            isHovered={hoveredIndex === i}
            onHover={setHoveredIndex}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[650px] flex items-center justify-center"
      style={{ perspective: '1400px' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[550px] h-[550px] rounded-full border border-white/5"
          style={{ transform: 'rotateX(60deg)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: baseDelay + 0.5, duration: 1 }}
        />
        <motion.div
          className="absolute w-[380px] h-[380px] rounded-full border border-accent-blue/10"
          style={{ transform: 'rotateX(60deg)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: baseDelay + 0.7, duration: 1 }}
        />
        <motion.div
          className="absolute w-[180px] h-[180px] rounded-full bg-accent-blue/5 blur-2xl"
          initial={{ scale: 0 }}
          animate={isLoaded ? { scale: 1 } : {}}
          transition={{ delay: baseDelay + 0.3, duration: 0.8 }}
        />
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {services.map((service, i) => (
          <ServiceCard3D
            key={i}
            icon={service.icon}
            title={service.title}
            description={service.description}
            tags={service.tags}
            color={service.color}
            index={i}
            total={services.length}
            rotateX={currentRotX}
            rotateY={currentRotY}
            isHovered={hoveredIndex === i}
            onHover={setHoveredIndex}
          />
        ))}
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <motion.button
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
        >
          {isAutoPlaying ? (
            <Pause size={12} className="text-text-muted" />
          ) : (
            <Play size={12} className="text-text-muted" />
          )}
        </motion.button>

        <motion.span
          className="text-text-muted text-xs tracking-wider"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: baseDelay + 1.5 }}
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/50" />
            Drag to rotate · Arrow keys to navigate
          </span>
        </motion.span>
      </div>
    </div>
  )
}
