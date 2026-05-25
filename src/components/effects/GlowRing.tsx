'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface GlowRingProps {
  openProgress: number
}

export default function GlowRing({ openProgress }: GlowRingProps) {
  const ref = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((_state, delta) => {
    timeRef.current += delta
    if (!ref.current) return
    const pulse = 1 + Math.sin(timeRef.current * 0.5) * 0.05
    const scale = openProgress * 0.6 * pulse
    ref.current.scale.setScalar(Math.max(0.01, scale))
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.08 * (1 - openProgress * 0.6)
    mat.color.setHSL(0.72, 0.6, 0.4 + 0.3 * (1 - openProgress))
  })

  return (
    <mesh ref={ref} position={[0, 0, -0.1]}>
      <ringGeometry args={[0.5, 0.7, 48]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  )
}
