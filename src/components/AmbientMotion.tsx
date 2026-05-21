'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useMousePosition } from '@/lib/hooks'

export default function AmbientMotion() {
  const [isMobile, setIsMobile] = useState(false)
  const mouse = useMousePosition()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return null

  const parallaxX1 = (mouse.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) / 60
  const parallaxY1 = (mouse.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) / 60
  const parallaxX2 = (mouse.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) / 80
  const parallaxY2 = (mouse.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) / 80
  const parallaxX3 = (mouse.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) / 100
  const parallaxY3 = (mouse.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) / 100

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating orbs with mouse parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-blue/10 blur-[150px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: parallaxX1,
          y: parallaxY1,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-purple/10 blur-[120px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: parallaxX2,
          y: parallaxY2,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-accent-cyan/10 blur-[100px] -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: parallaxX3,
          y: parallaxY3,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Floating lines */}
      <motion.div
        className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/5 to-transparent"
        animate={{ scaleX: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/5 to-transparent"
        animate={{ scaleX: [1.2, 0.8, 1.2], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 grid-lines opacity-20" />
    </div>
  )
}
