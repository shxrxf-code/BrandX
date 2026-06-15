'use client'

import { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks.',
    benefits: ['Full-stack development', 'Headless CMS', 'API integration', 'Performance optimization'],
  },
  {
    title: 'UI/UX Design',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for conversion.',
    benefits: ['User research', 'Wireframing', 'Visual design', 'Interactive prototypes'],
  },
  {
    title: 'Brand Identity',
    description: 'Strategic brand systems including visual identity, typography, and guidelines that communicate unique value.',
    benefits: ['Brand strategy', 'Visual identity', 'Logo design', 'Brand guidelines'],
  },
  {
    title: 'SEO',
    description: 'Technical SEO audits, content strategy, and performance engineering for sustainable organic growth.',
    benefits: ['Technical audit', 'Keyword strategy', 'Content production', 'Authority building'],
  },
  {
    title: 'Digital Marketing',
    description: 'Paid media, lifecycle programs, and analytics-driven campaigns that turn traffic into revenue.',
    benefits: ['Paid search & social', 'Lifecycle & CRM', 'Analytics & attribution', 'Creative production'],
  },
  {
    title: 'AI Solutions',
    description: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    benefits: ['AI strategy', 'Custom agents', 'LLM integration', 'Process automation'],
  },
]

const RADIUS = 2.8
const COLORS = {
  accent: '#2563EB',
  accentLight: '#60A5FA',
  accentGlow: 'rgba(37, 99, 235, 0.15)',
  line: 'rgba(37, 99, 235, 0.12)',
  lineActive: 'rgba(37, 99, 235, 0.4)',
  text: '#0F172A',
  muted: '#64748B',
  bg: '#FFFFFF',
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

function Node({
  position,
  label,
  index,
  activeIndex,
  hoveredIndex,
  onHover,
  onClick,
  onLeave,
}: {
  position: THREE.Vector3
  label: string
  index: number
  activeIndex: number | null
  hoveredIndex: number | null
  onHover: (i: number) => void
  onClick: (i: number) => void
  onLeave: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const isActive = activeIndex === index
  const isHovered = hoveredIndex === index
  const scale = isHovered || isActive ? 1.5 : 1

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = 0.92 + 0.08 * Math.sin(clock.getElapsedTime() * 1.5 + index)
      const s = scale * pulse
      meshRef.current.scale.setScalar(s)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={onLeave}
        onClick={(e) => { e.stopPropagation(); onClick(index) }}
      >
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={isActive || isHovered ? COLORS.accent : COLORS.accentLight}
          emissive={COLORS.accent}
          emissiveIntensity={isHovered || isActive ? 0.4 : 0.15}
          transparent
          opacity={isHovered || isActive ? 1 : 0.85}
        />
      </mesh>
      <Html
        center
        style={{
          pointerEvents: 'none',
          transform: 'translateY(20px)',
          opacity: isHovered || isActive ? 1 : 0.8,
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
    </group>
  )
}

function ConnectionLine({
  start,
  end,
  isActive,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  isActive: boolean
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

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.008, 0.008, 1]} />
      <meshBasicMaterial
        color={isActive ? COLORS.accent : COLORS.line}
        transparent
        opacity={isActive ? 0.6 : 0.25}
      />
    </mesh>
  )
}

function CenterNode() {
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
      mat.opacity = 0.12 + 0.04 * Math.sin(clock.getElapsedTime())
    }
  })

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color={COLORS.accent} transparent opacity={0.1} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshStandardMaterial
          color={COLORS.accent}
          emissive={COLORS.accent}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Html center style={{ pointerEvents: 'none' }}>
        <span
          style={{
            fontSize: '12px',
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

function Particles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 2
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
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.03} color={COLORS.accent} transparent opacity={0.3} />
    </points>
  )
}

function GlobeScene({
  activeIndex,
  setActiveIndex,
  hoveredIndex,
  setHoveredIndex,
}: {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
}) {
  const positions = useMemo(() => getSpherePositions(services.length, RADIUS), [])
  const controlsRef = useRef<any>(null)

  useFrame(({ clock }) => {
    if (controlsRef.current && !controlsRef.current.enabled) {
      // Auto-rotate when not dragging
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color={COLORS.accent} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />

      <CenterNode />

      {positions.map((pos, i) => (
        <ConnectionLine
          key={`line-${i}`}
          start={new THREE.Vector3(0, 0, 0)}
          end={pos}
          isActive={activeIndex === i || hoveredIndex === i}
        />
      ))}

      {services.map((service, i) => (
        <Node
          key={service.title}
          position={positions[i]}
          label={service.title}
          index={i}
          activeIndex={activeIndex}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
          onClick={setActiveIndex}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}

      <Particles count={40} />
    </>
  )
}

function ServiceInfoPanel({
  service,
  onClose,
}: {
  service: (typeof services)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/95 backdrop-blur-md rounded-xl border border-border shadow-lg p-5 z-10"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-display font-bold text-foreground">{service.title}</h3>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-muted hover:text-foreground transition-colors duration-200"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-4">{service.description}</p>
      <div>
        <p className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-2">Benefits</p>
        <div className="flex flex-wrap gap-1.5">
          {service.benefits.map((b) => (
            <span
              key={b}
              className="inline-block px-2 py-1 bg-secondary border border-border rounded-md text-[10px] text-foreground font-medium"
            >
              {b}
            </span>
          ))}
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
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
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
              {service.benefits.map((b) => (
                <span
                  key={b}
                  className="inline-block px-2 py-1 bg-secondary border border-border rounded-md text-[10px] text-foreground font-medium"
                >
                  {b}
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
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
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Explore our ecosystem.
          </h2>
          <p className="text-muted text-sm mt-2 max-w-md">
            Interact with the network to discover how we deliver value across every service.
          </p>
        </motion.div>
      </div>

      {/* Desktop 3D Globe */}
      <div className="hidden md:block relative" style={{ height: '520px' }}>
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <GlobeScene
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </Canvas>
        )}

        <AnimatePresence>
          {activeIndex !== null && (
            <ServiceInfoPanel
              service={services[activeIndex]}
              onClose={() => setActiveIndex(null)}
            />
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
