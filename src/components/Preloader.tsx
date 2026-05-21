'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

function ApertureBlade({ index, total, progress }: { index: number; total: number; progress: number }) {
  const angle = (360 / total) * index
  const bladePath = useMemo(() => {
    const cx = 200
    const cy = 200
    const innerR = 20
    const outerR = 280
    const bladeAngle = 360 / total
    const startAngle = (bladeAngle * 0.15) * (Math.PI / 180)
    const endAngle = (bladeAngle * 0.85) * (Math.PI / 180)

    const x1 = cx + innerR * Math.cos(startAngle)
    const y1 = cy + innerR * Math.sin(startAngle)
    const x2 = cx + outerR * Math.cos(startAngle - 0.15)
    const y2 = cy + outerR * Math.sin(startAngle - 0.15)
    const x3 = cx + outerR * Math.cos(endAngle + 0.15)
    const y3 = cy + outerR * Math.sin(endAngle + 0.15)
    const x4 = cx + innerR * Math.cos(endAngle)
    const y4 = cy + innerR * Math.sin(endAngle)

    return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`
  }, [total])

  return (
    <g transform={`rotate(${angle} 200 200)`}>
      <motion.path
        d={bladePath}
        fill="url(#bladeGradient)"
        stroke="rgba(59, 130, 246, 0.15)"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2,
        }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
      />
    </g>
  )
}

function Particles({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const particleCount = isMobile ? 8 : 20

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  }, [particleCount])

  if (reducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-blue"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function HUDRing({ radius, duration, direction, opacity }: { radius: number; duration: number; direction: number; opacity: number }) {
  const circumference = 2 * Math.PI * radius
  const dashArray = `${circumference * 0.15} ${circumference * 0.85}`

  return (
    <motion.circle
      cx="200"
      cy="200"
      r={radius}
      fill="none"
      stroke={`rgba(59, 130, 246, ${opacity})`}
      strokeWidth="0.5"
      strokeDasharray={dashArray}
      animate={{ rotate: direction * 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ transformOrigin: '200px 200px' }}
    />
  )
}

export default function Preloader() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'init' | 'forming' | 'loading' | 'opening' | 'complete'>('init')
  const [loadProgress, setLoadProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      setPhase('complete')
      return
    }

    const t1 = setTimeout(() => setPhase('forming'), 200)
    const t2 = setTimeout(() => setPhase('loading'), 800)
    const t3 = setTimeout(() => setPhase('opening'), isMobile ? 2000 : 2400)
    const t4 = setTimeout(() => {
      setPhase('complete')
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, isMobile ? 3000 : 3400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [isMobile, reducedMotion])

  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 8 + 2
        })
      }, 80)
      return () => clearInterval(interval)
    }
  }, [phase])

  if (phase === 'complete') return null

  const bladeCount = isMobile ? 6 : 8
  const apertureProgress = phase === 'opening' ? 1 : phase === 'loading' ? 0 : 0

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[10000] overflow-hidden bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Ambient glow behind lens */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: phase === 'forming' ? [0, 0.3, 0.15] : phase === 'loading' ? 0.15 : phase === 'opening' ? [0.15, 0.4, 0] : 0,
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-radial from-accent-blue/20 via-accent-purple/10 to-transparent blur-[80px]" />
        </motion.div>

        {/* Particles */}
        {(phase === 'loading' || phase === 'opening') && (
          <Particles isMobile={isMobile} reducedMotion={reducedMotion} />
        )}

        {/* Main lens assembly */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'init' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]"
            animate={
              phase === 'opening'
                ? { scale: [1, 1.05, 1.2], opacity: [1, 0.8, 0] }
                : phase === 'loading'
                ? { scale: 1, opacity: 1 }
                : { scale: [0.8, 1], opacity: [0, 1] }
            }
            transition={{
              duration: phase === 'opening' ? 1 : 0.8,
              ease: phase === 'opening' ? [0.25, 0.46, 0.45, 0.94] : 'easeOut',
            }}
          >
            {/* SVG Aperture */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.15))' }}
            >
              <defs>
                <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(26, 26, 26, 0.95)" />
                  <stop offset="50%" stopColor="rgba(15, 15, 15, 0.98)" />
                  <stop offset="100%" stopColor="rgba(10, 10, 10, 0.95)" />
                </linearGradient>
                <radialGradient id="lensReflection" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.03)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <clipPath id="lensClip">
                  <circle cx="200" cy="200" r="190" />
                </clipPath>
              </defs>

              {/* Outer lens ring */}
              <circle
                cx="200"
                cy="200"
                r="195"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
              />

              {/* HUD rings */}
              {!isMobile && !reducedMotion && (
                <g clipPath="url(#lensClip)">
                  <HUDRing radius={180} duration={20} direction={1} opacity={0.08} />
                  <HUDRing radius={170} duration={15} direction={-1} opacity={0.06} />
                  <HUDRing radius={160} duration={25} direction={1} opacity={0.04} />
                </g>
              )}

              {/* Aperture blades */}
              <g clipPath="url(#lensClip)">
                {Array.from({ length: bladeCount }, (_, i) => (
                  <ApertureBlade
                    key={i}
                    index={i}
                    total={bladeCount}
                    progress={apertureProgress}
                  />
                ))}

                {/* Lens reflection overlay */}
                <circle cx="200" cy="200" r="190" fill="url(#lensReflection)" />
              </g>

              {/* Inner glow ring */}
              <motion.circle
                cx="200"
                cy="200"
                r="190"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="0.5"
                animate={{
                  opacity: phase === 'loading' ? [0.2, 0.4, 0.2] : phase === 'opening' ? [0.4, 0] : 0.2,
                }}
                transition={{ duration: 2, repeat: phase === 'loading' ? Infinity : 0 }}
              />
            </svg>

            {/* Center brand logo */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 'loading' ? 1 : phase === 'opening' ? 0 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="font-display text-xl md:text-2xl font-bold tracking-tight text-white text-glow-blue"
                initial={{ opacity: 0, y: 10 }}
                animate={phase === 'loading' ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                BRANDEX
                <span className="ml-1 text-[10px] font-normal text-text-muted tracking-[0.2em] uppercase">
                  Digital
                </span>
              </motion.span>

              {/* Loading progress */}
              <motion.div
                className="mt-4 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={phase === 'loading' ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="w-24 h-[1px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                    style={{ width: `${Math.min(loadProgress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-text-muted tracking-wider tabular-nums">
                  {Math.min(Math.round(loadProgress), 100)}%
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Cinematic scan lines during opening */}
        {phase === 'opening' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.03, 0] }}
            transition={{ duration: 1 }}
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)',
            }}
          />
        )}

        {/* Corner HUD accents */}
        {!isMobile && !reducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'loading' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top-left */}
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-accent-blue/30" />
              <span className="text-[9px] font-mono text-accent-blue/40 tracking-widest uppercase">SYS.INIT</span>
            </div>
            {/* Top-right */}
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <span className="text-[9px] font-mono text-accent-blue/40 tracking-widest uppercase">LENS.ACTIVE</span>
              <div className="w-8 h-[1px] bg-accent-blue/30" />
            </div>
            {/* Bottom-left */}
            <div className="absolute bottom-8 left-8 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-accent-purple/30" />
              <span className="text-[9px] font-mono text-accent-purple/40 tracking-widest uppercase">APERTURE.f/1.4</span>
            </div>
            {/* Bottom-right */}
            <div className="absolute bottom-8 right-8 flex items-center gap-2">
              <span className="text-[9px] font-mono text-accent-purple/40 tracking-widest uppercase">RENDER.CORE</span>
              <div className="w-8 h-[1px] bg-accent-purple/30" />
            </div>
          </motion.div>
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5, 5, 5, 0.6) 100%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
