'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

/* ─── Performance Tier Detection ─── */
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

/* ─── Easing Functions ─── */
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/* ─── Optimized Aperture (CSS-based, zero GPU cost) ─── */
function CSSAperture({ progress }: { progress: number }) {
  const bladeCount = 6
  const blades = useMemo(() => {
    return Array.from({ length: bladeCount }, (_, i) => {
      const angle = (i / bladeCount) * 360
      return angle
    })
  }, [])

  const apertureSize = 10 + progress * 90

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {/* Aperture ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: `${apertureSize}%`,
          height: `${apertureSize}%`,
          border: '2px solid rgba(42, 42, 42, 0.8)',
          boxShadow: `
            inset 0 0 30px rgba(0,0,0,0.5),
            0 0 20px rgba(0,0,0,0.3)
          `,
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1), height 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Aperture blades */}
      {blades.map((angle, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: '50%',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(26,26,26,0.9), transparent)',
            transformOrigin: 'left center',
            transform: `rotate(${angle + progress * 30}deg)`,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            left: '50%',
            top: '50%',
          }}
        />
      ))}

      {/* Inner ring detail */}
      <div
        className="absolute rounded-full"
        style={{
          width: `${Math.max(0, apertureSize - 4)}%`,
          height: `${Math.max(0, apertureSize - 4)}%`,
          border: '1px solid rgba(60, 60, 60, 0.3)',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1), height 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  )
}

/* ─── Simplified Lens (low-poly, 3 meshes max) ─── */
function OptimizedLens({ progress, tier }: { progress: number; tier: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const float = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    groupRef.current.position.y = float
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.015

    const fadeStart = 0.65
    if (progress >= fadeStart) {
      groupRef.current.scale.setScalar(Math.max(0.01, 1 - (progress - fadeStart) * 2))
    }
  })

  const hasReflections = tier === 'high'
  const segs = tier === 'low' ? 24 : 32

  return (
    <group ref={groupRef}>
      {/* Lens barrel - single cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.05, 0.5, segs]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Front element housing */}
      <mesh position={[0, 0, 0.28]}>
        <cylinderGeometry args={[0.95, 1.0, 0.1, segs]} />
        <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glass reflection (fake, no transmission) */}
      {hasReflections && (
        <mesh position={[0, 0, 0.33]}>
          <circleGeometry args={[0.9, segs]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.08 * (1 - progress)}
            metalness={0.1}
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Simple ring detail */}
      <mesh position={[0, 0, 0.15]}>
        <torusGeometry args={[0.98, 0.02, 8, tier === 'low' ? 24 : 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  )
}

/* ─── Simplified Camera Body (6 meshes, no extrude) ─── */
function OptimizedBody({ progress, tier }: { progress: number; tier: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    const floatX = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    groupRef.current.position.y = floatY
    groupRef.current.position.x = floatX
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.03

    const fadeStart = 0.65
    if (progress >= fadeStart) {
      groupRef.current.scale.setScalar(Math.max(0.01, 1 - (progress - fadeStart) * 2))
    }
  })

  const segs = tier === 'low' ? 16 : 24

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[2.8, 2.0, 0.8]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Grip */}
      <mesh position={[1.2, 0, -0.1]}>
        <boxGeometry args={[0.35, 1.8, 0.6]} />
        <meshStandardMaterial color="#080808" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Viewfinder bump */}
      <mesh position={[0, 0.7, -0.6]}>
        <boxGeometry args={[1.0, 0.5, 0.3]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top plate */}
      <mesh position={[0, 1.05, -0.2]}>
        <boxGeometry args={[2.8, 0.12, 0.8]} />
        <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Mode dial */}
      <mesh position={[0.7, 1.15, -0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.12, segs]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Lens mount ring */}
      <mesh position={[0, 0, 0.25]}>
        <torusGeometry args={[0.95, 0.08, 12, segs]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  )
}

/* ─── Lightweight Particles (CSS-based, zero Three.js cost) ─── */
function CSSParticles({ tier }: { tier: string }) {
  if (tier === 'low') return null

  const count = tier === 'high' ? 12 : 6
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(124, 58, 237, 0.4)',
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Camera Controller (single useFrame) ─── */
function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera
    const zoomIn = easeInOutCubic(Math.min(progress * 1.5, 1))
    cam.position.z = 4.5 - zoomIn * 2
    cam.fov = 40 + zoomIn * 12
    cam.updateProjectionMatrix()
  })

  return null
}

/* ─── Main Scene (consolidated, minimal) ─── */
function LensScene({ progress, tier }: { progress: number; tier: string }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[3, 3, 4]} intensity={1.2} angle={0.4} penumbra={0.6} />
      <pointLight position={[-2, -1, 2]} intensity={0.3} color="#7C3AED" />
      <pointLight position={[2, 1, 2]} intensity={0.2} color="#06B6D4" />

      <CameraController progress={progress} />

      <OptimizedBody progress={progress} tier={tier} />
      <OptimizedLens progress={progress} tier={tier} />
    </>
  )
}

/* ─── Preloader Wrapper ─── */
export default function Preloader() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'init' | 'floating' | 'opening' | 'complete'>('init')
  const [progress, setProgress] = useState(0)
  const [tier] = useState<'high' | 'medium' | 'low'>(() => getPerformanceTier())

  const durations = useMemo(() => {
    const base = reducedMotion ? 0 : tier === 'low' ? 1.8 : tier === 'medium' ? 2.2 : 2.8
    return {
      init: base * 0.3,
      floating: base * 0.5,
      opening: base * 1.0,
    }
  }, [tier, reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      setPhase('complete')
      return
    }

    const t1 = setTimeout(() => setPhase('floating'), durations.init * 1000)
    const t2 = setTimeout(() => setPhase('opening'), (durations.init + durations.floating) * 1000)
    const t3 = setTimeout(() => {
      setPhase('complete')
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, (durations.init + durations.floating + durations.opening) * 1000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [durations, reducedMotion])

  useEffect(() => {
    if (phase === 'opening') {
      const duration = durations.opening * 1000
      const start = performance.now()

      const animate = (now: number) => {
        const elapsed = now - start
        const raw = Math.min(elapsed / duration, 1)
        setProgress(easeInOutCubic(raw))

        if (raw < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [phase, durations.opening])

  useEffect(() => {
    if (phase === 'complete') setProgress(1)
  }, [phase])

  if (phase === 'complete') return null

  const revealScale = phase === 'opening' ? 1 + (1 - progress) * 0.04 : 1.04
  const revealOpacity = phase === 'opening' ? progress : 0

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none bg-background">
      {/* Website layer (revealed through aperture) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${revealScale})`,
          opacity: revealOpacity,
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity',
          zIndex: 0,
        }}
      />

      {/* Aperture overlay (CSS-based, lightweight) */}
      <div
        className="absolute inset-0 bg-background"
        style={{
          zIndex: 3,
          opacity: phase === 'opening' ? 1 - progress : 1,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <CSSAperture progress={progress} />
      </div>

      {/* 3D Scene (minimal, optimized) */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 40 }}
          dpr={tier === 'low' ? 1 : tier === 'medium' ? [1, 1.5] : [1, 2]}
          style={{ background: 'transparent' }}
          gl={{
            alpha: true,
            antialias: tier !== 'low',
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
        >
          <LensScene progress={progress} tier={tier} />
        </Canvas>
      </div>

      {/* CSS Particles (zero GPU cost) */}
      <CSSParticles tier={tier} />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5, 5, 5, 0.8) 100%)',
          opacity: 1 - progress * 0.6,
          transition: 'opacity 1s ease',
          zIndex: 4,
        }}
      />

      {/* Cinematic glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, ${0.08 * (1 - progress)}) 0%, transparent 60%)`,
          transition: 'background 1s ease',
          zIndex: 4,
        }}
      />
    </div>
  )
}
