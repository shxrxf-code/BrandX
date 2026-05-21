'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'

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

/* ─── Lens Barrel ─── */
function LensBarrel({ openProgress }: { openProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    groupRef.current.scale.setScalar(1 + openProgress * 0.5)
  })

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <mesh position={[0, 0, 0.1]}>
        <torusGeometry args={[2.2, 0.15, 16, 64]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Inner ring */}
      <mesh position={[0, 0, 0.15]}>
        <torusGeometry args={[2.0, 0.08, 16, 64]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Engraved rings */}
      {[1.6, 1.3, 1.0].map((r, i) => (
        <mesh key={i} position={[0, 0, 0.08 + i * 0.02]}>
          <torusGeometry args={[r, 0.01, 8, 64]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}

      {/* Lens body cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.3, 64, 1, true]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* ─── Glass Element ─── */
function LensGlass({ openProgress }: { openProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial
    mat.opacity = openProgress < 0.7 ? 0.3 : Math.max(0, 0.3 - (openProgress - 0.7) * 1)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0.05]}>
      <circleGeometry args={[1.95, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
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

/* ─── Scene Controller ─── */
function SceneController({ openProgress, onComplete }: { openProgress: number; onComplete: () => void }) {
  const { camera, scene } = useThree()

  useFrame((state) => {
    const cam = camera as THREE.PerspectiveCamera
    cam.position.z = 5 - openProgress * 2
    cam.fov = 45 + openProgress * 10
    cam.updateProjectionMatrix()
  })

  return null
}

/* ─── Main 3D Scene ─── */
function LensScene({ openProgress, onComplete }: { openProgress: number; onComplete: () => void }) {
  const isMobile = useIsMobile()
  const bladeCount = isMobile ? 6 : 8

  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} intensity={1.5} angle={0.3} penumbra={0.5} castShadow />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#7C3AED" />
      <pointLight position={[3, 2, 2]} intensity={0.3} color="#06B6D4" />

      <SceneController openProgress={openProgress} onComplete={onComplete} />

      <LensBarrel openProgress={openProgress} />
      <LensGlass openProgress={openProgress} />

      {Array.from({ length: bladeCount }, (_, i) => (
        <ApertureBlade key={i} index={i} total={bladeCount} openProgress={openProgress} />
      ))}

      {!isMobile && <LensParticles count={30} />}

      <Environment preset="city" />

      {/* Post-processing */}
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={isMobile ? 0.3 : 0.6} />
        <ChromaticAberration offset={[0.001 * (1 - openProgress), 0.001 * (1 - openProgress)]} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  )
}

/* ─── Preloader Wrapper ─── */
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

    const t1 = setTimeout(() => setPhase('opening'), isMobile ? 600 : 1000)
    const t2 = setTimeout(() => {
      setPhase('complete')
      window.dispatchEvent(new CustomEvent('preloader-complete'))
    }, isMobile ? 2000 : 2400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isMobile, reducedMotion])

  useEffect(() => {
    if (phase === 'opening') {
      const duration = isMobile ? 1000 : 1200
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
    if (phase === 'complete') setOpenProgress(1)
  }, [phase])

  if (phase === 'complete') return null

  const maskRadius = phase === 'opening' ? openProgress * 150 : 0

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none bg-background"
    >
      {/* Website reveal mask */}
      <div
        className="absolute inset-0 bg-background"
        style={{
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${maskRadius}%, black ${maskRadius + 3}%)`,
          maskImage: `radial-gradient(circle at 50% 50%, transparent ${maskRadius}%, black ${maskRadius + 3}%)`,
          transition: phase === 'opening'
            ? '-webkit-mask-image 1.2s cubic-bezier(0.16, 1, 0.3, 1), mask-image 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
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
          <LensScene openProgress={openProgress} onComplete={() => {}} />
        </Canvas>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5, 5, 5, 0.8) 100%)',
        }}
      />
    </div>
  )
}
