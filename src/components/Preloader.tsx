'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

function ApertureBlade({
  index,
  total,
  openProgress,
}: {
  index: number
  total: number
  openProgress: number
}) {
  const angle = (360 / total) * index
  const bladeAngle = 360 / total

  const bladePath = useMemo(() => {
    const cx = 200
    const cy = 200
    const innerR = 15
    const outerR = 280
    const startAngle = (bladeAngle * 0.1) * (Math.PI / 180)
    const endAngle = (bladeAngle * 0.9) * (Math.PI / 180)

    const x1 = cx + innerR * Math.cos(startAngle)
    const y1 = cy + innerR * Math.sin(startAngle)
    const x2 = cx + outerR * Math.cos(startAngle - 0.2)
    const y2 = cy + outerR * Math.sin(startAngle - 0.2)
    const x3 = cx + outerR * Math.cos(endAngle + 0.2)
    const y3 = cy + outerR * Math.sin(endAngle + 0.2)
    const x4 = cx + innerR * Math.cos(endAngle)
    const y4 = cy + innerR * Math.sin(endAngle)

    return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`
  }, [bladeAngle])

  const bladeRotation = openProgress * (bladeAngle * 0.6)

  return (
    <g
      transform={`rotate(${angle + bladeRotation} 200 200)`}
      style={{ transition: `transform ${openProgress > 0 ? 1.2 : 0.6}s cubic-bezier(0.16, 1, 0.3, 1)` }}
    >
      <path
        d={bladePath}
        fill="url(#bladeGradient)"
        stroke="rgba(59, 130, 246, 0.12)"
        strokeWidth="0.5"
        opacity={openProgress < 0.85 ? 1 : Math.max(0, 1 - (openProgress - 0.85) * 6.67)}
        style={{ transition: `opacity ${openProgress > 0 ? 1 : 0.4}s ease` }}
      />
    </g>
  )
}

function Particles({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 6 : 16

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.25 + 0.05,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-blue"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -25, 0], opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function HUDRing({ radius, duration, direction, opacity }: { radius: number; duration: number; direction: number; opacity: number }) {
  const circumference = 2 * Math.PI * radius
  const dashArray = `${circumference * 0.12} ${circumference * 0.88}`

  return (
    <circle
      cx="200"
      cy="200"
      r={radius}
      fill="none"
      stroke={`rgba(59, 130, 246, ${opacity})`}
      strokeWidth="0.5"
      strokeDasharray={dashArray}
      style={{
        transformOrigin: '200px 200px',
        animation: `spin ${duration}s linear ${direction < 0 ? 'reverse' : 'normal'} infinite`,
      }}
    />
  )
}

export default function Preloader() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'init' | 'opening' | 'complete'>('init')
  const [openProgress, setOpenProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      setPhase('complete')
      return
    }

    const t1 = setTimeout(() => setPhase('opening'), isMobile ? 800 : 1200)
    const t2 = setTimeout(() => {
      setPhase('complete')
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, isMobile ? 2200 : 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isMobile, reducedMotion])

  useEffect(() => {
    if (phase === 'opening') {
      const duration = isMobile ? 1200 : 1400
      const start = performance.now()

      const animate = (now: number) => {
        const elapsed = now - start
        const raw = Math.min(elapsed / duration, 1)
        const eased = raw < 0.5
          ? 4 * raw * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 2
        setOpenProgress(eased)

        if (raw < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [phase, isMobile])

  useEffect(() => {
    if (phase === 'complete') {
      setOpenProgress(1)
    }
  }, [phase])

  if (phase === 'complete') return null

  const bladeCount = isMobile ? 6 : 8

  /*
   * THE REVEAL:
   * - The website is always rendered behind this preloader layer
   * - A black overlay covers the entire screen
   * - A radial-gradient mask creates a transparent "hole" in the center
   * - As the hole grows (openProgress 0→1), the website becomes visible through it
   * - The aperture blades sit on top, retracting in sync
   */
  const maskRadius = phase === 'opening'
    ? openProgress * 150
    : 0

  const blurAmount = phase === 'opening'
    ? Math.max(0, 8 - openProgress * 16)
    : 8

  const scaleAmount = phase === 'opening'
    ? 1.025 - openProgress * 0.025
    : 1.025

  const brightnessAmount = phase === 'opening'
    ? 0.7 + openProgress * 0.3
    : 0.7

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/*
          LAYER 1: Black overlay with radial mask
          The mask creates a hole that grows — revealing the website behind
        */}
        <div
          className="absolute inset-0 bg-background"
          style={{
            WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${maskRadius}%, black ${maskRadius + 3}%)`,
            maskImage: `radial-gradient(circle at 50% 50%, transparent ${maskRadius}%, black ${maskRadius + 3}%)`,
            transition: phase === 'opening'
              ? '-webkit-mask-image 1.4s cubic-bezier(0.16, 1, 0.3, 1), mask-image 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'none',
          }}
        />

        {/*
          LAYER 2: Edge glow at the mask boundary
          Creates a luminous ring at the edge of the opening
        */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${Math.max(0, maskRadius - 2)}%, rgba(59, 130, 246, 0.15) ${maskRadius}%, transparent ${maskRadius + 4}%, black ${maskRadius + 6}%)`,
            maskImage: `radial-gradient(circle at 50% 50%, transparent ${Math.max(0, maskRadius - 2)}%, rgba(59, 130, 246, 0.15) ${maskRadius}%, transparent ${maskRadius + 4}%, black ${maskRadius + 6}%)`,
            transition: phase === 'opening'
              ? '-webkit-mask-image 1.4s cubic-bezier(0.16, 1, 0.3, 1), mask-image 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'none',
          }}
        />

        {/*
          LAYER 3: Aperture blade assembly
          Sits on top of the reveal, blades retract as the hole opens
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative w-[300px] h-[300px] md:w-[440px] md:h-[440px]"
              animate={
                phase === 'opening'
                  ? { scale: 1 + openProgress * 0.8, opacity: openProgress < 0.8 ? 1 : Math.max(0, 1 - (openProgress - 0.8) * 5) }
                  : { scale: [0.7, 1], opacity: [0, 1] }
              }
              transition={{ duration: phase === 'opening' ? 0.3 : 0.6, ease: 'easeOut' }}
            >
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.1))' }}
            >
              <defs>
                <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(22, 22, 22, 0.97)" />
                  <stop offset="50%" stopColor="rgba(12, 12, 12, 0.99)" />
                  <stop offset="100%" stopColor="rgba(8, 8, 8, 0.97)" />
                </linearGradient>
                <radialGradient id="lensReflection" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.06)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.02)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <clipPath id="lensClip">
                  <circle cx="200" cy="200" r="195" />
                </clipPath>
              </defs>

              <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="0.5" />

              {!isMobile && (
                <g clipPath="url(#lensClip)">
                  <HUDRing radius={185} duration={25} direction={1} opacity={0.06} />
                  <HUDRing radius={175} duration={18} direction={-1} opacity={0.04} />
                  <HUDRing radius={165} duration={30} direction={1} opacity={0.03} />
                </g>
              )}

              <g clipPath="url(#lensClip)">
                {Array.from({ length: bladeCount }, (_, i) => (
                  <ApertureBlade key={i} index={i} total={bladeCount} openProgress={openProgress} />
                ))}
                <circle cx="200" cy="200" r="195" fill="url(#lensReflection)" />
              </g>

              <circle
                cx="200"
                cy="200"
                r="195"
                fill="none"
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="0.5"
                opacity={phase === 'opening' ? Math.max(0, 0.15 - openProgress * 0.3) : 0.15}
                style={{ transition: 'opacity 0.5s ease' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Particles */}
        {phase === 'opening' && (
          <Particles isMobile={isMobile} />
        )}

        {/* Cinematic scan lines */}
        {phase === 'opening' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: Math.max(0, 0.04 - openProgress * 0.08),
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)',
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Corner HUD accents */}
        {!isMobile && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: phase === 'init' ? 1 : phase === 'opening' ? Math.max(0, 1 - openProgress * 2) : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-accent-blue/30" />
              <span className="text-[9px] font-mono text-accent-blue/40 tracking-widest uppercase">SYS.INIT</span>
            </div>
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <span className="text-[9px] font-mono text-accent-blue/40 tracking-widest uppercase">LENS.ACTIVE</span>
              <div className="w-8 h-[1px] bg-accent-blue/30" />
            </div>
            <div className="absolute bottom-8 left-8 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-accent-purple/30" />
              <span className="text-[9px] font-mono text-accent-purple/40 tracking-widest uppercase">APERTURE.f/1.4</span>
            </div>
            <div className="absolute bottom-8 right-8 flex items-center gap-2">
              <span className="text-[9px] font-mono text-accent-purple/40 tracking-widest uppercase">RENDER.CORE</span>
              <div className="w-8 h-[1px] bg-accent-purple/30" />
            </div>
          </div>
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5, 5, 5, 0.7) 100%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
