'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

/* ─── Easing Functions ─── */
const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/* ─── Aperture Blade Geometry ─── */
function ApertureBlade({ index, total, openProgress }: { index: number; total: number; openProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const bladeAngle = (Math.PI * 2) / total
  const baseAngle = index * bladeAngle

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const innerR = 0.15
    const outerR = 2.8
    const startA = bladeAngle * 0.12
    const endA = bladeAngle * 0.88

    s.moveTo(Math.cos(startA) * innerR, Math.sin(startA) * innerR)
    s.lineTo(Math.cos(startA - 0.18) * outerR, Math.sin(startA - 0.18) * outerR)
    s.lineTo(Math.cos(endA + 0.18) * outerR, Math.sin(endA + 0.18) * outerR)
    s.lineTo(Math.cos(endA) * innerR, Math.sin(endA) * innerR)
    s.closePath()
    return s
  }, [bladeAngle])

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    })
    geo.center()
    return geo
  }, [shape])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const rotationSpeed = openProgress * bladeAngle * 0.5
    meshRef.current.rotation.z = baseAngle + rotationSpeed
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = openProgress < 0.85 ? 1 : Math.max(0, 1 - (openProgress - 0.85) * 6.67)
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0.15]}>
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.3}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ─── DSLR Camera Body ─── */
function DSLRBody({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const floatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    const floatX = Math.sin(state.clock.elapsedTime * 0.25) * 0.04
    const floatZ = Math.sin(state.clock.elapsedTime * 0.3) * 0.06
    const tiltX = Math.sin(state.clock.elapsedTime * 0.15) * 0.03
    const tiltY = Math.sin(state.clock.elapsedTime * 0.2) * 0.04

    groupRef.current.position.y = floatY
    groupRef.current.position.x = floatX
    groupRef.current.position.z = floatZ
    groupRef.current.rotation.x = tiltX
    groupRef.current.rotation.y = tiltY

    const fadeStart = 0.6
    groupRef.current.visible = progress < fadeStart
    if (progress >= fadeStart) {
      groupRef.current.scale.setScalar(Math.max(0, 1 - (progress - fadeStart) * 2.5))
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[3.2, 2.2, 1.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Body bevel edges */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[3.25, 2.25, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Top plate */}
      <mesh position={[0, 1.15, -0.3]}>
        <boxGeometry args={[3.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Bottom plate */}
      <mesh position={[0, -1.15, -0.3]}>
        <boxGeometry args={[3.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* Grip (right side) */}
      <mesh position={[1.4, 0, -0.2]}>
        <boxGeometry args={[0.4, 2.0, 0.8]} />
        <meshStandardMaterial color="#080808" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Grip texture */}
      <mesh position={[1.6, 0, -0.2]}>
        <boxGeometry args={[0.05, 1.8, 0.7]} />
        <meshStandardMaterial color="#050505" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Viewfinder bump */}
      <mesh position={[0, 0.8, -0.9]}>
        <boxGeometry args={[1.2, 0.6, 0.4]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Viewfinder eyepiece */}
      <mesh position={[0, 0.8, -1.1]}>
        <cylinderGeometry args={[0.15, 0.18, 0.1, 16]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Flash hotshoe */}
      <mesh position={[0, 1.25, -0.3]}>
        <boxGeometry args={[0.6, 0.08, 0.3]} />
        <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Mode dial */}
      <mesh position={[0.8, 1.25, -0.3]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Shutter button */}
      <mesh position={[1.2, 1.22, 0.1]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Front AF assist lamp */}
      <mesh position={[1.0, 0.6, 0.35]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Brand text area */}
      <mesh position={[-0.5, 0.7, 0.35]}>
        <boxGeometry args={[0.8, 0.15, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Lens mount ring */}
      <mesh position={[0, 0, 0.35]}>
        <torusGeometry args={[1.1, 0.12, 16, 48]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Mount contact points */}
      {Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.0, Math.sin(angle) * 1.0, 0.36]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.08, 0.04, 0.02]} />
            <meshStandardMaterial color="#444444" metalness={0.95} roughness={0.1} />
          </mesh>
        )
      })}

      {/* Body screws */}
      {[[1.3, 0.8], [-1.3, 0.8], [1.3, -0.8], [-1.3, -0.8]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.35]}>
          <circleGeometry args={[0.04, 8]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Lens Assembly ─── */
function LensAssembly({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.01
  })

  return (
    <group ref={groupRef}>
      {/* Lens barrel - main cylinder */}
      <mesh position={[0, 0, 0.5]}>
        <cylinderGeometry args={[1.15, 1.2, 0.8, 48, 1, true]} />
        <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Focus ring */}
      <mesh position={[0, 0, 0.7]}>
        <cylinderGeometry args={[1.22, 1.22, 0.25, 48, 1, true]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Focus ring ridges */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2
        return (
          <mesh
            key={`ridge-${i}`}
            position={[Math.cos(angle) * 1.23, Math.sin(angle) * 1.23, 0.7]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.02, 0.02, 0.25]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
        )
      })}

      {/* Zoom ring */}
      <mesh position={[0, 0, 0.3]}>
        <cylinderGeometry args={[1.18, 1.18, 0.2, 48, 1, true]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.75} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Front element housing */}
      <mesh position={[0, 0, 0.9]}>
        <cylinderGeometry args={[1.1, 1.15, 0.15, 48]} />
        <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Front glass rim */}
      <mesh position={[0, 0, 0.98]}>
        <torusGeometry args={[1.0, 0.06, 16, 48]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Engraved rings */}
      {[0.85, 0.65, 0.45].map((r, i) => (
        <mesh key={i} position={[0, 0, 0.5 + i * 0.1]}>
          <torusGeometry args={[r, 0.008, 8, 48]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}

      {/* Lens glass */}
      <LensGlass openProgress={progress} />
    </group>
  )
}

/* ─── Lens Glass Element ─── */
function LensGlass({ openProgress }: { openProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial
    mat.opacity = openProgress < 0.7 ? 0.25 : Math.max(0, 0.25 - (openProgress - 0.7) * 0.8)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0.95]}>
      <circleGeometry args={[0.95, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.25}
        metalness={0}
        roughness={0}
        transmission={0.9}
        thickness={0.5}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ─── Floating Dust Particles ─── */
function LensParticles({ count = 50 }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 1.5 + Math.random() * 1.5
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7C3AED"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Cinematic Camera Controller ─── */
function CinematicCamera({ progress }: { progress: number }) {
  const { camera } = useThree()

  useFrame((state) => {
    const cam = camera as THREE.PerspectiveCamera
    const baseZ = 5
    const zoomIn = easeInOutCubic(Math.min(progress * 1.5, 1))
    cam.position.z = baseZ - zoomIn * 2.5
    cam.fov = 45 + zoomIn * 15
    cam.updateProjectionMatrix()

    const subtleRotX = Math.sin(state.clock.elapsedTime * 0.15) * 0.02 * (1 - progress)
    const subtleRotY = Math.sin(state.clock.elapsedTime * 0.12) * 0.03 * (1 - progress)
    cam.rotation.x = subtleRotX
    cam.rotation.y = subtleRotY
  })

  return null
}

/* ─── Main 3D Scene ─── */
function LensScene({ progress, onComplete }: { progress: number; onComplete: () => void }) {
  const isMobile = useIsMobile()
  const bladeCount = isMobile ? 6 : 8

  return (
    <>
      <ambientLight intensity={0.15} />
      <spotLight position={[5, 5, 5]} intensity={1.5} angle={0.3} penumbra={0.5} castShadow />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#7C3AED" />
      <pointLight position={[3, 2, 2]} intensity={0.3} color="#06B6D4" />
      <pointLight position={[0, 0, 4]} intensity={0.2 * (1 - progress)} color="#ffffff" />

      <CinematicCamera progress={progress} />

      <DSLRBody progress={progress} isMobile={isMobile} />
      <LensAssembly progress={progress} isMobile={isMobile} />

      {Array.from({ length: bladeCount }, (_, i) => (
        <ApertureBlade key={i} index={i} total={bladeCount} openProgress={progress} />
      ))}

      {!isMobile && <LensParticles count={30} />}

      <Environment preset="city" />

      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={isMobile ? 0.3 : 0.6} />
        <ChromaticAberration offset={[0.001 * (1 - progress), 0.001 * (1 - progress)]} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  )
}

/* ─── Preloader Wrapper ─── */
export default function Preloader() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'init' | 'floating' | 'opening' | 'complete'>('init')
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      setPhase('complete')
      return
    }

    const t1 = setTimeout(() => setPhase('floating'), isMobile ? 400 : 800)
    const t2 = setTimeout(() => setPhase('opening'), isMobile ? 1000 : 1600)
    const t3 = setTimeout(() => {
      setPhase('complete')
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, isMobile ? 2200 : 3000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [isMobile, reducedMotion])

  useEffect(() => {
    if (phase === 'opening') {
      const duration = isMobile ? 800 : 1200
      const start = performance.now()

      const animate = (now: number) => {
        const elapsed = now - start
        const raw = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(raw)
        setProgress(eased)

        if (raw < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [phase, isMobile])

  useEffect(() => {
    if (phase === 'complete') setProgress(1)
  }, [phase])

  if (phase === 'complete') return null

  const maskRadius = phase === 'opening' ? progress * 150 : 0
  const blur = phase === 'opening' ? Math.max(0, 12 - progress * 12) : 12

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none bg-background"
    >
      {/* Website reveal mask through aperture */}
      <div
        className="absolute inset-0 bg-background"
        style={{
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${maskRadius}%, black ${maskRadius + 3}%)`,
          maskImage: `radial-gradient(circle at 50% 50%, transparent ${maskRadius}%, black ${maskRadius + 3}%)`,
          transition: phase === 'opening'
            ? '-webkit-mask-image 1.2s cubic-bezier(0.16, 1, 0.3, 1), mask-image 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
          filter: `blur(${blur}px)`,
          transitionProperty: phase === 'opening' ? 'filter, -webkit-mask-image, mask-image' : 'none',
          transitionDuration: phase === 'opening' ? '1.2s, 1.2s, 1.2s' : '0s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* 3D Lens Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <LensScene progress={progress} onComplete={() => {}} />
        </Canvas>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5, 5, 5, 0.8) 100%)',
          opacity: 1 - progress * 0.5,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Cinematic glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, ${0.1 * (1 - progress)}) 0%, transparent 60%)`,
          transition: 'background 1s ease',
        }}
      />
    </div>
  )
}
