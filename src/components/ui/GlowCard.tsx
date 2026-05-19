'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'cyan' | 'white'
  intensity?: number
  tilt?: boolean
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'blue',
  intensity = 0.15,
  tilt = true,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const glowColors = {
    blue: `rgba(59, 130, 246, ${intensity})`,
    purple: `rgba(168, 85, 247, ${intensity})`,
    cyan: `rgba(34, 211, 238, ${intensity})`,
    white: `rgba(255, 255, 255, ${intensity})`,
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })

    if (tilt) {
      const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -8
      const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 8
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (cardRef.current && tilt) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.06] transition-all duration-500 hover:border-white/[0.12]',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
      }}
      onMouseMove={(e) => {
        handleMouseMove(e)
        setIsHovering(true)
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow overlay that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColors[glowColor]}, transparent 60%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
