'use client'

import { useEffect, useRef } from 'react'

type Props = {
  density?: number
  accentOnScroll?: boolean
}

export default function ImmersiveCanvas({ density = 60, accentOnScroll = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, nx: 0, ny: 0 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    type P = { x: number; y: number; vx: number; vy: number; r: number; base: number }
    const particles: P[] = []
    const count = Math.min(density, Math.floor((w * h) / 22000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.3,
        base: Math.random() * 0.5 + 0.2,
      })
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.nx = (e.clientX - rect.left) / rect.width
      mouseRef.current.ny = (e.clientY - rect.top) / rect.height
    }

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }

    const onResize = () => {
      resize()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // smooth mouse
      mouseRef.current.x += (mouseRef.current.nx - mouseRef.current.x) * 0.04
      mouseRef.current.y += (mouseRef.current.ny - mouseRef.current.y) * 0.04

      // draw connections first
      const mx = mouseRef.current.x * w
      const my = mouseRef.current.y * h

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // gentle mouse pull
        const dxm = mx - p.x
        const dym = my - p.y
        const dm = Math.hypot(dxm, dym)
        if (dm < 180) {
          p.vx += (dxm / dm) * 0.002
          p.vy += (dym / dm) * 0.002
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      }

      // lines
      const maxDist = 110
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.18
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // accent ring around mouse
      if (mouseRef.current.x > 0 || mouseRef.current.y > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 220)
        grad.addColorStop(0, 'rgba(91, 91, 255, 0.15)')
        grad.addColorStop(0.5, 'rgba(91, 91, 255, 0.04)')
        grad.addColorStop(1, 'rgba(91, 91, 255, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mx, my, 220, 0, Math.PI * 2)
        ctx.fill()
      }

      // dots
      for (const p of particles) {
        ctx.fillStyle = `rgba(255,255,255,${p.base})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // accent on scroll
      if (accentOnScroll) {
        const accentY = (scrollRef.current * 0.4) % h
        const accentGrad = ctx.createLinearGradient(0, accentY - 100, 0, accentY + 100)
        accentGrad.addColorStop(0, 'rgba(91, 91, 255, 0)')
        accentGrad.addColorStop(0.5, 'rgba(91, 91, 255, 0.04)')
        accentGrad.addColorStop(1, 'rgba(91, 91, 255, 0)')
        ctx.fillStyle = accentGrad
        ctx.fillRect(0, accentY - 100, w, 200)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [density, accentOnScroll])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  )
}
