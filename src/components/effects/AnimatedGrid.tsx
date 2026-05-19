'use client'

import { useEffect, useRef } from 'react'

interface AnimatedGridProps {
  cellSize?: number
  opacity?: number
  color?: string
  className?: string
}

export default function AnimatedGrid({
  cellSize = 60,
  opacity = 0.03,
  color = '255, 255, 255',
  className = '',
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      timeRef.current += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / cellSize)
      const rows = Math.ceil(canvas.height / cellSize)

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellSize
          const y = j * cellSize
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
          )
          const normalizedDistance = distance / maxDistance
          const wave = Math.sin(timeRef.current + normalizedDistance * Math.PI * 4) * 0.5 + 0.5
          const dotOpacity = opacity * (0.5 + wave * 0.5)

          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color}, ${dotOpacity})`
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [cellSize, opacity, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}
