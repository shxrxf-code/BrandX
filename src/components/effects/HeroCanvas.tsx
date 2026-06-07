'use client'

import { useRef, useEffect } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle system
    const PARTICLE_COUNT = 80
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    // Orbs
    const orbs = [
      { x: 0.2, y: 0.3, r: 280, color: 'rgba(91, 91, 255, 0.35)', vx: 0.0001, vy: 0.00015 },
      { x: 0.8, y: 0.7, r: 240, color: 'rgba(91, 91, 255, 0.25)', vx: -0.00012, vy: -0.0001 },
      { x: 0.5, y: 0.5, r: 200, color: 'rgba(123, 123, 255, 0.18)', vx: 0.00008, vy: -0.00012 },
    ]

    let t = 0
    const animate = () => {
      t += 0.005
      ctx.clearRect(0, 0, width, height)

      // Draw orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx + Math.sin(t + orb.x * 10) * 0.0001
        orb.y += orb.vy + Math.cos(t + orb.y * 10) * 0.0001
        if (orb.x < 0) orb.x = 1
        if (orb.x > 1) orb.x = 0
        if (orb.y < 0) orb.y = 1
        if (orb.y > 1) orb.y = 0

        const cx = orb.x * width
        const cy = orb.y * height
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, 'rgba(91, 91, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(cx - orb.r, cy - orb.r, orb.r * 2, orb.r * 2)
      })

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 91, 255, ${p.alpha})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  )
}
