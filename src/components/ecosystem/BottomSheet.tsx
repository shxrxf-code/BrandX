'use client'

import { motion } from 'framer-motion'

interface BottomSheetProps {
  service: {
    title: string
    description: string
    deliverables: string[]
  }
  onClose: () => void
}

export function BottomSheet({ service, onClose }: BottomSheetProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] md:hidden"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-2xl rounded-t-2xl border-t border-white/30 shadow-2xl max-h-[80vh] overflow-y-auto"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) onClose()
        }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-black/15" />
        </div>

        <div className="px-6 pb-8 pt-2">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase">
              Service
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-black/5 transition-all duration-200 -mr-1"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <div className="w-8 h-0.5 bg-accent/30 rounded-full mb-3" />
            <h3 className="text-xl font-display font-bold tracking-tight text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="mb-6">
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

          <div className="flex gap-3">
            <a
              href="/services"
              className="flex-1 text-center py-3 px-4 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors duration-200"
            >
              Learn More
            </a>
            <a
              href="/contact"
              className="flex-1 text-center py-3 px-4 bg-white border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-secondary transition-colors duration-200"
            >
              Start Project
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
