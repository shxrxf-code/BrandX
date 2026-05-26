'use client'

import { useRef, useEffect, useState } from 'react'

interface NetworkBackgroundProps {
  isLoaded: boolean
  baseDelay: number
}

const NUCLEUS_COUNT = 14
const CONNECT_DIST = 200
const PARTICLE_COUNT_PER_CONN = 2

function hsl(h: number, s: number, l: number) {
  return `hsl(${h}, ${s}%, ${l}%)`
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

    const palette = [
      { h: 268, s: 90, l: 58 },  // violet
      { h: 187, s: 95, l: 43 },  // teal
      { h: 178, s: 86, l: 51 },  // cyan
    ]

    class Nucleus {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      baseR: number
      phase: number
      morphA: Float64Array
      morphPhi: Float64Array
      colorIdx: number
      hue: number
      heartbeat: number

      constructor() {
        this.x = (Math.random() - 0.5) * width * 0.7
        this.y = (Math.random() - 0.5) * height * 0.7
        this.z = 0.3 + Math.random() * 0.7
        this.vx = (Math.random() - 0.5) * 0.15
        this.vy = (Math.random() - 0.5) * 0.15
        this.baseR = 8 + Math.random() * 18
        this.phase = Math.random() * Math.PI * 2
        this.morphA = new Float64Array(8)
        this.morphPhi = new Float64Array(8)
        for (let i = 0; i < 8; i++) {
          this.morphA[i] = (0.15 + Math.random() * 0.35) / (i + 1)
          this.morphPhi[i] = Math.random() * Math.PI * 2
        }
        this.colorIdx = Math.floor(Math.random() * palette.length)
        this.hue = palette[this.colorIdx].h + (Math.random() - 0.5) * 15
        this.heartbeat = Math.random() * Math.PI * 2
      }

      update(dt: number) {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        if (mx > 0 && my > 0) {
          const dx = mx - width / 2 - this.x
          const dy = my - height / 2 - this.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 300) {
            const force = (1 - d / 300) * 0.02
            this.vx += dx * force * dt
            this.vy += dy * force * dt
          }
        }

        this.x += this.vx * dt
        this.y += this.vy * dt
        this.vx += (Math.random() - 0.5) * 0.02 * dt
        this.vy += (Math.random() - 0.5) * 0.02 * dt
        this.vx *= 0.995
        this.vy *= 0.995

        const halfW = width * 0.5
        const halfH = height * 0.5
        if (Math.abs(this.x) > halfW * 0.8) this.vx -= this.x * 0.001
        if (Math.abs(this.y) > halfH * 0.8) this.vy -= this.y * 0.001

        this.phase += 0.003 * dt
        for (let i = 0; i < 8; i++) {
          this.morphPhi[i] += 0.002 * (1 + i * 0.3) * dt
        }
        this.heartbeat += 0.015 * dt
      }

      getShapePoints(count: number): [number, number][] {
        const pts: [number, number][] = []
        const r = this.baseR * (0.7 + 0.3 * Math.sin(this.heartbeat))
        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 2
          let mod = 1
          for (let j = 0; j < 8; j++) {
            mod += this.morphA[j] * Math.sin((j + 1) * theta + this.morphPhi[j])
          }
          const pr = r * mod * this.z
          pts.push([this.x + pr * Math.cos(theta), this.y + pr * Math.sin(theta)])
        }
        return pts
      }

      radius() {
        return this.baseR * (0.7 + 0.3 * Math.sin(this.heartbeat)) * 1.5 * this.z
      }
    }

    let nuclei: Nucleus[] = []

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.scale(dpr, dpr)
    }

    resize()

    nuclei = Array.from({ length: NUCLEUS_COUNT }, () => new Nucleus())

    function dist(a: Nucleus, b: Nucleus) {
      const dx = a.x - b.x
      const dy = a.y - b.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    function bezierPoint(
      x1: number, y1: number,
      cx1: number, cy1: number,
      cx2: number, cy2: number,
      x2: number, y2: number,
      t: number
    ): [number, number] {
      const u = 1 - t
      return [
        u * u * u * x1 + 3 * u * u * t * cx1 + 3 * u * t * t * cx2 + t * t * t * x2,
        u * u * u * y1 + 3 * u * u * t * cy1 + 3 * u * t * t * cy2 + t * t * t * y2,
      ]
    }

    interface Connection {
      a: number; b: number
    }
    interface Particle {
      connIdx: number
      t: number
      speed: number
      trail: [number, number][]
    }

    let connections: Connection[] = []
    let particles: Particle[] = []

    function generateConnections() {
      const conns: Connection[] = []
      for (let i = 0; i < nuclei.length; i++) {
        for (let j = i + 1; j < nuclei.length; j++) {
          const d = dist(nuclei[i], nuclei[j])
          const normD = d / CONNECT_DIST
          if (normD < 1 && Math.random() < 0.7) {
            conns.push({ a: i, b: j })
          }
        }
      }
      return conns
    }

    function generateParticles() {
      const ps: Particle[] = []
      for (let ci = 0; ci < connections.length; ci++) {
        for (let p = 0; p < PARTICLE_COUNT_PER_CONN; p++) {
          ps.push({
            connIdx: ci,
            t: Math.random(),
            speed: 0.15 + Math.random() * 0.25,
            trail: [],
          })
        }
      }
      return ps
    }

    connections = generateConnections()
    particles = generateParticles()

    let prevTime = performance.now()

    function drawScreen(ctx: CanvasRenderingContext2D) {
      const now = performance.now()
      const dt = Math.min((now - prevTime) / 16, 3)
      prevTime = now
      time += dt * 0.016

      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)

      for (const n of nuclei) {
        n.update(dt)
      }

      const breathing = 0.9 + 0.1 * Math.sin(time * 0.3)

      // Update connections periodically
      if (Math.floor(time / 60) > Math.floor((time - dt * 0.016) / 60)) {
        connections = generateConnections()
        particles = generateParticles()
      }

      // Draw connections
      for (const conn of connections) {
        const na = nuclei[conn.a]
        const nb = nuclei[conn.b]
        const d = dist(na, nb)
        const normD = d / CONNECT_DIST
        if (normD >= 1) continue

        const alpha = (1 - normD) * 0.25 * breathing
        const midX = (na.x + nb.x) / 2
        const midY = (na.y + nb.y) / 2
        const dx = na.x - nb.x
        const dy = na.y - nb.y
        const perpMag = d * 0.4 * Math.sin(time * 0.4 + conn.a + conn.b)
        const perpX = -dy / (d || 1) * perpMag
        const perpY = dx / (d || 1) * perpMag

        const cpx1 = midX + perpX + Math.sin(time * 0.2 + conn.a) * 30
        const cpy1 = midY + perpY + Math.cos(time * 0.2 + conn.b) * 30
        const cpx2 = midX - perpX + Math.cos(time * 0.25 + conn.a) * 30
        const cpy2 = midY - perpY + Math.sin(time * 0.25 + conn.b) * 30

        // Glow layer
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, nb.x, nb.y)
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha * 0.3})`
        ctx.lineWidth = 8
        ctx.stroke()

        // Core line
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, nb.x, nb.y)
        const hue = (na.hue * 0.5 + nb.hue * 0.5)
        ctx.strokeStyle = `hsla(${hue}, 85%, 55%, ${alpha})`
        ctx.lineWidth = 1.5 * breathing
        ctx.stroke()
      }

      // Draw particles
      for (const p of particles) {
        if (p.connIdx >= connections.length) continue
        const conn = connections[p.connIdx]
        const na = nuclei[conn.a]
        const nb = nuclei[conn.b]
        const d = dist(na, nb)
        const normD = d / CONNECT_DIST
        if (normD >= 1) continue

        p.t += p.speed * 0.008 * dt
        if (p.t > 1) p.t = 0

        const midX = (na.x + nb.x) / 2
        const midY = (na.y + nb.y) / 2
        const dx = na.x - nb.x
        const dy = na.y - nb.y
        const dlen = Math.sqrt(dx * dx + dy * dy) || 1
        const perpMag = d * 0.4 * Math.sin(time * 0.4 + conn.a + conn.b)
        const perpX = -dy / dlen * perpMag
        const perpY = dx / dlen * perpMag
        const cpx1 = midX + perpX + Math.sin(time * 0.2 + conn.a) * 30
        const cpy1 = midY + perpY + Math.cos(time * 0.2 + conn.b) * 30
        const cpx2 = midX - perpX + Math.cos(time * 0.25 + conn.a) * 30
        const cpy2 = midY - perpY + Math.sin(time * 0.25 + conn.b) * 30

        const [px, py] = bezierPoint(na.x, na.y, cpx1, cpy1, cpx2, cpy2, nb.x, nb.y, p.t)

        p.trail.push([px, py])
        if (p.trail.length > 8) p.trail.shift()

        // Trail
        for (let i = 0; i < p.trail.length - 1; i++) {
          const ta = (i / p.trail.length) * 0.5
          ctx.beginPath()
          ctx.arc(p.trail[i][0], p.trail[i][1], 1.5 * (i / p.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(34, 211, 238, ${ta})`
          ctx.fill()
        }

        // Particle
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34, 211, 238, 0.9)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34, 211, 238, 0.2)'
        ctx.fill()
      }

      // Draw nuclei
      const sorted = [...nuclei].sort((a, b) => a.z - b.z)

      for (const n of sorted) {
        const shape = n.getShapePoints(20)
        const alpha = 0.3 + 0.5 * n.z

        // Outer glow
        ctx.save()
        ctx.shadowColor = `hsla(${n.hue}, 85%, 55%, 0.3)`
        ctx.shadowBlur = 30 * n.z
        ctx.beginPath()
        ctx.moveTo(shape[0][0], shape[0][1])
        for (let i = 1; i < shape.length; i++) {
          ctx.lineTo(shape[i][0], shape[i][1])
        }
        ctx.closePath()
        ctx.fillStyle = `hsla(${n.hue}, 85%, 58%, ${alpha * 0.15})`
        ctx.fill()
        ctx.restore()

        // Fill
        ctx.beginPath()
        ctx.moveTo(shape[0][0], shape[0][1])
        for (let i = 1; i < shape.length; i++) {
          ctx.lineTo(shape[i][0], shape[i][1])
        }
        ctx.closePath()
        ctx.fillStyle = `hsla(${n.hue}, 85%, 58%, ${alpha * 0.25})`
        ctx.fill()
        ctx.strokeStyle = `hsla(${n.hue}, 85%, 65%, ${alpha * 0.4})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        // Inner glow
        const innerR = n.baseR * n.z * 0.4
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, innerR)
        grad.addColorStop(0, `hsla(${n.hue}, 90%, 70%, ${alpha * 0.6})`)
        grad.addColorStop(1, `hsla(${n.hue}, 90%, 70%, 0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, innerR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      ctx.restore()
    }

    function loop() {
      drawScreen(ctx!)
      animId = requestAnimationFrame(loop)
    }

    loop()

    const ro = new ResizeObserver(() => {
      resize()
      nuclei = Array.from({ length: NUCLEUS_COUNT }, () => new Nucleus())
      connections = generateConnections()
      particles = generateParticles()
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
