'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks'

interface ServiceCard3DProps {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
  color: string
  index: number
  total: number
  rotation: number
  isHovered: boolean
  onHover: (index: number | null) => void
}

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; accent: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/30', glow: 'shadow-glow-blue', accent: '#3B82F6' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/30', glow: 'shadow-glow-purple', accent: '#A855F7' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', border: 'border-accent-cyan/30', glow: 'shadow-glow-cyan', accent: '#22D3EE' },
}

function ServiceCard3D({ icon: Icon, title, description, tags, color, index, total, rotation, isHovered, onHover }: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const colors = colorMap[color] || colorMap.blue

  const angleStep = 360 / total
  const angle = rotation + index * angleStep
  const radius = isMobile ? 0 : 450

  const radian = (angle * Math.PI) / 180
  const x = Math.sin(radian) * radius
  const z = Math.cos(radian) * radius - radius
  const rotateY = angle
  const scale = isMobile ? 1 : 0.6 + (z + radius) / (2 * radius) * 0.4
  const opacity = isMobile ? 1 : 0.4 + (z + radius) / (2 * radius) * 0.6

  if (isMobile) {
    return (
      <motion.div
        className={`rounded-2xl border ${colors.border} bg-background-secondary/80 backdrop-blur-xl p-6 mb-6`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg} border ${colors.border}`}>
          <Icon size={22} className={colors.text} />
        </div>
        <h3 className={`font-display text-lg font-bold mb-2 ${colors.text}`}>{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, j) => (
            <span key={j} className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-white/5 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 w-[320px] cursor-pointer"
      style={{
        x,
        z,
        rotateY: rotateY,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
      initial={false}
      animate={{ x, z, rotateY, scale, opacity }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, mass: 0.8 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)

  const rotation = useMotionValue(0)
  const velocity = useMotionValue(0)

  useEffect(() => {
    const unsub = rotation.on('change', (v) => setCurrentRotation(v))
    return unsub
  }, [rotation])

  const lastX = useRef(0)
  const dragStartX = useRef(0)
  const dragStartRotation = useRef(0)
  const autoRotateRef = useRef<number | null>(null)
  const lastMoveTime = useRef(0)

  const autoRotate = useCallback(() => {
    const now = Date.now()
    if (!isDragging && now - lastMoveTime.current > 2000) {
      rotation.set(rotation.get() + 0.15)
    }
    autoRotateRef.current = requestAnimationFrame(autoRotate)
  }, [rotation, isDragging])

  useEffect(() => {
    if (!isMobile) {
      autoRotateRef.current = requestAnimationFrame(autoRotate)
      return () => {
        if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current)
      }
    }
  }, [autoRotate, isMobile])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    lastX.current = e.clientX
    dragStartX.current = e.clientX
    dragStartRotation.current = rotation.get()
    lastMoveTime.current = Date.now()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [rotation])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - lastX.current
    rotation.set(rotation.get() + deltaX * 0.4)
    velocity.set(deltaX)
    lastX.current = e.clientX
    lastMoveTime.current = Date.now()
  }, [isDragging, rotation, velocity])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    const vel = velocity.get()
    if (Math.abs(vel) > 2) {
      const momentum = vel * 8
      rotation.set(rotation.get() + momentum)
    }
    velocity.set(0)
  }, [rotation, velocity])

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
            rotation={0}
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
      className="relative h-[600px] flex items-center justify-center"
      style={{ perspective: '1200px' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-white/5"
          style={{ transform: 'rotateX(60deg)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: baseDelay + 0.5, duration: 1 }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full border border-accent-blue/10"
          style={{ transform: 'rotateX(60deg)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: baseDelay + 0.7, duration: 1 }}
        />
        <motion.div
          className="absolute w-[150px] h-[150px] rounded-full bg-accent-blue/5 blur-2xl"
          initial={{ scale: 0 }}
          animate={isLoaded ? { scale: 1 } : {}}
          transition={{ delay: baseDelay + 0.3, duration: 0.8 }}
        />
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d', rotateX: -5 }}
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
            rotation={currentRotation}
            isHovered={hoveredIndex === i}
            onHover={setHoveredIndex}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-text-muted text-xs tracking-wider"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: baseDelay + 1.5 }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/50" />
          Drag to rotate
        </span>
      </motion.div>
    </div>
  )
}
