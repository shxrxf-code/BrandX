'use client'

import { useRef, useEffect, useState } from 'react'

interface NetworkBackgroundProps {
  isLoaded: boolean
  baseDelay: number
}

const RIBBON_COUNT = 6
const SEGMENTS = 60
const BASE_SPEED = 0.15

const PALETTE = [
  { r: 124, g: 58, b: 237 },
  { r: 100, g: 120, b: 255 },
  { r: 6, g: 182, b: 212 },
  { r: 34, g: 211, b: 238 },
  { r: 80, g: 80, b: 255 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function NetworkBackground({ isLoaded }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    if (!mounted || !isLoaded) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let time = 0
    let width = 0
    let height = 0

    type RibbonPoint = { x: number; y: number; nx: number; ny: number }

    class AuroraRibbon {
      points: RibbonPoint[] = []
      amplitude: number
      frequency: number
      speed: number
      phase: number
      color: { r: number; g: number; b: number }
      baseY: number
      yRange: number
      waveOffset: number
      thickness: number

      constructor() {
        this.amplitude = 30 + Math.random() * 70
        this.frequency = 0.003 + Math.random() * 0.006
        this.speed = BASE_SPEED + Math.random() * BASE_SPEED
        this.phase = Math.random() * Math.PI * 2
        this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        this.baseY = (Math.random() - 0.5) * height * 0.5
        this.yRange = 20 + Math.random() * 40
        this.waveOffset = Math.random() * 100
        this.thickness = 2 + Math.random() * 3
        this.generatePoints()
      }

      generatePoints() {
        this.points = []
        for (let i = 0; i < SEGMENTS; i++) {
          this.points.push({ x: 0, y: 0, nx: 0, ny: 0 })
        }
      }

      update(t: number, dt: number) {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const mouseInfluenceX = mx > 0 ? ((mx - width / 2) / (width / 2)) * 0.3 : 0
        const mouseInfluenceY = my > 0 ? ((my - height / 2) / (height / 2)) * 0.2 : 0

        for (let i = 0; i < SEGMENTS; i++) {
          const progress = i / (SEGMENTS - 1)
          const x = progress * width * 1.3 - width * 0.15

          const wave1 = Math.sin(t * this.speed + progress * 10 + this.phase) * this.amplitude
          const wave2 = Math.sin(t * this.speed * 0.7 + progress * 6 + this.phase * 1.5) * this.amplitude * 0.5
          const wave3 = Math.sin(t * this.speed * 0.3 + progress * 3 + this.waveOffset) * this.yRange

          const envelope = Math.sin(progress * Math.PI)
          const sway = Math.sin(t * 0.3 + this.phase) * 20 * envelope

          const y = this.baseY + (wave1 + wave2) * envelope + wave3 + sway + mouseInfluenceY * 50 * envelope
          const xOffset = sway * 0.3 + mouseInfluenceX * 80 * envelope

          this.points[i].x = x + xOffset
          this.points[i].y = y
        }

        for (let i = 1; i < SEGMENTS - 1; i++) {
          const dx = this.points[i + 1].x - this.points[i - 1].x
          const dy = this.points[i + 1].y - this.points[i - 1].y
          const len = Math.sqrt(dx * dx + dy * dy) || 1
          this.points[i].nx = -dy / len
          this.points[i].ny = dx / len
        }
        this.points[0].nx = this.points[1].nx
        this.points[0].ny = this.points[1].ny
        this.points[SEGMENTS - 1].nx = this.points[SEGMENTS - 2].nx
        this.points[SEGMENTS - 1].ny = this.points[SEGMENTS - 2].ny
      }

      draw(ctx: CanvasRenderingContext2D, t: number) {
        const alpha = 0.12 + 0.08 * Math.sin(t * 0.2 + this.phase)
        const glowAlpha = alpha * 2
        const width = this.thickness

        // Glow pass
        for (let g = 1; g <= 3; g++) {
          ctx.beginPath()
          for (let i = 0; i < SEGMENTS; i++) {
            const p = this.points[i]
            const w = width * (3 - g) * 8
            const nx = p.nx * w
            const ny = p.ny * w
            if (i === 0) ctx.moveTo(p.x + nx, p.y + ny)
            else ctx.lineTo(p.x + nx, p.y + ny)
          }
          for (let i = SEGMENTS - 1; i >= 0; i--) {
            const p = this.points[i]
            const w = width * (3 - g) * 8
            const nx = p.nx * w
            const ny = p.ny * w
            ctx.lineTo(p.x - nx, p.y - ny)
          }
          ctx.closePath()
          ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${glowAlpha * 0.08 / g})`
          ctx.fill()
        }

        // Core ribbon
        ctx.beginPath()
        for (let i = 0; i < SEGMENTS; i++) {
          const p = this.points[i]
          const w = width
          const nx = p.nx * w
          const ny = p.ny * w
          if (i === 0) ctx.moveTo(p.x + nx, p.y + ny)
          else ctx.lineTo(p.x + nx, p.y + ny)
        }
        for (let i = SEGMENTS - 1; i >= 0; i--) {
          const p = this.points[i]
          const w = width
          const nx = p.nx * w
          const ny = p.ny * w
          ctx.lineTo(p.x - nx, p.y - ny)
        }
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, -height * 0.5, 0, height * 0.5)
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)
        grad.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.7})`)
        grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`)
        grad.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.7})`)
        grad.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    let ribbons: AuroraRibbon[] = []

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.scale(dpr, dpr)
    }

    resize()
    ribbons = Array.from({ length: RIBBON_COUNT }, () => new AuroraRibbon())

    let prevTime = performance.now()

    function draw(ctx: CanvasRenderingContext2D) {
      const now = performance.now()
      const dt = Math.min((now - prevTime) / 16, 3)
      prevTime = now
      time += dt * 0.016

      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.translate(0, height / 2)

      for (const ribbon of ribbons) {
        ribbon.update(time, dt)
      }

      ribbons.sort((a, b) => {
        const za = Math.sin(time * 0.1 + a.phase)
        const zb = Math.sin(time * 0.1 + b.phase)
        return za - zb
      })

      for (const ribbon of ribbons) {
        ribbon.draw(ctx, time)
      }

      ctx.restore()
    }

    function loop() {
      draw(ctx!)
      animId = requestAnimationFrame(loop)
    }

    loop()

    const ro = new ResizeObserver(() => {
      resize()
      ribbons = Array.from({ length: RIBBON_COUNT }, () => new AuroraRibbon())
    })
    ro.observe(canvas.parentElement!)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [mounted, isLoaded])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
      />
    </div>
  )
}
