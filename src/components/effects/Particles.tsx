'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [isMobile, setIsMobile] = useState(false)
  const frameCountRef = useRef(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const effectiveCount = isMobile ? Math.floor(count * 0.3) : count
    const effectiveSpeed = isMobile ? speed * 0.5 : speed

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: effectiveCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * effectiveSpeed,
        vy: (Math.random() - 0.5) * effectiveSpeed - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * size + 0.5,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      if (isMobile) {
        frameCountRef.current++
        if (frameCountRef.current % 3 !== 0) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }
      }

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
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [count, speed, size, color, isMobile])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}
