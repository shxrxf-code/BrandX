'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Blueprint Grid ─── */
function BlueprintGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.15]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
      }}
    />
  )
}

/* ─── Process Layer Badge ─── */
const LAYERS = [
  { id: 'strategy', label: 'Strategy', color: '#8B5CF6', x: 10, y: 12 },
  { id: 'design', label: 'Design', color: '#D946EF', x: 35, y: 8 },
  { id: 'engineering', label: 'Engineering', color: '#A78BFA', x: 62, y: 14 },
  { id: 'ai', label: 'AI', color: '#10B981', x: 85, y: 10 },
]

function ProcessLayers() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % LAYERS.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative flex items-center justify-between px-4 pt-4 pb-6">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ padding: '8px 16px' }}>
        {LAYERS.map((layer, i) => {
          if (i === LAYERS.length - 1) return null
          const next = LAYERS[i + 1]
          return (
            <motion.line
              key={`conn-${layer.id}`}
              x1={`${layer.x}%`}
              y1="32"
              x2={`${next.x}%`}
              y2="32"
              stroke={activeIdx === i || activeIdx === i + 1 ? '#8B5CF6' : 'rgba(255,255,255,0.08)'}
              strokeWidth="1"
              strokeDasharray="3 3"
              animate={{ strokeOpacity: activeIdx >= i ? 0.6 : 0.15 }}
              transition={{ duration: 0.4 }}
            />
          )
        })}
        {LAYERS.map((layer, i) => (
          <motion.circle
            key={`dot-${layer.id}`}
            cx={`${layer.x}%`}
            cy="32"
            r="2.5"
            fill={activeIdx === i ? layer.color : 'rgba(255,255,255,0.15)'}
            animate={{
              r: activeIdx === i ? 3.5 : 2.5,
              fill: activeIdx === i ? layer.color : 'rgba(255,255,255,0.15)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </svg>
      {LAYERS.map((layer, i) => {
        const isActive = activeIdx === i
        return (
          <motion.div
            key={layer.id}
            animate={{
              y: isActive ? -2 : 0,
              opacity: isActive ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-1.5 z-10"
          >
            <motion.span
              className={cn(
                'text-[8px] md:text-[9px] font-semibold tracking-wider uppercase transition-colors duration-300',
              )}
              style={{ color: isActive ? layer.color : 'rgba(255,255,255,0.3)' }}
            >
              {layer.label}
            </motion.span>
            {isActive && (
              <motion.span
                layoutId="layer-indicator"
                className="w-4 h-px rounded-full"
                style={{ background: layer.color }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Wireframe → UI Animation ─── */
function WireframeUI() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 2500)
    return () => clearInterval(t)
  }, [])

  const wireframes = [
    { x: 8, y: 10, w: 20, h: 28, label: 'Home' },
    { x: 32, y: 16, w: 18, h: 22, label: 'About' },
    { x: 8, y: 42, w: 22, h: 18, label: 'Services' },
  ]

  return (
    <div className="relative w-full h-full min-h-[160px] md:min-h-[200px]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Wireframes */}
        {wireframes.map((wf, i) => {
          const isVisible = phase >= 1 || i < phase * 2
          const shouldFade = phase >= 2 && i === 1
          return (
            <motion.g
              key={`wf-${wf.label}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isVisible ? (shouldFade ? 0.3 : 1) : 0,
                x: shouldFade ? 5 : 0,
              }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <rect
                x={wf.x}
                y={wf.y}
                width={wf.w}
                height={wf.h}
                rx="2"
                fill="none"
                stroke={phase >= 2 ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.15)'}
                strokeWidth="0.5"
              />
              {[20, 40, 60, 80].map((pct, li) => (
                <line
                  key={li}
                  x1={wf.x + 3}
                  y1={wf.y + 5 + pct * 0.15}
                  x2={wf.x + wf.w - 3}
                  y2={wf.y + 5 + pct * 0.15}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.3"
                />
              ))}
              <text x={wf.x + wf.w / 2} y={wf.y + wf.h - 3} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="2.5" fontFamily="var(--font-space-grotesk)">
                {wf.label}
              </text>
            </motion.g>
          )
        })}

        {/* Blueprint dimension lines */}
        {phase >= 1 && (
          <>
            <line x1="5" y1="5" x2="5" y2="72" stroke="rgba(139,92,246,0.12)" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="2" y1="72" x2="55" y2="72" stroke="rgba(139,92,246,0.12)" strokeWidth="0.3" strokeDasharray="1 1" />
            <text x="3" y="40" textAnchor="middle" fill="rgba(139,92,246,0.2)" fontSize="1.8" transform="rotate(-90, 3, 40)">640px</text>
            <text x="28" y="75" textAnchor="middle" fill="rgba(139,92,246,0.2)" fontSize="1.8">100%</text>
          </>
        )}

        {/* Flow arrow from wireframes to UI */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <line x1="55" y1="35" x2="68" y2="35" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
            <polygon points="68,33 72,35 68,37" fill="rgba(139,92,246,0.3)" />
            <text x="61" y="31" textAnchor="middle" fill="rgba(139,92,246,0.25)" fontSize="2">build</text>
          </motion.g>
        )}

        {/* Assembled UI Screen */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <rect x="68" y="8" width="28" height="52" rx="3" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />

            {/* Nav bar */}
            <rect x="70" y="10" width="24" height="5" rx="1" fill="rgba(139,92,246,0.08)" />
            <rect x="70" y="11" width="6" height="3" rx="0.5" fill="rgba(139,92,246,0.2)" />
            <circle cx="91" cy="12.5" r="1" fill="rgba(217,70,239,0.3)" />
            <circle cx="88" cy="12.5" r="1" fill="rgba(139,92,246,0.3)" />

            {/* Hero section */}
            <rect x="71" y="17" width="22" height="14" rx="1" fill="rgba(139,92,246,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
            <rect x="73" y="19" width="10" height="2" rx="0.5" fill="rgba(139,92,246,0.15)" />
            <rect x="73" y="22" width="14" height="1.5" rx="0.5" fill="rgba(255,255,255,0.06)" />
            <rect x="73" y="24.5" width="12" height="1.5" rx="0.5" fill="rgba(255,255,255,0.06)" />
            <rect x="73" y="27.5" width="8" height="2" rx="0.5" fill="rgba(217,70,239,0.15)" />

            {/* Cards */}
            {[0, 1, 2].map((ci) => (
              <motion.rect
                key={`card-${ci}`}
                x={71 + ci * 7.5}
                y={33}
                width="6.5"
                height="9"
                rx="1"
                fill="rgba(255,255,255,0.02)"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + ci * 0.1, duration: 0.3 }}
              />
            ))}

            {/* Footer */}
            <rect x="71" y="44" width="22" height="3" rx="0.5" fill="rgba(255,255,255,0.02)" />
            <circle cx="76" cy="45.5" r="0.8" fill="rgba(255,255,255,0.08)" />
            <circle cx="82" cy="45.5" r="0.8" fill="rgba(255,255,255,0.08)" />
            <circle cx="88" cy="45.5" r="0.8" fill="rgba(217,70,239,0.2)" />
          </motion.g>
        )}

        {/* Annotation callout */}
        {phase >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <line x1="82" y1="8" x2="82" y2="3" stroke="rgba(139,92,246,0.15)" strokeWidth="0.3" />
            <line x1="75" y1="3" x2="88" y2="3" stroke="rgba(139,92,246,0.15)" strokeWidth="0.3" />
            <rect x="78" y="1" width="8" height="3" rx="0.5" fill="rgba(139,92,246,0.1)" />
            <text x="82" y="3.2" textAnchor="middle" fill="rgba(139,92,246,0.35)" fontSize="2">UI Screen</text>
          </motion.g>
        )}
      </svg>
    </div>
  )
}

/* ─── Design Tokens ─── */
function DesignTokens() {
  const colors = ['#8B5CF6', '#D946EF', '#A78BFA', '#10B981', '#F59E0B']
  const spacings = [4, 8, 12, 16, 24]
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 md:p-3.5">
      <span className="text-[8px] md:text-[9px] font-semibold text-muted/40 tracking-wider uppercase mb-2.5 block">
        Design Tokens
      </span>

      {/* Colors */}
      <div className="flex items-center gap-1.5 mb-2.5">
        {colors.map((c) => (
          <motion.div
            key={c}
            className="w-4 h-4 md:w-5 md:h-5 rounded-md border border-white/10"
            style={{ background: c }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: colors.indexOf(c) * 0.05 }}
          />
        ))}
      </div>

      {/* Typography */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-base md:text-lg font-display font-bold text-foreground/50">Aa</span>
        <div className="flex flex-col">
          <span className="text-[7px] md:text-[8px] text-muted/30 font-mono">Space Grotesk</span>
          <span className="text-[7px] md:text-[8px] text-muted/30 font-mono">Inter · System UI</span>
        </div>
      </div>

      {/* Spacing */}
      <div className="flex items-center gap-1.5">
        {spacings.map((s) => (
          <motion.div
            key={s}
            className="h-2 rounded-sm bg-white/10"
            style={{ width: `${s * 0.35 + 0.5}rem` }}
            initial={{ width: 0 }}
            animate={{ width: `${s * 0.35 + 0.5}rem` }}
            transition={{ duration: 0.3, delay: spacings.indexOf(s) * 0.05 }}
          />
        ))}
      </div>
      <span className="text-[7px] md:text-[8px] text-muted/20 mt-1 block">4 · 8 · 12 · 16 · 24</span>
    </div>
  )
}

/* ─── Code → Interface Morph ─── */
const CODE_LINES = [
  'const Page = () => {',
  '  return (',
  '    <Layout>',
  '      <Hero />',
  '      <Features />',
  '      <CTA />',
  '    </Layout>',
  '  )',
  '}',
]

function CodeBlock() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setVisibleLines((p) => (p + 1) % (CODE_LINES.length + 3)), 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 md:p-3.5">
      <span className="text-[8px] md:text-[9px] font-semibold text-muted/40 tracking-wider uppercase mb-2 block">
        Component Architecture
      </span>
      <div className="font-mono text-[8px] md:text-[9px] leading-relaxed">
        {CODE_LINES.slice(0, Math.min(visibleLines + 1, CODE_LINES.length)).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted/50"
            style={{ paddingLeft: `${line.search(/\S/) * 0.4}rem` }}
          >
            <span className="text-muted/20 mr-1.5 select-none">{String(i + 1).padStart(2, '0')}</span>
            {i === 0 && <span className="text-purple-400/50">const </span>}
            {i === 0 && <span className="text-accent/60">Page</span>}
            {i === 0 && <span className="text-purple-400/50"> = </span>}
            {i === 0 && <span className="text-muted/50">() {'=>'} {'{'}</span>}
            {(i === 0) || <span className="text-muted/40">{line}</span>}
          </motion.div>
        ))}
        {visibleLines >= CODE_LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-white/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
            <span className="text-[7px] text-emerald-400/40 font-medium">Compiled · 4.2kB gzip</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ─── Component Tree ─── */
const TREE_NODES = [
  { label: 'App', x: 50, y: 8, children: [
    { label: 'Layout', x: 50, y: 24, children: [
      { label: 'Header', x: 25, y: 40 },
      { label: 'Page', x: 50, y: 40, active: true },
      { label: 'Footer', x: 75, y: 40 },
    ]},
  ]},
]

function ComponentTree() {
  const [activePath, setActivePath] = useState('')

  useEffect(() => {
    const t = setInterval(() => {
      const paths = ['', 'Layout', 'Page', 'Header', 'Footer']
      setActivePath(paths[Math.floor(Math.random() * paths.length)])
    }, 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <svg viewBox="0 0 100 48" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1="50" y1="12" x2="50" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      <line x1="50" y1="28" x2="25" y2="36" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      <line x1="50" y1="28" x2="50" y2="36" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      <line x1="50" y1="28" x2="75" y2="36" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />

      {[
        { label: 'App', x: 50, y: 8, depth: 0, key: '' },
        { label: 'Layout', x: 50, y: 22, depth: 1, key: 'Layout' },
        { label: 'Header', x: 25, y: 36, depth: 2, key: 'Header' },
        { label: 'Page', x: 50, y: 36, depth: 2, key: 'Page', accent: true },
        { label: 'Footer', x: 75, y: 36, depth: 2, key: 'Footer' },
      ].map((node) => {
        const isMatching = activePath === node.key || (activePath === '' && node.key === '')
        const isActivePath = activePath === 'Page'
        return (
          <motion.g
            key={node.label}
            animate={{ opacity: isMatching || !activePath ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
          >
            <rect
              x={node.x - (8 - node.depth * 1.5)}
              y={node.y - 3}
              width={16 - node.depth * 3}
              height={6}
              rx="1.5"
              fill={node.accent && isActivePath ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.02)'}
              stroke={node.accent && isActivePath ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)'}
              strokeWidth="0.4"
            />
            <text
              x={node.x}
              y={node.y + 1.2}
              textAnchor="middle"
              fill={node.accent && isActivePath ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.25)'}
              fontSize={`${3.5 - node.depth * 0.3}`}
              fontFamily="var(--font-space-grotesk)"
              fontWeight="600"
            >
              {node.label}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}

/* ─── Cursor ─── */
function Cursor() {
  const [pos, setPos] = useState({ x: 20, y: 30 })

  useEffect(() => {
    const points = [
      { x: 20, y: 30 }, { x: 35, y: 25 }, { x: 50, y: 40 }, { x: 65, y: 20 },
      { x: 75, y: 45 }, { x: 40, y: 50 }, { x: 25, y: 35 }, { x: 55, y: 15 },
    ]
    let idx = 0
    const t = setInterval(() => {
      idx = (idx + 1) % points.length
      setPos(points[idx])
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" className="opacity-30">
        <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
        <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
        <circle cx="7" cy="7" r="2" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
      </svg>
    </motion.div>
  )
}

/* ───── Desktop Blueprint ───── */
function DesktopBlueprint() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }, [])

  const handleLeave = useCallback(() => setMousePos({ x: 0, y: 0 }), [])

  const px = mousePos.x * 2.5
  const py = mousePos.y * 2.5

  return (
    <div ref={containerRef} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-2xl border border-white/10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          transform: `translate(${px}px, ${py}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <BlueprintGrid />

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.015] via-transparent to-magenta/[0.015] pointer-events-none" />

        <div className="relative">
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-muted/40 tracking-wider uppercase ml-1">
                Digital Product Blueprint
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[8px] md:text-[9px] text-muted/30 font-mono"
              >
                ● workspace v2.4
              </motion.span>
            </div>
          </div>

          {/* ── Process Layers ── */}
          <div className="px-4 pt-3">
            <ProcessLayers />
          </div>

          {/* ── Main Content Grid ── */}
          <div className="px-4 md:px-5 pb-4 md:pb-5">
            <div className="grid grid-cols-5 gap-3 md:gap-4">
              {/* Left: Wireframe → UI */}
              <div className="col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 md:p-3.5">
                <span className="text-[8px] md:text-[9px] font-semibold text-muted/40 tracking-wider uppercase mb-2.5 block">
                  Wireframes → Interface
                </span>
                <WireframeUI />
              </div>

              {/* Right: Design Tokens + Code */}
              <div className="col-span-2 flex flex-col gap-3 md:gap-3.5">
                <DesignTokens />
                <CodeBlock />
              </div>
            </div>
          </div>

          {/* ── Component Tree ── */}
          <div className="border-t border-white/[0.06] px-4 md:px-5 py-3 md:py-3.5">
            <span className="text-[8px] md:text-[9px] font-semibold text-muted/40 tracking-wider uppercase mb-2 block">
              Component Tree
            </span>
            <div className="h-12 md:h-14">
              <ComponentTree />
            </div>
          </div>
        </div>

        <Cursor />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -bottom-2 -right-2 -z-10 w-full h-full rounded-2xl border border-accent/[0.05] bg-accent/[0.01]"
        style={{ transform: `translate(${px * 0.4}px, ${py * 0.4}px)` }}
      />
    </div>
  )
}

/* ───── Mobile Blueprint ───── */
function MobileBlueprint() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (id: string) => setExpanded(expanded === id ? null : id)

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Process Layers */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button onClick={() => toggle('layers')} className="w-full flex items-center justify-between px-4 py-3 text-left">
          <span className="text-[10px] font-semibold text-muted/50 tracking-wider uppercase">Process</span>
          <motion.span animate={{ rotate: expanded === 'layers' ? 180 : 0 }} className="text-muted/30 text-xs">▾</motion.span>
        </button>
        <AnimatePresence>
          {expanded === 'layers' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4"><ProcessLayers /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wireframe → UI */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button onClick={() => toggle('wireframe')} className="w-full flex items-center justify-between px-4 py-3 text-left">
          <span className="text-[10px] font-semibold text-muted/50 tracking-wider uppercase">Wireframes → Interface</span>
          <motion.span animate={{ rotate: expanded === 'wireframe' ? 180 : 0 }} className="text-muted/30 text-xs">▾</motion.span>
        </button>
        <AnimatePresence>
          {expanded === 'wireframe' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4"><WireframeUI /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Design System */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button onClick={() => toggle('tokens')} className="w-full flex items-center justify-between px-4 py-3 text-left">
          <span className="text-[10px] font-semibold text-muted/50 tracking-wider uppercase">Design System</span>
          <motion.span animate={{ rotate: expanded === 'tokens' ? 180 : 0 }} className="text-muted/30 text-xs">▾</motion.span>
        </button>
        <AnimatePresence>
          {expanded === 'tokens' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                <DesignTokens />
                <CodeBlock />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Component Tree */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button onClick={() => toggle('tree')} className="w-full flex items-center justify-between px-4 py-3 text-left">
          <span className="text-[10px] font-semibold text-muted/50 tracking-wider uppercase">Component Tree</span>
          <motion.span animate={{ rotate: expanded === 'tree' ? 180 : 0 }} className="text-muted/30 text-xs">▾</motion.span>
        </button>
        <AnimatePresence>
          {expanded === 'tree' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4"><div className="h-16"><ComponentTree /></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ──────────────── Export ──────────────── */
export default function HeroVisual() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopBlueprint />
      </div>
      <div className="block lg:hidden">
        <MobileBlueprint />
      </div>
    </>
  )
}
