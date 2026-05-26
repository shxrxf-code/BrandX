'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile } from '@/lib/hooks'

const NODE_COUNT = 28
const CONNECTION_DIST = 4.5
const SPHERE_RADIUS = 4.2
const PARTICLE_COUNT = 40

interface NeuralNetworkInnerProps {
  mouseRef: { current: { x: number; y: number } }
  isInView: boolean
}

function NeuralNetworkInner({ mouseRef, isInView }: NeuralNetworkInnerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Points>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, colorsArr, sizesArr } = useMemo(() => {
    const pos: [number, number, number][] = []
    const col = new Float32Array(NODE_COUNT * 3)
    const siz = new Float32Array(NODE_COUNT)
    const palette = [
      new THREE.Color('#7C3AED'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#22D3EE'),
    ]

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = SPHERE_RADIUS * (0.5 + Math.random() * 0.5)
      pos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
      const c = palette[i % 3]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
      siz[i] = 0.08 + Math.random() * 0.08
    }
    return { positions: pos, colorsArr: col, sizesArr: siz }
  }, [])

  const { connections, linePosArr, lineColorArr } = useMemo(() => {
    const conns: [number, number][] = []
    const lpos: number[] = []
    const lcols: number[] = []

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0]
        const dy = positions[i][1] - positions[j][1]
        const dz = positions[i][2] - positions[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < CONNECTION_DIST && Math.random() < 0.55) {
          conns.push([i, j])
          lpos.push(positions[i][0], positions[i][1], positions[i][2])
          lpos.push(positions[j][0], positions[j][1], positions[j][2])
          const c1 = new THREE.Color(colorsArr[i * 3], colorsArr[i * 3 + 1], colorsArr[i * 3 + 2])
          const c2 = new THREE.Color(colorsArr[j * 3], colorsArr[j * 3 + 1], colorsArr[j * 3 + 2])
          lcols.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b)
        }
      }
    }
    return { connections: conns, linePosArr: lpos, lineColorArr: lcols }
  }, [positions, colorsArr])

  const particles = useMemo(() => {
    const p: { connIdx: number; offset: number; speed: number }[] = []
    const count = Math.max(connections.length, 1)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      p.push({
        connIdx: Math.floor(Math.random() * count),
        offset: Math.random(),
        speed: 0.2 + Math.random() * 0.4,
      })
    }
    return p
  }, [connections.length])

  const posArr = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3)
    positions.forEach((p, i) => {
      arr[i * 3] = p[0]
      arr[i * 3 + 1] = p[1]
      arr[i * 3 + 2] = p[2]
    })
    return arr
  }, [positions])

  useFrame((state, delta) => {
    if (!isInView) return
    if (!groupRef.current) return

    const mouseX = mouseRef.current?.x ?? 0
    const mouseY = mouseRef.current?.y ?? 0

    groupRef.current.rotation.y += delta * 0.06

    const mx = (mouseY / window.innerHeight - 0.5) * 0.15
    const mz = (mouseX / window.innerWidth - 0.5) * -0.15
    const targetX = mx + Math.sin(state.clock.elapsedTime * 0.015) * 0.04
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * delta * 0.5
    groupRef.current.rotation.z += (mz - groupRef.current.rotation.z) * delta * 0.5

    if (nodesRef.current) {
      const sizeAttr = nodesRef.current.geometry.attributes.size
      const arr = sizeAttr.array as Float32Array
      for (let i = 0; i < arr.length; i++) {
        const pulse = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.8) * 0.03 + 0.05
        arr[i] = Math.max(0.02, sizesArr[i] + pulse)
      }
      sizeAttr.needsUpdate = true
    }

    if (particlesRef.current && connections.length > 0) {
      const posArr3 = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let pIdx = 0; pIdx < PARTICLE_COUNT; pIdx++) {
        const p = particles[pIdx]
        const connIdx = p.connIdx % connections.length
        const [nA, nB] = connections[connIdx]
        const offset = (p.offset + state.clock.elapsedTime * p.speed * 0.04) % 1

        posArr3[pIdx * 3] = positions[nA][0] + (positions[nB][0] - positions[nA][0]) * offset
        posArr3[pIdx * 3 + 1] = positions[nA][1] + (positions[nB][1] - positions[nA][1]) * offset
        posArr3[pIdx * 3 + 2] = positions[nA][2] + (positions[nB][2] - positions[nA][2]) * offset
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            args={[new Float32Array(linePosArr), 3]}
            attach="attributes-position"
            count={linePosArr.length / 3}
          />
          <bufferAttribute
            args={[new Float32Array(lineColorArr), 3]}
            attach="attributes-color"
            count={lineColorArr.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.15} depthWrite={false} />
      </lineSegments>

      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute args={[posArr, 3]} attach="attributes-position" count={NODE_COUNT} />
          <bufferAttribute args={[colorsArr, 3]} attach="attributes-color" count={NODE_COUNT} />
          <bufferAttribute args={[sizesArr, 1]} attach="attributes-size" count={NODE_COUNT} />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            args={[new Float32Array(PARTICLE_COUNT * 3), 3]}
            attach="attributes-position"
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#22D3EE"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

interface NeuralNetwork3DProps {
  isLoaded: boolean
  baseDelay: number
}

export default function NeuralNetwork3D({ isLoaded, baseDelay }: NeuralNetwork3DProps) {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  if (!mounted) return null

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-accent-purple/5" />
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[0.5, 1.5]}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
        frameloop={isInView ? 'always' : 'demand'}
      >
        <NeuralNetworkInner mouseRef={mouseRef} isInView={isInView} />
      </Canvas>
    </div>
  )
}
