'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

const ORBIT_RX = 28
const ORBIT_RY = 20
const CX = 50
const CY = 50
const PULSE_COUNT = 6

const NODES = [
  { id: 'brand', label: 'Brand', desc: 'Strategic brand identity that defines how the world perceives your business.', color: '#8B5CF6', gradient: 'from-accent/20 to-purple-500/20' },
  { id: 'design', label: 'Design', desc: 'User-centered interfaces crafted for engagement and conversion.', color: '#D946EF', gradient: 'from-magenta/20 to-pink-500/20' },
  { id: 'development', label: 'Development', desc: 'High-performance platforms engineered for scale and reliability.', color: '#A78BFA', gradient: 'from-purple-500/20 to-violet-500/20' },
  { id: 'ai', label: 'AI', desc: 'Intelligent automation and data systems that unlock new capabilities.', color: '#7C3AED', gradient: 'from-violet-500/20 to-indigo-500/20' },
  { id: 'marketing', label: 'Marketing', desc: 'Multi-channel strategies that drive measurable growth and ROI.', color: '#E879F9', gradient: 'from-pink-500/20 to-rose-500/20' },
  { id: 'growth', label: 'Growth', desc: 'Continuous optimization and experimentation for scalable business outcomes.', color: '#10B981', gradient: 'from-emerald-500/20 to-teal-500/20' },
]

const MOBILE_NODES = [
  { id: 'brand', label: 'Brand', desc: 'Strategic brand identity that defines how the world perceives your business.', color: '#8B5CF6', icon: '◆' },
  { id: 'design', label: 'Design', desc: 'User-centered interfaces crafted for engagement and conversion.', color: '#D946EF', icon: '✦' },
  { id: 'development', label: 'Development', desc: 'High-performance platforms engineered for scale and reliability.', color: '#A78BFA', icon: '◈' },
  { id: 'ai', label: 'AI', desc: 'Intelligent automation and data systems that unlock new capabilities.', color: '#7C3AED', icon: '◇' },
  { id: 'marketing', label: 'Marketing', desc: 'Multi-channel strategies that drive measurable growth and ROI.', color: '#E879F9', icon: '○' },
  { id: 'growth', label: 'Growth', desc: 'Continuous optimization and experimentation for scalable business outcomes.', color: '#10B981', icon: '⬟' },
]

function NodeIcon({ id }: { id: string }) {
  const cls = 'w-5 h-5'
  switch (id) {
    case 'brand':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
    case 'design':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
    case 'development':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
    case 'ai':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
    case 'marketing':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.857.857 0 01-1.125-.308 20.89 20.89 0 01-1.594-3.318m9.18-9.18c.253-.962.584-1.892.985-2.783.247-.55.06-1.21-.463-1.511l-.657-.38a.857.857 0 00-1.125.308 20.89 20.89 0 00-1.594 3.318M7.5 12h0" /></svg>
    case 'growth':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    default:
      return null
  }
}

function Particles() {
  const dots = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    opacity: 0.15 + Math.random() * 0.25,
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [d.opacity, d.opacity * 1.5, d.opacity],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function DesktopEcosystem() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [angles, setAngles] = useState(() => NODES.map((_, i) => (i * 60 * Math.PI) / 180))
  const [pulses, setPulses] = useState<number[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const anglesRef = useRef(angles)
  const animRef = useRef<number>(0)
  const pulseIdxRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const speed = 0.0015
    const loop = () => {
      anglesRef.current = anglesRef.current.map((a) => a + speed)
      setAngles([...anglesRef.current])
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      pulseIdxRef.current = (pulseIdxRef.current + 1) % PULSE_COUNT
      setPulses((prev) => [...prev.slice(-PULSE_COUNT + 1), pulseIdxRef.current])
    }, 1200)
    return () => clearInterval(interval)
  }, [reducedMotion])

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }, [])

  const handleLeave = useCallback(() => setMousePos({ x: 0, y: 0 }), [])

  const px = mousePos.x * 4
  const py = mousePos.y * 4

  const nodePositions = useMemo(() => {
    const rotation = reducedMotion ? 0 : Date.now() * 0.00008
    return NODES.map((node, i) => {
      const angle = angles[i] + rotation
      return {
        ...node,
        x: CX + ORBIT_RX * Math.cos(angle),
        y: CY + ORBIT_RY * Math.sin(angle),
      }
    })
  }, [angles, reducedMotion])

  const activeNode = NODES.find((n) => n.id === activeId)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="relative w-full aspect-[4/3]"
    >
      <Particles />

      <svg
        viewBox="0 0 100 100"
        className={cn(
          'absolute inset-0 w-full h-full',
          reducedMotion ? '' : 'transition-transform duration-100 ease-out'
        )}
        style={{ transform: `translate(${px}px, ${py}px)` }}
      >
        <defs>
          {NODES.map((node) => (
            <radialGradient key={node.id} id={`glow-${node.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={node.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodePositions.map((node) => (
          <line
            key={`center-${node.id}`}
            x1={CX}
            y1={CY}
            x2={node.x}
            y2={node.y}
            stroke={node.color}
            strokeWidth="0.15"
            strokeOpacity="0.2"
            strokeDasharray="1 3"
            className={reducedMotion ? '' : 'animate-dash-flow'}
            style={{ animationDuration: '3s', animationDelay: `${NODES.indexOf(node) * 0.3}s` }}
          />
        ))}

        {nodePositions.map((node, i) => {
          const next = nodePositions[(i + 1) % nodePositions.length]
          return (
            <line
              key={`ring-${node.id}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke={node.color}
              strokeWidth="0.1"
              strokeOpacity="0.12"
            />
          )
        })}

        {nodePositions.map((node) => (
          <circle
            key={`glow-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="8"
            fill={`url(#glow-${node.id})`}
            className={cn(
              'transition-all duration-500',
              activeId === node.id ? 'r-[12]' : ''
            )}
          />
        ))}

        <ellipse cx={CX} cy={CY} rx="14" ry="12" fill="url(#center-glow)" />

        {pulses.map((pulseIdx, pi) => {
          const targetIdx = pulseIdx % NODES.length
          const startX = CX
          const startY = CY
          const endX = nodePositions[targetIdx].x
          const endY = nodePositions[targetIdx].y
          return (
            <motion.circle
              key={`pulse-${pi}-${pulseIdx}`}
              r="0.4"
              fill={NODES[targetIdx].color}
              filter="url(#glow-filter)"
              initial={{ cx: startX, cy: startY, opacity: 1 }}
              animate={{
                cx: endX,
                cy: endY,
                opacity: [1, 1, 0],
                scale: [1, 1.5, 0.5],
              }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          )
        })}
      </svg>

      <div
        className="absolute inset-0"
        style={{ transform: `translate(${px}px, ${py}px)` }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${CX}%`, top: `${CY}%` }}
        >
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 0 20px rgba(139,92,246,0.2), 0 0 40px rgba(139,92,246,0.1)',
                      '0 0 30px rgba(139,92,246,0.35), 0 0 60px rgba(217,70,239,0.15)',
                      '0 0 20px rgba(139,92,246,0.2), 0 0 40px rgba(139,92,246,0.1)',
                    ],
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-accent to-magenta flex items-center justify-center shadow-lg"
          >
            <span className="text-sm md:text-base font-display font-bold text-white">Bx</span>
          </motion.div>
        </div>

        {nodePositions.map((node) => (
          <motion.button
            key={node.id}
            onHoverStart={() => setActiveId(node.id)}
            onHoverEnd={() => setActiveId(null)}
            onFocus={() => setActiveId(node.id)}
            onBlur={() => setActiveId(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 focus:outline-none"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ scale: 1.15 }}
            whileFocus={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={activeId === node.id && !reducedMotion ? {
                boxShadow: [`0 0 0px ${node.color}00`, `0 0 16px ${node.color}40`, `0 0 0px ${node.color}00`],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center backdrop-blur-xl border transition-all duration-200"
              style={{
                background: `${node.color}15`,
                borderColor: `${node.color}40`,
                color: node.color,
              }}
            >
              <NodeIcon id={node.id} />
            </motion.div>
            <span
              className="text-[9px] md:text-[10px] font-medium tracking-wide"
              style={{ color: node.color }}
            >
              {node.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] max-w-[240px] rounded-xl border border-white/10 p-3 pointer-events-none"
            style={{
              background: 'rgba(11,11,15,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: activeNode.color }} />
              <span className="text-xs font-display font-bold text-foreground">{activeNode.label}</span>
            </div>
            <p className="text-[10px] text-muted/70 leading-relaxed">{activeNode.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -8; }
        }
        .animate-dash-flow {
          animation: dash-flow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

function MobileNodes() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setExpanded(expanded === id ? null : id)
    }
  }

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {MOBILE_NODES.map((node) => {
        const isOpen = expanded === node.id
        return (
          <motion.button
            key={node.id}
            onClick={() => setExpanded(isOpen ? null : node.id)}
            onKeyDown={(e) => handleKeyDown(e, node.id)}
            className="w-full text-left rounded-xl border backdrop-blur-xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200"
            style={{
              background: `${node.color}0A`,
              borderColor: isOpen ? `${node.color}50` : 'rgba(255,255,255,0.08)',
            }}
            animate={isOpen ? { borderColor: `${node.color}50` } : { borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: `${node.color}15`,
                  color: node.color,
                }}
              >
                {node.icon}
              </span>
              <span className="text-sm font-display font-semibold text-foreground">{node.label}</span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-muted/70 leading-relaxed overflow-hidden"
                >
                  {node.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}

export default function HeroVisual() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopEcosystem />
      </div>
      <div className="block lg:hidden">
        <MobileNodes />
      </div>
    </>
  )
}
