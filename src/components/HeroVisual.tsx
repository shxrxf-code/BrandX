'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─────────────────── Data ─────────────────── */

const PIPELINE = [
  { id: 'idea', label: 'Idea', icon: '💡' },
  { id: 'strategy', label: 'Strategy', icon: '🎯' },
  { id: 'design', label: 'Design', icon: '✦' },
  { id: 'development', label: 'Development', icon: '⚡' },
  { id: 'launch', label: 'Launch', icon: '🚀' },
  { id: 'growth', label: 'Growth', icon: '📈' },
]

const METRICS = [
  { label: 'Revenue Growth', value: 312, suffix: '%', prefix: '+', color: '#8B5CF6', change: '+18.2% this quarter' },
  { label: 'Conversion', value: 4.8, suffix: '%', prefix: '', color: '#D946EF', change: '+2.1pp vs last month' },
  { label: 'Traffic', value: 487, suffix: 'K', prefix: '', color: '#10B981', change: '+89% YoY' },
  { label: 'Leads Generated', value: 12.4, suffix: 'K', prefix: '+', color: '#F59E0B', change: '+156% this year' },
]

const AI_SYSTEMS = [
  { label: 'Auto-deploy Pipeline', status: 'active', desc: 'Automated CI/CD' },
  { label: 'Analytics Engine', status: 'active', desc: 'Real-time tracking' },
  { label: 'Smart Workflows', status: 'active', desc: '9 active automations' },
  { label: 'AI Chatbot', status: 'idle', desc: 'Ready on demand' },
  { label: 'SEO Optimizer', status: 'active', desc: 'Content analysis' },
]

const PROJECTS = [
  { name: 'Sunsolar', stage: 'Development', progress: 65, color: '#8B5CF6' },
  { name: 'Drifto', stage: 'Launch', progress: 92, color: '#D946EF' },
  { name: 'Ravelon', stage: 'Design', progress: 40, color: '#10B981' },
  { name: 'Mirra', stage: 'Strategy', progress: 20, color: '#F59E0B' },
]

/* ─── Particle sparkles ─── */
function Sparkles() {
  const dots = useMemo(() => Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 1.5,
    delay: Math.random() * 10,
    duration: 6 + Math.random() * 8,
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -15, 0] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Pipeline Flow ─── */
function PipelineFlow() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % PIPELINE.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center justify-between gap-1">
      {PIPELINE.map((stage, i) => {
        const isActive = activeIdx === i
        const isPast = PIPELINE.slice(0, activeIdx).some((s) => s.id === stage.id)
        return (
          <div key={stage.id} className="flex items-center gap-1 flex-1">
            <motion.div
              animate={isActive ? { scale: [1, 1.12, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={cn(
                'flex flex-col items-center gap-1.5 flex-1'
              )}
            >
              <motion.div
                animate={{
                  background: isActive
                    ? 'linear-gradient(135deg, #8B5CF6, #D946EF)'
                    : isPast
                      ? 'rgba(139,92,246,0.2)'
                      : 'rgba(255,255,255,0.04)',
                  borderColor: isActive
                    ? 'rgba(139,92,246,0.5)'
                    : isPast
                      ? 'rgba(139,92,246,0.2)'
                      : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive
                    ? '0 0 16px rgba(139,92,246,0.25)'
                    : '0 0 0px rgba(139,92,246,0)',
                }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs border transition-colors duration-300"
              >
                <span className={cn(isActive ? 'text-white' : isPast ? 'text-accent/60' : 'text-muted/40')}>
                  {stage.icon}
                </span>
              </motion.div>
              <span className={cn(
                'text-[8px] md:text-[9px] font-medium tracking-wide',
                isActive ? 'text-accent' : isPast ? 'text-muted/50' : 'text-muted/30'
              )}>
                {stage.label}
              </span>
            </motion.div>
            {i < PIPELINE.length - 1 && (
              <motion.div
                animate={{ background: isPast ? '#8B5CF6' : 'rgba(255,255,255,0.06)' }}
                className="h-px flex-1 mx-1 transition-colors duration-500"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Metric Card ─── */
function MetricCard({ metric, index }: { metric: typeof METRICS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 hover:border-white/[0.12] transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-1">
        <div
          className="text-xl md:text-2xl font-display font-bold tracking-tight text-foreground"
        >
          {metric.prefix}{metric.value.toLocaleString()}
          <span className="text-xs md:text-sm text-muted ml-0.5 font-sans font-medium">
            {metric.suffix}
          </span>
        </div>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${metric.color}12`, border: `1px solid ${metric.color}25` }}
        >
          <svg viewBox="0 0 16 16" fill={metric.color} className="w-3.5 h-3.5">
            <path d="M8 1a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5h-5.5a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 018 1z" />
          </svg>
        </div>
      </div>
      <motion.div className="h-5 md:h-6 mb-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + index * 0.08 }}>
        <div className="flex items-end gap-0.5 h-full">
          {[20, 35, 28, 45, 38, 52, 48, 65, 58, 72, 80, 100].map((h, j) => (
            <motion.div
              key={j}
              className="flex-1 rounded-t-sm"
              style={{ background: metric.color, opacity: 0.25 + (h / 100) * 0.4 }}
              initial={{ height: 0 }}
              animate={{ height: `${h * 0.45}%` }}
              transition={{ duration: 0.3, delay: 1 + index * 0.08 + j * 0.02 }}
            />
          ))}
        </div>
      </motion.div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] md:text-xs text-muted/60 font-medium truncate">{metric.label}</span>
        <span className="text-[8px] md:text-[9px] text-muted/40 truncate ml-2">{metric.change}</span>
      </div>
    </motion.div>
  )
}

/* ─── AI Status Item ─── */
function AiStatus({ item, index }: { item: typeof AI_SYSTEMS[0]; index: number }) {
  const isActive = item.status === 'active'
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
      className="flex items-center gap-2.5 py-1.5 group"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {isActive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        )}
        <span className={cn(
          'relative inline-flex rounded-full h-2 w-2',
          isActive ? 'bg-emerald-400' : 'bg-white/15'
        )} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] md:text-xs font-medium text-foreground/70 leading-tight truncate group-hover:text-foreground transition-colors">
          {item.label}
        </p>
        <p className="text-[8px] md:text-[9px] text-muted/40 leading-tight truncate">{item.desc}</p>
      </div>
      <span className={cn(
        'text-[8px] md:text-[9px] font-medium px-1.5 py-0.5 rounded',
        isActive ? 'text-emerald-400/70 bg-emerald-500/10' : 'text-muted/30 bg-white/[0.04]'
      )}>
        {isActive ? 'ON' : 'STBY'}
      </span>
    </motion.div>
  )
}

/* ─── Active Project Card ─── */
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 1.2 + index * 0.08 }}
      className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 hover:border-white/[0.12] transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-sm font-display font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.name}
        </span>
        <span className="text-[9px] md:text-[10px] font-medium text-muted/50 px-1.5 py-0.5 rounded-md bg-white/[0.04]">
          {project.stage}
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: project.color }}
          initial={{ width: 0 }}
          animate={{ width: `${project.progress}%` }}
          transition={{ duration: 0.8, delay: 1.5 + index * 0.08, ease: 'easeOut' }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] md:text-[10px] text-muted/40">{project.progress}% complete</span>
        <motion.span
          className="text-[9px] text-muted/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        >
          ● Live
        </motion.span>
      </div>
    </motion.div>
  )
}

/* ──────────────── Desktop Control Center ──────────────── */
function DesktopControlCenter() {
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

  const px = mousePos.x * 3
  const py = mousePos.y * 3

  return (
    <div ref={containerRef} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="relative w-full">
      <Sparkles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-2xl border border-white/10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          transform: `translate(${px}px, ${py}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.02] via-transparent to-magenta/[0.02] pointer-events-none" />

        <div className="relative">
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-muted/50 tracking-wider uppercase">
                Product Control Center
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1.5"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[9px] md:text-[10px] text-emerald-400/60 font-medium">All Systems Live</span>
              </motion.div>
            </div>
          </div>

          {/* ── Main Body ── */}
          <div className="p-4 md:p-5 space-y-4 md:space-y-5">
            {/* Pipeline */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5 md:p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs font-semibold text-muted/50 tracking-wider uppercase">Project Pipeline</span>
                <span className="text-[8px] md:text-[9px] text-accent/60 font-medium">6-stage process</span>
              </div>
              <PipelineFlow />
            </div>

            {/* Metrics + AI grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
              {/* Metrics - 3 cols */}
              <div className="md:col-span-3">
                <span className="text-[10px] md:text-xs font-semibold text-muted/50 tracking-wider uppercase mb-2.5 block">
                  Growth Metrics
                </span>
                <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                  {METRICS.map((m, i) => (
                    <MetricCard key={m.label} metric={m} index={i} />
                  ))}
                </div>
              </div>

              {/* AI Systems - 2 cols */}
              <div className="md:col-span-2">
                <span className="text-[10px] md:text-xs font-semibold text-muted/50 tracking-wider uppercase mb-2.5 block">
                  AI Systems
                </span>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 md:p-3.5 h-full">
                  {AI_SYSTEMS.map((item, i) => (
                    <AiStatus key={item.label} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Active Projects ── */}
          <div className="border-t border-white/[0.06] px-4 md:px-5 py-3.5 md:py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] md:text-xs font-semibold text-muted/50 tracking-wider uppercase">Active Projects</span>
              <span className="text-[8px] md:text-[9px] text-muted/30">4 in progress</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating depth layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -bottom-2 -right-2 -z-10 w-full h-full rounded-2xl border border-accent/[0.06] bg-accent/[0.015]"
        style={{ transform: `translate(${px * 0.5}px, ${py * 0.5}px)` }}
      />
    </div>
  )
}

/* ──────── Mobile Version ──────── */
function MobileControlCenter() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Pipeline accordion */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'pipeline' ? null : 'pipeline')}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-xs font-semibold text-muted/60 tracking-wider uppercase">Project Pipeline</span>
          <motion.span
            animate={{ rotate: expandedSection === 'pipeline' ? 180 : 0 }}
            className="text-muted/40"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence>
          {expandedSection === 'pipeline' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4">
                <PipelineFlow />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Metrics */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'metrics' ? null : 'metrics')}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-xs font-semibold text-muted/60 tracking-wider uppercase">Growth Metrics</span>
          <motion.span
            animate={{ rotate: expandedSection === 'metrics' ? 180 : 0 }}
            className="text-muted/40"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence>
          {expandedSection === 'metrics' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                {METRICS.map((m, i) => (
                  <MetricCard key={m.label} metric={m} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Systems */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'ai' ? null : 'ai')}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-xs font-semibold text-muted/60 tracking-wider uppercase">AI Systems</span>
          <motion.span
            animate={{ rotate: expandedSection === 'ai' ? 180 : 0 }}
            className="text-muted/40"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence>
          {expandedSection === 'ai' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4">
                {AI_SYSTEMS.map((item, i) => (
                  <AiStatus key={item.label} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Projects */}
      <div className="rounded-xl border border-white/10 glass overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'projects' ? null : 'projects')}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-xs font-semibold text-muted/60 tracking-wider uppercase">Active Projects</span>
          <motion.span
            animate={{ rotate: expandedSection === 'projects' ? 180 : 0 }}
            className="text-muted/40"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence>
          {expandedSection === 'projects' && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                {PROJECTS.map((p, i) => (
                  <ProjectCard key={p.name} project={p} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ──────────────── Main Export ──────────────── */
export default function HeroVisual() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopControlCenter />
      </div>
      <div className="block lg:hidden">
        <MobileControlCenter />
      </div>
    </>
  )
}
