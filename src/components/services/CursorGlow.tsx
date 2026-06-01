'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  isActive: boolean
  color: string
}

export default function CursorGlow({ isActive, color }: Props) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, mouseX, mouseY])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[100]"
      style={{
        left: springX,
        top: springY,
        width: 400,
        height: 400,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
        opacity: isActive ? 0.6 : 0,
        transition: 'opacity 0.5s ease',
      }}
    />
  )
}
