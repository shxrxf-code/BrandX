'use client'

import { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks.',
    deliverables: ['Full-stack development', 'Headless CMS', 'API Integration', 'Performance Optimization'],
    size: 'large',
  },
  {
    title: 'UI/UX Design',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for conversion.',
    deliverables: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing'],
    size: 'large',
  },
  {
    title: 'Brand Identity',
    description: 'Strategic brand systems including visual identity, typography, and guidelines that communicate unique value.',
    deliverables: ['Brand Strategy', 'Visual Identity & Logo', 'Typography', 'Brand Guidelines'],
    size: 'medium',
  },
  {
    title: 'SEO',
    description: 'Technical SEO audits, content strategy, and performance engineering for sustainable organic growth.',
    deliverables: ['Technical Audit', 'Keyword Strategy', 'Content Production', 'Authority Building'],
    size: 'small',
  },
  {
    title: 'Digital Marketing',
    description: 'Paid media, lifecycle programs, and analytics-driven campaigns that turn traffic into revenue.',
    deliverables: ['Paid Search & Social', 'Lifecycle & CRM', 'Analytics & Attribution', 'Creative Production'],
    size: 'medium',
  },
  {
    title: 'AI Solutions',
    description: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    deliverables: ['AI Strategy & Consulting', 'Custom AI Agents', 'LLM Integration', 'Process Automation'],
    size: 'large',
  },
]

const RADIUS = 3
const COLORS = {
  accent: '#2563EB',
  accentLight: '#60A5FA',
  purple: '#8B5CF6',
  purpleLight: '#A78BFA',
  line: 'rgba(37, 99, 235, 0.10)',
  lineActive: 'rgba(37, 99, 235, 0.45)',
  text: '#0F172A',
  muted: '#64748B',
}

function getNodeRadius(size: string) {
  switch (size) {
    case 'large': return 0.24
    case 'medium': return 0.19
    case 'small': return 0.15
    default: return 0.20
  }
}

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

function HoverCard({ service, position }: { service: typeof services[0]; position: THREE.Vector3 }) {
  const offset = position.clone().normalize().multiplyScalar(0.9)
  const hoverPos = new THREE.Vector3().addVectors(position, offset)

  return (
    <Html position={hoverPos} center style={{ pointerEvents: 'none', zIndex: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white/95 backdrop-blur-md rounded-xl border border-border shadow-lg p-4 w-56"
      >
        <h4 className="text-sm font-bold text-foreground mb-1.5">{service.title}</h4>
        <p className="text-[11px] text-muted leading-relaxed mb-2.5">{service.description}</p>
        <div className="flex flex-wrap gap-1">
          {service.deliverables.slice(0, 2).map((d) => (
            <span
              key={d}
              className="inline-block px-1.5 py-0.5 bg-accent/5 border border-accent/10 rounded text-[9px] text-accent font-medium"
            >
              {d}
            </span>
          ))}
        </div>
      </motion.div>
    </Html>
  )
}

function Node({
  position,
  label,
  index,
  size,
  activeIndex,
  hoveredIndex,
  revealed,
  onHover,
  onClick,
  onLeave,
}: {
  position: THREE.Vector3
  label: string
  index: number
  size: string
  activeIndex: number | null
  hoveredIndex: number | null
  revealed: boolean
  onHover: (i: number) => void
  onClick: (i: number) => void
  onLeave: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const isActive = activeIndex === index
  const isHovered = hoveredIndex === index
  const baseRadius = getNodeRadius(size)
  const targetScale = isHovered || isActive ? 1.6 : 1

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = 0.94 + 0.06 * Math.sin(clock.getElapsedTime() * 1.4 + index * 0.7)
      meshRef.current.scale.setScalar(targetScale * pulse)
    }
    if (glowRef.current) {
      const gs = (isHovered || isActive ? 1.8 : 1) * (0.95 + 0.05 * Math.sin(clock.getElapsedTime() * 0.9))
      glowRef.current.scale.setScalar(gs)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = (isHovered || isActive ? 0.35 : 0.08) + 0.03 * Math.sin(clock.getElapsedTime())
    }
  })

  const entryDelay = 0.05 * index
  const entryScale = revealed ? 1 : 0

  return (
    <group position={position}>
      <mesh ref={glowRef} scale={entryScale}>
        <sphereGeometry args={[baseRadius * 2.8, 20, 20]} />
        <meshBasicMaterial
          color={isHovered || isActive ? COLORS.purple : COLORS.accent}
          transparent
          opacity={isHovered || isActive ? 0.35 : 0.08}
        />
      </mesh>
      <mesh
        ref={meshRef}
        scale={entryScale}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={onLeave}
        onClick={(e) => { e.stopPropagation(); onClick(index) }}
      >
        <sphereGeometry args={[baseRadius, 20, 20]} />
        <meshStandardMaterial
          color={isHovered || isActive ? COLORS.accent : COLORS.accentLight}
          emissive={isHovered || isActive ? COLORS.purple : COLORS.accent}
          emissiveIntensity={isHovered || isActive ? 0.5 : 0.15}
          transparent
          opacity={isHovered || isActive ? 1 : 0.85}
        />
      </mesh>

      {/* Node label */}
      <Html
        center
        style={{
          pointerEvents: 'none',
          transform: 'translateY(22px)',
          opacity: isHovered || isActive ? 1 : 0.7,
          transition: 'opacity 0.3s',
        }}
      >
        <span
          style={{
            fontSize: isHovered || isActive ? '11px' : '10px',
            fontWeight: 600,
            color: isHovered || isActive ? COLORS.accent : COLORS.muted,
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, system-ui, sans-serif',
            transition: 'color 0.3s, font-size 0.3s',
          }}
        >
          {label}
        </span>
      </Html>

      {/* Hover card */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <HoverCard
            service={services[index]}
            position={position.clone().normalize().multiplyScalar(0.5)}
          />
        )}
      </AnimatePresence>
    </group>
  )
}

function ConnectionLine({
  start,
  end,
  isActive,
  revealed,
  delay,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  isActive: boolean
  revealed: boolean
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (ref.current) {
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      const direction = new THREE.Vector3().subVectors(end, start)
      const length = direction.length()
      ref.current.position.copy(mid)
      ref.current.lookAt(end)
      ref.current.scale.set(1, 1, length)
    }
  }, [start, end])

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setVisible(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [revealed, delay])

  if (!revealed || !visible) return null

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.006, 0.006, 1]} />
      <meshBasicMaterial
        color={isActive ? COLORS.accent : COLORS.line}
        transparent
        opacity={isActive ? 0.7 : 0.3}
      />
    </mesh>
  )
}

function CenterNode({ revealed }: { revealed: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + 0.04 * Math.sin(clock.getElapsedTime() * 1.2)
      ref.current.scale.setScalar(s)
    }
    if (glowRef.current) {
      const s = 1 + 0.08 * Math.sin(clock.getElapsedTime() * 0.8)
      glowRef.current.scale.setScalar(s)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + 0.05 * Math.sin(clock.getElapsedTime())
    }
  })

  const entryScale = revealed ? 1 : 0

  return (
    <group>
      <mesh ref={glowRef} scale={entryScale}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshBasicMaterial color={COLORS.purple} transparent opacity={0.1} />
      </mesh>
      <mesh ref={ref} scale={entryScale}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial
          color={COLORS.accent}
          emissive={COLORS.accent}
          emissiveIntensity={0.6}
        />
      </mesh>
      <Html center style={{ pointerEvents: 'none', opacity: revealed ? 1 : 0, transition: 'opacity 0.6s 0.4s' }}>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: COLORS.accent,
            letterSpacing: '0.15em',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          BRANDEX
        </span>
      </Html>
    </group>
  )
}

function Particles({ count = 30, revealed }: { count?: number; revealed: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 2.5
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
      ref.current.rotation.y = clock.getElapsedTime() * 0.015
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
      <pointsMaterial size={0.025} color={COLORS.accent} transparent opacity={0.2} />
    </points>
  )
}

function GlobeScene({
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
  const controlsRef = useRef<any>(null)

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={0.4} color={COLORS.accent} />
      <pointLight position={[-3, -2, 4]} intensity={0.3} color={COLORS.purple} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={revealed ? 1.0 : 0}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3.5}
      />

      <CenterNode revealed={revealed} />

      {positions.map((pos, i) => (
        <ConnectionLine
          key={`line-${i}`}
          start={new THREE.Vector3(0, 0, 0)}
          end={pos}
          isActive={activeIndex === i || hoveredIndex === i}
          revealed={revealed}
          delay={0.3 + 0.08 * i}
        />
      ))}

      {services.map((service, i) => (
        <Node
          key={service.title}
          position={positions[i]}
          label={service.title}
          index={i}
          size={service.size}
          activeIndex={activeIndex}
          hoveredIndex={hoveredIndex}
          revealed={revealed}
          onHover={setHoveredIndex}
          onClick={setActiveIndex}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}

      <Particles count={30} revealed={revealed} />
    </>
  )
}

function SidePanel({
  service,
  onClose,
}: {
  service: (typeof services)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      className="fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-border shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs text-accent font-semibold tracking-wider uppercase">Service</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold tracking-tight mb-3">{service.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{service.description}</p>
        </div>

        <div>
          <span className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-3 block">
            Key Deliverables
          </span>
          <div className="space-y-2">
            {service.deliverables.map((d) => (
              <div key={d} className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-sm text-foreground font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileCarousel() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((index: number) => {
    setActive(index)
    scrollRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [])

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, i) => (
          <div
            key={service.title}
            className="snap-center shrink-0 w-[80vw] bg-white rounded-xl border border-border p-6"
          >
            <span className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-2 block">
              0{i + 1}
            </span>
            <h3 className="text-lg font-display font-bold tracking-tight mb-2">{service.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{service.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {service.deliverables.map((d) => (
                <span
                  key={d}
                  className="inline-block px-2 py-1 bg-secondary border border-border rounded-md text-[10px] text-foreground font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-accent' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [mounted, setMounted] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSetActive = useCallback((i: number | null) => {
    setActiveIndex(i)
    setHoveredIndex(null)
  }, [])

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background" id="services">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
          onViewportEnter={() => setRevealed(true)}
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Explore Our Digital Ecosystem.
          </h2>
          <p className="text-muted text-sm mt-2 max-w-lg">
            Discover how Brandex combines strategy, design, development, marketing, and AI to build digital experiences that drive growth.
          </p>
        </motion.div>
      </div>

      {/* Desktop 3D Globe */}
      <div className="hidden md:block relative" style={{ height: '540px' }}>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={revealed ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          {mounted && (
            <Canvas
              camera={{ position: [0, 0, 6.5], fov: 42 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <GlobeScene
                activeIndex={activeIndex}
                setActiveIndex={handleSetActive}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                revealed={revealed}
              />
            </Canvas>
          )}
        </motion.div>

        {/* Click side panel */}
        <AnimatePresence>
          {activeIndex !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/10 z-40"
                onClick={() => setActiveIndex(null)}
              />
              <SidePanel
                service={services[activeIndex]}
                onClose={() => setActiveIndex(null)}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Carousel */}
      <div className="max-w-content mx-auto px-6 md:px-10 md:hidden">
        <MobileCarousel />
      </div>
    </section>
  )
}
