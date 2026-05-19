'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 60,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const getInitialTransform = () => {
    const d = isMobile ? Math.min(distance, 30) : distance
    const dur = isMobile ? Math.min(duration, 0.5) : duration
    switch (direction) {
      case 'up':
        return { y: d, opacity: 0, filter: 'blur(4px)' }
      case 'down':
        return { y: -d, opacity: 0, filter: 'blur(4px)' }
      case 'left':
        return { x: d, opacity: 0, filter: 'blur(4px)' }
      case 'right':
        return { x: -d, opacity: 0, filter: 'blur(4px)' }
      case 'none':
        return { opacity: 0, filter: 'blur(4px)' }
      default:
        return { y: d, opacity: 0, filter: 'blur(4px)' }
    }
  }

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: isMobile ? 0.4 : duration,
          delay: isMobile ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        },
      })
    }
  }, [isInView, controls, delay, duration, isMobile])

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialTransform()}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  )
}
