'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobeCanvas, MobileGlobeCanvas, services } from './ecosystem/GlobeScene'
import { ServiceModal } from './ecosystem/ServiceModal'
import { BottomSheet } from './ecosystem/BottomSheet'

function SvgFallback() {
  const cx = 300
  const cy = 275
  const r = 170

  const nodeAngles = [0, 1, 2, 3, 4, 5].map((i) => {
    const theta = 2 * Math.PI * i / ((1 + Math.sqrt(5)) / 2)
    const phi = Math.acos(1 - 2 * (i + 0.5) / 6)
    const x = cx + r * Math.sin(phi) * Math.cos(theta)
    const y = cy + r * Math.cos(phi)
    return { x, y, label: services[i].title }
  })

  const connections: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 2], [1, 3], [2, 4], [3, 5]]

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 600 550" className="w-full max-w-lg h-auto">
        <defs>
          <radialGradient id="glow-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx={r * 1.1} ry={r * 1.1} fill="url(#glow-bg)" />
        {Array.from({ length: 10 }, (_, i) => {
          const rr = r * (i + 1) / 10
          return (
            <ellipse
              key={`lat-${i}`}
              cx={cx}
              cy={cy}
              rx={rr}
              ry={rr * 0.45}
              fill="none"
              stroke="#2563EB"
              strokeWidth="0.5"
              opacity={0.25}
            />
          )
        })}
        {Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * Math.PI * 2
          return (
            <line
              key={`lon-${i}`}
              x1={cx + r * Math.cos(angle) * 0.45}
              y1={cy - r * Math.sin(angle)}
              x2={cx + r * Math.cos(angle) * 0.45}
              y2={cy + r * Math.sin(angle)}
              stroke="#2563EB"
              strokeWidth="0.5"
              opacity={0.25}
              transform={`rotate(${(angle * 180) / Math.PI}, ${cx}, ${cy})`}
            />
          )
        })}
        {connections.map(([i, j], idx) => (
          <line
            key={`conn-${idx}`}
            x1={nodeAngles[i].x}
            y1={nodeAngles[i].y}
            x2={nodeAngles[j].x}
            y2={nodeAngles[j].y}
            stroke="#2563EB"
            strokeWidth="0.4"
            opacity={0.15}
          />
        ))}
        {nodeAngles.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="5" fill="#2563EB" opacity={0.5} />
            <circle cx={n.x} cy={n.y} r="2.5" fill="#2563EB" />
            <text
              x={n.x}
              y={n.y + 18}
              textAnchor="middle"
              fill="#64748B"
              fontSize="9"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight={600}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function ServicesSection() {
  const [mounted, setMounted] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [globeError, setGlobeError] = useState(false)

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
          className="mb-8 md:mb-10"
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

      {/* Desktop Globe */}
      <div
        className="hidden md:block relative"
        style={{
          height: '600px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 60%)',
        }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={revealed ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          {mounted && !globeError && (
            <GlobeCanvas
              activeIndex={activeIndex}
              setActiveIndex={handleSetActive}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              revealed={revealed}
            />
          )}
          {mounted && globeError && <SvgFallback />}
        </motion.div>
      </div>

      {/* Mobile Compact Globe */}
      <div
        className="md:hidden relative"
        style={{
          height: '320px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 55%)',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={revealed ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          {mounted && !globeError && (
            <MobileGlobeCanvas
              activeIndex={activeIndex}
              setActiveIndex={handleSetActive}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              revealed={revealed}
            />
          )}
        </motion.div>
      </div>

      {/* Desktop Modal */}
      <div className="hidden md:block">
        <AnimatePresence>
          {activeIndex !== null && (
            <ServiceModal
              service={services[activeIndex]}
              onClose={() => setActiveIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden">
        <AnimatePresence>
          {activeIndex !== null && (
            <BottomSheet
              service={services[activeIndex]}
              onClose={() => setActiveIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
