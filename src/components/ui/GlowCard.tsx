'use client'

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
}: GlowCardProps) {
  const glowColors = {
    blue: `rgba(59, 130, 246, ${intensity})`,
    purple: `rgba(168, 85, 247, ${intensity})`,
    cyan: `rgba(34, 211, 238, ${intensity})`,
    white: `rgba(255, 255, 255, ${intensity})`,
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColors[glowColor]}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
