'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useIsMobile } from '@/lib/hooks'

interface ParticlesProps {
  count?: number
  speed?: number
  size?: number
  color?: string
  className?: string
}

export default function Particles({
  count = 50,
  speed = 0.3,
  size = 2,
  color = '255, 255, 255',
  className = '',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    opacity: number
    size: number
  }>>([])
  const isMobile = useIsMobile()
  const frameSkipRef = useRef(0)
  const isVisibleRef = useRef(true)

  const targetFPS = isMobile ? 20 : 30
  const frameInterval = 1000 / targetFPS
  const lastFrameTimeRef = useRef(0)

  const animate = useCallback((timestamp: number) => {
    if (!isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const elapsed = timestamp - lastFrameTimeRef.current
    if (elapsed < frameInterval) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    lastFrameTimeRef.current = timestamp - (elapsed % frameInterval)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((p) => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`
      ctx.fill()
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [color, frameInterval])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const effectiveCount = isMobile ? Math.min(count, 10) : Math.min(count, 25)
    const effectiveSpeed = isMobile ? speed * 0.5 : speed

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = Array.from({ length: effectiveCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * effectiveSpeed,
        vy: (Math.random() - 0.5) * effectiveSpeed - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        size: Math.random() * size + 0.5,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [count, speed, size, color, isMobile, animate])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}
