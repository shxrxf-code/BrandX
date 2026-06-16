'use client'

import { motion } from 'framer-motion'

interface ServiceModalProps {
  service: {
    title: string
    description: string
    deliverables: string[]
  }
  onClose: () => void
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl p-6 sm:p-8"
        style={{
          boxShadow: '0 25px 60px -15px rgba(37, 99, 235, 0.15), 0 8px 30px -8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase">
            Service
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-black/5 transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-7">
          <div className="w-8 h-0.5 bg-accent/30 rounded-full mb-4" />
          <h3 className="text-2xl font-display font-bold tracking-tight text-foreground mb-3">
            {service.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {service.description}
          </p>
        </div>

        <div>
          <span className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase mb-3 block">
            Key Deliverables
          </span>
          <div className="space-y-2">
            {service.deliverables.map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-border/60"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-sm text-foreground font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
