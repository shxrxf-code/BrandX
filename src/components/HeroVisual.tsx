'use client'

import { motion } from 'framer-motion'

const colorMap = {
  accent: { hex: '#8B5CF6', tail: 'accent' },
  magenta: { hex: '#D946EF', tail: 'magenta' },
  emerald: { hex: '#10B981', tail: 'emerald-500' },
  amber: { hex: '#F59E0B', tail: 'amber-500' },
} as const

const metrics = [
  {
    label: 'Revenue Growth',
    value: 156,
    suffix: '%',
    prefix: '+',
    color: 'accent' as const,
    chart: [20, 35, 28, 45, 38, 52, 48, 65, 58, 72, 80, 100],
  },
  {
    label: 'Traffic',
    value: 487,
    suffix: 'K',
    prefix: '',
    color: 'magenta' as const,
    chart: [30, 25, 40, 35, 55, 50, 65, 70, 80, 75, 90, 100],
  },
  {
    label: 'Conversion Rate',
    value: 4.8,
    suffix: '%',
    prefix: '',
    color: 'emerald' as const,
    chart: [10, 15, 12, 22, 18, 30, 25, 35, 40, 50, 55, 65],
  },
  {
    label: 'Automation Active',
    value: 12,
    suffix: '',
    prefix: '',
    color: 'amber' as const,
    chart: [40, 60, 50, 70, 65, 80, 75, 85, 82, 90, 88, 100],
  },
]

const activities = [
  { label: 'AI Pipeline', status: 'Processing', time: '2s ago' as const },
  { label: 'Analytics Sync', status: 'Live', time: 'now' as const },
  { label: 'Deploy Queue', status: 'Idle', time: '12s ago' as const },
]

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  return (
    <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground">
      {prefix}{value.toLocaleString()}<span className="text-sm md:text-base text-muted ml-0.5">{suffix}</span>
    </span>
  )
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const h = 32
  const w = 60
  const points = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - (d / max) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
    </svg>
  )
}

function StatusDot({ status }: { status: string }) {
  const isLive = status === 'Live' || status === 'Processing'
  return (
    <span className="relative flex h-2 w-2">
      {isLive && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-400' : 'bg-white/10'}`} />
    </span>
  )
}

export default function HeroVisual() {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative rounded-2xl border border-white/10 glass overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-magenta/[0.03] pointer-events-none" />

        <div className="relative px-5 py-4 md:px-6 md:py-5">
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-xs font-medium text-muted/60 tracking-wide uppercase ml-1">Growth Dashboard</span>
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] text-emerald-400/70 font-medium">Live</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            {metrics.map((metric, i) => {
              const c = colorMap[metric.color]
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 md:p-3.5 hover:border-white/[0.12] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        border: `1px solid ${c.hex}33`,
                        backgroundColor: `${c.hex}0D`,
                      }}
                    >
                      <svg viewBox="0 0 16 16" fill={c.hex} className="w-4 h-4">
                        <path d="M8 1a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5h-5.5a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 018 1z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-6 md:h-7 mb-1.5">
                    <MiniChart data={metric.chart} color={c.hex} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs text-muted/60 font-medium truncate">{metric.label}</span>
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                      className="text-[10px] font-medium"
                      style={{ color: c.hex }}
                    >
                      ▲
                    </motion.span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/[0.06]"
          >
            <div className="flex items-center justify-between gap-4">
              {activities.map((activity) => (
                <div key={activity.label} className="flex items-center gap-2 min-w-0">
                  <StatusDot status={activity.status} />
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-medium text-foreground/70 truncate">{activity.label}</p>
                    <p className="text-[9px] md:text-[10px] text-muted/40">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-3 -right-3 -z-10 w-full h-full rounded-2xl border border-accent/10 bg-accent/[0.02]"
      />
    </div>
  )
}
