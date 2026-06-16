'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const RADIUS = 2.2
const COLORS = {
  accent: '#2563EB',
  accentLight: '#60A5FA',
  purple: '#8B5CF6',
  purpleLight: '#A78BFA',
  text: '#0F172A',
  muted: '#64748B',
}

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks.',
    deliverables: ['Full-stack development', 'Headless CMS', 'API Integration', 'Performance Optimization'],
  },
  {
    title: 'UI/UX Design',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for conversion.',
    deliverables: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing'],
  },
  {
    title: 'Brand Identity',
    description: 'Strategic brand systems including visual identity, typography, and guidelines that communicate unique value.',
    deliverables: ['Brand Strategy', 'Visual Identity & Logo', 'Typography', 'Brand Guidelines'],
  },
  {
    title: 'SEO',
    description: 'Technical SEO audits, content strategy, and performance engineering for sustainable organic growth.',
    deliverables: ['Technical Audit', 'Keyword Strategy', 'Content Production', 'Authority Building'],
  },
  {
    title: 'Digital Marketing',
    description: 'Paid media, lifecycle programs, and analytics-driven campaigns that turn traffic into revenue.',
    deliverables: ['Paid Search & Social', 'Lifecycle & CRM', 'Analytics & Attribution', 'Creative Production'],
  },
  {
    title: 'AI Solutions',
    description: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    deliverables: ['AI Strategy & Consulting', 'Custom AI Agents', 'LLM Integration', 'Process Automation'],
  },
]

function getSpherePositions(count: number, radius: number) {
  const positions: THREE.Vector3[] = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * i / goldenRatio
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    positions.push(new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ))
  }
  return positions
}

function getNetworkConnections(positions: THREE.Vector3[]) {
  const connections: [number, number][] = []
  const k = 3
  for (let i = 0; i < positions.length; i++) {
    const dists = positions
      .map((p, j) => ({ dist: p.distanceTo(positions[i]), j }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.dist - b.dist)
    for (let n = 0; n < Math.min(k, dists.length); n++) {
      const conn: [number, number] = [i, dists[n].j].sort((a, b) => a - b) as [number, number]
      if (!connections.some(([a, b]) => a === conn[0] && b === conn[1])) {
        connections.push(conn)
      }
    }
  }
  return connections
}

function getArcPoints(start: THREE.Vector3, end: THREE.Vector3, radius: number, segments = 30) {
  const pts: number[] = []
  const s = start.clone().normalize()
  const e = end.clone().normalize()
  const angle = s.angleTo(e)
  if (angle < 0.001) {
    for (let i = 0; i <= segments; i++) {
      pts.push(start.x, start.y, start.z)
    }
    return pts
  }
  const axis = new THREE.Vector3().crossVectors(s, e).normalize()
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const v = s.clone().applyAxisAngle(axis, angle * t).multiplyScalar(radius)
    pts.push(v.x, v.y, v.z)
  }
  return pts
}

function LatLonLines({ radius, revealed }: { radius: number; revealed: boolean }) {
  const opacity = revealed ? 0.3 : 0

  const latData = useMemo(() => {
    const lines: number[][] = []
    const segments = 64
    const count = 14
    for (let i = 1; i < count; i++) {
      const phi = (i / count) * Math.PI
      const pts: number[] = []
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2
        pts.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        )
      }
      lines.push(pts)
    }
    return lines
  }, [radius])

  const lonData = useMemo(() => {
    const lines: number[][] = []
    const segments = 48
    const count = 14
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const pts: number[] = []
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI
        pts.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        )
      }
      lines.push(pts)
    }
    return lines
  }, [radius])

  return (
    <group>
      {latData.map((pts, i) => (
        <Line
          key={`lat-${i}`}
          points={pts}
          color={COLORS.accent}
          lineWidth={1.2}
          transparent
          opacity={opacity}
        />
      ))}
      {lonData.map((pts, i) => (
        <Line
          key={`lon-${i}`}
          points={pts}
          color={COLORS.accent}
          lineWidth={1.2}
          transparent
          opacity={opacity}
        />
      ))}
    </group>
  )
}

function WireframeGlobe({ radius, revealed }: { radius: number; revealed: boolean }) {
  const opacity = revealed ? 1 : 0

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius * 0.98, 48, 48]} />
        <meshPhysicalMaterial
          color={COLORS.accent}
          transparent
          opacity={0.06 * opacity}
          roughness={0.3}
          metalness={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.02, 48, 48]} />
        <meshBasicMaterial color={COLORS.purple} transparent opacity={0.04 * opacity} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.15, 32, 32]} />
        <meshBasicMaterial color={COLORS.accent} transparent opacity={0.015 * opacity} side={THREE.BackSide} />
      </mesh>
      <LatLonLines radius={radius} revealed={revealed} />
    </group>
  )
}

function ConnectionLine({
  start,
  end,
  isActive,
  revealed,
  delay,
  radius,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  isActive: boolean
  revealed: boolean
  delay: number
  radius: number
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setVisible(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [revealed, delay])

  const points = useMemo(() => getArcPoints(start, end, radius), [start, end, radius])

  if (!revealed || !visible) return null

  return (
    <Line
      points={points}
      color={isActive ? COLORS.purple : COLORS.accent}
      lineWidth={isActive ? 2 : 1}
      transparent
      opacity={isActive ? 0.6 : 0.18}
    />
  )
}

function ServiceNode({
  position,
  label,
  index,
  activeIndex,
  hoveredIndex,
  revealed,
  onHover,
  onClick,
  onLeave,
  entryDelay,
}: {
  position: THREE.Vector3
  label: string
  index: number
  activeIndex: number | null
  hoveredIndex: number | null
  revealed: boolean
  onHover: (i: number) => void
  onClick: (i: number) => void
  onLeave: () => void
  entryDelay: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const scaleRef = useRef(0)
  const isActive = activeIndex === index
  const isHovered = hoveredIndex === index
  const isHighlighted = isHovered || isActive

  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setEntered(true), entryDelay * 1000)
      return () => clearTimeout(t)
    }
  }, [revealed, entryDelay])

  useFrame(({ clock }) => {
    const target = entered ? 1 : 0
    scaleRef.current += (target - scaleRef.current) * Math.min(0.08, 0.08)

    const pulse = 0.94 + 0.06 * Math.sin(clock.getElapsedTime() * 1.4 + index * 0.7)
    const scale = isHighlighted ? 1.5 : 1
    const s = scaleRef.current * scale * pulse

    if (meshRef.current) {
      meshRef.current.scale.setScalar(s)
    }
    if (glowRef.current) {
      const gs = scaleRef.current * (isHighlighted ? 2.0 : 1) * (0.95 + 0.05 * Math.sin(clock.getElapsedTime() * 0.9))
      glowRef.current.scale.setScalar(gs)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      const targetOpacity = isHighlighted ? 0.4 : 0.15
      mat.opacity += (targetOpacity + 0.02 * Math.sin(clock.getElapsedTime()) - mat.opacity) * 0.04
    }
  })

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshBasicMaterial
          color={isHighlighted ? COLORS.purple : COLORS.accent}
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={onLeave}
        onClick={(e) => { e.stopPropagation(); onClick(index) }}
      >
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color={isHighlighted ? COLORS.accent : COLORS.accentLight}
          emissive={isHighlighted ? COLORS.purple : COLORS.accent}
          emissiveIntensity={isHighlighted ? 0.8 : 0.25}
        />
      </mesh>
      <Html
        center
        style={{
          pointerEvents: 'none',
          transform: `translateY(18px) scale(${isActive || isHovered ? 1.1 : 1})`,
          opacity: isActive ? 1 : isHovered ? 1 : 0.8,
          transition: 'transform 0.25s ease, opacity 0.25s ease',
        }}
      >
        <span
          style={{
            fontSize: isActive ? '22px' : isHovered ? '20px' : '18px',
            fontWeight: 700,
            color: isActive ? COLORS.accent : isHovered ? '#1D4ED8' : '#0F172A',
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, system-ui, sans-serif',
            transition: 'color 0.25s ease, font-size 0.25s ease',
            textShadow: '0 1px 4px rgba(255,255,255,0.9)',
            background: isActive || isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            padding: '3px 10px',
            borderRadius: '8px',
            border: isActive || isHovered ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid rgba(0,0,0,0.04)',
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  )
}

function Particles({ count = 35, revealed }: { count?: number; revealed: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = RADIUS * 1.3 + Math.random() * RADIUS * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.008
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.004) * 0.04
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  if (!revealed) return null

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.018} color={COLORS.accentLight} transparent opacity={0.2} />
    </points>
  )
}

export function GlobeScene({
  activeIndex,
  setActiveIndex,
  hoveredIndex,
  setHoveredIndex,
  revealed,
}: {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  revealed: boolean
}) {
  const positions = useMemo(() => getSpherePositions(services.length, RADIUS), [])
  const connections = useMemo(() => getNetworkConnections(positions), [positions])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color={COLORS.accent} />
      <pointLight position={[-4, -3, 5]} intensity={0.3} color={COLORS.purple} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={revealed ? 0.8 : 0}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3 / 4}
      />

      <WireframeGlobe radius={RADIUS} revealed={revealed} />

      {connections.map(([i, j], idx) => (
        <ConnectionLine
          key={`conn-${idx}`}
          start={positions[i]}
          end={positions[j]}
          isActive={activeIndex === i || activeIndex === j || hoveredIndex === i || hoveredIndex === j}
          revealed={revealed}
          delay={0.3 + 0.04 * idx}
          radius={RADIUS}
        />
      ))}

      {services.map((service, i) => (
        <ServiceNode
          key={service.title}
          position={positions[i]}
          label={service.title}
          index={i}
          activeIndex={activeIndex}
          hoveredIndex={hoveredIndex}
          revealed={revealed}
          onHover={setHoveredIndex}
          onClick={setActiveIndex}
          onLeave={() => setHoveredIndex(null)}
          entryDelay={0.2 + 0.08 * i}
        />
      ))}

      <Particles count={35} revealed={revealed} />
    </>
  )
}

export function GlobeCanvas(props: {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  revealed: boolean
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.0], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <GlobeScene {...props} />
    </Canvas>
  )
}

export { services, RADIUS, COLORS }
