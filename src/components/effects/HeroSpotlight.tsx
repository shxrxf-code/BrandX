'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useIsMobile } from '@/lib/hooks'

interface HeroSpotlightProps {
  className?: string
}

export default function HeroSpotlight({ className = '' }: HeroSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || isMobile) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    containerRef.current.style.setProperty('--spotlight-x', `${x}%`)
    containerRef.current.style.setProperty('--spotlight-y', `${y}%`)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, isMobile])

  if (isMobile) return null

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(59, 130, 246, 0.08), transparent 40%)`,
      }}
    />
  )
}
