'use client'

import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { easeInOutCubic } from '@/lib/easings'
import { createBrandTexture, createRingTexture } from '@/lib/textures'

interface DSLRCameraProps {
  timeline: number
  tier: string
}

export default function DSLRCamera({ timeline, tier }: DSLRCameraProps) {
  const bodyRef = useRef<THREE.Group>(null)
  const lensRef = useRef<THREE.Group>(null)
  const frontGlassRef = useRef<THREE.Mesh>(null)
  const innerGlassRef = useRef<THREE.Mesh>(null)
  const brandTexture = useMemo(() => createBrandTexture(), [])
  const ringTexture = useMemo(() => createRingTexture(), [])
  const timeRef = useRef(0)

  const segs = tier === 'low' ? 20 : tier === 'medium' ? 30 : 40
  const isHighTier = tier === 'high'
  const isLowTier = tier === 'low'

  const driftAxis = useMemo(() => ({
    x: Math.random() * 0.02,
    y: Math.random() * 0.02,
    z: Math.random() * 0.015,
    rx: (Math.random() - 0.5) * 0.01,
    ry: (Math.random() - 0.5) * 0.01,
  }), [])

  useFrame((_state, delta) => {
    timeRef.current += delta
    const t = timeline
    const elapsed = timeRef.current
    const drift = 0.5 + t * 0.5

    if (bodyRef.current) {
      const floatY = Math.sin(elapsed * 0.28 + driftAxis.y) * 0.04 * drift
      const floatX = Math.sin(elapsed * 0.22 + driftAxis.x) * 0.025 * drift
      const tiltX = Math.sin(elapsed * 0.18 + driftAxis.rx) * 0.02 * drift
      const tiltY = Math.sin(elapsed * 0.14 + driftAxis.ry) * 0.03 * drift

      bodyRef.current.position.y = floatY
      bodyRef.current.position.x = floatX
      bodyRef.current.rotation.x = tiltX
      bodyRef.current.rotation.y = tiltY

      if (t > 0.65) {
        const fadeT = Math.min((t - 0.65) / 0.35, 1)
        const easeFade = easeInOutCubic(fadeT)
        bodyRef.current.scale.setScalar(Math.max(0.01, 1 - easeFade * 0.85))
        if (lensRef.current) {
          lensRef.current.scale.setScalar(Math.max(0.01, 1 - easeFade * 0.7))
        }
      }
    }

    if (lensRef.current) {
      lensRef.current.rotation.z = Math.sin(elapsed * 0.1) * 0.008 * drift
    }

    if (frontGlassRef.current) {
      const mat = frontGlassRef.current.material as THREE.MeshPhysicalMaterial
      if (t < 0.25) {
        mat.opacity = 0.2 + t * 0.2
      } else if (t < 0.55) {
        mat.opacity = 0.25 - ((t - 0.25) / 0.3) * 0.12
      } else {
        mat.opacity = Math.max(0, 0.13 - ((t - 0.55) / 0.45) * 0.13)
      }
    }

    if (innerGlassRef.current) {
      const mat = innerGlassRef.current.material as THREE.MeshPhysicalMaterial
      mat.opacity = 0.08 * (1 - Math.max(0, (t - 0.3) / 0.4))
    }
  })

  return (
    <group>
      <group ref={lensRef}>
        <mesh position={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.88, 0.92, 0.35, segs, 1, true]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.85}
            roughness={0.2}
            side={THREE.DoubleSide}
            envMapIntensity={isHighTier ? 0.8 : 0.4}
          />
        </mesh>

        <mesh position={[0, 0, 0.44]}>
          <cylinderGeometry args={[0.94, 0.94, 0.2, segs, 1, true]} />
          <meshStandardMaterial
            color="#0d0d0d"
            metalness={0.6}
            roughness={isHighTier ? 0.5 : 0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {isHighTier && (
          <mesh position={[0, 0, 0.44]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.0, 0.22, 1, 1]} />
            <meshBasicMaterial map={ringTexture} transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        )}

        {!isLowTier && Array.from({ length: 22 }, (_, i) => {
          const angle = (i / 22) * Math.PI * 2
          return (
            <mesh
              key={`ridge-${i}`}
              position={[Math.cos(angle) * 0.96, Math.sin(angle) * 0.96, 0.44]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.012, 0.012, 0.2]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.75} roughness={0.3} />
            </mesh>
          )
        })}

        <mesh position={[0, 0, 0.58]}>
          <cylinderGeometry args={[0.84, 0.88, 0.1, segs, 1, true]} />
          <meshStandardMaterial
            color="#151515"
            metalness={0.88}
            roughness={0.18}
            side={THREE.DoubleSide}
            envMapIntensity={isHighTier ? 0.7 : 0.3}
          />
        </mesh>

        <mesh position={[0, 0, 0.64]}>
          <cylinderGeometry args={[0.8, 0.84, 0.08, segs]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={isHighTier ? 0.7 : 0.3}
          />
        </mesh>

        <mesh position={[0, 0, 0.69]}>
          <torusGeometry args={[0.78, 0.035, 8, segs]} />
          <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.08} envMapIntensity={1} />
        </mesh>

        {[0.55, 0.42, 0.3].map((r, i) => (
          <mesh key={`ring-${i}`} position={[0, 0, 0.3 + i * 0.1]}>
            <torusGeometry args={[r, 0.005, 6, segs]} />
            <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.35} />
          </mesh>
        ))}

        <mesh position={[0, 0, 0.15]}>
          <ringGeometry args={[0.12, 0.78, segs]} />
          <meshStandardMaterial color="#080808" metalness={0.5} roughness={0.8} side={THREE.DoubleSide} />
        </mesh>

        <mesh ref={innerGlassRef} position={[0, 0, 0.12]}>
          <circleGeometry args={[0.72, segs]} />
          <meshPhysicalMaterial
            color="#2a3a5a"
            transparent
            opacity={0.08}
            metalness={0.1}
            roughness={0.2}
            transmission={0.9}
            thickness={0.3}
            ior={1.45}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
            envMapIntensity={0.3}
          />
        </mesh>

        <mesh ref={frontGlassRef} position={[0, 0, 0.68]}>
          <circleGeometry args={[0.75, segs]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.22}
            metalness={0}
            roughness={0.05}
            transmission={0.82}
            thickness={0.35}
            ior={1.52}
            clearcoat={1}
            clearcoatRoughness={0.03}
            side={THREE.DoubleSide}
            envMapIntensity={0.4}
          />
        </mesh>

        {isHighTier && (
          <mesh position={[0.3, 0.3, 0.68]} rotation={[0.3, 0.4, 0]}>
            <planeGeometry args={[0.2, 0.06]} />
            <meshBasicMaterial color="white" transparent opacity={0.12} />
          </mesh>
        )}
      </group>

      <group ref={bodyRef}>
        <mesh position={[0, 0, -0.25]} castShadow>
          <boxGeometry args={[2.4, 1.7, 0.65, 1, 1, 1]} />
          <meshStandardMaterial
            color="#080808"
            metalness={isHighTier ? 0.65 : 0.5}
            roughness={isHighTier ? 0.25 : 0.4}
            envMapIntensity={isHighTier ? 0.6 : 0.2}
          />
        </mesh>

        {[
          { pos: [1.2, 0, -0.25] as [number, number, number], size: [0.04, 1.7, 0.65] as [number, number, number] },
          { pos: [-1.2, 0, -0.25] as [number, number, number], size: [0.04, 1.7, 0.65] as [number, number, number] },
          { pos: [0, 0.85, -0.25] as [number, number, number], size: [2.4, 0.04, 0.65] as [number, number, number] },
          { pos: [0, -0.85, -0.25] as [number, number, number], size: [2.4, 0.04, 0.65] as [number, number, number] },
        ].map(({ pos, size }, i) => (
          <mesh key={`bevel-${i}`} position={pos}>
            <boxGeometry args={size} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.4} />
          </mesh>
        ))}

        <mesh position={[0, 0.88, -0.25]} castShadow>
          <boxGeometry args={[2.4, 0.08, 0.65, 1, 1, 1]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.85}
            roughness={isHighTier ? 0.15 : 0.25}
            envMapIntensity={isHighTier ? 0.7 : 0.3}
          />
        </mesh>

        <mesh position={[0, -0.86, -0.25]}>
          <boxGeometry args={[2.2, 0.06, 0.55]} />
          <meshStandardMaterial color="#060606" metalness={0.5} roughness={0.6} />
        </mesh>

        <mesh position={[1.05, 0, -0.15]} castShadow>
          <boxGeometry args={[0.28, 1.5, 0.55]} />
          <meshStandardMaterial
            color="#050505"
            metalness={0.3}
            roughness={isHighTier ? 0.7 : 0.8}
          />
        </mesh>

        {!isLowTier && Array.from({ length: 10 }, (_, i) => (
          <mesh key={`grip-${i}`} position={[1.05, -0.68 + i * 0.15, -0.4]}>
            <boxGeometry args={[0.28, 0.015, 0.01]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
          </mesh>
        ))}

        <mesh position={[0, 0.58, -0.55]} castShadow>
          <boxGeometry args={[0.85, 0.4, 0.2]} />
          <meshStandardMaterial
            color="#0d0d0d"
            metalness={0.7}
            roughness={0.25}
            envMapIntensity={isHighTier ? 0.5 : 0.2}
          />
        </mesh>

        <mesh position={[-0.15, 0.62, -0.65]}>
          <boxGeometry args={[0.18, 0.14, 0.015]} />
          <meshPhysicalMaterial
            color="#2a3a4a"
            metalness={0.1}
            roughness={0.1}
            transmission={0.6}
            thickness={0.1}
            ior={1.5}
            clearcoat={0.5}
            envMapIntensity={0.3}
          />
        </mesh>

        <mesh position={[0, 0.58, -0.68]}>
          <boxGeometry args={[0.35, 0.28, 0.08]} />
          <meshStandardMaterial color="#050505" metalness={0.1} roughness={0.9} />
        </mesh>

        <mesh position={[0, 0.94, -0.22]}>
          <boxGeometry args={[0.5, 0.055, 0.18]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={isHighTier ? 1 : 0.5}
          />
        </mesh>

        {isHighTier && [[-0.1, 0, 0.06] as [number, number, number], [0, 0, 0.06] as [number, number, number], [0.1, 0, 0.06] as [number, number, number]].map((pos, i) => (
          <mesh key={`hs-contact-${i}`} position={[pos[0], 0.97, pos[2]]}>
            <boxGeometry args={[0.02, 0.01, 0.02]} />
            <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        <mesh position={[0.6, 0.98, -0.2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.08, segs]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.92}
            roughness={0.12}
            envMapIntensity={isHighTier ? 0.8 : 0.3}
          />
        </mesh>

        <mesh position={[0.6, 1.02, -0.2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, segs]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.06} envMapIntensity={1} />
        </mesh>

        <mesh position={[0.95, 0.95, 0.05]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.06, segs]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.06} envMapIntensity={1} />
        </mesh>

        <mesh position={[0.95, 0.98, 0.05]}>
          <torusGeometry args={[0.07, 0.01, 6, segs]} />
          <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[1.18, 0.95, 0.08]}>
          <boxGeometry args={[0.14, 0.03, 0.04]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} />
        </mesh>

        <mesh position={[-0.35, 0.5, 0.12]}>
          <planeGeometry args={[0.55, 0.14]} />
          <meshBasicMaterial map={brandTexture} transparent />
        </mesh>

        {isHighTier && (
          <mesh position={[-0.35, 0.5, 0.13]}>
            <planeGeometry args={[0.55, 0.14]} />
            <meshBasicMaterial color="#7C3AED" transparent opacity={0.04} />
          </mesh>
        )}

        <mesh position={[0, 0, 0.12]} castShadow>
          <torusGeometry args={[0.88, 0.06, 8, segs]} />
          <meshStandardMaterial
            color="#222222"
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={isHighTier ? 0.8 : 0.4}
          />
        </mesh>

        <mesh position={[0, 0, 0.14]}>
          <torusGeometry args={[0.82, 0.025, 6, segs]} />
          <meshStandardMaterial color="#555555" metalness={0.98} roughness={0.04} envMapIntensity={1.2} />
        </mesh>

        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh
              key={`contact-${i}`}
              position={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0.13]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.05, 0.025, 0.012]} />
              <meshStandardMaterial color="#c8a84a" metalness={0.95} roughness={0.1} envMapIntensity={1} />
            </mesh>
          )
        })}

        <mesh position={[0.75, 0.15, 0.14]}>
          <cylinderGeometry args={[0.05, 0.055, 0.04, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {[[1.1, 0.75] as [number, number], [-1.1, 0.75] as [number, number], [1.1, -0.75] as [number, number], [-1.1, -0.75] as [number, number]].map(([x, y], i) => (
          <mesh key={`screw-${i}`} position={[x, y, 0.12]}>
            <circleGeometry args={[0.025, 8]} />
            <meshStandardMaterial color="#333333" metalness={0.85} roughness={0.15} envMapIntensity={0.5} />
          </mesh>
        ))}

        {[[1.25, 0.7] as [number, number], [-1.25, 0.7] as [number, number]].map(([x, y], i) => (
          <mesh key={`lug-${i}`} position={[x, y, -0.2]}>
            <torusGeometry args={[0.06, 0.025, 6, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        <mesh position={[-0.9, -0.3, 0.13]}>
          <boxGeometry args={[0.08, 0.04, 0.012]} />
          <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
