'use client'

import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface ApertureBladeProps {
  index: number
  total: number
  openProgress: number
  tier: string
}

export default function ApertureBlade({ index, total, openProgress, tier }: ApertureBladeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const bladeAngle = (Math.PI * 2) / total
  const pivotAngle = index * bladeAngle
  const segs = tier === 'low' ? 12 : 20

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const innerR = 0.18
    const outerR = 2.4
    const halfSpan = bladeAngle * 0.45
    const midAngle = halfSpan * 0.55
    s.moveTo(
      innerR * Math.cos(-halfSpan) * 1.6,
      innerR * Math.sin(-halfSpan) * 1.6
    )
    s.quadraticCurveTo(
      innerR * Math.cos(-midAngle) * 1.8 + 0.15,
      innerR * Math.sin(-midAngle) * 1.8 + 0.35,
      outerR * Math.cos(-halfSpan - 0.12),
      outerR * Math.sin(-halfSpan - 0.12)
    )
    s.lineTo(
      outerR * Math.cos(halfSpan + 0.12),
      outerR * Math.sin(halfSpan + 0.12)
    )
    s.quadraticCurveTo(
      innerR * Math.cos(midAngle) * 1.8 + 0.15,
      innerR * Math.sin(midAngle) * 1.8 - 0.35,
      innerR * Math.cos(halfSpan) * 1.6,
      innerR * Math.sin(halfSpan) * 1.6
    )
    s.closePath()
    return s
  }, [])

  const geometry = useMemo(() => {
    const depth = tier === 'low' ? 0.03 : 0.05
    const bevel = tier === 'low' ? 0.005 : 0.012
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    })
    g.center()
    return g
  }, [shape, tier])

  useFrame(() => {
    if (!meshRef.current) return
    const maxRotation = bladeAngle * 0.52
    const rotation = openProgress * maxRotation
    meshRef.current.rotation.z = pivotAngle + rotation
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    if (openProgress > 0.85) {
      mat.opacity = Math.max(0, 1 - (openProgress - 0.85) * 6.5)
    } else {
      mat.opacity = 1
    }
  })

  const isHighTier = tier === 'high'
  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0.05]} castShadow>
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.92}
        roughness={isHighTier ? 0.18 : 0.3}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
        envMapIntensity={isHighTier ? 0.6 : 0.3}
      />
    </mesh>
  )
}
