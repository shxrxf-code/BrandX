'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { easeOutExpo, easeInOutCubic, lerp } from '@/lib/easings'

interface CinematicCameraProps {
  timeline: number
  tier?: string
}

export default function CinematicCamera({ timeline }: CinematicCameraProps) {
  const { camera } = useThree()
  const driftRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const cam = camera as THREE.PerspectiveCamera
    const t = Math.max(0, Math.min(1, timeline))
    const elapsed = state.clock.elapsedTime

    const baseZ = 4.8
    const baseFov = 36

    let targetZ: number
    let targetFov: number
    let targetX: number
    let targetY: number
    let targetRX: number
    let targetRY: number

    if (t < 0.2) {
      const u = easeOutExpo(t / 0.2)
      targetZ = baseZ + (1 - u) * 0.8
      targetFov = baseFov + u * 3
      targetX = lerp(2.6, 1.6, u)
      targetY = lerp(0.9, 0.5, u)
      targetRX = lerp(-0.08, -0.04, u)
      targetRY = lerp(0.4, 0.25, u)
    } else if (t < 0.45) {
      const u = easeInOutCubic((t - 0.2) / 0.25)
      targetZ = baseZ - u * 0.4
      targetFov = baseFov + 3 + u * 4
      targetX = lerp(1.6, 0.4, u)
      targetY = lerp(0.5, 0.15, u)
      targetRX = lerp(-0.04, 0, u)
      targetRY = lerp(0.25, 0.05, u)
    } else if (t < 0.7) {
      const u = easeInOutCubic((t - 0.45) / 0.25)
      targetZ = baseZ - 0.4 - u * 1.6
      targetFov = baseFov + 7 + u * 7
      targetX = lerp(0.4, 0, u)
      targetY = lerp(0.15, 0, u)
      targetRX = 0
      targetRY = lerp(0.05, 0, u)
    } else {
      const u = easeInOutCubic((t - 0.7) / 0.3)
      targetZ = baseZ - 2.0 - u * 2.2
      targetFov = baseFov + 14 + u * 14
      targetX = 0
      targetY = 0
      targetRX = 0
      targetRY = 0
    }

    const drift = Math.sin(elapsed * 0.12) * 0.008 * (1 - t)
    const drift2 = Math.cos(elapsed * 0.09) * 0.006 * (1 - t)

    cam.position.x = targetX + drift + driftRef.current.x
    cam.position.y = targetY + drift2 + driftRef.current.y
    cam.position.z = targetZ
    cam.rotation.x = targetRX
    cam.rotation.y = targetRY
    cam.fov = targetFov
    cam.updateProjectionMatrix()

    driftRef.current.x += (Math.sin(elapsed * 0.06) * 0.001 - driftRef.current.x) * 0.02
    driftRef.current.y += (Math.cos(elapsed * 0.08) * 0.001 - driftRef.current.y) * 0.02
  })

  return null
}
