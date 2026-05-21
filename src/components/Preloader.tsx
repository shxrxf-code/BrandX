'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

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

const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const easeOutBack = (t: number) => { const c1 = 1.70158; const c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) }

function ApertureBlade({ index, total, openProgress }: { index: number; total: number; openProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const bladeAngle = (Math.PI * 2) / total
  const baseAngle = index * bladeAngle

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const innerR = 0.12
    const outerR = 2.5
    const startA = bladeAngle * 0.15
    const endA = bladeAngle * 0.85
    s.moveTo(Math.cos(startA) * innerR, Math.sin(startA) * innerR)
    s.lineTo(Math.cos(startA - 0.15) * outerR, Math.sin(startA - 0.15) * outerR)
    s.lineTo(Math.cos(endA + 0.15) * outerR, Math.sin(endA + 0.15) * outerR)
    s.lineTo(Math.cos(endA) * innerR, Math.sin(endA) * innerR)
    s.closePath()
    return s
  }, [bladeAngle])

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 1 })
    geo.center()
    return geo
  }, [shape])

  useFrame(() => {
    if (!meshRef.current) return
    const rotationSpeed = openProgress * bladeAngle * 0.45
    meshRef.current.rotation.z = baseAngle + rotationSpeed
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = openProgress < 0.82 ? 1 : Math.max(0, 1 - (openProgress - 0.82) * 5.5)
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0.12]}>
      <meshStandardMaterial color="#1a1a1a" metalness={0.92} roughness={0.25} transparent opacity={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

function DSLRCamera({ timeline, tier }: { timeline: number; tier: string }) {
  const bodyRef = useRef<THREE.Group>(null)
  const lensRef = useRef<THREE.Group>(null)
  const glassRef = useRef<THREE.Mesh>(null)
  const segs = tier === 'low' ? 20 : tier === 'medium' ? 28 : 36

  const hasReflections = tier === 'high'

  useFrame((state) => {
    const t = timeline
    const elapsed = state.clock.elapsedTime

    if (bodyRef.current) {
      const floatY = Math.sin(elapsed * 0.35) * 0.06
      const floatX = Math.sin(elapsed * 0.25) * 0.03
      const floatZ = Math.sin(elapsed * 0.2) * 0.04
      const tiltX = Math.sin(elapsed * 0.15) * 0.025
      const tiltY = Math.sin(elapsed * 0.2) * 0.035

      bodyRef.current.position.y = floatY
      bodyRef.current.position.x = floatX
      bodyRef.current.position.z = floatZ
      bodyRef.current.rotation.x = tiltX
      bodyRef.current.rotation.y = tiltY

      if (t > 0.5) {
        const fadeT = Math.min((t - 0.5) / 0.5, 1)
        bodyRef.current.scale.setScalar(Math.max(0.01, 1 - easeInOutCubic(fadeT)))
      }
    }

    if (lensRef.current) {
      lensRef.current.rotation.z = Math.sin(elapsed * 0.12) * 0.012
      if (t > 0.5) {
        const fadeT = Math.min((t - 0.5) / 0.5, 1)
        lensRef.current.scale.setScalar(Math.max(0.01, 1 - easeInOutCubic(fadeT)))
      }
    }

    if (glassRef.current) {
      const mat = glassRef.current.material as THREE.MeshPhysicalMaterial
      if (t < 0.3) {
        mat.opacity = 0.2
      } else if (t < 0.7) {
        mat.opacity = 0.2 - ((t - 0.3) / 0.4) * 0.15
      } else {
        mat.opacity = Math.max(0, 0.05 - ((t - 0.7) / 0.3) * 0.05)
      }
    }
  })

  return (
    <group>
      {/* Camera body */}
      <group ref={bodyRef}>
        {/* Main body */}
        <mesh position={[0, 0, -0.25]}>
          <boxGeometry args={[2.6, 1.8, 0.7]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.75} roughness={0.35} />
        </mesh>

        {/* Top plate */}
        <mesh position={[0, 0.95, -0.25]}>
          <boxGeometry args={[2.6, 0.1, 0.7]} />
          <meshStandardMaterial color="#111111" metalness={0.88} roughness={0.2} />
        </mesh>

        {/* Grip */}
        <mesh position={[1.1, 0, -0.15]}>
          <boxGeometry args={[0.3, 1.6, 0.5]} />
          <meshStandardMaterial color="#080808" metalness={0.55} roughness={0.55} />
        </mesh>

        {/* Viewfinder bump */}
        <mesh position={[0, 0.65, -0.6]}>
          <boxGeometry args={[0.9, 0.45, 0.25]} />
          <meshStandardMaterial color="#0f0f0f" metalness={0.75} roughness={0.25} />
        </mesh>

        {/* Viewfinder eyepiece */}
        <mesh position={[0, 0.65, -0.75]}>
          <cylinderGeometry args={[0.12, 0.14, 0.08, 16]} />
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Hotshoe */}
        <mesh position={[0, 1.02, -0.25]}>
          <boxGeometry args={[0.5, 0.06, 0.2]} />
          <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Mode dial */}
        <mesh position={[0.65, 1.05, -0.25]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, segs]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* Shutter button */}
        <mesh position={[1.0, 1.02, 0.05]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.08} />
        </mesh>

        {/* Brand plate */}
        <mesh position={[-0.4, 0.55, 0.12]}>
          <boxGeometry args={[0.6, 0.1, 0.015]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.65} roughness={0.35} />
        </mesh>

        {/* Lens mount ring */}
        <mesh position={[0, 0, 0.12]}>
          <torusGeometry args={[0.85, 0.07, 10, segs]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Mount contacts */}
        {Array.from({ length: 5 }, (_, i) => {
          const angle = (i / 5) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.82, Math.sin(angle) * 0.82, 0.13]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.06, 0.03, 0.015]} />
              <meshStandardMaterial color="#444444" metalness={0.95} roughness={0.08} />
            </mesh>
          )
        })}

        {/* Body screws */}
        {[[1.1, 0.7], [-1.1, 0.7], [1.1, -0.7], [-1.1, -0.7]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.12]}>
            <circleGeometry args={[0.03, 8]} />
            <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}
      </group>

      {/* Lens assembly */}
      <group ref={lensRef}>
        {/* Lens barrel */}
        <mesh position={[0, 0, 0.35]}>
          <cylinderGeometry args={[0.9, 0.95, 0.4, segs, 1, true]} />
          <meshStandardMaterial color="#111111" metalness={0.88} roughness={0.25} side={THREE.DoubleSide} />
        </mesh>

        {/* Focus ring */}
        <mesh position={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.97, 0.97, 0.18, segs, 1, true]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.75} roughness={0.45} side={THREE.DoubleSide} />
        </mesh>

        {/* Focus ring ridges */}
        {Array.from({ length: 18 }, (_, i) => {
          const angle = (i / 18) * Math.PI * 2
          return (
            <mesh key={`ridge-${i}`} position={[Math.cos(angle) * 0.98, Math.sin(angle) * 0.98, 0.5]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.015, 0.015, 0.18]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.25} />
            </mesh>
          )
        })}

        {/* Front element housing */}
        <mesh position={[0, 0, 0.65]}>
          <cylinderGeometry args={[0.85, 0.9, 0.1, segs]} />
          <meshStandardMaterial color="#151515" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* Front glass rim */}
        <mesh position={[0, 0, 0.72]}>
          <torusGeometry args={[0.8, 0.04, 8, segs]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Engraved rings */}
        {[0.7, 0.55, 0.4].map((r, i) => (
          <mesh key={i} position={[0, 0, 0.35 + i * 0.08]}>
            <torusGeometry args={[r, 0.006, 6, segs]} />
            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.35} />
          </mesh>
        ))}

        {/* Glass element */}
        <mesh ref={glassRef} position={[0, 0, 0.7]}>
          <circleGeometry args={[0.78, segs]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            metalness={0}
            roughness={0}
            transmission={0.85}
            thickness={0.4}
            ior={1.52}
            clearcoat={1}
            clearcoatRoughness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

function FloatingParticles({ tier }: { tier: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = tier === 'low' ? 15 : tier === 'medium' ? 25 : 40

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#7C3AED" transparent opacity={0.35} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function CinematicCamera({ timeline }: { timeline: number }) {
  const { camera } = useThree()

  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera
    const baseZ = 4.2

    if (timeline < 0.3) {
      const t = timeline / 0.3
      cam.position.z = baseZ + 0.5 * (1 - easeOutExpo(t))
      cam.fov = 38 + easeOutExpo(t) * 5
    } else if (timeline < 0.7) {
      const t = (timeline - 0.3) / 0.4
      cam.position.z = baseZ - t * 1.5
      cam.fov = 43 + t * 8
    } else {
      const t = (timeline - 0.7) / 0.3
      cam.position.z = baseZ - 1.5 - t * 1.5
      cam.fov = 51 + t * 12
    }

    cam.updateProjectionMatrix()
  })

  return null
}

function LensScene({ timeline, tier }: { timeline: number; tier: string }) {
  const bladeCount = tier === 'low' ? 5 : 6

  return (
    <>
      <ambientLight intensity={0.12} />
      <spotLight position={[4, 4, 5]} intensity={1.8} angle={0.35} penumbra={0.6} castShadow />
      <spotLight position={[-3, 2, 3]} intensity={0.4} color="#7C3AED" angle={0.5} penumbra={0.8} />
      <spotLight position={[3, -1, 3]} intensity={0.3} color="#06B6D4" angle={0.5} penumbra={0.8} />
      <pointLight position={[0, 0, 3]} intensity={0.15 * (1 - timeline)} color="#ffffff" />

      <CinematicCamera timeline={timeline} />

      <DSLRCamera timeline={timeline} tier={tier} />

      {Array.from({ length: bladeCount }, (_, i) => (
        <ApertureBlade key={i} index={i} total={bladeCount} openProgress={timeline} />
      ))}

      {tier !== 'low' && <FloatingParticles tier={tier} />}

      <Environment preset="city" />

      <EffectComposer enableNormalPass={false} multisampling={tier === 'low' ? 0 : 4}>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={tier === 'low' ? 0.2 : tier === 'medium' ? 0.35 : 0.5} />
        <Vignette eskil={false} offset={0.15} darkness={0.7} />
      </EffectComposer>
    </>
  )
}

export default function Preloader() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'init' | 'emerging' | 'rotating' | 'opening' | 'complete'>('init')
  const [timeline, setTimeline] = useState(0)
  const [tier] = useState<'high' | 'medium' | 'low'>(() => getPerformanceTier())

  const durations = useMemo(() => {
    if (reducedMotion) return { total: 0, emerging: 0, rotating: 0, opening: 0 }
    const base = tier === 'low' ? 2.0 : tier === 'medium' ? 2.5 : 3.2
    return {
      total: base,
      emerging: base * 0.25,
      rotating: base * 0.35,
      opening: base * 0.4,
    }
  }, [tier, reducedMotion])

  useEffect(() => {
    if (reducedMotion) { setPhase('complete'); return }

    const t1 = setTimeout(() => setPhase('emerging'), 300)
    const t2 = setTimeout(() => setPhase('rotating'), durations.emerging * 1000 + 300)
    const t3 = setTimeout(() => setPhase('opening'), (durations.emerging + durations.rotating) * 1000 + 300)
    const t4 = setTimeout(() => {
      setPhase('complete')
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, durations.total * 1000 + 300)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [durations, reducedMotion])

  useEffect(() => {
    if (phase === 'init') return

    const phaseStart = phase === 'emerging' ? 0
      : phase === 'rotating' ? durations.emerging
      : phase === 'opening' ? durations.emerging + durations.rotating
      : 0

    const phaseDuration = phase === 'emerging' ? durations.emerging
      : phase === 'rotating' ? durations.rotating
      : phase === 'opening' ? durations.opening
      : 0

    const start = performance.now()
    const startTimeline = phaseStart / durations.total

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000
      const raw = Math.min(elapsed / phaseDuration, 1)

      let eased: number
      if (phase === 'emerging') eased = easeOutExpo(raw)
      else if (phase === 'rotating') eased = easeOutBack(raw)
      else eased = easeInOutCubic(raw)

      setTimeline(startTimeline + eased * (phaseDuration / durations.total))

      if (raw < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [phase, durations])

  useEffect(() => { if (phase === 'complete') setTimeline(1) }, [phase])

  if (phase === 'complete') return null

  const revealScale = 1 + (1 - timeline) * 0.03
  const revealBlur = Math.max(0, 10 - timeline * 10)
  const revealOpacity = timeline > 0.3 ? Math.min(1, (timeline - 0.3) / 0.5) : 0

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none bg-background">
      {/* Website layer (revealed through aperture) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${revealScale})`,
          opacity: revealOpacity,
          filter: `blur(${revealBlur}px)`,
          transition: 'none',
          willChange: 'transform, opacity, filter',
          zIndex: 0,
        }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 38 }}
          dpr={tier === 'low' ? 1 : tier === 'medium' ? [1, 1.5] : [1, 2]}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: tier !== 'low', powerPreference: 'high-performance', stencil: false, depth: true }}
        >
          <LensScene timeline={timeline} tier={tier} />
        </Canvas>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(5, 5, 5, 0.85) 100%)',
          opacity: 1 - timeline * 0.7,
          transition: 'opacity 0.8s ease',
          zIndex: 4,
        }}
      />

      {/* Cinematic glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, ${0.06 * (1 - timeline)}) 0%, transparent 55%)`,
          transition: 'background 0.8s ease',
          zIndex: 4,
        }}
      />
    </div>
  )
}
