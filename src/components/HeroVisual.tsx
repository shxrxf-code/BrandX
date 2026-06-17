'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Service Data ─── */

const SERVICES = [
  { id: 'web', label: 'Web Development', desc: 'High-performance web platforms engineered for scale, speed, and seamless user experiences.', color: '#8B5CF6', baseAngle: 0 },
  { id: 'mobile', label: 'Mobile Apps', desc: 'Native and cross-platform mobile applications that deliver exceptional user engagement.', color: '#D946EF', baseAngle: 45 },
  { id: 'uiux', label: 'UI/UX Design', desc: 'User-centered interfaces crafted through research, prototyping, and usability testing.', color: '#A78BFA', baseAngle: 90 },
  { id: 'branding', label: 'Branding', desc: 'Strategic brand identity systems that communicate your unique value and build recognition.', color: '#7C3AED', baseAngle: 135 },
  { id: 'seo', label: 'SEO', desc: 'Data-driven search optimization strategies that increase visibility and organic growth.', color: '#10B981', baseAngle: 180 },
  { id: 'marketing', label: 'Digital Marketing', desc: 'Multi-channel campaigns engineered for measurable ROI and sustainable brand growth.', color: '#F59E0B', baseAngle: 225 },
  { id: 'ai', label: 'AI Solutions', desc: 'Custom AI integrations and intelligent systems that automate, optimize, and transform.', color: '#E879F9', baseAngle: 270 },
  { id: 'automation', label: 'Automation', desc: 'Streamlined workflows and automated pipelines that eliminate bottlenecks and reduce costs.', color: '#06B6D4', baseAngle: 315 },
]

const CONNECTIONS: [string, string][] = [
  ['web', 'mobile'],
  ['web', 'uiux'],
  ['mobile', 'uiux'],
  ['uiux', 'branding'],
  ['branding', 'marketing'],
  ['marketing', 'seo'],
  ['web', 'seo'],
  ['ai', 'automation'],
  ['ai', 'web'],
  ['ai', 'mobile'],
  ['automation', 'marketing'],
  ['seo', 'marketing'],
  ['branding', 'uiux'],
  ['automation', 'ai'],
]

/* ─── Icons ─── */

function ServiceIcon({ id }: { id: string }) {
  const cls = 'w-full h-full'
  switch (id) {
    case 'web':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
    case 'mobile':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
    case 'uiux':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
    case 'branding':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
    case 'seo':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>
    case 'marketing':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.857.857 0 01-1.125-.308 20.89 20.89 0 01-1.594-3.318m9.18-9.18c.253-.962.584-1.892.985-2.783.247-.55.06-1.21-.463-1.511l-.657-.38a.857.857 0 00-1.125.308 20.89 20.89 0 00-1.594 3.318M7.5 12h0" /></svg>
    case 'ai':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
    case 'automation':
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    default:
      return null
  }
}

/* ─── Orbital Ecosystem (Desktop) ─── */

const ORBIT_RX = 30
const ORBIT_RY = 22
const CX = 50
const CY = 50

function DesktopEcosystem() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [angles, setAngles] = useState(() => SERVICES.map((s) => (s.baseAngle * Math.PI) / 180))
  const [pulseIdx, setPulseIdx] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const anglesRef = useRef(angles)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const speed = 0.0008
    const loop = () => {
      anglesRef.current = anglesRef.current.map((a) => a + speed)
      setAngles([...anglesRef.current])
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => setPulseIdx((p) => (p + 1) % CONNECTIONS.length), 1500)
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

  const px = mousePos.x * 3
  const py = mousePos.y * 3

  const nodePositions = useMemo(() => {
    const rotationOffset = reducedMotion ? 0 : -0.15
    return SERVICES.map((svc, i) => {
      const angle = angles[i] + rotationOffset
      const x = CX + ORBIT_RX * Math.cos(angle)
      const y = CY + ORBIT_RY * Math.sin(angle)
      const depthFactor = (y - (CY - ORBIT_RY)) / (2 * ORBIT_RY)
      const scale = 0.82 + depthFactor * 0.18
      const blur = (1 - depthFactor) * 0.5
      return { ...svc, x, y, scale, blur }
    })
  }, [angles, reducedMotion])

  const connectionEndpoints = useMemo(() => {
    const nodeMap = new Map(nodePositions.map((n) => [n.id, { x: n.x, y: n.y }]))
    return CONNECTIONS.map(([from, to]) => ({
      from: nodeMap.get(from) ?? { x: CX, y: CY },
      to: nodeMap.get(to) ?? { x: CX, y: CY },
      fromId: from,
      toId: to,
    }))
  }, [nodePositions])

  const activeConnections = hoveredId
    ? CONNECTIONS.filter(([a, b]) => a === hoveredId || b === hoveredId).flat()
    : []

  const currentPulse = CONNECTIONS[pulseIdx]
  const pulseFrom = nodePositions.find((n) => n.id === currentPulse?.[0])
  const pulseTo = nodePositions.find((n) => n.id === currentPulse?.[1])

  const getScaleClass = (scale: number) => {
    if (scale > 0.96) return 'z-30'
    if (scale > 0.9) return 'z-20'
    return 'z-10'
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="relative w-full select-none">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full aspect-square max-h-[420px] md:max-h-[480px] mx-auto"
        style={{
          transform: `translate(${px * 0.5}px, ${py * 0.5}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
          {connectionEndpoints.map((conn) => {
            const isHighlighted =
              hoveredId && (conn.fromId === hoveredId || conn.toId === hoveredId)
            return (
              <line
                key={`conn-${conn.fromId}-${conn.toId}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke={isHighlighted ? '#8B5CF6' : 'rgba(255,255,255,0.06)'}
                strokeWidth={isHighlighted ? '0.4' : '0.15'}
                strokeOpacity={isHighlighted ? 0.5 : 1}
                className="transition-all duration-500"
              />
            )
          })}

          {/* Data pulse */}
          {pulseFrom && pulseTo && !reducedMotion && (
            <motion.circle
              key={`pulse-${pulseIdx}`}
              r="1.2"
              fill={SERVICES.find((s) => s.id === currentPulse?.[0])?.color ?? '#8B5CF6'}
              initial={{ cx: pulseFrom.x, cy: pulseFrom.y, opacity: 0 }}
              animate={{
                cx: [pulseFrom.x, (pulseFrom.x + pulseTo.x) / 2, pulseTo.x],
                cy: [pulseFrom.y, (pulseFrom.y + pulseTo.y) / 2, pulseTo.y],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.3],
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="z-20"
              style={{ filter: 'blur(0.5px)' }}
            />
          )}
        </svg>

        {/* Brandex Core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <motion.div
            animate={reducedMotion ? {} : {
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.05)',
                '0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(217,70,239,0.1)',
                '0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.05)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-accent to-magenta flex items-center justify-center shadow-xl"
          >
            <span className="text-xs md:text-sm font-display font-bold text-white">Bx</span>
          </motion.div>
          <motion.div
            animate={reducedMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -inset-4 rounded-full bg-accent/10 blur-xl -z-10"
          />
        </div>

        {/* Service modules */}
        {nodePositions.map((node) => {
          const isHovered = hoveredId === node.id
          const isRelated = hoveredId && activeConnections.includes(node.id) && node.id !== hoveredId
          const isDimmed = hoveredId && !isHovered && !isRelated

          return (
            <motion.button
              key={node.id}
              onHoverStart={() => setHoveredId(node.id)}
              onHoverEnd={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setActiveId(activeId === node.id ? null : node.id)}
              className={cn(
                'absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 focus:outline-none',
                getScaleClass(node.scale)
              )}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              whileHover={{ scale: node.scale * 1.1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <motion.div
                animate={{
                  opacity: isDimmed ? 0.3 : 1,
                  scale: isDimmed ? 0.9 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'rounded-xl backdrop-blur-xl border transition-all duration-300 flex flex-col items-center',
                  isHovered
                    ? 'border-accent/40 bg-accent/[0.06] shadow-lg shadow-accent/10'
                    : isRelated
                      ? 'border-white/20 bg-white/[0.04]'
                      : 'border-white/[0.08] bg-white/[0.03]'
                )}
                style={{
                  padding: `${0.5 + node.scale * 0.15}rem`,
                  filter: `blur(${node.blur}px)`,
                  willChange: 'transform',
                }}
              >
                <div
                  className={cn(
                    'rounded-lg flex items-center justify-center transition-colors duration-300',
                    isHovered ? 'text-accent' : 'text-muted/60'
                  )}
                  style={{
                    width: `${1 + node.scale * 0.4}rem`,
                    height: `${1 + node.scale * 0.4}rem`,
                  }}
                >
                  <ServiceIcon id={node.id} />
                </div>
                <span
                  className="text-[7px] md:text-[8px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: isHovered
                      ? node.color
                      : isRelated
                        ? 'rgba(255,255,255,0.55)'
                        : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {node.label}
                </span>
              </motion.div>

              {/* Active indicator dot */}
              {(isHovered || isRelated) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-1 h-1 rounded-full"
                  style={{ background: node.color }}
                />
              )}
            </motion.button>
          )
        })}

        {/* Orbital ring guide */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
          <ellipse
            cx={CX}
            cy={CY}
            rx={ORBIT_RX}
            ry={ORBIT_RY}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="0.3"
            strokeDasharray="1 4"
          />
        </svg>
      </motion.div>

      {/* Description card */}
      <AnimatePresence>
        {hoveredId && (() => {
          const svc = SERVICES.find((s) => s.id === hoveredId)
          if (!svc) return null
          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] max-w-[260px] rounded-xl border border-white/10 p-3 pointer-events-none z-50"
              style={{
                background: 'rgba(11,11,15,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: svc.color }} />
                <span className="text-xs font-display font-bold text-foreground">{svc.label}</span>
              </div>
              <p className="text-[10px] text-muted/60 leading-relaxed">{svc.desc}</p>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}

/* ─── Mobile Cards ─── */

function MobileCards() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (id: string) => setExpanded(expanded === id ? null : id)

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {SERVICES.map((svc) => {
        const isOpen = expanded === svc.id
        return (
          <motion.button
            key={svc.id}
            onClick={() => toggle(svc.id)}
            className="w-full text-left rounded-xl border backdrop-blur-xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200"
            style={{
              background: `${svc.color}08`,
              borderColor: isOpen ? `${svc.color}40` : 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${svc.color}15`, color: svc.color }}
              >
                <span className="w-4 h-4"><ServiceIcon id={svc.id} /></span>
              </div>
              <span className="text-sm font-display font-semibold text-foreground">{svc.label}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="ml-auto text-muted/30 text-xs"
              >
                ▾
              </motion.span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-muted/60 leading-relaxed overflow-hidden"
                >
                  {svc.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}

/* ─── Root Export ─── */

export default function HeroVisual() {
  return (
    <>
      <div className="hidden lg:flex items-center justify-center h-full">
        <DesktopEcosystem />
      </div>
      <div className="block lg:hidden">
        <MobileCards />
      </div>
    </>
  )
}
