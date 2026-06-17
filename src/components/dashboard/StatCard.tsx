'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
}

export default function StatCard({ label, value, subtitle, trend, icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-5"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[11px] text-muted font-semibold uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-accent/60">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-display font-bold tracking-tight text-foreground">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend === 'up'
                ? 'text-green-400'
                : trend === 'down'
                ? 'text-red-400'
                : 'text-muted'
            }`}
          >
            {trend === 'up' ? '\u2191' : trend === 'down' ? '\u2193' : '\u2192'}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-[11px] text-muted/60 mt-1">{subtitle}</p>
      )}
    </motion.div>
  )
}
