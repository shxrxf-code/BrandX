'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import LensScene from '@/components/effects/LensScene'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'
import { easeOutExpo, easeOutCubic, easeInOutCubic, easeInOutQuad } from '@/lib/easings'

function getPerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium'
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (hasReducedMotion) return 'low'
  if (isMobile) return 'medium'
  const mem = (navigator as any).deviceMemory
  if (mem && mem < 4) return 'low'
  if (mem && mem >= 8) return 'high'
  return 'medium'
}

export default function Preloader() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'init' | 'emerging' | 'rotating' | 'opening' | 'reveal' | 'complete'>('init')
  const [timeline, setTimeline] = useState(0)
  const [tier] = useState<'high' | 'medium' | 'low'>(() => getPerformanceTier())
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 })

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const durations = useMemo(() => {
    if (reducedMotion) return { total: 0, emerging: 0, rotating: 0, opening: 0, reveal: 0 }
    const base = tier === 'low' ? 2.0 : tier === 'medium' ? 2.8 : 3.5
    return {
      total: base,
      emerging: base * 0.17,
      rotating: base * 0.24,
      opening: base * 0.30,
      reveal: base * 0.29,
    }
  }, [tier, reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      setPhase('complete')
      setTimeline(1)
      return
    }

    const T = durations
    const t1 = setTimeout(() => setPhase('emerging'), 200)
    const t2 = setTimeout(() => setPhase('rotating'), T.emerging * 1000 + 200)
    const t3 = setTimeout(() => setPhase('opening'), (T.emerging + T.rotating) * 1000 + 200)
    const t4 = setTimeout(() => setPhase('reveal'), (T.emerging + T.rotating + T.opening) * 1000 + 200)
    const t5 = setTimeout(() => {
      setPhase('complete')
      setTimeline(1)
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, T.total * 1000 + 200)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5)
    }
  }, [durations, reducedMotion])

  useEffect(() => {
    if (phase === 'init' || phase === 'complete') return

    const phaseNames: (typeof phase)[] = ['emerging', 'rotating', 'opening', 'reveal']
    const phaseIdx = phaseNames.indexOf(phase)
    if (phaseIdx < 0) return

    const phaseDurations = [durations.emerging, durations.rotating, durations.opening, durations.reveal]

    let phaseStartTime = 0
    for (let i = 0; i < phaseIdx; i++) {
      phaseStartTime += phaseDurations[i]
    }
    const phaseDuration = phaseDurations[phaseIdx]
    const startTimeline = phaseStartTime / durations.total

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const raw = Math.min(elapsed / phaseDuration, 1)

      let eased: number
      if (phase === 'emerging') eased = easeOutExpo(raw)
      else if (phase === 'rotating') eased = easeOutCubic(raw)
      else if (phase === 'opening') eased = easeInOutCubic(raw)
      else eased = easeInOutQuad(raw)

      setTimeline(startTimeline + eased * (phaseDuration / durations.total))

      if (raw < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [phase, durations])

  if (phase === 'complete') return null

  const apertureProgress = (() => {
    if (timeline < 0.35) return 0
    if (timeline < 0.75) return (timeline - 0.35) / 0.4
    return Math.min(1, (timeline - 0.35) / 0.4)
  })()

  const maxDim = Math.max(windowSize.w, windowSize.h)
  const holeRadiusPx = 10 + apertureProgress * maxDim * 0.55

  const vignetteOpacity = Math.max(0, 1 - timeline * 1.1)
  const glowOpacity = Math.max(0, 0.06 * (1 - apertureProgress * 1.2))
  const preloaderOpacity = timeline > 0.7
    ? Math.max(0, 1 - (timeline - 0.7) / 0.3)
    : 1

  return (
    <div
      className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none"
      style={{ opacity: preloaderOpacity, transition: 'opacity 0.05s linear' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: '#050505',
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${holeRadiusPx}px, #050505 ${holeRadiusPx + 8}px)`,
          maskImage: `radial-gradient(circle at 50% 50%, transparent ${holeRadiusPx}px, #050505 ${holeRadiusPx + 8}px)`,
          zIndex: 1,
          willChange: 'mask',
        }}
      />

      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 36 }}
          dpr={tier === 'low' ? 1 : [1, 1.5]}
          style={{ background: 'transparent' }}
          gl={{
            alpha: true,
            antialias: tier !== 'low',
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={(state) => {
            state.gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault()
              setTimeout(() => {
                setPhase('complete')
                setTimeline(1)
                window.dispatchEvent(new CustomEvent('preloader-complete'))
              }, 100)
            }, false)
          }}
        >
          <LensScene timeline={timeline} tier={tier} />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5, 5, 5, 0.92) 100%)',
          opacity: vignetteOpacity,
          transition: 'opacity 0.3s ease',
          zIndex: 3,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, ${glowOpacity}) 0%, rgba(6, 182, 212, ${glowOpacity * 0.5}) 30%, transparent 60%)`,
          zIndex: 3,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: apertureProgress > 0.1
            ? `radial-gradient(circle at 50% 50%, rgba(200, 180, 255, ${apertureProgress * 0.04}) 0%, transparent ${30 + apertureProgress * 20}%)`
            : 'none',
          zIndex: 3,
        }}
      />
    </div>
  )
}
