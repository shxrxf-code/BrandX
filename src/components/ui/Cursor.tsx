'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a, button, [data-cursor-hover]') !== null
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      <div
        className={cn(
          'pointer-events-none fixed top-0 left-0 z-[99] rounded-full border border-white/40',
          'transition-all duration-300 ease-out-expo',
          isHovering ? 'w-12 h-12 opacity-100' : 'w-8 h-8 opacity-50'
        )}
        style={{
          transform: `translate(${position.x - (isHovering ? 24 : 16)}px, ${
            position.y - (isHovering ? 24 : 16)
          }px)`,
        }}
      />
    </>
  )
}
